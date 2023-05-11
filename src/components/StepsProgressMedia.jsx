import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import tuto1 from '../assets/tuto-1.jpg';
import tuto2 from '../assets/tuto-2.jpg';
import tuto3 from '../assets/tuto-3.jpg';
import tuto4 from '../assets/tuto-4.jpg';
import tuto5 from '../assets/tuto-5.jpg';
import tooltip from '../assets/tooltip.jpg';

export default function StepsProgressMedia() {
    return(
        <>
        <div className="step-container">
         <ul className="progressbar">

         <OverlayTrigger
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             <img src={tuto1} alt="tutoriales-deteccion-objetos"/>
           </Tooltip>
            }
             >  
        <li className="active"><i class="fa-solid fa-photo-film"></i><b> Primer paso:</b>  Elección del medio por el cual vamos a subir la imagen a evaluar.</li>
        </OverlayTrigger>

        <OverlayTrigger     
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             <img src={tuto2} alt="tutoriales-deteccion-objetos"/>
           </Tooltip>
         }
        >  
        <li className="active"><i class="fa-solid fa-gears"></i><b> Segundo paso:</b> Ajuste de parámetros (si es necesario).</li>
        </OverlayTrigger>

        <OverlayTrigger   
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             <img src={tuto3} alt="tutoriales-deteccion-objetos"/>
           </Tooltip>
         }
         >  
        <li className="active"><i class="fa-solid fa-play"></i><b> Tercer paso:</b> Ejecute la detección automática de microplasticos.</li>
        </OverlayTrigger>
        
      </ul>
      <ul className="progressbar">
      <OverlayTrigger        
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             <img src={tooltip} alt="tutoriales-deteccion-objetos"/>
           </Tooltip>
         }
        >  
        <li className="active"><i class="fa-solid fa-ruler"></i><b> Cuarto Paso:</b> Medición con solo un click en la figura detectada.</li>
        </OverlayTrigger>

        <OverlayTrigger   
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             <img src={tuto4} alt="tutoriales-deteccion-objetos"/>
           </Tooltip>
         }
        >  
        <li className="active"><i class="fa-solid fa-eye"></i><b> Quinto Paso:</b> Verificación cant. de partículas detectadas.</li>
        </OverlayTrigger>

        <OverlayTrigger    
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             <img src={tuto5} alt="tutoriales-deteccion-objetos"/>
           </Tooltip>
         }
       >  
        <li className="active"><i class="fa-solid fa-floppy-disk"></i><b> Sexto Paso:</b> Guardamos el registro con los datos obtenidos.</li>
        </OverlayTrigger>

      </ul>
       </div>
        </>
    )
}