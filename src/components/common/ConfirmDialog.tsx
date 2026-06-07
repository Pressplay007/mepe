import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle, X } from "lucide-react";

export interface ConfirmOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  tone?: "danger" | "default";
}

type ConfirmFn = (options?: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export const useConfirm = (): ConfirmFn => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return ctx;
};

const defaults: Required<ConfirmOptions> = {
  title: "Are you sure?",
  description: "This action cannot be undone.",
  confirmText: "Confirm",
  cancelText: "Cancel",
  tone: "danger",
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Required<ConfirmOptions>>(defaults);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((opts = {}) => {
    setOptions({ ...defaults, ...opts });
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const close = useCallback((result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
      if (e.key === "Enter") close(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const isDanger = options.tone === "danger";

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {open && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-mda-maroon/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => close(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-[18px] shadow-2xl border border-mda-maroon/5 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            <button
              type="button"
              onClick={() => close(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-mda-maroon/40 hover:text-mda-maroon hover:bg-mda-cream/60 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  isDanger
                    ? "bg-red-50 text-red-500"
                    : "bg-mda-cream text-mda-maroon"
                }`}
              >
                <AlertTriangle size={26} />
              </div>

              <h3 className="text-2xl font-display text-mda-maroon uppercase leading-tight">
                {options.title}
              </h3>
              <p className="mt-2 text-sm text-mda-maroon/60 font-body leading-relaxed">
                {options.description}
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 p-6 pt-0">
              <button
                type="button"
                onClick={() => close(false)}
                className="flex-1 py-4 rounded-[10px] border border-mda-maroon/10 text-[10px] font-bold uppercase tracking-widest text-mda-maroon hover:bg-mda-cream/40 transition-colors"
              >
                {options.cancelText}
              </button>
              <button
                type="button"
                onClick={() => close(true)}
                autoFocus
                className={`flex-1 py-4 rounded-[10px] text-[10px] font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 ${
                  isDanger
                    ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                    : "bg-mda-maroon hover:bg-mda-maroon/90 shadow-mda-maroon/20"
                }`}
              >
                {options.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
