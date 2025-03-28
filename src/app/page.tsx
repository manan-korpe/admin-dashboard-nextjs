import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-dvh w-dvw flex justify-center items-center">
      <div className="p-4 border-2 border-amber-400 rounded text-center">
        <h1 className="font-bold text-4xl first-letter:text-amber-400 first-letter:text-6xl ">
          Admin Dashboard
        </h1>
        <div className="my-4 font-sans text-gray-400">Manan Korpe</div>
        <Link
          href="/login"
          className=" py-2 px-3 bg-amber-500 hover:bg-amber-400 rounded "
        >
          Login
        </Link>
      </div>
    </main>
  );
}
