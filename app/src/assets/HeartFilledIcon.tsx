import { Svg, SvgProperties } from "@react-three/uikit";
import heartFileldSVG from "../assets/heartFilled.svg";

// NOTE: HeartFilledIcon is not a part of lucide, so this is unfortunately necessary.
const HeartFilledIcon = (props: SvgProperties) => {
  return (
    <Svg src={heartFileldSVG} {...props} />
  );
}

export default HeartFilledIcon;