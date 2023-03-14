import React, { useRef, useState } from "react";
import cv from "@techstark/opencv-js";
import './ImagePage.css'

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
         setNum(e.target.value);
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
        <div>
            <button onClick={triggerUpload}>Subir una imagen</button>
            <input className="input-img" type="file" accept="image/*" onChange={handleImage} ref={uploadRef}/>
            {imageURL&& <div><img src={imageURL} alt="image-test" ref={imgRef}/>
              <button onClick={onLoad}>Empezar</button>
              
            </div>}
            
                <canvas id="canvas"></canvas>
                
                {cnv&& <div>{size}</div>}
                {cnv&& <input type="number" min="1" max="255" onChange={handleValue}/>}
        </div>
    )
}