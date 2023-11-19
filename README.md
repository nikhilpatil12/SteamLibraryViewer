# Steam Library Viewer

##### Welcome to the Steam Library Viewer project! This project enables you to view your Steam library through a user-friendly web interface.

The project is divided into two main components: the Express API and the SvelteKit app.

## Demo

Check out the live demo of the Steam Library Viewer at [steamapp.nikpatil.com](https://steamapp.nikpatil.com). Feel free to explore the interface and see how it works!

---

#### Express API (api directory)

###### The Express API serves as the backend for fetching and handling data from the Steam API. To run the API, follow these steps:

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

###### The SvelteKit app provides a dynamic and interactive user interface to view your Steam library. To run the app, follow these steps:

1. Navigate to the `slv-ui` directory in your terminal.
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the `api` directory and provide the following details:
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

### Dependencies

- Node.js
- npm (Node Package Manager)

### Contributing

Feel free to contribute to the project by submitting issues or pull requests. Follow the standard GitHub workflow for contributions.

### License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the license terms.

#### Happy gaming! 🎮
