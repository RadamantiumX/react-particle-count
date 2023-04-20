import React from "react";
import { Link } from "react-router-dom";

export default function FinalInfoComponent() {
   return(
    <>
    <div className="final-info">
        <div className="final-box">
           <Link to="/media"><a className="btn-start" ><i class="fa-solid fa-play"></i><span> Empezar</span></a></Link>
           <p className="final-text">Podés empezar a evaluar las imagenes en la sección de selección de medio.</p>
        </div>
    </div>
    </>
   ) 
}