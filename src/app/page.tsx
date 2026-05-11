const foundationItems = [
  "Next.js App Router",
  "React and TypeScript",
  "Tailwind CSS styling foundation",
  "Accessible page structure",
  "Documentation-first workflow",
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Fictional clinic website
          </p>
          <h1 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">
            Everwell Family Clinic
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            A calm, accessible healthcare marketing site foundation ready for
            CMS-driven pages, provider profiles, services, resources, and
            articles in future milestones.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foundationItems.map((item) => (
            <div
              className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm"
              key={item}
            >
              <p className="font-medium text-slate-950">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
