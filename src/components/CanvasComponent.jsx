import React,{useRef, useState, useEffect} from "react";
import cv from "@techstark/opencv-js";
import Engranaje from '../assets/engranaje.png';
import { useStateContext } from "../contexts/ContextProvider";
import {
    Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
   
  } from '@chakra-ui/react';

import { ArrowBackIcon, TriangleDownIcon } from "@chakra-ui/icons";  

window.cv= cv;

export default function CanvasComponent() {

    //Contexts variables
    const {canvasURL, num, setNum, setCnv, setSize, setImageURL, setCanvasURL, setDisplay} = useStateContext();

    const canvasRef = useRef();

    const handleBack=()=>{
        setImageURL(null);
        setCanvasURL(null);
        setCnv(null);
        setDisplay(true);
        setNum(50);
    }

    //Set 3rd value OpenCV method "threshold"
    const handleValue=(e)=>{
        setNum(parseFloat(e.target.value));//Only accept double type number
   }

//Umbralizacion con OpenCV
    const onLoad=()=>{
        setCnv(true);
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        

        let mat = cv.imread(canvasRef.current);
        cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY);
        cv.threshold(mat, mat, num, 255, cv.THRESH_BINARY);
        
        cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)

        cv.cvtColor(mat, mat, cv.COLOR_GRAY2RGB)
        
        for (let i = 0; i < contours.size(); i++) {
            const { m00, m01, m10 } = cv.moments(contours.get(i));
            if (m00 === 0) continue;
            const center = new cv.Point(m10 / m00, m01 / m00);
            cv.circle(mat, center, 2, [0, 0, 0, 255], 6);
            cv.circle(mat, center, 2, [0, 255, 0, 255], 2);
        }

        console.log(contours.size());
        setSize(contours.size());
        cv.imshow('canvas', mat);
        mat.delete();


    }
    //Captura con la webcam
    function handleCapture() {
        const cnv = document.getElementById("cnv");
        const ctx = cnv.getContext("2d");
        ctx.drawImage(canvasURL,15,5,350,150);
        /*const src = cnv.toDataURL("image/jpeg", 1.0);
        setHistory([src, ...history]);*/
    }

    //If the variable is set, execute the method
    useEffect(() => {
        if(canvasURL !== null){
           handleCapture(); 
        }
       
    }, []);
    
    return(
        <>
        <div>
           <Button leftIcon={<ArrowBackIcon/>} onClick={handleBack}>Volver</Button>
            <canvas id="cnv" className="img-fluid rounded mx-auto d-block mt-2" ref={canvasRef}></canvas>
            
        <div className="container">
         <a className="shadow  p-3 bg-body-tertiary rounded coll-cal mt-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><img src={Engranaje} alt="icon-whell" /><p>Calibrar Umbralización</p></a>
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