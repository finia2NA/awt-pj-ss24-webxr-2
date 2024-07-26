import useHeartedChannelsStore from "../../hooks/useHeartedChannelsStore";
import heartSVG from "../../assets/heart.svg";
import { HeartIcon } from "@react-three/uikit-lucide";
import { Button } from "../apfel/button";
import { Svg } from "@react-three/uikit";
import { ThreeEvent } from "@react-three/fiber";

/**
 * Props interface for the HeartButton component.
 */
interface HeartButtonProps {
  /**
   * The ID of the channel to be hearted/unhearted.
   */
  channelID: string;
}

/**
 * HeartButton component allows users to heart or unheart a channel.
 * It uses the hearted channels store to manage the hearted state of the channel.
 *
 * @param {HeartButtonProps} props - The props for the HeartButton component.
 * @returns {JSX.Element} The rendered HeartButton component.
 */
const HeartButton = ({ channelID }: HeartButtonProps): JSX.Element => {

  // Retrieve the hasHeartedChannelByID and toggleHeartedChannelByID functions from the store.
  const { hasHeartedChannelByID, toggleHeartedChannelByID } = useHeartedChannelsStore((state) => state);

  // Check if the channel is already hearted.
  const isHearted = hasHeartedChannelByID(channelID);

  /**
   * Handle the click event on the button.
   * Stop the propagation of the event and toggle the hearted state of the channel.
   *
   * @param {ThreeEvent<MouseEvent>} e - The click event.
   */
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    toggleHeartedChannelByID(channelID);
  }

  return (
    <Button variant="icon" size="md" onClick={onClick}>
      {isHearted ? <Svg src={heartSVG} /> : <HeartIcon />}
    </Button>
  );
}

export default HeartButton;
