import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import CacheEnabledImage from "../MyImage";

interface PlaybackInfoProps {
  imageSrc?: string;
  title: string;
  description: string;
}

const PlaybackInfo = ({ imageSrc, title, description }: PlaybackInfoProps) => {
  const colors = useColors();

  return (
    <Container
      backgroundColor={colors.background}
      backgroundOpacity={colors.backgroundOpacity}
      width={400}
      height={62}
      borderRadius={12}
      paddingLeft={16}
      alignItems={"center"}
    >
      {imageSrc &&
        <Container marginRight={"auto"}>
          <CacheEnabledImage src={imageSrc} width={50} />
        </Container>
      }
      <Container flexDirection={"column"} justifyContent={"center"} marginRight={"auto"}>
        <Text color={colors.primary}>{title}</Text>
        <Text color={colors.primary}>{description}</Text>
      </Container>
    </Container>
  )
}

export default PlaybackInfo;