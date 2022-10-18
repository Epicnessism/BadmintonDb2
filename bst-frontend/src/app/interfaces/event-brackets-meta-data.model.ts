import { Set } from 'src/app/interfaces/set.model';

export interface EventBracketMetaData {
  id: number,
  event_id: string,
  event_name: string,
  tournament_id: string,
  bracket_id: string,
  event_type: string,
  bracket_size: number,
  bracket_level: string,
  best_of: number,
  is_doubles: boolean,
  bracketData?: Set[]
}
