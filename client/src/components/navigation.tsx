import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-display text-2xl font-light tracking-wide text-foreground hover-elevate active-elevate-2 px-4 py-2 rounded-md"
            data-testid="button-logo"
          >
            Lumière
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("reserve")}
              className="text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-reserve"
            >
              Reserve
            </button>
            <button
              onClick={() => scrollToSection("story")}
              className="text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-story"
            >
              Story
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-menu"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection("details")}
              className="text-sm font-body font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-arrival"
            >
              Arrival
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="default"
              size="default"
              data-testid="button-reserve-nav"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
