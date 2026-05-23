import type { Meta, StoryObj } from '@storybook/react';
import { TextLink } from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'Shared UI/TextLink',
  component: TextLink,
};

export default meta;
type Story = StoryObj<typeof TextLink>;

export const AsAnchor: Story = {
  args: {
    href: '/pokedex',
    children: 'Go to Pokedex',
  },
};

export const AsButton: Story = {
  args: {
    children: 'Inline Action',
    onClick: () => undefined,
  },
};
