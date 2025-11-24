import React from "react";
import { useApiContext } from "@/context/ApiContext";
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const { profile, loading } = useApiContext();

  if (loading || !profile) {
    return (
      <footer className="py-8 text-center text-muted-foreground text-sm font-mono">
        <div className="text-muted-foreground">Loading...</div>
      </footer>
    );
  }

  const socials = profile.socials || [
    ...(profile.github ? [{ name: "GitHub", icon: Github, url: profile.github }] : []),
    ...(profile.linkedin ? [{ name: "LinkedIn", icon: Linkedin, url: profile.linkedin }] : []),
    ...(profile.twitter ? [{ name: "Twitter", icon: Twitter, url: profile.twitter }] : []),
    ...(profile.email ? [{ name: "Email", icon: Mail, url: `mailto:${profile.email}` }] : []),
  ];

  if (socials.length === 0 && !profile.name) {
    return null;
  }

  return (
    <footer className="py-8 text-center text-muted-foreground text-sm font-mono">
      {socials.length > 0 && (
        <div className="flex justify-center gap-6 mb-4">
          {socials.map((social) => {
            const IconComponent = social.icon || (social.name === "GitHub" ? Github : social.name === "LinkedIn" ? Linkedin : social.name === "Twitter" ? Twitter : Mail);
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label={social.name}
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>
      )}
      {profile.name && (
        <p>
          Designed & Built by {profile.name}
        </p>
      )}
    </footer>
  );
};

export default Footer;
