/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "IvanRoschin",
        mongodb_password: "s3x5x8kcWKeA6xnv",
        mongodb_clustername: "cluster0",
        mongodb_database: "next-blog",

        cloudinary_cloud_name: "dpltl4y25",
        cloudinary_api_key: "214448749211124",
        cloudinary_api_secret: "Za4zx_oTF_rahUh_rsQVNx-ryHE",
      },
      reactStrictMode: true,
    };
  }

  return {
    env: {
      mongodb_username: "IvanRoschin",
      mongodb_password: "s3x5x8kcWKeA6xnv",
      mongodb_clustername: "cluster0",
      mongodb_database: "next-blog",
    },
    reactStrictMode: true,
    // basePath: "/next-blog",
  };
};
