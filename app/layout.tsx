import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { getCssText } from "../stitches.config";
import "./globals.css";  // Importar seu arquivo global de CSS

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "Your complete book app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body className={`${nunito.variable} antialiased`} style={{ backgroundColor: "#0E1116" }}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
