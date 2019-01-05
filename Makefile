SHELL := /bin/bash

include scripts/.settings.sh

# Use the "Seed" AWS profile. This assume the profile exist in ~/.aws/credentials
# and in ~/.aws/config
export AWS_PROFILE = default


#
# DEV
#
# Build and start the dev environment

install:
	npm install

dev:
	npm run dev