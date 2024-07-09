import { Container } from "@react-three/uikit";
import { Card } from "./apfel/card";
import { Button } from "./apfel/button";
import { Text } from "@react-three/uikit";
import { useState } from "react";
import useKeyboardStore, { KeyboardListeners } from "../hooks/useKeyboardStore.ts";

const normalRows: string[][] = [
  "1234567890ß".split("").concat("<-"),
  "qwertzuiopü".split(""),
  "asdfghjklöä".split("").concat("hide"),
  ["shift"].concat("yxcvbnm,.-".split("")).concat("enter"),
  ["space"]
];

const shiftRows: string[][] = [
  "!\"§$%&/()=?".split("").concat("<-"),
  "QWERTZUIOPÜ".split(""),
  "ASDFGHJKLÖÄ".split("").concat("hide"),
  ["shift"].concat("YXCVBNM;:_".split("")).concat("enter"),
  ["space"]
];

const keyboardScale = 0.7;

const paddings = [24, 48, 24, 0, 80];
const widths = [[20, 20], [30, 10], [30, 10], [30, 10], [400, 0]];

const KeyboardUI = () => {
  const listeners: KeyboardListeners = useKeyboardStore((state) => state);
  const { onKeyPress, onBackspace, onHide, onSearch } = listeners;

  const [shift, setShift] = useState(false);
  const currentRows = shift ? shiftRows : normalRows;


  const clickHandler = (key: string) => {
    switch (key) {
      case "<-":
        onBackspace();
        break;
      case "hide":
        onHide();
        break;
      case "enter":
        onSearch();
        break;
      case "shift":
        setShift(shift => !shift);
        break;
      case "space":
        onKeyPress(" ");
        break;
      default:
        onKeyPress(key);
        break;
    }
  }

  return (
    <Card alignSelf={"flex-start"}>
      <Container flexDirection="column" margin={20 * keyboardScale} gap={6 * keyboardScale}>
        {currentRows.map((row, i) => (
          <Container key={i} flexDirection="row" gap={6 * keyboardScale} paddingLeft={paddings[i] * keyboardScale}>
            {row.map((key, j) => (
              <Button key={j} onClick={() => clickHandler(key)} platter variant="pill" width={(widths[i][0] + key.length * widths[i][1]) * keyboardScale} height={40 * keyboardScale} paddingX={10 * keyboardScale}>
                <Text fontSize={16 * keyboardScale}>{key}</Text>
              </Button>
            ))}
          </Container>
        ))}
      </Container>
    </Card>
  );
};

export default KeyboardUI;