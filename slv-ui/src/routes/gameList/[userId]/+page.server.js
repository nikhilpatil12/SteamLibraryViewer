import { API_KEY } from '$env/static/private';
/**
 * @type {{ user: any; status: number; data: any; }}
 */
let reponseData;
export async function load({ params }) {
	// console.log(params);
	// console.log(params.userId);
	const res = await fetch(
		'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=' +
			API_KEY +
			'&steamid=' +
			[params.userId] +
			'&format=json&include_appinfo=1&include_played_free_games=1',
		{
			method: 'GET'
		}
	)
		.then((res) => {
			if (!res.ok) {
				reponseData = {
					user: '0',
					status: 404,
					data: { response: { message: 'Invalid Steam ID', games: [] } }
				};
				throw new Error('Something went wrong!');
			}
			return res.json();
		})
		.then((data) => {
			console.log('data');
			console.log(data);
			if (data.response && Object.keys(data.response).length != 0) {
				reponseData = {
					user: params.userId,
					status: 200,
					data: data
				};
			} else if (data.response && Object.keys(data.response).length == 0) {
				console.log('ahaijhi');
				reponseData = {
					user: params.userId,
					status: 401,
					data: { response: { message: 'Empty Steam Library or private library', games: [] } }
				};
				console.log('Empty library');
			} else {
				reponseData = {
					user: params.userId,
					status: 404,
					data: { response: { message: 'Invalid Steam ID', games: [] } }
				};
			}
		})
		.catch((error) => {
			console.log(error);
		});
	return {
		allData: reponseData
		// two: new Promise((fulfil) => {
		// 	setTimeout(() => {
		// 		fulfil(3);
		// 	}, 6000);
		// })
	};
}
