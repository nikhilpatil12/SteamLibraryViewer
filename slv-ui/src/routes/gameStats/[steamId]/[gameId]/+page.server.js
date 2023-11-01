import { API_KEY } from '$env/static/private';
export async function load({ params }) {
	// console.log(params);
	console.log(params.gameId);
	console.log(params.steamId);
	let gameid = params.gameId;
	let steamid = params.steamId;
	const res = await fetch(
		'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=' +
			[gameid] +
			'&key=' +
			API_KEY +
			'&steamid=' +
			steamid,
		{
			method: 'GET'
		}
	);

	// href={'https://store.steampowered.com/app/' + d.appid}
	const data = await res.json();
	console.log(JSON.stringify(data));
	if (Object.keys(data).length != 0)
		return {
			gameid: gameid,
			data: data,
			status: 200
		};
	else
		return {
			gameid: gameid,
			data: 'No Player Stats',
			status: 404
		};
}
