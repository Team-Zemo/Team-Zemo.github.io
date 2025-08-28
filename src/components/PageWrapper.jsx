import React from "react";

export default function PageWrapper({ children, className = "" }) {
  return (
    <div className={`min-h-screen w-full bg-[#e4fcbb]/80 ${className} -z-20`}>
      {children}
    </div>
  );
}
