export interface CollectConfiguration {
  Id: string;
  name: string;
  startDate: string | null;
  /** in hours */
  timespan: number;
}
