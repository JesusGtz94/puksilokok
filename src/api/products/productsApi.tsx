import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
} from "firebase/firestore";
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

export const getProducts = async (): Promise<Product[]> => {
  const ref = collection(db, "products");
  const q = query(ref, limit(10));
  const snapshots = await getDocs(q);
  const docs = snapshots.docs.map((snap) => ({ ...snap.data(), id: snap.id }));

  return docs as Product[];
};

export const updateProduct = async (
  fields: Partial<Omit<Product, "id">>,
  id: string
) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, fields);

  return id;
};
