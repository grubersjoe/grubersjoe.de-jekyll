---
title: Schnelleres Einblenden des Docks in Mac OS
category: tipps
languages:
  - de
---

Da Fenster das Dock in Mac OS nicht überlappen, bietet es sich insbesondere auf MacBooks an das Dock auszublenden, um Platz in der Vertikalen einzusparen. Leider gibt es hierbei jedoch immer einen gewisse Verzögerung beim Ein- aus Ausblenden. Diese finde ich persönlich sehr störend im Workflow.

Glücklicherweise kann diese Zeitdauer aber durch einen `defaults write` Befehl im Terminal mit einem beliebigen Wert konfiguriert werden:

```none
defaults write com.apple.dock autohide-time-modifier -float 0; killall Dock
```

Möchte man zurück zum Standardverhalten, so kann der entsprechende Konfigurationsschlüssel einfach gelöscht werden:

```none
defaults delete com.apple.dock autohide-time-modifier; killall Dock
```
