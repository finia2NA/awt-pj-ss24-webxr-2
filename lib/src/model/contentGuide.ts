import { Service } from "./services";
import { getWholeDataAsJson } from "../io/getter";
import { castToArray, parseDuration, convertDateToUnix, parseDurationMinutes } from "../utils/utils";


class ProgramDescription {
  public pid: string;
  public title: string;
  public description: string;
  public mediaUri: string;
  public start: Date;
  public duration: Date;
  public durationMinutes: number;

  constructor(information, schedule) {
    this.pid = information["@_programId"].replace("crid://", "");

    const description = information.BasicDescription;

    const titles = castToArray(description.Title);
    const primaryTitle = titles.find(title => title["@_type"] === "main")["#text"];
    const secondaryTitle = titles.find(title => title["@_type"] === "secondary")?.["#text"];
    this.title = secondaryTitle ? `${primaryTitle} - ${secondaryTitle}` : primaryTitle;

    this.description = description.Synopsis["#text"];

    this.mediaUri = description.RelatedMaterial?.MediaLocator?.MediaUri["#text"];

    const scheduleEvent = schedule.find(event => event.Program["@_crid"] === information["@_programId"]);
    this.start = new Date(scheduleEvent.PublishedStartTime);
    this.duration = parseDuration(scheduleEvent.PublishedDuration);
    this.durationMinutes = parseDurationMinutes(scheduleEvent.PublishedDuration);
  }
}

class ContentGuide {
  public programDescriptions: ProgramDescription[] = [];

  _scheduleEndpoint: string;
  _serviceRef: string;
  _start: Date;
  _end: Date;

  _service: Service;

  constructor(service: Service, start?: Date, end?: Date) {
    this._scheduleEndpoint = service.scheduleInfoEndpoint;
    this._serviceRef = service.contentGuideServiceRef;

    this._start = start;
    this._end = end;

    this._service = service;
  }

  /**
   * Retrieves the program descriptions for the service in the specified range.
   * If no range is specified, the current and next program will be returned.
   */
  public async getData() {
    let range = "now_next=true";
    if (this._start && this._end) {
      range = `start=${convertDateToUnix(this._start)}&end=${convertDateToUnix(this._end)}`;
    }

    const data = await getWholeDataAsJson(`
        ${this._scheduleEndpoint}?sid=${this._serviceRef}&${range}
      `);


    if (!data.TVAMain || !data.TVAMain.ProgramDescription) {
      // TVAMain or ProgramDescription does not exist or is falsy
      this._service.contentGuideAvailable = false; // TODO: I don't know if this is flowing back to the react app
      return;
    }

    const description = data.TVAMain.ProgramDescription;
    const information = castToArray(description.ProgramInformationTable.ProgramInformation);
    const schedule = castToArray(description.ProgramLocationTable.Schedule ? description.ProgramLocationTable.Schedule.ScheduleEvent : []);

    if (!information[0] || !schedule[0]) {
      return;
    }

    for (let info of information) {
      this.programDescriptions.push(new ProgramDescription(info, schedule));
    }
  };

  /**
   * Verifies the dates specified for time range according to ETSI TS 103 770 V1.1.1.
   *
   * NOTE: Not used atm, validation is left to the backend.
   */
  verifyRange() {
    // {end_unixtime} "shall be greater than {start_unixtime} by a value of either 21 600 seconds (6 hours) or 43 200 seconds (12 hours)"
    const diffHours = (this._end.getTime() - this._start.getTime()) / (60 * 60 * 1000);
    if (diffHours !== 6 && diffHours !== 12) {
      return false;
    }

    // {start_unixtime,end_unixtime} "shall identify one of the following times of day (0:00, 3:00, 6:00, 9:00, 12:00, 15:00, 18:00, 21:00)"
    const allowedTimes = [0, 3, 6, 9, 12, 15, 18, 21].map(hour => {
      const date = new Date();
      date.setHours(hour, 0, 0, 0);
      return date;
    });

    if (!allowedTimes.some(allowedTime => +allowedTime === +this._start) || !allowedTimes.some(allowedTime => +allowedTime === +this._end)) {
      return false;
    }

    // TODO:
    // {start_unixtime} "shall not be less than the Unix time of midnight at the start of the current day minus 28 full days"
    // {end_unixtime} "shall not be greater than the Unix time of midnight at the end of the present day plus 28 full days"

    return true;
  };
}

export { ContentGuide };