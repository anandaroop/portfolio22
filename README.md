# Portfolio 22

## Initial Setup

```sh
# since generated image variants are not checked in
yarn images
```

## Develop

```sh
# basic dev loop
yarn graphql
yarn dev

# for steady feedback about dark mode
yarn dark
```

## Deploy

```sh

# for impatient deploy
yarn go

# or…

# export static site
yarn export

# preview static site
yarn serve

# deploy
yarn deploy
```

## Interesting things

graphql dev server
: json-graphql-server

next/image 😢
: react-lazy-load-image-component + sharp for data urls + deelay.me for testing

next static 404s 😢
: trailingSlash config

tailwind dx
: official plugins for vscode (`tailwind css intellisense`) and prettier (`prettier-plugin-tailwindcss`)

dark mode
: developing with `yarn dark` script to provide immediate and thorough feedback

hydration error
: can be caused by invalid html nesting (&lt;a&gt; inside of &lt;a&gt;)

email obfuscation
: mailtrap's concatenation technique

modals
: native dialog with inert + diy scroll lock
