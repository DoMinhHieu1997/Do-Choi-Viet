import { Routes, Route } from "react-router-dom";
import AppMenu from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homepage";
import AppFooter from "./components/Footer";
import ProductPage from "./components/productpage";
import Detail from "./components/detailpage";
import ActionModal from "./components/actionModal";
import CreateButton from "./components/actionModal/CreateButton";
import { useState, useEffect } from "react";
import Login from "./components/loginpage";
import NotFound from "./components/notfoundpage";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState();

  return (
    <div className="App">
      <AppMenu/>
      <Routes>
        <Route path="/" element={<HomePage setToken={setToken}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/san-pham/:type" element={<ProductPage />} />
        <Route path="/chi-tiet/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        token &&
          <>
            <CreateButton setOpenModal={setOpenModal}/>
            <ActionModal openModal={openModal} setOpenModal={setOpenModal} token={token}/>
          </>
      }
      <AppFooter/>
    </div>
  );
}

export default App;
