import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Orders = () => {

  const [orderData, setOrderData] = useState([])

  const fetchData = async () =>{
    await fetch('api/myOrdersData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem('userEmail') })
    }).then(async(res)=>{
      let response = await res.json()
      
      setOrderData(response?.orderData[0]?.orderData)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  console.log('order',orderData);
  

  return (
    <>
      {
        orderData?.length > 0 ?
        <div className='container mx-auto'>
      {
        orderData?.map((orders)=>{
          return(
            <>
              {
                orders.map((data)=>{
                  return(
                    <>
                      {
                        data.orderDate ?
                        <div className='font-bold text-xl mb-3'>{ data.orderDate.toString() } <hr/></div>
                        :
                        <div className='my-5 max-w-fit border-gradient p-5 rounded-lg'>
                          <img className='rounded-xl w-xs' src={ data.img } alt='pizza Image'/>
                          <div>
                            <div className='font-bold text-xl text-center'>{ data.name }</div>
                            <div className='flex justify-between items-center px-5 mt-3'>
                              <div className='text-lg font-medium'>{ data.qty }</div>
                              <div className='text-lg font-medium'>{ data.size }</div>
                              <div className='font-semibold'>{ data.price } $</div>
                            </div>
                          </div>
                        </div>
                        
                      }
                    </>
                  )
                })
              }
            </>
          )
        })
      }
    </div>
        :
        <div className='flex w-screen flex-col items-center justify-center h-screen'>
          <h1 className='text-4xl font-bold'>No Previous Orders</h1>
          <Link href={'/'} className='text-violet-500 text-xl hover:font-bold mt-10'>Go Back To Home</Link>
        </div>
      }
    </>
  )
}

export default Orders