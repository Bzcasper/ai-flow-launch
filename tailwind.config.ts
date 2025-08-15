import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'primary': 'var(--shadow-primary)',
				'card': 'var(--shadow-card)',
				'glow': 'var(--shadow-glow)'
			},
			transitionTimingFunction: {
				'spring-bounce': 'var(--spring-bounce)',
				'spring-smooth': 'var(--spring-smooth)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'spring-modal': {
					'0%': {
						transform: 'scale(0.95) translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1) translateY(0)',
						opacity: '1'
					}
				},
				'stagger-fade': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(262 83% 70% / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(262 83% 70% / 0.6)'
					}
				},
				'bounce-micro': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-2px)'
					}
				},
				'upload-success': {
					'0%': {
						transform: 'scale(1)',
						backgroundColor: 'hsl(var(--muted))'
					},
					'50%': {
						transform: 'scale(1.05)',
						backgroundColor: 'hsl(var(--primary))'
					},
					'100%': {
						transform: 'scale(1)',
						backgroundColor: 'hsl(var(--muted))'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'spring-modal': 'spring-modal 0.5s var(--spring-bounce)',
				'stagger-fade': 'stagger-fade 0.4s var(--spring-smooth)',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'bounce-micro': 'bounce-micro 0.3s ease-out',
				'upload-success': 'upload-success 0.6s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
