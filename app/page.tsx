const trustPoints = ["Mobile service", "Upfront quote", "Digital receipts"];

const servicePackages = [
  {
    name: "Ghost Refresh",
    startingPrice: 50,
    label: "Maintenance clean",
    description: "For regularly maintained interiors needing a quick reset.",
    features: [
      "Quick interior vacuum",
      "Dashboard, console, and door wipe-down",
      "Interior glass",
      "Up to 60 minutes",
    ],
  },
  {
    name: "Interior Detail",
    startingPrice: 125,
    label: "Most popular",
    description: "A thorough interior detail without removing the seats.",
    features: [
      "Thorough vacuum and crevice cleaning",
      "Panels, vents, and cupholders",
      "Light spot treatment",
      "Small SUVs and trucks start at $150",
    ],
  },
  {
    name: "Interior Restoration",
    startingPrice: 275,
    label: "Deep reset",
    description: "For stained, neglected, or heavily used interiors.",
    features: [
      "Carpet shampoo and extraction",
      "Seat-material treatment",
      "Stain pretreatment",
      "Front-seat removal when safe",
    ],
  },
];

const serviceAddOns = [
  "Headliner · $50+",
  "Trunk · $35+",
  "Cargo area · $40+",
  "Pet hair · $40+",
  "Heavy stains · $40+",
  "Odor treatment · $50+",
  "Exterior wash · $50+",
];

const galleryCategories = ["Seats", "Carpets", "Full cabin"];

const processSteps = [
  {
    number: "01",
    title: "Tell us about it",
    description: "Choose a service and describe your vehicle’s interior.",
  },
  {
    number: "02",
    title: "Send photographs",
    description: "We review the vehicle’s condition before traveling.",
  },
  {
    number: "03",
    title: "Approve your quote",
    description: "Your final price and appointment date are confirmed.",
  },
  {
    number: "04",
    title: "We come to you",
    description: "Provide safe access, keys, and any required hookups.",
  },
];

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

      <section id="services" className="bg-[#f4f3ef] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-teal-800">
            Simple starting prices
          </p>

          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-black leading-none tracking-[-0.045em] text-neutral-950 md:text-6xl">
              Pick the clean your ride needs.
            </h2>

            <p className="max-w-md leading-7 text-neutral-600">
              Final pricing is confirmed after reviewing vehicle size,
              condition, and customer photographs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {servicePackages.map((service, index) => {
              const featured = index === 1;

              return (
                <article
                  key={service.name}
                  className={`rounded-3xl border p-7 ${
                    featured
                      ? "border-neutral-950 bg-neutral-950 text-white md:-translate-y-3"
                      : "border-neutral-300 bg-white text-neutral-950"
                  }`}
                >
                  <span
                    className={`inline-block rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] ${
                      featured
                        ? "bg-lime-300 text-neutral-950"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {service.label}
                  </span>

                  <h3 className="mt-7 text-2xl font-black">{service.name}</h3>

                  <p
                    className={`mt-2 leading-6 ${
                      featured ? "text-neutral-300" : "text-neutral-600"
                    }`}
                  >
                    {service.description}
                  </p>

                  <p className="mt-7 text-sm">
                    Starting at{" "}
                    <strong className="text-5xl">
                      ${service.startingPrice}
                    </strong>
                  </p>

                  <ul
                    className={`my-7 space-y-3 border-t pt-6 text-sm ${
                      featured ? "border-neutral-700" : "border-neutral-200"
                    }`}
                  >
                    {service.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>

                  <a href="#inquiry" className="font-black underline">
                    Choose this service →
                  </a>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <strong className="mr-2">Build your detail</strong>

            {serviceAddOns.map((addOn) => (
              <span
                key={addOn}
                className="rounded-full border border-neutral-300 bg-white px-4 py-3 text-sm"
              >
                {addOn}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-5xl text-xs leading-5 text-neutral-500">
            The $50 Ghost Refresh is for maintained interiors only. It excludes
            extraction, heavy stains, pet hair, excessive trash, and cargo
            areas. Interior Restoration starts at $325 for small SUVs or trucks
            and $375 for large or three-row vehicles.
          </p>
        </div>
      </section>

      <section
        id="gallery"
        className="bg-neutral-950 py-20 text-white md:py-28"
      >
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-teal-300">
            The Ghost treatment
          </p>

          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-black leading-none tracking-[-0.045em] md:text-6xl">
              Proof lives in the transformation.
            </h2>

            <p className="max-w-md leading-7 text-neutral-400">
              Real before-and-after photographs will document the results of
              completed customer details.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {galleryCategories.map((category, index) => (
              <article
                key={category}
                className="flex h-52 flex-col justify-between rounded-3xl border border-neutral-700 bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 md:h-72"
              >
                <span className="text-5xl font-black text-neutral-700">
                  0{index + 1}
                </span>

                <strong className="text-xs tracking-[0.18em] text-teal-300">
                  {category.toUpperCase()}
                </strong>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            Customer transformations coming soon.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f3ef] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-teal-800">
            No guessing
          </p>

          <h2 className="max-w-4xl text-4xl font-black leading-none tracking-[-0.045em] text-neutral-950 md:text-6xl">
            From inquiry to clean in four moves.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="border-t border-neutral-300 pt-6"
              >
                <span className="rounded-md bg-lime-300 px-2 py-2 text-xs font-black">
                  {step.number}
                </span>

                <h3 className="mb-2 mt-6 text-xl font-black">{step.title}</h3>

                <p className="leading-7 text-neutral-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
