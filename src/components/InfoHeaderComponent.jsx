import React from "react";

export default function InfoHeaderComponent() {
    return(
        <>
            <div className="info-header">
                <div className="contenedor head header-info">
                    <h3 className="title-info">Importante para el Usuario</h3>
                    <p className="txt-info">
                        Obviamente μFTIR y otras técnicas similares usadas en laboratorios ha demostrado ser el método de referencia para el análisis de microplásticos a nivel científico, pero a un alto costo. Pero que pasa con usuarios que no pueden acceder a este tipo de tecnología, o a científicos con bajo presupuesto, acá es donde mas entra en juego nuestra WEP -WPA permitiendo a estos científicos agilizar sus tareas y a los   entusiastas protectores del medio ambiente poder contribuir simplemente utilizando su celular por ejemplo con la generación de mapas en tiempo real mostrando la problemática de los microplásticos en sus zonas geográficas. Para que luego por que no científicos puedan evaluar esos datos.
                        Al ser un proyecto basado en la WEP este puede alcanzar a una mayor cantidad de usuarios y si utiliza WPA ya que en la zona donde realizara los muestreos no hay Internet automáticamente al realizar una conexión los datos serán enviados al servidor, garantizando de esta manera la conexión en zonas remotas o sin conexión a Internet.

                    </p>
                    <a className="btn-start" href="#info-mid"><i class="fa-solid fa-plus"></i><span>Ver mas...</span></a>
                </div>
            </div>
        </>
    )
}