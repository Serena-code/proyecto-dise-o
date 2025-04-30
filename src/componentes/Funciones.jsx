import { ListaCompras} from "./ListaCompras";
import { Item } from "./Item";
import { useState } from "react";


export function Funciones (){
  const [compra, setCompra] = useState('')
  const [precio, setPrecio] = useState('')
  const [ahorro, setAhorro] = useState('')
  const [compras, setCompras] = useState([])
  const [edit, setEdit] = useState(false)

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
    } //funcion que permite ver en el momento lo que estamos escribiendo
  }
  const añadirCompra = () =>{
    if(compra.trim() === ''){
      alert('Debes agregar algo')
      return
    }
    if(precio.trim() === ''){
      alert('Debes agregar algo')
      return
    }

    const formData = new FormData(e.target)//obtiene toda la informacion del formulario
    const nuevaCompra = {
      id: Date.now(), //funcion que retorna fecha y hora de creación
      ahorro: formData.get('dinero'),
      compra: formData.get('producto'),
      precio: formData.get('cantidad'),
      completada: false
    }
    
    const totalCompras = [nuevaCompra, ... compras]
    setCompras(totalCompras)
    setCompra('')
  }

  const borrarCompra = (id) =>{
    const compraActualizada = compras.filter(compra =>{
      return compra.id != id
    })
    setCompras(compraActualizada)
  }


  return (
    <div> 
      <ListaCompras
        handleChange = {handleChange}
        handleChange1={handleChange1}
        handleChange3 = {handleChange3}
        añadirCompra = {añadirCompra}
        compra = {compra}
        precio = {precio}
        ahorro = {ahorro}
      >
      </ListaCompras>
      {compras.length>1 && ( //Boton vaciar se activa colo cuando hay mas de 2 tareas
        <button onClick={()=>setCompras([])}>Vaciar</button>
      )}
      <div>
        {console.log(compras)}
        {compras.map(compra => (
          <div class="item">
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