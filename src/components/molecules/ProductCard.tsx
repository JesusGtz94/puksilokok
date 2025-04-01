import { Product } from "@/api/products/types";
import { colors } from "@/theme";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  img?: string;
} & Pick<Product, "title" | "price" | "promotionPrice">;

export const ProductCard = ({ title, img, price, promotionPrice }: Props) => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      borderRadius={"md"}
      borderBottomWidth={1}
      bg={colors.cream}
      borderColor={colors.pink}
      py={2}
      transition="transform 0.3s ease-in-out"
      _hover={{
        transform: "scale(1.2)",
        cursor: "pointer",
      }}
    >
      <Image
        src={img}
        width={["100%", "90%", "85%"]}
        aspectRatio={"1/1"}
        objectFit={"cover"}
        borderRadius={"md"}
      />

      <Box pt={2} ml={2} width={["100%", "90%", "85%"]}>
        <Text
          width={"70%"}
          textAlign={"left"}
          fontWeight={"bold"}
          fontSize={[14, 16]}
          lineClamp={2}
          lineHeight={1.2}
          minHeight={"2.5rem"}
        >
          {title}
        </Text>

        <Flex
          flexDir={"column"}
          justify={"center"}
          alignItems={"flex-start"}
          pt={2}
        >
          <Text
            textDecor={"line-through"}
            fontWeight={"semibold"}
            color={"gray.400"}
            fontSize={[10, 14]}
            minHeight={"1.2rem"}
          >
            {promotionPrice ? "$" + price : ""}
          </Text>

          <Text fontSize={[12, 16]} fontWeight={"bold"}>
            ${promotionPrice ? promotionPrice : price}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
