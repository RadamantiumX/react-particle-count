import React,{useEffect} from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function LocateComponent(){
    const {latitud, longitud, setLatitud, setLongitud} = useStateContext();

    const locate = ()=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {         
              setLatitud(pos.coords.latitude);
              console.log(latitud);
              setLongitud(pos.coords.longitude);
              console.log(longitud);
              
            },
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  console.log("El usuario denegó la solicitud");
                  break;
                case error.POSITION_UNAVAILABLE:
                  console.log("Localización no disponible");
                  break;
                case error.TIMEOUT:
                  console.log("Se agotó el tiempo de espera para la localizacion");
                  break;
              }
            }
          );
        } else {
          console.log("Tu navegador no soporta geolocalizacion");
        }
      }

    useEffect(() => {
      locate();
    }, []);  

    return(
        <>
        {latitud &&
        <div className="locate-bar">
            <p>Ubicacion Actual: lat:{latitud}  lng:{longitud}</p>
        </div> 
        }
        </>
    )

}
