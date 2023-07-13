import { Inter } from "next/font/google";
import Header from "./Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const Layout = ({ children }) => {
  return (
    <div className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
      <Header />
      <main className='flex-grow bg-[#f7f7f7]'>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};
export default Layout;
