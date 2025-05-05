import React, { useEffect } from "react";
import { useState } from "react";


export function Ahorro({handleChange3,bandera,añadirAhorro,ahorro,ahorroActual}){
    
    return(
        bandera?
        <div className="ahorro">
            <div>
                <h1>Lista Gastos</h1>
                <form onSubmit={añadirAhorro}>
                    <input type="text" value={ahorro} name="dinero" placeholder="Ingrese monto ahorrado" onChange={handleChange3}></input>
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>
        :
        <div className="header">
            <h1>Lista Gastos</h1>
            <h2 class="amount-box">${ahorroActual}</h2>
        </div>
    )
}