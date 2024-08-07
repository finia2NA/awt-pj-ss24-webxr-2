import { Container } from "@react-three/uikit";
import useColors from "../hooks/useColors";
import useKeyboardStore, { KeyboardListeners } from "../hooks/useKeyboardStore.ts";
import { Text } from "@react-three/uikit";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useState } from "react";



interface TextInputProps {
  value: string;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
  onSearch?: () => void;
}

const TextInput = ({ value, placeholder, setValue, onSearch }: TextInputProps) => {
  const [cachedIsVisible, setCachedIsVisible] = useState(false);
  const colors = useColors();

  // hiding and showing the keyboard
  const onTextFieldClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setCachedIsVisible(prev => !prev);
  };

  // Set up event listeners
  useEffect(() => {

    // Define listeners
    const onKeyPress = (key: string) => {
      setValue(value + key);
    };

    const onBackspace = () => {
      setValue(value.slice(0, -1));
    };

    const onHide = () => {
      setCachedIsVisible(false);
    };

    const onSearchLocal = () => {
      if (onSearch) {
        onSearch();
      }
    };

    const listeners: KeyboardListeners = {
      onKeyPress,
      onBackspace,
      onHide,
      onSearch: onSearchLocal,
    };

    // Get store, add listeners
    const store = useKeyboardStore.getState();
    store.addEventListeners(listeners);
    store.setIsVisible(cachedIsVisible);

    // Cleanup
    return () => {
      store.removeEventListeners(listeners);
      store.setIsVisible(false);
    };
  }, [value, setValue, onSearch, cachedIsVisible]);

  return (
    <>
      {/* <Input color={colors.foreground} defaultValue="Type here..." /> */}
      <Container onClick={onTextFieldClick} padding={12} flexDirection={"column"}>
        <Text color={value ? colors.primary : colors.secondary} fontSize={16} fontWeight={"medium"}>{value ? value : placeholder}</Text>
        <Container height={2} backgroundColor={colors.primary} marginTop={-2} />
      </Container>
    </>
  );
}

export default TextInput;