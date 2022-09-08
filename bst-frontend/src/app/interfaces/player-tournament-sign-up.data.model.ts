import { PlayerAutocompleteData } from "./player-autocomplete-data.model";

export interface PlayerTournamentSignUp {
  eventId: string,
  tournamentId: string;
  playerId: string;
  partnerName?: string;
  partnerId?: string;
  teamId?: string;
  partnerAutoCompleteResults?: PlayerAutocompleteData[];
  isSignUp: boolean;
  fullyRegistered?: boolean;

}
