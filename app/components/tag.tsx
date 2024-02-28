import Link from "next/link"

export default function Tag({ tag }: { tag: string }) {
    return (
        <Link href={`/posts/tag/${tag}`} className="no-underline" >
            <span className=" bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 ">
                {tag}
            </span>
        </Link>
    )
}