import Image from 'next/image'
import React from 'react'
import CountdownTimer from './CountdownTimer'
import CarImage from './CarImage'
import { Auction } from '@/types'
import Link from 'next/link'

type Props = {
    auction: Auction
}

export default function AuctionCard({auction}: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className='group'>
        <div>
            <div className='w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden'>
                <CarImage imageUrl={auction.imageUrl} />
                <div className='
                    flex
                    justify-center
                    items-end
                '
                >
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center mt-4'>
            <h3 className='text-green-700'>{auction.make} {auction.model}</h3>
            <p className='font-semibold text-sm'>{auction.year}</p>
        </div>
    </Link>
  )
}
