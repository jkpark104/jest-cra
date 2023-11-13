import { Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useUserOrderDetails } from "../../contexts/OrderDetails";
import { type Item } from "./Options";

export default function ToppingOption({ name, imagePath }: Item) {
  const { updateItemCount } = useUserOrderDetails();

  return (
    <Col xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      ></img>
      <Form.Group controlId={`${name}-topping-checkbox`} as={Row}>
        <Form.Check
          label={name}
          type="checkbox"
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
          }}
        ></Form.Check>
      </Form.Group>
    </Col>
  );
}
