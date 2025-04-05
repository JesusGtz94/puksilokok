import { Product } from "@/api/products/types";
import { colors } from "@/theme";
import { getCategory } from "@/utils/categories";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

type Props = {
  img?: string;
  onClick?: () => void;
  category?: string;
  subcategory?: string;
} & Pick<Product, "title" | "price" | "promotionPrice">;

export const ProductCard = ({
  title,
  img,
  price,
  promotionPrice,
  category: categoryId,
  subcategory: subcategoryId,
  onClick,
}: Props) => {
  const { category, subcategory } = getCategory(categoryId, subcategoryId);

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
        transform: "scale(1.1)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Image
        src={img || "/puksilokok_logo.png"}
        width={["100%", "90%", "85%"]}
        aspectRatio={"1/1"}
        objectFit={"cover"}
        borderRadius={"md"}
      />

      <Box pt={3} ml={2} width={["100%", "90%", "85%"]}>
        <Flex gap={2} alignItems={"flex-start"}>
          <Text
            textAlign={"left"}
            fontWeight={"bold"}
            fontSize={[14, 16]}
            lineClamp={2}
            lineHeight={1.2}
            minHeight={"2.5rem"}
            flex={1}
          >
            {title}
          </Text>

          <Flex flex={1} flexDir={"column"} justifyContent={"flex-end"}>
            <Flex
              bg={colors.brown}
              color={colors.cream}
              width={"90%"}
              justifyContent={"center"}
              borderRadius={"full"}
              p={1}
            >
              <Text
                width={"90%"}
                fontSize={12}
                textAlign={"center"}
                lineClamp={1}
              >
                {subcategory.name || category.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flexDir={"column"}
          justify={"center"}
          alignItems={"flex-start"}
          pt={2}
        >
          <Text
            textDecor={"line-through"}
            color={"gray.400"}
            fontSize={[10, 14]}
            minHeight={"1.2rem"}
          >
            {promotionPrice ? "$" + price : ""}
          </Text>

          <Text fontSize={[12, 16]} fontWeight={"semibold"}>
            ${promotionPrice ? promotionPrice : price}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
