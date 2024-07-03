import DVBI from "../dvbi";
import { LCN } from "./lcnTables";
import { ContentGuide } from "./contentGuide";
import { castToArray } from "../utils/utils";

function getServices() {
  const dvbi = DVBI.getInstance();
  const servicesData = dvbi.rawData.ServiceList.Service;
  const contentGuideData = dvbi.rawData.ServiceList.ContentGuideSourceList.ContentGuideSource;

  const contentGuideMap = {};
  for (let contentGuide of contentGuideData) {
    contentGuideMap[contentGuide["@_CGSID"]] = {
      name: contentGuide.ProviderName,
      programInfoEndpoint: contentGuide.ProgramInfoEndpoint.URI,
      scheduleInfoEndpoint: contentGuide.ScheduleInfoEndpoint.URI,
    }
  }

  const services = [];
  for (let serviceData of servicesData) {
    services.push(new Service(serviceData, contentGuideMap));
  }

  return services;
}

class DASHStream {
  public priority: number;
  public manifestUrl: string;

  constructor(dashRawData) {
    this.priority = dashRawData["@_priority"];
    this.manifestUrl = dashRawData.DASHDeliveryParameters.UriBasedLocation.URI;
  }
}

class Service {

  public guideAvailable: boolean = false;
  public contentGuideServiceRef: string;
  public contentGuideSourceRef: string;
  public providerName: string;

  public serviceID: string;
  public serviceName: string;
  public serviceType: string;

  public dashStreamAvailable: boolean = false;
  public dashStreams: DASHStream[] = [];

  public scheduleInfoEndpoint?: string;
  public programInfoEndpoint?: string;

  // Store the LCNs this service is available on here
  // (gets filled later in DVBI.refreshData() / init())
  public lcns: LCN[] = [];

  public contentGuide?: ContentGuide;

  constructor(rawServiceData, contentGuideMap) {
    this.contentGuideServiceRef = rawServiceData.ContentGuideServiceRef;
    this.contentGuideSourceRef = rawServiceData.ContentGuideSourceRef;
    this.providerName = rawServiceData.ProviderName;

    this.serviceID = rawServiceData.UniqueIdentifier;
    this.serviceName = rawServiceData.ServiceName;
    this.serviceType = rawServiceData.ServiceType["@_href"];

    if (contentGuideMap[this.contentGuideSourceRef]) {
      this.scheduleInfoEndpoint = contentGuideMap[this.contentGuideSourceRef].scheduleInfoEndpoint;
      this.programInfoEndpoint = contentGuideMap[this.contentGuideSourceRef].programInfoEndpoint;
      if (this.scheduleInfoEndpoint && this.programInfoEndpoint) {
        this.guideAvailable = true;
      }
    }

    // Sometimes, rawServiceData.ServiceInstance is an object, and not an array
    // That is why this check + cast is necessary
    const serviceInstancesData = castToArray(rawServiceData.ServiceInstance);

    const dashRawDataList = serviceInstancesData.filter(instance => instance.DASHDeliveryParameters != null);

    if (dashRawDataList.length > 0) {
      this.dashStreamAvailable = true;
      for (let dashRawData of dashRawDataList) {
        this.dashStreams.push(new DASHStream(dashRawData));
      }
      this.dashStreams.sort((a, b) => a.priority - b.priority);
    }
  }

  /**
   * Retrieves the content guide for this service. If no start and end time are provided,
   * the current and next programme will be returned.
   * @param {Date} [start]  start time for the range of scheduled programmes
   * @param {Date} [end]  end time for the range of scheduled programmes
   * @returns The content guide with program descriptions for this service.
   */
  public async getContentGuide(start: Date = null, end: Date = null) {
    const contentGuide = new ContentGuide(this, start, end);
    await contentGuide.getData();
    this.contentGuide = contentGuide;
    return contentGuide;
  }
}

export { Service, getServices, DASHStream };