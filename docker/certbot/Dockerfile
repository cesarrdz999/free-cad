FROM certbot/certbot

RUN apk add bash

RUN apk add docker-cli

ENTRYPOINT ["/bin/bash"]

COPY cert-renew.conf /etc/cron.d/cert-renew.conf

RUN chmod 0644 /etc/cron.d/cert-renew.conf

RUN crontab /etc/cron.d/cert-renew.conf

RUN touch /var/log/cron.log

CMD ["/usr/local/bin/init.sh", "admin@emachineshop.com", "cad.emachineshop.com"]