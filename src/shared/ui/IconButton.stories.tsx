import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Shared UI/IconButton',
  component: IconButton,
  args: {
    'aria-label': 'Open options',
    icon: <span aria-hidden>⋯</span>,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
