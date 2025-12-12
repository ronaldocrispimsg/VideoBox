#!/bin/bash
set -e

# remove container antigo se existir
docker rm -f repo_stream 2>/dev/null || true

# sobe de novo
docker run -d \
  --name repo_stream \
  -p 8001:8001 \
  repo_stream
