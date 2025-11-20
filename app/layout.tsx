import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "Quickpark",
  description: "getting your packing space made easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode

}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">{children}</ThemeProvider>
        
      </body>
    </html>
  );
}
