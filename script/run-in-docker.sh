#!/usr/bin/env bash

if [[ ! -f docker-chrome-seccomp.json ]]; then
  echo "docker-chrome-seccomp.json not found; please run this script from directory containing that file"
fi

docker build --quiet --tag fluree/crypto .
docker run --security-opt seccomp=docker-chrome-seccomp.json --rm -ti fluree/crypto "$@"