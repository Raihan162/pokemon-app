import type { Meta, StoryObj } from '@storybook/react';
import { SecondaryButton } from './SecondaryButton';

const meta: Meta<typeof SecondaryButton> = {
  title: 'Shared UI/SecondaryButton',
  component: SecondaryButton,
  args: {
    children: 'Secondary Action',
  },
};

export default meta;
type Story = StoryObj<typeof SecondaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
