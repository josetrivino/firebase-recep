import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CreateNotificacion = () => {
  const { id } = useParams();
  const [causa, setCausa] = useState(null);
  const [notificacion, setNotificacion] = useState({
    fechaNotificacion: "",
    nuevaNotificacion: "",
    anexoNotificacion: "",
  });

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
      setNotificacion(causa);
    }
  }, [causa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificacion((prevCausa) => ({
      ...prevCausa,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "causas", id);
      await updateDoc(docRef, { causa: notificacion });
      setCausa(notificacion);
      alert("Causa actualizada correctamente");
    } catch (error) {
      console.error("Error updating causa:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Agregar Notificacion</h2>
        {causa ? (
          <form className="form-agregar-causa" onSubmit={handleSubmit}>
            <div className="agregar-causa-item">
              <label>Rol:</label>
              <p>{notificacion?.rol || ""}</p>
            </div>
            <div className="agregar-causa-item">
              <label>Caratulado:</label>
              <p>{notificacion?.caratulado || ""}</p>
            </div>
          </form>
        ) : (
          <p>Cargando detalles de la causa...</p>
        )}
      </div>
      <div>
        {causa ? (
          <form className="form-agregar-causa" onSubmit={handleSubmit}>
            <div className="agregar-causa-item">
              <label>Fecha de Notificacion:</label>
              <input
                type="date"
                name="fechaNotificacion"
                value={notificacion?.fechaNotificacion || ""}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="agregar-causa-item">
              <label htmlFor="nuevaNotificacion">Estado Notificacion</label>
              <select
                id="nuevaNotificacion"
                name="nuevaNotificacion"
                value={notificacion.nuevaNotificacion}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="pendiente">Pendiente</option>
                <option value="negativa">Negativa</option>
                <option value="positiva">Positiva</option>
              </select>
            </div>
            <div className="agregar-causa-item">
              <label htmlFor="anexoNotificacion">Anexo Notificacion</label>
              <select
                id="anexoNotificacion"
                name="anexoNotificacion"
                value={notificacion.anexoNotificacion}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="personal">Personal</option>
                <option value="familiar">Familiar</option>
                <option value="vecino">Vecino</option>
                <option value="personaAdulta">Persona Adulta</option>
              </select>
            </div>
            <button className="btn-agregar-causa" type="submit">
              Agregar Notificacion
            </button>
          </form>
        ) : (
          <p>Cargando detalles de la notificacion...</p>
        )}
      </div>
    </>
  );
};

export default CreateNotificacion;
