import React from 'react'
import RegistroForm from '../components/RegistroForm'
import logoTrashop from '/Logo_Trashop.svg'
const Registro = () => {
  return (
    
    <main style={{height: "calc(100vh - 64px)"}} className="flex items-center justify-center bg-[#e9efe7]">
        <div className="w-full max-w-screen-sm flex flex-col gap-3  justify-center">
          <img src={logoTrashop} className='w-[200px] mx-auto'  alt='logo'/>
          <RegistroForm />
        </div>
      </main>
  )
}

export default Registro
