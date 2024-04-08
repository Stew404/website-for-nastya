import type { Metadata } from "next";
import "./globals.css";
import favicon from "../../public/favicon.png";

export const metadata: Metadata = {
    title: "С днем рождения, Наська",
    description: "Урааааа!!!",
    icons: favicon.src,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en">
                <body>{children}</body>
            </html>
        </>
    );
}
