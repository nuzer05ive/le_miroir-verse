import React from "react";
import LoaderCard from "../components/LoaderCard";
import { Link } from "react-router-dom";

const loaderViews = [
  { to: "/pdf", label: "PDF Surface", icon: "📄" },
  { to: "/audio", label: "Audio Surface", icon: "🎵" },
  { to: "/scroll", label: "ScrollOS", icon: "📜" },
  { to: "/nft", label: "NFT Surface", icon: "🪙" },
  { to: "/qr", label: "QR Surface", icon: "🔳" },
  { to: "/vr", label: "VR Surface", icon: "🪞" },
  { to: "/scrollfield", label: "PhiField", icon: "🌀" },
];

export default function IndexPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-blue-100">
      <h1 className="text-4xl font-bold mb-8">Load your iPEARL</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {loaderViews.map((view) => (
          <LoaderCard key={view.to} to={view.to} label={view.label} icon={view.icon} />
        ))}
      </div>
      <div className="mt-8 text-xs text-gray-400 text-center">
        <p>Spec: <a href="https://github.com/priivi3/s-core-loader" className="underline">Blooming Manifesto v4.4.0</a></p>
      </div>
    </main>
  );
}