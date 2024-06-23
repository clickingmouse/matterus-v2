"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUsserLoggedIn = true;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image />
        <p className="logo_text"></p>
      </Link>

      {/*desktop devices*/}
      <div className="sm:flex hidden">
        {isUsserLoggedIn ? (
          <div className="flex gap-3 md:gap=5">
            <Link href="/" className="black-btn">
              HOME
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;
