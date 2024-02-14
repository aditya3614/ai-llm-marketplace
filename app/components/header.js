"use client";
import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div>
      <div className="m-0 p-0 h-14 flex justify-end items-center gap-5 mr-5">
        <Link href="/">
          <h2>Explore</h2>
        </Link>
        <Link href="/Favorites">
          <h2>Favorites</h2>
        </Link>
      </div>
    </div>
  );
};

export default Header;
