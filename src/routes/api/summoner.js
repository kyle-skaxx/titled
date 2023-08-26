import { getSummonerData } from 'riot-api.js';

export async function post(request) {
	const { name, region } = request.body;
	const data = await getSummonerData(region, name);

	return { body: data };
}
