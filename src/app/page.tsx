"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./login.css";

export default function Home() {
  const router = useRouter();

  const API = "";
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const login = async () => {
    try {
      const response = axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email: "john@mail.com",
          password: "changeme",
        }
      );
      const { access_token, refresh_token } = response;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      router.push("/categories");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const refreshAccessToken = async () => {
    const refreshAPI = API + "token/refresh";
    try {
      const response = await axios.post(refreshAPI, {
        refresh_token: localStorage.getItem("refreshToken"),
      });
      const newAccessToken = response.data.access;
      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  };

  const checkAccessTokenValidity = () => refreshAccessToken();

  useEffect(() => {
    if (accessToken) {
      const intervalId = setInterval(checkAccessTokenValidity, 5 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, [checkAccessTokenValidity, accessToken]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <main className="login-container">
      <form className="login-form">
        <h1>Login</h1>
        <div className="login-box">
          <input
            className=""
            type="text"
            value={email}
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="login-box">
          <input
            className=""
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="login-submit"
          onClick={onSubmitForm}
          disabled={!email.trim() || !password.trim()}
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
