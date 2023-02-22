import Layout from "@/components/Layout";
import useUser from "@/lib/useUser";

export default function Books() {
  const session = useUser({});

  return <Layout authRequired={true}>
    Hello Books!<br />
    { session.isLoading ?
      <>Loading session</> :
      session.isAuthed ?
        <>Logged in as { session.user!.email }</> :
        <>Not logged in</>
    }
  </Layout>;
}