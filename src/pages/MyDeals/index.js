import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { Container } from "react-bootstrap";
import { selectCart } from "../../store/user/selectors";
import { fetchCartProductsByCartId } from "../../store/user/actions";
import CartProduct from "../../components/CartProduct";

export default function MyDeals() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  //const cartId = cart.id;

  const cartId = cart ? cart.id : null;

  useEffect(() => {
    dispatch(fetchCartProductsByCartId(cartId));
  }, []);

  if (!cart) {
    return <Loading />;
  }

  console.log("Cart", cart);
  console.log("Cart Products", cart.Cart_Products);

  const cartProducts = cart.Cart_Products.map((product) => {
    return product.productId;
  });

  console.log(cartProducts);

  const uniqueProducts = [...new Set(cartProducts)];

  //console.log("Unique", uniqueProducts);

  const productAndQuantity = uniqueProducts.map((value) => [
    value,
    cartProducts.filter((num) => num === value).length,
  ]);

  console.log("productAndQuantity", productAndQuantity);

  return (
    <Container>
      My Deals Id: {cart.id}
      {productAndQuantity.map((product, i) => {
        return (
          <CartProduct key={i} productId={product[0]} quantity={product[1]} />
        );
      })}
    </Container>
  );
}
