import React, { useEffect } from "react";
import { useState } from "react";


export function Ahorro({handleChange3,ahorro}){
    const [bandera, setBandera] = useState(true)

    const añadirAhorro = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)//obtiene toda la informacion del formulario
        const nuevoMonto = {
        ahorro: formData.get('dinero')?.trim()
        }
        if(!ahorro){
        alert('Debes agregar algo')
        return
        }
        console.log(ahorro)
        setBandera(false)
    }
    
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
            <h2 class="amount-box">${ahorro}</h2>
        </div>
    )
}