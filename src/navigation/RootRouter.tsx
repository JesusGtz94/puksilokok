import { Header } from "@/components/atoms";
import { useAuthListener } from "@/hooks/useAuthListener";
import { CreateProductForm } from "@/pages/CreateProductForm";
import { Home } from "@/pages/Home";
import { LoginForm } from "@/pages/LoginForm";
import { ProductDetails } from "@/pages/ProductDetails";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";

export const RootRouter = () => {
  useAuthListener();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <>
              <Header />
              <Outlet />
              <Box height={8} />
            </>
          }
        >
          <Route element={<Home />} path="/" />
          <Route element={<ProductDetails />} path="/product/:id" />
          <Route element={<CreateProductForm />} path="/product-form" />
          <Route element={<LoginForm />} path="/login" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
