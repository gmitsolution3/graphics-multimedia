"use client";

import dynamic from "next/dynamic";

const AboutCounter = dynamic(() => import("./AboutCounter"), {
  ssr: false,
});

export default function AboutCounterWrapper({
  stats,
}: {
  stats: any;
}) {
  return <AboutCounter {...stats} />;
}
