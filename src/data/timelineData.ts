export type TimelineCategory = "student" | "jagruthi" | "national" | "party";

export interface TimelineMilestone {
  id: string;
  year: string;
  role: string;
  org: string;
  narrative: string;
  categories: TimelineCategory[];
}

export const TIMELINE_FILTERS: { id: "all" | TimelineCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "student", label: "Student Movement" },
  { id: "jagruthi", label: "Telangana Jagruthi" },
  { id: "national", label: "National Roles" },
  { id: "party", label: "Party Leadership" },
];

export const timelineData: TimelineMilestone[] = [
  { id: "2001-sfi", year: "2001", role: "Student Activism", org: "SFI · Mahabubabad", categories: ["student"],
    narrative: "Joined the Students' Federation of India in Mahabubabad and began organizing student welfare drives, his first step into public life." },
  { id: "2004-statehood", year: "2004", role: "Statehood Movement", org: "BRS (TRS) · TRSV", categories: ["student", "party"],
    narrative: "Joined BRS (then TRS) during the Telangana statehood movement and actively led TRSV student rallies." },
  { id: "2004-trsv-incharge", year: "2004–2010", role: "TRSV District Incharge", org: "TRSV · Joint Warangal District", categories: ["student", "party"],
    narrative: "As District Incharge of TRSV, mobilized youth networks across the joint Warangal district." },
  { id: "2009-ku-vp", year: "2009–2011", role: "Vice President, Kakatiya University", org: "Kakatiya University", categories: ["student"],
    narrative: "Served as Vice President at Kakatiya University, working on campus governance and on hostel and scholarship welfare for students." },
  { id: "2011-state-secretary", year: "2011", role: "State Secretary, BRS & Association with Telangana Jagruthi", org: "BRS · Telangana Jagruthi", categories: ["party", "jagruthi"],
    narrative: "Took on the role of State Secretary in BRS and began his association with Telangana Jagruthi." },
  { id: "2011-jagruthi-warangal", year: "2011–2014", role: "Warangal District President, Telangana Jagruthi", org: "Telangana Jagruthi · Warangal", categories: ["jagruthi"],
    narrative: "Led Telangana Jagruthi in Warangal district, driving its cultural expansion and organizing youth camps." },
  { id: "2014-balkonda", year: "2014", role: "Assembly Incharge, Balkonda", org: "BRS · Balkonda", categories: ["party"],
    narrative: "As Assembly Incharge for Balkonda, coordinated more than 100 youth leaders in the campaign for the parliamentary victory." },
  { id: "2015-tjvs", year: "2015", role: "President, Telangana Jagruthi Vidyarthi Samaikya (TJVS)", org: "TJVS · Telangana Jagruthi", categories: ["jagruthi", "student"],
    narrative: "Appointed President of Telangana Jagruthi Vidyarthi Samaikya, the student wing of Telangana Jagruthi." },
  { id: "2015-jagruthi-state", year: "2015–2018", role: "State President, Telangana Jagruthi", org: "Telangana Jagruthi · State", categories: ["jagruthi"],
    narrative: "As State President of Telangana Jagruthi, led the organization's statewide structuring." },
  { id: "2020-consumer", year: "2020", role: "National Chairman, World Consumer Rights & NCRC State Chairman", org: "World Consumer Rights · NCRC", categories: ["national"],
    narrative: "Became National Chairman of World Consumer Rights and State Chairman of NCRC, leading nationwide campaigns and serving as a COVID-19 warrior." },
  { id: "2025-trs", year: "2025–2026", role: "Mahabubabad District Incharge & State Official Spokesperson", org: "Telangana Rakshana Sena (TRS)", categories: ["party"],
    narrative: "Serves Telangana Rakshana Sena as Mahabubabad District Incharge and as State Official Spokesperson." },
];
