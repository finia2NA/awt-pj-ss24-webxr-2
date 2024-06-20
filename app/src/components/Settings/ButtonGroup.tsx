import { Container, Text } from "@react-three/uikit";
import { Button } from "../apfel/button";
import useColors from "../../hooks/useColors";

// Title, options, roundTop, roundBottom, selected: int, onClick
interface ButtonGroupProps {
  title: string;
  options: string[];
  roundTop: boolean;
  roundBottom: boolean;
  selected: number;
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
      height={40}
      padding={10}
    >
      <Text color={colors.foreground}>{title}</Text>
      <Container
        gap={10}>
        {options.map((option, index) => (
          <Button
            key={option}
            variant="pill"
            platter
            backgroundColor={colors.background}
          >
            <Text color={colors.foreground} >{option}</Text>
          </Button>
        ))}
      </Container>
    </Container>
  );
}

export default ButtonGroup;
