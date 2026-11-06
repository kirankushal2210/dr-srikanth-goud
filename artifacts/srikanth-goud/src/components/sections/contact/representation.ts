export const CONSTITUENCIES = ["Mahabubabad", "Balkonda", "Armur", "Nizamabad Urban", "Warangal", "Other"] as const;
export const CATEGORIES = ["Public Grievance", "Youth & Student Welfare", "OBC Rights", "Event Invitation", "Cadre Interaction"] as const;

export type RepFields = {
  name: string;
  mobile: string;
  email: string;
  constituency: string;
  category: string;
  message: string;
};
export type RepErrors = Partial<Record<keyof RepFields, string>>;
export const FIELD_ORDER: (keyof RepFields)[] = ["name", "mobile", "email", "constituency", "category", "message"];
export const LIMITS = { name: 80, mobile: 16, email: 120, message: 2000 } as const;

export const EMPTY: RepFields = { name: "", mobile: "", email: "", constituency: "", category: "", message: "" };

/** Returns 10-digit Indian mobile or null. Accepts spaces, dashes, +91, 91, leading 0. */
export function normalizeMobile(raw: string): string | null {
  let d = raw.replace(/[\s\-().]/g, "");
  if (d.startsWith("+91")) d = d.slice(3);
  else if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'\-]*$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(f: RepFields): RepErrors {
  const e: RepErrors = {};
  const name = f.name.trim();
  if (!name) e.name = "Please enter your full name.";
  else if (name.length < 2) e.name = "Name must be at least 2 characters.";
  else if (name.length > LIMITS.name) e.name = `Name must be ${LIMITS.name} characters or fewer.`;
  else if (!NAME_RE.test(name)) e.name = "Use letters, spaces, dots, apostrophes or hyphens only.";

  if (!f.mobile.trim()) e.mobile = "Please enter your mobile number.";
  else if (!normalizeMobile(f.mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.";

  const email = f.email.trim();
  if (email && (email.length > LIMITS.email || !EMAIL_RE.test(email))) e.email = "Enter a valid email address, or leave this blank.";

  if (f.constituency && !(CONSTITUENCIES as readonly string[]).includes(f.constituency)) e.constituency = "Choose a constituency from the list.";
  if (f.category && !(CATEGORIES as readonly string[]).includes(f.category)) e.category = "Choose a subject from the list.";
  if (f.message.length > LIMITS.message) e.message = `Message must be ${LIMITS.message} characters or fewer.`;
  return e;
}

export function buildRepresentation(f: RepFields) {
  const mobile = normalizeMobile(f.mobile);
  const category = f.category || "General Representation";
  const subject = `Representation: ${category} - ${f.name.trim()}`;
  const body = [
    "To the Office of Dr. Nalamasa Srikanth Goud, Ph.D.",
    "",
    `Full Name: ${f.name.trim()}`,
    `Mobile: +91 ${mobile ?? f.mobile.trim()}`,
    `Email: ${f.email.trim() || "Not provided"}`,
    `Constituency: ${f.constituency || "Not specified"}`,
    `Subject / Category: ${category}`,
    "",
    "Message / Representation:",
    f.message.trim() || "(No message provided)",
  ].join("\n");
  return { subject, body };
}

export function mailtoHref(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
