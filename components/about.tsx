"use client";


export function AboutV2() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 desktop:grid-cols-3 gap-12 items-start">
         <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100">
            {/* Placeholder for profile image */}
            <div className="absolute inset-0 flex items-center justify-center text-zinc-300 font-bold text-4xl">
                RI
            </div>
         </div>
         
         <div className="desktop:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900">
                I&apos;m Rashid. I Build Products.
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed">
                I&apos;m a multidisciplinary product builder based in Pakistan. I bridge the gap between design and engineering, helping startups launch products that look beautiful and work perfectly.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed">
                I&apos;ve spent over 5 years working with companies in Fintech, Healthcare, and E-commerce. My goal is simple: build digital solutions that scale.
            </p>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-100">
                {[
                    { label: "Projects", value: "100+" },
                    { label: "Years", value: "5+" },
                    { label: "Clients", value: "50+" }
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
                        <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </section>
  );
}

