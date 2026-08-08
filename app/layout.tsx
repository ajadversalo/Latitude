import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latitude — Software Engineering Courses",
  description: "In-depth courses on object-oriented design, authentication, and ASP.NET Core Web API architecture.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
