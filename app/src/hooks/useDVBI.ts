/**
 * This file contains the hooks that link our app to the dvbi library.
 */

import { useState, useEffect } from "react";
import useSettingsStore, { SettingsState } from "./useSettingsStore";
import DVBI from '../lib';
import { Service } from "../lib/model/services";
import { useServiceListCacheStore, useDVBICacheStore } from "./useDVBICacheStore";

/**
 * Custom hook to fetch and manage DVBI instance.
 * When possible, uses cached DVBI instance.
 * 
 * @returns {object} - Returns DVBI instance, loading state, and error state.
 */
export const useDVBI = () => {
  const { dvbiUrl } = useSettingsStore((state) => state) as SettingsState;
  const [dvbi, setDvbi] = useState<DVBI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getCache, setCache } = useDVBICacheStore();

  useEffect(() => {
    if (!dvbiUrl) {
      setError(new Error('DVBI URL is not set'));
      setLoading(false);
      return;
    }

    const fetchDVBI = async () => {
      try {
        const cacheKey = { url: dvbiUrl };
        const cachedDVBI = getCache(cacheKey);

        if (cachedDVBI) {
          setDvbi(cachedDVBI);
          setLoading(false);
          return;
        }

        const d = DVBI.getInstance();
        await d.init(dvbiUrl);
        setDvbi(d);
        setCache(cacheKey, d);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDVBI();
  }, [dvbiUrl, getCache, setCache]);

  return { dvbi, loading, error };
};

/**
 * Custom hook to fetch and manage the list of services.
 * When possible, uses cached service list.
 * 
 * @param {boolean} includeIncomplete - Flag to include incomplete services.
 * @param {boolean} includeGuide - Flag to include guide information.
 * @param {Date} [guideStart] - Start date for the guide.
 * @param {Date} [guideEnd] - End date for the guide.
 * @returns {object} - Returns list of services, loading state, and error state.
 */
export const useServiceList = (includeIncomplete = false, includeGuide = false, guideStart?: Date, guideEnd?: Date) => {
  const { dvbi, loading: dvbiLoading, error: dvbiError } = useDVBI();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getCache, setCache } = useServiceListCacheStore();

  useEffect(() => {
    const key = { includeIncomplete, includeGuide, guideStart, guideEnd };

    setLoading(true);
    if (dvbiLoading) {
      setLoading(true);
      return;
    }

    if (dvbiError) {
      console.error(dvbiError);
      setError(dvbiError);
      setLoading(false);
      return;
    }

    if (!dvbi) {
      setError(new Error("Didn't get a DVBI instance"));
      console.error("Didn't get a DVBI instance");
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        const cachedServices = getCache(key);

        if (cachedServices) {
          setServices(cachedServices);
          setLoading(false);
          return;
        }

        const allChannels = dvbi.services;
        const filtered = allChannels.filter((channel) => {
          return channel.dashStreamAvailable || channel.hlsStreamAvailable;
        });

        const result = includeIncomplete ? filtered : allChannels;

        if (includeGuide) {
          await Promise.allSettled(
            result
              .filter(channel => channel.contentGuideAvailable)
              .map(channel => guideStart && guideEnd
                ? channel.getContentGuide(guideStart, guideEnd)
                : channel.getContentGuide()
              )
          );
        }

        setServices(result);
        setCache(key, result);
        setLoading(false);
      } catch (fetchError) {
        setError(fetchError as Error);
        console.error(fetchError);
        setLoading(false);
      }
    };

    fetchServices();
  }, [dvbi, dvbiLoading, dvbiError, includeIncomplete, includeGuide, guideStart, guideEnd, getCache, setCache]);

  return { services, loading, error };
};

/**
 * Custom hook to fetch and manage a single service by ID.
 * Note that this is NOT CACHED (Since it is not used anywhere anyway. Could be added if needed).
 * 
 * @param {string} id - The ID of the service.
 * @param {boolean} [includeGuide=false] - Flag to include guide information.
 * @returns {object} - Returns the service, loading state, and error state.
 */
export const useService = (id: string, includeGuide: boolean = false) => {
  const { dvbi, loading: dvbiLoading, error: dvbiError } = useDVBI();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (dvbiLoading) {
      setLoading(true);
      return;
    }

    if (dvbiError) {
      setError(dvbiError);
      setLoading(false);
      return;
    }

    if (!dvbi) {
      setError(new Error("Didn't get a DVBI instance"));
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const theService = dvbi.services.find((channel) => channel.serviceID === id);

        if (!theService) {
          setService(null);
          setError(new Error(`Channel with ID ${id} not found`));
          return;
        }

        if (includeGuide) {
          await theService.getContentGuide();
        }

        setService(theService);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchService();
  }, [dvbi, dvbiError, dvbiLoading, id, includeGuide]);

  return { service, loading, error };
};
