/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.jsx', './src/Homescreen.jsx', './src/Login.jsx', './index.html'],
  theme: {
    extend: {
        'animation': {
        'gradient-x':'gradient-x 15s ease infinite',
        'gradient-y':'gradient-y 15s ease infinite',
        'gradient-xy':'gradient-xy 15s ease infinite',
        },
        'keyframes': {
            'gradient-y': {
                '0%, 100%': {
                    'background-size':'400% 400%',
                    'background-position': 'center top'
                },
                '50%': {
                    'background-size':'200% 200%',
                    'background-position': 'center center'
                }
            },
            'gradient-x': {
                '0%, 100%': {
                    'background-size':'200% 200%',
                    'background-position': 'left center'
                },
                '50%': {
                    'background-size':'200% 200%',
                    'background-position': 'right center'
                }
            },
            'gradient-xy': {
                '0%, 100%': {
                    'background-size':'400% 400%',
                    'background-position': 'left center'
                },
                '50%': {
                    'background-size':'200% 200%',
                    'background-position': 'right center'
                }
            }
        },
        theme: {
            fontFamily: {
                'Oswald': ['Oswald', 'sans-serif'],
                'Merriweather': ['Merriweather', 'sans-serif']
            }
        }
    },
  },
  plugins: [require("daisyui")],
}
