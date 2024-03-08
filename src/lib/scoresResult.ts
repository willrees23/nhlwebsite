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
  prevDate?: Date;
  currentDate?: Date;
  nextDate?: Date;
  gameWeek?: GameWeek[];
  oddsPartners?: OddsPartner[];
  games?: Game[];
};

export type GameWeek = {
  date?: Date;
  dayAbbrev?: string;
  numberOfGames?: number;
};

export type Game = {
  id?: number;
  season?: number;
  gameType?: number;
  gameDate?: Date;
  venue?: Venue;
  startTimeUTC?: Date;
  easternUTCOffset?: string;
  venueUTCOffset?: string;
  tvBroadcasts?: TvBroadcast[];
  gameState?: string;
  gameScheduleState?: string;
  awayTeam?: GameAwayTeam;
  homeTeam?: GameHomeTeam;
  gameCenterLink?: string;
  clock?: Clock;
  neutralSite?: boolean;
  venueTimezone?: string;
  period?: number;
  periodDescriptor?: PeriodDescriptor;
  situation?: Situation;
  teamLeaders?: TeamLeader[];
  goals?: Goal[];
  ticketsLink?: string;
};

export type GameAwayTeam = {
  id?: number;
  name?: AwayTeamName;
  abbrev?: string;
  score?: number;
  sog?: number;
  logo?: string;
  record?: string;
  odds?: Odd[];
};

export type AwayTeamName = {
  default?: string;
  fr?: string;
};

export type Odd = {
  providerId?: number;
  value?: string;
};

export type Clock = {
  timeRemaining?: string;
  secondsRemaining?: number;
  running?: boolean;
  inIntermission?: boolean;
};

export type Goal = {
  period?: number;
  periodDescriptor?: PeriodDescriptor;
  timeInPeriod?: string;
  playerId?: number;
  name?: Venue;
  firstName?: Venue;
  lastName?: Venue;
  goalModifier?: string;
  assists?: Assist[];
  mugshot?: string;
  teamAbbrev?: string;
  goalsToDate?: number;
  awayScore?: number;
  homeScore?: number;
  strength?: string;
  highlightClip?: number;
  highlightClipFr?: number;
};

export type Assist = {
  playerId?: number;
  name?: Venue;
  assistsToDate?: number;
};

export type Venue = {
  default?: string;
};

export type PeriodDescriptor = {
  number?: number;
  periodType?: string;
};

export type GameHomeTeam = {
  id?: number;
  name?: Venue;
  abbrev?: string;
  score?: number;
  sog?: number;
  logo?: string;
  record?: string;
  odds?: Odd[];
};

export type Situation = {
  homeTeam?: SituationHomeTeam;
  awayTeam?: SituationAwayTeam;
  situationCode?: string;
  timeRemaining?: string;
  secondsRemaining?: number;
};

export type SituationAwayTeam = {
  abbrev?: string;
  strength?: number;
};

export type SituationHomeTeam = {
  abbrev?: string;
  situationDescriptions?: string[];
  strength?: number;
};

export type TeamLeader = {
  id?: number;
  name?: TeamLeaderName;
  headshot?: string;
  teamAbbrev?: string;
  category?: string;
  value?: number;
};

export type TeamLeaderName = {
  default?: string;
  cs?: string;
  sk?: string;
  fi?: string;
};

export type TvBroadcast = {
  id?: number;
  market?: string;
  countryCode?: string;
  network?: string;
  sequenceNumber?: number;
};

