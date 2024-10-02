tailwind.config = {
    theme: {
        extend: {
            keyframes: {
                pendule: {
                    '0%, 100%': { transform: 'rotate(-5deg)' },
                    '50%': { transform: 'rotate(5deg)' },
                },
            },
            animation: {
                pendule: 'pendule 5s infinite',
            },
        }
    }
}