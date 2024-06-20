import { Container, Text } from "@react-three/uikit";
import { Button } from "./apfel/button";
import useColors from "../hooks/useColors";
import Backdrop from "./Backdrop";

// Title, options, roundTop, roundBottom, selected: int, onClick
interface ButtonGroupProps {
  title: string;
  options: string[];
  roundTop?: boolean;
  roundBottom?: boolean;
  selected: number;
  // eslint-disable-next-line no-unused-vars
  onClick: (index: number) => void;
}


const ButtonGroup = ({ title, options, roundTop, roundBottom, selected, onClick }: ButtonGroupProps) => {

  const colors = useColors();

  return (
    <Backdrop borderTopRadius={roundTop ? 20 : undefined} borderBottomRadius={roundBottom ? 20 : undefined}>
      <Text
        color={colors.foreground}
        fontSize={20}
        fontWeight={'normal'}
        width={100}
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
    </Backdrop>
  );
}

export default ButtonGroup;
