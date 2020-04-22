import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { fetchAllProducts } from "../../store/products/actions";
import { selectAllProducts } from "../../store/products/selectors";
import ProductCard from "../../components/ProductCard";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  console.log("Products", products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <h1>All Products</h1>

      <Container className="m-auto row d-flex">
        {products.map((product, i) => {
          return (
            <ProductCard
              key={i}
              id={product.id}
              name={product.name}
              brand={product.brand}
              image={product.image}
              type={product.category.type}
            />
          );
        })}
      </Container>
      <Container
        style={{
          width: "100px",
          height: "400px",
          backgroundColor: "red",
          //position: "absolute",
          float: "right",
          zIndex: 2,
        }}
      >
        {" "}
        Your Grocery List
      </Container>
    </>
  );
}
