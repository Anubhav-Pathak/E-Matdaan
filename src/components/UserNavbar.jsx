"use client";
import {useEffect} from 'react'
import { Image } from 'next/image'
import useUserStore from '@/store/UserStore';
import { useRouter } from 'next/navigation';

const UserNavbar = ({name, profile, logout}) => {
    return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">{name}</a>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                {profile && <Image alt="Tailwind CSS Navbar component" src={profile} width={50} height={50} />}
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={() => logout()}><a>Logout</a></li>
            </ul>
            </div>
        </div>
    </div>
)
}

export default UserNavbar