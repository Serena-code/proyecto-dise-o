import { ListaCompras} from "./ListaCompras";
import { Item } from "./Item";
import {Ahorro} from "./Ahorro";
import { useState } from "react";


export function Funciones (){
  const [compra, setCompra] = useState('')
  const [precio, setPrecio] = useState('')
  const [compras, setCompras] = useState([])
  const [ahorro, setAhorro] = useState('')
  const [ahorroActual, setAhorroActual] = useState('')
  const [bandera, setBandera] = useState(true)

  const handleChange = (e) => {
    setCompra(e.target.value) //funcion que permite ver en el momento lo que estamos escribiendo
  }
  const handleChange1 = (e) => {
    if(e.target.value === ''){
      setPrecio('')
    }else if (isNaN(e.target.value)){
      setPrecio('')
      alert('Formato incorrecto')
      return
    }else{
      setPrecio(parseInt(e.target.value))
    } //funcion que permite ver en el momento lo que estamos escribiendo
  }

  const handleChange3 = (e) => {
    if(e.target.value === ''){
      setAhorro('')
    }else if (isNaN(e.target.value)){
      setAhorro('')
      alert('Formato incorrecto')
      return
    }else{
      setAhorro(parseInt(e.target.value))
      setAhorroActual(parseInt(e.target.value))
    } //funcion que permite ver en el momento lo que estamos escribiendo
  }
  const añadirCompra = (e) =>{
    e.preventDefault();
  
    const formData = new FormData(e.target)//obtiene toda la informacion del formulario
    const nuevaCompra = {
      id: Date.now(), //funcion que retorna fecha y hora de creación
      dia: formData.get('dias')?.trim(),
      mes: formData.get('meses')?.trim(),
      compra: formData.get('producto')?.trim(),
      precio: formData.get('cantidad')?.trim()
    }
    if(!compra || !precio){
      alert('Debes agregar algo')
      return
    }
    const totalCompras = [nuevaCompra, ... compras]
    setCompras(totalCompras)
    if(ahorroActual>precio){
      setAhorroActual((prev) => prev - parseInt(precio))
    }else{
      setCompra('')
      setPrecio('')
      alert('No se puede realizar la resta gasto supera ahorro')
      return
    }
    setCompra('')
    setPrecio('')

  }

  const borrarCompra = (id) =>{
    const compraActualizada = compras.filter(compra =>{
      return compra.id != id
    })
    setCompras(compraActualizada)
  }
  
  
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
  return (
    <div className="contenedor-principal">  
      <div className="header">
        <Ahorro
        handleChange3={handleChange3}
        bandera = {bandera}
        añadirAhorro={añadirAhorro}
        ahorro = {ahorro}
        ahorroActual = {ahorroActual}
        >
        </Ahorro>
      </div>
      <div className="contenedor-gastos">
        <ListaCompras
          handleChange = {handleChange}
          handleChange1={handleChange1}
          añadirCompra = {añadirCompra}
          compra = {compra}
          precio = {precio}
          bandera = {bandera}
        >
        </ListaCompras>
      </div>
      
      
      {compras.length>1 && ( //Boton vaciar se activa colo cuando hay mas de 2 tareas
        <button onClick={()=>setCompras([])}>Vaciar</button>
      )}
      <div className="item">
        {console.log(compras)}
        {compras.map(compra => (
          <div>
            <Item  key ={compra.id}
            id = {compra.id}
            compra = {compra}
            borrarCompra = {borrarCompra}
            compras = {compras}
            setCompras={setCompras}
            ></Item>
          </div>
        ))}
      </div>
      
    </div>
  )

}