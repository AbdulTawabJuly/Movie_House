import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div className="container mx-auto px-4 py-12">
          <Link
            href="/"
            className="inline-block mb-6 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            ← Back to Home
          </Link>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-3xl mx-auto">
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                Help Center
              </h1>
              <div className="text-gray-600 leading-relaxed">
                {slug && slug.length > 0 ? (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Section: {slug.join(" / ")}
                    </h2>
                    <p className="mb-4">
                      This is the help content for the{" "}
                      <span className="font-medium text-indigo-600">
                        {slug.join(" / ")}
                      </span>{" "}
                      section. Detailed information about this topic will be
                      provided here.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      General Help
                    </h2>
                    <p className="mb-4">
                      Welcome to the Movie House Help Center! Here you can find
                      information about navigating the site, browsing movies,
                      genres, directors, and more.
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-4">
                  Need more assistance? Explore other help sections or contact
                  support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
