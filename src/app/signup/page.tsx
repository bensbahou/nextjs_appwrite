"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    setLoading(true);

    try {
      setButtonDisabled(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/login");
      }
      setButtonDisabled(false);
    } catch (error: any) {
      setLoading(false);
      console.log("Signup error: ", error.message); // [2
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email && user.username && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading..." : "Signup"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="border-2 border-gray-500"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="username">Username</label>
      <input
        className="border-2 border-gray-500"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="border-2 border-gray-500"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button className="border-2 border-gray-500" onClick={onSignup}>
        {buttonDisabled ? "Disabled" : "Signup"}
      </button>
      <hr />
      <Link href="/login">Login</Link>
    </div>
  );
}
