import React from 'react'
import Image from 'next/image';

interface Props {
  extraMargin?: string;
}
const LogoUnited: React.FC<Props> = ({ extraMargin }) => {
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