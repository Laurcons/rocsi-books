import Layout from "@/components/Layout";
import { fetchPost } from "@/lib/fetcher";
import useUser from "@/lib/useUser";
import { useState, SyntheticEvent } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";

export default function Login() {
  const session = useUser({ redirectIfAuthenticated: true });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onLogin(ev: SyntheticEvent) {
    ev.preventDefault();
    setError('');
    if (!email || !password) {
      setError("Emailul sau parola lipsesc.");
      return;
    }
    try {
      setIsLoading(true);
      await fetchPost('/api/users/login', {
        email, password
      });
      await session.invalidate();
    } catch (ex: any) {
      setError(ex?.message ?? 'Eroare necunoscută');
    } finally {
      setIsLoading(false);
    }

  }

  return <Layout>
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Parola</Form.Label>
          <Form.Control type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
        </Form.Group>
        { error && <Alert variant="danger">{ error }</Alert> }
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" className="float-end" onClick={onLogin} disabled={isLoading}>Autentificare</Button>
      </Card.Footer>
    </Card>
  </Layout>;
}