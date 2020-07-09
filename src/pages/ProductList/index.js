import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { fetchAllProducts } from "../../store/products/actions";
import { selectAllProducts } from "../../store/products/selectors";
import ProductCard from "../../components/ProductCard";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CartProduct from "../../components/CartProduct";
import { selectCart } from "../../store/user/selectors";
import { fetchCartProductsByCartId } from "../../store/user/actions";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const cart = useSelector(selectCart);

  console.log("Products", products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, []);

  const cartId = cart ? cart.id : null;

  useEffect(() => {
    dispatch(fetchCartProductsByCartId(cartId));
  }, []);

  if (!cart) {
    return <Loading />;
  }

  const cartProducts = cart.Cart_Products.map((product) => {
    return product.productId;
  });

  const cartProductName = products.map((product) => {
    return product.name;
  });

  //console.log(cartProducts);
  //console.log("ZZZZZZZZZZ", cartProductName);

  const uniqueProducts = [...new Set(cartProducts)];

  //console.log("Unique", uniqueProducts);

  const productAndQuantity = uniqueProducts.map((value) => [
    value,
    cartProducts.filter((num) => num === value).length,
  ]);

  console.log("productAndQuantity", productAndQuantity);
  console.log("productAndQuantity cevap 2", productAndQuantity[0][0]);

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <h1>All Products</h1>

      <Container
        style={{
          width: "80%",
          float: "left",
        }}
        className="m-auto row d-flex"
      >
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
          width: "150px",
          height: "400px",
          backgroundColor: "red",
          //position: "absolute",
          float: "right",
          marginRight: "30px",
          zIndex: 2,
        }}
      >
        {" "}
        Your Grocery List: My Deals Id: {cart.id}
        {productAndQuantity.map((product, index) => {
          for (let i = 0; i < products.length; i++) {
            if (product[0] == products[i].id) {
              return (
                <CartProduct
                  key={index}
                  productId={products[i].name}
                  quantity={product[1]}
                />
              );
            }
          }
        })}
      </Container>
    </>
  );
}
