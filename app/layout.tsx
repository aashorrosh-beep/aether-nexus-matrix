import "./globals.css";
import React from "react";

export const metadata = {
  title: "ALBS NEXUS • The Online Mall of Malls",
  description: "6 Malls • 240+ Verified Storefronts • Insured 3-7 Day Dispatch"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh" }}>{children}</body>
    </html>
  );
}
