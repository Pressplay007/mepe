import { supabase } from "../lib/supabase";
import type { Article } from "../data/articles";
import { slugify } from "../lib/slug";
import { logActivity } from "./activity";

const STORAGE_BUCKET = "media";
const ARTICLE_PREFIX = "articles";

/** Uploads to storage only — does not add to the public gallery media table. */
export async function uploadArticleImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${ARTICLE_PREFIX}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

type Row = {
  id: string;
  slug: string | null;
  title: string;
  date_label: string;
  category: string;
  summary: string;
  content: string;
  author: string | null;
  image_url: string | null;
  status: NonNullable<Article["status"]>;
};

const toArticle = (row: Row): Article => ({
  id: row.id,
  slug: row.slug ?? slugify(row.title),
  title: row.title,
  date: row.date_label,
  category: row.category,
  summary: row.summary,
  content: row.content,
  author: row.author ?? undefined,
  image: row.image_url ?? undefined,
  status: row.status,
});

const toRow = (a: Omit<Article, "id">) => ({
  title: a.title,
  slug: a.slug,
  date_label: a.date,
  category: a.category,
  summary: a.summary,
  content: a.content,
  author: a.author ?? null,
  image_url: a.image ?? null,
  status: a.status ?? "Draft",
});

async function uniqueSlug(title: string, excludeId?: string): Promise<string> {
  const base = slugify(title) || "article";
  let candidate = base;
  let n = 2;

  while (true) {
    let query = supabase.from("articles").select("id").eq("slug", candidate);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    if (!data) return candidate;
    candidate = `${base}-${n++}`;
  }
}

export async function listArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toArticle);
}

export async function getArticle(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toArticle(data as Row) : null;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? toArticle(data as Row) : null;
}

export async function createArticle(
  input: Omit<Article, "id" | "slug"> & { slug?: string },
): Promise<Article> {
  const slug = input.slug ?? (await uniqueSlug(input.title));
  const { data, error } = await supabase
    .from("articles")
    .insert(toRow({ ...input, slug }))
    .select()
    .single();
  if (error) throw error;
  await logActivity("Article", `New article published: ${input.title}`);
  return toArticle(data as Row);
}

export async function updateArticle(
  id: string,
  input: Omit<Article, "id">,
): Promise<Article> {
  const slug = await uniqueSlug(input.title, id);
  const { data, error } = await supabase
    .from("articles")
    .update(toRow({ ...input, slug }))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await logActivity("Article", `Article updated: ${input.title}`);
  return toArticle(data as Row);
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw error;
  await logActivity("Article", "Article removed");
}
