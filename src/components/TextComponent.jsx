import React from "react";
import IA from '../assets/ia.jpg';
import Ruedas from '../assets/muestras-imagen.png';

export default function TextComponent() {
    return(
        <>
        <div className="text-c" id="text-c">
            <div className="contenedor items">
                <div className="box-1 text-box">
                 <p className="text-content">Al trabajar desde una WEP - WPA podemos garantizar más eficiencia en tiempo de recalibrado y un flujo de trabajo confiable y escalable que le permite determinar el área de tamaño, la cantidad de partículas microplasticas que existen en sus muestras más rápidamente y más sólidas que nunca.</p>
                </div>
                <div className="box-2 image-box">
                    <img className="img-txt" src={IA} alt="Inteligencia Artificial"/>
                </div>
            </div>
            <div className="contenedor items">
               <div className="box-1 image-box">
                  <img className="img-txt" src={Ruedas} alt="Engranajes" />
               </div>
               <div className="box-2 text-box">
                  <p className="text-content">
                  La automatización de esta WPA se encuentra basada en algoritmos propios y el uso de tecnología de aprendizaje automático le permite maximizar la cantidad de sus resultados y minimizar los esfuerzos manuales. En sus muestras se identificarán el tamaño en área y la cantidad de partículas de 20 tipos de polímetros diferentes (incluidos los que se producen en mayor cantidad, y por lo tanto cubre un 97% de los microplásticos que se pueden encontrar en el medio ambiente).
                  </p>
               </div>
            </div>
        </div>
        </>
    )
}