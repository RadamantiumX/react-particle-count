import React, { useRef, useState } from "react";
import cv from "@techstark/opencv-js";


import Nube from '../assets/nube.png';
import Cam from '../assets/web-cam.png';
import Engranaje from '../assets/engranaje.png';


import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react'


window.cv= cv;

export default function ImagePage (){

    const [imageURL, setImageURL] = useState(null);
    const [num, setNum] = useState(50);
    const [cnv, setCnv] = useState(false);
    const [size, setSize] = useState(null);


    const imgRef = useRef();
    //const numRef = useRef();
    const uploadRef = useRef();

    const handleImage=(e)=>{
        const {files} = e.target;

        if(files.length > 0){
            const url = URL.createObjectURL(files[0])
            setImageURL(url);
        }else{
            setImageURL(null);
        }
    }

    const handleValue=(e)=>{
         setNum(parseFloat(e.target.value));
    }

    const triggerUpload = ()=>{
        uploadRef.current.click();
    }

    const onLoad=()=>{
        setCnv(true);
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        

        let mat = cv.imread(imgRef.current);
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


    return(
        <div className="header container text-center color-bg">

           <h1 className="display-3 mt-5">Detección de Microplásticos</h1>
                
            <div class="d-grid gap-2 col-6 mx-auto mt-5">
                <div class="btn css-button-gradient--2" type="button" onClick={triggerUpload}><img src={Nube} alt="cloud-icon" /><p>Subir Imagen</p></div>
                <button class="btn css-button-gradient--2 web-cam" type="button"><img src={Cam} alt="cam-icon" /><p>Usar WebCam</p></button>
            </div>
                        
            <input className="input-img" type="file" accept="image/*" onChange={handleImage} ref={uploadRef}/>
            {imageURL&& <div><img className="img-fluid rounded mx-auto d-block mt-2" src={imageURL} alt="image-test" ref={imgRef}/>
              
               <div className="container">
                <a className="shadow  p-3 bg-body-tertiary rounded coll-cal mt-2" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample"><img src={Engranaje} alt="icon-whell" /><p>Calibrar Umbralización</p></a>
                <div className="collapse" id="collapseExample">
                   <NumberInput  defaultValue={50} min={1} max={255} >
                    <NumberInputField onChange={handleValue} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput> 
                </div>
                
                   </div>
              <button className="btn btn-success mt-2 ml-2" onClick={onLoad}>Ejecutar</button>
                
            </div>}
            
                <canvas className="img-fluid rounded mx-auto d-block mt-2" id="canvas"></canvas>
                
                {cnv && <div className="shadow p-3 mb-5 bg-body-tertiary rounded"><span className="size-font">{size}</span> Objetos detectados <button className="btn btn-danger">Guardar Registro</button></div>}
                
        </div>
    )
}