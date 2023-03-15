import React,{useRef, useState, useEffect} from "react";
import cv from "@techstark/opencv-js";
import Engranaje from '../assets/engranaje.png';
import { useStateContext } from "../contexts/ContextProvider";
import {
    
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
   
  } from '@chakra-ui/react';

window.cv= cv;

export default function CanvasComponent() {

    const {canvasURL, num, setNum, setCnv, setSize} = useStateContext();

    const canvasRef = useRef();

    const handleValue=(e)=>{
        setNum(parseFloat(e.target.value));
   }

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
        ctx.drawImage(canvasURL, 0, 0, 200, 200);
        /*const src = cnv.toDataURL("image/jpeg", 1.0);
        setHistory([src, ...history]);*/
    }

    useEffect(() => {
        if(canvasURL !== null){
           handleCapture(); 
        }
       
    }, []);
    
    return(
        <>
        <div><canvas id="cnv" className="img-fluid rounded mx-auto d-block mt-2" ref={canvasRef}></canvas>
            
        <div className="container">
         <a className="shadow  p-3 bg-body-tertiary rounded coll-cal mt-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><img src={Engranaje} alt="icon-whell" /><p>Calibrar Umbralización</p></a>
         <div className="collapse" id="collapseExample">
            <NumberInput width={300} align="center" margin="auto" defaultValue={50} min={1} max={255} >
             <NumberInputField onChange={handleValue} />
             <NumberInputStepper>
                 <NumberIncrementStepper />
                 <NumberDecrementStepper />
             </NumberInputStepper>
         </NumberInput> 
         </div>
         
            </div>
       <button className="btn btn-success mt-2 ml-2" onClick={onLoad}>Ejecutar</button>
         
     </div>

     <canvas className="img-fluid rounded mx-auto d-block mt-2" id="canvas"></canvas>
     </>
    )
}