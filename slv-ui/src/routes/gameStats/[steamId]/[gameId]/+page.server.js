import { API_KEY } from '$env/static/private';
export async function load({ params }) {
	// console.log(params);
	console.log(params.gameId);
	console.log(params.steamId);
	let gameid = params.gameId;
	let steamid = params.steamId;
	const res = await fetch(
		'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' +
			API_KEY +
			'&steamid=' +
			steamid +
			'&format=json&include_appinfo=1&include_played_free_games=1',
		{
			method: 'GET'
		}
	);

	// href={'https://store.steampowered.com/app/' + d.appid}
	const data = await res.json();
	console.log(JSON.stringify(data));
	if (Object.keys(data).length != 0) {
		var games = data.response.games;
		console.log(games);
		// @ts-ignore
		var game = games.find((g) => g.appid == gameid);
		console.log(game);
		return {
			gameid: gameid,
			steamid: steamid,
			data: game,
			status: 200
		};
	} else
		return {
			gameid: gameid,
			steamid: steamid,
			data: 'No Player Stats',
			status: 404
		};
}
