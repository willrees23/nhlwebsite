/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// To parse this data:
//
//   import { Convert, NhlResult } from "./file";
//
//   const nhlResult = Convert.toNhlResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface NhlResult {
  nextStartDate: Date;
  previousStartDate: Date;
  gameWeek: GameWeek[];
  oddsPartners: OddsPartner[];
  preSeasonStartDate: Date;
  regularSeasonStartDate: Date;
  regularSeasonEndDate: Date;
  playoffEndDate: Date;
  numberOfGames: number;
}

export interface GameWeek {
  date: Date;
  dayAbbrev: string;
  numberOfGames: number;
  games: Game[];
}

export interface Game {
  id: number;
  season: number;
  gameType: number;
  venue: Venue;
  neutralSite: boolean;
  startTimeUTC: Date;
  easternUTCOffset: UTCOffset;
  venueUTCOffset: UTCOffset;
  venueTimezone: string;
  gameState: GameState;
  gameScheduleState: GameScheduleState;
  tvBroadcasts: TvBroadcast[];
  awayTeam: Team;
  homeTeam: Team;
  periodDescriptor: PeriodDescriptor;
  gameOutcome?: GameOutcome;
  winningGoalie?: WinningGoal;
  winningGoalScorer?: WinningGoal;
  threeMinRecap?: string;
  gameCenterLink: string;
  threeMinRecapFr?: string;
  ticketsLink?: string;
}

export interface Team {
  id: number;
  placeName: PlaceName;
  abbrev: string;
  logo: string;
  darkLogo: string;
  awaySplitSquad?: boolean;
  score?: number;
  radioLink?: string;
  odds?: Odd[];
  homeSplitSquad?: boolean;
}

export interface Odd {
  providerId: number;
  value: string;
}

export interface PlaceName {
  default: string;
  fr?: string;
}

export enum UTCOffset {
  The0400 = "-04:00",
  The0500 = "-05:00",
  The0600 = "-06:00",
  The0700 = "-07:00",
  The0800 = "-08:00",
}

export interface GameOutcome {
  lastPeriodType: PeriodType;
}

export enum PeriodType {
  Reg = "REG",
  So = "SO",
}

export enum GameScheduleState {
  Ok = "OK",
}

export enum GameState {
  Pre = "PRE",
  Fut = "FUT",
  Off = "OFF",
  Live = "LIVE",
  Crit = "CRIT",
  Final = "FINAL",
}

export interface PeriodDescriptor {
  number?: number;
  periodType?: PeriodType;
}

export interface TvBroadcast {
  id: number;
  market: Market;
  countryCode: CountryCode;
  network: string;
  sequenceNumber: number;
}

export enum CountryCode {
  CA = "CA",
  Us = "US",
}

export enum Market {
  A = "A",
  H = "H",
  N = "N",
}

export interface Venue {
  default: string;
  es?: string;
  fr?: string;
}

export interface WinningGoal {
  playerId: number;
  firstInitial: FirstInitial;
  lastName: LastName;
}

export interface FirstInitial {
  default: string;
}

export interface LastName {
  default: string;
  cs?: string;
  sk?: string;
  fi?: string;
}

export interface OddsPartner {
  partnerId: number;
  country: string;
  name: string;
  imageUrl: string;
  siteUrl?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toNhlResult(json: string): NhlResult {
    return cast(JSON.parse(json), r("NhlResult"));
  }

