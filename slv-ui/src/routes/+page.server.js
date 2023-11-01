/** @type {import('./$types').PageServerLoad} */
import { API_KEY } from '$env/static/private';
// export async function load({ fetch }) {
// 	const res = await fetch(
// 		'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key='+API_KEY+'&steamid=76561198396219496&format=json&include_appinfo=1&include_played_free_games=1',
// 		{
// 			method: 'GET'
// 		}
// 	);

// 	const data = await res.json();
// 	console.log(data);
// 	return {
// 		props: {
// 			data: data
// 		}
// 	};
// }
