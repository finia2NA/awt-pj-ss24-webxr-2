import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop"
import { Text } from "@react-three/uikit"

export interface GuideStripProgramProps {
    text: string;
    width: number;
    gapBefore?: number;
}

const GuideStripProgram = ({ text, width, gapBefore = 0 }: GuideStripProgramProps) => {
    const colors = useColors();

    return (
        <Backdrop height={65} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={20} width={width} margin={0} marginTop={0} marginLeft={gapBefore} flexShrink={0} flexGrow={0} overflow={"hidden"}>
            <Text color={colors.foreground} paddingX={20}>{text}</Text>
        </Backdrop>
    )
}

export default GuideStripProgram;