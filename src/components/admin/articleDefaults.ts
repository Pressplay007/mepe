import type { Article } from "../../data/articles";

export const makeEmptyArticle = (): Partial<Article> => ({
  title: "",
  summary: "",
  content: "",
  category: "News",
  status: "Published",
  author: "",
  image: "",
  date: new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
});
