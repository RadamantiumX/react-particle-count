import React,{useState} from "react";
import HeaderComponent from "../components/HeaderComponent";
import MidSectionComponent from "../components/MidSectionComponent";
import TextComponent from "../components/TextComponent";
import IconsComponent from "../components/IconsComponent";
import FinalComponent from "../components/FinalComponent";


export default function HomePage() {


    return(
        <>
        
        <HeaderComponent/>
        <MidSectionComponent/>
        <TextComponent/>
        <IconsComponent/>
        <FinalComponent/>
        
        </>
    )
}