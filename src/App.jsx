import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navbar from "./assets/Nav";
import Sell_p from "./components/SellPersonal";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path = '/' element = {<Home/>}></Route>
          <Route path = '/sell' element = {<Sell_p/>}></Route>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;
