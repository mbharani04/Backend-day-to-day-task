import React from 'react';
import PillNav from './PillNav';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#technical-skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  return (
    <PillNav
      items={navItems}
      logoText="BM"
      logoFullText="BHARANI M"
      logoHref="#home"
    />
  );
}
