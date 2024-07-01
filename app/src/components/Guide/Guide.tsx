import { Container, Image } from "@react-three/uikit"
import GuideStrip, { GuideStripProps } from "./GuideStrip";

export interface GuideProps {
    channels: GuideStripProps[];
}

const Guide = ({ channels }: GuideProps) => {
    return (
        <Container display={"flex"} flexDirection={"row"} gap={20} >
            <Container display={"flex"} flexDirection={"column"} alignItems={"center"} gap={10} flexGrow={0} flexShrink={0}>
                {channels.map((channel, index) => (
                    <Container key={index} height={65} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                        <Image width={100} src={channel.imageUrl} flexGrow={0} flexShrink={0} />
                    </Container>
                ))}
            </Container>
            <Container display={"flex"} flexDirection={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} gap={10} overflow={"scroll"} flexGrow={0} flexShrink={0}>
                {channels.map((channel, index) => (
                    <GuideStrip key={index} {...channel} />

                ))}
            </Container>
        </Container>
    )
}

export default Guide;