# Velugu audio

This directory holds pre-recorded MP3 pronunciations for every phrase in the curriculum.

When `manifest.json` lists a phrase's slug, the app plays that MP3 instead of falling back to the browser's robotic text-to-speech.

## How to populate it

```bash
cd ../tools
GOOGLE_TTS_KEY=AIzaSy... node gen-audio.js
```

See [`tools/gen-audio.js`](../tools/gen-audio.js) for full instructions on getting a Google Cloud TTS API key (~10 minutes, free tier covers the whole corpus several times over with the highest-quality Wavenet voices).

After generation completes, `manifest.json` and the MP3 files will be written here. Commit them — they're small (~30 KB each, ~7 MB total for 250 phrases) and they're a permanent quality lift.

## File naming

Each phrase's filename is a slugified version of its romanised Telugu (`te` field), with diacritics stripped:

| Romanised | Filename |
|---|---|
| `namaskāram` | `namaskaram.mp3` |
| `mīru bāgunnārā?` | `miru-bagunnara.mp3` |
| `nāku idi kāvāli` | `naku-idi-kavali.mp3` |
