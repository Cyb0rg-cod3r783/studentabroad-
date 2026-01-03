/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                primary: '#4353FF',
                secondary: '#1A1B4B',
            }
        },
    },
    plugins: [],
}
