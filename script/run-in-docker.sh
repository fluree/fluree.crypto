#!/usr/bin/env bash

if [[ ! -f docker-chrome-seccomp.json ]]; then
  echo "docker-chrome-seccomp.json not found; please run this script from directory containing that file"
fi

image=fluree/${PWD##*/}

echo "Running in ${image} container..."

docker build --quiet --tag ${image} .
docker run --security-opt seccomp=docker-chrome-seccomp.json --rm ${image} "$@"
