<script>
  import { createEventDispatcher } from 'svelte';
  import { getPUUIDFromRiotID, getMatchData, getMatchHistory } from './api/riot-api.js'; 
  const dispatch = createEventDispatcher();

  let summonerInput = '';
    let region = '';

  let puuid = '';
  let error = '';

  async function handleSearch() {
    try {
      error = '';
      if (!summonerInput.includes('#')) {
        throw new Error("Use format: GameName#TagLine");
      }
      if (!region) {
        throw new Error("Please select a region");
      }
      const [gameName, tagLine] = summonerInput.split('#');
	  const cluster = getRoutingValue(region);
      puuid = await getPUUIDFromRiotID(cluster, gameName, tagLine);
	  
      dispatch('searchComplete', { puuid, cluster });
	  
    } catch (err) {
      error = err.message;
    }
  }
  function getRoutingValue(region) {
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
		return 'sea'

    default:
      throw new Error(`Invalid region code: ${region}`);
  }}

export async function showMatchHistory(region, puuid) {
	const cluster = getRoutingValue(region)
	try {
		const matchIds = await getMatchHistory(cluster, puuid);


		const matchDataList = await Promise.all(
			matchIds.map(matchId => getMatchData(cluster, matchId))
		);
		console.log(matchDataList)

		return matchDataList;

	} catch (err) {
		console.error("Error fetching match history:", err);
		return [];
	}
}
	function showDashboard() {
	}
</script>

<form on:submit|preventDefault={handleSearch}>
  <label class="neumorphic-label" for="summonerName">Summoner Name:</label>
  <input
    id="summonerName"
    bind:value={summonerInput}
    placeholder="Faker#KR1"
    class="neumorphic-input"
    required
  />

  <label class="neumorphic-label" for="region">Region:</label>
  <select id="region" bind:value={region} class="neumorphic-select" required>
    <option disabled value="">-- Choose Region --</option>
    <option value="br1">Brazil</option>
    <option value="eun1">Europe Nordic & East</option>
    <option value="euw1">Europe West</option>
    <option value="jp1">Japan</option>
    <option value="kr">Korea</option>
    <option value="la1">Latin America North</option>
    <option value="la2">Latin America South</option>
    <option value="na1">North America</option>
    <option value="oc1">Oceania</option>
    <option value="ph2">Philippines</option>
    <option value="ru">Russia</option>
    <option value="sg2">Singapore</option>
    <option value="tr1">Turkey</option>
  </select>

  <button type="submit" class="neumorphic-btn">Search Summoner</button>
