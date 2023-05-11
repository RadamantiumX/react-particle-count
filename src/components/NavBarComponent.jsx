import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { CloseButton } from "react-bootstrap";
import Hamburguer from '../assets/menu-icon-hamb.svg';

export default function NavBarComponent() {
  const [hamburguer, setHamburguer] = useState(null);
  const [menu, setMenu]= useState(null);
  
  //Añadimos esta clase al menu
  const handleMenu=()=>{
     
     menu.classList.toggle("spread");
  }
  //Ocultamos menu de navegacion
  window.addEventListener("click",e=>{
    if(menu.classList.contains('spread') && e.target != menu && e.target != hamburguer){  
      menu.classList.toggle('spread');
    }
  })

  useEffect(()=>{
      setHamburguer(document.querySelector(".hamburguer"))
      setMenu(document.querySelector(".menu-navegacion"))
  },[hamburguer,menu])
  
    return (  
      <>
      <img src={Hamburguer} onClick={handleMenu} className="hamburguer"/>
      <nav className="menu-navegacion">
                 <CloseButton />
                 <Link to="/home"> <a><i class="fa-solid fa-house"></i><span> Home</span></a></Link>
                <Link to="/media"> <a><i class="fa-solid fa-play"></i><span> Media</span></a></Link>
                <Link to="/info"><a><i class="fa-solid fa-user"></i><span> Inf. al Usuario</span></a></Link>
                <Link to="/data"><a><i class="fa-solid fa-database"></i><span> Datos</span></a></Link>
                <Link to="/map"><a><i class="fa-solid fa-map"></i><span> Mapa</span></a></Link>
       </nav>
      </>
		 )
}