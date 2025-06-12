import { Button, Column, Html, Row } from "@react-email/components";
import * as React from "react";

type Props = {
  fullName: string, 
  email: string, 
  phone: string, 
  message: string
}

export default function MyEmail({ fullName, email, phone, message } : Props) {
  return (
    <Html>
      <h2>Hi support! We got a new message from our customers!</h2>
      <Row>
        <Column>
          Full Name: {fullName}
        </Column>
      </Row>
      <Row>
        <Column>
          Email: {email}
        </Column>
      </Row>
      <Row>
        <Column>
          Phone Number: {phone}
        </Column>
      </Row>
      <Row>
        <Column>
          Message: {message}
        </Column>
      </Row>
    </Html>
  );
}