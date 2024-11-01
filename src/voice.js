import { spawn } from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { VOICES } from './config.js';

let currentVoice = 'en-us';
let isVoiceEnabled = false;
let currentProcess = null;
let speechRate = 0; // -100 to 100
let pitch = 0; // -100 to 100
let volume = 100; // 0 to 200

export async function selectVoice() {
  const { voice } = await inquirer.prompt([{
    type: 'list',
    name: 'voice',
    message: 'Select a voice:',
    choices: Object.entries(VOICES).map(([name, data]) => ({
      name: `${name}: ${data.description}`,
      value: data.voiceName
    }))
  }]);
  
  currentVoice = voice;
  
  // Test the selected voice
  await speakText('Voice test successful');
  process.stdout.write(chalk.green(`\nVoice set to: ${Object.entries(VOICES).find(([_, data]) => data.voiceName === voice)?.[0]}\n`));
}

export async function adjustVoiceSettings() {
  const { rate, pitchValue, volumeLevel } = await inquirer.prompt([
    {
      type: 'list',
      name: 'rate',
      message: 'Select speech rate:',
      choices: [
        { name: 'Very Slow', value: -50 },
        { name: 'Slow', value: -25 },
        { name: 'Normal', value: 0 },
        { name: 'Fast', value: 25 },
        { name: 'Very Fast', value: 50 }
      ]
    },
    {
      type: 'list',
      name: 'pitchValue',
      message: 'Select voice pitch:',
      choices: [
        { name: 'Very Low', value: -50 },
        { name: 'Low', value: -25 },
        { name: 'Normal', value: 0 },
        { name: 'High', value: 25 },
        { name: 'Very High', value: 50 }
      ]
    },
    {
      type: 'list',
      name: 'volumeLevel',
      message: 'Select volume level:',
      choices: [
        { name: 'Quiet', value: 50 },
        { name: 'Normal', value: 100 },
        { name: 'Loud', value: 150 }
      ]
    }
  ]);

  speechRate = rate;
  pitch = pitchValue;
  volume = volumeLevel;

  await speakText('Voice settings updated');
}

export function toggleVoice() {
  isVoiceEnabled = !isVoiceEnabled;
  process.stdout.write(chalk.green(`\nVoice output ${isVoiceEnabled ? 'enabled' : 'disabled'}\n`));
  if (isVoiceEnabled && !currentVoice) {
    selectVoice();
  }
  return isVoiceEnabled;
}

export function getVoiceStatus() {
  return {
    enabled: isVoiceEnabled,
    currentVoice,
    speechRate,
    pitch,
    volume
  };
}

export function listVoices() {
  process.stdout.write(chalk.cyan('\nAvailable voices:\n'));
  Object.entries(VOICES).forEach(([name, data]) => {
    process.stdout.write(chalk.yellow(`${name}: `) + chalk.white(`${data.description}\n`));
  });
  process.stdout.write('\n');
}

export async function stopSpeech() {
  if (currentProcess) {
    currentProcess.kill();
    currentProcess = null;
  }
  // Clear speech-dispatcher queue
  spawn('spd-say', ['-C']);
}

function cleanTextForSpeech(text) {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/_{1,2}/g, '')
    .replace(/[•●■□▪▫◦○⚫⚪]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/[\[\]()]/g, '')
    .trim();
}

export function speakText(text) {
  return new Promise((resolve, reject) => {
    if (!isVoiceEnabled) {
      resolve();
      return;
    }

    const cleanedText = cleanTextForSpeech(text);
    if (!cleanedText) {
      resolve();
      return;
    }

    stopSpeech().then(() => {
      currentProcess = spawn('spd-say', [
        '-w', // Wait until speech is complete
        '-e', // Use speech-dispatcher
        '-t', currentVoice,
        '-r', speechRate.toString(),
        '-p', pitch.toString(),
        '-i', volume.toString(),
        cleanedText
      ]);
      
      currentProcess.stderr.on('data', (data) => {
        console.error(chalk.red('TTS Error:', data.toString()));
      });

      currentProcess.on('close', (code) => {
        currentProcess = null;
        if (code === 0) resolve();
        else reject(new Error('TTS process failed'));
      });
    });
  });
}