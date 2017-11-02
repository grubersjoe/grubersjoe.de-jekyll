---
title: Schnelleres Einblenden des Docks in Mac OS
category: tipps
---

Eine wunderbare Heiterkeit hat meine ganze Seele eingenommen, gleich den süßen Frühlingsmorgen, die ich mit ganzem Herzen genieße. Ich bin allein und freue mich meines Lebens in dieser Gegend, die für solche Seelen geschaffen ist wie die meine. Ich bin so glücklich, mein Bester, so ganz in dem Gefühle von ruhigem Dasein versunken, daß meine Kunst darunter leidet. Ich könnte jetzt nicht zeichnen, nicht einen Strich, und bin nie ein größerer Maler gewesen als in diesen Augenblicken.


```sh
defaults write com.apple.dock autohide-time-modifier -int 0; killall Dock
```

Natürlich kann auch jeder andere beliebige Wert als Argument verwendet werden.

```sh
defaults delete com.apple.dock autohide-time-modifier; killall Dock
```