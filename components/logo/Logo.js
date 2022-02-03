import React from 'react';
import Image from 'next/image';
const Logo = ({ extraMargin }) => {
  return (
    <Image
      className={`max-h-16 py-1 ${extraMargin}`}
      height={64}
      width={153.6}
      src="/images/AsburyLogoFull.png"
      alt="Asbury Logo"
    />
  );
};

export default Logo;
