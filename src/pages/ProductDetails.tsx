import { ImageCarousel, WhatsAppContactButton } from "@/components/molecules";
import { useGetProduct } from "@/hooks/useGetProduct";
import { colors } from "@/theme";
import { getCategory } from "@/utils/categories";
import { formatPrice } from "@/utils/products";
import {
  Card,
  Center,
  Container,
  Flex,
  Heading,
  Spinner,
  Tag,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams } from "react-router";

export const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProduct(id);
  const { category, subcategory } = getCategory(
    product?.category,
    product?.subcategory
  );

  const smallDevice = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  });

  const { currentPrice, previousPrice, discount } = product
    ? formatPrice(product.price, product.promotionPrice)
    : {};

  const message = "¡Hola! Me interesa este producto:\n" + window.location.href;

  return (
    <Container py={4}>
      {isLoading && (
        <Center>
          <Spinner size={"xl"} />
        </Center>
      )}

      {product && (
        <Flex
          gap={4}
          flexDir={["column", "column", "column", "row"]}
          alignItems={["center", "center", "center", "flex-start"]}
        >
          {smallDevice && (
            <Heading
              textAlign={"left"}
              width={["100%", "80%", "70%", "50%"]}
              fontSize={40}
              lineHeight={1}
              mb={8}
            >
              {product.title}
            </Heading>
          )}
          <Flex width={["100%", "80%", "70%", "50%"]}>
            <ImageCarousel images={product.images || []} />
          </Flex>
          <Flex
            width={["100%", "85%", "75%", "55%"]}
            flexDir={"column"}
            p={8}
            pt={[0, 0, 0, 8]}
          >
            {!smallDevice && (
              <Heading textAlign={"left"} fontSize={40} lineHeight={1}>
                {product.title}
              </Heading>
            )}
            <Flex my={[0, 0, 0, 8]}>
              <Tag.Root
                mr={2}
                size={"lg"}
                bg={colors.cream}
                color={colors.brown}
              >
                <Tag.Label>{category.name}</Tag.Label>
              </Tag.Root>
              <Tag.Root
                size={"lg"}
                bg={colors.brown}
                color={colors.cream}
                borderColor={colors.brown}
              >
                <Tag.Label>{subcategory.name}</Tag.Label>
              </Tag.Root>
            </Flex>

            <Flex
              flexDir={"column"}
              justify={"center"}
              alignItems={"flex-start"}
              my={2}
            >
              <Text
                textDecor={"line-through"}
                color={"gray.400"}
                fontSize={30}
                minHeight={"1.2rem"}
              >
                {previousPrice ? "$ " + previousPrice : ""}
              </Text>

              <Flex alignItems={"center"}>
                <Text fontSize={35}>$&nbsp;{currentPrice}</Text>
                {!!discount && (
                  <Text fontSize={25} color={colors.brandPink}>
                    &nbsp;{discount}% OFF
                  </Text>
                )}
              </Flex>
            </Flex>

            <Text color={"gray.500"} fontSize={18} minHeight={"1.2rem"}>
              Multiples Colores Disponibles
            </Text>
            <Flex
              justifyContent={["center", "center", "center", "flex-start"]}
              width={"100%"}
              mt={12}
            >
              <WhatsAppContactButton
                xl
                label="Haz tu pedido!"
                message={message}
              />
            </Flex>
          </Flex>
        </Flex>
      )}

      {product?.desc && (
        <Flex mt={[4, 4, 4, 8]} flexDir={"column"}>
          <Heading as={"h2"} px={4} fontSize={25} mb={4}>
            Detalles
          </Heading>
          <Card.Root
            color={colors.brown}
            bg={colors.cream}
            borderColor={colors.brown}
          >
            <Card.Body textAlign={"justify"} pl={8} fontSize={18}>
              {product.desc}
            </Card.Body>
          </Card.Root>
        </Flex>
      )}
    </Container>
  );
};
