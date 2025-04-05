import { toaster } from "@/components/ui/toaster";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImages = async (
  files: File[],
  path: string,
  actions?: {
    onSuccess?: (file: File) => void;
    onError?: (file: File) => void;
  }
) => {
  const urls: string[] = [];

  for (const file of files) {
    try {
      const storageRef = ref(storage, `${path}/${file.name}`);
      const uploadedFile = await uploadBytes(storageRef, file);
      try {
        urls.push(await getDownloadURL(uploadedFile.ref));
      } catch {
        actions?.onError?.(file);
      }
    } catch {
      actions?.onError?.(file);
      toaster.error({ title: "No se pudo subir el archivo " + file.name });
    }
  }

  return urls;
};
