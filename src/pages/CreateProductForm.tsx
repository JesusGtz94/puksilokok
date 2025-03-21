import { FileUploadRoot, FileUploadTrigger } from "@/components/ui/file-upload";
import {
  Button,
  Container,
  createListCollection,
  Image,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SimpleGrid,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { HiUpload } from "react-icons/hi";
import imageCompression from "browser-image-compression";
import * as Yup from "yup";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@/constants/categories";
import { CustomInput } from "@/components/atoms";

const categoriesCollection = createListCollection({
  items: Object.entries(CATEGORIES).map(([key, category]) => ({
    value: key,
    label: category.name,
  })),
});

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  desc: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  subcategory: Yup.string().required("Required"),
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
  { name: "category", label: "Categoría", required: true },
  { name: "subcategory", label: "Sub-Categoría", required: true },
  { name: "price", label: "Precio", required: true },
  { name: "promotionPrice", label: "Precio de Oferta", required: false },
] as const;

export const CreateProductForm = () => {
  const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
  const { errors, touched, handleChange, values, handleSubmit } = useFormik({
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
    onSubmit: console.log,
  });

  const handleImage = async (files: File[]) => {
    const compressed: File[] = [];

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      maxIteration: 3,
    };

    for (let i = 0; i < files.length; i++) {
      const imageFile = files[i];
      try {
        console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const compressedFile = await imageCompression(imageFile, options);
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        compressed.push(compressedFile);
      } catch {
        console.log("Error adding the file: ", imageFile.name);
        continue;
      }
    }

    setLoadedFiles([...loadedFiles, ...compressed]);
  };

  const [category, setCategory] = useState<keyof typeof CATEGORIES>();
  const [subCategory, setSubCategory] = useState<string>();

  const subCategoriesCollection = useMemo(() => {
    if (!category) {
      setSubCategory("");
      return createListCollection({
        items: [],
      });
    }

    return createListCollection({
      items: Object.entries(CATEGORIES[category].subcategories).map(
        ([key, category]) => ({
          value: key,
          label: category.name,
        })
      ),
    });
  }, [category]);

  return (
    <Container py={4}>
      {FIELDS.map(({ name, label, required }) => (
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
      ))}

      {/** FILE UPLOAD */}
      <FileUploadRoot
        accept={"image/*"}
        onFileAccept={(e) => handleImage(e.files)}
        maxFiles={8}
      >
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm">
            <HiUpload /> Subir Imagen
          </Button>
        </FileUploadTrigger>
      </FileUploadRoot>
      <SimpleGrid columns={[2, 3, 4, 5, 6, 7]} gap={4} justifyItems={"center"}>
        {loadedFiles.map((item, i) => (
          <Image
            src={URL.createObjectURL(item)}
            key={item.name + i}
            width={"90%"}
            aspectRatio={"1/1"}
            objectFit={"cover"}
            borderRadius={"5%"}
          />
        ))}
      </SimpleGrid>

      {/** SELECT CATEGORY */}
      <SelectRoot
        collection={categoriesCollection}
        width="320px"
        value={[category || ""]}
        onValueChange={(e) =>
          setCategory(e.value[0] as keyof typeof CATEGORIES)
        }
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
      </SelectRoot>

      {/** SELECT SUBCATEGORY */}
      <SelectRoot
        collection={subCategoriesCollection}
        width="320px"
        value={[subCategory || ""]}
        onValueChange={(e) =>
          setSubCategory(e.value[0] as keyof typeof CATEGORIES)
        }
        disabled={!category}
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
      </SelectRoot>
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </Container>
  );
};
