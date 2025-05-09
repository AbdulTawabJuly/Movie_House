import Layout from "@/components/Layout";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data: directors, error } = useSWR("/api/directors", fetcher);

  console.log("Directors data:", directors);

  if (error)
    return (
      <div className="min-h-screen … flex items-center justify-center">
        <div className="text-center text-red-600 text-xl font-semibold">
          Failed to load directors
        </div>
      </div>
    );
  if (!directors)
    return (
      <div className="min-h-screen … flex items-center justify-center">
        <div className="text-center text-gray-600 text-xl font-semibold">
          Loading...
        </div>
      </div>
    );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
            Meet the Directors
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {directors.map((director) => (
              <div
                key={director.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Director Image</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {director.name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {director.biography || "No biography available"}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 mb-2 underline">
                    Movies Directed:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {director.movies.length > 0 ? (
                      director.movies.map((movie) => (
                        <li key={movie.id} className="truncate">
                          {movie.title} ({movie.releaseYear})
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No movies found</li>
                    )}
                  </ul>
                </div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
