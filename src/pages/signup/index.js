import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Signup = () => {

    const router = useRouter()
    
    const [ credentials, setCredentials ] = useState({ 
        name:'', 
        email:'',
        password:'', 
        geolocation:'' 
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('api/userSignUp', { method: 'POST', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify(
            {
                name: credentials.name,
                email:credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })  
        })

        const res = await response.json()
        // console.log(json);
        
        if (res.success) {
            localStorage.setItem('token', res.authToken)
            localStorage.setItem('userEmail', credentials.email)
            localStorage.setItem('isAdmin', false)
            router.push('/')
        } else {
            alert('Invalid Credentials')
        }
    }
    
    const handleChange = (e) => {
        setCredentials({ ...credentials, [ e.target.name ]: e.target.value })
    }
    
    return (
        <div className='h-[90vh] bg-cover bg-[url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] flex justify-center items-center'>
            <div className='container w-full max-w-md'>
                <form onSubmit={handleSubmit} className='bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-5'>
                        <label htmlFor='name' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Username</label>
                        <input name='name' type='text' value={credentials.name} onChange={handleChange} placeholder='Enter Your Username' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    
                    <div className='mb-5'>
                        <label htmlFor='email' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Email</label>
                        <input name='email' type='text' value={credentials.email} onChange={handleChange} placeholder='Enter Your Username' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor='password' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Password</label>
                        <input name='password' type='password' value={credentials.password} onChange={handleChange} placeholder='Enter Your Password' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    
                    <div className='mb-5'>
                        <label htmlFor='geolocation' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Address</label>
                        <input name='geolocation' type='text' value={credentials.geolocation} onChange={handleChange} placeholder='Enter Your Address' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                        <button type='submit' className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-green-700  hover:text-gray-100'>SignUp</button>

                        <Link href={'/login'}>
                            <button className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-green-700  hover:text-gray-100'>Already A User?</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
 
export default Signup