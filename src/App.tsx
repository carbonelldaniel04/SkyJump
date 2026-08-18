import React, { useState } from 'react';
import {
  INITIAL_BOOKINGS,
  INITIAL_SLOTS,
  INITIAL_GALLERY,
  INITIAL_EVENTS,
  INITIAL_REVIEWS,
  PLANS,
} from './data/mockData';
import { Booking, TimeSlot, GalleryItem, JumpEvent, Review, Plan } from './types';

import { SkyBackground } from './components/SkyBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ExperienceSteps } from './components/ExperienceSteps';
import { PlansSection } from './components/PlansSection';
import { BookingModule } from './components/BookingModule';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // App Master Data States
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [slots, setSlots] = useState<TimeSlot[]>(INITIAL_SLOTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [events, setEvents] = useState<JumpEvent[]>(INITIAL_EVENTS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // UI Modal States
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState<Plan | null>(null);

  const handleOpenBooking = (plan?: Plan) => {
    if (plan) {
      setSelectedPlanForBooking(plan);
    }
    const elem = document.getElementById('reservas');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update time slot booked count
    setSlots((prevSlots) =>
      prevSlots.map((s) => {
        if (s.date === newBooking.date && s.time === newBooking.timeSlot) {
          return { ...s, bookedCount: s.bookedCount + newBooking.passengerCount };
        }
        return s;
      })
    );
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['bookingStatus']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b))
    );
  };

  const handleAddSlot = (newSlot: TimeSlot) => {
    setSlots((prev) => [...prev, newSlot]);
  };

  const handleAddGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [item, ...prev]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAddEvent = (evt: JumpEvent) => {
    setEvents((prev) => [evt, ...prev]);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleToggleReviewApproved = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r))
    );
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="relative min-h-screen text-[#1B1B1B] selection:bg-[#1E88E5] selection:text-white overflow-x-hidden font-body">
      {/* Animated Parachutist Descending Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Dynamic Animated Sky Background */}
      <SkyBackground />

      {/* Header Bar */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenBooking={() => handleOpenBooking()} />

        <ExperienceSteps />

        <PlansSection onSelectPlan={(plan) => handleOpenBooking(plan)} />

        <BookingModule
          selectedPlanInitial={selectedPlanForBooking}
          onBookingSuccess={handleBookingSuccess}
        />

        <GallerySection items={gallery} />

        <EventsSection events={events} onOpenBooking={() => handleOpenBooking()} />

        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

        <FaqSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton />

      {/* Cookie Banner */}
      <CookieBanner />

      {/* Administration Management Portal */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        slots={slots}
        onAddSlot={handleAddSlot}
        gallery={gallery}
        onAddGalleryItem={handleAddGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
        events={events}
        onAddEvent={handleAddEvent}
        onDeleteEvent={handleDeleteEvent}
        reviews={reviews}
        onToggleReviewApproved={handleToggleReviewApproved}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
}
