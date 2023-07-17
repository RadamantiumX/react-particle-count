import React, {useState, useEffect} from "react";
import axiosClient from "../axios-cliente";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import download from "downloadjs";
//import Pagination from "react-js-pagination";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
  } from '@chakra-ui/react';

import { ArrowBackIcon } from "@chakra-ui/icons";  

export default function DataPage(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [metaData, setMetaData] = useState([]);

    const getData = (pageNumber=1)=>{
        setLoading(true);
        axiosClient.get(`/image?page=${pageNumber}`)
        .then(({data})=>{
            setLoading(false);
            setData(data);
            //setMetaData(data.meta);
            //console.log(data.meta);
        })
        .catch(()=>{
            setLoading(false);
        })

         
    }

    const handleDownload = ()=>{
        const csvString = data
      .map((row) => row.join(','))
      .join('\n');

    download(csvString, 'datos.csv', 'text/csv');
    }
   
    useEffect(()=>{
      getData();
    },[])
    return(
        <>
        <div className="container mt-5 border rounded shadow">
        <CSVLink data={data} filename="datos.csv">
          <button className="btn btn-success"><i class="fa-solid fa-download"></i> Descargar CSV</button> 
        </CSVLink>
            
            {loading && <div>Cargando datos, un momento por favor...</div>}
            {data.length === 0&&<div>No hay registros guardados aún...</div>}
           {data.length !=0 && <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Latitud</Th>
                            <Th>Longitud</Th>
                            <Th>Cant. Obj.</Th>
                            <Th>Fecha (AAAA-MM-DD)</Th>
                        </Tr>
                    </Thead>
                    {!loading&&<Tbody>
                        {data.map(d=>(
                        <Tr>
                            <Td>{d.id}</Td>
                            <Td>{d.latitud}</Td>
                            <Td>{d.longitud}</Td>
                            <Td>{d.objetos}</Td>
                            <Td>{d.created_at.substr(0,10)}</Td>
                        </Tr>
                        ))
                        }
                    </Tbody>}
                   
                </Table>
              
            </TableContainer>}
           <Link to="/home"><Button rightIcon={<ArrowBackIcon/>}>Volver</Button></Link> 
            </div>
        </>
    )
}