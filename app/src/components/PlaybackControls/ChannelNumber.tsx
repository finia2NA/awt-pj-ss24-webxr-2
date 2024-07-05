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
      width={56}
      height={62}
      borderRadius={12}
      paddingLeft={12}
      justifyContent={"space-between"}>

      <Text color={colors.primary}>{channel.toString()}</Text>

      <Container
        flexDirection={"column"}
        backgroundColor={colors.background}
        backgroundOpacity={colors.backgroundOpacity}
        borderRightRadius={12}
        width={24}
        justifyContent={"space-evenly"}
        alignItems={"center"}>

        <Button size={20} variant="icon">
          <Svg src={triangleicon} color={colors.primary} onClick={(e) => handler(e, 1)} />
        </Button>
        <Container backgroundColor={colors.primary} height={2} width={22} />
        <Button size={20} variant="icon">
          <Svg src={triangleicon} color={colors.primary} onClick={(e) => handler(e, -1)} transformRotateZ={180} />
        </Button>


      </Container>
    </Container>
  )
};

export default ChannelNumber;