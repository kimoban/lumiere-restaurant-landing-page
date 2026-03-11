import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock3, UsersRound } from "lucide-react";
import type { EventDetails, Reservation, ReservationRequest } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const partySizeOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 guests", "8 guests"];

function addOneDay(date: Date) {
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  return next;
}

function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ReservationWidget() {
  const [date, setDate] = useState<Date | undefined>(() => addOneDay(new Date()));
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const { toast } = useToast();

  const { data: eventDetails, isLoading, error } = useQuery<EventDetails>({
    queryKey: ["/api/event-details"],
  });

  const reservationMutation = useMutation({
    mutationFn: async (payload: ReservationRequest) => {
      const response = await apiRequest("POST", "/api/reservations", payload);
      return (await response.json()) as Reservation;
    },
    onSuccess: (reservation) => {
      toast({
        title: "Reservation request received",
        description: `Reference ${reservation.id}. Lumiere will follow up at ${reservation.guestEmail}.`,
      });
      setGuestName("");
      setGuestEmail("");
      setTime("");
      setPartySize("");
      setDate(addOneDay(new Date()));
    },
    onError: (mutationError) => {
      toast({
        title: "Unable to submit reservation",
        description: mutationError instanceof Error ? mutationError.message : "Please try again.",
      });
    },
  });

  const handleReservationRequest = () => {
    if (!date || !time || !partySize || !guestName || !guestEmail || !eventDetails) {
      toast({
        title: "Complete your reservation details",
        description: "Add your name, email, date, time, and party size to continue.",
      });
      return;
    }

    reservationMutation.mutate({
      guestName,
      guestEmail,
      date: formatLongDate(date),
      time,
      partySize,
    });
  };

  if (isLoading) {
    return (
      <section id="reserve" className="relative z-20 -mt-16 px-6 pb-8" data-testid="section-reservation-widget">
        <div className="max-w-6xl mx-auto">
          <Card className="border-card-border p-6 md:p-8 shadow-xl">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
              <div className="space-y-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-12 w-80" />
                <div className="grid gap-4 md:grid-cols-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <Skeleton className="h-40 w-full" />
            </div>
          </Card>
        </div>
      </section>
    );
  }

  if (error || !eventDetails) {
    return null;
  }

  return (
    <section id="reserve" className="relative z-20 -mt-16 px-6 pb-8" data-testid="section-reservation-widget">
      <div className="max-w-6xl mx-auto">
        <Card className="overflow-hidden border-card-border bg-background/95 shadow-2xl backdrop-blur-md">
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 md:p-8 lg:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground" data-testid="text-reservation-kicker">
                Reserve now
              </p>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-light tracking-wide" data-testid="text-reservation-title">
                Choose your evening in one step
              </h2>
              <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground" data-testid="text-reservation-subtitle">
                Select your preferred date, seating time, and party size before confirming by email with the Lumiere team.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="space-y-2 md:col-span-3 lg:col-span-1">
                  <p className="text-sm font-medium text-foreground/80">Name</p>
                  <Input
                    value={guestName}
                    onChange={(event) => setGuestName(event.target.value)}
                    placeholder="Your full name"
                    className="h-11"
                    data-testid="input-reservation-name"
                  />
                </div>

                <div className="space-y-2 md:col-span-3 lg:col-span-2">
                  <p className="text-sm font-medium text-foreground/80">Email</p>
                  <Input
                    type="email"
                    value={guestEmail}
                    onChange={(event) => setGuestEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-11"
                    data-testid="input-reservation-email"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/80">Date</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-11 w-full justify-start px-4 text-left font-normal" data-testid="button-reservation-date">
                        <CalendarDays className="mr-3 h-4 w-4 text-muted-foreground" />
                        {date ? formatShortDate(date) : "Choose a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/80">Time</p>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="h-11" data-testid="select-reservation-time">
                      <div className="flex items-center gap-3">
                        <Clock3 className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Choose a seating" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {eventDetails.reservationSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground/80">Party size</p>
                  <Select value={partySize} onValueChange={setPartySize}>
                    <SelectTrigger className="h-11" data-testid="select-party-size">
                      <div className="flex items-center gap-3">
                        <UsersRound className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Guests" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {partySizeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-card p-4 md:p-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Reservation notes</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80" data-testid="text-reservation-notes">
                    {eventDetails.seatingInfo} Requests are sent directly into Lumiere's booking queue for confirmation.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="px-6"
                  onClick={handleReservationRequest}
                  disabled={reservationMutation.isPending}
                  data-testid="button-submit-reservation"
                >
                  {reservationMutation.isPending ? "Submitting..." : "Request reservation"}
                </Button>
              </div>
            </div>

            <div className="border-t border-border bg-card p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">At a glance</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Service</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/85">{eventDetails.times}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Dress code</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/85">{eventDetails.dressCode}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Address</p>
                  <p className="mt-2 text-base leading-relaxed text-foreground/85">
                    {eventDetails.location.name}
                    <br />
                    {eventDetails.location.address}
                    <br />
                    {eventDetails.location.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}