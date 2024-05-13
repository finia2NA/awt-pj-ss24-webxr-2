import dvbi from '../../lib/src/index';

(async () => {
    // Initialize DVB-I instance with the URL of the DVB-I service list
    await dvbi.getInstance().init(process.env.DVBI_URL);

    // Get all services
    const allServices = dvbi.getInstance().services;
    console.log(`\n${allServices.length} services found\n`);

    // Find a service by name
    const arteService = dvbi.getInstance().services.find((service) => service.serviceName.startsWith("arte"));

    console.log(arteService);
    if (arteService.dashStreamAvailable) {
        console.log(`\nARTE DASH Streams: ${JSON.stringify(arteService.dashStreams)}\n`);
    } else {
        console.log(`\nARTE DASH Streams not available\n`);
    }
})();
