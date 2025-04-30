"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"
import { RiSearch2Line } from "react-icons/ri"

export default function SearchBar() {
    const searchParams = useSearchParams();
    const defaultValue = searchParams.get("username") ?? "";
    const router = useRouter();
    const [username, setUsername] = useState<string>(defaultValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (username.trim()) {
            router.push(`/search?username=${username}`)
        }
    }

    return (
        <form className="flex my-5 w-full" onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="py-3 px-5 block w-full border-gray-200 rounded-md text-sm drop-shadow-sm"
            />
            <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md drop-shadow-sm border-transparent font-semibold bg-sunflower text-white hover:bg-sunflower-darker focus:outline-none focus:ring-2 focus:ring-sunflower focus:ring-offset-1 transition-all text-sm ml-3"
            >
                <RiSearch2Line className="text-xl" />
            </button>
        </form>
    )
}
