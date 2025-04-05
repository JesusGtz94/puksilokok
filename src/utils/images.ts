import imageCompression from "browser-image-compression";

const compressOptions = {
  maxSizeMB: 0.6,
  maxWidthOrHeight: 1600,
  useWebWorker: true,
  maxIteration: 3,
};

export const compressImage = async (imageFile: File) => {
  const compressedFile = await imageCompression(imageFile, compressOptions);
  return compressedFile;
};

export const convertFileToWebP = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      if (!event.target?.result) {
        return reject(new Error("Error al leer el archivo"));
      }

      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("No se pudo obtener el contexto del canvas"));
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("No se pudo convertir a WebP"));
            }
            const webpFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".webp"),
              {
                type: "image/webp",
                lastModified: Date.now(),
              }
            );
            resolve(webpFile);
          },
          "image/webp",
          1.0
        );
      };

      img.onerror = () => reject(new Error("Error al cargar la imagen"));
      img.src = event.target.result as string;
    };

    reader.onerror = () => reject(new Error("Error al leer el archivo"));
    reader.readAsDataURL(file);
  });
};
