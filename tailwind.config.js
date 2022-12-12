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
                'primary-color-5': '#542E4A',
                'primary-color-6': '#825F79',
                'primary-color-7': '#FFFFFF',
                'opacity-color-1': 'hsla(0,0%,100%,.15);',
            },
            textColor: {
                'text-color-primary-1': '#CA4974',
                'text-color-primary-2': '#E9638F',
                'text-color-1': '#DADADA',
                'text-color-2': '#FFFFFF',
                'text-color-3': '#FFFFFF80',
            },
            borderColor: {
                'border-color-1': '#5D3953',
                'border-color-2': 'hsla(0,0%,100%,0.05)',
            },
            flex: {
                4: '4 1 0%',
                5: '5 1 0%',
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
