import { Container, Text } from "@react-three/uikit";
import HomeRecommendation, { HomeRecommendationProps } from "./HomeRecommendation";
import useColors from "../../hooks/useColors";

export interface HomeSectionProps {
    /**
     * Title of the section
     */
    title: string;
    channels: HomeRecommendationProps[];
    altText: string
}

const HomeSection = ({ title, channels, altText }: HomeSectionProps) => {
    const colors = useColors();
    return (
        <Container display={"flex"} flexDirection={"column"} gapRow={8} >
            <Text color={colors.primary} fontSize={15} fontWeight={"semi-bold"}>{title}</Text>
            <Container display={"flex"} gap={10} flexDirection={"row"} overflow={"scroll"} height={100}>
                {channels.length > 0 &&
                    channels.map((channel, index) => (
                        <HomeRecommendation key={index} {...channel} />
                    ))
                }
                {channels.length === 0 &&
                    <Container flexDirection={"column"}>
                        <Text fontSize={16} fontWeight={"medium"} color={colors.primary}>No Data Available.</Text>
                        <Text fontSize={16} fontWeight={"medium"} color={colors.primary}>{altText}</Text>
                    </Container>
                }
            </Container>
        </Container>
    );
}

export default HomeSection;