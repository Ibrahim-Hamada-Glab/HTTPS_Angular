import { Component, DestroyRef, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../../services/places.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [
    PlacesComponent,
    PlacesContainerComponent,
    MatProgressSpinnerModule,
  ],
})
export class AvailablePlacesComponent {
  private destroyRef = inject(DestroyRef);
  constructor(public placesService: PlacesService) {
    this.placesService
      .loadAvailablePlaces()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onSelectPlace(place: Place) {
    this.placesService
      .updateUserPlaces(place.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
