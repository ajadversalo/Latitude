import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latitude — Software Design & Authentication",
  description: "In-depth courses on object-oriented design, authentication, OAuth, OpenID Connect, and token security.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
