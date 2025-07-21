import React, { useEffect, useState } from 'react'
import img from '../assets/Tenantbg.jpeg'
import { useAuth } from '../contexts/AuthContext'
import Tenantcard from './Tenantcard'
import Tenantcard1 from './Tenantcard1';
import Tenantcard2 from './Tenantcard2';
function Tenant() {

    const {token} = useAuth();

    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState('');
    
    const getProperties = async()=>{
        try {
            console.log("Fetching properties");
            const response = await fetch(`${process.env.REACT_APP_BACK_END}/api/v1/property/getAllProperties` || "http://localhost:8000/api/v1/property/getAllProperties",{
                method: "GET",
                headers: {
                    'Authorization': `${token}`
                }
            })
            console.log("Response status:");
            console.log(response);
            const res = await response.json();
            console.log("Response status2:");
            console.log("Properties fetched:", res.data); 
            setProperties(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getProperties();
    },[])

    return (
        <>
           <div className=' flex flex-col bg-tertiary '>
                <div className='flex  justify-end' >
                    <img className=' md:w-[92%] w-[100%] h-[50vh] bg-tertiary  md:rounded-bl-[5vw]  ' src={img} alt="" />
                    
                </div>
               
                <div className='relative bottom-40 mx-auto'>
                <input
                        type="text"
                        onChange={(e)=>setSearch(e.target.value)}
                        className=" sm:w-[45vw] w-[90vw] h-12 rounded-2xl bg-gray-300 text-[20px] placeholder-black text-black"
                        placeholder=' Search .........'
                    />
                </div>
            </div>

            
            <div className='bg-tertiary'  >
              {(properties || []).filter((tenant) => {
          const searchLowerCase = search.toLowerCase();
          return (
            searchLowerCase === '' ||
            (tenant.name?.toLowerCase().includes(searchLowerCase) ||
              tenant.title?.toLowerCase().includes(searchLowerCase) ||
              tenant.size?.toLowerCase().includes(searchLowerCase) ||
              tenant.price?.toLowerCase().includes(searchLowerCase)||
              tenant.location?.toLowerCase().includes(searchLowerCase)||
              tenant.area?.toLowerCase().includes(searchLowerCase)
              )
          );
        }).map(item=>(
                <Tenantcard 
                key={item.id}
                props={item}
                />
              ))}
            <Tenantcard1/>
            <Tenantcard2/>
            </div>
        </>
    )
}

export default Tenant