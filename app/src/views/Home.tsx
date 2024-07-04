import useHeartedChannelsStore from "../hooks/useHeartedChannelsStore";
import useRecentChannelsStore from "../hooks/useRecentChannelsStore";
import { useServiceList } from "../hooks/useDVBI";
import HomeWindow from "../windows/HomeWindow";
import { homeRecommPropsFromService } from "../components/Home/HomeRecommendation";

export default function Home() {
    const { heartedChannels } = useHeartedChannelsStore(state => state)
    const { recentChannels } = useRecentChannelsStore(state => state)

    const { services, loading, error } = useServiceList(false, true);

    const heartedList = services.filter(service => heartedChannels.has(service.serviceID))
    const recentList = recentChannels.map(serviceID => services.find(service => service.serviceID === serviceID))

    const transformedHearted = heartedList.map(service => {
        // debugger;
        return homeRecommPropsFromService(service)
    });
    const transformedRecent = recentList.map(service => {
        if (!service) {
            return null;
        } else {
            return homeRecommPropsFromService(service);
        }
    }).filter((service) => service !== null);


    return (
        <HomeWindow
            loading={loading}
            hearted={transformedHearted}
            recent={transformedRecent}
        ></HomeWindow>
    );
}