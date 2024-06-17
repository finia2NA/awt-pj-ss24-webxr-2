import useHeartedChannelsStore from "../../hooks/useHeartedChannelsStore";
import HeartFilledIcon from "../../assets/HeartFilledIcon";
import { HeartIcon } from "@react-three/uikit-lucide";
import { Button } from "../apfel/button";


interface HeartButtonProps {
  channelID: string;
}

const HeartButton = ({ channelID }: HeartButtonProps) => {

  const { heartedChannels, toggleHeartedChannelByID } = useHeartedChannelsStore((state) => state);

  const isHearted = heartedChannels.has(channelID);


  const onClick = () => {
    console.log("toggling: ", channelID);
    toggleHeartedChannelByID(channelID);
  }

  return (
    <Button variant="icon" size="md" onClick={onClick}>
      {isHearted ? <HeartFilledIcon /> : <HeartIcon />}
    </Button>);
}

export default HeartButton;