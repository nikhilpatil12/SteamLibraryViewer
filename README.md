# Steam Library Viewer

##### Welcome to the Steam Library Viewer project! This project enables you to view your Steam library through a user-friendly web interface.

The project is divided into two main components: the Express API and the SvelteKit app.

## Demo

Check out the live demo of the Steam Library Viewer at [steamapp.nikpatil.com](https://steamapp.nikpatil.com). Feel free to explore the interface and see how it works!

---

#### Express API (api directory)

##### The Express API serves as the backend for fetching and handling data from the Steam API. To run the API, follow these steps:

1. Navigate to the `api` directory in your terminal.
2. Run `npm install` to install the necessary dependencies.
3. Create a `.env` file in the `api` directory and provide the following details:
   ```env
   API_KEY='YOUR_STEAM_API_KEY'
   MY_SECRET_KEY='SELF_GENERATED_SECRET_KEY'
   APP_URL='http://localhost:5173'
   API_URL='http://localhost:3000'
   ```
   ###### IMPORTANT: Change `APP_URL` & `API_URL` to your URLs
4. After the installation is complete, start the API by running:

   ```bash
   node index.js
   ```

The API will be accessible at `http://localhost:3000`.

#### SvelteKit App (slv-ui directory)

##### The SvelteKit app provides a dynamic and interactive user interface to view your Steam library. To run the app, follow these steps:

1. Navigate to the `slv-ui` directory in your terminal.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the `slv-ui` directory and provide the following details:
   ```env
   API_KEY='YOUR_STEAM_API_KEY'
   ```
4. After the installation is complete, start the app by running:

   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173` to access the Steam Library Viewer.

## Usage

1. Visit the web interface provided by the SvelteKit app.
2. Enter a Steam ID or Log in with your Steam account to authenticate and access your library.
3. Browse and explore your Steam library with the intuitive interface.

## Dependencies

- Node.js
- npm (Node Package Manager)
- [Steam API](https://developer.valvesoftware.com/wiki/Steam_Web_API) - Used for fetching data from the Steam platform.

## Built With

[![Angular][express-logo]][express-url]
[![SvelteKit][sveltekit-logo]][sveltekit-url]
[![Flowbite Svelte][flowbite-svelte-logo]][flowbite-svelte-logo]
[![Tailwind CSS][tailwindcss-logo]][tailwindcss-url]
[![Steam API][steam-logo]][steam-url]

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Follow the standard GitHub workflow for contributions.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the license terms.

# Happy gaming! 🎮

<!-- MARKDOWN LINKS & IMAGES -->

[express-logo]: https://img.shields.io/badge/Express%20JS-DD3399?style=for-the-badge&logo=express
[express-url]: https://expressjs.com/
[tailwindcss-logo]: https://img.shields.io/badge/Tailwind%20CSS-434343?style=for-the-badge&logo=tailwindcss
[tailwindcss-url]: https://tailwindcss.com/
[sveltekit-logo]: https://img.shields.io/badge/SvelteKit-434343?style=for-the-badge&logo=svelte
[sveltekit-url]: https://svelte.dev/
[flowbite-svelte-logo]: https://img.shields.io/badge/Flowbite%20Svelte-fc6f03?style=for-the-badge
[flowbite-svelte-url]: https://flowbite-svelte.com/
[steam-logo]: https://img.shields.io/badge/steam%20API-0066FF?style=for-the-badge&logo=steam
[steam-url]: https://flowbite-svelte.com/
