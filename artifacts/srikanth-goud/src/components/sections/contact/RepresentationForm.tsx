import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  Check,
  ClipboardCopy,
  Download,
  PenLine,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  CATEGORIES,
  CONSTITUENCIES,
  EMPTY,
  FIELD_ORDER,
  LIMITS,
  normalizeMobile,
  validate,
  type RepErrors,
  type RepFields,
} from "./representation";

const field =
  "w-full rounded-lg border bg-[#fbf7ec] px-3.5 py-3 text-[15px] text-[#1b2a22] placeholder:text-[#4A5B52] transition focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CA8A04]";
const okBorder = "border-[#c9bb94]";
const badBorder = "border-[#b42345] ring-1 ring-[#b42345]";

interface StoredRepresentation {
  id: string | number;
  referenceNumber: string;
  name: string;
  mobile: string;
  constituency: string;
  category: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function RepresentationForm() {
  const [v, setV] = useState<RepFields>(EMPTY);
  const [errors, setErrors] = useState<RepErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submission, setSubmission] = useState<StoredRepresentation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (submission) {
      confirmRef.current?.focus();
    }
  }, [submission]);

  const set = (k: keyof RepFields) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
    if (submission) {
      setSubmission(null);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate brief processing animation for reassuring user feedback
    await new Promise((r) => setTimeout(r, 400));

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const refNumber = `DSG-REP-2026-${randomSuffix}`;
    const cleanMobile = normalizeMobile(v.mobile) ?? v.mobile.trim();

    const newRecord: StoredRepresentation = {
      id: Date.now(),
      referenceNumber: refNumber,
      name: v.name.trim(),
      mobile: cleanMobile,
      constituency: v.constituency || "General / State",
      category: v.category || "General Representation",
      message: v.message.trim() || "(No additional details provided)",
      status: "RECEIVED",
      createdAt: new Date().toISOString(),
    };

    try {
      const existingRaw = localStorage.getItem("dsg_representations");
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(newRecord);
      localStorage.setItem("dsg_representations", JSON.stringify(list));
    } catch {
      // Ignore localStorage quotas or privacy blockers
    }

    setSubmission(newRecord);
    setIsSubmitting(false);
  };

  const copyRefNumber = async (refNum: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(refNum);
        setCopiedRef(true);
        setTimeout(() => setCopiedRef(false), 2500);
      }
    } catch {
      // fallback
    }
  };

  const doDownload = () => {
    if (!submission) return;
    const content = `OFFICIAL CITIZEN REPRESENTATION ACKNOWLEDGMENT
--------------------------------------------------
Tracking ID:   ${submission.referenceNumber}
Status:        ${submission.status}
Received At:   ${new Date(submission.createdAt).toLocaleString()}
Office:        Secretariat Desk of Dr. Nalamasa Srikanth Goud
Jurisdiction:  Mahabubabad Camp Office & Public Grievance Cell

CITIZEN DETAILS:
--------------------------------------------------
Full Name:     ${submission.name}
Mobile:        +91 ${submission.mobile}
Constituency:  ${submission.constituency}
Category:      ${submission.category}

REPRESENTATION MESSAGE:
--------------------------------------------------
${submission.message}

--------------------------------------------------
This acknowledgment confirms your representation has been officially recorded.`;

    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `representation-${submission.referenceNumber}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const resetForm = () => {
    setV(EMPTY);
    setSubmission(null);
    setTimeout(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus(), 0);
  };

  const aria = (k: keyof RepFields, hint?: string) => ({
    id: `rep-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [hint, errors[k] ? `rep-${k}-err` : ""].filter(Boolean).join(" ") || undefined,
    "data-testid": `input-${k}`,
  });

  const Err = ({ k }: { k: keyof RepFields }) =>
    errors[k] ? (
      <p id={`rep-${k}-err`} className="mt-1.5 flex items-start gap-1.5 text-[13px] font-medium text-[#a51d3c]">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        {errors[k]}
      </p>
    ) : null;

  const Label = ({ k, children, req }: { k: string; children: string; req?: boolean }) => (
    <label htmlFor={`rep-${k}`} className="mb-1.5 block text-[13px] font-semibold tracking-wide text-[#24382d]">
      {children}{" "}
      {req ? (
        <span className="text-[#a51d3c]" aria-hidden>
          *
        </span>
      ) : (
        <span className="font-normal text-[#5f6f65]">(optional)</span>
      )}
      {req && <span className="sr-only"> (required)</span>}
    </label>
  );

  return (
    <div className="rounded-2xl border border-[#CA8A04]/40 bg-[#f4eedd] p-6 text-[#1b2a22] shadow-[0_30px_60px_-30px_rgba(5,20,14,0.6)] sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#A16207]">
          Citizen Representation Desk
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14532D]/10 px-2.5 py-1 text-[11px] font-semibold text-[#14532D]">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" /> Direct Secretariat Portal
        </span>
      </div>
      <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-[#15241D] sm:text-[1.75rem]">
        Write to the Secretariat
      </h3>
      <p className="mt-1.5 text-xs text-stone-600">
        All submissions are officially recorded with an instant tracking reference ID for follow-up with the Camp Office.
      </p>

      {/* When successfully submitted */}
      {submission ? (
        <div
          ref={confirmRef}
          tabIndex={-1}
          role="region"
          aria-labelledby="rep-success-title"
          data-testid="status-representation-submitted"
          className="mt-6 rounded-xl border-2 border-[#14532D]/40 bg-[#eef5eb] p-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#14532D] px-3 py-1 text-xs font-semibold text-[#FBF8F1]">
                <Check className="h-3.5 w-3.5" aria-hidden /> Official Receipt Registered
              </div>
              <h4
                id="rep-success-title"
                className="mt-3 font-display text-xl font-bold text-[#15241D] sm:text-2xl"
              >
                Representation Successfully Submitted
              </h4>
              <p className="mt-1 text-sm text-[#24382d]">
                Your representation has been logged and assigned to the Mahabubabad District Camp Office.
              </p>
            </div>
          </div>

          {/* Reference tracking box */}
          <div className="mt-5 rounded-lg border border-[#c9bb94] bg-[#FFFFFF] p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#A16207]">
                  Official Tracking Reference
                </p>
                <p className="font-mono text-xl font-bold text-[#14532D] sm:text-2xl">
                  {submission.referenceNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyRefNumber(submission.referenceNumber)}
                data-testid="button-copy-ref"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#14532D]/30 bg-[#f4eedd] px-3.5 py-2 text-xs font-semibold text-[#15241D] transition hover:bg-[#ebdcc0]"
              >
                <ClipboardCopy className="h-3.5 w-3.5" />
                {copiedRef ? "Copied Reference!" : "Copy Tracking ID"}
              </button>
            </div>

            <div className="mt-4 grid gap-3 border-t border-[#DFD8CB] pt-3 text-xs sm:grid-cols-2">
              <div>
                <span className="text-[#5f6f65]">Citizen:</span>{" "}
                <strong className="text-[#15241D]">{submission.name}</strong>
              </div>
              <div>
                <span className="text-[#5f6f65]">Mobile:</span>{" "}
                <strong className="text-[#15241D]">+91 {submission.mobile}</strong>
              </div>
              <div>
                <span className="text-[#5f6f65]">Constituency:</span>{" "}
                <strong className="text-[#15241D]">{submission.constituency}</strong>
              </div>
              <div>
                <span className="text-[#5f6f65]">Subject:</span>{" "}
                <strong className="text-[#15241D]">{submission.category}</strong>
              </div>
              <div>
                <span className="text-[#5f6f65]">Status:</span>{" "}
                <span className="inline-flex items-center gap-1 font-semibold text-[#166534]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#166534]" /> RECEIVED
                </span>
              </div>
              <div>
                <span className="text-[#5f6f65]">Logged At:</span>{" "}
                <span className="text-[#15241D]">
                  {new Date(submission.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={doDownload}
              data-testid="button-download-receipt"
              className="inline-flex items-center gap-2 rounded-full bg-[#14532D] px-5 py-2.5 text-sm font-semibold text-[#FBF8F1] transition hover:bg-[#166534]"
            >
              <Download className="h-4 w-4" /> Download Official Receipt (.txt)
            </button>
            <button
              type="button"
              onClick={resetForm}
              data-testid="button-submit-another"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-[#FFFFFF] px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-[#F5F1E9]"
            >
              <RefreshCw className="h-4 w-4" /> Submit Another Representation
            </button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          className="mt-6 space-y-5"
        >
          <div>
            <Label k="name" req>
              Full Name
            </Label>
            <input
              {...aria("name")}
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name}
              value={v.name}
              onChange={set("name")}
              disabled={isSubmitting}
              className={`${field} ${errors.name ? badBorder : okBorder}`}
              placeholder="e.g. Ramesh Reddy"
            />
            <Err k="name" />
          </div>

          <div>
            <Label k="mobile" req>
              Mobile Number
            </Label>
            <div
              className={`flex overflow-hidden rounded-lg border bg-[#fbf7ec] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#CA8A04] ${
                errors.mobile ? badBorder : okBorder
              }`}
            >
              <span
                className="grid place-items-center border-r border-[#c9bb94] bg-[#ebe2c8] px-3.5 text-[15px] font-semibold text-[#24382d]"
                aria-hidden
              >
                +91
              </span>
              <input
                {...aria("mobile", "rep-mobile-hint")}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                maxLength={LIMITS.mobile}
                value={v.mobile}
                onChange={set("mobile")}
                disabled={isSubmitting}
                placeholder="9876543210"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] text-[#1b2a22] outline-none"
              />
            </div>
            <p id="rep-mobile-hint" className="mt-1.5 text-[12px] text-[#5f6f65]">
              India (+91), 10 digits
            </p>
            <Err k="mobile" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label k="constituency">Constituency</Label>
              <select
                {...aria("constituency")}
                value={v.constituency}
                onChange={set("constituency")}
                disabled={isSubmitting}
                className={`${field} ${errors.constituency ? badBorder : okBorder}`}
              >
                <option value="">Select constituency</option>
                {CONSTITUENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Err k="constituency" />
            </div>
            <div>
              <Label k="category">Subject / Category</Label>
              <select
                {...aria("category")}
                value={v.category}
                onChange={set("category")}
                disabled={isSubmitting}
                className={`${field} ${errors.category ? badBorder : okBorder}`}
              >
                <option value="">Select subject</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Err k="category" />
            </div>
          </div>
          <div>
            <Label k="message">Message / Representation</Label>
            <textarea
              {...aria("message", "rep-message-count")}
              rows={5}
              maxLength={LIMITS.message}
              value={v.message}
              onChange={set("message")}
              disabled={isSubmitting}
              placeholder="State your representation, request, or issue clearly..."
              className={`${field} resize-y ${errors.message ? badBorder : okBorder}`}
            />
            <p id="rep-message-count" className="mt-1 text-right text-[12px] text-[#5f6f65]">
              {v.message.length} / {LIMITS.message}
            </p>
            <Err k="message" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            data-testid="button-submit-representation"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#14532D] px-6 py-3.5 text-[15px] font-semibold text-[#FBF8F1] transition hover:bg-[#166534] focus-visible:outline-[#A16207] disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#FBF8F1]" aria-hidden />
                Registering Representation...
              </>
            ) : (
              <>
                <PenLine className="h-4 w-4 text-[#CA8A04]" aria-hidden />
                Submit Representation to Secretariat
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
