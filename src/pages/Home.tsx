import { ProductCard } from "@/components";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useOnVisible } from "@/hooks/useOnVisible";
import {
  Box,
  Center,
  Container,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetProducts(12);
  const navigate = useNavigate();

  const ref = useOnVisible(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <Box>
      <Container py={4}>
        {data && (
          <SimpleGrid columns={[2, 2, 3, 4]} gap={8}>
            {data?.map((product) => (
              <ProductCard
                img={product.images && product.images[0]}
                title={product.title}
                price={product.price}
                promotionPrice={product.promotionPrice}
                key={product.id}
                onClick={() => navigate("/product/" + product.id)}
                category={product.category}
                subcategory={product.subcategory}
              />
            ))}
          </SimpleGrid>
        )}
        {data?.length === 0 && (
          <Text fontWeight={"bold"} pt={16} textAlign={"center"}>
            No hay productos que mostrar.
          </Text>
        )}
      </Container>
      {(isLoading || isFetchingNextPage) && (
        <Center>
          <Spinner size={"xl"} />
        </Center>
      )}
      <Box ref={ref} />
    </Box>
  );
};
