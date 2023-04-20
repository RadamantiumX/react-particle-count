import React from "react";
import Clasif from '../assets/class.png';
import Calibre from '../assets/calibre.png';

export default function InfoMidComponent() {
    return(
        <>
        <div className="info-mid" id="info-mid">
            <div className="general-box">
            <div className="container-mid">
                <h4 className="mid-title">Como Funciona?</h4>
                <p className="mid-text">Por medio del uso de librerías de modelos pre entrenados en IA y la conjunción de algoritmos propios podemos establecer simplemente con una fotografía tomada instantáneamente desde un celular o microscopio o imágenes preexistentes determinar la cantidad de partículas que existen en ese fotograma además de su área.</p>
            </div>
           <div className="low-box">
            <img className="low-img" src={Clasif} alt="Classification icon" />
            <div>
                <h4 className="low-title">#Clasificación</h4>
                <p className="low-txt">Para detectar los microplásticos en la muestra, se aplica un algoritmo automatizado donde todos los espectros de referencia en la base de datos se comparan con todos los espectros en el mapa de bits de la imagen suministrada. La base de datos de referencia contiene tanto polímeros plásticos como materiales naturales, y se han utilizado espectros que muestran similitudes con los de los plásticos. Los diversos materiales en la base de datos de espectros se asignan a diferentes grupos de materiales, como PP, PE, PET, etc. El algoritmo utilizado para detectar partículas microplásticas aplica 2 umbrales de puntuación de probabilidad. Primero, el algoritmo encuentra todos los píxeles donde el puntaje de probabilidad más alto pertenece a un material plástico y donde ese puntaje está por encima del umbral más alto.</p>
            </div>
           </div>
           <div className="low-box">
           <img className="low-img responsive" src={Calibre} alt="Calibre icon" /> 
            <div>
                <h4 className="low-title">#Medición</h4>
                <p className="low-txt">A continuación, las partículas de microplástico así identificadas se analizan en cuanto a la distancia más larga entre los píxeles de la partícula, lo que da como resultado la dimensión principal de la partícula. La dimensión menor se encuentra asumiendo que la forma de la partícula es una elipse y conociendo el área de la partícula en el escaneo o fotograma. Se supone que la tercera dimensión, el espesor, es 0,67 veces la dimensión menor. El volumen se calcula asumiendo que la partícula es un elipsoide. La masa se calcula a partir del volumen y la densidad del material plástico identificado.
              </p>
            </div>
            <img className="low-img non-responsive" src={Calibre} alt="Calibre icon" />           
           </div>
           <div className="btn-box">
           <a className="btn-start" href="#img-info"><i class="fa-solid fa-plus"></i><span>Ver ejemplos...</span></a>
           </div>
           </div>
        </div>
        </>
    )
}