'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {useQuery} from "@apollo/client/react"
import {PublicSellerData} from "@/src/graphql/mutations/store"


const StoreNavbar = () => {
    const router = useRouter()
    const{data, loading, error} = useQuery(PublicSellerData)
    const store = data?.sellerProfile || null
    console.log("Store data:", data);

    
     if(loading) return <p>Loading...</p>
     if(error){
        console.log("Error fetching store data:", error)
     }

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                <p className="absolute text-xs font-semibold -top-1 -right-11 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                    Store
                </p>
            </Link>
            <div className="flex items-center gap-3">
                <p>Hi, {store?.storeName}</p>

            </div>
        </div>
    )
}

export default StoreNavbar