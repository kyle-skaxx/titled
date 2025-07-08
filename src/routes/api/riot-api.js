import axios from 'axios';

const RIOT_API_KEY = 'RGAPI-3cae3b77-5fd3-4d6d-9878-76ad80cd363e';

const headers = {
  headers: {
    'X-Riot-Token': RIOT_API_KEY
  }
};

export async function getPUUIDFromRiotID(region, gameName, tagLine) {
  if (region === 'sea') {
  region = 'asia';
  }
  const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName
  )}/${encodeURIComponent(tagLine)}`;
  const response = await axios.get(url, headers);
  
  return response.data.puuid;
}

export async function getMatchHistory(cluster, puuid) {

  const url = `https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`;
  const response = await axios.get(url, headers);

  return response.data;
}

export async function getMatchData(cluster, matchId) {
  const url = `https://${cluster}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
  const response = await axios.get(url, headers);

  return response.data;
}

