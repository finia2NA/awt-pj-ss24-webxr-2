import { ThreeEvent } from "@react-three/fiber";
import useColors from "../../hooks/useColors";
import Backdrop from "../Backdrop"
import { Text } from "@react-three/uikit"
import { useState } from "react";
import { truncateText } from "../../utils/textHelpers";

export interface GuideStripProgramProps {
    text: string;
    width: number;
    gapBefore?: number;
    active?: boolean;
    handleClick?: () => void;
}

const GuideStripProgram = ({ text, width, gapBefore = 0, active, handleClick = () => {} }: GuideStripProgramProps) => {
    const colors = useColors();
    const [pointerPosition, setPointerPosition] = useState<[number, number]>([0, 0]);

    /*
    More complex pointer handling as onClick seems to be too trigger happy which could quickly get annoying
    */
    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        setPointerPosition([e.point.x,e.point.y]);
    }

    // TODO: These values might need fine tuning
    // Or maybe even put this into a generic function that could be used in other components?
    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        if (Math.abs(pointerPosition[0] - e.point.x) < 0.05 && Math.abs(pointerPosition[1] - e.point.y) < 0.05) {
            handleClick();
        }
    }

    return (
        <Backdrop height={65} paddingLeft={0} paddingRight={0} paddingY={0} gap={0} borderRadius={20} width={width} margin={0} marginTop={0} marginLeft={gapBefore} flexShrink={0} flexGrow={0} overflow={"hidden"} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
            <Text color={active ? colors.accent : colors.primary} paddingX={20} fontWeight={active ? "semi-bold" : "medium"} fontSize={13}>{truncateText(text, 60)}</Text>
        </Backdrop>
    )
}

export default GuideStripProgram;