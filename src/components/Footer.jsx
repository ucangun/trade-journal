const Footer = () => {
  // Footer navigation links
  const footerLinks = [
    {
      name: "About",
      href: "https://www.ucangun.com/about",
      isExternal: true,
    },
    {
      name: "Features",
      href: "https://www.ucangun.com/portfolio",
      isExternal: true,
    },
    { name: "Blog", href: "https://medium.com/@ucangun76", isExternal: true },
    {
      name: "Contact",
      href: "https://www.ucangun.com/contact",
      isExternal: true,
    },
  ];

  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          {footerLinks.map((link, index) => (
            <div key={index} className="px-5 py-2">
              <a
                href={link.href}
                className="text-base text-gray-500 hover:text-[#161616]"
                {...(link.isExternal
                  ? {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
              >
                {link.name}
                {link.isExternal && " ↗"}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-base text-center text-gray-400">
          &copy; {new Date().getFullYear()} TradeJournal, Inc. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
