"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CiStickyNote } from "react-icons/ci";

export default function Navbar() {

    function changeTheme() {
        document.documentElement.classList.toggle('dark')
    }

    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, [])

    const pathname = usePathname()
    return (
        <nav className="fixed w-screen bg-white dark:bg-[#03001C] z-10 flex justify-between px-16 items-center transition-colors duration-200 ease-in-out">
            <div className="flex items-center gap-1">
                <Link href="/" className="font-bold text-xl dark:text-white">BEZBLOG</Link>
            </div>
            <ul className="flex justify-center gap-4 py-5 text-white">
                <li><Link href="/create-post" className={`${pathname === '/create-post' ? 'font-semibold text-red-500' : 'text-[#03001C] dark:text-white'}`}>Create post</Link></li>
                <li>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onChange={changeTheme} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#301E67] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#301E67]"></div>
                    </label>
                </li>
            </ul>
        </nav>
    )
}