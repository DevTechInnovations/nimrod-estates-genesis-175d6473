import { Users, Globe2, Award, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import heroImage from "@/assets/3d-electric-car-building.jpg";
import davidImage from "@/assets/david-nimrod.jpg";
import team1 from "@/assets/Nomfundo-Msiza.png";
import team2 from "@/assets/Nontokozo-Gumede.png";
import team3 from "@/assets/Nomzamo-Gumede.png";
import team4 from "@/assets/Zilingene-Mkhwanazi.png";

const visionImage = "@/assets/3d-house-model-with-modern-architecture-about.jpg";



const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-secondary p-6 rounded-lg border-2 border-gray-100 shadow-lg hover-lift transition-all">
    <Icon className="text-primary mb-4" size={40} />
    <div className="text-3xl font-bold text-primary">{value}</div>
    <p className="text-primary font-bold">{label}</p>
  </div>
);

// make description optional with a default empty string to avoid TS errors when some members don't provide it
const TeamCard = ({ name, title, image, description = "" }) => (
  <div className="group bg-white border-2 border-gray-100 shadow-lg overflow-hidden relative hover-lift">
    <div className="relative h-96 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
      />

      {/* Bottom Gradient Name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-lg font-heading font-semibold text-white">
          {name}
        </h3>
        <p className="text-primary text-sm font-medium">{title}</p>
      </div>
    </div>

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
      <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white/80 text-sm leading-relaxed pt-4 border-t border-primary/30">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const About = () => {
  const team = [
    {
      name: "Nimrod Gumede",
      title: "Founder & CEO",
      image: davidImage,
      description:
        "Nimrod Gumede is the Founder and Chief Executive Officer of Nimrod Estates. He holds an MBA Credential of Readiness, Financial Accounting, and Electrical Engineering qualifications from Harvard University, Harvard Business School, and Berea Technical College. With international experience leading multi-sector firms, he brings expertise across luxury real estate, finance, and engineering.",
    },
      {
      name: "Zilingene Mkhwanazi",
      title: "International Acquisition Agent",
      image: team4,
    },
      {
      name: "Nontokozo Gumede",
      title: "International Acquisition Agent",
      image: team2,
    },
      {
      name: "Nomfundo Msiza",
      title: "International Financial Strategist",
      image: team1,
    },
      {
      name: "Nomzamo Gumede ",
      title: "International Financial Strategist",
      image: team3,
    }
  ];

  return (
    <div className="min-h-screen">
      {/* SEO */}
      <Helmet>
        <title>
          About Nimrod Estates | Luxury Real Estate & Global Property Investment
        </title>
        <meta
          name="description"
          content="Nimrod Estates — a global luxury real estate firm specialising in exclusive property investment opportunities across South Africa, Dubai, and Monaco."
        />
        <meta
          name="keywords"
          content="Luxury property investment, South Africa real estate, Dubai property, Monaco estate, Nimrod Estates"
        />
        <meta name="author" content="Nimrod Property Estates" />
        <link rel="canonical" href="https://nimrodestates.com/about" />

        {/* OG */}
        <meta
          property="og:title"
          content="About Nimrod Estates | Global Luxury Real Estate Experts"
        />
        <meta
          property="og:description"
          content="Discover leading luxury real estate and international property investment opportunities with Nimrod Estates."
        />
        <meta property="og:image" content="https://nimrodestates.com/assets" />
        <meta property="og:url" content="https://nimrodestates.com/about" />
        <meta property="og:type" content="website" />

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Nimrod Property Estates",
            url: "https://nimrodestates.com",
            logo: "https://nimrodestates.com/NM.png",
            founder: {
              "@type": "Person",
              name: "Nimrod Gumede",
            },
            description:
              "Nimrod Estates is a global leader in luxury property investment across South Africa, Dubai, Monaco, and international markets.",
            sameAs: [
              "https://www.linkedin.com/company/nimrodestates",
              "https://www.instagram.com/nimrodestates",
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* -------- HERO -------- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient-gold">Nimrod Estates</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Nimrod Estates specialises in serving ultra-high-net-worth individuals,
            global investors, and distinguished family offices.
          </p>
        </div>
      </section>

      {/* -------- MISSION -------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-4xl font-bold mb-6">
              Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-lg text-muted-foreground text-left">
              Our mission is to connect clients with world-class estate opportunities
              through unmatched service in property sales, management, development,
              and international investment.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard icon={Users} value="2,500+" label="Satisfied Clients" />
            <StatCard icon={Globe2} value="50+" label="Countries" />
            <StatCard icon={Award} value="15+" label="Industry Awards" />
            <StatCard icon={TrendingUp} value="12%" label="Avg. ROI" />
          </div>
        </div>
      </section>

      {/* -------- VISION -------- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <img
            src={visionImage}
            alt="Luxury Real Estate"
            className="md:w-1/2 w-full h-auto shadow-lg object-cover"
          />

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="font-heading text-5xl font-extrabold mb-6">
              Our <span className="text-primary">Vision</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-left">
              We aim to set the global benchmark for luxury living, creating a future
              where premium property investment symbolises enduring value and prestige.
            </p>
          </div>
        </div>
      </section>

      {/* -------- TEAM -------- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Leadership <span className="text-primary">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Meet the professionals guiding Nimrod Estates to global excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <TeamCard key={i} {...member} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
