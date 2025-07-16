import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import {generateDesign} from "../service/deisgnService"
const FashionForm: React.FC = () => {
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [pattern, setPattern] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ model, color, pattern });
    generateDesign({ model, color, pattern })
    // Add your AI API integration logic here
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow">
        <h3 className="mb-4 text-center">🎨 Fashion Design Generator</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="model" className="mb-3">
            <Form.Label>Dress Model</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., A-line, Kurti, Gown"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="color" className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Red, Pastel Blue"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="pattern" className="mb-4">
            <Form.Label>Pattern</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Floral, Geometric"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Generate Design
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
export default FashionForm;
