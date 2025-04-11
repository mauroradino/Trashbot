import React from 'react'
import LoginForm from '../components/LoginForm'
import logoTrashop from '/Logo_Trashop.svg'
const Login = () => {
  return (
    <main style={{height: "calc(100vh - 64px)"}} className="flex items-center justify-center bg-[#e9efe7]">
    <div style={{height: "calc(100vh - 64px)"}} className="w-full max-w-screen-sm flex flex-col gap-3  justify-center">
      <img src={logoTrashop} className='w-[200px] mx-auto'  alt='logo'/>
      <LoginForm />
    </div>
  </main>
  )
}

export default Login
