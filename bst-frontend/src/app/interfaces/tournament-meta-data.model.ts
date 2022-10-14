import { EventMetaData } from "./event-meta-data.model"
import { TournamentAdmin } from "./tournament-admin-data.model"

export interface TournamentMetaData {
  tournamentId: string,
  tournamentName: string,
  tournamentType: string,
  institutionHosting: string,
  location: string,
  hostingDate: string,
  state: string,
  detailsOfEvents: EventMetaData[],
  tournamentAdmins: TournamentAdmin[]

  /* // TODO revamp this object, need to create a new object that tracks user-specific tournament
        TODO meta data like is this person signed up for this event, is this person eligible for said event, etc.
  */
}
