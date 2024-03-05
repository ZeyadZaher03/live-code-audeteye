"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import Link from "next/link";

export default function Home({ params }) {
  const query = params.title;
  const API = `https://api.escuelajs.co/api/v1/products?title=${query}`;

  const [product, setProduct] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken") || "";
    setAccessToken(storedAccessToken);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setProduct(response.data[0]);
    } catch (error) {
      console.error("Failed to fetch Categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const cleanImg = "https://picsum.photos/1519/1519";
  return (
    <main className="product">
      <div className="product-data">
        <div className="back">
          <Link href={`/categories/${product?.category?.id}`}>GO BACK</Link>
        </div>
        <h1 className="product-title">{product?.title}</h1>
        <span className="product-price">Price: {product?.price}$</span>
        <span className="product-cat">Category: {product?.category?.name}</span>
        <p className="product-description">Price: {product?.description}</p>
      </div>
      <div className="product-img">
        <img src={cleanImg} alt={product?.title} />
      </div>
    </main>
  );
}
