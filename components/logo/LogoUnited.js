import React from 'react'
import Image from 'next/image';
const LogoUnited = ({ extraMargin }) => {
  return (
    <Image
      className={`max-h-16 py-1 cursor-pointer ${extraMargin}`}
      height={64}
      width={153.6}
      src="/images/UMCLeft.png"
      alt="Asbury Logo"
      priority={true}
    />
  );
}

export default LogoUnited