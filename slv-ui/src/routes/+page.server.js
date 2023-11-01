/** @type {import('./$types').PageServerLoad} */
import { API_KEY } from '$env/static/private';
export async function load({ fetch }) {
	const res = await fetch('https://steamapi.nikpatil.com/profile', {
		method: 'GET',
		credentials: 'include'
	});

	const data = await res.json();
	console.log(data);
	return {
		data: data
	};
}
