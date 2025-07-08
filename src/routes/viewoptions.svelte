<script>
	import { createEventDispatcher } from 'svelte';

	export let puuid = '';
	const dispatch = createEventDispatcher();

	function showMatchHistory() {
		dispatch('matchHistory');
	}

	function showDashboard() {
		dispatch('dashboard');
	}
</script>




