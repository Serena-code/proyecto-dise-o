import React from "react";


export function ListaCompras({handleChange,handleChange1,añadirCompra, compra, precio}){
    return(
        <div className="listaCompras">
            <form onSubmit={añadirCompra}>
                <div class="form">
                    <input type="text" value={compra} name="producto" placeholder="Ingrese producto" onChange={handleChange}></input>
                    <input type= "text"  value ={precio} name="cantidad" placeholder="Ingrese precio" onChange={handleChange1}></input>    
                </div>
                <button type="submit">Agregar</button>
            </form>
            
        </div>
    )
    
}