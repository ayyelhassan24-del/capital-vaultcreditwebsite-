import { LENDERS, LenderCriteria, MatchStatus } from "./lender-data";

export interface ClientProfile {
  ficoBand: string; // 'below-580' | '580-649' | '650-699' | '700-749' | '750+'
  monthlyRevenue: number;
  tibMonths: number;
  positions: number;
  industry: string;
}

export interface LenderMatch {
  lender: LenderCriteria;
  status: MatchStatus;
  flags: string[];
  submissionOrder: number;
}

export interface PredictorResult {
  track: 1 | 2 | 3 | 4;
  trackReason: string;
  rankedLenders: LenderMatch[];
  stopReason?: string;
}

const FICO_BAND_MIN: Record<string, number> = {
  "below-580": 500,
  "580-649": 580,
  "650-699": 650,
  "680+": 680,
  "700-749": 700,
  "750+": 750,
};

function ficoBandMeetsMinimum(
  clientBand: string,
  lenderMinBand: string | null
): boolean {
  if (!lenderMinBand) return true;
  const clientMin = FICO_BAND_MIN[clientBand] ?? 0;
  const lenderMin = FICO_BAND_MIN[lenderMinBand] ?? 0;
  return clientMin >= lenderMin;
}

function industryMatches(
  industry: string,
  list: string[]
): boolean {
  const norm = industry.toLowerCase().trim();
  return list.some(
    (item) => norm.includes(item.toLowerCase()) || item.toLowerCase().includes(norm)
  );
}

export function predictLenders(profile: ClientProfile): PredictorResult {
  const { ficoBand, monthlyRevenue, tibMonths, positions, industry } = profile;

  // Hard stop — revenue too low for business funding
  if (monthlyRevenue < 15000) {
    return {
      track: 3,
      trackReason: "Revenue under $15K/mo — credit stack only. Revisit in 90 days.",
      rankedLenders: [],
      stopReason: "Revenue too low for business funding. Card stack or wait.",
    };
  }

  // Track assignment
  let track: 1 | 2 | 3 | 4;
  let trackReason: string;

  if (positions >= 2) {
    track = 4;
    trackReason = `${positions} existing positions — consolidation only. No new origination.`;
  } else if (tibMonths < 12 || ficoBand === "below-580") {
    track = 3;
    trackReason =
      tibMonths < 12
        ? `TIB ${tibMonths} months (under 12) — credit union card stack track.`
        : "FICO below 580 — credit union card stack track.";
  } else if (ficoBand === "580-649" || tibMonths < 24) {
    track = 2;
    trackReason =
      ficoBand === "580-649"
        ? "FICO 580–649 — MCA/revenue-based only. No bank term loans."
        : `TIB ${tibMonths} months (under 2 years) — MCA only.`;
  } else if (monthlyRevenue >= 30000) {
    track = 1;
    trackReason = "FICO 650+, TIB 2yr+, Revenue $30K+, 0–1 positions — Full Stack.";
  } else {
    track = 2;
    trackReason = "Revenue under $30K/mo — MCA/revenue-based only.";
  }

  if (track === 4) {
    return { track, trackReason, rankedLenders: [] };
  }

  const matches: LenderMatch[] = LENDERS.filter((l) => l.isActive)
    .filter((l) => l.tracks.includes(track))
    .map((l) => {
      const flags: string[] = [];
      let status: MatchStatus = "COMPAT";

      if (!ficoBandMeetsMinimum(ficoBand, l.minFicoBand)) {
        flags.push(`Requires FICO ${l.minFicoBand}+, client is ${ficoBand}`);
        status = "NO";
      }

      if (tibMonths < l.minTibMonths) {
        flags.push(
          `Requires ${l.minTibMonths}mo TIB, client has ${tibMonths}mo`
        );
        status = "NO";
      }

      if (positions > l.maxPositions) {
        flags.push(`Max ${l.maxPositions} positions, client has ${positions}`);
        status = "NO";
      }

      if (
        l.excludedIndustries.length > 0 &&
        industryMatches(industry, l.excludedIndustries)
      ) {
        flags.push(`${industry} is on ${l.name}'s decline list`);
        status = "NO";
      }

      if (l.requiredIndustries && !industryMatches(industry, l.requiredIndustries)) {
        flags.push(`${l.name} only funds: ${l.requiredIndustries.join(", ")}`);
        status = "NO";
      }

      if (status === "COMPAT" && l.requiresRelationship) {
        flags.push("Requires established relationship / volume — submit after easy wins");
        status = "POSSIBLE";
      }

      return { lender: l, status, flags, submissionOrder: l.submissionOrder };
    });

  const statusOrder: Record<MatchStatus, number> = {
    COMPAT: 0,
    POSSIBLE: 1,
    NO: 2,
  };

  matches.sort((a, b) => {
    const diff = statusOrder[a.status] - statusOrder[b.status];
    return diff !== 0 ? diff : a.submissionOrder - b.submissionOrder;
  });

  return { track, trackReason, rankedLenders: matches };
}
