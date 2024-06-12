import { Button, ButtonGroup } from 'flowbite-react'
import React from 'react'
import { useParamsStore } from '../hooks/useParamStore'
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai'
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs'
import { GiFinishLine, GiFlame } from 'react-icons/gi'



const pageSizeButtons = [4, 8, 12]

export default function Filters() {
  const pageSize = useParamsStore(state => state.pageSize)
  const setParams = useParamsStore(state => state.setParams)
  const orderBy = useParamsStore(state => state.orderBy)
  const filterBy = useParamsStore(state => state.filterBy)

  const orderButtons = [
    {
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value: 'make'
    },
    {
        label: 'End date',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value: 'new'
    }
  ]

  
  const filterButtons= [
    {
        label: 'Live Auctions',
        icon: GiFlame,
        value: 'live'
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    }
  ]


  return (
    <div className='flex justify-around items-center mb-4'>

    <div>
     <span className='uppercase text-sm items-center mb-4'> Filter by &nbsp;
        <ButtonGroup>
            {filterButtons.map(({label, icon: Icon, value}) => (
                <Button
                    key = {value}
                    onClick={ () => setParams({filterBy: value})}
                    color={`${filterBy == value ? 'red' : 'gray'}`}
                >
                  <Icon className='mr-3 h-4 w-4' />
                  {label}
                </Button>
            ))}
        </ButtonGroup>
     </span>
    </div>


        <div>
         <span className='uppercase text-sm items-center mb-4'> Order by &nbsp;
            <ButtonGroup>
                {orderButtons.map(({label, icon: Icon, value}) => (
                    <Button
                        key = {value}
                        onClick={ () => setParams({orderBy: value})}
                        color={`${orderBy == value ? 'red' : 'gray'}`}
                    >
                      <Icon className='mr-3 h-4 w-4' />
                      {label}
                    </Button>
                ))}
            </ButtonGroup>
         </span>
        </div>

        <div>
            <span className='uppercase text-sm items-center mb-4'>
                Page Size &nbsp;
                <ButtonGroup>
                    {pageSizeButtons.map((value, i) => (
                        <Button 
                            key={i}
                            onClick={() => setParams({pageSize: value})}
                            color={`${pageSize == value ? 'red' : 'gray'}`}
                            className='focus:ring-0'
                        >
                         {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </span>
        </div>
    </div>
  )
}
