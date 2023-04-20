import React, { useRef, useState, useEffect } from "react";

import { useDisclosure } from '@chakra-ui/react';


import Nube from '../assets/nube.png';
import Cam from '../assets/web-cam.png';
import Play from '../assets/play.png';
import Cap from '../assets/camara.png';

//Input number Chakra UI
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';

import { TimeIcon, CheckIcon } from "@chakra-ui/icons";  
import { useStateContext } from "../contexts/ContextProvider";

//Components
import ImageComponent from "../components/ImageComponent";
import CanvasComponent from "../components/CanvasComponent"; 
import LocateComponent from "../components/LocateComponent";

import axiosClient from "../axios-cliente";
import Home from '../assets/home.png';
import { Link } from "react-router-dom";


export default function ImagePage (){
    
    //Contexts Variables
    const {setImageURL,setCanvasURL,setDisplay,setNotification,canvasURL,imageURL,cnv,size,latitud,longitud, display,notification} = useStateContext(); 
    const [video, setVideo] = useState();
       
    const videoRef = useRef();

    const uploadRef = useRef();

    //Para formulario
    const sizeRef = useRef();
    const latRef = useRef();
    const lonRef = useRef();

    //WebCam button Modal
    const { isOpen, onOpen, onClose } = useDisclosure();


    //Imagen to URL
    const handleImage=(e)=>{
        const {files} = e.target;

        if(files.length > 0){
            const url = URL.createObjectURL(files[0])
            setImageURL(url);
            setDisplay(false);
        }else{
            setImageURL(null);
            setDisplay(true);
        }
    }

   //Button switch whit input 
    const triggerUpload = ()=>{
        uploadRef.current.click();
    }

    //Start web-cam view
    const rdyToUse=()=>{
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then((stream) => {
                setVideo(document.getElementById("video-test"));
                video.srcObject = stream;
                console.log(stream);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("No tienes una camara disponible...");
          }
    }
   
    //Set Video capture variable
    const setCapture=()=>{
        setCanvasURL(videoRef.current);
        setDisplay(false);
        
    }
    const onSubmit=(ev)=>{
        ev.preventDefault();
        if(!window.confirm("Se esta por guardar este registro con las coordenadas...Desea continuar?")){
            return
        }else{
        const payload = {     
            latitud: latRef.current.value,
            longitud: lonRef.current.value,
            objetos: sizeRef.current.value
        }
        axiosClient.post('/datasend', payload)
          .then(({data})=>{
            setNotification('Registro guardado con exito')
          })
           }
    }
   


    return(
        <div className="header container text-center color-bg">
            <div className="container">
               <Link to="/"><Button><img src={Home} alt="home-icon"/>  Volver a Inicio</Button></Link>
                <LocateComponent/>
            </div>
            
        {display&&<div>
           <h1 className="display-4 mt-5">Selección de medio</h1>
                
            <div class="d-grid gap-2 col-6 mx-auto mt-5">
                <button class="btn css-button-gradient--2" type="button" onClick={triggerUpload}><img src={Nube} alt="cloud-icon" />Subir Imagen</button>
                <button class="btn css-button-gradient--2 web-cam" type="button" onClick={onOpen}><img src={Cam} alt="cam-icon" /><p>Usar WebCam</p></button>
                <Link to="/data"><Button colorScheme='teal' leftIcon={<TimeIcon/>}>Historial</Button></Link>
            </div>

            {/* Modal Web-Cam */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Web-Cam</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <video 
                        id="video-test"
                        width={ModalBody.width}
                        height={ModalBody.height}
                        autoPlay={true}
                        ref={videoRef}
                        >      
                        </video>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button colorScheme='green' onClick={rdyToUse}><img src={Play} alt="play-icon" /> Iniciar</Button>
                        <Button colorScheme='red' onClick={setCapture}><img src={Cap} alt="cam-icon" /> Captura</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </div>}   

            <input className="input-img" type="file" accept="image/*" onChange={handleImage} ref={uploadRef}/>

            {imageURL&&<ImageComponent/>}
            {canvasURL&&<CanvasComponent/>}
         
            <form className="hide-form" onSubmit={onSubmit}>
                
                <input type="submit" />
            </form>
                
                {cnv &&<div className="shadow p-3 mb-5 bg-body-tertiary rounded wrap-content">
                <form onSubmit={onSubmit}>
                    <input type="hidden" ref={sizeRef} value={size} />
                    <input type="hidden" ref={lonRef} value= {latitud} />
                    <input type="hidden" ref={latRef} value={longitud}/>
                    <span className="size-font">{size} </span>
                    Objetos detectados
                    <button className="btn btn-danger m-1" colorScheme='orange' >Guardar Registro</button>
                </form>
                    </div>}
              {notification&&<div className="notification">
                <CheckIcon/>{notification}
                </div>}  
        </div>
    )
}