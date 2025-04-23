import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function GenreDetails({ genre, movies }) {
  if (!genre) {
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
            href="/genres"
            className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibol d transition-colors"
          >
            ← Back to Genres
          </Link>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto mb-12">
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                {genre.name}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Explore our collection of {genre.name} movies below.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movies/${movie.id}`}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        Movie Poster
                      </span>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                        {movie.title}
                      </h2>

                    </div>
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 rounded-2xl transition-all" />
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 text-lg">
                No movies found for this genre.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const genre = jsonData.genres.find((g) => g.id === context.params.id);
  const movies = jsonData.movies.filter((m) => m.genreId === context.params.id);
  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre,
      movies,
    },
  };
}
