import type { Meta, StoryObj } from '@storybook/react';
import { PrimaryButton } from './PrimaryButton';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Shared UI/PrimaryButton',
  component: PrimaryButton,
  args: {
    children: 'Primary Action',
  },
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
