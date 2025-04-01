import { colors } from "@/theme";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  message?: string;
  label?: string;
  flexProps?: FlexProps;
};
const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;

export const WhatsAppContactButton = ({ message, label, flexProps }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const encodedMessage = encodeURIComponent(
    message || "¡Hola! Quiero más información."
  );

  const whatsappLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappLink, "_blank");
  };
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      onClick={handleClick}
      _hover={{ cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...flexProps}
    >
      <Box
        bg={isHovered ? "#1fb557" : "#25D366"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        borderRadius={"full"}
        zIndex={1}
      >
        <FaWhatsapp color="white" size={32} />
      </Box>
      {label && (
        <Box
          borderColor={colors.brown}
          borderRadius={7}
          borderWidth={1}
          py={1}
          pr={3}
          pl={10}
          ml={-9}
          bg={isHovered ? colors.creamMedium : undefined}
        >
          <Text fontWeight={"bold"} userSelect={"none"}>
            {label}
          </Text>
        </Box>
      )}
    </Flex>
  );
};
