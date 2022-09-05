#!/usr/bin/env bash

# set .env
if [[ ! -e .env ]]; then
    echo ".env file is missing"
    exit 1
fi
export $(grep -v '^#' .env | xargs)

# schlep
tar cvfz - out | ssh ${ARCOM_USER}@${ARCOM_HOST} 'cd ~/www/anandarooproy.com; rm -r html.bak; mv html html.bak; tar xvfz -; mv out html'
