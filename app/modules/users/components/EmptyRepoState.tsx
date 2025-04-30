import Image from "next/image";

export default function EmptyRepoState() {
    return (
        <div className="flex flex-col items-center justify-center text-gray-500 text-sm py-20 col-span-12">
            <Image src="empty-repo.svg" alt="not-found" width="100" height="100" />
            <span className="my-5">Oops! Repo not found.</span>
        </div>
    )
}