export type OddsPartner = {
  partnerId?: number;
  country?: string;
  name?: string;
  imageUrl?: string;
  siteUrl?: string;
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
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

  public static toGameAwayTeam(json: string): GameAwayTeam {
    return cast(JSON.parse(json), r("GameAwayTeam"));
  }

  public static gameAwayTeamToJson(value: GameAwayTeam): string {
    return JSON.stringify(uncast(value, r("GameAwayTeam")), null, 2);
  }

  public static toAwayTeamName(json: string): AwayTeamName {
    return cast(JSON.parse(json), r("AwayTeamName"));
  }

  public static awayTeamNameToJson(value: AwayTeamName): string {
    return JSON.stringify(uncast(value, r("AwayTeamName")), null, 2);
  }

  public static toOdd(json: string): Odd {
    return cast(JSON.parse(json), r("Odd"));
  }

  public static oddToJson(value: Odd): string {
    return JSON.stringify(uncast(value, r("Odd")), null, 2);
  }

  public static toClock(json: string): Clock {
    return cast(JSON.parse(json), r("Clock"));
  }

  public static clockToJson(value: Clock): string {
    return JSON.stringify(uncast(value, r("Clock")), null, 2);
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

  public static toVenue(json: string): Venue {
    return cast(JSON.parse(json), r("Venue"));
  }

  public static venueToJson(value: Venue): string {
    return JSON.stringify(uncast(value, r("Venue")), null, 2);
  }

  public static toPeriodDescriptor(json: string): PeriodDescriptor {
    return cast(JSON.parse(json), r("PeriodDescriptor"));
  }

  public static periodDescriptorToJson(value: PeriodDescriptor): string {
    return JSON.stringify(uncast(value, r("PeriodDescriptor")), null, 2);
  }

  public static toGameHomeTeam(json: string): GameHomeTeam {
    return cast(JSON.parse(json), r("GameHomeTeam"));
  }

  public static gameHomeTeamToJson(value: GameHomeTeam): string {
    return JSON.stringify(uncast(value, r("GameHomeTeam")), null, 2);
  }

  public static toSituation(json: string): Situation {
    return cast(JSON.parse(json), r("Situation"));
  }

  public static situationToJson(value: Situation): string {
    return JSON.stringify(uncast(value, r("Situation")), null, 2);
  }

  public static toSituationAwayTeam(json: string): SituationAwayTeam {
    return cast(JSON.parse(json), r("SituationAwayTeam"));
  }

  public static situationAwayTeamToJson(value: SituationAwayTeam): string {
    return JSON.stringify(uncast(value, r("SituationAwayTeam")), null, 2);
  }

  public static toSituationHomeTeam(json: string): SituationHomeTeam {
    return cast(JSON.parse(json), r("SituationHomeTeam"));
  }

  public static situationHomeTeamToJson(value: SituationHomeTeam): string {
    return JSON.stringify(uncast(value, r("SituationHomeTeam")), null, 2);
  }

  public static toTeamLeader(json: string): TeamLeader {
    return cast(JSON.parse(json), r("TeamLeader"));
  }

  public static teamLeaderToJson(value: TeamLeader): string {
    return JSON.stringify(uncast(value, r("TeamLeader")), null, 2);
  }

  public static toTeamLeaderName(json: string): TeamLeaderName {
    return cast(JSON.parse(json), r("TeamLeaderName"));
  }

  public static teamLeaderNameToJson(value: TeamLeaderName): string {
    return JSON.stringify(uncast(value, r("TeamLeaderName")), null, 2);
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
      { json: "prevDate", js: "prevDate", typ: u(undefined, Date) },
      { json: "currentDate", js: "currentDate", typ: u(undefined, Date) },
      { json: "nextDate", js: "nextDate", typ: u(undefined, Date) },
      { json: "gameWeek", js: "gameWeek", typ: u(undefined, a(r("GameWeek"))) },
      {
        json: "oddsPartners",
        js: "oddsPartners",
        typ: u(undefined, a(r("OddsPartner"))),
      },
      { json: "games", js: "games", typ: u(undefined, a(r("Game"))) },
    ],
    false,
  ),
  GameWeek: o(
    [
      { json: "date", js: "date", typ: u(undefined, Date) },
      { json: "dayAbbrev", js: "dayAbbrev", typ: u(undefined, "") },
      { json: "numberOfGames", js: "numberOfGames", typ: u(undefined, 0) },
    ],
    false,
  ),
  Game: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "season", js: "season", typ: u(undefined, 0) },
      { json: "gameType", js: "gameType", typ: u(undefined, 0) },
      { json: "gameDate", js: "gameDate", typ: u(undefined, Date) },
      { json: "venue", js: "venue", typ: u(undefined, r("Venue")) },
      { json: "startTimeUTC", js: "startTimeUTC", typ: u(undefined, Date) },
      {
        json: "easternUTCOffset",
        js: "easternUTCOffset",
        typ: u(undefined, ""),
      },
      { json: "venueUTCOffset", js: "venueUTCOffset", typ: u(undefined, "") },
      {
        json: "tvBroadcasts",
        js: "tvBroadcasts",
        typ: u(undefined, a(r("TvBroadcast"))),
      },
      { json: "gameState", js: "gameState", typ: u(undefined, "") },
      {
        json: "gameScheduleState",
        js: "gameScheduleState",
        typ: u(undefined, ""),
      },
      {
        json: "awayTeam",
        js: "awayTeam",
        typ: u(undefined, r("GameAwayTeam")),
      },
      {
        json: "homeTeam",
        js: "homeTeam",
        typ: u(undefined, r("GameHomeTeam")),
      },
      { json: "gameCenterLink", js: "gameCenterLink", typ: u(undefined, "") },
      { json: "clock", js: "clock", typ: u(undefined, r("Clock")) },
      { json: "neutralSite", js: "neutralSite", typ: u(undefined, true) },
      { json: "venueTimezone", js: "venueTimezone", typ: u(undefined, "") },
      { json: "period", js: "period", typ: u(undefined, 0) },
      {
        json: "periodDescriptor",
        js: "periodDescriptor",
        typ: u(undefined, r("PeriodDescriptor")),
      },
      { json: "situation", js: "situation", typ: u(undefined, r("Situation")) },
      {
        json: "teamLeaders",
        js: "teamLeaders",
        typ: u(undefined, a(r("TeamLeader"))),
      },
      { json: "goals", js: "goals", typ: u(undefined, a(r("Goal"))) },
      { json: "ticketsLink", js: "ticketsLink", typ: u(undefined, "") },
    ],
    false,
  ),
  GameAwayTeam: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, r("AwayTeamName")) },
      { json: "abbrev", js: "abbrev", typ: u(undefined, "") },
      { json: "score", js: "score", typ: u(undefined, 0) },
      { json: "sog", js: "sog", typ: u(undefined, 0) },
      { json: "logo", js: "logo", typ: u(undefined, "") },
      { json: "record", js: "record", typ: u(undefined, "") },
      { json: "odds", js: "odds", typ: u(undefined, a(r("Odd"))) },
    ],
    false,
  ),
  AwayTeamName: o(
    [
      { json: "default", js: "default", typ: u(undefined, "") },
      { json: "fr", js: "fr", typ: u(undefined, "") },
    ],
    false,
  ),
  Odd: o(
    [
      { json: "providerId", js: "providerId", typ: u(undefined, 0) },
      { json: "value", js: "value", typ: u(undefined, "") },
    ],
    false,
  ),
  Clock: o(
    [
      { json: "timeRemaining", js: "timeRemaining", typ: u(undefined, "") },
      {
        json: "secondsRemaining",
        js: "secondsRemaining",
        typ: u(undefined, 0),
      },
      { json: "running", js: "running", typ: u(undefined, true) },
      { json: "inIntermission", js: "inIntermission", typ: u(undefined, true) },
    ],
    false,
  ),
  Goal: o(
    [
      { json: "period", js: "period", typ: u(undefined, 0) },
      {
        json: "periodDescriptor",
        js: "periodDescriptor",
        typ: u(undefined, r("PeriodDescriptor")),
      },
      { json: "timeInPeriod", js: "timeInPeriod", typ: u(undefined, "") },
      { json: "playerId", js: "playerId", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, r("Venue")) },
      { json: "firstName", js: "firstName", typ: u(undefined, r("Venue")) },
      { json: "lastName", js: "lastName", typ: u(undefined, r("Venue")) },
      { json: "goalModifier", js: "goalModifier", typ: u(undefined, "") },
      { json: "assists", js: "assists", typ: u(undefined, a(r("Assist"))) },
      { json: "mugshot", js: "mugshot", typ: u(undefined, "") },
      { json: "teamAbbrev", js: "teamAbbrev", typ: u(undefined, "") },
      { json: "goalsToDate", js: "goalsToDate", typ: u(undefined, 0) },
      { json: "awayScore", js: "awayScore", typ: u(undefined, 0) },
      { json: "homeScore", js: "homeScore", typ: u(undefined, 0) },
      { json: "strength", js: "strength", typ: u(undefined, "") },
      { json: "highlightClip", js: "highlightClip", typ: u(undefined, 0) },
      { json: "highlightClipFr", js: "highlightClipFr", typ: u(undefined, 0) },
    ],
    false,
  ),
  Assist: o(
    [
      { json: "playerId", js: "playerId", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, r("Venue")) },
      { json: "assistsToDate", js: "assistsToDate", typ: u(undefined, 0) },
    ],
    false,
  ),
  Venue: o([{ json: "default", js: "default", typ: u(undefined, "") }], false),
  PeriodDescriptor: o(
    [
      { json: "number", js: "number", typ: u(undefined, 0) },
      { json: "periodType", js: "periodType", typ: u(undefined, "") },
    ],
    false,
  ),
  GameHomeTeam: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, r("Venue")) },
      { json: "abbrev", js: "abbrev", typ: u(undefined, "") },
      { json: "score", js: "score", typ: u(undefined, 0) },
      { json: "sog", js: "sog", typ: u(undefined, 0) },
      { json: "logo", js: "logo", typ: u(undefined, "") },
      { json: "record", js: "record", typ: u(undefined, "") },
      { json: "odds", js: "odds", typ: u(undefined, a(r("Odd"))) },
    ],
    false,
  ),
  Situation: o(
    [
      {
        json: "homeTeam",
        js: "homeTeam",
        typ: u(undefined, r("SituationHomeTeam")),
      },
      {
        json: "awayTeam",
        js: "awayTeam",
        typ: u(undefined, r("SituationAwayTeam")),
      },
      { json: "situationCode", js: "situationCode", typ: u(undefined, "") },
      { json: "timeRemaining", js: "timeRemaining", typ: u(undefined, "") },
      {
        json: "secondsRemaining",
        js: "secondsRemaining",
        typ: u(undefined, 0),
      },
    ],
    false,
  ),
  SituationAwayTeam: o(
    [
      { json: "abbrev", js: "abbrev", typ: u(undefined, "") },
      { json: "strength", js: "strength", typ: u(undefined, 0) },
    ],
    false,
  ),
  SituationHomeTeam: o(
    [
      { json: "abbrev", js: "abbrev", typ: u(undefined, "") },
      {
        json: "situationDescriptions",
        js: "situationDescriptions",
        typ: u(undefined, a("")),
      },
      { json: "strength", js: "strength", typ: u(undefined, 0) },
    ],
    false,
  ),
  TeamLeader: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, r("TeamLeaderName")) },
      { json: "headshot", js: "headshot", typ: u(undefined, "") },
      { json: "teamAbbrev", js: "teamAbbrev", typ: u(undefined, "") },
      { json: "category", js: "category", typ: u(undefined, "") },
      { json: "value", js: "value", typ: u(undefined, 0) },
    ],
    false,
  ),
  TeamLeaderName: o(
    [
      { json: "default", js: "default", typ: u(undefined, "") },
      { json: "cs", js: "cs", typ: u(undefined, "") },
      { json: "sk", js: "sk", typ: u(undefined, "") },
      { json: "fi", js: "fi", typ: u(undefined, "") },
    ],
    false,
  ),
  TvBroadcast: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "market", js: "market", typ: u(undefined, "") },
      { json: "countryCode", js: "countryCode", typ: u(undefined, "") },
      { json: "network", js: "network", typ: u(undefined, "") },
      { json: "sequenceNumber", js: "sequenceNumber", typ: u(undefined, 0) },
    ],
    false,
  ),
  OddsPartner: o(
    [
      { json: "partnerId", js: "partnerId", typ: u(undefined, 0) },
      { json: "country", js: "country", typ: u(undefined, "") },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "imageUrl", js: "imageUrl", typ: u(undefined, "") },
      { json: "siteUrl", js: "siteUrl", typ: u(undefined, "") },
      { json: "bgColor", js: "bgColor", typ: u(undefined, "") },
      { json: "textColor", js: "textColor", typ: u(undefined, "") },
      { json: "accentColor", js: "accentColor", typ: u(undefined, "") },
    ],
    false,
  ),
};
