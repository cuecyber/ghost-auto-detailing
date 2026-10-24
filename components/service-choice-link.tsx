"use client";

type ServiceChoice = "refresh" | "detail" | "restoration";

type ServiceChoiceLinkProps = {
  service: ServiceChoice;
};

export default function ServiceChoiceLink({ service }: ServiceChoiceLinkProps) {
  function selectService() {
    window.dispatchEvent(
      new CustomEvent("ghost:service-selected", {
        detail: service,
      }),
    );
  }

  return (
    <a href="#inquiry" onClick={selectService} className="font-black underline">
      Choose this service →
    </a>
  );
}
