export interface Set {
  completed: boolean,
  eventGameNumber: number,
  bracketId: string,
  gameType: string,
  setId: string,
  team_1_names: string[],
  team_1_player_ids: string[],
  team_1_points: string[][],
  team_2_names: string[],
  team_2_player_ids: string[],
  team_2_points: string[][],
  team_1_id: string,
  team_2_id: string,
  winningTeam: number,
  createdTimestamp: string
}
