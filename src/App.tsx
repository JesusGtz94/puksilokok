import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Header } from "./components/atoms";
import { auth, db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./queryClient";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { CreateProductForm } from "./pages/CreateProductForm";
import { ProductCard } from "./components";
import { toaster, Toaster } from "./components/ui/toaster";
import { PasswordInput } from "./components/ui/password-input";

const mockArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const [credentials, setCredentials] = useState({ email: "", pass: "" });
  const [user, setUser] = useState<User>();

  const handleLogin = () => {
    if (!credentials.email || !credentials.pass) {
      return toaster.error({ title: "Usuario y contraseña inválidos" });
    }

    signInWithEmailAndPassword(auth, credentials.email, credentials.pass).catch(
      (e) =>
        toaster.error({
          title: "Usuario y contraseña inválidos",
          description: e.message,
        })
    );
  };

  const createTestFirestore = async () => {
    await addDoc(collection(db, "test"), {
      name: "test",
      desc: "a testing doc",
    });
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <Header />
                <Outlet />
              </>
            }
          >
            <Route
              element={
                <Box>
                  {user && (
                    <Text textAlign={"center"}>
                      {user.displayName || user.email}
                    </Text>
                  )}
                  <Container py={4}>
                    {user && (
                      <Button onClick={logout} mb={4}>
                        logout
                      </Button>
                    )}
                    <Button onClick={createTestFirestore} mb={4}>
                      create doc
                    </Button>
                    <SimpleGrid columns={[2, 2, 3, 4]} gap={4}>
                      {mockArray.map((i) => (
                        <ProductCard
                          img="https://picsum.photos/200/300"
                          title="Product Name"
                          price="9999.99"
                          promotionPrice={
                            Math.random() > 0.5 ? "8888.88" : undefined
                          }
                          key={i}
                        />
                      ))}
                    </SimpleGrid>
                  </Container>
                </Box>
              }
              path="/"
            />
            <Route element={<CreateProductForm />} path="/product-form" />
            <Route
              element={
                <Flex width={"40%"} mb={4} flexDir={"column"}>
                  <Input
                    value={credentials.email}
                    placeholder="Email"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        email: e.target.value,
                      })
                    }
                  />
                  <PasswordInput
                    value={credentials.pass}
                    my={4}
                    placeholder="Password"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        pass: e.target.value,
                      })
                    }
                  />
                  <Button onClick={handleLogin}>Login</Button>
                </Flex>
              }
              path="/login"
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
