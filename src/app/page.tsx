import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      {/* Temporary sections for testing scroll */}
      <section className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-4xl font-bold">Section 2</h2>
      </section>

      <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <h2 className="text-4xl font-bold">Section 3</h2>
      </section>
    </>
  );
}
