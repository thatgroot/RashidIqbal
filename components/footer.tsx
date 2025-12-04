"use client";

import Link from "next/link";
import { GridContainer, GridItem } from "./grid-system";

export function FooterV2() {
  return (
    <footer className="bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto border-l border-zinc-100">
        <GridContainer cols={3}  > 
            <GridItem className="col-span-1 md:col-span-1">
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center font-bold mb-6">R</div>
                              <span className="font-bold text-zinc-900 tracking-tight">Rashid Iqbal</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-12">
                        © {new Date().getFullYear()} Rashid Iqbal. <br />
                        All systems operational.
                    </p>
                </div>
            </GridItem>
            
            <GridItem label="Services">
                <ul className="space-y-4 text-sm text-zinc-500 mt-4">
                    <li><Link href="#services" className="hover:text-orange-500 transition-colors">Landing Pages</Link></li>
                    <li><Link href="#services" className="hover:text-orange-500 transition-colors">Marketing Sites</Link></li>
                    <li><Link href="#services" className="hover:text-orange-500 transition-colors">Web Applications</Link></li>
                </ul>
            </GridItem>

            <GridItem label="Connect">
                <ul className="space-y-4 text-sm text-zinc-500 mt-4">
                    <li><Link href="#" className="hover:text-orange-500 transition-colors">Twitter / X</Link></li>
                    <li><Link href="#" className="hover:text-orange-500 transition-colors">LinkedIn</Link></li>
                    <li><Link href="#" className="hover:text-orange-500 transition-colors">GitHub</Link></li>
                    <li><Link href="#" className="hover:text-orange-500 transition-colors">Email</Link></li>
                </ul>
            </GridItem>
        </GridContainer>
      </div>
    </footer>
  );
}
