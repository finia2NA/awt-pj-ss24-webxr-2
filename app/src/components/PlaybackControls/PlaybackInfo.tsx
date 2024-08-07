import { Container, Image, Text } from "@react-three/uikit";
import useColors from "../../hooks/useColors";
import CacheEnabledImage from "../CacheEnabledImage";

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
      <Container flexDirection={"column"} justifyContent={"center"} marginRight={"auto"} marginLeft={10}>
        <Text color={colors.primary} fontSize={18} fontWeight={"semi-bold"}>{title}</Text>
        <Text color={colors.primary} fontSize={16} fontWeight={"medium"}>{description}</Text>
      </Container>
    </Container>
  )
}

export default PlaybackInfo;