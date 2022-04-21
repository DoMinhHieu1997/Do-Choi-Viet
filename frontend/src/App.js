import { Routes, Route } from "react-router-dom";
import AppMenu from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/homepage";
import AppFooter from "./components/Footer";
import ProductPage from "./components/productpage";
import Detail from "./components/detailpage";
import ActionModal from "./components/actionModal";
import CreateButton from "./components/actionModal/CreateButton";
import { useState } from "react";
import Login from "./components/loginpage";
import { getToken } from "./common";
import NotFound from "./components/notfoundpage";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const token = getToken();

  return (
    <div className="App">
      <AppMenu/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/san-pham/:type" element={<ProductPage />} />
        <Route path="/chi-tiet/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/ho-so" element={<Profile />}>
            <Route path="/ho-so/thong-tin" element={<Profile />} />
            <Route path="/ho-so/bai-viet-cua-toi" element={<MyProfile />} />
            <Route path="/ho-so/bai-viet-da-luu" element={<SavedPost />} />
        </Route>
        <Route path="/tim-kiem" element={<Search />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {
        token &&
          <>
            <CreateButton setOpenModal={setOpenModal}/>
            <ActionModal openModal={openModal} setOpenModal={setOpenModal}/>
          </>
      }
      <AppFooter/>
    </div>
  );
}

export default App;
