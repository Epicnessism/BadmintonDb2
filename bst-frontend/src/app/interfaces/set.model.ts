export interface Set {
  completed: boolean,
  eventId: string,
  eventGameNumber: number,
  gameType: string,
  setId: string,
  t1_names: string[],
  t1_player_ids: string[],
  t1_pts: string[][],
  t2_names: string[],
  t2_player_ids: string[],
  t2_pts: string[][],
  winningTeam: string,
  createdTimestamp: string
}
