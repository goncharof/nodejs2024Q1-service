#!/bin/sh

set -e

echo "Generating Prisma client..."
npx prisma generate

echo "Deploying migrations..."
npx prisma migrate deploy

echo "Seeding the database..."
npx prisma db seed

echo "Starting the application..."
npm run start:dev