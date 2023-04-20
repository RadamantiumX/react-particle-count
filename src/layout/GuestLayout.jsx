import React from "react";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import NavBarComponent from "../components/NavBarComponent";
import FixedBarComponent from "../components/FixedBarComponent";

export default function GuestLayout() {
    return(
        <>
        <FixedBarComponent/>
        <NavBarComponent/>
          <Outlet/>
        <FooterComponent/>
        </>
    )
}