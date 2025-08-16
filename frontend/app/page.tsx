/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { apiPost } from "../lib/api";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // If there is a token, send it directly to /home
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) location.href = "/home";
  }, []);

  const doLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setErr(null);
    setInfo(null);
    try {
      const { token, user } = await apiPost("/auth/login", { email, password });
      localStorage.setItem("token", token);
      if (user?.email) localStorage.setItem("userEmail", user.email);
      location.href = "/home";
    } catch (error: any) {
      setErr(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const doRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setErr(null);
    setInfo(null);
    try {
      await apiPost("/auth/register", { email, password });
      setTab("login");
      setInfo("Registration successful, you can now login.");
      setPassword("");
    } catch (error: any) {
      setErr(error?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="tabs">
          <button className={tab === "login" ? "active" : ""} onClick={() => { setTab("login"); setErr(null); setInfo(null); }}>
            Login
          </button>
          <button className={tab === "register" ? "active" : ""} onClick={() => { setTab("register"); setErr(null); setInfo(null); }}>
            Register
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={doLogin} className="auth-form">
            <h2>Login</h2>
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="form-actions">
              <button disabled={loading} type="submit">Login</button>
            </div>
            {info && <p className="info">{info}</p>}
            {err && <p className="error">{err}</p>}
          </form>
        ) : (
          <form onSubmit={doRegister} className="auth-form">
            <h2>Register</h2>
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="form-actions">
              <button disabled={loading} type="submit">Register</button>
            </div>
            {err && <p className="error">{err}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
