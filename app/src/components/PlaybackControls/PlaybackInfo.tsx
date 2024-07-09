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

  console.log("c", imageSrc);

  return (
    <Container
      backgroundColor={colors.background}
      backgroundOpacity={colors.backgroundOpacity}
      width={400}
      height={62}
      borderRadius={12}
      paddingLeft={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {imageSrc &&
        <CacheEnabledImage src={imageSrc} width={50} />
      }
      <Container flexDirection={"column"}>
        <Text color={colors.primary}>{title}</Text>
        <Text color={colors.primary}>{description}</Text>
      </Container>
    </Container>
  )
}

export default PlaybackInfo;