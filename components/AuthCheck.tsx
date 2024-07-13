"use client";

import { useAuth } from "@/hooks/useAuth";


export const AuthCheck = (props: any) => {
    const { currentUser } = useAuth();

    return currentUser ? <>{props.children}</> : props.fallback || null;
}