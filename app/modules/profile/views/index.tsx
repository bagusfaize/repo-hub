"use client"

import Logo from "@/app/modules/home/components/Logo";
import SearchBar from "@/app/modules/home/components/SearchBar";
import RepoCard from "@/app/modules/profile/components/RepoCard";
import ProfileCard from "@/app/modules/users/components/ProfileCard";
import { getRepoReadme, getUserDetail, getUserRepo } from "@/app/services/github";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ReactMarkdown from "react-markdown";
import { IGithubUser, IRepo } from "@/app/types/types";
import { IoClose } from "react-icons/io5";

export default function ProfileView() {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const [showReadme, setShowReadme] = useState<boolean>(false);
    const [selectedRepo, setSelectedRepo] = useState<string>('');
    const { username } = params;

    const {
        data: profile,
    } = useQuery<IGithubUser>({
        queryKey: ["userDetail", username],
        queryFn: () => getUserDetail({ q: username })
    });

    const {
        data: repos = [],
        isLoading: isLoadingRepos,
    } = useQuery<IRepo[]>({
        queryKey: ["userRepo", username],
        queryFn: () => getUserRepo({ q: username })
    });

    const {
        data: readmeFile,
        refetch: refetchReadme,
    } = useQuery({
        queryKey: ["readme", selectedRepo],
        queryFn: () => getRepoReadme({ username: username, repo: selectedRepo }),
        enabled: !!selectedRepo,
    });

    const handleShowReadme = (repo: string) => {
        setShowReadme(true);
        setSelectedRepo(repo);
    }

    const handleCloseReadme = () => {
        setShowReadme(false);
        setSelectedRepo('')
    }

    const handleBackPreviousPage = () => {
        router.back();
    }

    useEffect(() => {
        refetchReadme()
    }, [selectedRepo])

    return (
        <div className="flex flex-col items-center px-4 sm:px-10 pb-10 min-h-screen">
            <div className="my-5 w-full md:w-2/3">
                <Link href="/">
                    <Logo />
                </Link>
                <Suspense>
                    <SearchBar />
                </Suspense>
            </div>
            <div className="grid grid-cols-1 gap-5 w-full md:w-2/3">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-4">
                        <div className="flex items-center gap-3">
                            <button onClick={handleBackPreviousPage}><IoIosArrowBack /></button>
                            <h1 className="font-semibold my-2">Profile</h1>
                        </div>
                        {profile &&
                            <ProfileCard
                                user={profile}
                                showButton={false}
                            />
                        }
                    </div>
                    <div className="col-span-12 sm:col-span-8">
                        {showReadme ?
                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <h1 className="font-semibold my-2">Readme.md</h1>
                                    <button onClick={handleCloseReadme}><IoClose /></button>
                                </div>
                                <div className="text-sm bg-white p-5 rounded">
                                    <ReactMarkdown>{readmeFile}</ReactMarkdown>
                                </div>
                            </div>
                            :
                            <div>
                                <h1 className="font-semibold my-2">Repositories</h1>
                                <div className="grid grid-cols-12 gap-4">
                                    {!isLoadingRepos && repos.map((repo) => {
                                        return (
                                            <RepoCard
                                                key={repo.id}
                                                repo={repo}
                                                onClick={() => handleShowReadme(repo.name)}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
