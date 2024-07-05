import { Container } from "@react-three/uikit"
import GuideStripProgram, { GuideStripProgramProps } from "./GuideStripProgram";

export interface GuideStripProps {
    programs: GuideStripProgramProps[];
    active?: boolean;
    handleClick?: () => void;
}

const GuideStrip = ({ programs, active, handleClick = () => {} }: GuideStripProps) => {

    return (
        <Container display={"flex"} flexDirection={"row"} alignItems={"center"} gap={0} justifyContent={"flex-start"} height={65}>
            {programs.map((program, index) => (
                <GuideStripProgram key={index} active={active} {...program} handleClick={handleClick} />
            ))}
        </Container>
    )
}

export default GuideStrip;