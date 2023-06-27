import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.log('Copy failed:', error));
  };

  return (
    <button
    className="flex items-center justify-center px-4 py-2 bg-blue-100 text-black rounded hover:bg-blue-200"
    onClick={handleCopy}
  >
    {copied ? 'Copied!' : 'Copy Class Code'}
    <FiCopy className="ml-2" />
  </button>
  );
};

export default CopyButton;
