import { colors } from "@/theme";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

type Props = {
  message?: string;
  label?: string;
  flexProps?: FlexProps;
  xl?: boolean;
};
const phoneNumber = import.meta.env.VITE_CONTACT_NUMBER;
const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);

export const WhatsAppContactButton = ({
  message,
  label,
  flexProps,
  xl,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const encodedMessage = encodeURIComponent(
    message || "¡Hola! Quiero más información."
  );

  const whatsappLink = isMobile
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

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
        borderWidth={label ? (xl ? 8 : 5) : undefined}
        borderColor={colors.cream}
      >
        <FaWhatsapp color="white" size={xl ? 55 : 32} />
      </Box>
      {label && (
        <Box
          borderColor={colors.brown}
          borderRadius={7}
          borderWidth={1}
          py={2}
          pr={5}
          pl={"3.2rem"}
          ml={-10}
          bg={isHovered ? colors.darkBrown : colors.brown}
        >
          <Text
            fontSize={xl ? 20 : 14}
            fontWeight={"bold"}
            userSelect={"none"}
            color={colors.cream}
          >
            {label}
          </Text>
        </Box>
      )}
    </Flex>
  );
};
