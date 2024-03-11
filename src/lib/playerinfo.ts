/* eslint-disable @typescript-eslint/no-unsafe-return */
// To parse this data:
//
//   import { Convert, PlayerInfo } from "./file";
//
//   const playerInfo = Convert.toPlayerInfo(json);

export type PlayerInfo = {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: FullTeamName;
  firstName: BirthCity;
  lastName: BirthCity;
  teamLogo: string;
  sweaterNumber: number;
  position: string;
  headshot: string;
  heroImage: string;
  heightInInches: number;
  heightInCentimeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  birthDate: Date;
  birthCity: BirthCity;
  birthStateProvince: BirthCity;
  birthCountry: string;
  shootsCatches: string;
  draftDetails: DraftDetails;
  playerSlug: string;
  inTop100AllTime: number;
  inHHOF: number;
  featuredStats: FeaturedStats;
  careerTotals: CareerTotals;
  shopLink: string;
  twitterLink: string;
  watchLink: string;
  last5Games: Last5Game[];
  seasonTotals: Playoffs[];
  awards: Award[];
  currentTeamRoster: CurrentTeamRoster[];
};

export type Award = {
  trophy: FullTeamName;
  seasons: Season[];
};

export type Season = {
  seasonId: number;
  gamesPlayed: number;
  gameTypeId: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  hits: number;
  blockedShots: number;
  pim: number;
};

export type FullTeamName = {
  default: string;
  fr?: string;
};

export type BirthCity = {
  default: string;
};

export type CareerTotals = {
  regularSeason: Playoffs;
  playoffs: Playoffs;
};

export type Playoffs = {
  gamesPlayed: number;
  goals: number;
  assists: number;
  pim?: number;
  points: number;
  plusMinus?: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  shorthandedPoints?: number;
  gameWinningGoals?: number;
  otGoals?: number;
  shots?: number;
  shootingPctg?: number;
  faceoffWinningPctg?: number;
  avgToi?: string;
  shorthandedGoals?: number;
  gameTypeId?: number;
  leagueAbbrev?: string;
  season?: number;
  sequence?: number;
  teamName?: TeamName;
};

export type TeamName = {
  default: string;
  cs?: string;
  de?: string;
  fi?: string;
  sk?: string;
  sv?: string;
  fr?: string;
};

export type CurrentTeamRoster = {
  playerId: number;
  lastName: LastName;
  firstName: BirthCity;
  playerSlug: string;
};

export type LastName = {
  default: string;
  sv?: string;
};

export type DraftDetails = {
  year: number;
  teamAbbrev: string;
  round: number;
  pickInRound: number;
  overallPick: number;
};

export type FeaturedStats = {
  season: number;
  regularSeason: RegularSeason;
};

export type RegularSeason = {
  subSeason: Playoffs;
  career: Playoffs;
};

export type Last5Game = {
  assists: number;
  gameDate: Date;
  gameId: number;
  gameTypeId: number;
  goals: number;
  homeRoadFlag: string;
  opponentAbbrev: string;
  pim: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  shifts: number;
  shorthandedGoals: number;
  shots: number;
  teamAbbrev: string;
  toi: string;
};

// Converts JSON strings to/from your types
export class PlayerConverter {
  public static toPlayerInfo(json: string): PlayerInfo {
    return JSON.parse(json);
  }

  public static playerInfoToJson(value: PlayerInfo): string {
    return JSON.stringify(value);
  }

  public static toAward(json: string): Award {
    return JSON.parse(json);
  }

  public static awardToJson(value: Award): string {
    return JSON.stringify(value);
  }

  public static toSeason(json: string): Season {
    return JSON.parse(json);
  }

  public static seasonToJson(value: Season): string {
    return JSON.stringify(value);
  }

  public static toFullTeamName(json: string): FullTeamName {
    return JSON.parse(json);
  }

  public static fullTeamNameToJson(value: FullTeamName): string {
    return JSON.stringify(value);
  }

  public static toBirthCity(json: string): BirthCity {
    return JSON.parse(json);
  }

  public static birthCityToJson(value: BirthCity): string {
    return JSON.stringify(value);
  }

  public static toCareerTotals(json: string): CareerTotals {
    return JSON.parse(json);
  }

  public static careerTotalsToJson(value: CareerTotals): string {
    return JSON.stringify(value);
  }

  public static toPlayoffs(json: string): Playoffs {
    return JSON.parse(json);
  }

  public static playoffsToJson(value: Playoffs): string {
    return JSON.stringify(value);
  }

  public static toTeamName(json: string): TeamName {
    return JSON.parse(json);
  }

  public static teamNameToJson(value: TeamName): string {
    return JSON.stringify(value);
  }

  public static toCurrentTeamRoster(json: string): CurrentTeamRoster {
    return JSON.parse(json);
  }

  public static currentTeamRosterToJson(value: CurrentTeamRoster): string {
    return JSON.stringify(value);
  }

  public static toLastName(json: string): LastName {
    return JSON.parse(json);
  }

  public static lastNameToJson(value: LastName): string {
    return JSON.stringify(value);
  }

  public static toDraftDetails(json: string): DraftDetails {
    return JSON.parse(json);
  }

  public static draftDetailsToJson(value: DraftDetails): string {
    return JSON.stringify(value);
  }

  public static toFeaturedStats(json: string): FeaturedStats {
    return JSON.parse(json);
  }

  public static featuredStatsToJson(value: FeaturedStats): string {
    return JSON.stringify(value);
  }

  public static toRegularSeason(json: string): RegularSeason {
    return JSON.parse(json);
  }

  public static regularSeasonToJson(value: RegularSeason): string {
    return JSON.stringify(value);
  }

  public static toLast5Game(json: string): Last5Game {
    return JSON.parse(json);
  }

  public static last5GameToJson(value: Last5Game): string {
    return JSON.stringify(value);
  }
}
