import db from '$lib/server/db';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function ({ params }) {
	const cursoValue = params.value;

	const result = await db.collection('cadeiras').findOne({ curso_value: cursoValue });
	const cadeiras = result ? result.cadeiras : [];

	return new Response(JSON.stringify(cadeiras));
};
