export interface IActivity {
  id: string;
  stravaId: number;
  name: string;
  segmentsIds: number[];
  matchingSegmentsIds: number[];
  segmentsPictures: string[];
  transactionsHashes: string[];
  start_date: string;
}

export interface IActivityData {
  activity: IActivity;
}
