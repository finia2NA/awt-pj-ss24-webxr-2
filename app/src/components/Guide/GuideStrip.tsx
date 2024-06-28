import { Container, Image } from "@react-three/uikit"
import useColors from "../../hooks/useColors";
import GuideStripProgram, { GuideStripProgramProps } from "./GuideStripProgram";

export interface GuideStripProps {
    programs: GuideStripProgramProps[];
    imageUrl: string;
}

const GuideStrip = ({ programs, imageUrl }: GuideStripProps) => {
    const colors = useColors();

    return (
        <Container display={"flex"} flexDirection={"row"} alignItems={"center"} gap={10} >
            <Image width={100} src={imageUrl}/>
            <Container>
                {programs.map((program, index) => (
                    <GuideStripProgram key={index} {...program} />
                ))}
            </Container>
        </Container>
    )
}

export default GuideStrip;