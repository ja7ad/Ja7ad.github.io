
import React, { useState } from 'react';
import './Support.css';

interface CryptoOption {
  id: string;
  label: string;
  address: string;
}

const DONATION_OPTIONS: CryptoOption[] = [
  { id: 'btc', label: 'Bitcoin (BTC)', address: 'bc1qslelw2zfwsdfaumr99y4f5gm00p5fc8c9zx6na' },
  { id: 'eth', label: 'Ethereum (ETH)', address: '0x5725d4435c60963476Cb65e4334cF7c06CC57CA1' },
  { id: 'sol', label: 'Solana (SOL)', address: 'HypuDfRYngnmomUgvtdHnWk7iJxgJndFxQ3yqjK7D5Qb' },
  { id: 'ton', label: 'Ton (TON)', address: 'UQB0-L3YBxZ-ku2dnHf7zzK8fk5L-cmhsNhR3nZwvTA8LB-f' },
  { id: 'tron', label: 'Tron (TRX)', address: 'TQ5WNKfTSgjkrw2zqkCRQxPNMyy9zdfPdx' },
];

const Support: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (address: string, id: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="support-container">
      <h1 className="support-title">Support Javad</h1>
      <p className="support-desc">
        If you like my work and want to support me, you can donate crypto using the addresses below:
      </p>

      {DONATION_OPTIONS.map((option) => (
        <div key={option.id} className="donation-group">
          <label className="donation-label" htmlFor={`wallet-${option.id}`}>
            {option.label}
          </label>
          <div className="input-wrapper">
            <input
              id={`wallet-${option.id}`}
              type="text"
              readOnly
              value={option.address}
              className="wallet-address"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              className={`copy-btn ${copiedId === option.id ? 'success' : ''}`}
              onClick={() => handleCopy(option.address, option.id)}
            >
              {copiedId === option.id ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Support;
