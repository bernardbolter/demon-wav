import DemonProvider from "@/providers/DemonProvider"

import localFont from 'next/font/local'
import "@/style/index.scss"

export const metadata = {
  title: "Demon WAV",
  description: "Audio player from Demon Footwear",
}

const wavFont = localFont({
  src: [
    {
      path: '../../public/fonts/WAV-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/WAV-Compressed.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../public/fonts/WAV-Extended.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../public/fonts/DMN-EPITAPH.woff2',
      wieght: '700',
      style: 'bold'
    }
  ]
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={wavFont.className}>
        <DemonProvider>
          {children}
        </DemonProvider>
      </body>
    </html>
  );
}
