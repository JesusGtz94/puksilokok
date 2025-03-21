import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { Product } from "./types";

export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const ref = collection(db, "products");
  const snapshot = await addDoc(ref, product);

  return { ...product, id: snapshot.id };
};

export const getProduct = async (id: string): Promise<Product> => {
  const ref = doc(db, "products", id);
  const snapshot = await getDoc(ref);
  const data = snapshot.data();

  return { ...data, id: snapshot.id } as Product;
};

export const updateProduct = async (
  product: Omit<Product, "id">,
  id: string
) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, product);

  return { ...product, id } as Product;
};
