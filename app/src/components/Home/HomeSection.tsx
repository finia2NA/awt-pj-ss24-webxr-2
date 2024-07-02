import { Container, Text } from "@react-three/uikit";
import HomeRecommendation, { HomeRecommendationProps } from "./HomeRecommendation";
import useColors from "../../hooks/useColors";

export interface HomeSectionProps {
    /**
     * Title of the section
     */
    title: string;
    channels: HomeRecommendationProps[];
}

const HomeSection = ({ title, channels }: HomeSectionProps) => {
    const colors = useColors();
    return (
        <Container display={"flex"} flexDirection={"column"} gapRow={8} >
            <Text color={colors.primary} fontSize={13} fontWeight={"medium"}>{title}</Text>
            <Container display={"flex"} gap={10} flexDirection={"row"} overflow={"scroll"} height={100}>
                {channels.map((channel, index) => (
                    <HomeRecommendation key={index} {...channel} />
                ))}
            </Container>
        </Container>
    );
}

export default HomeSection;