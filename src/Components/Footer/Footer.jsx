import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Mail, Pin } from "lucide-react";

export default function Footer() {
  const mainNavLinks = [
    { href: "/about", label: "About us" },
    { href: "/features", label: "Features" },
    { href: "/blogs", label: "Blogs" },
    { href: "/food", label: "Food" },
    { href: "/recipes", label: "Recipes" },
    { href: "/reviews", label: "Reviews" },
    { href: "/signin", label: "Sign in" },
  ];

  const secondaryNavLinks = [
    { href: "/terms", label: "Terms & conditions" },
    { href: "/privacy", label: "Privacy policy" },
    { href: "/contact", label: "Contact" },
    { href: "/cookies", label: "Cookie policy" },
    { href: "/support", label: "Support" },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://www.twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://www.pinterest.com", icon: Pin, label: "Pinterest" },
    { href: "https://www.youtube.com", icon: Youtube, label: "Youtube" },
    { href: "https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox", icon: Mail, label: "Email" }, // Replace "example@example.com" with your actual email address
  ];
  

  return (
    <footer className="bg-green-50 shadow-md py-8 px-4" style={{marginTop:'-5px' ,height:'373px'}}>
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[#2d7a5d] text-2xl font-medium">NutriScan</span>
            
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mb-4">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Secondary Navigation */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {secondaryNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="bg-blue hover:text-blue-900 transition-colors no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="border-t border-[#8b4513] my-8 opacity-20" />

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="bg-[#8b4513] text-white p-3 rounded-full hover:bg-[#8b4513] transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center bg-black-900 ">
          <p>© 2023 Cornea clinic PVT. LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