</form>
{#if puuid}
	<div >
		<button class="neumorphic-btn" on:click={() => showMatchHistory(region, puuid)}>
  Show Match History
</button>

		<button class="neumorphic-btn" on:click={showDashboard}>
			Show Dashboard
		</button>
	</div>
{/if}
{#if error}
  <p style="color: red;">{error}</p>
{/if}
<style>
	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.neumorphic-btn {
		font-size: 15px;
		border: none;
		padding: 10px 30px;
		border-radius: 40px;
		color: #6d7587;
		background-color: var(--back-color, #ebf5fc);
		box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
					-7px -7px 20px rgba(255, 255, 255, 1),
					inset 0px 0px 4px rgba(255, 255, 255, 0.2),
					inset 7px 7px 15px rgba(55, 84, 170, 0),
					inset -7px -7px 20px rgba(255, 255, 255, 0),
					0px 0px 4px rgba(255, 255, 255, 0) !important;
		cursor: pointer;
		transition: box-shadow 0.25s ease !important;
	}
	.neumorphic-btn:active {
		box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15),
					-7px -7px 20px rgba(255, 255, 255, 1),
					inset 0px 0px 4px rgba(255, 255, 255, 0),
					inset 7px 7px 15px rgba(55, 84, 170, 0.15),
					inset -7px -7px 20px rgba(255, 255, 255, 1),
					0px 0px 4px rgba(255, 255, 255, 0.2) !important;
	}
</style>
<!-- <style>
.container-01 .neumorphic-card.win {
  background-color: #d7ffd6; 
}

.container-01 .neumorphic-card.loss {
  background-color: #ffd6d6; 
}

	.container-01 .neumorphic-card {
		width: 320px;
		height: 500px;
		margin: 28px;
		padding: 40px 30px;
		background: #ebf5fc;
		border-radius: 40px;
		box-shadow: -6px -6px 20px rgba(255, 255, 255, 1), 6px 6px 20px rgba(0, 0, 0, 0.1);
	}
	.container-01 .neumorphic-card:hover {
		box-shadow: inset -6px -6px 10px rgba(255, 255, 255, 0.5),
			inset 6px 6px 20px rgba(0, 0, 0, 0.05);
	}
	.container-01 .neumorphic-card .imgBox {
		position: relative;
		text-align: center;
	}
	.container-01 .neumorphic-card .imgBox i {
		font-size: max(80px);
		color: #32a3b1;
	}
	.container-01 .neumorphic-card .contentBox {
		position: relative;
		margin-top: 20px;
		text-align: center;
	}
	.container-01 .neumorphic-card .contentBox h3 {
		color: #32a3b1;
		font-weight: 700;
		letter-spacing: 2px;
		font-size: 1.4em;
	}
	.container-01 .neumorphic-card:hover .imgBox,
	.container-01 .neumorphic-card:hover .contentBox {
		transform: scale(0.98);
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		max-width: 300px;
		margin-top: 2em;
	}

	input,
	select,
	button {
		padding: 0.5em;
	}

	button {
		cursor: pointer;
	}
	.neumorphic-select {
		height: 30px;
		background-color: var(--back-color);
		border-radius: 10px;
		border: 3px solid #f3f4f7;
		box-shadow: 2px 2px 3px rgba(55, 84, 170, 0.15), inset 0px 0px 4px rgba(255, 255, 255, 0),
			inset 7px 7px 15px rgba(55, 84, 170, 0.15), inset -7px -7px 20px rgba(255, 255, 255, 1),
			0px 0px 4px rgba(255, 255, 255, 0.2) !important;
		padding: 5px 15px;
		outline: none !important;
		color: #535d74;
	}
	.neumorphic-input {
		background-color: var(--back-color);
		border-radius: 10px;
		border: 3px solid #f3f4f7;
		box-shadow: 2px 2px 3px rgba(55, 84, 170, 0.15), inset 0px 0px 4px rgba(255, 255, 255, 0),
			inset 7px 7px 15px rgba(55, 84, 170, 0.15), inset -7px -7px 20px rgba(255, 255, 255, 1),
			0px 0px 4px rgba(255, 255, 255, 0.2) !important;
		padding: 5px 15px;
		outline: none !important;
		color: #535d74;
	}
	.neumorphic-label {
		color: #868b98;
		display: block;
		text-align: start;
		margin: 25px 10px 5px;
	}
	.neumorphic-btn {
		font-size: 15px;
		border: none;
		padding: 10px 40px;
		border-radius: 40px;
		color: #6d7587;
		background-color: var(--back-color);
		box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15), -7px -7px 20px rgba(255, 255, 255, 1),
			inset 0px 0px 4px rgba(255, 255, 255, 0.2), inset 7px 7px 15px rgba(55, 84, 170, 0),
			inset -7px -7px 20px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0) !important;
		transition: box-shadow 0.25s ease !important;
	}
	.neumorphic-btn:active {
		box-shadow: 7px 7px 15px rgba(55, 84, 170, 0.15), -7px -7px 20px rgba(255, 255, 255, 1),
			inset 0px 0px 4px rgba(255, 255, 255, 0), inset 7px 7px 15px rgba(55, 84, 170, 0.15),
			inset -7px -7px 20px rgba(255, 255, 255, 1), 0px 0px 4px rgba(255, 255, 255, 0.2) !important;
	}
</style> -->