import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { getCssText, styled } from "../stitches.config";
import "./globals.css";
import { Providers } from "./providers";
import PopularBook from "./components/popularBook";
import Sidebar from "./components/sidebar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "Your complete book app",
};

const StyledDiv = styled("div", {
  color: "$gray100",
  padding: "20px 20px 20px 5px",
});

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
        <Providers>
          <div className="max-w-7xl mx-auto">
            <StyledDiv>
              <div className="flex gap-8 justify-center">
                <div className="flex-2/12">
                  <Sidebar />
                </div>
                <div className="flex-6/12">
                  {children}
                </div>
                <div className="w-12 flex-3/12">
                  <h2 className="mb-8">POPULAR BOOKS</h2>
                  <PopularBook />
                  <PopularBook />
                  <PopularBook />
                </div>
              </div>
            </StyledDiv>
          </div>
        </Providers>
      </body>
    </html>
  );
}
