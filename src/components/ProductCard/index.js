import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import Container from "react-bootstrap/Container";
import { addProductToCart } from "../../store/user/actions";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  //console.log(token);
  console.log("Props", props);

  function addToCart(id) {
    console.log("Button clicked", id);
    dispatch(addProductToCart(id));
  }

  function removeFromCart(id) {
    console.log("Clicked", id);
    //dispatch(removeCarFromCart(id));
  }

  return (
    <div className="col-lg-3 mb-2 d-flex align-self-stretch">
      <Card style={{ width: "200px" }} className="d-flex">
        <Card.Img
          className="align-self-center"
          variant="top"
          style={{ width: "100px", height: "100px" }}
          src={props.image}
        />
        <Card.Body className="d-flex">
          <Card.Title
            style={{ width: "300px" }}
            className="align-self-end"
          >{`${props.brand} ${props.name}`}</Card.Title>
        </Card.Body>
        <Card.Footer>
          {!token ? (
            <p>Please log in to add to cart</p>
          ) : (
            <Container style={{ display: "flex" }}>
              <Button
                style={{ fontSize: "0.7rem", width: "75px", height: "50px" }}
                variant="dark"
                onClick={() => addToCart(props.id)}
              >
                Add To Cart
              </Button>
              <Button
                style={{ fontSize: "0.6rem", width: "75px", height: "50px" }}
                variant="dark"
                onClick={() => removeFromCart(props.id)}
              >
                Remove From Cart
              </Button>
            </Container>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProductCard;
