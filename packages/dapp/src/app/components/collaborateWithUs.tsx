import React from 'react'
import { Button } from './button/Button'
import Link from 'next/link'

function CollaborateWithUs() {
  return (
    <section className="bg-neutral-900 w-full py-20 md:py-28">
      <div className="md:px-[15%] px-[5%] max-w-4xl mx-auto">
        <div className="space-y-10 text-center">
          {/* Heading and Decorative Line */}
          <div className="space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Collaborate With Us
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Learn more and contribute to shaping this narrative. Every voice matters, 
              every insight adds to our shared heritage in building a future where 
              cultural artifacts find their way home.
            </p>
          </div>

          {/* Button - maintaining original functionality */}
          <div className="pt-4">
            <Link
              href="https://forms.gle/rXvQy25pqEagxHoq9"
              className="inline-block"
            >
              <Button 
                variant="white" 
                className="transform transition-all duration-300 
                         hover:-translate-y-1 hover:shadow-lg"
              >
                Register today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollaborateWithUs