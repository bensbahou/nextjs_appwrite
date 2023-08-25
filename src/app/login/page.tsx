"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";
import { useState } from "react";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const onLogin = async () => {
    console.log("onLogin");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="border-2 border-gray-500"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password</label>
      <input
        className="border-2 border-gray-500"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="border-2 border-gray-500" onClick={onLogin}>
        Login
      </button>
      <hr />
      <Link href="/signup">Signup</Link>
    </div>
  );
}
