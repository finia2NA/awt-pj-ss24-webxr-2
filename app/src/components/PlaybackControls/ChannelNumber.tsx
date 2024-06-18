import { Container, Svg, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import triangleicon from "../../assets/triangle.svg"

export interface ChannelNumberProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
}

const ChannelNumber = ({ channel, setChannel }: ChannelNumberProps) => {
  const colors = useColors();

  return (
    <Container backgroundColor={colors.foreground} backgroundOpacity={colors.backgroundOpacity} width={56} height={62} borderRadius={12} paddingLeft={12} justifyContent={"space-between"}>
      <Text color={colors.foreground}>{channel.toString()}</Text>
      <Container flexDirection={"column"} backgroundColor={colors.foreground} backgroundOpacity={colors.backgroundOpacity} borderRightRadius={12} width={24} justifyContent={"space-evenly"} alignItems={"center"}>
        <Svg src={triangleicon} width={12} color={colors.foreground} onClick={() => setChannel(channel + 1)} />
        <Container backgroundColor={colors.foreground} height={2} width={22} />
        <Svg src={triangleicon} width={12} color={colors.foreground} onClick={() => setChannel(channel - 1)} transformRotateZ={180} />
      </Container>
    </Container>
  )
};

export default ChannelNumber;