import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ActualizarCausa = () => {
  const { id } = useParams();
  const [causa, setCausa] = useState(null);
  const [nuevaCausa, setNuevaCausa] = useState(null);

  useEffect(() => {
    const getCausa = async () => {
      try {
        const docRef = doc(db, "causas", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCausa(docSnap.data().causa); // Accedemos al campo "causa"
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching causa:", error);
      }
    };
    getCausa();
  }, [id]);

  useEffect(() => {
    if (causa) {
      setNuevaCausa(causa);
    }
  }, [causa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCausa({
      ...nuevaCausa,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "causas", id);
      await updateDoc(docRef, { causa: nuevaCausa }); // Actualizamos el campo "causa"
      setCausa(nuevaCausa);
      alert("Causa actualizada correctamente");
    } catch (error) {
      console.error("Error updating causa:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Actualizar Causa</h2>
        {causa ? (
          <form className="form-agregar-causa" onSubmit={handleSubmit}>
            <div className="agregar-causa-item">
              <label for="materia">Materia:</label>
              <input
                id="materia"
                type="text"
                name="materia"
                value={nuevaCausa?.materia || ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="tribunal">Tribunal:</label>
              <input
                id="tribunal"
                type="text"
                name="tribunal"
                value={nuevaCausa?.tribunal ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="rol">ROL:</label>
              <input
                id="rol"
                type="text"
                name="rol"
                value={nuevaCausa?.rol ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="caratulado">Caratulado:</label>
              <input
                id="caratulado"
                type="text"
                name="caratulado"
                value={nuevaCausa?.caratulado ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="mandante">Mandante:</label>
              <input
                id="mandante"
                type="text"
                name="mandante"
                value={nuevaCausa?.mandante ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="ejecutivo">Ejecutivo:</label>
              <input
                id="ejecutivo"
                type="text"
                name="ejecutivo"
                value={nuevaCausa?.ejecutivo ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="fechasolicitud">Fecha de Solicitud:</label>
              <input
                id="fechasolicitud"
                type="text"
                name="fechasolicitud"
                value={nuevaCausa?.fechasolicitud ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="demandado">Demandado:</label>
              <input
                id="demandado"
                type="text"
                name="demandado"
                value={nuevaCausa?.demandado ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="rut">RUT:</label>
              <input
                id="rut"
                type="text"
                name="rut"
                value={nuevaCausa?.rut ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="agregar-causa-item">
              <label for="direccion">Dirección:</label>
              <input
                id="direccion"
                type="text"
                name="direccion"
                value={nuevaCausa?.direccion ?? ""}
                onChange={handleChange}
              />
            </div>
            <button className="btn-agregar-causa" type="submit">
              Actualizar Causa
            </button>
          </form>
        ) : (
          <p>Cargando detalles de la causa...</p>
        )}
      </div>
    </>
  );
};

export default ActualizarCausa;
