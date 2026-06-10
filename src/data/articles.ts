export interface Article {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  author?: string;
  image?: string;
  status?: "Published" | "Scheduled" | "Draft";
}
