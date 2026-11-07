export interface LeaderProfile {
  name: string;
  nameTe: string;
  titles: string[];
  phdSubject: string;
  almaMater: string;
  birthDate: string;
  birthPlace: string;
  parents: { father: string; mother: string };
  contact: {
    address: string;
    phone: string;
    email: string;
    regNo: string;
    digitalBioUrl: string;
    constituencies: string[];
  };
  keyStats: { value: string; label: string; sub: string }[];
}

export const leaderProfile: LeaderProfile = {
  name: "Dr. Nalamasa Srikanth Goud",
  nameTe: "డాక్టర్ నలమాస శ్రీకాంత్ గౌడ్",
  titles: [
    "State Official Spokesperson",
    "Mahabubabad District Incharge (TRS)",
    "National Chairman, World Consumer Rights",
    "Telangana State Chairman, NCRC",
  ],
  phdSubject: "Doctor of Philosophy (Ph.D.) & MTM (Tourism Management)",
  almaMater: "Kakatiya University, Warangal",
  birthDate: "1986-12-12",
  birthPlace: "Mahabubabad, Telangana",
  parents: {
    father: "Shri Nalamasa Yakaiah",
    mother: "Smt. Nalamasa Aruna",
  },
  contact: {
    address: "Plat No-4NP, PRE, Es Colony, STNO-1, Opp SSPA Academy, Boduppal, Chengicherla Road, TS-500092",
    phone: "+91 8886666006",
    email: "srikanthk.vtelangana@gmail.com",
    regNo: "TLPC-6428/648/32384",
    digitalBioUrl: "https://theleaderspage.com/dr-nalamasa-srikanth-goud/",
    constituencies: ["Mahabubabad", "Balkonda", "Armur"],
  },
  keyStats: [
    { value: "25+", label: "Years Public Service", sub: "Active since 2001 student movement" },
    { value: "Ph.D.", label: "Intellectual Rigor", sub: "Kakatiya University Alumnus" },
    { value: "100+", label: "Cadre & Youth Campaigns", sub: "Statewide grassroots mobilization" },
    { value: "National", label: "Consumer Leadership", sub: "Chairman, World Consumer Rights" },
  ],
};
