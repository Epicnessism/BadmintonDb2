import { EventBracketMetaData } from "./event-brackets-meta-data.model";

export interface EventMetaData {
  id: number,
  event_id: string,
  tournament_id: string,
  event_type: string,
  event_size: number,
  event_name: string,
  best_of: number,
  is_doubles: boolean,
  state: string,
  eventBracketMetaData?: EventBracketMetaData[]
}
