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
          ],
        },
      ],
    }),
    react(),
  ],
});