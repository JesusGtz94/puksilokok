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
      pt={2}
      _hover={{
        background: colors.creamMedium,
        borderRadius: "2%",
        cursor: "pointer",
      }}
    >
      <Image
        src={img}
        width={["100%", "90%", "85%"]}
        aspectRatio={"1/1"}
        objectFit={"cover"}
        borderRadius={"2%"}
        shadow="3px 3px 2px 1px rgba(0, 0, 0, 0.3)"
      />

      <Box py={2}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={[14, 18]}>
          {title}
        </Text>
        <Flex justify={"center"} alignItems={"center"} height={"14px"}>
          <Text fontSize={[12, 16]} fontWeight={"500"}>
            ${price}
          </Text>
          {promotionPrice && (
            <>
              <Text fontSize={[12, 16]} mx={1}>
                -
              </Text>
              <Text
                textDecor={"line-through"}
                fontSize={[12, 16]}
                fontWeight={"500"}
              >
                ${promotionPrice}
              </Text>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
