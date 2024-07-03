import { useMemo } from "react";
import useSettingsStore, { SettingsState } from "./useSettingsStore"
import DVBI from 'dvbi-lib'

export const useDVBI = () => {

  const { dvbiUrl } = useSettingsStore((state) => state) as SettingsState;

  const dvbi = useMemo(async () => {
    if (!dvbiUrl) {
      throw new Error('DVBI URL is not set');
    }

    const d = DVBI.getInstance();
    await d.init(dvbiUrl);
    return d;
  }, [dvbiUrl]);

  return dvbi;
}

export const useServiceList = async (includeIncomplete?: boolean, includeGuide?: boolean) => {

  const dvbi = await useDVBI();

  const allChannels = dvbi.services;

  const filtered = allChannels.filter((channel) => {
    return channel.dashStreamAvailable && channel.contentGuideAvailable;
  });

  const re = includeIncomplete ? filtered : allChannels;

  if (includeGuide) {
    re.map((channel) => {
      channel.getContentGuide();
    });
  }
  return re;
}

export const useService = async (id: string, includeGuide?: boolean) => {
  const dvbi = await useDVBI();

  const theService = dvbi.services.find((channel) => channel.serviceID === id);

  if (!theService) {
    throw new Error(`Channel with ID ${id} not found`);
  }

  if (includeGuide) {
    theService.getContentGuide();
  }

  return theService;
}