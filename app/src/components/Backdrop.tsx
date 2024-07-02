import { Container, ContainerProperties } from "@react-three/uikit";
import useColors from "../hooks/useColors";

const Backdrop = (props: ContainerProperties) => {
  const colors = useColors();

  const mergedProps: ContainerProperties = {
    width: 360,
    borderRadius: 10,
    backgroundColor: colors.background,
    backgroundOpacity: colors.backgroundOpacity,
    paddingY: 10,
    paddingRight: 20,
    paddingLeft: 24,
    alignItems: 'center',
    gap: 24,
    alignSelf: "flex-start",
    ...props,
  };

  return (
    <Container {...mergedProps} />
  );
}

export default Backdrop;