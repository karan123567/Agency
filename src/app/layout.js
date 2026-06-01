import "./globals.css";

export const metadata = {
  title: "AstraForge — Premium Digital Product Studio",

  description:
    "AstraForge is a premium digital product studio building high-performance websites, SaaS platforms, and immersive web experiences for ambitious brands and startups.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
