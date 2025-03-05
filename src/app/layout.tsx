import { Tenor_Sans } from "next/font/google";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const tenor_sans = Tenor_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-tenor_sans",
    weight: "400",
});
const rubik = Rubik({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-rubik",
});

export const metadata = {
    title: `CopyIn2Clicks | The world's fastest free copying tool`,
    description:
        "CopyIn2Clicks, the most popular text copying tool on Firefox and Chrome. Copy and save any text in just a mere two clicks.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
})
{
    return (
        <html lang="en">
            <head>
                <meta
                    name="google-site-verification"
                    content="mBTQs9SYY4EXunBAffXSZtb5RI-kKRwSeBCKD9Txj00"
                />
            </head>
            <body className={tenor_sans.variable + " " + rubik.variable}>
                <Header />
                {children}
                <ToastContainer />
                <Footer />
            </body>
        </html>
    );
}
