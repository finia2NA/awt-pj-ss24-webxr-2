import ButtonGroup, { OnBGClickProps } from "../components/ButtonGroup";
import Backdrop from "../components/Backdrop";
import { Button } from "../components/apfel/button";
import { Card } from "../components/apfel/card";
import { Container, Text } from "@react-three/uikit";
import useColors from "../hooks/useColors";
import useSettingsStore, { BiTheme, MovementMode, SettingsState } from "../hooks/useSettingsStore";

/**
 * The SettingsWindow component renders the settings interface for the application.
 * It allows users to change the theme and navigate to the project's GitHub page.
 */
const SettingsWindow = () => {

  const colors = useColors();
  const { biTheme, setBiTheme, movementMode, setMovementMode } = useSettingsStore((state) => state) as SettingsState;

  /**
   * Handles the change of theme color.
   * @param {OnBGClickProps} param0 - The index and option of the selected theme.
   */
  const onColorChange = ({ index, option }: OnBGClickProps) => {
    setBiTheme(option as BiTheme);
  }

  const onMovementModeChange = ({ index, option }: OnBGClickProps) => {
    setMovementMode(option as MovementMode);
  }

  /**
   * Opens the project's GitHub repository in a new browser tab.
   */
  const onGoToGithub = () => {
    window.open("https://github.com/finia2NA/awt-pj-ss24-webxr-2");
  }

  /**
   * Placeholder function for features not yet implemented.
   * Throws an error when called.
   */
  const notImplemented = () => {
    throw new Error("Function not implemented.");
  }

  return (
    <Card
      alignSelf={"flex-start"}
      paddingTop={24}
      paddingBottom={40}
      paddingX={20}
      flexDirection={"column"}
      gap={16}
    >
      <Text fontSize={32}>XR-DVBI</Text>

      <Container flexDirection={"column"} gap={1}>
        <ButtonGroup
          roundTop
          title="Theme"
          options={[BiTheme.LIGHT, BiTheme.DARK]}
          selected={biTheme}
          onClick={onColorChange}
        />

        <ButtonGroup
          roundTop
          title="Window Movement"
          options={[MovementMode.CURSOR_BASED, MovementMode.CONTROLLER_BASED]}
          selected={movementMode}
          onClick={onMovementModeChange}
        />

        <ButtonGroup
          title="DVBI-API"
          options={["Default", "Custom"]}
          selected={0}
          onClick={notImplemented}
        />

        <Backdrop
          borderBottomRadius={20}
          justifyContent={"center"}
          gap={6}
        >
          <Text fontSize={13} fontWeight={'medium'}>2024 by Group 2. MIT License.</Text>

          <Button
            variant="pill"
            platter
            size={36}
            backgroundColor={colors.background}
            paddingX={14}
            onClick={onGoToGithub}
          >
            <Text fontSize={13} fontWeight={"medium"}>
              See the Code
            </Text>
          </Button>
        </Backdrop>
      </Container>
    </Card>
  );
}

export default SettingsWindow;
