import React from 'react';
import { Link } from 'react-router-dom';

interface LoaderCardProps {
  label: string;
  to: string;
}

export default function LoaderCard({ label, to }: LoaderCardProps) {
  return (
    <Link
      to={to}
      className="border border-gray-300 rounded-md p-4 flex items-center justify-center hover:bg-gray-100"
    >
      <span className="font-semibold">{label}</span>
    </Link>
  );
}
