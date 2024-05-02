import DVBI from "../dvbi";
import { LCN } from "./lcnTables";

function getServices() {
  const dvbi = DVBI.getInstance();
  const servicesData = dvbi.rawData.ServiceList.Service;

  const services = [];
  for (let serviceData of servicesData) {
    services.push(new Service(serviceData));
  }

  return services;
}

class DASHStream {
  public priority: number;
  public manifestUrl: string;

  constructor(dashRawData) {
    this.priority = dashRawData["@_priority"];
    this.manifestUrl = dashRawData.DASHDeliveryParameters.URI;
  }
}

class Service {

  public contentGuideServiceRef: string;
  public contentGuideSourceRef: string;
  public providerName: string;

  public serviceID: string;
  public serviceName: string;
  public serviceType: string;

  public dashStreamAvailable: boolean = false;
  public dashStreams: DASHStream[] = [];

  // Store the LCNs this service is available on here
  // (gets filled later in DVBI.refreshData() / init())
  public lcns: LCN[] = [];

  constructor(rawServiceData) {
    this.contentGuideServiceRef = rawServiceData.ContentGuideServiceRef;
    this.contentGuideSourceRef = rawServiceData.ContentGuideSourceRef;
    this.providerName = rawServiceData.ProviderName;

    this.serviceID = rawServiceData.UniqueIdentifier;
    this.serviceName = rawServiceData.ServiceName;
    this.serviceType = rawServiceData.ServiceType["@_href"];


    // Sometimes, rawServiceData.ServiceInstance is an object, and not an array
    // That is why this check + cast is necessary
    const serviceInstancesData = Array.isArray(rawServiceData.ServiceInstance) ?
      rawServiceData.ServiceInstance :
      [rawServiceData.ServiceInstance];

    const dashRawDataList = serviceInstancesData.filter(instance => instance.DashDeliveryParameters != null);
    if (dashRawDataList.length > 0) {
      this.dashStreamAvailable = true;
      for (let dashRawData of dashRawDataList) {
        this.dashStreams.push(new DASHStream(dashRawData));
      }
    }
  }
}

export { Service, getServices, DASHStream };