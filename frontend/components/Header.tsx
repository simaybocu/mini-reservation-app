"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("userEmail");
    setLoggedIn(!!token);
    setEmail(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    location.href = "/"; // back to the login/register screen
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="brand">Yacht Reservation Platform</h1>
      </div>

      <nav className="header-right">
        {loggedIn ? (
          <>
            <Link className="nav-link" href="/home">Products</Link>
            <Link className="nav-link" href="/reservations">My Reservations</Link>
            <span className="user-email">{email}</span>
            <button className="btn-logout" onClick={logout}>Logout</button>
          </>
        ) : null}
      </nav>
    </header>
  );
}
