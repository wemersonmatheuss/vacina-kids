declare module '@edusites/icons/core' {
  export interface SvgIconeOptions {
    nome: string;
    cor?: string;
    tamanho?: number | string;
    className?: string;
  }

  export function svgIcone(options: SvgIconeOptions): string | null;
  export function listarIcones(): string[];
  export function temIcone(nome: string): boolean;
  export function listarCategorias(): string[];
  export function categoriaDoIcone(nome: string): string;
  export function iconesPorCategoria(): Record<string, string[]>;
  export function buscarIcones(termo: string): string[];
}
