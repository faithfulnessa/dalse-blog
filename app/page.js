import { Search } from "lucide-react";
import Image from "next/image";

export default async function Home({ searchParams }) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="bg-primary px-5 py-10 md:py-16 text-center">
        <div className="max-w-3xl px-6 py-4 inline-block bg-white dark:bg-black">
          <header>
            <h1>Welcome to Dalse Blog</h1>
          </header>
        </div>
        <p className="text-white text-sm mt-4 max-w-xl mx-auto dark:text-black">
          Read post from community or share your own story!
        </p>
        <form action="/" className="max-w-md mx-auto mt-6">
          <div className="bg-white flex items-center rounded-full overflow-hidden border-white px-2 dark:bg-black">
            <input type="text" name="query" defaultValue={query} className="flex-1 px-4 py-3 text-sm focus:outline-none"/>
            <button type="submit" className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center shrink-0"><Search size={16} /></button>
          </div>
        </form>
        <p className="text-red-600">this is what are search {query}</p>
      </section>
    </>
  );
}
