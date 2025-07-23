import React from 'react';
import { toChecksumHexAddress } from '@geralapp/controller-utils';
import { AvatarAccount, Box, Text } from '../../component-library';
import {
  BlockSize,
  Display,
  JustifyContent,
  FlexDirection,
  AlignItems,
  TextVariant,
  TextAlign,
} from '../../../helpers/constants/design-system';
import { shortenAddress } from '../../../helpers/utils/util';

export type NotificationsSettingsAccountProps = {
  address: string;
};

export function NotificationsSettingsAccount({ address }: NotificationsSettingsAccountProps) {
    const checksumAddress = toChecksumHexAddress(address);
    return (
        <Box display={Display.Flex} flexDirection={FlexDirection.Row} alignItems={AlignItems.center} gap={4}>
            <AvatarAccount address={checksumAddress} />
            <Box
                display={Display.Flex}
                flexDirection={FlexDirection.Column}
                alignItems={AlignItems.flexStart}
                justifyContent={JustifyContent.spaceBetween}
                width="100%"
            >
                <Text variant="bodyLgMedium" textAlign="left">{checksumAddress}</Text>
                <Text variant="bodyMd" textAlign="left" color="#666"> {shortenAddress(checksumAddress)}</Text>
            </Box>
        </Box>
    );
};
