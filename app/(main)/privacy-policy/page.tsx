import Logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicy() {
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

          {/* Legal badge */}
          <div className="inline-block mb-6">
            <span className="text-xs tracking-[0.3em] uppercase opacity-40 border border-primary/20 px-4 py-2">
              Privacy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            Privacy <span className="text-primary/90">Policy</span>
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
              Introduction
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              This Privacy Policy explains how{" "}
              <span className="text-primary/80 font-medium">
                Graphics Multimedia
              </span>{" "}
              (“Company”, “we”, “our”, or “us”) collects, uses, and
              protects your personal information when you use our
              website and services. By accessing our website or using
              our services, you agree to the practices described in
              this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Information We Collect
            </h2>

            <p className="text-sm sm:text-base opacity-60 mb-2">
              We may collect personal information when you interact
              with our website or services.
            </p>

            <p className="text-sm sm:text-base font-medium text-foreground/80">
              Information you provide:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company/Organization name</li>
              <li>
                Project details and creative briefs submitted through
                contact forms
              </li>
              <li>Design preferences and brand guidelines</li>
              <li>Newsletter subscription information</li>
            </ul>

            <p className="text-sm sm:text-base font-medium text-foreground/80 mt-4">
              Information collected automatically:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited on our website</li>
              <li>Time and date of visits</li>
              <li>Time spent on specific pages</li>
              <li>Device and operating system information</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              How We Use Your Information
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              We use the collected information for the following
              purposes:
            </p>

            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4">
              <li>To provide and maintain our design services</li>
              <li>
                To respond to inquiries and project consultations
              </li>
              <li>
                To manage client projects and creative communication
              </li>
              <li>
                To send design updates, inspiration, and newsletters
                (if subscribed)
              </li>
              <li>
                To understand client design preferences and improve
                service offerings
              </li>
              <li>
                To improve website functionality and user experience
              </li>
              <li>
                To analyze usage trends and portfolio performance
              </li>
              <li>
                To protect against unauthorized access or misuse
              </li>
            </ul>
          </section>

          {/* Sharing of Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Sharing of Information
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              We do not sell, rent, or trade your personal data.
              However, we may share information with trusted third
              parties when necessary to operate our creative services,
              such as:
            </p>

            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4 mt-2">
              <li>Cloud storage and hosting providers</li>
              <li>Project management and collaboration tools</li>
              <li>Analytics services (e.g., Google Analytics)</li>
              <li>
                Email marketing platforms (for newsletter
                distribution)
              </li>
              <li>Professional advisors when necessary</li>
            </ul>

            <p className="text-sm sm:text-base opacity-60 mt-2">
              We may also disclose information when required by law,
              to enforce our terms, or when necessary to protect our
              legal rights or the safety of our clients and users.
            </p>
          </section>

          {/* Data Security */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Data Security
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              We take reasonable technical and organizational measures
              to protect your personal information from unauthorized
              access, disclosure, alteration, or destruction. However,
              no method of transmission over the internet or
              electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Your Rights
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              Depending on your location, you may have the following
              rights regarding your personal information:
            </p>

            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4">
              <li>Access to the personal data we hold about you</li>
              <li>Correction of inaccurate or incomplete data</li>
              <li>Deletion of your personal data</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent at any time</li>
            </ul>

            <p className="text-sm sm:text-base opacity-60 mt-2">
              To exercise these rights, please contact us using the
              information below.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Cookies and Tracking
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              Our website uses cookies and similar tracking
              technologies to enhance user experience, analyze website
              traffic, and understand how visitors interact with our
              portfolio. You can control cookie preferences through
              your browser settings.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Third-Party Links
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              Our website may contain links to third-party websites,
              such as client projects, social media platforms, or
              design resources. We are not responsible for the privacy
              practices or content of those external websites. We
              encourage you to review their privacy policies before
              providing personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Children's Privacy
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              Our services are not directed toward individuals under
              the age of 13. We do not knowingly collect personal
              information from children. If we become aware that such
              data has been collected, we will take steps to delete it
              promptly.
            </p>
          </section>

          {/* Updates to This Policy */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Updates to This Policy
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              We may update this Privacy Policy from time to time to
              reflect changes in our practices or legal requirements.
              Any changes will be posted on this page along with the
              updated revision date. Continued use of our website or
              services after updates indicates acceptance of the
              revised policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Contact Information
            </h2>

            <p className="text-sm sm:text-base opacity-60">
              If you have questions, concerns, or requests regarding
              this Privacy Policy or our data practices, please
              contact us:
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
