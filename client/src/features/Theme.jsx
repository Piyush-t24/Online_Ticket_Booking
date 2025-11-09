import { useEffect, useState } from 'react';

const Theme = () => {
    const [isDark, setIsDark] = useState(false);

    // Load theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', newTheme);
    };

    return (
        <img onClick={toggleTheme} className='cursor-pointer' src={`${isDark ? "lightMode.png" : "darkMode.png"}`} width={28} height={28} alt="darkMode" />
    );
};

export default Theme;
