import { supabase } from "../lib/supabase";
import { logActivity } from "./activity";

const BUCKET = "media";
export const GALLERY_PREFIX = "gallery/";

export interface MediaItem {
  id: string;
  name: string;
  path: string;
  url: string;
  type: string;
  size: string;
  date: string;
}

const formatSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
};

const fileType = (name: string): string => {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  return ["JPG", "JPEG", "PNG", "WEBP", "GIF", "SVG"].includes(ext)
    ? "Image"
    : ext;
};

type Row = {
  id: string;
  name: string;
  path: string;
  url: string;
  type: string;
  size_bytes: number;
  source?: string;
  created_at: string;
};

const isMissingSourceColumn = (error: { code?: string; message?: string }) =>
  error.code === "PGRST204" || /column.*source/i.test(error.message ?? "");

const toItem = (row: Row): MediaItem => ({
  id: row.id,
  name: row.name,
  path: row.path,
  url: row.url,
  type: row.type,
  size: formatSize(row.size_bytes),
  date: new Date(row.created_at).toLocaleDateString(),
});

/** Only rows explicitly uploaded via Admin → Media/Gallery. */
export async function listMedia(): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("source", "gallery")
    .order("created_at", { ascending: false });

  if (!error) return (data as Row[]).map(toItem);

  if (isMissingSourceColumn(error)) {
    const { data: fallback, error: fallbackError } = await supabase
      .from("media")
      .select("*")
      .like("path", `${GALLERY_PREFIX}%`)
      .order("created_at", { ascending: false });
    if (fallbackError) throw fallbackError;
    return (fallback as Row[]).map(toItem);
  }

  throw error;
}

export async function uploadMedia(file: File): Promise<MediaItem> {
  const path = `${GALLERY_PREFIX}${crypto.randomUUID()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) throw uploadError;

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

  const { data, error } = await supabase
    .from("media")
    .insert({
      name: file.name,
      path,
      url: pub.publicUrl,
      type: fileType(file.name),
      size_bytes: file.size,
      source: "gallery",
    })
    .select()
    .single();

  if (error) throw error;

  await logActivity("Media", `File uploaded: ${file.name}`);
  return toItem(data as Row);
}

export async function deleteMedia(item: MediaItem): Promise<void> {
  await supabase.storage.from(BUCKET).remove([item.path]);
  const { error } = await supabase.from("media").delete().eq("id", item.id);
  if (error) throw error;
  await logActivity("Media", `File deleted: ${item.name}`);
}
