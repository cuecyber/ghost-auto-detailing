"use client";

import { FormEvent, useState } from "react";

const conditionOptions = [
  "Heavy stains",
  "Pet hair",
  "Food or spills",
  "Odor",
  "Excessive trash",
  "Trunk or cargo area",
  "Exterior service too",
];

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-neutral-950 shadow-xl md:p-14">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime-300 text-3xl font-black">
          ✓
        </span>

        <h3 className="mt-6 text-3xl font-black">Inquiry draft complete.</h3>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-neutral-600">
          The form interface is working. Secure storage, owner notifications,
          and customer reference numbers will be connected during the backend
          milestone.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 rounded-xl bg-neutral-950 px-6 py-4 font-black text-white"
        >
          Start another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 text-neutral-950 shadow-xl md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          First name
          <input
            required
            name="firstName"
            autoComplete="given-name"
            className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
            placeholder="Your first name"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Mobile number
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
            placeholder="(502) 555-0000"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Vehicle year
          <input
            required
            name="vehicleYear"
            inputMode="numeric"
            className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
            placeholder="2018"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Make and model
          <input
            required
            name="vehicle"
            className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
            placeholder="Toyota Camry"
          />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold">
        Which service fits best?
        <select
          required
          name="requestedService"
          defaultValue=""
          className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
        >
          <option value="" disabled>
            Select a service
          </option>
          <option value="refresh">Ghost Refresh — from $50</option>
          <option value="detail">Interior Detail — from $125</option>
          <option value="restoration">Interior Restoration — from $275</option>
          <option value="recommendation">Not sure — recommend a service</option>
        </select>
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-bold">What are we dealing with?</legend>

        <div className="mt-3 flex flex-wrap gap-2">
          {conditionOptions.map((condition) => (
            <label
              key={condition}
              className="cursor-pointer rounded-full border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm"
            >
              <input
                type="checkbox"
                name="conditions"
                value={condition}
                className="mr-2 accent-neutral-950"
              />
              {condition}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 grid gap-2 text-sm font-bold">
        Tell us more
        <textarea
          required
          name="details"
          rows={5}
          className="resize-y rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
          placeholder="Where are the worst areas? What results are you hoping for?"
        />
      </label>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Service ZIP code
          <input
            required
            name="zipCode"
            inputMode="numeric"
            autoComplete="postal-code"
            className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
            placeholder="40218"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold">
          Hookups available?
          <select
            required
            name="utilities"
            defaultValue=""
            className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 font-normal"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="water-electric">Water and electric</option>
            <option value="water">Water only</option>
            <option value="electric">Electric only</option>
            <option value="neither">Neither or unsure</option>
          </select>
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold">
        Interior photographs
        <input
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="rounded-xl border border-dashed border-neutral-400 bg-neutral-50 p-4 font-normal"
        />
        <span className="font-normal text-neutral-500">
          Photograph upload storage will be connected later.
        </span>
      </label>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6">
        <input
          required
          name="contactConsent"
          type="checkbox"
          className="mt-1 accent-neutral-950"
        />
        I agree that Ghost Auto Detailing may call or text me about this
        inquiry.
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-neutral-950 p-4 font-black text-white"
      >
        Send my inquiry →
      </button>

      <small className="mt-3 block text-center text-neutral-500">
        This form does not collect payment information.
      </small>
    </form>
  );
}
