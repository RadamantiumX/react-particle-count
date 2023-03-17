import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    imageURL: null,
    canvasURL: null,
    num: null,
    size: null,
    cnv: false,
    video:null,
    latitud:null,
    longitud:null,
    display: true,
    setImageURL: ()=>{},
    setCanvasURL: ()=>{},
    setNum: ()=>{},
    setSize:()=>{},
    setCnv:()=>{},
    setVideo:()=>{},
    setLatitud:()=>{},
    setLongitud:()=>{},
    setDisplay: ()=>{}
})

export const ContextProvider = ({children})=>{
    const [imageURL, setImageURL] = useState(null);
    const [canvasURL, setCanvasURL] = useState();
    const [num, setNum] = useState(50);
    const [size, setSize] = useState();
    const [cnv, setCnv] = useState();
    const [video, setVideo] = useState();
    const [latitud, setLatitud] = useState();
    const [longitud, setLongitud] = useState();
    const [display, setDisplay] = useState(true)

    return(
        <StateContext.Provider value={{
            imageURL,
            canvasURL,
            num,
            size,
            cnv,
            video,
            latitud,
            longitud,
            display,
            setImageURL,
            setCanvasURL,
            setNum, 
            setSize, 
            setCnv, 
            setVideo,
            setLatitud,
            setLongitud,
            setDisplay
        }}       
        >
         {children}
        </StateContext.Provider>
    )
}
export const useStateContext = ()=> useContext(StateContext)