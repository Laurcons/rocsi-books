import { Badge } from 'react-bootstrap';
import { Tag as TagIcon } from 'react-bootstrap-icons';

export default function Tag({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Badge
      color="primary"
      className="user-select-none"
      style={{ cursor: onClick && 'pointer' }}
      onClick={onClick}
    >
      <TagIcon /> {children}
    </Badge>
  );
}
