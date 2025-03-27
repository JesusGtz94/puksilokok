import { ProductCard } from "@/components";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Box, Center, Container, SimpleGrid, Spinner } from "@chakra-ui/react";

export const Home = () => {
  const { data, isLoading } = useGetProducts();

  return (
    <Box>
      <Container py={4}>
        {isLoading && (
          <Center>
            <Spinner size={"xl"} />
          </Center>
        )}
        {data && (
          <SimpleGrid columns={[2, 2, 3, 4]} gap={4}>
            {data?.map((product) => (
              <ProductCard
                img={product.images && product.images[0]}
                title={product.title}
                price={product.price}
                promotionPrice={product.promotionPrice}
                key={product.id}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};
