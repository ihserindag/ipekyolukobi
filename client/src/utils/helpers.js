export const formatCurrency = (amount) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

export const getDaysRemaining = (date) => {
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

export const getProjeProgress = (proje) => {
    if (!proje?.asamalar?.length) return 0;
    return Math.round((proje.asamalar.filter(a => a.tamamlandi).length / proje.asamalar.length) * 100);
};

export const getAsamaColor = (asama, theme) => {
    if (asama.tamamlandi) return theme.colors.success;
    const days = getDaysRemaining(asama.planlananTarih);
    if (days === null) return theme.text.muted;
    if (days < 0) return theme.colors.danger;
    if (days <= 3) return theme.colors.warning;
    if (days <= 7) return '#eab308';
    return theme.colors.primary;
};
