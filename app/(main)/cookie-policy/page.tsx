import Logo from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function CookiePolicy() {
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
              Cookies
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-4">
            Cookie <span className="text-primary/90">Policy</span>
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
              This Cookie Policy explains how{" "}
              <span className="text-primary/80 font-medium">
                Graphics Multimedia
              </span>{" "}
              (“Company”, “we”, “our”, or “us”) uses cookies and
              similar tracking technologies on our website. By
              continuing to browse or use our site, you consent to the
              use of cookies as described in this policy.
            </p>
          </section>

          {/* What Are Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              What Are Cookies?
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Cookies are small text files that are stored on your
              device (computer, tablet, or mobile) when you visit a
              website. They are widely used to make websites work more
              efficiently, enhance user experience, and provide
              information to website owners.
            </p>
            <p className="text-sm sm:text-base opacity-60 mt-2">
              Cookies help us understand how visitors interact with
              our portfolio, remember your preferences, and improve
              your browsing experience on our creative showcase.
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Types of Cookies We Use
            </h2>

            {/* Essential Cookies */}
            <div className="space-y-2 mt-4">
              <h3 className="text-lg font-light tracking-tight text-foreground/85">
                Essential Cookies
              </h3>
              <p className="text-sm sm:text-base opacity-60">
                These cookies are necessary for the website to
                function properly. They enable basic functions like
                page navigation, access to secure areas, and
                maintaining session states. The website cannot
                function properly without these cookies.
              </p>
              <p className="text-sm sm:text-base opacity-60 text-primary/70 text-xs mt-1">
                Examples: Session cookies, security cookies, load
                balancing cookies
              </p>
            </div>

            {/* Performance Cookies */}
            <div className="space-y-2 mt-6">
              <h3 className="text-lg font-light tracking-tight text-foreground/85">
                Performance Cookies
              </h3>
              <p className="text-sm sm:text-base opacity-60">
                These cookies help us understand how visitors interact
                with our website by collecting anonymous information.
                They tell us which pages are most popular, how users
                navigate through our portfolio, and if they encounter
                any errors.
              </p>
              <p className="text-sm sm:text-base opacity-60 text-primary/70 text-xs mt-1">
                Examples: Google Analytics, page view tracking,
                referral tracking
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="space-y-2 mt-6">
              <h3 className="text-lg font-light tracking-tight text-foreground/85">
                Functional Cookies
              </h3>
              <p className="text-sm sm:text-base opacity-60">
                These cookies enable enhanced functionality and
                personalization, such as remembering your preferences,
                language settings, and region. They may be set by us
                or by third-party providers whose services we've added
                to our pages.
              </p>
              <p className="text-sm sm:text-base opacity-60 text-primary/70 text-xs mt-1">
                Examples: Preference cookies, theme selection,
                recently viewed projects
              </p>
            </div>

            {/* Targeting/Advertising Cookies */}
            <div className="space-y-2 mt-6">
              <h3 className="text-lg font-light tracking-tight text-foreground/85">
                Targeting/Advertising Cookies
              </h3>
              <p className="text-sm sm:text-base opacity-60">
                These cookies are used to deliver relevant
                advertisements and track marketing campaign
                performance. They may be set through our site by
                advertising partners to build a profile of your
                interests and show you relevant ads on other sites.
              </p>
              <p className="text-sm sm:text-base opacity-60 text-primary/70 text-xs mt-1">
                Examples: Social media pixels, retargeting cookies, ad
                network cookies
              </p>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Third-Party Cookies
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              In addition to our own cookies, we may also use various
              third-party cookies to analyze website traffic, showcase
              our work on social media, and measure advertising
              effectiveness:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4 mt-2">
              <li>
                <span className="font-medium text-foreground/80">
                  Google Analytics:
                </span>{" "}
                Tracks and reports website traffic to help us
                understand and improve user experience
              </li>
              <li>
                <span className="font-medium text-foreground/80">
                  Vimeo/YouTube:
                </span>{" "}
                Embedded video players may set cookies when you view
                our motion graphics portfolio
              </li>
              <li>
                <span className="font-medium text-foreground/80">
                  Social Media Platforms:
                </span>{" "}
                Sharing buttons and embedded feeds from Instagram,
                Behance, or Dribbble may set cookies
              </li>
              <li>
                <span className="font-medium text-foreground/80">
                  Font Providers:
                </span>{" "}
                Services like Adobe Fonts or Google Fonts may set
                cookies to deliver typography
              </li>
            </ul>
          </section>

          {/* How Long Do Cookies Last */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              How Long Do Cookies Last?
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              Cookies can remain on your device for different periods
              of time:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4 mt-2">
              <li>
                <span className="font-medium text-foreground/80">
                  Session Cookies:
                </span>{" "}
                Temporary cookies that are deleted when you close your
                browser
              </li>
              <li>
                <span className="font-medium text-foreground/80">
                  Persistent Cookies:
                </span>{" "}
                Remain on your device until they expire or you delete
                them (duration varies by purpose)
              </li>
            </ul>
          </section>

          {/* How to Control Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              How to Control Cookies
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              You have the right to control and manage cookies in
              various ways. Most web browsers allow you to:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4 mt-2">
              <li>View and delete cookies individually</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies from being set</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-sm sm:text-base opacity-60 mt-3">
              To manage cookie preferences, check your browser
              settings:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4">
              <li>
                Chrome: Settings → Privacy and Security → Cookies
              </li>
              <li>Firefox: Options → Privacy & Security → Cookies</li>
              <li>Safari: Preferences → Privacy → Cookies</li>
              <li>Edge: Settings → Site permissions → Cookies</li>
            </ul>
            <p className="text-sm sm:text-base opacity-60 mt-3">
              Please note that blocking or deleting cookies may affect
              your browsing experience and limit access to certain
              features of our website.
            </p>
          </section>

          {/* Cookie Consent Banner */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Cookie Consent
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              When you first visit our website, you will be presented
              with a cookie consent banner that allows you to:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base opacity-60 space-y-1 ml-4 mt-2">
              <li>Accept all cookies</li>
              <li>Decline non-essential cookies</li>
              <li>Customize your cookie preferences</li>
              <li>Learn more about how we use cookies</li>
            </ul>
            <p className="text-sm sm:text-base opacity-60 mt-2">
              You can change your cookie preferences at any time by
              clicking the "Cookie Settings" link in the footer of our
              website.
            </p>
          </section>

          {/* Updates to This Policy */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Updates to This Policy
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              We may update this Cookie Policy from time to time to
              reflect changes in our practices, legal requirements, or
              the technologies we use. Any changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-3">
            <h2 className="text-xl font-light tracking-tight text-foreground/90 mb-3 inline-block border-b border-primary/20 pb-1">
              Contact Information
            </h2>
            <p className="text-sm sm:text-base opacity-60">
              If you have questions about our use of cookies or this
              Cookie Policy, please contact us:
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
