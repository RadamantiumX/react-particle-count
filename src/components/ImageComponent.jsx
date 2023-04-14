import React,{useRef} from "react";
import { useStateContext } from "../contexts/ContextProvider";
import cv from "@techstark/opencv-js";
import Engranaje from '../assets/engranaje.png';

import {
    
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button
   
  } from '@chakra-ui/react';

  import { ArrowBackIcon, TriangleDownIcon } from "@chakra-ui/icons";

window.cv= cv;

export default function ImageComponent() {


    //Contexts Variables
    const {imageURL, num, setNum, setCnv, setSize, setImageURL, setCanvasURL, setDisplay} = useStateContext();

    const imgRef = useRef();

    const handleBack=()=>{
        setImageURL(null);
        setCanvasURL(null);
        setCnv(null);
        setDisplay(true);
        setNum(50);
    }

    const handleValue=(e)=>{
        setNum(parseFloat(e.target.value));
   }

   //Umbralizacion o Binarización con OpenCV
    const onLoad=()=>{
        setCnv(true);

        //Definimos las variables
        const contours = new cv.MatVector(); //Instanciamos el objeto MatVector
        const hierarchy = new cv.Mat(); //Instanciamos el Objeto Mat
        

        let mat = cv.imread(imgRef.current);//Tomamos la imagen de la variable "imgRef" y la leemos con la variable de la libreria OpenCv
        cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY);//Primero pasamos la imagen a escala de grises, utilizamos la propiedad e OpenCv COLOR_BGR2GRAY
        cv.threshold(mat, mat, num, 255, cv.THRESH_BINARY); //Luego seguimod con el BINARIZADO de la imagen
        
        cv.findContours(mat, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);//Buscamos los contornos de cada elemento distinto al color de fondo

        cv.cvtColor(mat, mat, cv.COLOR_GRAY2RGB); 

        //Recorremos los contornos y les dibujamos el borde
        for (let i = 0; i < contours.size(); i++) {
            cv.drawContours(mat, contours, i,[255,0,0,255],1,cv.LINE_8,hierarchy,0);
            let cnt = contours.get(i);
            let sze = cv.contourArea(cnt);
            let moments  = cv.moments(cnt);
            let cx = moments.m10 / moments.m00;
            let cy = moments.m01 / moments.m00;
            
            cv.putText(mat,`Obj: ${i+1}`, new cv.Point(cx,cy),cv.FONT_HERSHEY_SIMPLEX,0.3,[255,0,0,255],1);
        }
        
        console.log(contours.size());//Mostramos en consola
        setSize(contours.size());
        
        cv.imshow('canvas', mat);
        mat.delete();


    }
    
    return(
        <>
        <div>
            <Button leftIcon={<ArrowBackIcon/>} onClick={handleBack}>Volver</Button>
            <img className="img-fluid rounded mx-auto d-block mt-5" src={imageURL} alt="image-test" ref={imgRef}/>
            
        <div className="container">
         <a className="shadow p-3 bg-body-tertiary rounded coll-cal mt-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><img src={Engranaje} alt="icon-whell" /><p>Calibrar Binarización</p></a>
         <div className="collapse" id="collapseExample">

            {/* Input Number */}
            <NumberInput width={300} align="center" margin="auto" defaultValue={50} min={1} max={255} >
             <NumberInputField onChange={handleValue} />
             <NumberInputStepper>
                 <NumberIncrementStepper />
                 <NumberDecrementStepper />
             </NumberInputStepper>
         </NumberInput> 
         
         </div>
         
            </div>
       <Button className="mt-2" rightIcon={<TriangleDownIcon/>} colorScheme="green" onClick={onLoad}>Ejecutar</Button>
         
     </div>
     <canvas className="img-fluid rounded mx-auto d-block mt-2" id="canvas"></canvas>
     </>
    )
}