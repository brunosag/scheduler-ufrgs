import db from '$lib/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function () {
	const cursos = await db.collection('cursos').find().toArray();

	return new Response(JSON.stringify(cursos));
};
