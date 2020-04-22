import React from "react";
import Loading from "../../components/Loading";
import { Container } from "react-bootstrap";

export default function MyDeals() {
  const cart = [];

  if (!cart) {
    return <Loading />;
  }

  return <Container>My Deals</Container>;
}
