/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        hostname: "assets.nhle.com",
      },
    ],
  },
};

import withPWA from "next-pwa";

const pwa = withPWA({
  // next.js config
  register: true,
  skipWaiting: true,
  dest: "public",
});

export default pwa(config);
