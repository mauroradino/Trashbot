import React, { useContext, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { AuthContext } from '../../context'

const Dashboard = () => {
    const [Lista, setLista] = React.useState([])
    const { idUsuario } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
          const { data, error } = await supabase
            .from('ListaDeCompras')
            .select('*')
            .eq('id_usuario', idUsuario)
    
          if (error) {
            console.error('Error fetching data:', error)
          } else {
            setLista(data)
            console.log(data)
          }
        }
    
        fetchData()
      }, [])

      const borrar_producto = async (id) => {
        const { error } = await supabase
          .from('ListaDeCompras')
          .delete()
          .eq('id', id)
    
        if (error) {
          console.error('Error deleting item:', error)
        } else {
          setLista(Lista.filter(item => item.id !== id))
        }
      }

  return (
    <div>
      <h1 className="text-[#4CAF50] font-semibold mt-4 text-center text-3xl">MI LISTA DE COMPRAS</h1>
      <div className='bg-white rounded-lg shadow-lg w-10/12 min-h-80 mx-auto mt-4 overflow-y-auto'>
     {Lista.map((item, index) => (
        <div key={index} className={`flex justify-between items-center bg-[#4CAF50] p-4 border-b border-gray-300 ${index === 0 ? "rounded-t-lg" : 'null'} ${ index === Lista.length ? "rounded-b-lg" : "null"}`}>
          <span className='text-lg text-white font-bold'>{item.nombre_producto}</span>
          <button onClick={() => borrar_producto(item.id)} className='text-[#FF0000] font-bold hover:cursor-pointer'>X</button>
        </div>
      ))} 
      </div>
    </div>
  )
}

export default Dashboard
