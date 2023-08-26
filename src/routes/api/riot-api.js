import axios from 'axios';

const RIOT_API_KEY = 'RGAPI-55eae6ac-6a5c-4242-9402-dd0293e5e1c4';

export async function getSummonerData(region, name) {
	console.log(name, region);
	const response = await axios.get(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${RIOT_API_KEY}`
	);

	return response.data;
}

export function getRoutingValue(region) {
	switch (region) {
		case 'na1':
		case 'br1':
		case 'la1':
		case 'la2':
			return 'americas';

		case 'kr':
		case 'jp1':
			return 'asia';

		case 'eun1':
		case 'euw1':
		case 'tr1':
		case 'ru':
			return 'europe';

		case 'oc1':
		case 'ph2':
		case 'sg2':
		case 'th2':
		case 'tw2':
		case 'vn2':
			return 'sea';

		default:
			return null;
	}
}

export async function getMatchHistory(region, puuid) {
	const routingValue = getRoutingValue(region);
	const response = await axios.get(
		`https://${routingValue}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${RIOT_API_KEY}`
	);

	return response.data;
}

export async function getMatchData(routingValue, matchId) {
	const response = await axios.get(
		`https://${routingValue}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`
	);

	return response.data;
}
