# Ollama Terminal Chat

A feature-rich terminal chat interface for Ollama with high-quality text-to-speech support.

## Features

- Interactive terminal UI with colorful output
- High-quality text-to-speech with speech-dispatcher
- Multiple language support
- Adjustable speech rate, pitch, and volume
- Natural-sounding voices
- Low latency speech synthesis
- Command system for quick actions

## Installation on Arch Linux

1. Install system dependencies:
```bash
sudo pacman -S nodejs npm git speech-dispatcher
```

2. Configure speech-dispatcher (optional for better voices):
```bash
sudo pacman -S festival festival-us # For Festival voices
sudo pacman -S svox-pico-bin # For SVOX Pico voices
```

3. Clone and set up the project:
```bash
git clone <repository-url>
cd ollama-chat
npm install
```

4. Start Ollama server:
```bash
ollama run llama3.2:1b
```

5. Run the chat interface:
```bash
npm start
```

## Available Commands

- `voice` - Toggle voice output on/off
- `voices` - List available voices
- `settings` - Adjust voice settings (rate, pitch, volume)
- `help` - Show available commands
- `exit` - Exit the application

## Voice Features

- Multiple high-quality voices in different languages
- Adjustable speech properties:
  - Rate: Very Slow to Very Fast
  - Pitch: Very Low to Very High
  - Volume: Quiet to Loud
- Natural-sounding speech synthesis
- Low latency response
- Support for multiple languages
- System-native voice integration

## Requirements

- Node.js 16+
- npm 7+
- Ollama server running
- speech-dispatcher
- Terminal with ANSI color support

## Optional Voice Enhancements

For even better voice quality, you can install additional speech synthesizers:
```bash
sudo pacman -S festival festival-us # Festival voices
sudo pacman -S svox-pico-bin # SVOX Pico voices
```

## Troubleshooting

If you experience any issues with speech:

1. Ensure speech-dispatcher is running:
```bash
systemctl --user start speech-dispatcher
```

2. Test speech-dispatcher:
```bash
spd-say "Test message"
```

3. Configure default speech-dispatcher settings:
```bash
mkdir -p ~/.config/speech-dispatcher
cp /etc/speech-dispatcher/speechd.conf ~/.config/speech-dispatcher/
```