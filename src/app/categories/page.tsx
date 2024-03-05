"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import "./category.css";

export default function Home() {
  const API = "https://api.escuelajs.co/api/v1/categories";

  const [categories, setCategories] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken") || "";
    const storedRefreshToken = localStorage.getItem("refreshToken") || "";
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch Categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  let val = 1519;
  return (
    <main className="categories-container">
      <h1 className="categories-header">Categories</h1>
      <div className="categories-wrapper">
        {categories.map(({ id, name, image }) => {
          const cleanImg = `https://picsum.photos/${val}/${val}`;
          val++;
          return (
            <Link href={`categories/${id}`} key={id} className="category-card">
              <h3 className="category-card-title">{name}</h3>
              <div className="category-card-image">
                <img alt={name} src={cleanImg} />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
