import "./globals.css";
import HeaderWithCart from "./components/HeaderWithCart";

export const metadata = {
  title: "Cafe Cristal",
  description: "Discover Cafe Cristal - Home of Fine Tea, Coffee and Cakes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fafafa] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
