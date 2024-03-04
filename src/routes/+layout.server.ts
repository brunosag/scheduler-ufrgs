import db from '$lib/server/db';

export async function load() {
	const cursos = (await db.collection('cursos').find().project({ _id: 0 }).toArray()).map(
		(item) => item as Curso
	);

	return { cursos };
}
