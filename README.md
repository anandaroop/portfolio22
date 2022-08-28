# Portfolio 22

## Develop

```sh
# basic dev loop
yarn graphql
yarn dev

# for steady feedback about dark mode
yarn dark

# for impatient deploy
yarn go

# or…
```

## Export static site

```sh
yarn export
```

## Preview static site

```sh
yarn serve
```

## Deploy

```sh
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
