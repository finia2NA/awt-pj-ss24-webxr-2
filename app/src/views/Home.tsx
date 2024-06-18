import { Text, Container } from "@react-three/uikit";

export default function Home() {

    return (
        <Container 
            width={900}
            height={300}
            borderRadius={6}
            backgroundColor={"white"}
            alignSelf={"center"}
            padding={20}
        >
            <Text>
                Lorem ipsum - Home
            </Text>
        </Container>
    );
}