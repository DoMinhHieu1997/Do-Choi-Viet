import { Routes, Route } from "react-router-dom";
import AppMenu from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homepage";
import AppFooter from "./components/Footer";
import ProductPage from "./components/productpage";
import Detail from "./components/detailpage";
import ActionModal from "./components/actionModal";
import CreateButton from "./components/actionModal/CreateButton";
import { useEffect, useState } from "react";
import Login from "./components/loginpage";
import NotFound from "./components/notfoundpage";
import { getToken } from "./common";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [tokenExist, setToken] = useState(false);
  const [isCreateProduct, setIsCreateProduct] = useState(true);
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (getToken()) {
      setToken(getToken());
    }
  },[]);

  useEffect(() => {
    console.log(productInfo);
  }, [productInfo]);

  return (
    <div className="App">
      <AppMenu setToken={setToken} token={tokenExist}/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/san-pham/:type" element={<ProductPage />} />
        <Route path="/chi-tiet/:id" element={<Detail setOpenModal={setOpenModal} token={tokenExist} setIsCreateProduct={setIsCreateProduct} setProductInfo={setProductInfo}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        tokenExist &&
          <>
            <CreateButton setOpenModal={setOpenModal} setIsCreateProduct={setIsCreateProduct} setProductInfo={setProductInfo}/>
            <ActionModal openModal={openModal} setOpenModal={setOpenModal} token={tokenExist} isCreateProduct={isCreateProduct} productInfo={productInfo}/>
          </>
      }
      <AppFooter/>
    </div>
  );
}

export default App;
