import Image from "next/image";

export default function EmptyUserState() {
    return (
        <div className="flex flex-col items-center justify-center text-gray-500 text-sm py-20">
            <Image src="empty-user.svg" alt="not-found" width="150" height="150" />
            <span className="my-5">Oops! User not found.</span>
        </div>
    )
}
