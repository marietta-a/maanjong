import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

export async function getSession() {
    // return await getServerSession();
    var session = await getServerSession();
    var token = await getTokenWorkAround();
    if(session && token){
        session.user.username = token?.username;
    }

    return session;
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
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies().getAll().map(c => [c.name, c.value])
        )
    } as NextApiRequest;
    
    return await getToken({req});
}