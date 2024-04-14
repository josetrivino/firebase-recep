import { useState, useEffect } from "react";
import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadCausa = () => {
  const [causas, setCausas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCausas, setFilteredCausas] = useState([]);
  const causasCollectionRef = collection(db, "causas");

  const getCausas = async () => {
    const data = await getDocs(causasCollectionRef);
    setCausas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setFilteredCausas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getCausas();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = causas.filter((causa) => {
      if (causa && causa.causa) {
        // Convierte el término de búsqueda a minúsculas
        const searchTerm = event.target.value.toLowerCase();
        // Verifica si algún valor de los campos de la causa incluye el término de búsqueda
        for (const key in causa.causa) {
          if (
            causa.causa.hasOwnProperty(key) &&
            typeof causa.causa[key] === "string"
          ) {
            if (causa.causa[key].toLowerCase().includes(searchTerm)) {
              return true;
            }
          }
        }
      }
      return false;
    });
    setFilteredCausas(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "causas", id));
      const updatedCausas = causas.filter((causa) => causa.id !== id);
      setCausas(updatedCausas);
      setFilteredCausas(updatedCausas);
    } catch (error) {
      console.error("Error al eliminar la causa:", error);
    }
  };

  return (
    <>
      <div className="search-container">
        <input
          className="input-search"
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="causas-container">
        <h2>Causas</h2>
        <div className="causa-container">
          {filteredCausas.map((causa) => (
            <div className="causa-card" key={causa.id}>
              <Link to={`/causas/${causa.id}`}>
                <div className="text-card-causa">
                  <p>
                    <strong>
                      <span>ROL: </span>
                      {causa.causa.rol}
                    </strong>
                  </p>
                  <p>CARATULADO:</p>
                  <p>
                    <strong>{causa.causa.caratulado}</strong>
                  </p>
                </div>
              </Link>
              <div className="btns-causa">
                <Link to={`/actualizar-causa/${causa.id}`}>
                  <button className="btn-causa">
                    <UpdateIcon fontSize="small" />
                  </button>
                </Link>
                <button
                  className="btn-causa"
                  onClick={() => handleDelete(causa.id)}
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadCausa;
