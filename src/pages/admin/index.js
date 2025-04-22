import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Custom404 from '../404'

const Admin = () => {
    
    const pizzaOption = { regular: "", medium: "", large: "" }
    const sideOption = { single: "", double: "" }

    const [ mounted, setMounted ] = useState(false)

    const [ foodData, setFoodData ] = useState({
        name:'',
        foodCategory:'',
        foodType:'',
        price:'',
        description:'',
        img:'', 
    })

    const handleChange = (e) => {
        setFoodData((prevData)=>{return { ...prevData, [e.target.name]: e.target.value }})

        if (e.target.name === 'foodCategory') {
            if (e.target.value === 'Pizza') {
                setFoodData((prevData)=>{
                    return{ ...prevData, price: pizzaOption }
                })
            } else if (e.target.value === 'SIDES & BEVERAGES') {
                setFoodData((prevData)=>{
                    return{ ...prevData, price: sideOption }
                })
            } else {
                setFoodData((prevData)=>{
                    return{ ...prevData, price: e.target.value }
                })
            }
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch('api/createFoodData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodData)
        })
        const result = await response.json()
        if (result.success) {
            alert('Food Data Created Successfully')
        } else {
            alert('Failed To Create')
        }
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('isAdmin')) === true) {
            setMounted(true)   
        }
    }, [])

  return (
    <>
        {
            mounted ? 

            <div className='min-h-[90vh] py-10 overflow-y-scroll bg-cover bg-[url("https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")] flex justify-center items-center'>
            <div className='container w-full max-w-md'>
                <form onSubmit={handleSubmit} className='bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-5'>
                        <label htmlFor='name' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Food Name</label>
                        <input name='name' type='text' value={foodData.name} onChange={handleChange} placeholder='Enter Food Name' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    
                    <div className='mb-5'>
                        <label htmlFor='foodCategory' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Food Category</label>
                        <select name='foodCategory' value={foodData.foodCategory} onChange={handleChange} placeholder='Food Category' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'>
                            <option className='bg-gray-900 text-gray-500' value={''}>Select Food Category</option>
                            <option className='bg-gray-900 text-gray-500' value={'Pizza'}>PIZZA</option>
                            <option className='bg-gray-900 text-gray-500' value={'SIDES & BEVERAGES'}>SIDES & BEVERAGES</option>
                        </select>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor='foodType' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Food Type</label>
                        <select name='foodType' value={foodData.foodType} onChange={handleChange} placeholder='Enter Your foodType' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'>
                            <option className='bg-gray-900 text-gray-500' value={''}>Select Food Type</option>
                            <option className='bg-gray-900 text-gray-500' value={'Veg'}>VEG</option>
                            <option className='bg-gray-900 text-gray-500' value={'Non-Veg'}>NON VEG</option>
                        </select>
                    </div>

                    {
                        foodData.foodCategory !== '' && <div className='mb-5'>
                        <label htmlFor='foodPrice' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Food price</label>
                        {
                            foodData.price !== '' && Object.keys(foodData.price).map((key) => {
                                return(
                                    <div key={ key } className='ml-3 mb-5'>
                                        <label className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2' htmlFor={ key }>{ key }</label>
                                        <input className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline' key={ key } type='number' name={ key } placeholder={ `Price of ${ key }` } value={ foodData?.price[key] } onChange={(e)=>{
                                            setFoodData({
                                                ...foodData, 
                                                price: {
                                                    ...foodData.price, [key]: e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    }
                    
                    <div className='mb-5'>
                        <label htmlFor='description' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Food Description</label>
                        <textarea rows={5} name='description' type='text' value={foodData.description} onChange={handleChange} placeholder='Enter Description' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline resize-none'></textarea>
                    </div>

                    <div className='mb-5'>
                        <label htmlFor='img' className='block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2'>Food Image</label>
                        <input name='img' type='text' value={foodData.img} onChange={handleChange} placeholder='Enter Food Image' className='shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                        <button type='submit' className='border text-gray-900 dark:text-gray-100 font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-green-700  hover:text-gray-100'>Create</button>
                    </div>
                </form>
            </div>
        </div>
        : 
        <div>
            <Custom404/>
        </div>
        }
    </>
    
  )
}

export default Admin