# Portfolio 22

## Update

```sh
# update content
vi data/data.json

# update content files
yarn content
# => yarn images # update generated image variants, then…
# => yarn searchable-content # prepare data for client-side search
```

## Develop

```sh
# basic dev loop
yarn dev
# => yarn graphql # graphql server for local json db, and concurrently…
# => yarn next dev # next dev server

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
