import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/person/c54be76d-44fb-11ef-b297-fa163e13252b">
        Go to Person Details
      </Link>
    </div>
  );
}
