import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    imageURL: null,
    canvasURL: null,
    num: null,
    size: null,
    cnv: false,
    video:null,
    setImageURL: ()=>{},
    setCanvasURL: ()=>{},
    setNum: ()=>{},
    setSize:()=>{},
    setCnv:()=>{},
    setVideo:()=>{},
})

export const ContextProvider = ({children})=>{
    const [imageURL, setImageURL] = useState();
    const [canvasURL, setCanvasURL] = useState();
    const [num, setNum] = useState(50);
    const [size, setSize] = useState();
    const [cnv, setCnv] = useState();
    const [video, setVideo] = useState();

    return(
        <StateContext.Provider value={{
            imageURL,
            canvasURL,
            num,
            size,
            cnv,
            video,
            setImageURL,
            setCanvasURL,
            setNum, 
            setSize, 
            setCnv, 
            setVideo
        }}       
        >
         {children}
        </StateContext.Provider>
    )
}
export const useStateContext = ()=> useContext(StateContext)