import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { SITE_URL as siteUrl } from "@/lib/constants";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaBehance, FaWhatsapp } from "react-icons/fa6";
import { SiUpwork, SiFramer } from "react-icons/si";

export const metadata: Metadata = {
    title: "Links | Rashid Iqbal",
    description: "Connect with Rashid Iqbal across the web. Freelance Next.js & Framer Developer from Pakistan.",
    alternates: {
        canonical: `${siteUrl}/links`,
    },
};

const links = [
    {
        name: "Framer Expert Profile",
        url: "https://www.framer.com/@rashidiqbal",
        icon: <SiFramer className="w-5 h-5" />,
        featured: true,
    },
    {
        name: "Portfolio & Services",
        url: "/",
        icon: <MoveRight className="w-5 h-5" />,
    },
    {
        name: "Read My Latest Articles",
        url: "/blog",
        icon: <MoveRight className="w-5 h-5" />,
    },
    {
        name: "Hire Me on Upwork",
        url: "https://www.upwork.com/freelancers/~01b24c107f5b5af596",
        icon: <SiUpwork className="w-5 h-5" />,
    },
    {
        name: "Follow on LinkedIn",
        url: "https://www.linkedin.com/in/callmerashidiqbal/",
        icon: <FaLinkedinIn className="w-5 h-5" />,
    },
    {
        name: "Follow on X/Twitter",
        url: "https://x.com/rashidrealme",
        icon: <FaXTwitter className="w-5 h-5" />,
    },
    {
        name: "View Designs on Behance",
        url: "https://www.behance.net/thatgroot",
        icon: <FaBehance className="w-5 h-5" />,
    },
    {
        name: "GitHub Open Source",
        url: "https://github.com/thatgroot",
        icon: <FaGithub className="w-5 h-5" />,
    },
    {
        name: "Chat on WhatsApp",
        url: "https://wa.me/923554665643",
        icon: <FaWhatsapp className="w-5 h-5" />,
    },
];

export default function LinksPage() {
    return (
        <main className="min-h-screen bg-zinc-50 flex flex-col items-center py-16 px-4 sm:px-6 relative overflow-hidden font-sans">
            {/* Background styling to match main site theme */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-size-[40px_40px]" />
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center p-4 border border-zinc-100 relative overflow-hidden">
                        <Image
                            src="/favicon.svg"
                            alt="Rashid Iqbal Logo"
                            width={64}
                            height={64}
                            priority
                        />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                            Rashid Iqbal
                        </h1>
                        <p className="text-zinc-600 font-medium">
                            Next.js & Framer Developer
                        </p>
                        <p className="text-sm text-zinc-500 max-w-[280px] mx-auto pt-2">
                            Building high-converting landing pages and scalable web apps.
                        </p>
                    </div>
                </div>

                {/* Links Section */}
                <div className="space-y-3 w-full">
                    {links.map((link) => {
                        const isExternal = link.url.startsWith("http");
                        const LinkComponent = isExternal ? "a" : Link;

                        return (
                            <LinkComponent
                                key={link.name}
                                href={link.url}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className={`
                  group flex items-center justify-between p-4 w-full
                  rounded-2xl transition-all duration-300
                  ${link.featured
                                        ? "bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10 scale-100 hover:scale-[1.02]"
                                        : "bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-200 shadow-xs hover:shadow-md hover:border-zinc-300 scale-100 hover:scale-[1.02]"}
                `}
                            >
                                <span className="font-semibold text-[15px]">{link.name}</span>
                                <span className={`
                  transition-transform duration-300 
                  ${link.featured ? "text-white" : "text-zinc-400 group-hover:text-zinc-900"}
                  ${isExternal ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"}
                `}>
                                    {link.icon}
                                </span>
                            </LinkComponent>
                        );
                    })}
                </div>

                {/* Footer info */}
                <div className="pt-8 text-center">
                    <p className="text-xs text-zinc-400 font-medium tracking-wide pb-4">
                        © {new Date().getFullYear()} AESTHO.XYZ
                    </p>
                </div>
            </div>
        </main>
    );
}
