import { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    onChange: (checked) => console.log('Checkbox changed:', checked),
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onChange: (checked) => console.log('Checkbox changed:', checked),
  },
};
