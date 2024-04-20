import { useState, useEffect } from "react";
import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";
import CreateNotificacion from "./CreateNotificacion"; // Importa el componente CreateNotificacion

const CreateCausa = () => {
  const [nuevaCausa, setNuevaCausa] = useState({
    materia: "",
    tribunal: "",
    rol: "",
    caratulado: "",
    mandante: "",
    ejecutivo: "",
    fechasolicitud: "",
    demandado: "",
    rut: "",
    direccion: "",
  });

  const causasCollectionRef = collection(db, "causas");

  const createCausa = async () => {
    await addDoc(causasCollectionRef, { causa: nuevaCausa });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCausa({ ...nuevaCausa, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createCausa(nuevaCausa);
    alert("Causa agregada correctamente");
    // Limpia el formulario después de agregar la causa
    setNuevaCausa({
      materia: "",
      tribunal: "",
      rol: "",
      caratulado: "",
      mandante: "",
      ejecutivo: "",
      fechasolicitud: "",
      demandado: "",
      rut: "",
      direccion: "",
    });
  };

  return (
    <>
      <h2>Agregar Causa</h2>
      <form className="form-agregar-causa" onSubmit={handleSubmit}>
        <div className="agregar-causa-item">
          <label for="materia">Materia:</label>
          <input
            id="materia"
            type="text"
            name="materia"
            value={nuevaCausa.materia}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="tribunal">Tribunal:</label>
          <input
            id="tribunal"
            type="text"
            name="tribunal"
            value={nuevaCausa.tribunal}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="rol">ROL:</label>
          <input
            id="rol"
            type="text"
            name="rol"
            value={nuevaCausa.rol}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="caratulado">Caratulado:</label>
          <input
            id="caratulado"
            type="text"
            name="caratulado"
            value={nuevaCausa.caratulado}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="mandante">Mandante:</label>
          <input
            id="mandante"
            type="text"
            name="mandante"
            value={nuevaCausa.mandante}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="ejecutivo">Ejecutivo:</label>
          <input
            id="ejecutivo"
            type="text"
            name="ejecutivo"
            value={nuevaCausa.ejecutivo}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="fechaSolicitud">Fecha de Solicitud:</label>
          <input
            id="fechaSolicitud"
            type="date"
            name="fechasolicitud"
            value={nuevaCausa.fechasolicitud}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="demandado">Demandado:</label>
          <input
            id="demandado"
            type="text"
            name="demandado"
            value={nuevaCausa.demandado}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="rut">RUT:</label>
          <input
            id="rut"
            type="text"
            name="rut"
            value={nuevaCausa.rut}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="agregar-causa-item">
          <label for="direccion">Dirección:</label>
          <input
            id="direccion"
            type="text"
            name="direccion"
            value={nuevaCausa.direccion}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button className="btn-agregar-causa" type="submit">
          Agregar Causa
        </button>
      </form>
    </>
  );
};
export default CreateCausa;
