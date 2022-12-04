/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            backgroundColor: {
                'primary-color-1': '#CA4974',
                'primary-color-2': '#411636',
                'primary-color-3': '#4C1A3F',
                'primary-color-4': '#4B2240',
                'opacity-color-1': 'hsla(0,0%,100%,.15);',
            },
            textColor: {
                'text-color-1': '#DADADA',
                'text-color-2': '#FFFFFF',
            },
            keyframes: {
                'slide-right': {
                    '0%': {
                        '-webkit-transform': ' translateX(-500px);',
                        transform: 'translateX(-500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left': {
                    '0%': {
                        '-webkit-transform': ' translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
                'slide-left2': {
                    '0%': {
                        '-webkit-transform': ' translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0);',
                        transform: 'translateX(0);',
                    },
                },
            },
            animation: {
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            },
        },
    },
    plugins: [],
};
