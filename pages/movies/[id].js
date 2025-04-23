import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function MovieDetails({ movie, director, genres }) {
  if (!movie) {
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
            href="/movies"
            className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            &larr; Back to Movies
          </Link>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Movie Poster</span>
            </div>
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                {movie.title}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {movie.description || "No description available"}
              </p>
              <div className="space-y-4">
                <p className="text-gray-800">
                  <span className="font-semibold">Director: </span>
                  <Link
                    href={`/movies/${movie.id}/director`}
                    className="text-indigo-600 hover:underline"
                  >
                    {director?.name || movie.directorId}
                  </Link>
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Release Year: </span>
                  {movie.releaseYear || "N/A"}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Rating: </span>
                  {movie.rating || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const paths = jsonData.movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "public", "data", "movie_db.json");
  const data = await fs.readFile(filePath);
  const jsonData = JSON.parse(data);
  const movie = jsonData.movies.find((m) => m.id === context.params.id);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  const director = jsonData.directors[movie.directorId] || null;
  const genres = jsonData.genres || {};

  return {
    props: {
      movie,
      director,
      genres,
    },
    revalidate: 10,
  };
}
