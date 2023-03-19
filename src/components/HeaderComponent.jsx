import React from "react";
import "./Button.css"
import { Link } from "react-router-dom";

export default function HeaderComponent() {
    return(
        <header>
            <div className="contenedor head">
                 <h1 className="titulo">Detección de objetos por imagenes</h1>
                 <Link to='/media'><button className="btn-start"><span>Empezar</span></button></Link>
            </div>
        </header>

    )
}