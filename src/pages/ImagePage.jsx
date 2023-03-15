import React, { useRef, useState } from "react";

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
import { useStateContext } from "../contexts/ContextProvider";

//Components
import ImageComponent from "../components/ImageComponent";
import CanvasComponent from "../components/CanvasComponent"; 
import LocateComponent from "../components/LocateComponent";



export default function ImagePage (){

    const {setImageURL,setCanvasURL,canvasURL,imageURL,cnv,size,latitud,longitud} = useStateContext(); 
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
        }else{
            setImageURL(null);
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
        
    }
    const onSubmit=()=>{

    }


    return(
        <div className="header container text-center color-bg">
            <LocateComponent/>

           <h1 className="display-3 mt-5">Detección de Microplásticos</h1>
                
            <div class="d-grid gap-2 col-6 mx-auto mt-5">
                <button class="btn css-button-gradient--2" type="button" onClick={triggerUpload}><img src={Nube} alt="cloud-icon" /><p>Subir Imagen</p></button>
                <button class="btn css-button-gradient--2 web-cam" type="button" onClick={onOpen}><img src={Cam} alt="cam-icon" /><p>Usar WebCam</p></button>
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
                        
            <input className="input-img" type="file" accept="image/*" onChange={handleImage} ref={uploadRef}/>

            {imageURL&&<ImageComponent/>}
            {canvasURL&&<CanvasComponent/>}
         
            <form className="hide-form" onSubmit={onSubmit}>
                <input type="text" ref={sizeRef}/>
                <input type="text" ref={lonRef} />
                <input type="text" ref={latRef} />
                <input type="submit" />
            </form>
                
                {cnv && <div className="shadow p-3 mb-5 bg-body-tertiary rounded"><span className="size-font">{size}</span> Objetos detectados <span data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Guardar Registro"><button className="btn btn-danger" >Guardar Registro</button></span></div>}
                
        </div>
    )
}