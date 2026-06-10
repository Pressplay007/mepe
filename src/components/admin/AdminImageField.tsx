import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminImageFieldProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
}

const AdminImageField = ({
  label = "Image",
  value,
  onChange,
  onUpload,
}: AdminImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await onUpload(file);
      onChange(url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative rounded-[10px] overflow-hidden border border-mda-maroon/10">
          <img
            src={value}
            alt=""
            className="w-full aspect-[16/9] object-cover"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-[16/9] border-2 border-dashed border-mda-maroon/10 rounded-[10px] flex flex-col items-center justify-center gap-3 text-mda-maroon/40 hover:border-mda-pink hover:text-mda-pink transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={28} className="animate-spin" />
          ) : (
            <Upload size={28} />
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Upload image
          </span>
        </button>
      )}
    </div>
  );
};

export default AdminImageField;
