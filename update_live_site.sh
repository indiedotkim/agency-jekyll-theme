#!/usr/bin/env bash

set -e

scp -r _site/* joejimbo@l2:/var/www/www.codamono.com/html

