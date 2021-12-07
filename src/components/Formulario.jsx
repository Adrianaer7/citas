//rafce
import { useState, useEffect } from "react"
import Error from "./Error"

const Formulario = ({pacientes, paciente, setPacientes, setPaciente}) => {

    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")

    const [error, setError] = useState(false)

    //cada vez que seleccione un paciente para editar, 
    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substr(2) //Math.random() genera un numero flotante aleatorio. Luego lo convierto al string mas chico y le elimino los primeros 2 caracteres
        const fecha = Date.now().toString(36)   //convierto la fecha en la que se crea el paciente al string mas corto posible

        return random + fecha
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        
        //Validacion
        if([nombre, propietario, email, fecha, sintomas].includes("")) {
            setError(true)
            return
        } 
        setError(false)

        //todo lo que esté en el state se envia aca
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }

        //Crear o editar un paciente
        if(paciente.id) {   //si existe la id es porque el paciente que se creó existe y se seleccionó para la edicion
            objetoPaciente.id = paciente.id //le paso la id del paciente que seleccioné para editar al mismo paciente pero version modificada
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState) //recorro el state con todos los pacientes, y si la id del paciente seleccionado es igual al id de un paciente de todos los que estan en el state, retorno el nuevo paciente modificado, sino, lo dejo como estaba
            setPacientes(pacientesActualizados) //envio el paciente editado al state que tiene todos los pacientes
            setPaciente("") //una vez que lo paso editado, lo elimino del state que es para editar
        } else {
            //envio cada paciente a la App
            objetoPaciente.id = generarId() //le doy una id porque es un paciente nuevo
            setPacientes([
                ...pacientes,
                objetoPaciente
            ])
        }

        //Reiniciar el form
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
    }

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade pacientes y 
                <span className="text-indigo-600 font-bold"> Administralos</span>
            </p>

            <form 
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit={handleSubmit}
            >
                {error && <Error><p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Nombre de la mascota"
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Propietario de la mascota"
                        name="propietario"
                        id="propietario"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="email"
                        placeholder="Correo electronico"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha de fecha</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        type="date"
                        name="fecha"
                        id="fecha"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                    <textarea 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los sintomas"
                        name="sintomas" 
                        id="sintomas"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                    
                </div>
                    <input 
                        type="submit"
                        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-lg"
                        value={paciente.id ? "Editar paciente" : "Agregar paciente"}
                    />
            </form>
        </div>
    )
}

export default Formulario
