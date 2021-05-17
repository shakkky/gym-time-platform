#!/bin/bash

grep -v '^#' .env

set -o allexport
source .env
set +o allexport