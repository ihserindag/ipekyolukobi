import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import modernTheme from '../theme';

// Legacy Themes Adaptive Mapping
const createThemeVariant = (name, colors) => {
    // Base modern theme clone
    const base = JSON.parse(JSON.stringify(modernTheme));

    // Override specific values
    base.colors = { ...base.colors, ...colors.colors };
    base.background = { ...base.background, ...colors.background };
    base.text = { ...base.text, ...colors.text };
    base.name = name; // Add name property

    return base;
};

const themes = {
    modern: { ...modernTheme, name: 'Modern Premium' },

    nightBlue: createThemeVariant('Gece Mavisi', {
        colors: {
            primary: '#5b9bd5',
            primaryGradient: 'linear-gradient(135deg, #5b9bd5 0%, #3a7bc0 100%)',
            secondary: '#7b8fce',
        },
        background: {
            main: '#0c1929',
            paper: '#1a2f4a',
            card: '#112236',
            cardHover: '#162a45',
            sidebar: '#0f172a',
            input: 'rgba(100,150,200,0.12)',
            header: 'rgba(12, 25, 41, 0.8)',
        },
        text: {
            primary: '#c5d5e8',
            secondary: '#8aa4c4',
            muted: '#607d9c',
        }
    }),

    forest: createThemeVariant('Orman', {
        colors: {
            primary: '#4ade80',
            primaryGradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            secondary: '#86efac',
        },
        background: {
            main: '#1c2a1c',
            paper: '#243524',
            card: '#2a3f2a',
            cardHover: '#324a32',
            sidebar: '#182518',
            input: 'rgba(60,100,60,0.2)',
            header: 'rgba(28, 42, 28, 0.8)',
        },
        text: {
            primary: '#e0efe0',
            secondary: '#a0c4a0',
            muted: '#6e8c6e',
        }
    }),

    sepia: createThemeVariant('Sepya', {
        colors: {
            primary: '#a67c52',
            primaryGradient: 'linear-gradient(135deg, #a67c52 0%, #8b6f5c 100%)',
        },
        background: {
            main: '#f5f0e6',
            paper: '#fff8f0',
            card: '#fffdf9',
            cardHover: '#fffaf5',
            sidebar: '#fbf7f2',
            input: 'rgba(139,119,90,0.12)',
            header: 'rgba(245, 240, 230, 0.8)',
        },
        text: {
            primary: '#5c4d3c',
            secondary: '#8b7355',
            muted: '#b09b85',
        }
    })
};

const useThemeStore = create(
    persist(
        (set) => ({
            currentThemeKey: 'modern',
            theme: themes.modern,
            availableThemes: themes,

            setTheme: (key) => {
                if (themes[key]) {
                    set({ currentThemeKey: key, theme: themes[key] });
                }
            }
        }),
        {
            name: 'kobi-crm-theme',
        }
    )
);

export default useThemeStore;
