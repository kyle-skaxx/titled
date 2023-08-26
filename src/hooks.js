export async function handle({ request, resolve }) {
	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	};
}
