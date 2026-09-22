import "./globals.css";

export const metadata = {
  title: "Nujeel — Technology Talent Intelligence",
  description: "Describe the capability you need. Nujeel finds who can deliver it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
