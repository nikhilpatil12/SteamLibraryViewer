import { API_KEY } from '$env/static/private';
export const ssr = false;
export async function load({ params }) {
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

	const data = await res.json();
	if (Object.keys(data).length != 0) {
		var games = data.response.games;
		var game = games.find((/** @type {{ appid: any; }} */ g) => g.appid == gameid);
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
