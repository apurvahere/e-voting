import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <div className="my-2">
        <h1 className="text-4xl leading-9">Welcome to E-Voting portal</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <Link
          href="/voter/login"
          className="text-2xl bg-green-500 text-white px-10 py-4 rounded-full"
        >
          Continue as voter
        </Link>
        <Link
          href="/politician/login"
          className="text-2xl bg-blue-500 text-white px-10 py-4 rounded-full"
        >
          Continue as Politician
        </Link>
      </div>
    </main>
  );
}
