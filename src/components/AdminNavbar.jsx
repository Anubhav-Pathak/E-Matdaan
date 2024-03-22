import Image from 'next/image'
import Link from 'next/link'

const AdminNavbar = () => {
    return (
        <div className="navbar absolute bg-base-100 z-10">
            <div className="flex-1"> <a className="btn btn-ghost text-xl">E-Matdaan</a> </div>
            <div className="flex-none gap-2">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/admin/elections">Elections</Link></li>
                    <li>
                        <details>
                            <summary>Register</summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><Link href="/admin/register?user=candidate">Candidate</Link></li>
                                <li><Link href="/admin/register?user=voter">Voter</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image alt="Tailwind CSS Navbar component" src="/next.svg" width="50" height="50" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li> <a className="justify-between"> Profile <span className="badge">New</span> </a> </li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar