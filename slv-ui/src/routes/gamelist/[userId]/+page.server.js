export async function load({ params }) {
	// console.log(params);
	console.log(params.userId);
	console.log(params.userId);
	const res = await fetch(
		'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9CCBC64E857A8786B7B141037F569F1D&steamid=' +
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
