import { useState, type FormEvent } from "react";
import { Upload, File, Image as ImageIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MediaUploadSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void> | void;
}

const MediaUploadSheet = ({
  isOpen,
  onClose,
  onUpload,
}: MediaUploadSheetProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setError("");
    setIsUploading(true);
    try {
      await onUpload(selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="p-0 border-l border-mda-maroon/5 bg-white sm:max-w-md flex flex-col gap-0 overflow-hidden"
      >
        <SheetHeader className="p-10 bg-mda-maroon text-white text-left space-y-0">
          <SheetTitle className="text-3xl font-display uppercase  text-white leading-none">
            Upload <span className="text-mda-pink">Media</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Add assets to library
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-8 flex-1 overflow-y-auto"
        >
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Select Files
            </label>
            <div
              className={`border-2 border-dashed rounded-[10px] p-16 text-center transition-all cursor-pointer group bg-mda-cream/10 ${selectedFile ? "border-mda-pink bg-mda-pink/5" : "border-mda-maroon/10 hover:border-mda-pink/40"}`}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              {selectedFile ? (
                <div className="space-y-4 animate-scale-up">
                  <div className="w-20 h-20 bg-mda-pink rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-mda-pink/20">
                    <ImageIcon className="text-white" size={32} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-mda-maroon truncate max-w-[200px] mx-auto uppercase ">
                      {selectedFile.name}
                    </p>
                    <p className="text-[10px] text-mda-maroon/40 font-bold uppercase tracking-widest mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload
                    className="mx-auto text-mda-maroon/20 group-hover:text-mda-pink transition-colors"
                    size={48}
                  />
                  <div>
                    <p className="text-[10px] font-bold text-mda-maroon uppercase tracking-widest">
                      Click to browse or drag and drop
                    </p>
                    <p className="text-[9px] text-mda-maroon/30 font-medium mt-1 uppercase tracking-wider">
                      PNG, JPG, SVG up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">
              {error}
            </p>
          )}
        </form>

        <SheetFooter className="p-10 border-t border-mda-maroon/5 bg-white flex flex-row gap-4 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 py-7 border-mda-maroon/5 rounded-[10px] text-[10px] font-bold uppercase tracking-widest text-mda-maroon hover:bg-mda-cream/30"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedFile || isUploading}
            onClick={handleSubmit}
            className="flex-1 py-7 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <File size={14} />
            )}
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </SheetFooter>
      </SheetContent>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `,
        }}
      />
    </Sheet>
  );
};

export default MediaUploadSheet;
