/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type NHLResult = {
  // game week is an array of days
  gameWeek: {
    date: string;
    dayAbbrev: string;
  };
  nextStartDate: string;
  numberOfGames: number;
  playoffEndDate: string;
  preSeasonStartDate: string;
  previousStartDate: string;
  regularSeasonEndDate: string;
  regularSeasonStartDate: string;
};

export type { NHLResult };
