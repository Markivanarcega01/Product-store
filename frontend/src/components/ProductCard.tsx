import React from "react";
import type { Product } from "../interface/product.interface";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function ProductCard({
  product,
  name,
  price,
  image,
  setName,
  setPrice,
  setImage,
  deleteProduct,
  updateProduct,
}: {
  product: Product;
  name: string;
  price: string;
  image: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  deleteProduct: (data: string) => void;
  updateProduct: () => void;
}) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  const handleUpdate = () => {
    updateProduct();
    onClose();
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        h="48"
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={() => {
              setName(product.name);
              setPrice(String(product.price));
              setImage(product.image);
              onOpen();
            }}
            colorScheme="blue"
            aria-label="EditButton"
          ></IconButton>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id!)}
            colorScheme="blue"
            aria-label="DeleteButton"
          ></IconButton>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder={"Price"}
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                placeholder={"Image URL"}
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
