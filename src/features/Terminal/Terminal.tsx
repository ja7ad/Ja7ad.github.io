
import React, { useState, useRef, useEffect } from 'react';
import Prompt from './Prompt';
import Avatar from '../../components/Avatar';
import { executeCommand, LONG_BIO, COMMANDS_LIST } from './commands';
import { CommandOutput } from './types';
import './Terminal.css';

// Reusable Welcome Component
const WelcomeSection = () => (
  <div className="welcome-container">
    <h1 className="welcome-title">Welcome to Javad Rajabzadeh Portfolio</h1>
    
    <div className="welcome-avatar-wrapper">
      <Avatar />
    </div>

    <div className="welcome-subtitle">
      Senior Software Engineer | Blockchain | IoT | Business Software
    </div>

    {/* Social Icons Section */}
    <div className="welcome-socials">
      <a href="https://github.com/ja7ad" target="_blank" rel="noreferrer" aria-label="GitHub">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" />
      </a>
      <a href="https://www.linkedin.com/in/ja7ad/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" />
      </a>
      <a href="https://twitter.com/Ja7adR" target="_blank" rel="noreferrer" aria-label="Twitter">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg" alt="Twitter" />
      </a>
      <a href="https://scholar.google.com/citations?user=PXkS0K0AAAAJ" target="_blank" rel="noreferrer" aria-label="Google Scholar">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/googlescholar.svg" alt="Google Scholar" />
      </a>
    </div>

    <div className="welcome-desc">
      {LONG_BIO}
    </div>
  </div>
);

const WelcomeInstructions = () => (
  <div className="welcome-instructions">
    <p>Type <span style={{ color: '#98c379' }}>'help'</span> to see available commands.</p>
    <p>Try <span style={{ color: '#e5c07b' }}>'projects'</span>, <span style={{ color: '#e5c07b' }}>'info'</span>, or <span style={{ color: '#e5c07b' }}>'resume'</span>.</p>
  </div>
);

// Initial state constant to be reused by 'clear' command
const INITIAL_HISTORY: CommandOutput[] = [
  { 
    id: 'init-1', 
    type: 'response', 
    content: <WelcomeSection /> 
  },
  { 
    id: 'init-2', 
    type: 'response', 
    content: <WelcomeInstructions /> 
  }
];

export default function Terminal() {
  // Use a function to generate IDs uniquely if needed, but for initial strict mode render static IDs are cleaner
  const [history, setHistory] = useState<CommandOutput[]>(INITIAL_HISTORY);

  const [inputVal, setInputVal] = useState('');
  const [suggestion, setSuggestion] = useState<{ cmd: string; desc: string; remaining: string } | null>(null);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState(-1);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on history change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on any click
  const handleContainerClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);

    if (!val) {
      setSuggestion(null);
      return;
    }

    // Find first command that starts with input
    const match = COMMANDS_LIST.find(c => c.cmd.startsWith(val.toLowerCase()) && c.cmd !== val.toLowerCase());
    if (match) {
      setSuggestion({
        cmd: match.cmd,
        desc: match.desc,
        remaining: match.cmd.slice(val.length)
      });
    } else {
      setSuggestion(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInputVal(suggestion.cmd);
        setSuggestion(null);
      }
      return;
    }

    if (e.key === 'Enter') {
      const command = inputVal.trim();
      
      // 'clear' command customized behavior: toggle back to Welcome screen
      if (command.toLowerCase() === 'clear') {
        // We regenerate IDs to ensure React treats them as new elements if needed, 
        // effectively re-mounting the welcome animation if we had one (CSS animation).
        setHistory([
          { 
            id: Date.now() + '-init-1', 
            type: 'response', 
            content: <WelcomeSection /> 
          },
          { 
            id: Date.now() + '-init-2', 
            type: 'response', 
            content: <WelcomeInstructions /> 
          }
        ]);
        setInputVal('');
        setSuggestion(null);
        return;
      }

      const newHistoryItem: CommandOutput = {
        id: Date.now().toString() + '-cmd',
        type: 'command',
        content: inputVal,
        prompt: true
      };
      
      const responseContent = executeCommand(command);
      const newResponseItem: CommandOutput = {
        id: Date.now().toString() + '-res',
        type: 'response',
        content: responseContent
      };

      if (command) {
        setCmdHistory(prev => [...prev, command]);
        setHistoryPointer(-1);
      }

      const itemsToAdd = responseContent 
        ? [newHistoryItem, newResponseItem] 
        : [newHistoryItem];
        
      setHistory(prev => [...prev, ...itemsToAdd]);

      setInputVal('');
      setSuggestion(null);
    } 
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newPointer = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(newPointer);
        setInputVal(cmdHistory[newPointer]);
        setSuggestion(null); // Clear suggestion on history nav
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const newPointer = Math.min(cmdHistory.length - 1, historyPointer + 1);
        if (historyPointer === cmdHistory.length - 1) {
           setHistoryPointer(-1);
           setInputVal('');
        } else {
           setHistoryPointer(newPointer);
           setInputVal(cmdHistory[newPointer]);
        }
        setSuggestion(null);
      }
    }
  };

  return (
    <div className="terminal-container" onClick={handleContainerClick}>
      {history.map((item) => (
        <div key={item.id} className="history-item">
          {item.prompt ? (
            <div className="input-line-wrapper">
              <Prompt />
              <div className="command-text">{item.content}</div>
            </div>
          ) : (
            <div>{item.content}</div>
          )}
        </div>
      ))}

      <div className="input-line-wrapper active-input-row">
        <Prompt />
        <div className="input-stack">
          <input
            ref={inputRef}
            type="text"
            className="input-area"
            value={inputVal}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal Input"
            style={{ width: `${Math.max(1, inputVal.length)}ch` }}
          />
          {suggestion && (
            <span className="suggestion-text">
              {suggestion.remaining}&nbsp; 
              <span className="suggestion-desc">({suggestion.desc})</span>
            </span>
          )}
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
