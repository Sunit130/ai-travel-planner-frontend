"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import {
    MapPin,
    Calendar,
    ArrowRight,
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

interface Itinerary {
  id: number;
  location_image: string;
  location: string;
  headline: string;
  destination_slug: string;
  duration: number;
  created_at: string;
  interests: string;
}

export default function HomePage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [latestItineraries, setLatestItineraries] = useState<Itinerary[]>([]);

    const testimonials = [
        {
            name: "Sarah L.",
            image: "/placeholder.svg",
            text: "This saved me hours of research!",
            rating: 5,
        },
        {
            name: "Mike T.",
            image: "/placeholder.svg",
            text: "The AI suggestions were spot on!",
            rating: 5,
        },
        {
            name: "Emma R.",
            image: "/placeholder.svg",
            text: "Best travel planning tool ever!",
            rating: 5,
        },
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    useEffect(()=>{
      async function fetchItinerariesList(){
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/itineraries/?limit=3`, {
            cache: "no-store",
          });
      
          if (!res.ok) return;
          const data = await res.json();
          setLatestItineraries(data);
        } catch (error) {
          console.error("Error fetching itinerary:", error);
        }
      }
      fetchItinerariesList();
    }, [])

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-white">
                <Image
                    src="/images/home_top.jpg"
                    alt="Travel background"
                    layout="fill"
                    style={{ objectFit: "cover"}}
                    quality={100}
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="relative z-10 text-center space-y-8 px-4">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Your AI Travel Companion
                    </h1>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                        Plan your perfect trip in minutes with our AI-powered
                        itinerary generator
                    </p>
                    <Link href={'/generate-itinerary'} >
                        <Button size="lg" className="mt-2">
                                Generate Your Itinerary
                        </Button>
                    </Link>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-emerald-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: "Enter Destination & Duration",
                                description: "Tell us where you want to go and how long you’re staying—we’ll craft the perfect itinerary for your trip.",
                            },
                            {
                                icon: Calendar,
                                title: "Get a Customized Itinerary",
                                description: "Receive a personalized day-by-day travel plan tailored to your preferences and interests.",
                            },
                            {
                                icon: ArrowRight,
                                title: "Explore & Book Instantly",
                                description: "View your itinerary, discover top experiences, and book activities seamlessly.",
                            },
                        ].map((step, index) => (
                            <div key={index} className="text-center p-5">
                                <div className="bg-white rounded-full p-6 inline-block mb-4">
                                    <step.icon className="w-12 h-12 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-s">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Itineraries  */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">
                        Latest Itineraries 
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {
                            latestItineraries.map((itinerary: Itinerary, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                                >
                                    <Image
                                        src={itinerary.location_image}
                                        alt={itinerary.location}
                                        width={400}
                                        height={400}
                                        className="w-full h-80 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {itinerary.location}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {itinerary.headline}
                                        </p>
                                        <Link href={`itinerary/${itinerary.destination_slug}/${itinerary.duration}-days/${itinerary.id}`}>
                                            <Button variant="outline">
                                                View Itinerary
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-fit ml-auto mt-8 text-emerald-700 text-lg font-bold">
                        <Link href={'/itineraries'}>Show More {">>"}</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-sage-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-2/3 mb-8 md:mb-0">
                            <Image
                                src="/images/why_us.jpg"
                                alt="Why Choose Us"
                                width={800}
                                height={600}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold mb-8 text-emerald-800">
                                Why Choose Us?
                            </h2>
                            <div className="space-y-6">
                                {[
                                    "AI Personalization",
                                    "Local Experiences",
                                    "Instant Planning",
                                    "No Generic Guides",
                                ].map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <div className="bg-emerald-100 rounded-full p-2 mr-4">
                                            <Star className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <p className="text-lg font-semibold">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews & Testimonials */}
            <section className="py-16 bg-peach-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">
                        What Our Users Say
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center relative">
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-8 h-8 text-emerald-600" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight className="w-8 h-8 text-emerald-600" />
                            </button>
                            <p className="text-xl italic mb-4">
                                {testimonials[currentTestimonial].text}
                            </p>
                            <p className="font-semibold">
                                {testimonials[currentTestimonial].name}
                            </p>
                            <div className="flex justify-center mt-2">
                                {[
                                    ...Array(
                                        testimonials[currentTestimonial].rating
                                    ),
                                ].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section className="py-16 bg-emerald-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Plan Your Dream Trip Today 🚀
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of happy travelers who have discovered
                        their perfect itineraries with us.
                    </p>
                    <Link href={'/generate-itinerary'}>
                        <Button
                            variant="secondary"
                        >
                            Start Planning
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About TravelTales</h3>
            <p className="text-gray-400 text-sm">
              TravelTales is your AI-powered travel companion, helping you create unforgettable journeys with
              personalized itineraries and local insights.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/generate-itinerary" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Generate Itinerary
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Latest Itineraries
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
            <div className="flex items-center text-gray-400">
              <Mail className="mr-2" />
              <a href="mailto:patwardhansunit@gmail.com" className="hover:text-emerald-400 transition-colors">
                patwardhansunit@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TravelTales. All rights reserved.</p>
        </div>
      </div>
    </footer>
        </div>
    );
}
