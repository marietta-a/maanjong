import { getServerSession } from "next-auth";
import { headers } from "next/headers";

export async function getSession() {
    return await getServerSession();
}

export async function getCurrentUser(){
    try{
        const session = await getSession();

        if(!session) return null;

        return session.user;
    } catch(err){
        return null;
    }
}

export async function getTokenWorkAround(){
    const req = {
        headers: Object.fromEntries(headers a)
    }
}