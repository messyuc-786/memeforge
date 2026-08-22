/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#08090D',
          900: '#0F1117',
          850: '#151821',
          800: '#1C202C',
          700: '#282E3F',
          600: '#384157',
        },
        brand: {
          yellow: '#FFDD00',
          orange: '#FF5722',
          purple: '#9333EA',
          pink: '#EC4899',
          cyan: '#06B6D4',
          emerald: '#10B981',
          fire: '#FF3B30'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        impact: ['Impact', '"Arial Black"', 'sans-serif'],
        anton: ['Anton', 'Impact', 'sans-serif'],
        bangers: ['Bangers', 'cursive'],
        comic: ['"Comic Neue"', '"Comic Sans MS"', 'cursive'],
        marker: ['"Permanent Marker"', 'cursive'],
        fredoka: ['Fredoka', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        creepster: ['Creepster', 'cursive']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(255, 221, 0, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(255, 87, 34, 0.7))' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        }
      }
    },
  },
  plugins: [],
}
