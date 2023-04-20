import React from "react";
import "./Button.css"
import { Link } from "react-router-dom";

export default function HeaderComponent() {
    return(
        <header>
            <div className="contenedor head">
                 <h1 className="titulo">Nuestra WEB Permite 
Un flujo de Trabajo Intuitivo: Rápido, Fácil y Robusto
</h1>
                 <Link to='/media'><button className="btn-start"><i class="fa-solid fa-play"></i><span>Empezar</span></button></Link>
            </div>
        </header>

    )
}