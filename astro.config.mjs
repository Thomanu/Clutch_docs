import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Clutch Design System',
      customCss: ['./src/styles/custom.css'],
      components: {
        ThemeSelect: './src/components/EmptyThemeSelect.astro',
      },
      sidebar: [
        {
          label: 'Foundations',
          items: [
            { label: 'Couleurs', link: '/foundations/couleurs/' },
            { label: 'Typographie', link: '/foundations/typographie/' },
          ],
        },
        {
          label: 'Composants',
          items: [
            { label: 'Button', link: '/composants/button/' },
            { label: 'Input', link: '/composants/input/' },
            { label: 'Game Badge', link: '/composants/game-badge/' },
            { label: 'Status Badge', link: '/composants/status-badge/' },
            { label: 'State Badge', link: '/composants/state-badge/' },
            { label: 'Avatar', link: '/composants/avatar/' },
            { label: 'Toggle', link: '/composants/toggle/' },
            { label: 'Tab', link: '/composants/tab/' },
            { label: 'Progress Bar', link: '/composants/progress-bar/' },
            { label: 'Stepper', link: '/composants/stepper/' },
            { label: 'Stat Card', link: '/composants/stat-card/' },
            { label: 'Event Card', link: '/composants/event-card/' },
            { label: 'Player Row', link: '/composants/player-row/' },
            { label: 'Team Card', link: '/composants/team-card/' },
            { label: 'Map Card', link: '/composants/map-card/' },
            { label: 'Tournament Row', link: '/composants/tournament-row/' },
            { label: 'Notification Item', link: '/composants/notification-item/' },
            { label: 'Bracket Match', link: '/composants/bracket-match/' },
            { label: 'Modal', link: '/composants/modal/' },
            { label: 'Empty State', link: '/composants/empty-state/' },
          ],
        },
      ],
    }),
    react(),
  ],
});