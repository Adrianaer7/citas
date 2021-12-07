import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})


  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? [] //si no hay nada en localStorage agregar un array. Convierto el [] que es un string a arreglo con JSON.parse
      setPacientes(pacientesLS) //el state de todos los pacientes arranca con lo que haya en el localStorage
    }
    obtenerLS() //ni bien cargo la app se ejecuta este useEffect
  }, [])

  //cuando detecte un cambio en el state de pacientes, ya sea por que se eliminó, creó, editó, va a enviar a localStorage el nuevo estado del state de pacientes en forma de string
  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes))
  }, [pacientes])

  //Eliminar un paciente
  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          paciente={paciente}
          setPacientes={setPacientes}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
