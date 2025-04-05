import { useUser } from "@/hooks/useUser";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { WhatsAppContactButton } from "../molecules";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { colors } from "@/theme";

export const Header = () => {
  const { logout, user } = useUser();
  const nav = useNavigate();

  const goToHome = () => nav("/");
  const handleLogout = () => {
    logout();
    goToHome();
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/puksilokok/", "_blank");
  };

  return (
    <Flex
      dir="horizontal"
      alignItems={"center"}
      p={4}
      justifyContent={"space-between"}
      mb={4}
    >
      <Flex
        flexDir={["column", "column", "row"]}
        alignItems={"center"}
        onClick={goToHome}
        _hover={{ cursor: "pointer" }}
      >
        <Image
          src="/puksilokok_logo.png"
          width={["40px"]}
          aspectRatio={"1/1"}
          resize={"cover"}
          userSelect={"none"}
        />
        <Text
          fontFamily={"Montserrat"}
          ml={[2, 4]}
          fontWeight={"500"}
          fontSize={[15, 20]}
          userSelect={"none"}
        >
          Puksilokok
        </Text>
      </Flex>

      {user ? (
        <>
          <Flex alignItems={"center"}>
            <Button variant={"ghost"} size={"xs"} onClick={handleLogout}>
              Cerrar sesión
            </Button>
            <Button
              borderRadius={"full"}
              onClick={() => {
                nav("/product-form");
              }}
              ml={[2, 4]}
              bgColor={colors.brown}
            >
              Add Product
              <MdOutlineAdd size={18} />
            </Button>
          </Flex>
        </>
      ) : (
        <Flex alignItems={"center"}>
          <Button
            mr={4}
            borderRadius={"full"}
            p={2}
            borderWidth={2}
            bg={colors.brown}
            onClick={handleInstagram}
          >
            <FaInstagram size={24} />
          </Button>
          <WhatsAppContactButton />
        </Flex>
      )}
    </Flex>
  );
};
