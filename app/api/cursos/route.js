import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('db');

  const cursos = await db.collection('cursos').find().toArray();

  return Response.json(cursos);
}
