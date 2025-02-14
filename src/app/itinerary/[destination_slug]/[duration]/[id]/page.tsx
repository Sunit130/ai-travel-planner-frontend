import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MapPin, Calendar, Clock } from "lucide-react"
import { notFound } from 'next/navigation';
import Carousel from "@/components/carousel"


interface ItineraryDayPlan {
  day: number,
  title: string,
  morning?: string;
  afternoon?: string;
  evening?: string;
}

interface ImagesByDay {
  [day: string]: {
    [placeName: string]: string;
  }
}

interface Itinerary {
  id: number;
  headline: string;
  subheadline: string;
  quote: string;
  location: string;
  location_image: string;
  destination: string;
  duration: number;
  budget: string;
  interests: string;
  overview_introduction: string;
  overview_time_to_visit: string;
  top_attractions: string;
  interest_attractions: string;
  images_by_day: ImagesByDay;
  created_at: string;
  itinerary_plan: ItineraryDayPlan[];
}

type TimeOfDay = "morning" | "afternoon" | "evening";


export async function generateMetadata({params}: {params: Params}) {
  const { destination_slug, duration, id } = await params;
  const data = await fetchItinerary(destination_slug, duration, id);

  if (!data) {
    return {
      title: "Itinerary Not Found",
      description: "No itinerary data available.",
    };
  }

  return {
    title: data.headline,
    description: data.overview_introduction,
    openGraph: {
      title: data.headline,
      description: data.overview_introduction,
      images: [
        {
          url: data.location_image,
          alt: data.headline,
        },
      ],
    },
  };
}

async function fetchItinerary(destination_slug: string, duration: string, idr: string): Promise<Itinerary | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/itinerary/${destination_slug}/${duration}/${idr}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null; // If API fails, return null

    return await res.json();
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    return null;
  }
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

type Params = Promise<{ destination_slug: string; duration: string; id: string }>;

export default async function ItineraryPage({params}: {params: Params}) {
  const { destination_slug, duration, id } = await params;
  const data = await fetchItinerary(destination_slug, duration, id);
  if (!data) return notFound();

  const headline = data["headline"];
  const subheadline = data["subheadline"];
  const quote = data["quote"];
  const location = data["location"];
  const location_image = data["location_image"];
  const overview_introduction = data["overview_introduction"];
  const overview_time_to_visit = data["overview_time_to_visit"];
  const itinerary_plan = data["itinerary_plan"];
  const images_by_day = data["images_by_day"];
  const created_date = data["created_at"];
  


  return (
    <div className="relative min-h-screen bg-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 lg:px-8">
        <article className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <header className="mb-12 space-y-6">
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-xl">
              <Image
                src={location_image}
                alt="Kyoto Temple"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                  {headline}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/90">
                  {subheadline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Published {`${formatDate(created_date)}`}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>15 min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
            </div>

            <blockquote className="relative overflow-hidden rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-sage-50 p-6 italic text-emerald-800 shadow-sm">
              <div className="relative z-10">
                {`"${quote}"`}
              </div>
              <div className="absolute -right-4 -top-4 h-16 w-16 rotate-12 text-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </blockquote>
          </header>

          <div className="mt-12 space-y-12">
            {/* Introduction Section */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Introduction</h2>
              <div className="prose prose-emerald max-w-none text-gray-600">
                <p>
                  {overview_introduction}
                </p>
              </div>
            </section>

            {/* Best Time Section */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Best Time to Visit</h2>
              <div className="grid gap-6 lg:grid-cols-1">
                <div className="prose prose-emerald max-w-none text-gray-600">
                  <p>
                  {overview_time_to_visit}
                  </p>
                </div>
              </div>
            </section>

            {/* Day wise Itinerary  */}
            {
              itinerary_plan.map((item: ItineraryDayPlan, index: number) => 
                <section key={index} className="space-y-6 rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50/10 to-emerald-100/20 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold">{`Day ${item["day"]}: ${item["title"]}`}</h2>

                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                      {
                        (["morning", "afternoon", "evening"] as TimeOfDay[]).map((time, index) => <>
                          <div key={index}>
                            <h3 className="mb-3 text-xl font-semibold text-emerald-800">{time.charAt(0).toUpperCase() + time.slice(1)}</h3>
                            <div className="prose prose-emerald text-gray-600">
                              <p className="prose" dangerouslySetInnerHTML={{ __html: item[time] || "" }} >
                              </p>
                            </div>
                          </div>
                        </>)
                      }
                    </div>
                    <div className="space-y-4 flex justify-center select-none">
                      <Carousel images={Object.entries(images_by_day[item["day"]])}/>
                    </div>
                  </div>
                </section>
              )
            }
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}

