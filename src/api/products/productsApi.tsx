import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { Product } from "./types";

export const createProduct = async (
  product: Omit<Product, "id" | "titleLower">
): Promise<Product> => {
  const ref = collection(db, "products");
  const snapshot = await addDoc(ref, {
    ...product,
    titleLower: product.title.toLowerCase(),
  });

  return {
    ...product,
    titleLower: product.title.toLowerCase(),
    id: snapshot.id,
  };
};

export const getProduct = async (id: string): Promise<Product> => {
  const ref = doc(db, "products", id);
  const snapshot = await getDoc(ref);
  const data = snapshot.data();

  return { ...data, id: snapshot.id } as Product;
};

export const getProducts = async (
  lastDoc: QueryDocumentSnapshot | null,
  itemsPerPage: number = 5
) => {
  const ref = collection(db, "products");
  const q = query(
    ref,
    orderBy("title", "asc"),
    startAfter(!lastDoc || typeof lastDoc === "string" ? "" : lastDoc),
    limit(itemsPerPage)
  );
  const snapshots = await getDocs(q);
  const products = snapshots.docs.map((snap) => ({
    ...snap.data(),
    id: snap.id,
  })) as Product[];

  const lastSnapshot = snapshots.docs[snapshots.docs.length - 1];

  return { products, lastDoc: lastSnapshot };
};

export const updateProduct = async (
  fields: Partial<Omit<Product, "id">>,
  id: string
) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, fields);

  return id;
};
