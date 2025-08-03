// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "wallpaper-app",
    slug: "wallpaper-app",
    version: "1.0.0",
    sdkVersion: "53.0.0", // same as in previous app.json
    extra: {
      apiKey: process.env.API_KEY,
    },
  },
};
