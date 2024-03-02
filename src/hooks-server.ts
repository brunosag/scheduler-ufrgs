import { getRequest } from '@sveltejs/kit/node';

export async function handleCustomURL(request: Request) {
	const url = new URL(request.url);
	const pathname = url.pathname.replace(/%2F/g, '/'); // Replace %2F with /

	// Modify the pathname as needed
	url.pathname = pathname;

	const newRequest = new Request(url.toString(), { ...getRequest(request) });

	return {
		request: newRequest
	};
}
