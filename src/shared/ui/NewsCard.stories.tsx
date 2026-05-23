import type { Meta, StoryObj } from '@storybook/react';
import { NewsCard } from './NewsCard';

const meta: Meta<typeof NewsCard> = {
  title: 'Shared UI/NewsCard',
  component: NewsCard,
  args: {
    title: 'Pokemon Day Event Starts This Weekend',
    date: '2026-05-23',
    pokemonName: 'Pikachu',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    accentGradient: 'from-yellow-300 to-amber-400',
  },
};

export default meta;
type Story = StoryObj<typeof NewsCard>;

export const Default: Story = {};

export const LoadingState: Story = {
  args: {
    isImageLoaded: false,
  },
};