  public static nhlResultToJson(value: NhlResult): string {
    return JSON.stringify(uncast(value, r("NhlResult")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`,
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = "",
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: Record<string, any>,
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props")
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  NhlResult: o(
    [
      { json: "nextStartDate", js: "nextStartDate", typ: Date },
      { json: "previousStartDate", js: "previousStartDate", typ: Date },
      { json: "gameWeek", js: "gameWeek", typ: a(r("GameWeek")) },
      { json: "oddsPartners", js: "oddsPartners", typ: a(r("OddsPartner")) },
      { json: "preSeasonStartDate", js: "preSeasonStartDate", typ: Date },
      {
        json: "regularSeasonStartDate",
        js: "regularSeasonStartDate",
        typ: Date,
      },
      { json: "regularSeasonEndDate", js: "regularSeasonEndDate", typ: Date },
      { json: "playoffEndDate", js: "playoffEndDate", typ: Date },
      { json: "numberOfGames", js: "numberOfGames", typ: 0 },
    ],
    false,
  ),
  GameWeek: o(
    [
      { json: "date", js: "date", typ: Date },
      { json: "dayAbbrev", js: "dayAbbrev", typ: "" },
      { json: "numberOfGames", js: "numberOfGames", typ: 0 },
      { json: "games", js: "games", typ: a(r("Game")) },
    ],
    false,
  ),
  Game: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "season", js: "season", typ: 0 },
      { json: "gameType", js: "gameType", typ: 0 },
      { json: "venue", js: "venue", typ: r("Venue") },
      { json: "neutralSite", js: "neutralSite", typ: true },
      { json: "startTimeUTC", js: "startTimeUTC", typ: Date },
      { json: "easternUTCOffset", js: "easternUTCOffset", typ: r("UTCOffset") },
      { json: "venueUTCOffset", js: "venueUTCOffset", typ: r("UTCOffset") },
      { json: "venueTimezone", js: "venueTimezone", typ: "" },
      { json: "gameState", js: "gameState", typ: r("GameState") },
      {
        json: "gameScheduleState",
        js: "gameScheduleState",
        typ: r("GameScheduleState"),
      },
      { json: "tvBroadcasts", js: "tvBroadcasts", typ: a(r("TvBroadcast")) },
      { json: "awayTeam", js: "awayTeam", typ: r("Team") },
      { json: "homeTeam", js: "homeTeam", typ: r("Team") },
      {
        json: "periodDescriptor",
        js: "periodDescriptor",
        typ: r("PeriodDescriptor"),
      },
      {
        json: "gameOutcome",
        js: "gameOutcome",
        typ: u(undefined, r("GameOutcome")),
      },
      {
        json: "winningGoalie",
        js: "winningGoalie",
        typ: u(undefined, r("WinningGoal")),
      },
      {
        json: "winningGoalScorer",
        js: "winningGoalScorer",
        typ: u(undefined, r("WinningGoal")),
      },
      { json: "threeMinRecap", js: "threeMinRecap", typ: u(undefined, "") },
      { json: "gameCenterLink", js: "gameCenterLink", typ: "" },
      { json: "threeMinRecapFr", js: "threeMinRecapFr", typ: u(undefined, "") },
      { json: "ticketsLink", js: "ticketsLink", typ: u(undefined, "") },
    ],
    false,
  ),
  Team: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "placeName", js: "placeName", typ: r("PlaceName") },
      { json: "abbrev", js: "abbrev", typ: "" },
      { json: "logo", js: "logo", typ: "" },
      { json: "darkLogo", js: "darkLogo", typ: "" },
      { json: "awaySplitSquad", js: "awaySplitSquad", typ: u(undefined, true) },
      { json: "score", js: "score", typ: u(undefined, 0) },
      { json: "radioLink", js: "radioLink", typ: u(undefined, "") },
      { json: "odds", js: "odds", typ: u(undefined, a(r("Odd"))) },
      { json: "homeSplitSquad", js: "homeSplitSquad", typ: u(undefined, true) },
    ],
    false,
  ),
  Odd: o(
    [
      { json: "providerId", js: "providerId", typ: 0 },
      { json: "value", js: "value", typ: "" },
    ],
    false,
  ),
  PlaceName: o(
    [
      { json: "default", js: "default", typ: "" },
      { json: "fr", js: "fr", typ: u(undefined, "") },
    ],
    false,
  ),
  GameOutcome: o(
    [{ json: "lastPeriodType", js: "lastPeriodType", typ: r("PeriodType") }],
    false,
  ),
  PeriodDescriptor: o(
    [
      { json: "number", js: "number", typ: u(undefined, 0) },
      {
        json: "periodType",
        js: "periodType",
        typ: u(undefined, r("PeriodType")),
      },
    ],
    false,
  ),
  TvBroadcast: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "market", js: "market", typ: r("Market") },
      { json: "countryCode", js: "countryCode", typ: r("CountryCode") },
      { json: "network", js: "network", typ: "" },
      { json: "sequenceNumber", js: "sequenceNumber", typ: 0 },
    ],
    false,
  ),
  Venue: o(
    [
      { json: "default", js: "default", typ: "" },
      { json: "es", js: "es", typ: u(undefined, "") },
      { json: "fr", js: "fr", typ: u(undefined, "") },
    ],
    false,
  ),
  WinningGoal: o(
    [
      { json: "playerId", js: "playerId", typ: 0 },
      { json: "firstInitial", js: "firstInitial", typ: r("FirstInitial") },
      { json: "lastName", js: "lastName", typ: r("LastName") },
    ],
    false,
  ),
  FirstInitial: o([{ json: "default", js: "default", typ: "" }], false),
  LastName: o(
    [
      { json: "default", js: "default", typ: "" },
      { json: "cs", js: "cs", typ: u(undefined, "") },
      { json: "sk", js: "sk", typ: u(undefined, "") },
      { json: "fi", js: "fi", typ: u(undefined, "") },
    ],
    false,
  ),
  OddsPartner: o(
    [
      { json: "partnerId", js: "partnerId", typ: 0 },
      { json: "country", js: "country", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "imageUrl", js: "imageUrl", typ: "" },
      { json: "siteUrl", js: "siteUrl", typ: u(undefined, "") },
      { json: "bgColor", js: "bgColor", typ: "" },
      { json: "textColor", js: "textColor", typ: "" },
      { json: "accentColor", js: "accentColor", typ: "" },
    ],
    false,
  ),
  UTCOffset: ["-4:00", "-05:00", "-06:00", "-07:00", "-08:00"],
  PeriodType: ["REG", "SO"],
  GameScheduleState: ["OK"],
  GameState: ["FUT", "OFF", "PRE", "LIVE", "CRIT", "FINAL"],
  CountryCode: ["CA", "US"],
  Market: ["A", "H", "N"],
};
