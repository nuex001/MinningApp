import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Sign from "./components/pages/Sign";
import Login from "./components/pages/Login";
import PrivateRouter from "./components/pages/PrivateRouter";
import ScrollToTop from "./components/pages/ScrollToTop";

function App() {

  return (
    <BrowserRouter>
      <div className="container">
      <ScrollToTop/>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route exact path="/sign" element={<Sign />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
