import useHeartedChannelsStore from "../hooks/useHeartedChannelsStore";
import useRecentChannelsStore from "../hooks/useRecentChannelsStore";
import { useServiceList } from "../hooks/useDVBI";
import HomeWindow from "../windows/HomeWindow";
import { homeRecommPropsFromService } from "../components/Home/HomeRecommendation";
import useCurrentTime from "../hooks/useCurrentTime";

/**
 * Home Component
 * 
 * This component fetches and processes the list of services, hearted channels, and 
 * recent channels to display them in the HomeWindow component.
 * 
 * @returns {JSX.Element} The HomeWindow component populated with necessary data.
 */
export default function Home() {
    const currentTime = useCurrentTime();
    // Retrieve the hearted channels from the state
    const { heartedChannels } = useHeartedChannelsStore(state => state);

    // Retrieve the recent channels from the state
    const { recentChannels } = useRecentChannelsStore(state => state);

    // Fetch the list of services, along with loading and error states
    const { services, loading, error } = useServiceList(false, true);

    // Filter the services to get only the hearted ones
    const heartedList = services.filter(service => heartedChannels.has(service.serviceID));

    // Map the recent channel IDs to their respective service objects
    const recentList = recentChannels.map(serviceID => services.find(service => service.serviceID === serviceID));

    // Transform the hearted services to the required props for HomeWindow
    const transformedHearted = heartedList.map(service => {
        return homeRecommPropsFromService(service, currentTime);
    });

    // Transform the recent services to the required props for HomeWindow, filtering out any null values
    const transformedRecent = recentList.map(service => {
        if (!service) {
            return null;
        } else {
            return homeRecommPropsFromService(service, currentTime);
        }
    }).filter((service) => service !== null);

    // Render the HomeWindow component with the prepared data
    return (
        <HomeWindow
            loading={loading}
            error={error}
            hearted={transformedHearted}
            recent={transformedRecent}
            services={services}
        ></HomeWindow>
    );
}
