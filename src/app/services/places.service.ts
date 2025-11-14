import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Place } from '../places/place.model';
import {
  PlacesResponse,
  UserPlacesGetResponse,
  UserPlacesUpdateResponse,
} from '../places/place-api.model';
import { map, Observable, tap } from 'rxjs';
import { HttpServiceService } from '../core/http-service.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor(private httpService: HttpServiceService) {}

  // ==================== Signals ====================
  // Available Places State
  private availablePlaces = signal<Place[] | undefined>(undefined);
  private isLoading = signal(false);
  private error = signal<string>('');

  // User Places State
  private userPlaces = signal<Place[] | undefined>(undefined);
  private isLoadingUserPlaces = signal(false);
  private errorUserPlaces = signal<string>('');

  // ==================== Public Computed Signals ====================
  public AvailablePlaces = computed(() => this.availablePlaces());
  public IsLoading = computed(() => this.isLoading());
  public Error = computed(() => this.error());

  public UserPlaces = computed(() => this.userPlaces());
  public IsLoadingUserPlaces = computed(() => this.isLoadingUserPlaces());
  public ErrorUserPlaces = computed(() => this.errorUserPlaces());

  // ==================== Public Methods ====================
  /**
   * Loads all available places.
   * Backend contract: GET /places returns { places: Place[] }
   */
  public loadAvailablePlaces(): Observable<Place[]> {
    return this.fetchPlaces(
      'places',
      this.isLoading,
      this.error,
      this.availablePlaces,
      'Something went wrong while fetching places! Please try again later.'
    );
  }

  /**
   * Loads user's favorite places.
   * Backend contract: GET /user-places returns { places: Place[] }
   */
  public loadUserPlaces(): Observable<Place[]> {
    return this.fetchPlaces(
      'user-places',
      this.isLoadingUserPlaces,
      this.errorUserPlaces,
      this.userPlaces,
      'Something went wrong while fetching your favorite places! Please try again later.'
    );
  }

  /**
   * Adds a place to user's favorites.
   * Backend contract: PUT /user-places returns { userPlaces: Place[] }
   */
  public updateUserPlaces(placeId: string): Observable<Place[]> {
    return this.updateUserPlacesState(
      () =>
        this.httpService.put<UserPlacesUpdateResponse>(
          'user-places',
          { placeId },
          {}
        ),
      'Something went wrong while adding place to your favorites! Please try again later.'
    );
  }

  /**
   * Removes a place from user's favorites.
   * Backend contract: DELETE /user-places/:id returns { userPlaces: Place[] }
   */
  public removeUserPlace(place: Place): Observable<Place[]> {
    return this.updateUserPlacesState(
      () =>
        this.httpService.delete<UserPlacesUpdateResponse>(
          `user-places/${place.id}`
        ),
      'Something went wrong while removing place from your favorites! Please try again later.'
    );
  }

  // ==================== Private Helper Methods ====================
  /**
   * Generic method to fetch places from the API.
   * Handles loading state, error state, and updates the places signal.
   */
  private fetchPlaces(
    path: string,
    isLoading: WritableSignal<boolean>,
    errorSignal: WritableSignal<string>,
    placesSignal: WritableSignal<Place[] | undefined>,
    errorMessage: string
  ): Observable<Place[]> {
    isLoading.set(true);
    errorSignal.set('');

    return this.httpService
      .get<PlacesResponse | UserPlacesGetResponse>(path)
      .pipe(
        map((response) => response.places),
        tap({
          next: (places) => {
            placesSignal.set(places);
            isLoading.set(false);
            errorSignal.set('');
          },
          error: () => {
            isLoading.set(false);
            errorSignal.set(errorMessage);
          },
        })
      );
  }

  /**
   * Generic method to update user places state (add/remove).
   * Handles loading state, error state, and updates the user places signal.
   */
  private updateUserPlacesState(
    httpCall: () => Observable<UserPlacesUpdateResponse>,
    errorMessage: string
  ): Observable<Place[]> {
    this.isLoadingUserPlaces.set(true);
    this.errorUserPlaces.set('');

    return httpCall().pipe(
      map((response) => response.userPlaces),
      tap({
        next: (places) => {
          this.userPlaces.set(places);
          this.isLoadingUserPlaces.set(false);
          this.errorUserPlaces.set('');
        },
        error: () => {
          this.isLoadingUserPlaces.set(false);
          this.errorUserPlaces.set(errorMessage);
        },
      })
    );
  }
}
