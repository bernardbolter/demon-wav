import DemonProvider from "@/providers/DemonProvider"

import { Inter } from "next/font/google"
import "@/style/index.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Demon WAV",
  description: "Audio player from Demon Footwear",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemonProvider>
          {children}
        </DemonProvider>
      </body>
    </html>
  );
}
