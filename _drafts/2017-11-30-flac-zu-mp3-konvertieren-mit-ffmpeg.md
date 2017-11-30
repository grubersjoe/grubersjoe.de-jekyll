---
title: FLAC Dateien in MP3 umwandeln mit ffmpeg
category: How-to
---

```sh
for f in *.flac; do ffmpeg -i "$f" -aq 1 "${f%flac}mp3"; done
```