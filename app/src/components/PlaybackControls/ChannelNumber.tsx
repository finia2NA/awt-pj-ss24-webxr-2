import { Container, Svg, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import triangleicon from "../../assets/triangle.svg"
import { Button } from "../apfel/button";

export interface ChannelNumberProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
}

const ChannelNumber = ({ channel, setChannel }: ChannelNumberProps) => {
  const colors = useColors();

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
          <Svg src={triangleicon} color={colors.primary} onClick={() => setChannel(channel + 1)} />
        </Button>
        <Container backgroundColor={colors.primary} height={2} width={22} />
        <Button size={20} variant="icon">
          <Svg src={triangleicon} color={colors.primary} onClick={() => setChannel(channel - 1)} transformRotateZ={180} />
        </Button>


      </Container>
    </Container>
  )
};

export default ChannelNumber;