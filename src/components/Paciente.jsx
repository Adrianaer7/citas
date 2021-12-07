const Paciente = ({paciente, setPaciente, eliminarPaciente}) => {

    const {nombre, propietario, email, fecha, sintomas, id} = paciente

    const handleEliminar = () => {
        const respuesta = confirm("¿Deseas eliminar el paciente?")  //confirm es un alert de js
        if(respuesta) {
            eliminarPaciente(id)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md m-3 px-5 py-10 mx-5 my-10">
            <p className="uppercase font-bold mb-3 text-gray-700"> Nombre
                <span className="font-normal normal-case"> {nombre}</span>
            </p>
            <p className="uppercase font-bold mb-3 text-gray-700"> Propietario
                <span className="font-normal normal-case"> {propietario}</span>
            </p>
            <p className="uppercase font-bold mb-3 text-gray-700"> Email
                <span className="font-normal normal-case"> {email}</span>
            </p>
            <p className="uppercase font-bold mb-3 text-gray-700"> Fecha de alta
                <span className="font-normal normal-case"> {fecha}</span>
            </p>
            <p className="uppercase font-bold mb-3 text-gray-700"> Sintomas
                <span className="font-normal normal-case"> {sintomas}</span>
            </p>

            <div className="flex justify-between">
                <button
                    className="py-2 px-10 bg-green-600 rounded-lg hover:bg-green-700 text-white font-bold uppercase"
                    onClick={() => setPaciente(paciente)}   //se envia el paciente al state del App para que sea editado
                >
                    Editar
                </button>
                <button
                    className="py-2 px-10 bg-red-600 rounded-lg hover:bg-red-700 text-white"
                    onClick={handleEliminar}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Paciente
