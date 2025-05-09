import Link from "next/link";
import Layout from "@/components/Layout";
import { supabase } from "@/pages/lib/supabaseClient";

export default function DirectorDetails({ director, movies }) {
  if (!director) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center text-gray-600 text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/director"
            className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            ← Back to Directors
          </Link>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Director Image</span>
            </div>
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                {director.name}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {director.biography || "No biography available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // 1. Fetch all movie IDs from Supabase
  const { data: movies, error } = await supabase.from("movies").select("id");

  if (error) {
    console.error("Error fetching movie IDs:", error);
    return {
      paths: [],
      fallback: true,
    };
  }

  // 2. Build the list of paths based on movie IDs
  const paths = movies.map((m) => ({
    params: { id: m.id },
  }));

  return {
    paths,
    fallback: true, // pages not generated at build time will be SSR’d on first request
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  // 1. Fetch the movie to get its directorId
  const { data: movie, error: movieError } = await supabase
    .from("movies")
    .select("directorId")
    .eq("id", id)
    .single();

  if (movieError || !movie) {
    // If the movie doesn't exist, return 404
    return { notFound: true };
  }

  // 2. Fetch the director record
  const { data: director, error: directorError } = await supabase
    .from("directors")
    .select("*")
    .eq("id", movie.directorId)
    .single();

  if (directorError || !director) {
    // If the director is missing, also return 404
    return { notFound: true };
  }

  return {
    props: {
      director,
    },
    revalidate: 10, // ISR: re-generate this page at most every 10 seconds
  };
}
