"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "../modules/home/components/SearchBar";
import Logo from "../modules/home/components/Logo";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../services/github";
import ProfileCard from "../modules/users/components/ProfileCard";
import { useEffect } from "react";
import EmptyUserState from "../modules/users/components/EmptyUserState";
import ProfileSkeleton from "../modules/users/components/ProfileSkeleton";

export default function SearchResultPage() {
    const searchParams = useSearchParams();
    const username = searchParams.get("username") || "";

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users", username],
        queryFn: () => searchUsers({ q: username, page: 1, per_page: 5 })
    });

    useEffect(() => {
        if (username) {
            refetch();
        }
    }, [username, refetch]);

    const isUsersEmpty = !isLoading && !users.length;

    console.log('clg users', users);

    return (
        <div className="flex flex-col items-center px-4 sm:px-10 pb-10 min-h-screen">
            <div className="my-5 w-full md:w-2/3">
                <Link href="/">
                    <Logo />
                </Link>
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 gap-5 w-full md:w-2/3">
                <h1 className="font-semibold my-2">Showing result for <span className="italic">{`"${username}"`}</span></h1>
                <div className="flex flex-col gap-5">
                    {!isLoading && users.map((data) => (
                        <ProfileCard
                            user={data}
                            key={data.id}
                        />
                    )
                    )}
                {isLoading && [...Array(5)].map((v, i) => (<ProfileSkeleton key={`profileskeleton-${i}`} />))}
                {isUsersEmpty && <EmptyUserState />}
                </div>
            </div>
        </div>
    )
}
