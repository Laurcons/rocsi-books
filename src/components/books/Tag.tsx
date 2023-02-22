import { Badge } from "react-bootstrap";
import { Tag as TagIcon } from "react-bootstrap-icons";

export default function Tag({ children }: { children: React.ReactNode }) {
  return <Badge color="primary"><TagIcon /> {children}</Badge>
}