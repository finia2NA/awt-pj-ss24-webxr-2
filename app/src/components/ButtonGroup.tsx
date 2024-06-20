import { Container, Text } from "@react-three/uikit";
import { Button } from "./apfel/button";
import useColors from "../hooks/useColors";

// Title, options, roundTop, roundBottom, selected: int, onClick
interface ButtonGroupProps {
  title: string;
  options: string[];
  roundTop: boolean;
  roundBottom: boolean;
  selected: number;
  // eslint-disable-next-line no-unused-vars
  onClick: (index: number) => void;
}

const ButtonGroup = ({ title, options, roundTop, roundBottom, selected, onClick }: ButtonGroupProps) => {

  const colors = useColors();

  return (
    <Container
      borderRadius={10}
      borderTopRadius={roundTop ? 40 : undefined}
      borderBottomRadius={roundBottom ? 40 : undefined}
      backgroundColor={colors.background}
      backgroundOpacity={colors.backgroundOpacity}
      padding={10}
    >
      <Text
        color={colors.foreground}
      >{title}</Text>
      <Container
        gap={10}
      >
        {options.map((option) => (
          <Button
            key={option}
            variant="pill"
            platter
            backgroundColor={colors.background}
            selected={options.indexOf(option) === selected}
            onClick={() => onClick(options.indexOf(option))}
          >
            <Text color={colors.foreground} >{option}</Text>
          </Button>
        ))}
      </Container>
    </Container>
  );
}

export default ButtonGroup;
