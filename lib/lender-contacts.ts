// Lender dial map for the voice status-chase agent.
//
// Source: operations/business-lender-matrix.md (CEO Funding Database).
// Keyed by a normalized lender name so the dispatcher can resolve a phone from
// an application row's free-text `lender_name`. Phones are stored in E.164 so
// they drop straight into Retell's `to_number`.
//
// `department` is the human queue we want to reach ("funding status / underwriting").
// `ivrNotes` is the phone-menu path — LEFT EMPTY on purpose. We do not invent IVR
// trees; fill each one in as it's learned on a real call (Phase 0+). An empty
// note just means the agent listens and navigates live.

export type LenderContact = {
  /** E.164 dial number, e.g. "+18338015653" */
  phone: string;
  /** Human department/queue to ask for once connected. */
  department?: string;
  /** Known IVR menu path, e.g. "press 2 for merchant services". Empty until learned. */
  ivrNotes?: string;
};

// Normalize a lender name to a lookup key: lowercase, drop everything but a-z0-9.
export function normalizeLenderKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Keys below are already normalized. Add lenders as phones are confirmed.
export const LENDER_CONTACTS: Record<string, LenderContact> = {
  // ── Section A — Startup / 0% lines ──
  "7figuresfunding": { phone: "+18338015653", department: "partner / application status" },

  // ── Section B — Easy MCA (start here) ──
  lendini: { phone: "+18447005363", department: "submissions / funding status" },
  cfgms: { phone: "+16468803819", department: "Paul Balint / underwriting status" },
  ioufinancial: { phone: "+16784982400", department: "funding status" },
  reliantfunding: { phone: "+18445715918", department: "funding status" },
  mulliganfunding: { phone: "+18553263564", department: "funding status" },
  soscapital: { phone: "+12122355455", department: "funding status" },
  fundamentalcapital: { phone: "+18883642070", department: "funding status" },

  // ── Section B — Higher-bar MCA ──
  credibly: { phone: "+18886641444", department: "ISO relations / underwriting status" },
  kapitus: { phone: "+18007807133", department: "Paul Borghi / partner status" },
  ondeck: { phone: "+18882694246", department: "funding status" },
  "24capital": { phone: "+12122684442", department: "underwriting status" },
  "6thavecapital": { phone: "+18773764420", department: "funding status" },
  "6thavenuecapital": { phone: "+18773764420", department: "funding status" },
  tvtcapital: { phone: "+18889981674", department: "underwriting status" },
  vadermountaincapital: { phone: "+18885260187", department: "underwriting status" },
  fundkite: { phone: "+18775025003", department: "partnerships / status" },

  // ── Section B — Specialty MCA ──
  arffinancial: { phone: "+18325611424", department: "Celeste / funding status" },
  fintap: { phone: "+19737676552", department: "Avi Wernick / underwriting status" },
  tmr: { phone: "+12122209872", department: "underwriting status" },

  // ── Section C — LOC ──
  bluevine: { phone: "+16502521768", department: "Vincent Bitetto / application status" },
  fundbox: { phone: "+18555727707", department: "application status" },
  ideafinancial: { phone: "+17866860352", department: "Zachary Umansky / status" },
  greenboxcapital: { phone: "+18554423423", department: "funding status" },

  // ── Section D — SBA / Term ──
  smartbizloans: { phone: "+18662838726", department: "SBA packaging status" },
  fundingcircle: { phone: "+18553855356", department: "application status" },

  // ── Section E — Equipment / RE / specialty ──
  northmillcapital: { phone: "+16099176200", department: "Rich Flamang / status" },
  everlastingcapital: { phone: "+18887778144", department: "equipment financing status" },

  // ── Section F — Bank / credit-union business banking (VERIFIED from official domains, 2026-07-18) ──
  // Match the real queue lenders (banks/CUs, not MCA). Main business-banking lines;
  // the agent navigates the IVR to funding/loan status once connected.
  citibank: { phone: "+18002851709", department: "CitiBusiness / business banking status" }, // citi.com
  truist: { phone: "+18338665129", department: "Small Business specialist / lending status" }, // truist.com
  suntrust: { phone: "+18338665129", department: "Small Business specialist / lending status" }, // truist.com (SunTrust=Truist)
  pnc: { phone: "+18447249435", department: "Small Business banking / lending status" }, // pnc.com
  navyfederalcreditunion: { phone: "+18774181462", department: "Business Services / lending status" }, // navyfederal.org
  navyfederalbusiness: { phone: "+18774181462", department: "Business Services / lending status" },
  navyfederalbusinessmember: { phone: "+18774181462", department: "Business Services / lending status" },
  navyfederal: { phone: "+18774181462", department: "Business Services / lending status" },
  wellsfargo: { phone: "+18002255935", department: "Small Business Customer Service / lending status" }, // wellsfargo.com
  wellsfargobank: { phone: "+18002255935", department: "Small Business Customer Service / lending status" },
  usbank: { phone: "+18006733555", department: "Business banking / lending status" }, // usbank.com
  bankofamer: { phone: "+18882874637", department: "Small Business Customer Service / lending status" }, // bankofamerica.com
  bankofamerica: { phone: "+18882874637", department: "Small Business Customer Service / lending status" },
  amerisbank: { phone: "+18666166020", department: "Business Banking / lending status" }, // amerisbank.com

  // ── Section G — NEEDS VERIFICATION (low-confidence; commented so the dispatcher never dials them). Confirm on an official page or a first call, then uncomment. ──
  // fifththirdbank: { phone: "+18005437511", department: "Business banking status" },      // VERIFY
  // comerica: { phone: "+18889669900", department: "Business banking status" },            // VERIFY
  // keybank: { phone: "+18005392968", department: "Small Business / lending status" },     // VERIFY (source gave conflicting digits)
  // firstcitizensbank: { phone: "+18883234600", department: "Business banking status" },   // VERIFY
  // southstatebank: { phone: "+18002763762", department: "Business banking status" },      // VERIFY
  // vystarcreditunion: { phone: "+19047773201", department: "Business Services status" },  // VERIFY (source gave conflicting digits)
  // fairwindscreditunion: { phone: "+14076487300", department: "Business Services status" }, // VERIFY
  // midfloridacreditunion: { phone: "+18636770377", department: "Business Services status" }, // VERIFY
};

export function lookupLenderContact(lenderName: string): LenderContact | null {
  if (!lenderName) return null;
  const key = normalizeLenderKey(lenderName);
  return LENDER_CONTACTS[key] ?? null;
}
