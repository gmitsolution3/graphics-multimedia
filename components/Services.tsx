import { getServices } from "@/services/servicesService";
import { IService } from "@/types";
import Image from "next/image";

export default async function Services() {
  const { data: services } = await getServices();

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Expertise that delivers
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-70">
            Strategic solutions crafted for measurable business
            impact.
          </p>
        </div>

        {/* Validation for empty services */}
        {!services || services.length === 0 ? (
          <div className="text-center py-16 px-4 bg-card rounded-lg">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-light mb-3">No services available</h3>
              <p className="text-sm opacity-60 mb-6">
                We're currently updating our service offerings. Please check back soon.
              </p>
              <div className="w-16 h-0.5 bg-primary/30 mx-auto"></div>
            </div>
          </div>
        ) : (
          /* Clean Grid Layout */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service: IService, index: number) => (
              <div
                key={index}
                className="bg-card p-8 lg:p-10 group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Corner accent on hover */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 -rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
                </div>

                <div className="relative z-10">
                  <div className="mb-7 transform group-hover:scale-110 group-hover:translate-x-1 transition-transform duration-300">
                    <Image
                      height={300}
                      width={300}
                      className="w-12"
                      src={service.image}
                      alt="Service Image"
                    />
                  </div>

                  <h3 className="text-lg font-medium mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {service.name}
                  </h3>

                  <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                    {service.description}
                  </p>

                  {/* Subtle accent line with hover effect */}
                  <div className="w-8 h-0.5 bg-primary opacity-30 mt-6 group-hover:w-12 group-hover:opacity-60 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Optional bottom accent - only show if services exist */}
        {services && services.length > 0 && (
          <div className="text-center mt-12">
            <span className="text-xs tracking-[0.3em] uppercase opacity-40">
              Integrated solutions
            </span>
          </div>
        )}
      </div>
    </section>
  );
}