const trustPoints = ["Mobile service", "Upfront quote", "Digital receipts"];

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 no-underline">
          <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-neutral-950 bg-lime-300 text-xl font-black text-neutral-950">
            G
          </span>

          <span className="font-black tracking-wider text-neutral-950">
            GHOST
            <small className="block text-[9px] tracking-[0.2em] text-neutral-500">
              AUTO DETAILING
            </small>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
          <a href="#services">Services</a>
          <a href="#gallery">Results</a>
          <a href="#inquiry">Get a quote</a>
        </nav>

        <a
          href="#inquiry"
          className="hidden rounded-full bg-neutral-950 px-5 py-3 text-sm font-bold text-white md:block"
        >
          Request a detail
        </a>
      </header>

      <section
        id="top"
        className="bg-[radial-gradient(circle_at_80%_20%,rgba(85,230,211,0.35),transparent_25%),linear-gradient(135deg,#f4f3ef,#e5eae3)] py-16 md:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-teal-800">
              Louisville mobile interior specialists
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-neutral-950 md:text-7xl">
              We make dirty interiors{" "}
              <span className="bg-lime-300 px-1">disappear.</span>
            </h1>

            <p className="my-7 max-w-2xl text-lg leading-8 text-neutral-600">
              Heavy stains, daily grime, pet hair, and neglected carpets—we
              bring the clean to you and restore the space you drive in.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#inquiry"
                className="rounded-full bg-neutral-950 px-6 py-4 font-bold text-white"
              >
                Get my estimate
              </a>

              <a
                href="#services"
                className="rounded-full border-2 border-neutral-950 px-6 py-[14px] font-bold text-neutral-950"
              >
                View packages
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold text-neutral-700">
              {trustPoints.map((point) => (
                <span key={point}>✓ {point}</span>
              ))}
            </div>
          </div>

          <div className="relative grid h-[330px] grid-cols-2 overflow-hidden rounded-3xl shadow-2xl md:h-[460px]">
            <div className="flex flex-col justify-end bg-gradient-to-b from-stone-500 to-stone-800 p-6 pb-20 text-white">
              <strong className="text-xs tracking-[0.2em]">BEFORE</strong>
              <span className="text-xs">Stains · crumbs · buildup</span>
            </div>

            <div className="flex flex-col justify-end bg-gradient-to-b from-teal-500 to-teal-950 p-6 pb-20 text-white">
              <strong className="text-xs tracking-[0.2em]">AFTER</strong>
              <span className="text-xs">Extracted · treated · refreshed</span>
            </div>

            <strong className="absolute bottom-5 left-5 right-5 rounded-xl bg-lime-300 p-4 text-center text-xs tracking-[0.14em] text-neutral-950">
              REAL INTERIORS. VISIBLE RESULTS.
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}
