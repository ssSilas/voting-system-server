#!/bin/bash

yarn
yarn build
# yarn typeorm migration:run -d dist/database.providers.js
yarn dev