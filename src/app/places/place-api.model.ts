import { Place } from './place.model';

/**
 * API Response interfaces - These define the contract between frontend and backend.
 *
 * IMPORTANT: These MUST match what the backend actually returns.
 * If the backend changes, these interfaces must be updated.
 */

/**
 * Response from GET /places
 */
export interface PlacesResponse {
  places: Place[];
}

/**
 * Response from GET /user-places
 * NOTE: Currently returns { places } but PUT/DELETE return { userPlaces }
 * This inconsistency should be fixed in the backend for consistency.
 */
export interface UserPlacesGetResponse {
  places: Place[];
}

/**
 * Response from PUT /user-places and DELETE /user-places/:id
 * NOTE: Uses 'userPlaces' while GET uses 'places' - inconsistent!
 */
export interface UserPlacesUpdateResponse {
  userPlaces: Place[];
}
