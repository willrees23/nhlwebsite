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
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

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
  name: Name;
  firstName: FirstName;
  lastName: Name;
  goalModifier: string;
  assists: Assist[];
  mugshot: string;
  teamAbbrev: string;
  goalsToDate: number;
  awayScore: number;
  homeScore: number;
  strength: string;
  highlightClip?: number;
  highlightClipFr?: number;
};

export type Assist = {
  playerId: number;
  name: Name;
  assistsToDate: number;
};

export type Name = {
  default: string;
  cs?: string;
  fi?: string;
  sk?: string;
};

export type FirstName = {
  default: string;
  es?: string;
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
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toScoresResult(json: string): ScoresResult {
    return cast(JSON.parse(json), r("ScoresResult"));
  }

  public static scoresResultToJson(value: ScoresResult): string {
    return JSON.stringify(uncast(value, r("ScoresResult")), null, 2);
  }

  public static toGameWeek(json: string): GameWeek {
    return cast(JSON.parse(json), r("GameWeek"));
  }

  public static gameWeekToJson(value: GameWeek): string {
    return JSON.stringify(uncast(value, r("GameWeek")), null, 2);
  }

  public static toGame(json: string): Game {
    return cast(JSON.parse(json), r("Game"));
  }

  public static gameToJson(value: Game): string {
    return JSON.stringify(uncast(value, r("Game")), null, 2);
  }

  public static toTeam(json: string): Team {
    return cast(JSON.parse(json), r("Team"));
  }

  public static teamToJson(value: Team): string {
    return JSON.stringify(uncast(value, r("Team")), null, 2);
  }

  public static toVenue(json: string): Venue {
    return cast(JSON.parse(json), r("Venue"));
  }

  public static venueToJson(value: Venue): string {
    return JSON.stringify(uncast(value, r("Venue")), null, 2);
  }

  public static toClock(json: string): Clock {
    return cast(JSON.parse(json), r("Clock"));
  }

  public static clockToJson(value: Clock): string {
    return JSON.stringify(uncast(value, r("Clock")), null, 2);
  }

  public static toGameOutcome(json: string): GameOutcome {
    return cast(JSON.parse(json), r("GameOutcome"));
  }

  public static gameOutcomeToJson(value: GameOutcome): string {
    return JSON.stringify(uncast(value, r("GameOutcome")), null, 2);
  }

  public static toGoal(json: string): Goal {
    return cast(JSON.parse(json), r("Goal"));
  }

  public static goalToJson(value: Goal): string {
    return JSON.stringify(uncast(value, r("Goal")), null, 2);
  }

  public static toAssist(json: string): Assist {
    return cast(JSON.parse(json), r("Assist"));
  }

  public static assistToJson(value: Assist): string {
    return JSON.stringify(uncast(value, r("Assist")), null, 2);
  }

  public static toName(json: string): Name {
    return cast(JSON.parse(json), r("Name"));
  }

  public static nameToJson(value: Name): string {
    return JSON.stringify(uncast(value, r("Name")), null, 2);
  }

  public static toFirstName(json: string): FirstName {
    return cast(JSON.parse(json), r("FirstName"));
  }

  public static firstNameToJson(value: FirstName): string {
    return JSON.stringify(uncast(value, r("FirstName")), null, 2);
  }

  public static toPeriodDescriptor(json: string): PeriodDescriptor {
    return cast(JSON.parse(json), r("PeriodDescriptor"));
  }

  public static periodDescriptorToJson(value: PeriodDescriptor): string {
    return JSON.stringify(uncast(value, r("PeriodDescriptor")), null, 2);
  }

  public static toTvBroadcast(json: string): TvBroadcast {
    return cast(JSON.parse(json), r("TvBroadcast"));
  }

  public static tvBroadcastToJson(value: TvBroadcast): string {
    return JSON.stringify(uncast(value, r("TvBroadcast")), null, 2);
  }

  public static toOddsPartner(json: string): OddsPartner {
    return cast(JSON.parse(json), r("OddsPartner"));
  }

  public static oddsPartnerToJson(value: OddsPartner): string {
    return JSON.stringify(uncast(value, r("OddsPartner")), null, 2);
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
        result[key] = val[key];
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
  ScoresResult: o(
    [
      { json: "prevDate", js: "prevDate", typ: Date },
      { json: "currentDate", js: "currentDate", typ: Date },
      { json: "nextDate", js: "nextDate", typ: Date },
      { json: "gameWeek", js: "gameWeek", typ: a(r("GameWeek")) },
      { json: "oddsPartners", js: "oddsPartners", typ: a(r("OddsPartner")) },
      { json: "games", js: "games", typ: a(r("Game")) },
    ],
    false,
  ),
  GameWeek: o(
    [
      { json: "date", js: "date", typ: Date },
      { json: "dayAbbrev", js: "dayAbbrev", typ: "" },
      { json: "numberOfGames", js: "numberOfGames", typ: 0 },
    ],
    false,
  ),
  Game: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "season", js: "season", typ: 0 },
      { json: "gameType", js: "gameType", typ: 0 },
      { json: "gameDate", js: "gameDate", typ: Date },
      { json: "venue", js: "venue", typ: r("Venue") },
      { json: "startTimeUTC", js: "startTimeUTC", typ: Date },
      { json: "easternUTCOffset", js: "easternUTCOffset", typ: "" },
      { json: "venueUTCOffset", js: "venueUTCOffset", typ: "" },
      { json: "tvBroadcasts", js: "tvBroadcasts", typ: a(r("TvBroadcast")) },
      { json: "gameState", js: "gameState", typ: "" },
      { json: "gameScheduleState", js: "gameScheduleState", typ: "" },
      { json: "awayTeam", js: "awayTeam", typ: r("Team") },
      { json: "homeTeam", js: "homeTeam", typ: r("Team") },
      { json: "gameCenterLink", js: "gameCenterLink", typ: "" },
      { json: "threeMinRecap", js: "threeMinRecap", typ: "" },
      { json: "clock", js: "clock", typ: r("Clock") },
      { json: "neutralSite", js: "neutralSite", typ: true },
      { json: "venueTimezone", js: "venueTimezone", typ: "" },
      { json: "period", js: "period", typ: 0 },
      {
        json: "periodDescriptor",
        js: "periodDescriptor",
        typ: r("PeriodDescriptor"),
      },
      { json: "gameOutcome", js: "gameOutcome", typ: r("GameOutcome") },
      { json: "goals", js: "goals", typ: a(r("Goal")) },
      { json: "threeMinRecapFr", js: "threeMinRecapFr", typ: u(undefined, "") },
    ],
    false,
  ),
  Team: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: r("Venue") },
      { json: "abbrev", js: "abbrev", typ: "" },
      { json: "score", js: "score", typ: 0 },
      { json: "sog", js: "sog", typ: 0 },
      { json: "logo", js: "logo", typ: "" },
    ],
    false,
  ),
  Venue: o([{ json: "default", js: "default", typ: "" }], false),
  Clock: o(
    [
      { json: "timeRemaining", js: "timeRemaining", typ: "" },
      { json: "secondsRemaining", js: "secondsRemaining", typ: 0 },
      { json: "running", js: "running", typ: true },
      { json: "inIntermission", js: "inIntermission", typ: true },
    ],
    false,
  ),
  GameOutcome: o(
    [{ json: "lastPeriodType", js: "lastPeriodType", typ: "" }],
    false,
  ),
  Goal: o(
    [
      { json: "period", js: "period", typ: 0 },
      {
        json: "periodDescriptor",
        js: "periodDescriptor",
        typ: r("PeriodDescriptor"),
      },
      { json: "timeInPeriod", js: "timeInPeriod", typ: "" },
      { json: "playerId", js: "playerId", typ: 0 },
      { json: "name", js: "name", typ: r("Name") },
      { json: "firstName", js: "firstName", typ: r("FirstName") },
      { json: "lastName", js: "lastName", typ: r("Name") },
      { json: "goalModifier", js: "goalModifier", typ: "" },
      { json: "assists", js: "assists", typ: a(r("Assist")) },
      { json: "mugshot", js: "mugshot", typ: "" },
      { json: "teamAbbrev", js: "teamAbbrev", typ: "" },
      { json: "goalsToDate", js: "goalsToDate", typ: 0 },
      { json: "awayScore", js: "awayScore", typ: 0 },
      { json: "homeScore", js: "homeScore", typ: 0 },
      { json: "strength", js: "strength", typ: "" },
      { json: "highlightClip", js: "highlightClip", typ: u(undefined, 0) },
      { json: "highlightClipFr", js: "highlightClipFr", typ: u(undefined, 0) },
    ],
    false,
  ),
  Assist: o(
    [
      { json: "playerId", js: "playerId", typ: 0 },
      { json: "name", js: "name", typ: r("Name") },
      { json: "assistsToDate", js: "assistsToDate", typ: 0 },
    ],
    false,
  ),
  Name: o(
    [
      { json: "default", js: "default", typ: "" },
      { json: "cs", js: "cs", typ: u(undefined, "") },
      { json: "fi", js: "fi", typ: u(undefined, "") },
      { json: "sk", js: "sk", typ: u(undefined, "") },
    ],
    false,
  ),
  FirstName: o(
    [
      { json: "default", js: "default", typ: "" },
      { json: "es", js: "es", typ: u(undefined, "") },
    ],
    false,
  ),
  PeriodDescriptor: o(
    [
      { json: "number", js: "number", typ: 0 },
      { json: "periodType", js: "periodType", typ: "" },
    ],
    false,
  ),
  TvBroadcast: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "market", js: "market", typ: "" },
      { json: "countryCode", js: "countryCode", typ: "" },
      { json: "network", js: "network", typ: "" },
      { json: "sequenceNumber", js: "sequenceNumber", typ: 0 },
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
};
