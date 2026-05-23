import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Shared UI/SearchInput',
  component: SearchInput,
  args: {
    placeholder: 'Search by name...',
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: (args) => (
    <div className='w-[320px]'>
      <SearchInput {...args} defaultValue='Pika' />
    </div>
  ),
};
