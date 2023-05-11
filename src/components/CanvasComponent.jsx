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

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import popup from '../assets/tooltip.jpg';

window.cv= cv;

export default function CanvasComponent() {

    //Contexts variables
    const {canvasURL, num, setNum, setCnv, setSize, setImageURL, setCanvasURL, setDisplay} = useStateContext();

    const canvasRef = useRef();
    
        //const [tooltip, setTooltip] = useState({});
        const [canvasZoom, setCanvasZoom] = useState(null);

        const[node, setNode] = useState(null)
        
       
    

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

//Umbralizacion con OpenCV (IDEM en "ImageComponen" solo cambia el archivo de la imagen q es CANVAS)
    const onLoad=()=>{
        setCnv(true);
        
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        

        let mat = cv.imread(canvasRef.current);
        cv.cvtColor(mat, mat, cv.COLOR_BGR2GRAY);
        cv.threshold(mat, mat, num, 255, cv.THRESH_BINARY_INV);
        
        cv.findContours(mat, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)

        cv.cvtColor(mat, mat, cv.COLOR_GRAY2RGB)
        
        for (let i = 0; i < contours.size(); i++) {
            cv.drawContours(mat, contours, i,[255,0,0,255],1,cv.LINE_8,hierarchy,0); 
            
            let cnt = contours.get(i);
            let sze = cv.contourArea(cnt);
            let moments  = cv.moments(cnt);
            let cx = moments.m10 / moments.m00;
            let cy = moments.m01 / moments.m00;
           
            
            //cv.putText(mat,`${i+1}:${sze.toFixed(2)}mm2`, new cv.Point(cx,cy),cv.FONT_HERSHEY_SIMPLEX,0.3,[255,0,0,255],1)
            
             
            canvasZoom.addEventListener('click', (event) => {
                const rect = canvasZoom.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

            
                if (cv.pointPolygonTest(cnt, new cv.Point(x, y), false) > 0) {
                  setNode(node.innerHTML=`Objeto:${i+1} Ø:${sze/100}mm²`);
                  
                }
              });
        }
        console.log(contours.size());
        console.log(contours)
        setSize(contours.size());
        cv.imshow('canvas', mat);
        mat.delete();


    }
    //Captura con la webcam
    function handleCapture() {
        const cnv = document.getElementById("cnv");
        const ctx = cnv.getContext("2d");
        ctx.drawImage(canvasURL,15,5,350,150);
        
    }

    //If the variable is set, execute the method
    useEffect(() => {
        if(canvasURL !== null){
           handleCapture(); 
        }
        setCanvasZoom(document.getElementById('canvas'))
        setNode(document.getElementById('node'));
       
    }, [canvasZoom,node]);
    
    return(
        <>
        <div>
           <Button leftIcon={<ArrowBackIcon/>} onClick={handleBack}>Volver</Button>
            <canvas id="cnv" className="img-fluid rounded mx-auto d-block mt-2" ref={canvasRef}></canvas>
            
        <div className="container">
        <OverlayTrigger
         
         placement="top"
         overlay={
           <Tooltip id="tooltip-top">
             Ajuste de los parámetros para optimizar la detección de objetos en la imágen. Colocar valores numéricos entre 1 al 255 inclusive.
           </Tooltip>
         }
       >  
         <a className="shadow  p-3 bg-body-tertiary rounded coll-cal mt-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><img src={Engranaje} alt="icon-whell" /><p>Calibrar Binarización</p></a>
         </OverlayTrigger>
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
            <OverlayTrigger
         
         placement="right"
         overlay={
           <Tooltip id="tooltip-right">
             Empezar con la detección
           </Tooltip>
              }
             >
         <Button className="mt-2" rightIcon={<TriangleDownIcon/>} colorScheme="green" onClick={onLoad}>Ejecutar</Button>
         </OverlayTrigger>
     </div>
     <div className="figure">
     <OverlayTrigger
         
         placement="top"
         overlay={
           <Tooltip id="tooltip-top-img">
             Hacer clic en zona blanca para verificar diámetro.
             <img src={popup} alt="img-tooltip"/>
           </Tooltip>
              }
             >
     <canvas className="img-fluid rounded mx-auto d-block mt-2" id="canvas"></canvas>
     </OverlayTrigger>
     <div id="node"></div>
     </div>
     </>
    )
}