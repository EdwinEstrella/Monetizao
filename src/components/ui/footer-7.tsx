import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Recursos",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Categorías", href: "/recursos" },
      { name: "Guías IA", href: "/guias" },
      { name: "Herramientas", href: "/herramientas" },
      { name: "Casos de Éxito", href: "/casos-exito" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre Nosotros", href: "/sobre-nosotros" },
      { name: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacidad", href: "/privacidad" },
      { name: "Términos y Condiciones", href: "/terminos" },
      { name: "Cookies", href: "/cookies" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <FaYoutube className="size-5" />, href: "https://youtube.com", label: "YouTube" },
  { icon: <FaLinkedin className="size-5" />, href: "https://linkedin.com", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Términos y Condiciones", href: "/terminos" },
  { name: "Política de Privacidad", href: "/privacidad" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "",
    alt: "Monetizao Logo",
    title: "Monetizao",
  },
  sections = defaultSections,
  description = "Tu blog de referencia para monetizar con Inteligencia Artificial. Descubre estrategias, herramientas y casos de éxito.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Monetizao. Todos los derechos reservados.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60" />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            {/* Comentados los iconos de redes sociales */}
            {/* <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};