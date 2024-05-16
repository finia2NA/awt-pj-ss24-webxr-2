import {Service} from "./services";
import { getWholeDataAsJson } from "../io/getter";
import { castToArray, parseDuration, convertDateToUnix } from "../utils/utils";


class ProgramDescription {
    public pid: string;
    public title: string;
    public description: string;
    public mediaUri: string;
    public start: Date;
    public duration: Date;
  
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
    }
  }
  
class ContentGuide {
    public programDescriptions: ProgramDescription[] = [];
  
    _scheduleEndpoint: string;
    _serviceRef: string;
    _start: Date;
    _end: Date;
  
    constructor(service: Service, start?: Date, end?: Date) {
        this._scheduleEndpoint = service.scheduleInfoEndpoint;
        this._serviceRef = service.contentGuideServiceRef;

        this._start = start;
        this._end = end;
    }
  
    /**
     * Retrieves the program descriptions for the service in the specified range.
     */
    public async getData() {
      let range = "now_next=true";  
      if (this._start && this._end) {
          range = `start=${convertDateToUnix(this._start)}&end=${convertDateToUnix(this._end)}`;
      }
      
      const data = await getWholeDataAsJson(`
        ${this._scheduleEndpoint}?sid=${this._serviceRef}&${range}
      `);
  
      const description = data.TVAMain.ProgramDescription;
      const information = castToArray(description.ProgramInformationTable.ProgramInformation);
      const schedule = castToArray(description.ProgramLocationTable.Schedule.ScheduleEvent);
  
      for (let info of information) {
        this.programDescriptions.push(new ProgramDescription(info, schedule));
      }
    };
  }

export { ContentGuide };