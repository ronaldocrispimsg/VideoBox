FROM rabbitmq:3.13-management

ENV RABBITMQ_DEFAULT_USER=videobox \
    RABBITMQ_DEFAULT_PASS=123456 \
    RABBITMQ_ERLANG_COOKIE=videobox-cookie

RUN rabbitmq-plugins enable --offline rabbitmq_prometheus

EXPOSE 5672 15672 15692

HEALTHCHECK --interval=30s --timeout=5s --retries=5 --start-period=30s \
  CMD rabbitmq-diagnostics -q ping || exit 1
