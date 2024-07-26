import React from 'react'

type Props = {
    amount?: number,
    reservedPrice: number
}

export default function CurrentBid({amount, reservedPrice}: Props) {
    const text = amount ? "$" + amount : 'No bids';
    const color = amount ? amount > reservedPrice ? 'bg-green-600' : 'bg-amber-600' : 'bg-red-600';

    return (
    <div className={`
         border-2 border-white text-white py-1 px-2 roundex-lg flex
         justify-center ${color}
    `}>
        {text}
    </div>
  )
}
