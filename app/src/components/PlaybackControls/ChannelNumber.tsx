import { Container, Svg, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import triangleicon from "../../assets/triangle.svg"
import { Button } from "../apfel/button";
import { ThreeEvent } from "@react-three/fiber";

export interface ChannelNumberProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  tuneUpDown?: (direction: number) => void;
}

const ChannelNumber = ({ channel, tuneUpDown }: ChannelNumberProps) => {
  const colors = useColors();

  const handler = (event: ThreeEvent<MouseEvent>, direction: number) => {
    event.stopPropagation();
    if (tuneUpDown) {
      tuneUpDown(direction);
    }
  }

  return (
    <Container
      backgroundColor={colors.background}
      backgroundOpacity={colors.backgroundOpacity}
      height={62}
      borderRadius={12}
      paddingLeft={12}
      justifyContent={"space-between"}
      gap={8}>

      <Text color={colors.primary} fontSize={18} fontWeight={"semi-bold"}>{channel.toString()}</Text>

      <Container
        flexDirection={"column"}
        backgroundColor={colors.background}
        backgroundOpacity={colors.backgroundOpacity}
        borderRightRadius={12}
        width={24}
        justifyContent={"space-evenly"}
        alignItems={"center"}>

        {/* I'm putting the onClicks on containers bc somehow they don't always register when they're on the actual buttons */}
        <Container onClick={(e) => handler(e, 1)}>
          <Button size={20} variant="icon">
            <Svg src={triangleicon} color={colors.primary} />
          </Button>
        </Container>
        <Container backgroundColor={colors.primary} height={2} width={22} />
        <Container onClick={(e) => handler(e, -1)}>
          <Button size={20} variant="icon">
            <Svg src={triangleicon} color={colors.primary} transformRotateZ={180} />
          </Button>
        </Container>
      </Container>
    </Container>
  )
};

export default ChannelNumber;