import { Container } from "@react-three/uikit";
import useColors from "../hooks/useColors";
import useKeyboardStore, { KeyboardListeners } from "../hooks/useKeyboardStore.ts";
import { Text } from "@react-three/uikit";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect } from "react";



interface TextInputProps {
  value: string;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void;
  onSearch?: () => void;
}

const TextInput = ({ value, placeholder, setValue, onSearch }: TextInputProps) => {
  const colors = useColors();
  const keyboardProperties = useKeyboardStore((state) => state);

  // hiding and showing the keyboard
  const onTextFieldClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    keyboardProperties.toggleVisibility();
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
      keyboardProperties.setIsVisible(false);
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
    store.setIsVisible(true);

    // Cleanup
    return () => {
      store.removeEventListeners(listeners);
      store.setIsVisible(false);
    };
  }, [value, setValue, onSearch]);
  // FIXME: Adding keyboardProperties here causes infinite loop, because adding the listener changes the state, which re-executes the effect, which adds the listener again, etc.
  // This can be fixed by memoizing the listeners so that they are comparable, then checking if those listeners have changed before adding them again.
  // Should be done.. later :)

  return (
    <>
      {/* <Input color={colors.foreground} defaultValue="Type here..." /> */}
      <Container onClick={onTextFieldClick} padding={12} flexDirection={"column"}>
        <Text color={value ? colors.primary : colors.secondary}>{value ? value : placeholder}</Text>
        <Container height={2} backgroundColor={colors.primary} marginTop={-2} />
      </Container>
    </>
  );
}

export default TextInput;