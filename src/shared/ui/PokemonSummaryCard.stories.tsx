import type { Meta, StoryObj } from '@storybook/react';
import { PokemonSummaryCard } from './PokemonSummaryCard';

const meta: Meta<typeof PokemonSummaryCard> = {
  title: 'Shared UI/PokemonSummaryCard',
  component: PokemonSummaryCard,
  args: {
    id: '#025',
    name: 'Pikachu',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['Electric'],
  },
};

export default meta;
type Story = StoryObj<typeof PokemonSummaryCard>;

export const StaticCard: Story = {};

export const AsLink: Story = {
  args: {
    href: '/pokedex/25',
  },
};
