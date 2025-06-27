"use client";

import { House, Camera, BookOpen, User, Wrench } from "phosphor-react";
import Link from "next/link";
import { MobileNav } from "./MobileNav";

type HeaderProps = {
  currentPath: string;
};

export const Header = ({ currentPath }: HeaderProps) => {
  const navItems = [
    { id: "/", label: "Home", icon: House },
    { id: "/workbench", label: "Workbench", icon: Wrench },
    { id: "/shoots", label: "Shoots", icon: Camera },
    { id: "/logbook", label: "Logbook", icon: BookOpen },
    { id: "/about", label: "About", icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground max-w-[100vw]">
      <div className="max-w-7xl mx-auto px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Name - Hand-lettered style */}
          <Link
            href="/"
            className="font-display text-4xl font-bold text-accent sketch-underline transform -rotate-3 hover:rotate-0 transition-transform duration-300"
          >
            Vũ Trần
          </Link>

          {/* Desktop Navigation - Journal tabs */}
          <nav className="hidden md:flex items-end space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPath === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.id}
                  className={`sketch-tab px-4 py-3 font-mono text-sm font-medium transition-all duration-300 ${
                    isActive ? "active" : "hover:-translate-y-1"
                  }`}
                  style={{
                    transformOrigin: "bottom center",
                    transform: `rotate(${(index - 2) * 0.5}deg) ${
                      isActive ? "translateY(-2px)" : ""
                    }`,
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={16} />
                    <span className="uppercase tracking-wide text-xs">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <MobileNav currentPath={currentPath} />
        </div>
      </div>

      {/* Decorative sketched line under header */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground to-transparent opacity-30"></div>
    </header>
  );
};
