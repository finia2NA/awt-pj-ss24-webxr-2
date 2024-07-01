import { Container, Text } from "@react-three/uikit"
import GuideStripProgram, { GuideStripProgramProps } from "./GuideStripProgram";

export interface GuideStripProps {
    programs: GuideStripProgramProps[];
}

const GuideStrip = ({ programs }: GuideStripProps) => {

    return (
        <Container display={"flex"} flexDirection={"row"} alignItems={"center"} gap={0} justifyContent={"flex-start"} >
            {programs.map((program, index) => (
                <GuideStripProgram key={index} {...program} />
            ))}
        </Container>
    )
}

export default GuideStrip;