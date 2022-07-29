export interface TournamentMetaData {
  id: number,
  tournamentId: string,
  tournamentName: string,
  tournamentType: string,
  institutionHosting: string,
  location: string,
  hostingDate: string,
  state: string,

  eventId: string,
  eventName: string,
  eventSize: number,
  eventType: string
  eventIsDoubles: boolean

  /* // TODO revamp this object, need to create a new object that tracks user-specific tournament
        TODO meta data like is this person signed up for this event, is this person eligible for said event, etc.
  */
}
