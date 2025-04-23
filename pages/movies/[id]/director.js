import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Layout from "@/components/Layout";

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

  const director = jsonData.directors.find((d) => d.id === movie.directorId);

  if (!director) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      director,
    },
    revalidate: 10,
  };
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
