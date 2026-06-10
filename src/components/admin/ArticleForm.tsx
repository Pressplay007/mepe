import { useRef, useState, type FormEvent } from "react";
import { Type, User, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Article } from "../../data/articles";
import { uploadArticleImage } from "../../services/articles";
import RichTextEditor, {
  isArticleBodyEmpty,
} from "../../components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ArticleFormProps {
  initial: Partial<Article>;
  onSubmit: (article: Partial<Article>) => Promise<void>;
  onCancel: () => void;
  saveLabel?: string;
}

const ArticleForm = ({
  initial,
  onSubmit,
  onCancel,
  saveLabel,
}: ArticleFormProps) => {
  const [article, setArticle] = useState<Partial<Article>>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingHeader, setUploadingHeader] = useState(false);
  const headerInputRef = useRef<HTMLInputElement>(null);

  const handleHeaderImage = async (file: File) => {
    setUploadingHeader(true);
    try {
      const url = await uploadArticleImage(file);
      setArticle((prev) => ({ ...prev, image: url }));
      toast.success("Header image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingHeader(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!article.title || isArticleBodyEmpty(article.content ?? "")) {
      toast.error("Please add a title and article body.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...article,
        summary: article.summary || "",
        content: article.content || "",
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save article.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Title
            </label>
            <div className="relative group">
              <Type
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={article.title ?? ""}
                onChange={(e) =>
                  setArticle({ ...article, title: e.target.value })
                }
                className="w-full bg-white border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-lg font-display text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="Article headline"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Summary
            </label>
            <textarea
              value={article.summary ?? ""}
              onChange={(e) =>
                setArticle({ ...article, summary: e.target.value })
              }
              className="w-full bg-white border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all min-h-[100px] resize-y"
              placeholder="Short excerpt shown in listings..."
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Article Body
            </label>
            <RichTextEditor
              key={String(initial.id ?? "new")}
              value={article.content ?? ""}
              onChange={(html) => setArticle((prev) => ({ ...prev, content: html }))}
              onUploadImage={uploadArticleImage}
              placeholder="Start writing — use the toolbar for headings, lists, links, and images."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-mda-maroon/5 rounded-[15px] p-6 space-y-4 shadow-sm">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">
              Header Image
            </label>
            <input
              ref={headerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleHeaderImage(file);
                e.target.value = "";
              }}
            />
            {article.image ? (
              <div className="relative rounded-[10px] overflow-hidden border border-mda-maroon/10">
                <img
                  src={article.image}
                  alt="Article header"
                  className="w-full aspect-[16/9] object-cover"
                />
                <button
                  type="button"
                  onClick={() => setArticle({ ...article, image: "" })}
                  className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={uploadingHeader}
                onClick={() => headerInputRef.current?.click()}
                className="w-full aspect-[16/9] border-2 border-dashed border-mda-maroon/10 rounded-[10px] flex flex-col items-center justify-center gap-3 text-mda-maroon/40 hover:border-mda-pink hover:text-mda-pink transition-colors disabled:opacity-50"
              >
                {uploadingHeader ? (
                  <Loader2 size={28} className="animate-spin" />
                ) : (
                  <Upload size={28} />
                )}
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Upload header image
                </span>
              </button>
            )}
          </div>

          <div className="bg-white border border-mda-maroon/5 rounded-[15px] p-6 space-y-6 shadow-sm">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
                Author (optional)
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  value={article.author ?? ""}
                  onChange={(e) =>
                    setArticle({ ...article, author: e.target.value })
                  }
                  className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-4 pl-11 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                  placeholder="MDA Communications"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
                Category
              </label>
              <Select
                value={article.category ?? "News"}
                onValueChange={(value) =>
                  setArticle({ ...article, category: value })
                }
              >
                <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] h-12 px-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink focus:ring-0 shadow-none">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-mda-maroon/5 rounded-[10px] shadow-xl">
                  {["News", "Community", "Culture", "Youth", "Development"].map(
                    (cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="focus:bg-mda-cream/50 cursor-pointer"
                      >
                        {cat}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
                Status
              </label>
              <div className="grid grid-cols-1 gap-2">
                {(["Draft", "Scheduled", "Published"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setArticle({ ...article, status })}
                    className={`py-3 rounded-[10px] text-[9px] font-bold uppercase tracking-widest border transition-all ${
                      article.status === status
                        ? status === "Published"
                          ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                          : status === "Scheduled"
                            ? "bg-amber-50 border-amber-500 text-amber-600"
                            : "bg-mda-cream border-mda-maroon/20 text-mda-maroon"
                        : "bg-white border-mda-maroon/5 text-mda-maroon/40"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-4 bg-mda-cream/95 backdrop-blur border-t border-mda-maroon/5 flex flex-col sm:flex-row gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="py-6 border-mda-maroon/5 rounded-[10px] text-[10px] font-bold uppercase tracking-widest text-mda-maroon hover:bg-white sm:min-w-[140px]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="py-6 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 sm:min-w-[180px] disabled:opacity-60"
        >
          {submitting
            ? "Saving..."
            : saveLabel ??
              (article.status === "Published" ? "Publish" : "Save Article")}
        </Button>
      </div>
    </form>
  );
};

export default ArticleForm;
