import { Container, Image, Text } from "@react-three/uikit";
import { colors } from "../apfel/theme";

interface PlaybackInfoProps {
  imageSrc: string;
  title: string;
  description: string;
}

const PlaybackInfo = ({ imageSrc, title, description }: PlaybackInfoProps) => {
  return (
    <Container backgroundColor={colors.foreground} backgroundOpacity={0.15} width={400} height={62} borderRadius={12} paddingLeft={12} justifyContent={"center"} alignItems={"center"}>
      {/* FIXME: fix CORS */}
      <Image src={imageSrc} />
      <Container flexDirection={"column"}>
        <Text color={colors.foreground}>{title}</Text>
        <Text color={colors.foreground}>{description}</Text>
      </Container>
    </Container>
  )
}

export default PlaybackInfo;