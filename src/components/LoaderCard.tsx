import React from "react";
import { Link } from "react-router-dom";

interface LoaderCardProps {
  to: string;
  label: string;
  icon: string;
}

export default function LoaderCard({ to, label, icon }: LoaderCardProps) {
  return (
    <Link
      to={to}
      className="rounded-lg border border-gray-300 p-6 flex flex-col items-center bg-white hover:shadow-lg transition"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-lg font-semibold">{label}</span>
    </Link>
  );
}