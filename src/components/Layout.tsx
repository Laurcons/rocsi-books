import React from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return <>
    <AppNavbar />
    <Container className="py-3">
      { children }
    </Container>
  </>;

}