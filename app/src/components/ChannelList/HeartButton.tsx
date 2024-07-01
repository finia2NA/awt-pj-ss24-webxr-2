import useHeartedChannelsStore from "../../hooks/useHeartedChannelsStore";
import heartSVG from "../../assets/heart.svg";
import { HeartIcon } from "@react-three/uikit-lucide";
import { Button } from "../apfel/button";
import { Svg } from "@react-three/uikit";
import { ThreeEvent } from "@react-three/fiber";



interface HeartButtonProps {
  channelID: string;
}

const HeartButton = ({ channelID }: HeartButtonProps) => {

  const { hasHeartedChannelByID, toggleHeartedChannelByID } = useHeartedChannelsStore((state) => state);

  const isHearted = hasHeartedChannelByID(channelID);


  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    console.log("toggling: ", channelID);
    toggleHeartedChannelByID(channelID);
  }

  return (
    <Button variant="icon" size="md" onClick={onClick}>
      {isHearted ? <Svg src={heartSVG} /> : <HeartIcon />}
    </Button>);
}

export default HeartButton;