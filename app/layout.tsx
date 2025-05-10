import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { getCssText, styled } from "../stitches.config";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "./components/sidebar";
import ReactQueryProvider from "./providers/react-query-provider";
import { BookReviewProvider } from "./context/bookReviewContext";
import PopularBooks from "./components/popularBook";

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
        <ReactQueryProvider>
          <BookReviewProvider>
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
                      <PopularBooks />
                    </div>
                  </div>
                </StyledDiv>
              </div>
            </Providers>
          </BookReviewProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
