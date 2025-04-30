import { IRepoCard } from '@/app/types/types'
import { BiSolidBookBookmark, BiSolidStar } from 'react-icons/bi'

export default function RepoCard({
    name,
    description,
    stargazers_count,
    onClick,
}: IRepoCard) {
    return (
        <div className="bg-white p-4 flex flex-col justify-between rounded-md shadow-sm col-span-12 sm:col-span-6 2xl:col-span-3">
            <div>
                <div className="flex items-center mb-2">
                    <span className="mr-1"><BiSolidBookBookmark /></span>
                    <span className="text-sm break-all font-medium">{name}</span>
                </div>
                <div className="text-xs text-gray-500 mb-2 capitalize line-clamp-3" >{description || 'description not available'}</div>
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center justify-center">
                    <span className="mr-1"><BiSolidStar /></span>
                    <span className="text-sm">{stargazers_count}</span>
                </div>
                <div>
                    <button
                        onClick={onClick}
                        className="py-1 px-4 inline-flex justify-center items-center rounded-md border border-transparent font-semibold bg-black text-white text-xs"
                    >
                        Show Readme
                    </button>
                </div>
            </div>
        </div>
    )
}
