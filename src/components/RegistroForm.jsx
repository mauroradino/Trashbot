import React from 'react'
import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const RegistroForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
            e.preventDefault()
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                });
            if(error) {
                console.error('Error creating user:' , error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Error al crear el usuario. Verifica tus credenciales",
                    confirmButtonText: 'Intentar de nuevo'
                  })
            } 
            else{
                console.log('User created successfully:', data);
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: 'Usuario creado correctamente.',
                    confirmButtonText: 'Continuar'
                  })
                navigate("/")
            }
        }


  return (
    <form className="flex-grow flex flex-col w-full gap-4 p-8 rounded-lg shadow-lg bg-[#4CAF50] lg:w-full">
    <h1 className="text-white text-center mb-4 text-3xl font-bold">Registro</h1>
  
    <input
      type="email"
      placeholder="Correo Electrónico"
      name="email"
      value={formData.email}
      onChange={(e) => handleChange(e)}
      className="w-full bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  
    <input
      type="password"
      placeholder="Contraseña"
      name="password"
      value={formData.password}
      onChange={(e) => handleChange(e)}
      className="w-full bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
    />

    <input
      type="password"
      placeholder="Contraseña"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={(e) => handleChange(e)}
      className="w-full bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  
    <button  onClick={(e) => handleSubmit(e)} className="w-full bg-white text-green-600 font-semibold py-2 rounded-md hover:bg-green-100 hover:cursor-pointer transition">
      Registrarse
    </button>
    <a href="/" className='text-white underline'>Ya tenes cuenta?</a>
  </form>
  )
}

export default RegistroForm
