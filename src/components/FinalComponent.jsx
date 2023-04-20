import React from "react";
import { Link } from "react-router-dom";

export default function FinalComponent() {
    return(
        <>
        <div className="final-comp">
            <div className="final-box">
            
           <Link to="/info"><button className="btn-start"><i class="fa-solid fa-exclamation"></i><span>Información</span></button></Link>
            <p className="final-text">Accedé a la documentacion para ver los tutoriales y algunos ejemplos de resultados obtenidos.</p>
            </div>
        </div>
        </>
    )
}