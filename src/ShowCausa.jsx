import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const ShowCausa = () => {
  const { id } = useParams(); // Obtiene el ID de la causa de la URL
  const [causa, setCausa] = useState(null);

  useEffect(() => {
    const getCausa = async () => {
      try {
        const docRef = doc(db, "causas", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCausa(docSnap.data().causa); // No necesitas acceder a .causa aquí
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching causa:", error);
      }
    };
    getCausa();
  }, [id]); // Ejecuta el efecto cada vez que cambia el ID de la causa

  return (
    <>
      <div className="causa-viewer">
        <h2>Causa</h2>
        {causa ? (
          <div className="causa-viewer-container">
            <div className="causa-item">
              <strong>
                <p>rol:</p>
              </strong>
              <p>{causa.rol}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>materia: </p>
              </strong>
              <p>{causa.materia}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>tribunal: </p>
              </strong>
              <p>{causa.tribunal}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>caratulado: </p>
              </strong>
              <p>{causa.caratulado}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>mandante: </p>
              </strong>
              <p>{causa.mandante}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>ejecutivo: </p>
              </strong>
              <p>{causa.ejecutivo}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>fecha de solicitud: </p>
              </strong>
              <p>{causa.fechasolicitud}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>demandado: </p>
              </strong>
              <p>{causa.demandado}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>rut: </p>
              </strong>
              <p>{causa.rut}</p>
            </div>
            <div className="causa-item">
              <strong>
                <p>direccion: </p>
              </strong>
              <p>{causa.direccion}</p>
            </div>
          </div>
        ) : (
          <p>Cargando detalles de la causa...</p>
        )}
      </div>
    </>
  );
};

export default ShowCausa;
