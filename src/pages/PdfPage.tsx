import React from "react";
// TODO: Integrate pdfjs-dist Worker

export default function PdfPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">PDF Surface</h2>
      {/* PDF.js inline viewer here */}
      {/* Print & Download controls referencing root CID */}
      {/* CSP: sandbox allow-downloads allow-forms */}
      <div className="border rounded p-8 text-center text-gray-500">
        <p>PDF viewer coming soon.</p>
      </div>
    </div>
  );
}