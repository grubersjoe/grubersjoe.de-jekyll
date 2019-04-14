# grubersjoe.de (Jekyll)

> I've build a new version of my site based on GatsbyJS:<br>
> https://github.com/grubersjoe/grubersjoe.de

This is the source code of my personal Jekyll based website.

## Setup

1. Install [Jekyll](https://jekyllrb.com/) if you don't have it yet.
1. Install `gulp-cli` if neccessary: 
    ```shell
    [sudo] npm install -g gulp-cli
    ```
1. Execute `[npm|yarn] install` in the project root directory
1. Now you can execute different gulp commands:
    1. `gulp` builds the whole page (result in `_site`)
    1. `gulp clean` cleans the build
    1. `gulp serve` starts a local web server, watches for file changes (SCSS, JS and page content) and rebuilds the page if necessary. CSS changes will be hot reloaded.
