import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { productService } from "../services/product.service";
import ProductCard from "../components/ProductCard";
import type { ProductForm } from "../interface/product.interface";
import React from "react";

const { useGetProducts, useDeleteProduct, useUpdateProduct } = productService();

const Homepage = () => {
  const { data: getProducts, isLoading } = useGetProducts();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const toast = useToast();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");

  const handleProductUpdate = ({
    id,
    details,
  }: {
    id: string;
    details: ProductForm;
  }) => {
    console.log("homepage", id, details);
    updateProduct.mutate(
      {
        id,
        details,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Product updated",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // You can lift a "requestClose" cb or use a modal controller in parent to close here
        },
        onError: () => {
          toast({
            title: "Update Failed",
            description: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };
  const handleProductDeletion = (id: string) => {
    deleteProduct.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Product Deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("deleted");
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(error.message);
      },
    });
  };
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        {!isLoading && getProducts && getProducts.length != 0 ? (
          <>
            <Text
              fontSize={30}
              fontWeight={"bold"}
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}
              textAlign={"center"}
            >
              Current Products
            </Text>

            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 3,
              }}
              spacing={10}
              w={"full"}
            >
              {getProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  name={name}
                  price={price}
                  image={image}
                  setName={setName}
                  setPrice={setPrice}
                  setImage={setImage}
                  deleteProduct={() => handleProductDeletion(product._id)}
                  updateProduct={() =>
                    handleProductUpdate({
                      id: product._id,
                      details: {
                        name,
                        price,
                        image,
                      },
                    })
                  }
                />
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found {""}
            <ChakraLink as={ReactRouterLink} to={"/create"}>
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                create a product
              </Text>
            </ChakraLink>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Homepage;
