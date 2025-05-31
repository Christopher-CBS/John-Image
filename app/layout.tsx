import "./globals.css";
import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "John Image",
  description:
    "Professional photography and videography services for weddings, celebrations, and special events. Capturing your moments with artistry and passion.",
  keywords:
    "photographer, videographer, wedding photography, event videos, professional photography",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${serif.variable} ${sans.variable} font-sans antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
