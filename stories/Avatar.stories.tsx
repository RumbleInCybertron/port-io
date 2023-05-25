import { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';

export default {
  title: 'Example/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Ranni',
};

export const WithImage = Template.bind({});
WithImage.args = {
  name: 'Ranni',
  shape: 'circle',
  image: {
    src: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    width: 1,
    height: 1,
  },
}