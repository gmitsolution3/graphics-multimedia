import Logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-card flex flex-col items-center p-4 relative pt-[150px]">
      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-24 h-24 border-l border-t border-primary/5 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-24 h-24 border-r border-t border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-24 h-24 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-24 h-24 border-r border-b border-primary/5 pointer-events-none"></div>

      {/* Main content */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Logo */}
          <Link href="/" className="inline-block mb-12 group">
            <div className="w-32 mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
              <Image
                src={Logo}
                alt="Graphics Multimedia Logo"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </div>
          </Link>

          {/* Decorative line */}
          <div className="w-12 h-0.5 bg-primary mx-auto mb-8"></div>

          {/* Coming Soon badge style for page identifier */}
          <div className="inline-block mb-6">
            <span className="text-xs tracking-[0.3em] uppercase opacity-40 border border-primary/20 px-4 py-2">
              Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            Terms &{" "}
            <span className="text-primary/90">Conditions</span>
          </h1>

          <p className="text-sm sm:text-base opacity-60 max-w-lg mx-auto leading-relaxed">
            Last Updated: March 2026
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-8 text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          {/* Introduction */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              1. Introduction
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              These Terms and Conditions govern your use of the
              website and services provided by{" "}
              <span className="text-primary/80 font-medium">
                Graphics Multimedia
              </span>
              . By accessing our website or using our services, you
              agree to comply with these terms. If you do not agree,
              please do not use our services.
            </p>
          </section>

          {/* Services */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              2. Services
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Graphics Multimedia provides professional design
              services including:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4">
              <li>
                Graphic Design (Logo, Brand Identity, Print Materials)
              </li>
              <li>Motion Graphics & Animation</li>
              <li>Video Editing & Post-Production</li>
              <li>UI/UX Design for Web & Mobile</li>
              <li>3D Modeling & Rendering</li>
              <li>Photo Retouching & Manipulation</li>
              <li>Social Media Creative Design</li>
            </ul>
          </section>

          {/* Project Agreements */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              3. Project Agreements
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Before starting any project, the scope of work,
              deliverables, pricing, and timeline will be agreed upon
              between Graphics Multimedia and the client. Clients are
              responsible for providing required assets, brand
              guidelines, reference materials, and feedback necessary
              for project completion.
            </p>
          </section>

          {/* Payments */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              4. Payments
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Payments must be made according to the agreed quotation
              or invoice. A 50% advance payment is typically required
              before work begins on projects. The remaining balance is
              due upon final delivery. All prices exclude applicable
              taxes unless otherwise stated.
            </p>
          </section>

          {/* Refund Policy */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              5. Refund Policy
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Due to the creative and custom nature of design
              services, refunds are generally not available once work
              has commenced. If a project is canceled after work has
              started, the advance payment is non-refundable and
              payment for completed work may still be required.
            </p>
          </section>

          {/* Revisions */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              6. Revisions
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Clients are entitled to a specified number of revision
              rounds based on the project package or agreement.
              Additional revisions beyond the agreed scope may incur
              extra charges. Major changes to project scope after work
              has begun may require a revised quotation.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              7. Intellectual Property
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Upon full payment, clients receive full rights to use
              the final deliverables for their intended purpose.
              Graphics Multimedia retains the right to display
              completed work in portfolios, case studies, social
              media, and promotional materials unless a non-disclosure
              agreement is in place.
            </p>
          </section>

          {/* Newsletter Subscription */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              8. Newsletter Subscription
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              If you subscribe to our newsletter, you agree to receive
              updates, design insights, inspiration, and promotional
              communications from Graphics Multimedia. You may
              unsubscribe at any time through the link provided in the
              email.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              9. Limitation of Liability
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Graphics Multimedia is not responsible for indirect or
              consequential damages such as loss of data, business
              interruption, or loss of profits resulting from the use
              of our services or website. Our total liability shall
              not exceed the amount paid for the specific service in
              question.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              10. Changes to Terms
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              We may update these Terms and Conditions from time to
              time. Updated versions will be published on this page
              with a revised "Last Updated" date. Continued use of our
              services indicates acceptance of the updated terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              11. Contact Information
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              If you have questions regarding these Terms and
              Conditions, please contact us:
            </p>

            <div className="mt-4 space-y-2 text-sm sm:text-base opacity-60 border border-primary/10 p-6">
              <p>
                <span className="text-primary/80 font-medium">
                  Graphics Multimedia
                </span>
              </p>
              <p>Email: graphicsmultimedia.net</p>
              <p>Phone: +880 1898-796506</p>
              <p>Phone: +880 1898-796507</p>
              <p>
                Address: 2nd Floor, House-1, Road-1, Section-7,
                Mirpur-11, Dhaka-1216
              </p>
            </div>
          </section>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-30">
            Graphics Multimedia — Creative Design Studio
          </span>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-10 bottom-20 w-40 h-40 border border-primary/5 rounded-full pointer-events-none"></div>
      <div className="absolute right-10 top-20 w-60 h-60 border border-primary/5 rounded-full pointer-events-none"></div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}
