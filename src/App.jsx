import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import ReadCausa from "./ReadCausa";
import CreateCausa from "./CreateCausa";
import UpdateCausa from "./UpdateCausa";
import Navbar from "./Navbar";
import ShowCausa from "./ShowCausa";
import Home from "./Home";
import "./App.css";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <div className="box">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/causas/:id" element={<ShowCausa />} />
          <Route path="/causas" element={<ReadCausa />} />
          <Route path="/agregar-causa" element={<CreateCausa />} />
          <Route path="/actualizar-causa/:id" element={<UpdateCausa />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
