import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload";
import {
  Box,
  Button,
  Center,
  Container,
  createListCollection,
  Field,
  Flex,
  Heading,
  Image,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { HiUpload, HiXCircle } from "react-icons/hi";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@/constants/categories";
import { CustomInput } from "@/components/atoms";
import { toaster } from "@/components/ui/toaster";
import { useCreateProduct } from "@/hooks/useCreateProduct";
import { compressImage, convertFileToWebP } from "@/utils/images";
import { colors } from "@/theme";

const categoriesCollection = createListCollection({
  items: Object.entries(CATEGORIES).map(([key, category]) => ({
    value: key,
    label: category.name,
  })),
});

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Debes añadir un título"),
  desc: Yup.string().required("Debes añadir una descripción"),
  category: Yup.string().required("Debes seleccionar una categoría"),
  subcategory: Yup.string().required("Debes seleccionar una sub-categoría"),
  price: Yup.string()
    .matches(
      /^(0|[1-9]\d*)(\.\d+)?$/,
      "El precio debe ser un número positivo sin ceros a la izquierda"
    )
    .required("El precio es obligatorio"),
  promotionPrice: Yup.string().matches(
    /^(0|[1-9]\d*)(\.\d+)?$/,
    "El precio debe ser un número positivo sin ceros a la izquierda"
  ),
  minAmount: Yup.string().matches(
    /^(0|[1-9]\d*)$/,
    "El precio debe ser un número entero positivo sin ceros a la izquierda"
  ),
});

const FIELDS = [
  { name: "title", label: "Titulo", required: true },
  { name: "desc", label: "Descripción", required: true },
  { name: "price", label: "Precio", required: true },
  { name: "promotionPrice", label: "Precio de Oferta", required: false },
] as const;

