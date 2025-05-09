// pages/api/movies/[id].js
import { supabase } from "./lib/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(404).json({ error: "Movie not found" });
  res.status(200).json(data);
}
