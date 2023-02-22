import { queryClient } from "@/lib/queryClient";
import useUser from "@/lib/useUser";
import Link from "next/link";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

function NextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <li className="nav-item">
    <Link href={href} className="nav-link">
      { children }
    </Link>
  </li>;
}

export default function AppNavbar() {
  const session = useUser({});
  return <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Rocsi Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            { session.isAuthed && <>
              <NextLink href="/users">Utilizatori</NextLink>
              <NextLink href="/books">Cărți</NextLink>
            </> }
          </Nav>
          <Nav>
            { !!queryClient.isFetching() && <Spinner size="sm" variant="light" className="me-3 mt-2" />}
            { session.isLoading ? <></> : <>
              { session.user ? <>
                <div className="me-3 d-flex align-items-center text-light">
                  { session.user.name }
                </div>
                <NextLink href="/auth/logout">Ieși din cont</NextLink>
              </> : <>
                <NextLink href="/auth/login">Autentificare</NextLink>
              </> }
            </> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>;
}