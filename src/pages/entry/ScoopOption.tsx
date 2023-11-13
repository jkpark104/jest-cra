import Col from "react-bootstrap/Col";
import { type Item } from "./Options";
import { useUserOrderDetails } from "../../contexts/OrderDetails";
import { Form, Row } from "react-bootstrap";

export default function ScoopOption({ name, imagePath }: Item) {
  const { updateItemCount } = useUserOrderDetails();

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={(e) =>
              updateItemCount(name, parseInt(e.target.value), "scoops")
            }
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
