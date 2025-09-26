"use server"

import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    if (!res?.ok) {
        console.log("User Registration Failed", await res.text());
    }

    return await res.json();
}


export const login = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res?.ok) {
        console.log("Login failed", await res.text());
    }

    return await res.json();
}