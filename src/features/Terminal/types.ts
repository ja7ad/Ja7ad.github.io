
export type CommandOutput = {
  id: string;
  type: 'command' | 'response' | 'error';
  content: React.ReactNode;
  prompt?: boolean; // If true, it was a command entered by user
};

export type TerminalState = {
  history: CommandOutput[];
  currentInput: string;
  commandHistory: string[]; // For up/down arrow navigation
  historyIndex: number;
};
