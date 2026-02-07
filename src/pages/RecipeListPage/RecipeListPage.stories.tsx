import { Meta, StoryObj } from '@storybook/react';
import RecipeAddModal from './components/RecipeAddModal';

const meta: Meta<typeof RecipeAddModal> = {
  title: 'components/RecipeAddModal',
  component: RecipeAddModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RecipeAddModal>;

export const Default: Story = {
  args: {
    onSuccess: () => {},
  },
};