export const CreateProductForm = () => {
  const { mutate, isPending } = useCreateProduct({
    onSuccess: () => {
      toaster.success({ title: "Producto creado correctamente!" });
      setLoadedFiles([]);
      resetForm();
    },
  });

  const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imgProgress, setImgProgress] = useState({ current: 0, total: 0 });

  const {
    errors,
    touched,
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      category: "",
      subcategory: "",
      price: "",
      promotionPrice: "",
    },
    validationSchema: ProductSchema,
    validateOnBlur: true,
    onSubmit: (formData) => {
      if (Number(formData.price) <= Number(formData.promotionPrice)) {
        toaster.error({
          title: "El precio de oferta debe ser menor al precio real.",
        });
      } else {
        mutate({ ...formData, images: loadedFiles });
      }
    },
  });

  const handleAddImages = async (files: File[]) => {
    setLoadingImages(true);
    const compressed: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const imageFile = files[i];
      try {
        setImgProgress({ current: i + 1, total: files.length });
        const webpImg = await convertFileToWebP(imageFile);
        const compressedFile = await compressImage(webpImg);
        compressed.push(compressedFile);
      } catch {
        toaster.error({
          title: "Error al añadir la imagen " + imageFile.name,
        });
        continue;
      }
    }

    setLoadedFiles([...loadedFiles, ...compressed]);
    setLoadingImages(false);
  };
  const changeMainImage = (index: number) => {
    const oldMain = loadedFiles[0];
    const newMain = loadedFiles[index];
    const loadedFilesMutable = [...loadedFiles];
    loadedFilesMutable[0] = newMain;
    loadedFilesMutable[index] = oldMain;

    setLoadedFiles(loadedFilesMutable);
  };

  const subCategoriesCollection = useMemo(() => {
    if (!values.category) {
      setFieldValue("subcategory", "", false);
      return createListCollection({
        items: [],
      });
    }

    return createListCollection({
      items: Object.entries(
        CATEGORIES[values.category as keyof typeof CATEGORIES].subcategories
      ).map(([key, category]) => ({
        value: key,
        label: category.name,
      })),
    });
  }, [values.category, setFieldValue]);

  return (
    <Container>
      <Heading mb={6}>Añadir un producto</Heading>
      {FIELDS.map(({ name, label, required }) => (
        <Box key={name} mt={2}>
          <CustomInput
            name={name}
            label={label}
            required={required}
            textArea={name === "desc"}
            value={values[name]}
            onChange={handleChange}
            invalid={!!errors[name] && touched[name]}
            error={errors[name]}
          />
        </Box>
      ))}

      <Flex mt={4} flexDir={["column", "column", "row"]}>
        {/** SELECT CATEGORY */}
        <Field.Root
          invalid={!!errors.category && touched.category}
          width="320px"
          mr={[0, 0, 8]}
          mb={[4, 4, 0]}
        >
          <SelectRoot
            collection={categoriesCollection}
            value={[values.category]}
            onValueChange={(e) => {
              handleChange({ target: { value: e.value[0], name: "category" } });
            }}
          >
            <SelectLabel>Categoría</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecciona la Categoría" />
            </SelectTrigger>
            <SelectContent>
              {categoriesCollection.items.map((cat) => (
                <SelectItem item={cat} key={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>

            <Field.ErrorText>{errors.category}</Field.ErrorText>
          </SelectRoot>
        </Field.Root>

        {/** SELECT SUBCATEGORY */}
        <Field.Root
          invalid={!!errors.subcategory && touched.subcategory}
          width="320px"
        >
          <SelectRoot
            collection={subCategoriesCollection}
            width="320px"
            value={[values.subcategory]}
            onValueChange={(e) => {
              handleChange({
                target: { value: e.value[0], name: "subcategory" },
              });
            }}
            disabled={!values.category}
          >
            <SelectLabel>Sub-Categoría</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Selecciona la Sub-Categoría" />
            </SelectTrigger>
            <SelectContent>
              {subCategoriesCollection.items.map((cat) => (
                <SelectItem item={cat} key={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>

            <Field.ErrorText>{errors.subcategory}</Field.ErrorText>
          </SelectRoot>
        </Field.Root>
      </Flex>

      {/** FILE UPLOAD */}
      {!loadingImages ? (
        <FileUploadRoot
          accept={"image/*"}
          onFileAccept={(e) => handleAddImages(e.files)}
          maxFiles={10}
          mt={4}
        >
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm">
              <HiUpload /> Subir Imagen
            </Button>
          </FileUploadTrigger>
        </FileUploadRoot>
      ) : (
        <Center p={8} flexDir={"column"}>
          <Text>
            Procesando imagen {imgProgress.current} de {imgProgress.total}...
          </Text>
          <Spinner size="xl" mt={4} ml={4} />
        </Center>
      )}
      <SimpleGrid
        columns={[2, 3, 4, 5, 6, 7]}
        gap={4}
        mt={8}
        justifyItems={"center"}
      >
        {loadedFiles.map((item, i) => (
          <Flex
            key={item.name + i}
            position={"relative"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <Box
              color={"red.700"}
              onClick={() =>
                setLoadedFiles(loadedFiles.filter((_, index) => i !== index))
              }
              _hover={{ color: "red.800", cursor: "pointer" }}
              display="inline-flex"
              borderRadius="full"
              position={"absolute"}
              top={-4}
              left={-2}
            >
              <Box
                position={"absolute"}
                background={"white"}
                height={5}
                width={5}
                borderRadius={"full"}
                top={2}
                left={2}
              />
              <HiXCircle size={35} style={{ zIndex: 1 }} />
            </Box>
            <Image
              src={URL.createObjectURL(item)}
              width={"90%"}
              aspectRatio={"1/1"}
              objectFit={"cover"}
              borderRadius={"5%"}
              mb={2}
            />
            {i === 0 ? (
              <Text textAlign={"center"}>Imagen Principal</Text>
            ) : (
              <Text
                onClick={() => changeMainImage(i)}
                _hover={{
                  textDecor: "underline",
                  cursor: "pointer",
                }}
                textAlign={"center"}
              >
                Priorizar
              </Text>
            )}
          </Flex>
        ))}
      </SimpleGrid>
      <Flex justifyContent={["center", "center", "center", "flex-start"]}>
        <Button
          loading={isPending}
          mt={4}
          onClick={() => handleSubmit()}
          disabled={loadingImages}
          bg={colors.brown}
          width={["80%", "80%", "80%", "xs"]}
        >
          Subir Producto
        </Button>
      </Flex>
    </Container>
  );
};
