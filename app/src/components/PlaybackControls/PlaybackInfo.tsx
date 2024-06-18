import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";

interface PlaybackInfoProps {
  imageSrc: string;
  title: string;
  description: string;
}

const PlaybackInfo = ({ imageSrc, title, description }: PlaybackInfoProps) => {
  const colors = useColors();

  return (
    <Container backgroundColor={colors.background} backgroundOpacity={colors.backgroundOpacity} width={400} height={62} borderRadius={12} paddingLeft={12} justifyContent={"center"} alignItems={"center"}>
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