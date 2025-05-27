import React from "react";
import { useEffect } from "react";
import { useState } from "react";


export function ListaCompras({handleChange,handleChange1,añadirCompra, compra, precio,bandera}){
   const [dia, setDia] = useState('')
   const [mes, setMes] = useState('')

    useEffect(() => {
        const fecha = new Date();
        setDia(fecha.getDate());
        setMes(fecha.getMonth() + 1);
    }, []);

    return(
        bandera?
        <div>

        </div>
        :
        <div className="listaCompras">
            <form onSubmit={añadirCompra}>
                <div class="form">
                    <div class="fila">
                        <label>Día</label>
                        <input type="text" value={dia} name="dias" readOnly></input>
                        <label>Mes</label>
                        <input type="text" value={mes} name="meses" readOnly></input>
                    </div>
                    <div class="fila">
                        <input type="text" value={compra} name="producto" placeholder="Ingrese producto" onChange={handleChange}></input>
                        <input type= "text"  value ={precio} name="cantidad" placeholder="Ingrese precio" onChange={handleChange1}></input>    
                    </div>
                </div>
                <button type="submit">Agregar</button>
            </form>
            
        </div>
    )
    
}