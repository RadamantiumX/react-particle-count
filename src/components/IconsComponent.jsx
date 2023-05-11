import React from "react";
import { Carousel } from "react-bootstrap";
import Calculadora from '../assets/calculadora.png';
import Spray from '../assets/spray.png';
import Frame from '../assets/frame.png';
import Ruler from '../assets/ruler.png';
import Marco from '../assets/marco.png';
import Abaco from '../assets/abaco.png';


export default function IconsComponent() {
    return(
        <div className="icon-c" id="icon-c">
           <Carousel className="carousel-icons mt-5">
      <Carousel.Item>
        <div className="carousel-box">
          
        <img
          className="carousel-img"
          src={Calculadora}
          alt="First slide"
        />
        <p className="text-carousel">
          1. Análisis de datos por medio de fotogramas existentes o instantáneos.
        </p>
     
       </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="carousel-box">
          
          <img
            className="carousel-img"
            src={Spray}
            alt="First slide"
          />
          <p className="text-carousel">
           2. Eliminación de ruido convirtiendo las imágenes obtenidas a binario.
          </p>
       
         </div>
      </Carousel.Item>
      
        <Carousel.Item>
      <div className="carousel-box">
          
          <img
            className="carousel-img"
            src={Ruler}
            alt="First slide"
          />
          <p className="text-carousel">
            3. Medición de las partículas a partir de fotogramas.
          </p>
       
         </div>
        </Carousel.Item>
        <Carousel.Item>
      <div className="carousel-box">
          
          <img
            className="carousel-img"
            src={Abaco}
            alt="First slide"
          />
          <p className="text-carousel">
            4. Conteo de objetos detectados.
          </p>
       
         </div>
        </Carousel.Item>
        <Carousel.Item>
      <div className="carousel-box">
          
          <img
            className="carousel-img"
            src={Marco}
            alt="First slide"
          />
          <p className="text-carousel">
            5. Resultado rápido y eficaz a través de la WEP o bien accediendo a la WPA.
          </p>
       
         </div>
        </Carousel.Item>
      </Carousel>
        </div>
    )
}