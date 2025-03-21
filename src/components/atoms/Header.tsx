import { Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const Header = () => {
  const nav = useNavigate();
  return (
    <Flex
      dir="horizontal"
      alignItems={"center"}
      p={2}
      onClick={() => nav("/")}
      _hover={{ cursor: "pointer" }}
    >
      <Image
        src="/puksilokok_logo.png"
        width={["40px"]}
        aspectRatio={"1/1"}
        resize={"cover"}
      />
      <Text ml={2} fontWeight={"500"} fontSize={12}>
        Puksilokok
      </Text>
    </Flex>
  );
};
