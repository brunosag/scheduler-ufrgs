export async function getCursos() {
  const response = await fetch('api/cursos');
  const data = await response.json();
  return data;
}

export async function getCadeiras(cursoId) {
  const response = await fetch(`api/cursos/${cursoId}`);
  const data = await response.json();
  return data;
}
