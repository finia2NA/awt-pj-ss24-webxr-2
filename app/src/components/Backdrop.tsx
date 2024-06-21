import { Container, ContainerProperties } from "@react-three/uikit";
import useColors from "../hooks/useColors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeObjects(obj1: Record<string, any>, obj2: Record<string, any>) {
  // Create a new object to avoid mutating the original objects
  const result = {};

  // Add all properties from obj2 to result
  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      result[key] = obj2[key];
    }
  }

  // Add all properties from obj1 to result, overwriting any from obj2
  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      result[key] = obj1[key];
    }
  }

  return result;
}

const Backdrop = (props: ContainerProperties) => {
  const colors = useColors();

  const mergedProps = mergeObjects(props, {
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
  });

  return (
    <Container {...mergedProps} />
  );
}

export default Backdrop;