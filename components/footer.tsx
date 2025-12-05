"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GridContainer, GridItem } from "./grid-system";

const services = [
  { label: "Landing Pages", href: "#services" },
  { label: "Marketing Sites", href: "#services" },
  { label: "Web Applications", href: "#services" },
];

const socialLinks = [
  { label: "Twitter / X", href: "https://x.com/rashidrealme", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/callmerashidiqbal/", external: true },
  { label: "GitHub", href: "https://github.com/thatgroot", external: true },
  { label: "Email", href: "mailto:rashidiqbal.freelance@gmail.com", external: false },
];

export function FooterV2() {
  return (
    <motion.footer 
      className="bg-white border-t border-zinc-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer cols={3}> 
            <GridItem className="col-span-1 md:col-span-1">
                <motion.div 
                  className="flex flex-col h-full justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                    <div>
                        <motion.div 
                          className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center font-bold mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          R
                        </motion.div>
                              <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-12">
                        © {new Date().getFullYear()} Rashid Iqbal. <br />
                        All systems operational.
                    </p>
                </motion.div>
            </GridItem>
            
            <GridItem label="Services">
                <ul className="space-y-4 text-sm text-zinc-500 mt-4">
                    {services.map((service, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <motion.span whileHover={{ x: 5 }} className="inline-block">
                          <Link href={service.href} className="hover:text-orange-500 transition-colors">
                            {service.label}
                          </Link>
                        </motion.span>
                      </motion.li>
                    ))}
                </ul>
            </GridItem>

            <GridItem label="Connect">
                <ul className="space-y-4 text-sm text-zinc-500 mt-4">
                    {socialLinks.map((link, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <motion.span whileHover={{ x: 5 }} className="inline-block">
                          <Link 
                            href={link.href} 
                            className="hover:text-orange-500 transition-colors"
                            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {link.label}
                          </Link>
                        </motion.span>
                      </motion.li>
                    ))}
                </ul>
            </GridItem>
        </GridContainer>
      </div>
    </motion.footer>
  );
}
