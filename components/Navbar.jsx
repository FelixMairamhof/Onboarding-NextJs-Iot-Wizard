import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 text-neutral-content shadow-xl">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl" >Home</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
            <li>      
                <Link href="/admin">Admin</Link>
            </li>
            <li>      
                <Link href="/onboarding">Onboarding</Link>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
