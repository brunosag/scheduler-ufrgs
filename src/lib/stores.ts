import { writable } from 'svelte/store';

export const cursos = writable<Curso[]>([]);
export const selectedCurso = writable<Curso | undefined>(undefined);