import { FC } from 'react';
import * as Flags from 'Assets';

export const getFlag = (country: string): JSX.Element | null => {
  const icon = (Flags as never)[country.toLowerCase()];
  if (icon) {
    const CountryFlag: FC = (Flags as never)[country.toLowerCase()];
    // @ts-ignore
    return <CountryFlag style={{ width: '32px', marginRight: '8px' }} />;
  }
  return null;
};

export default getFlag;
