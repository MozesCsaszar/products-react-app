import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductsPage from "./components/ProductsPage/ProductsPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<ProductsPage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/products/:id" element={<ProductPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
