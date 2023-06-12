import React,{ useState, useEffect  } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import icon from './constants';
import 'leaflet/dist/leaflet.css';
import axiosClient from "../axios-cliente";
import iconClean from "./icon-clean";
import iconPlastic from "./icon-plastic";


export default function MapComponent() {
    const [data, setData]= useState([]);
    const [loading, setLoading] = useState(false);

    const getData = ()=>{
        setLoading(true);
        axiosClient.get('/image')
        .then(({data})=>{
            setLoading(false);
            setData(data);
            console.log(data[0].latitud);
        })
        .catch(()=>{
            setLoading(false);
        })
    }

    const handleIcon =(cant)=>{
        if (cant > 50){
            return iconPlastic;
        }else{
            return iconClean;
        }

    }
    
useEffect(()=>{
  getData();
},[])

    return(
        <div>
            <MapContainer className="map" center={[-34.60810, -58.37387]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!loading&&<>{data.map(d=>(
                    <Marker position={[d.longitud,d.latitud]} icon={handleIcon(parseInt(d.objetos))}>
                        <Popup>
                            <div>
                                <p>{d.created_at.substr(0,10)}</p>
                                <p>Cant. partículas de MP detectadas: {d.objetos} pp</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}</>}
                
            </MapContainer>
        </div>
    )
}