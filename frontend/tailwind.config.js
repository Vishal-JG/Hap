/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'System'],
      },
      colors: {
        background: '#121212',
        surface: '#1C1C1C',
        text: '#EDEDED',
        neonTeal: '#00FFC6',
        neonCoral: '#FF6F61',
        neonViolet: '#A070FF',
      },
      borderRadius: {
        'hap': '24px',
      },
      boxShadow: {
        'hap-teal': '0 0 20px rgba(0,255,198,0.3)',
        'hap-coral': '0 0 20px rgba(255,111,97,0.3)',
        'hap-violet': '0 0 20px rgba(160,112,255,0.3)',
      },
      spacing: {
        6: '24px', // 24px spacing system (p-6, m-6, gap-6)
      },
    },
  },
  plugins: [],
};
