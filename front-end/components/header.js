import React, { useState, useEffect } from "react";

const Navbar = () => {
  return (
    <header className="w-screen h-16 bg-[#213555] fixed top-0 left-0 text-[#F5EFE7] flex justify-around items-center">
      <div className="flex items-center">
        <a
          href="/"
          className="flex items-center text-xl font-bold text-[#F5EFE7] hover:text-blue-600 gap-4"
        >
          Chingun
        </a>
      </div>

      <div className="flex w-auto gap-6">
        <a
          href="/products"
          className="flex items-center text-[#F5EFE7] hover:text-blue-600 "
        >
          Products
        </a>
        <a
          href="/users"
          className="flex items-center text-[#F5EFE7] hover:text-blue-600 "
        >
          Users
        </a>
        <a
          href="/reviews"
          className="flex items-center text-[#F5EFE7] hover:text-blue-600 "
        >
          Reviews
        </a>
        <a
          href="/orders"
          className="flex items-center text-[#F5EFE7] hover:text-blue-600 "
        >
          Orders
        </a>
      </div>
    </header>
  );
};

export default Navbar;
