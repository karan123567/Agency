// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},  // ✅ v4 way
    // NOT "tailwindcss": {} ❌
  },
};
export default config;