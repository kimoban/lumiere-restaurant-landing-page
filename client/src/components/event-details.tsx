import { useQuery } from "@tanstack/react-query";
import { Car, Clock3, Mail, MapPin, Navigation, Phone, Shirt } from "lucide-react";
import type { EventDetails as EventDetailsType } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventDetails() {
  const { data: eventDetails, isLoading, error } = useQuery<EventDetailsType>({
    queryKey: ["/api/event-details"],
  });

  if (isLoading) {
    return (
      <section
        id="details"
        className="py-24 md:py-32 px-6 bg-card"
        data-testid="section-details"
      >
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-72 mx-auto mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <Skeleton className="h-[420px] lg:h-[560px] rounded-[2rem]" />
            <div className="space-y-6">
              <Card className="p-8 md:p-10 border-card-border">
                <Skeleton className="h-8 w-40 mb-6" />
                <Skeleton className="h-36 w-full" />
              </Card>
              <Card className="p-8 md:p-10 border-card-border">
                <Skeleton className="h-8 w-52 mb-6" />
                <Skeleton className="h-28 w-full" />
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !eventDetails) {
    return (
      <section
        id="details"
        className="py-24 md:py-32 px-6 bg-card"
        data-testid="section-details"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Unable to load event details.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="details"
      className="py-24 md:py-32 px-6 bg-card"
      data-testid="section-details"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="font-display text-4xl md:text-5xl font-light text-center mb-16 tracking-wide"
          data-testid="text-details-title"
        >
          Opening Hours and Arrival
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="overflow-hidden rounded-[2rem] border border-card-border bg-background shadow-sm">
            <div className="border-b border-border px-6 py-5 md:px-8">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Destination</p>
              <h3 className="mt-3 font-display text-3xl font-light tracking-wide" data-testid="text-location-heading">
                {eventDetails.location.name}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground" data-testid="text-location-intro">
                {eventDetails.tagline} in a dining room set just off Cape Coast&apos;s historic corridor.
              </p>
            </div>

            <div className="h-[360px] md:h-[420px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Cape+Coast,+Ghana&z=13&output=embed"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cape Coast Location"
                data-testid="map-location"
              />
            </div>

            <div className="grid gap-4 border-t border-border px-6 py-6 md:grid-cols-2 md:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Parking</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80" data-testid="text-parking-value">
                  {eventDetails.parkingInfo}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Dress code</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80" data-testid="text-dress-code-value">
                  {eventDetails.dressCode}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <Card className="border-card-border p-8 md:p-10" data-testid="card-details-overview">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-xl mb-2" data-testid="text-location-label">
                      Location
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid="text-location-address">
                      {eventDetails.location.address}
                      <br />
                      {eventDetails.location.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock3 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="w-full">
                    <h3 className="font-display text-xl mb-4" data-testid="text-hours-label">
                      Opening hours
                    </h3>
                    <div className="space-y-3">
                      {eventDetails.openingHours.map((entry, index) => (
                        <div
                          key={entry.days}
                          className="flex items-start justify-between gap-4 border-b border-border/70 pb-3 last:border-b-0 last:pb-0"
                          data-testid={`row-opening-hours-${index + 1}`}
                        >
                          <span className="text-sm uppercase tracking-[0.18em] text-foreground/70">{entry.days}</span>
                          <span className="max-w-[16rem] text-right text-sm leading-relaxed text-muted-foreground">{entry.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-3">
                    <h3 className="font-display text-xl" data-testid="text-contact-label">
                      Contact
                    </h3>
                    <div className="space-y-2">
                      <a
                        href={`tel:${eventDetails.contactPhone.replace(/[^0-9+]/g, "")}`}
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="link-phone"
                      >
                        {eventDetails.contactPhone}
                      </a>
                      <a
                        href={`mailto:${eventDetails.contactEmail}`}
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="link-email"
                      >
                        {eventDetails.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-card-border p-8 md:p-10" data-testid="card-arrival-notes">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Navigation className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-xl mb-4" data-testid="text-directions-label">
                      Landmark-based directions
                    </h3>
                    <div className="space-y-3">
                      {eventDetails.landmarkDirections.map((direction, index) => (
                        <p
                          key={index}
                          className="text-muted-foreground leading-relaxed"
                          data-testid={`text-direction-${index + 1}`}
                        >
                          {direction}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <Car className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Arrival</p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80" data-testid="text-arrival-note">
                          {eventDetails.parkingInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-start gap-3">
                      <Shirt className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Dress code</p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/80" data-testid="text-dress-code-note">
                          {eventDetails.dressCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background p-5">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Reservation guidance</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80" data-testid="text-seating-value">
                        {eventDetails.seatingInfo} {eventDetails.dates}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
