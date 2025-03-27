import { useUser } from "@/hooks/useUser";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const Header = () => {
  const { logout, user } = useUser();
  const nav = useNavigate();

  const goToHome = () => nav("/");
  const handleLogout = () => {
    logout();
    goToHome();
  };

  const phoneNumber = "+525547675616"; // Reemplaza con tu número
  const message = encodeURIComponent("¡Hola! Quiero más información.");
  const whatsappLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  const handleClick = () => {
    window.open(whatsappLink, "_blank");
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
        dir="horizontal"
        alignItems={"center"}
        onClick={goToHome}
        _hover={{ cursor: "pointer" }}
      >
        <Image
          src="/puksilokok_logo.png"
          width={["40px"]}
          aspectRatio={"1/1"}
          resize={"cover"}
        />
        <Text ml={2} fontWeight={"500"} fontSize={16}>
          Puksilokok
        </Text>
      </Flex>

      {user ? (
        <>
          <Flex alignItems={"center"}>
            <Button
              size={"xs"}
              onClick={() => {
                nav("/product-form");
              }}
              mr={4}
            >
              Product form
            </Button>

            <Text textAlign={"center"} mr={4}>
              {user.displayName || user.email}
            </Text>

            <Button variant={"outline"} size={"xs"} onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Button size={"xs"} onClick={handleClick}>
            Contactar
          </Button>
        </>
      )}
    </Flex>
  );
};
