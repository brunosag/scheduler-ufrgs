import clientPromise from '@/lib/mongodb';

export async function GET(request, { params }) {
  const id = decodeURIComponent(params.id);

  const client = await clientPromise;
  const db = client.db('db');

  const result = await db.collection('cadeiras').findOne({ _id: id });
  const cadeiras = result ? result.cadeiras : [];

  return Response.json(cadeiras);
}
