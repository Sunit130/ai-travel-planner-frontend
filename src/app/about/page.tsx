"use client";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="relative min-h-screen bg-white">
            <SiteHeader />
            <section className="container mx-auto px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">
                            About Us
                        </h1>
                        <p className="text-gray-700 text-lg mb-4">
                            Welcome to{" "}
                            <span className="font-semibold">TravelTales</span>,
                            your AI-powered travel companion. We specialize in
                            creating personalized itineraries tailored to your
                            interests and schedule.
                        </p>
                        <p className="text-gray-700 text-lg mb-4">
                            Whether you&apos;re an adventure seeker, culture
                            explorer, or a laid-back traveler, our platform
                            crafts the perfect journey for you.
                        </p>
                    </div>

                    {/* Right Side - Image */}
                    <div>
                        <Image
                            src="/images/about.jpg"
                            alt="Travel planning illustration"
                            width={600}
                            height={400}
                            className="h-80 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Vision and Future Plans Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            Our Vision
                        </h2>
                        <p className="text-gray-700 text-lg">
                            We envision a future where travel planning is
                            effortless, driven by AI insights that understand
                            your preferences and help you explore destinations
                            with confidence.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                            The Future
                        </h2>
                        <p className="text-gray-700 text-lg">
                            Soon, we’ll introduce real-time itinerary
                            adjustments, collaborative trip planning, and
                            integrations with local experiences to make your
                            journey even smoother.
                        </p>
                    </div>
                </div>
            </section>
            <SiteFooter />
        </div>
    );
}
