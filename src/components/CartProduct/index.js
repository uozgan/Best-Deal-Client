import React from "react";
import Card from "react-bootstrap/Card";

const CartProduct = (props) => {
  return (
    <div className="col-lg-3 mb-2 d-row align-self-stretch">
      {/* {console.log("Hadi bakalım props", props)} */}
      <Card style={{ width: "150px" }} className="d-flex">
        <Card.Body className="d-flex">
          <Card.Title
            style={{ width: "100px", fontSize: "10px" }}
            className="align-self-end"
          >{`Product Id: ${props.productId} Quantity: ${props.quantity}`}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartProduct;
