import { Tweet } from "react-tweet";

interface ClientTweetCardProps {
  id: string;
}

export function ClientTweetCard({ id }: ClientTweetCardProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <Tweet id={id} />
    </div>
  );
} 