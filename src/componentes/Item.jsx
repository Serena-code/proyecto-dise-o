import React, { useState } from "react"

export function Item ({compra, borrarCompra,compras, setCompras}){
    const[nuevoTexto,setNuevoTexto] = useState("")
    const[nuevaCantidad,setNuevaCantidad] = useState(1)
    const[edit,setEdit] = useState(false)

    const actualizar = (id) =>{
        const actualizada = 
            compras.map(compra => { 
                if (compra.id == id){
                    return{//creo un nuevo array modificando el texto
                        ...compra,
                        compra: nuevoTexto,
                        precio: nuevaCantidad
                    }
                }else{
                    return{ //si no coincide el id dejo el objeto como estaba
                        ...compra
                    } 
                }
            })
        setCompras(actualizada) //actualizo mi array
        setEdit(false)
    }

    return(
        edit?
        <div class="actualizar">
            <input placeholder="Ingrese nuevo producto" value={nuevoTexto} onChange={(e) => setNuevoTexto(e.target.value)} ></input>
            <input class="cantidad" placeholder="Ingrese nuevo precio" value={nuevaCantidad} onChange={(e) => setNuevaCantidad(e.target.value)} ></input>
            <button onClick={()=>actualizar(compra.id)}>Actualizar</button>
        </div>  
        :
        <div>
            <h2>{compra.ahorro}</h2>
            <h2>{compra.compra}</h2>
            <h3 className="cantidad">{compra.cantidad}</h3>     
            <button onClick={()=>borrarCompra(compra.id)} id="eliminar">Eliminar</button>
            <button onClick={()=>setEdit(!edit)}>Editar</button>       
        </div>
           
    )
}