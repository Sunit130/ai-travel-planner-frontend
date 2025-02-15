"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Calendar,
    Clock,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TRIPS_TYPE } from "../const";
import { SkeletonCard } from "@/components/skeleton-card";

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

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => (
    <div className="relative mb-4">
        <input
            type="text"
            placeholder="Search destinations..."
            className="w-full p-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
);

const FilterButtons = ({
    onFilter,
    activeFilter,
}: {
    onFilter: (filter: string) => void;
    activeFilter: string;
}) => {
    const filters = ["All", ...TRIPS_TYPE];
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilter(filter)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === filter
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => (
    <div className="flex justify-center items-center space-x-2 mt-8">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
        >
            <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-gray-700">
            Page {currentPage} of {totalPages}
        </span>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
        >
            <ChevronRight className="w-5 h-5" />
        </button>
    </div>
);

export default function ItinerariesPage() {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        async function fetchItinerariesList() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/itineraries`,
                    {
                        cache: "no-store",
                    }
                );

                if (!res.ok) return;
                const data = await res.json();
                setItineraries(data);
                setFilteredItineraries(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching itinerary:", error);
                setLoading(false);
            }
        }
        fetchItinerariesList();
    }, []);

    useEffect(() => {
        const filtered = itineraries.filter((itinerary) => {
            const interests = JSON.parse(
                itinerary.interests.replace(/'/g, '"')
            );
            const matchesSearch = itinerary.location
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesFilter =
                activeFilter === "All" || interests.includes(activeFilter);
            return matchesSearch && matchesFilter;
        });
        setFilteredItineraries(filtered);
        setCurrentPage(1);
    }, [searchQuery, activeFilter, itineraries]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFilter = (filter: string) => {
        setActiveFilter(filter);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);
    const paginatedItineraries = filteredItineraries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="relative min-h-screen bg-white">
            <SiteHeader />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-center text-emerald-800 mb-8">
                    Latest Itineraries
                </h1>

                <SearchBar onSearch={handleSearch} />
                <FilterButtons
                    onFilter={handleFilter}
                    activeFilter={activeFilter}
                />

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(12)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {paginatedItineraries.map((itinerary) => (
                                <Link
                                    href={`/itinerary/${itinerary.destination_slug}/${itinerary.duration}-days/${itinerary.id}`}
                                    key={itinerary.id}
                                >
                                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
                                        <Image
                                            src={
                                                itinerary.location_image ||
                                                "/images/placeholder.jpg"
                                            }
                                            alt={itinerary.location}
                                            width={400}
                                            height={300}
                                            className="w-full h-72 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-4 space-y-2">
                                            <h2 className="text-lg font-semibold text-emerald-800 flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {itinerary.location}
                                            </h2>
                                            <p className="text-gray-600 flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {itinerary.duration} Days
                                            </p>
                                            <p className="text-sm text-gray-400 flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                Created on{" "}
                                                {new Date(
                                                    itinerary.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                            {JSON.parse(
                                                itinerary.interests.replace(
                                                    /'/g,
                                                    '"'
                                                )
                                            ).map(
                                                (
                                                    interest: string,
                                                    index: number
                                                ) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 mx-1 rounded-full"
                                                    >
                                                        {interest}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
            <SiteFooter />
        </div>
    );
}
