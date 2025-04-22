import { CartContext } from '@/utils/ContextReducer';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';

const Card = (props) => {

    const data = props.data
    const {state, dispatch} = useContext(CartContext)
    const priceOptions = Object.keys(data.price)
    const [size, setSize] = useState(priceOptions[0])
    const [qty, setQty] = useState(1)

    const handleQty = (e) => {
        setQty(e.target.value)
    }
    
    const handleSize = (e) => {
        setSize(e.target.value)
    }
    
    const handleAddToCart = async() => {

        const updateItem = await state.find((item)=>item.tempId === data['_id'] + size)

        if (!updateItem) {
            dispatch({
                type:'Add',
                id:data['_id'],
                tempId:data['_id']+size,
                name:data.name,
                price:finalPrice,
                qty:qty,
                priceOptions:size,
                img: data.img
            })
        }
         
        if (updateItem) {
            dispatch({
                type:'Update',
                tempId:data['_id']+size,
                price:finalPrice,
                qty:qty,
            })
        }
    }

    const finalPrice = qty * data.price[size]

    return (
        <div className='box'>
            <div className='w-80 rounded-lg bg-white overflow-hidden dark:bg-black border-gradient'>
                <Link href={{pathname:'/item/[item]'}} as={`item/${data['_id']}`}>
                    <div className='relative w-full h-80'>
                        <Image src={data.img} layout='fill' objectFit='cover' alt='card'/>
                    </div>
                    <div className='p-5'>
                        <h1 className='font-bold mb-2 text-xl uppercase'>{data.name}</h1>
                        <p className='text-gray-700 dark:text-gray-400 text-base short_description'>{data.description}</p>
                    </div>
                </Link>
                <div className='flex px-5 justify-between'>
                    <select className='h-10  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded' onChange={handleQty}>
                    {Array.from(Array(6), (e, i) => {
                        return (
                            <option className='text-gray-400 bg-black' key={i + 1} value={i + 1}>{i + 1}</option>
                        )
                    })}
                    </select>
                        
                    <select className='h-10  p-1 text-black hover:font-bold font-semibold cursor-pointer dark:text-gray-300  border border-black dark:border-gray-400 rounded' onChange={handleSize}>
                        {priceOptions.map((options)=>{
                            return(
                                <option className='bg-black text-white border border-gray-400 font-semibold' key={options} value={options}>{options}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='flex p-5 font-bold justify-between'>
                    <button className='border dark:border-gray-400 border-gray-900 rounded p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-green-700  hover:text-gray-100 ' onClick={handleAddToCart}>Add To Cart</button>
                    <p className='p-2 text-xl'>{finalPrice} $</p>
                </div>
        </div>
    </div>
    );
};

export default Card;