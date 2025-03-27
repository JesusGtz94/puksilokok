import { toaster } from "@/components/ui/toaster";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImages = async (files: File[], path: string) => {
  const urls: string[] = [];

  for (const file of files) {
    try {
      const storageRef = ref(storage, `${path}/${file.name}`);
      const uploadedFile = await uploadBytes(storageRef, file);
      try {
        urls.push(await getDownloadURL(uploadedFile.ref));
      } catch {
        toaster.error({
          title: "No se pudo obtener la url del archivo " + file.name,
        });
      }
    } catch {
      toaster.error({ title: "No se pudo subir el archivo " + file.name });
    }
  }

  return urls;
};
