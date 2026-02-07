import { Meta, StoryObj } from '@storybook/react';
import HistoryAddModal from './HistoryAddModal';

const meta: Meta<typeof HistoryAddModal> = {
  title: 'components/HistoryAddModal',
  component: HistoryAddModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HistoryAddModal>;

export const Default: Story = {
  args: {
    onSuccess: () => {},
  },
};
