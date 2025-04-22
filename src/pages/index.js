import Card from '@/components/home/Card';
import CarouselComponent from '@/components/home/Carousel';
import React, { useState } from 'react';
import { baseUrl } from '@/utils/baseUrl';
import Head from 'next/head';

const Home = ({ data }) => {
  
  let categories = new Set()
  
  console.log(data);
  
  const handleData = () => {
    if (data?.length > 0) {
      data?.map((data) => {
        return(
          categories.add(data.category)
        )
      })
    }
  }
  
  handleData()

  const categoryArr = [ ...categories ]

  const [ filter, setFilter ] = useState(false)

  return (
    <div>
      <Head>
        <title>Pizza Wizza</title>
      </Head>
      <CarouselComponent/>
      
      <div className='container mx-auto'>
        <div className='mt-5 space-x-3'>
          <button onClick={()=>{setFilter(false)}} className={`border-black rounded-full dark:border-white border-2 py-1.5 px-4 text-lg ${!filter && 'bg-slate-300 dark:bg-slate-600'}`}>All</button>
          <button onClick={()=>{setFilter('Veg')}} className={`border-black rounded-full dark:border-white border-2 py-1.5 px-4 text-lg ${filter === 'Veg' && 'bg-slate-300 dark:bg-slate-600'}`}>Veg</button>
          <button onClick={()=>{setFilter('Non-Veg')}} className={`border-black rounded-full dark:border-white border-2 py-1.5 px-4 text-lg ${filter === 'Non-Veg' && 'bg-slate-300 dark:bg-slate-600'}`}>Non Veg</button>
        </div>
        {
          categoryArr?.map((category)=>{
            return(
            <>
              <div className='text-4xl mt-10 mb-3 uppercase font-bold'>
                  {category}
                </div>

                <hr/>
                
                <div className='flex flex-col items-center justify-center'>
                  <div className='grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                      data?.filter((data) => category === data.category)?.filter((data)=>filter?filter===data.foodType:data)?.map((data)=>{
                        return(
                          <Card key={data.name} data={data}/>
                        )
                      })
                    }
                  </div>
                </div>
            </>     
            )
          })
        }
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {

  let data

  try {
    const pizzaData = await fetch(baseUrl + 'api/foodData', { method:'GET' }).then((response) => response.json()).catch((error) => error.message)

    data = await JSON.parse(JSON.stringify(pizzaData))
    console.log(data);
    
  } catch (error) {
    console.log(error.message);
  }

  return{ 
    props: { data:data.data || null }
  }
}