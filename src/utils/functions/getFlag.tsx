import { FC } from 'react';
import * as Flags from 'Assets';

export const getFlag = (country: string): JSX.Element | null => {
  const Icon: FC = (Flags as { [key: string]: FC })[country?.toLowerCase()];
  // @ts-ignore
  return <Icon style={{ width: '32px', marginRight: '8px' }} />;
};

export default getFlag;
