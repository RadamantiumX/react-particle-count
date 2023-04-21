import React, {useState, useEffect} from "react";
import axiosClient from "../axios-cliente";
import { Link } from "react-router-dom";

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

    const getData = ()=>{
        setLoading(true);
        axiosClient.get('/image')
        .then(({data})=>{
            setLoading(false);
            setData(data);
        })
        .catch(()=>{
            setLoading(false);
        })

         
    }
   
    useEffect(()=>{
      getData();
    },[])
    return(
        <>
        <div className="container mt-5 border rounded shadow">
            {loading && <div>Loading...</div>}
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
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
            </TableContainer>
           <Link to="/media"><Button rightIcon={<ArrowBackIcon/>}>Volver</Button></Link> 
            </div>
        </>
    )
}