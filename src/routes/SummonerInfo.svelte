`<script>
  export let summonerData;
  export let LOL_version;
</script>



`<section class="dashboard">
  <div class="summoner-info">
      <img
          src="http://ddragon.leagueoflegends.com/cdn/{LOL_version}/img/profileicon/{summonerData.profileIconId}.png"
          alt="Profile Icon"
          class="profile-icon"
      />
      <h1>{summonerData.name}</h1>
      <p>Summoner Level: {summonerData.summonerLevel}</p>
  </div>

  <div class="stats">
      <div class="win-stat neumorphic-card">
          <h2>Wins</h2>
          <p>69</p>
      </div>
      <div class="loss-stat neumorphic-card">
          <h2>Losses</h2>
          <p>69</p>
      </div>
  </div>
</section>

<style>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.summoner-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-icon {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: -6px -6px 20px rgba(255,255,255,1),
              6px 6px 20px rgba(0,0,0,0.1);
}

.stats {
  display: flex;
  gap: 20px;
}

.neumorphic-card {
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ebf5fc;
  border-radius: 20px;
  box-shadow: -6px -6px 20px rgba(255,255,255,1),
              6px 6px 20px rgba(0,0,0,0.1);
}
.neumorphic-card.win {
  background-color: #d7ffd6;
}

 .neumorphic-card.loss {
  background-color: #ffd6d6; /* red for loss */
}
</style>