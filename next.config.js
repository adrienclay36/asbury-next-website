

/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
  "@fullcalendar/list",
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "jmnsjblfovgbschcmyzc.supabase.co",
    ],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
});
