import React from "react";
import InfoHeaderComponent from "../components/InfoHeaderComponent";
import InfoMidComponent from "../components/InfoMidComponent";
import ImgInfoComponent from "../components/ImgInfoComponent";
import FinalInfoComponent from "../components/FinalInfoComponent";

export default function UserInfo(){
    return(
        <>
        <InfoHeaderComponent/>
        <InfoMidComponent/>
        <ImgInfoComponent/>
        <FinalInfoComponent/>
        </>
    )
}