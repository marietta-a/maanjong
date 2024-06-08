import React from 'react'
import { AiOutlineCar } from 'react-icons/ai'

export default function Navbar() {
  console.log('Client component')
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-green-800 shadow-md'>
        <div>
            <AiOutlineCar />
            <div>Maanjong Auctions</div>
        </div>
        <div>Middle</div>
        <div>Right</div>
    </header>
  )
}
