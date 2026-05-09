import Link from "next/link";
import { GridContainer, GridItem } from "@/components/shared/grid-system";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, FileQuestion } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#ffffff] flex flex-col"> 
          <GridContainer cols={1} enableSnake>
            <GridItem padding={false} className="bg-[#fafafa]/50 min-h-[70vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
              
              {/* Grid Background Pattern */}
              <div className="absolute inset-0" 
                   aria-hidden="true"
                   style={{ 
                     backgroundImage: `
                       linear-gradient(to right, #f4f4f5 1px, transparent 1px),
                       linear-gradient(to bottom, #f4f4f5 1px, transparent 1px)
                     `,
                     backgroundSize: '4rem 4rem',
                     maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                   }}>
              </div>

              {/* Animated Dots */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                 <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#e5e5e5] rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                 <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#e5e5e5] rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                 <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#e5e5e5] rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
              </div>

              <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 sm:py-24">
                {/* 404 Visual Representation */}
                <div className="flex justify-center mb-12 relative" aria-hidden="true">
                   <div className="relative w-64 h-32">
                      {/* File Icon floating */}
                      <div className="absolute left-0 top-0 transform -rotate-12 bg-white border border-[#e5e5e5] p-4 shadow-sm rounded-lg z-10">
                        <div className="w-16 h-2 bg-[#fafafa] rounded mb-2" />
                        <div className="w-12 h-2 bg-[#fafafa] rounded mb-2" />
                        <div className="w-20 h-2 bg-[#fafafa] rounded" />
                      </div>
                      
                      {/* Question Icon */}
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg border border-[#e5e5e5] z-20">
                        <FileQuestion className="w-12 h-12 text-[#0a0a0a]" />
                      </div>

                      {/* Magnifying Glass */}
                      <div className="absolute right-0 bottom-0 transform rotate-12 bg-[#0a0a0a] p-3 rounded-lg shadow-lg z-10">
                        <Search className="w-6 h-6 text-white" />
                      </div>
                   </div>
                </div>

                <h1 className="text-8xl font-bold text-[#0a0a0a] tracking-tighter mb-4">
                  4<span className="text-[#0a0a0a]">0</span>4
                </h1>
                
                <div className="h-px w-24 bg-linear-to-r from-transparent via-zinc-300 to-transparent mx-auto mb-8" aria-hidden="true" />

                <h2 className="text-2xl font-medium text-[#0a0a0a] mb-4">
                  Page Not Found
                </h2>
                
                <p className="text-[#737373] text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  The coordinates you're looking for don't exist on this grid. Let's get you back to mapped territory.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild variant="default" className="bg-[#0a0a0a] hover:bg-[#0a0a0a] text-white w-full sm:w-auto">
                    <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                  <Button asChild variant="grid" className="w-full sm:w-auto">
                    <Link href="/#work">
                      View Work
                    </Link>
                  </Button>
                </div>
              </div>
            </GridItem>
          </GridContainer>
    </main>
  );
}
