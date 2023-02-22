import useUser from "@/lib/useUser";
import React from "react";
import { Container, Spinner } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

export default function Layout({ children, authRequired = false }: { children: React.ReactNode, authRequired?: boolean }) {
  const session = useUser({ redirectIfUnauthenticated: authRequired });

  return <>
    <AppNavbar />
    <Container className="py-3">
      { (session.isAuthed || !authRequired) ? children : <Spinner /> }
    </Container>
  </>;

}