// pages/api/movies/index.js
import { supabase } from "./lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const { data, error } = await supabase.from("movies").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}
