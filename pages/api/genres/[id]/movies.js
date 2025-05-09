import { supabase } from "./lib/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("genreId", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
}
