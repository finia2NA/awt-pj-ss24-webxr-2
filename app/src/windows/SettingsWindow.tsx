import ButtonGroup, { OnBGClickProps } from "../components/ButtonGroup";
import Backdrop from "../components/Backdrop";
import { Button } from "../components/apfel/button";
import { Card } from "../components/apfel/card";
import { Container, Text } from "@react-three/uikit";
import useColors from "../hooks/useColors";
import useSettingsStore, { BiTheme, SettingsState } from "../hooks/useSettingsStore";


const SettingsWindow = () => {

  const colors = useColors();
  const { biTheme, setBiTheme } = useSettingsStore((state) => state) as SettingsState;


  const onColorChange = ({ index, option }: OnBGClickProps) => {
    setBiTheme(option as BiTheme);
  }

  const onGoToGithub = () => {
    window.open("https://github.com/finia2NA/awt-pj-ss24-webxr-2");
  }

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

        <ButtonGroup roundTop title="Theme" options={[BiTheme.LIGHT, BiTheme.DARK]} selected={biTheme} onClick={onColorChange} />

        <ButtonGroup title="DVBI-API" options={["Default", "Custom"]} selected={0} onClick={notImplemented} />

        <Backdrop
          borderBottomRadius={20}
          justifyContent={"center"}
          gap={6}
        >
          <Text fontSize={12} fontWeight={'light'}>2024 by Group 2. MIT License.</Text>

          <Button variant="pill" platter size={36}
            backgroundColor={colors.background} paddingX={14}
            onClick={onGoToGithub}>
            <Text fontSize={12} fontWeight={"light"}>
              See the Code
            </Text>
          </Button>

        </Backdrop>

      </Container>

    </Card >
  );
}

export default SettingsWindow;