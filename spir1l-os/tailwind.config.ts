import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { zcm: { hot: '#ff5533', cold: '#3366ff' } },
    },
  },
  plugins: [],
};
