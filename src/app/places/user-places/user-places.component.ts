import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../../services/places.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PlacesContainerComponent,
    PlacesComponent,
    MatProgressSpinnerModule,
  ],
})
export class UserPlacesComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(public placesService: PlacesService) {}

  ngOnInit(): void {
    this.placesService
      .loadUserPlaces()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onSelectPlace(place: Place) {
    this.placesService
      .removeUserPlace(place)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
