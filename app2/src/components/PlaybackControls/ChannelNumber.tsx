import { Container, Text } from "@react-three/uikit";
import { colors } from "../apfel/theme";

export interface ChannelNumberProps {
  channel: number;
  // eslint-disable-next-line no-unused-vars
  setChannel: (channel: number) => void;
}

const ChannelNumber = ({ channel, setChannel }: ChannelNumberProps) => {
  return (
    <Container backgroundColor={colors.foreground} backgroundOpacity={0.15} width={52} height={62} borderRadius={12} paddingLeft={12} justifyContent={"space-between"}>
      <Text color={colors.foreground}>{channel.toString()}</Text>
      <Container flexDirection={"column"} backgroundColor={colors.foreground} backgroundOpacity={0.15} borderRightRadius={12} width={22} justifyContent={"space-evenly"} alignItems={"center"}>
        {/* TODO: substitute ▲▼ characters (these are not being rendered rn so need to set the font to one where they do) */}
        <Text color={colors.foreground} onClick={() => setChannel(channel + 1)}>^</Text>
        <Container backgroundColor={colors.foreground} height={2} width={22} />
        <Text color={colors.foreground} onClick={() => setChannel(channel - 1)}>v</Text>
      </Container>
    </Container>
  )
};

export default ChannelNumber;