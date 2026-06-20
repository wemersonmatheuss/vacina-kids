import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent {
  @Input() variant: 'card-grid' | 'dashboard' | 'detail' | 'vaccine-grid' = 'card-grid';
  @Input() count = 3;

  get items(): number[] {
    return Array.from({ length: this.count }, (_, index) => index);
  }
}
