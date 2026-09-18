import "./globals.css";

export const metadata = {
  title: "LB Demo",
  description: "Static Next.js demo for a local Nginx load balancer"
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
