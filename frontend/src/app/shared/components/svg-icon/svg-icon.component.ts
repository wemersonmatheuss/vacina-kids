import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { svgIcone } from '@edusites/icons/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  template: `<span class="svg-icon" [innerHTML]="svgContent"></span>`,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
      }

      .svg-icon {
        display: inline-flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent implements OnChanges {
  @Input({ required: true }) nome!: string;
  @Input() cor?: string;
  @Input() tamanho = 24;

  svgContent: SafeHtml = '';

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    const svg = svgIcone({
      nome: this.nome,
      cor: this.cor,
      tamanho: this.tamanho,
    });

    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg ?? '');
  }
}
