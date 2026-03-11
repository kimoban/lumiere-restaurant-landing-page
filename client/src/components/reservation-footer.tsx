import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ReservationFooter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "We'll keep you updated on seasonal menus, dining events, and special evenings.",
    });
    setEmail("");
  };

  return (
    <footer
      id="contact"
      className="relative py-24 md:py-32 px-6 bg-primary text-primary-foreground overflow-hidden"
      data-testid="section-footer"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/80 via-primary to-primary" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2
          className="font-display text-4xl md:text-6xl font-light mb-6 tracking-wide"
          data-testid="text-footer-title"
        >
          Reserve Your Experience
        </h2>
        <p
          className="text-xl md:text-2xl mb-8 text-primary-foreground/90 font-light"
          data-testid="text-footer-subtitle"
        >
          Reserve your table for a Cape Coast evening shaped by seafood, spice, and warm hospitality
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-base font-medium"
            data-testid="button-call-reserve"
            onClick={() => window.location.href = "tel:+233205551234"}
          >
            Call to Reserve
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-8 py-6 text-base font-medium"
            data-testid="button-email-reserve"
            onClick={() => window.location.href = "mailto:reservations@lumierecapecoast.com"}
          >
            Email Reservations
          </Button>
        </div>

        <div className="border-t border-primary-foreground/20 pt-12">
          <h3
            className="font-display text-2xl mb-6"
            data-testid="text-newsletter-title"
          >
            Stay Updated
          </h3>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12"
            data-testid="form-newsletter"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              variant="secondary"
              className="whitespace-nowrap"
              data-testid="button-newsletter-submit"
            >
              Subscribe
            </Button>
          </form>

          <div className="flex justify-center gap-6 mb-12" data-testid="social-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              data-testid="link-social-instagram"
              aria-label="Instagram"
            >
              <Instagram size={24} data-testid="icon-instagram" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              data-testid="link-social-facebook"
              aria-label="Facebook"
            >
              <Facebook size={24} data-testid="icon-facebook" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              data-testid="link-social-twitter"
              aria-label="Twitter"
            >
              <Twitter size={24} data-testid="icon-twitter" />
            </a>
          </div>

          <p className="text-sm text-primary-foreground/60" data-testid="text-copyright">
            © {currentYear} Lumière. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
