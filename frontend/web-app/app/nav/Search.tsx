'use client'

import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import {useParamsStore} from '../hooks/useParamStore'

export default function Search() {

  const setParams = useParamsStore(state => state.setParams)
  const [value, setValue] = useState('')

  function onChange(event: any){
    setValue(event.target.value)
  }

  function search(){
    setParams({searchTerm: value});
    console.log(value);
  }

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
        <input
            type='text'
            placeholder='Search for cars by make, model or color'
            className='
                flex-grow
                pl-5
                bg-transparent
                focus:outline-none
                border-transparent
                focus:border-transparent
                focus:ring-0
                text-sm
                text-gray-600
            '
            onChange={onChange}
            onKeyDown={(e: any) => {
                if(e.key === 'Enter' ) search()
            }}
        />
        <button onClick={search}>
            <FaSearch 
                size={34}
                className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'
            />
        </button>
    </div>
  )
}
