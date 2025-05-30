import { baseUrl } from '@/utils/baseUrl';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Item = ({ data }) => {
    
    return (
        <div className='min-h-screen px-10'>
            <Link href={'/'}>
                <div className='container max-w-md flex my-6 cursor-pointer hover:scale-125 justify-center items-center mx-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
            </Link>

            <div className='container border-gradient max-w-md p-6 md:p-8 mb-16 mx-auto flex space-y-4 flex-col items-center justify-center'>
                <div className='relative w-full h-96 rounded-lg overflow-hidden lg:w-96'>
                    <Image src={data.img} alt='item image' layout='fill' objectFit='cover'/>
                </div>
                <div className='font-extrabold mb-3 text-base md:text-2xl uppercase'>{data.name}</div>
                <div className='max-w-sm text-base md:text-lg text-gray-700 dark:text-gray-400'>{data.description}</div>
            </div>
        </div>
    );
};

export default Item;

export async function getServerSideProps(context){
    const {item} = context.query
    const res = await fetch(baseUrl + 'api/getItem', { method: 'POST', headers: {
        'Content-Type':'application/json'
    }, body: JSON.stringify({ item:item })
})
    const data = await res.json()
    return{
        props: { data:data.data }
    }
}