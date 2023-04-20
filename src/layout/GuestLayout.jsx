import React from "react";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import NavBarComponent from "../components/NavBarComponent";

export default function GuestLayout() {
    return(
        <>
        <NavBarComponent/>
          <Outlet/>
        <FooterComponent/>
        </>
    )
}