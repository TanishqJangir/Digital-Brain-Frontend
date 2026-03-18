export function toggleTheme(btnElement?: HTMLButtonElement): void {
    if (btnElement) {
        btnElement.classList.add('animate-spin-once');
        setTimeout(() => btnElement.classList.remove('animate-spin-once'), 600);
    }
    document.documentElement.classList.toggle('dark');
}

export function isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
}
