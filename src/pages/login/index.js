import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
    
    const router = useRouter()

    const [ credentials, setCredentials ] = useState({ email:'', password:'' })

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await fetch('api/userLogin', { method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(
                {
                    email:credentials.email,
                    password: credentials.password,
                })  
            })
    
            const res = await response.json() 
            
            if (res.success) {
                localStorage.setItem('token', res.authToken)
                localStorage.setItem('userEmail', credentials.email)
                localStorage.setItem('isAdmin', await JSON.parse(res.isAdmin))
                router.push('/')
            } else {
                alert(res.error)
            }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
    <div className='h-[90vh] bg-cover bg-[url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] flex justify-center items-center'>
        <div className='container w-full max-w-md'>
            <form onSubmit={handleSubmit} className='bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'>
                <div className='mb-5'>
                    <label htmlFor='email' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Username</label>
                    <input name='email' type='text' value={credentials.email} onChange={handleChange} placeholder='Enter Your Username' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                </div>

                <div className='mb-5'>
                    <label htmlFor='password' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Password</label>
                    <input name='password' type='password' value={credentials.password} onChange={handleChange} placeholder='Enter Your Password' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                </div>
                
                <div className='flex justify-between items-center'>
                    <button type='submit' className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-green-700  hover:text-gray-100'>Login</button>

                    <Link href={'/signup'}>
                        <button className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-green-700  hover:text-gray-100'>New User?</button>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login