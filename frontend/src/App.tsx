import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "./components/ProductsPage/ProductsPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<ProductsPage />}></Route>
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/products/:id" element={<ProductDetailsPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
