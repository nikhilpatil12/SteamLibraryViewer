import { API_KEY } from '$env/static/private';
export async function load({ params }) {
	// console.log(params);
	console.log(params.userId);
	console.log(params.userId);
	const res = await fetch(
		'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' +
			API_KEY +
			'&steamid=' +
			[params.userId] +
			'&format=json&include_appinfo=1&include_played_free_games=1',
		{
			method: 'GET'
		}
	);

	const data = await res.json();
	console.log(JSON.stringify(data));
	return {
		user: params.userId,
		data: data
	};
}
