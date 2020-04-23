import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { Container } from "react-bootstrap";
import { selectCart } from "../../store/user/selectors";
import { fetchCartProductsByCartId } from "../../store/user/actions";

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

  return <Container>My Deals Id: {cart.id}</Container>;
}
