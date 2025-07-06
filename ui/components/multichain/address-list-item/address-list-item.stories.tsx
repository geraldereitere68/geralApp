import React from 'react';
import { Box } from '../../component-library';
import { AddressListItem } from '.';

const LABEL = 'geralapp.eth';
const WRAPPER_PROPS = {
  style: {
    maxWidth: '328px',
    border: '1px solid var(--color-error-default)',
  },
};

const defaultStory = {
  title: 'Components/Multichain/AddressListItem',
  component: AddressListItem,
  argTypes: {
    label: { control: 'text' },
    address: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  args: {
    address: '0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb',
    label: LABEL,
  },
};

export default defaultStory;

const Template = (args) => (
  <Box {...WRAPPER_PROPS}>
    <AddressListItem {...args} />
  </Box>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Default';

export const ChaosStory = Template.bind({});
ChaosStory.storyName = 'Chaos';
ChaosStory.args = { label: LABEL.repeat(20) };

export const ConfusableStory = Template.bind({});
ConfusableStory.storyName = 'Confusable';
ConfusableStory.args = { label: '👻.eth' };
