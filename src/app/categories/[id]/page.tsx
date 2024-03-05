"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import "./product-card.css";

export default function Home({ params }) {
  const { id } = params;
  const API = `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`;
  const [products, setProducts] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken") || "";
    setAccessToken(storedAccessToken);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch Categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products.length) {
    return (
      <main className="product-cards-page-wrapper">
        <div className="back">
          <Link href={`/categories/`}>GO BACK</Link>
        </div>
        <h1 className="product-card-page-header">No Products Available</h1>
      </main>
    );
  }

  const categoryName = products?.[0]?.category.name;
  let val = 1519;

  return (
    <main className="product-cards-page-wrapper">
      <div className="back">
        <Link href={`/categories/`}>GO BACK</Link>
      </div>
      <h1 className="product-card-page-header">{categoryName}'s Products</h1>
      <span className="product-card-page-len">count: {products.length}</span>
      <div className="product-cards-wrapper">
        {products.map(({ id, title }) => {
          const cleanImg = `https://picsum.photos/${val}/${val}`;
          val++;
          return (
            <Link href={`product/${title}`} key={id} className="product-card">
              <h3 className="product-card-title">{title}</h3>
              <div className="product-card-image">
                <img src={cleanImg} alt={title} />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
