/** @type {import('./$types').PageServerLoad} */

// export async function load({ fetch }) {
// 	const res = await fetch(
// 		'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9CCBC64E857A8786B7B141037F569F1D&steamid=76561198396219496&format=json&include_appinfo=1&include_played_free_games=1',
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
