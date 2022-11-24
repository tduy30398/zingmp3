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
            },
            colors: {
                'primary-color-1': '#CA4974',
                'primary-color-2': '#411636',
                'primary-color-3': '#4C1A3F',
                'primary-color-4': '#4B2240',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
