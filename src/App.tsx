import { Box, Container, Flex, Heading } from "@chakra-ui/react";

import { LogoWithBackground } from "./atomicComponents";

function App() {
  return (
    <Box>
      <Container py={4}>
        <Flex dir="horizontal" alignItems={"center"}>
          <LogoWithBackground size="s" />
          <Heading> Puksilokok </Heading>
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
