#!/usr/bin/env bash

set -e

scp -r _site/* joejimbo@opacmo.org:/var/www/www.codamono.com/html

