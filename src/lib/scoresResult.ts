/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// To parse this data:
//
//   import { Convert, ScoresResult } from "./file";
//
//   const scoresResult = Convert.toScoresResult(json);

export type ScoresResult = {
  prevDate: Date;
  currentDate: Date;
  nextDate: Date;
  gameWeek: GameWeek[];
  oddsPartners: OddsPartner[];
  games: Game[];
};

export type GameWeek = {
  date: Date;
  dayAbbrev: string;
  numberOfGames: number;
};

export type Game = {
  id: number;
  season: number;
  gameType: number;
  gameDate: Date;
  venue: Venue;
  startTimeUTC: Date;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: TvBroadcast[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: Team;
  homeTeam: Team;
  gameCenterLink: string;
  threeMinRecap: string;
  clock: Clock;
  neutralSite: boolean;
  venueTimezone: string;
  period: number;
  periodDescriptor: PeriodDescriptor;
  gameOutcome: GameOutcome;
  goals: Goal[];
  threeMinRecapFr?: string;
  situation?: Situation;
};

export type Situation = {
  homeTeam: SituationHomeTeam;
  awayTeam: SituationAwayTeam;
  situationCode: string;
  timeRemaining: string;
  secondsRemaining: number;
};

export type SituationAwayTeam = {
  abbrev: string;
  situationDescriptions: string[];
  strength: number;
};

export type SituationHomeTeam = {
  abbrev: string;
  situationDescriptions: string[];
  strength: number;
};

export type Team = {
  id: number;
  name: Venue;
  abbrev: string;
  score: number;
  sog: number;
  logo: string;
};

export type Venue = {
  default: string;
};

export type Clock = {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
};

export type GameOutcome = {
  lastPeriodType: string;
};

export type Goal = {
  period: number;
  periodDescriptor: PeriodDescriptor;
  timeInPeriod: string;
  playerId: number;
  name: LastNameClass;
  firstName: FirstName;
  lastName: LastNameClass;
  goalModifier: string;
  assists: Assist[];
  mugshot: string;
  teamAbbrev: string;
  goalsToDate: number;
  awayScore: number;
  homeScore: number;
  strength: string;
  highlightClip: number;
  highlightClipFr?: number;
};

export type Assist = {
  playerId: number;
  name: AssistName;
  assistsToDate: number;
};

export type AssistName = {
  default: string;
  cs?: string;
  fi?: string;
  sk?: string;
  de?: string;
  sv?: string;
};

export type FirstName = {
  default: string;
  cs?: string;
  fi?: string;
  sk?: string;
};

export type LastNameClass = {
  default: string;
  cs?: string;
};

export type PeriodDescriptor = {
  number: number;
  periodType: string;
};

export type TvBroadcast = {
  id: number;
  market: string;
  countryCode: string;
  network: string;
  sequenceNumber: number;
};

export type OddsPartner = {
  partnerId: number;
  country: string;
  name: string;
  imageUrl: string;
  siteUrl?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toScoresResult(json: string): ScoresResult {
    return JSON.parse(json);
  }

  public static scoresResultToJson(value: ScoresResult): string {
    return JSON.stringify(value);
  }

  public static toGameWeek(json: string): GameWeek {
    return JSON.parse(json);
  }

  public static gameWeekToJson(value: GameWeek): string {
    return JSON.stringify(value);
  }

  public static toGame(json: string): Game {
    return JSON.parse(json);
  }

  public static gameToJson(value: Game): string {
    return JSON.stringify(value);
  }

  public static toTeam(json: string): Team {
    return JSON.parse(json);
  }

  public static teamToJson(value: Team): string {
    return JSON.stringify(value);
  }

  public static toVenue(json: string): Venue {
    return JSON.parse(json);
  }

  public static venueToJson(value: Venue): string {
    return JSON.stringify(value);
  }

  public static toClock(json: string): Clock {
    return JSON.parse(json);
  }

  public static clockToJson(value: Clock): string {
    return JSON.stringify(value);
  }

  public static toGameOutcome(json: string): GameOutcome {
    return JSON.parse(json);
  }

  public static gameOutcomeToJson(value: GameOutcome): string {
    return JSON.stringify(value);
  }

  public static toGoal(json: string): Goal {
    return JSON.parse(json);
  }

  public static goalToJson(value: Goal): string {
    return JSON.stringify(value);
  }

  public static toAssist(json: string): Assist {
    return JSON.parse(json);
  }

  public static assistToJson(value: Assist): string {
    return JSON.stringify(value);
  }

  public static toAssistName(json: string): AssistName {
    return JSON.parse(json);
  }

  public static assistNameToJson(value: AssistName): string {
    return JSON.stringify(value);
  }

  public static toFirstName(json: string): FirstName {
    return JSON.parse(json);
  }

  public static firstNameToJson(value: FirstName): string {
    return JSON.stringify(value);
  }

  public static toLastNameClass(json: string): LastNameClass {
    return JSON.parse(json);
  }

  public static lastNameClassToJson(value: LastNameClass): string {
    return JSON.stringify(value);
  }

  public static toPeriodDescriptor(json: string): PeriodDescriptor {
    return JSON.parse(json);
  }

  public static periodDescriptorToJson(value: PeriodDescriptor): string {
    return JSON.stringify(value);
  }

  public static toTvBroadcast(json: string): TvBroadcast {
    return JSON.parse(json);
  }

  public static tvBroadcastToJson(value: TvBroadcast): string {
    return JSON.stringify(value);
  }

  public static toOddsPartner(json: string): OddsPartner {
    return JSON.parse(json);
  }

  public static oddsPartnerToJson(value: OddsPartner): string {
    return JSON.stringify(value);
  }
}
