import DemonProvider from "@/providers/DemonProvider"

import localFont from 'next/font/local'
import "@/style/index.scss"

export const metadata = {
  title: "Demon WAV",
  description: "Demon WAV hatched from the sheer vocation of Alberto Deon to make music. Semantically, WAV is a direct reference to the audio file format known for best preserving the quality of sounds. The expression WAV stands as an etiological allegory to the universe of computer music, and the way it impacted a generational taste. In Demon WAV, music becomes the chosen channel for interweaving cultural and autobiographical references. Expanding the idea of brand, and product into a multifaceted reality that ultimately becomes a mirror to the self.",
}

const wavFont = localFont({
  src: [
    {
      path: '../../public/fonts/WAV-Regular.woff2',
      weight: '300',
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
      style: 'normal'
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
