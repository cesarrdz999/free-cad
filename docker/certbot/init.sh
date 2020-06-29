#!/usr/bin/env bash

if [ ! -d "/etc/letsencrypt/live/$2" ]; then
  certbot certonly --non-interactive --agree-tos --webroot --webroot-path /var/www --email "$1" -d "$2";
  else
    certbot renew;
fi
docker exec nginx /etc/init.d/nginx reload

/usr/sbin/crond -f -l 8