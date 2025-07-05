"use client";

import { useState } from "react";
import Link from "next/link";
import { House, Camera, BookOpen, User, Wrench, List, X } from "phosphor-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../primitives/breadcrumb";

export const MobileNav = ({ currentPath }: { currentPath: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "/", label: "Home", icon: House },
    { id: "/workbench", label: "Workbench", icon: Wrench },
    { id: "/shoots", label: "Shoots", icon: Camera },
    { id: "/logbook", label: "Logbook", icon: BookOpen },
    { id: "/about", label: "About", icon: User },
  ];

  const getCurrentPageName = () => {
    const currentItem = navItems.find((item) => item.id === currentPath);
    return currentItem ? currentItem.label : "Page";
  };

  return (
    <div className="md:hidden">
      {/* Breadcrumb + Menu Button */}
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {currentPath !== "/" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{getCurrentPageName()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-foreground hover:text-primary transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <List size={24} />}
        </button>
      </div>

      {/* Popup Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50">
          <nav className="py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.id}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-6 py-3 transition-all duration-200 ${
                    currentPath === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
