import { Input } from "@react-three/uikit";
import useColors from "../hooks/useColors";



const TextInput = () => {
  const colors = useColors();

  return (
    <>
      <Input color={colors.foreground} defaultValue="Type here..." />
    </>
  );
}

export default TextInput;