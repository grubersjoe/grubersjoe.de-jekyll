---
title: Schnelleres Einblenden des Docks in Mac OS
category: tipps
languages:
  - de
---

Da Fenster das Dock in Mac OS nicht überlappen, bietet es sich insbesondere auf kleineren Geräten wie einem MacBook an das Dock auszublenden, um vertikale Bildschirmfläche einzusparen. Standardmäßig gibt es hierbei jedoch immer eine gewisse Verzögerung bis das Einblenden ausgelöst wird, welche ich persönlich sehr störend im Workflow finde. Insbesondere bei externen Mäusen entsteht so oft eine ungewollte Wartepause, bevor es weitergeht.

Glücklicherweise kann diese Zeitdauer aber durch eine Anpassung der `defaults` wie folgt leicht abgeändert werden:

```none
defaults write com.apple.dock autohide-delay -float 0
killall Dock
```

Das Dock muss nach der Änderung neugestartet werden (`killall Dock`). Möchte man zurück zum Standardverhalten, so kann der entsprechende Konfigurationsschlüssel einfach wieder gelöscht werden:

```none
defaults delete com.apple.dock autohide-delay
killall Dock
```

Auch die Zeitdauer des Ein- und Ausblendens des Docks kann mit einem ähnlichen Befehl gesteuert werden. Möchte man beispielsweise die Animationsdauer auf eine halbe Sekunde setzen, so ergeben sich kombiniert folgende Befehle:

```none
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.5
killall Dock
```
