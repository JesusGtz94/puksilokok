import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { auth } from "@/firebase";
import { Button, Container, Flex, Heading, Input } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", pass: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!credentials.email || !credentials.pass) {
      return toaster.error({
        title: "Añade usuario y contraseña",
      });
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, credentials.email, credentials.pass)
      .then(() => {
        setLoading(false);
        nav("/");
      })
      .catch((e) => {
        setLoading(false);
        toaster.error({
          title: "Usuario y contraseña inválidos",
          description: e.message,
        });
      });
  };
  return (
    <Container display={"flex"} flexDir={"column"} alignItems={"center"}>
      <Flex width={["100%", "100%", "70%", "50%"]} flexDir={"column"}>
        <Heading mb={4}>Iniciar Sesión</Heading>
        <form onSubmit={handleLogin}>
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
          <Flex flexDir={"column"}>
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

            <Button loading={loading} type="submit">
              Login
            </Button>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};
