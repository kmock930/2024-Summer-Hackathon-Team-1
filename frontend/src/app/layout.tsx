import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@pigment-css/react/styles.css';
import { globalCss, styled } from '@pigment-css/react';
import RetoolProvider from '@/components/RetoolProvider';

const inter = Inter({ subsets: ['latin'] });

globalCss`
 /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  Typographic tweaks!
  3. Add accessible line-height
  4. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  5. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  6. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  7. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  8. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
} 

:root {
  --color-text: hsl(0deg, 0%, 100%);
  --color-blue: hsla(210deg, 63%, 45%, 1);
  --color-blue-1: hsla(210deg, 77%, 33%, 1);
  --background: linear-gradient(
    50deg,
    hsl(209deg 87% 51%) 0%,
    hsl(209deg 88% 55%) 4%,
    hsl(210deg 88% 60%) 8%,
    hsl(210deg 88% 64%) 12%,
    hsl(211deg 89% 68%) 16%,
    hsl(211deg 90% 72%) 20%,
    hsl(211deg 90% 76%) 25%,
    hsl(213deg 93% 78%) 30%,
    hsl(215deg 94% 81%) 34%,
    hsl(216deg 95% 84%) 39%,
    hsl(218deg 97% 86%) 44%,
    hsl(219deg 100% 89%) 49%,
    hsl(221deg 100% 91%) 53%,
    hsl(219deg 100% 89%) 58%,
    hsl(218deg 97% 86%) 63%,
    hsl(216deg 95% 84%) 67%,
    hsl(215deg 94% 81%) 71%,
    hsl(213deg 93% 78%) 76%,
    hsl(211deg 90% 76%) 80%,
    hsl(211deg 90% 72%) 83%,
    hsl(211deg 89% 68%) 87%,
    hsl(210deg 88% 64%) 90%,
    hsl(210deg 88% 60%) 94%,
    hsl(209deg 88% 55%) 97%,
    hsl(209deg 87% 51%) 100%
  )
}
`;

const BackgroundWrapper = styled.div`
  height: 100vh;
  background: var(--background);
`;

export const metadata: Metadata = {
  title: 'CICS Course Registration',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <BackgroundWrapper>{children}</BackgroundWrapper>
      </body>
    </html>
  );
}
