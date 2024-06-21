import ButtonGroup, { OnBGClickProps } from "../components/ButtonGroup";
import Backdrop from "../components/Backdrop";
import { Button } from "../components/apfel/button";
import { Card } from "../components/apfel/card";
import { Container, Text } from "@react-three/uikit";
import useColors from "../hooks/useColors";
import useDisplayModeStore, { BiTheme } from "../hooks/useDisplayModeStore";


const SettingsWindow = () => {

  const colors = useColors();
  const { biTheme, setBiTheme } = useDisplayModeStore((state) => state);


  const onColorChange = ({ index, option }: OnBGClickProps) => {
    setBiTheme(option as BiTheme);
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

        <ButtonGroup roundTop title="Theme" options={[BiTheme.LIGHT, BiTheme.DARK]} selected={0} onClick={onColorChange} />

        <ButtonGroup title="DVBI-API" options={["Default", "Custom"]} selected={0} onClick={notImplemented} />

        <Backdrop
          borderBottomRadius={20}
          justifyContent={"center"}
          gap={6}
        >
          <Text fontSize={12} fontWeight={'light'}>2024 by Group 2. MIT License. See the</Text>

          <Button variant="pill" platter size={36}
            backgroundColor={colors.background} paddingX={14}
            onClick={notImplemented}>
            <Text fontSize={12} fontWeight={"light"}>
              Projects we are using
            </Text>
          </Button>

        </Backdrop>

      </Container>

    </Card >
  );
}

export default SettingsWindow;