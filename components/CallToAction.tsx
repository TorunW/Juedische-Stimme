import React from 'react';
import Image from 'next/image';
import backgroundImage from './styles/images/call-to-action.jpg';

const CallToAction = () => {
  return (
    <div>
      <Image src={backgroundImage} />
    </div>
  );
};

export default CallToAction;
