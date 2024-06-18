'use client'

import { Button, Dropdown } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi'
import { useParamsStore } from '../hooks/useParamStore'

type Props = {
  user: User

}

export default function UserActions({user}: Props) {

  const router = useRouter();
  const pathName = usePathname();
  const setParams = useParamsStore(state => state.setParams);

  function setWinner(){
    console.log(`---> testing winner: ${user?.username}`);
    setParams({winner: user.username, seller: undefined});
    if(pathName !== '/') router.push('/');
  }
   
  function setSeller(){
    console.log(`---> testing seller: ${user?.username}`);
    setParams({seller: user.username, winner: undefined});
    if(pathName !== '/') router.push('/');
  }

  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
         Auctions won
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillCar}>
        <Link href='/auctions/create'>Sell my car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href='/session'>Session (dev only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  )
}
