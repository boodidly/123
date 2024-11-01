import chalk from 'chalk';

export const OLLAMA_API = 'http://localhost:11434/api';
export const MODEL = 'llama3.2:1b';

export const VOICES = {
  'English (US)': { description: 'American English male voice', voiceName: 'en-us' },
  'English (UK)': { description: 'British English male voice', voiceName: 'en-gb' },
  'English (Female)': { description: 'American English female voice', voiceName: 'en-us+f3' },
  'English (UK Female)': { description: 'British English female voice', voiceName: 'en-gb+f3' },
  'German': { description: 'German male voice', voiceName: 'de' },
  'French': { description: 'French male voice', voiceName: 'fr' },
  'Spanish': { description: 'Spanish male voice', voiceName: 'es' },
  'Italian': { description: 'Italian male voice', voiceName: 'it' }
};

export const BANNER = `
${chalk.white('═══╗')}  ${chalk.red('▓▓▓')}  ${chalk.white('╔═══')}
${chalk.red('░░░║')}  ${chalk.white('|||')}  ${chalk.red('║░░░')}
${chalk.white('───╢')} ${chalk.red('▒▒▒▒▒')} ${chalk.white('╟───')}
${chalk.red('▒▒▒▒')}${chalk.white('┃')}${chalk.red('░░░░░')}${chalk.white('┃')}${chalk.red('▒▒▒▒')}
${chalk.white('╾──╼')}${chalk.red('┇')}${chalk.white('═════')}${chalk.red('┇')}${chalk.white('╾──╼')}
${chalk.red('▓▓')}${chalk.white('╾───┨')}${chalk.red('▓▓▓')}${chalk.white('╟───╼')}${chalk.red('▓▓')}
${chalk.white('══╾')}${chalk.red('░░░')}${chalk.white('┃')}${chalk.red('███')}${chalk.white('┃')}${chalk.red('░░░')}${chalk.white('╼══')}
${chalk.red('▒▒')}${chalk.white('╾───┨')}${chalk.red('▓▓▓')}${chalk.white('╟───╼')}${chalk.red('▒▒')}
${chalk.white('───')}${chalk.red('┇')}${chalk.white('═════')}${chalk.red('┇')}${chalk.white('───')}`;

export const COMMANDS = {
  voice: 'Toggle voice output on/off',
  voices: 'List available voices',
  settings: 'Adjust voice settings (rate, pitch, volume)',
  help: 'Show available commands',
  exit: 'Exit the application'
};