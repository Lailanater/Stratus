FROM debian:trixie-slim AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    ca-certificates \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV MISE_DATA_DIR="/mise"
ENV MISE_CONFIG_DIR="/mise"
ENV MISE_CACHE_DIR="/mise/cache"
ENV MISE_INSTALL_PATH="/usr/local/bin/mise"
ENV PATH="/mise/shims:$PATH"

RUN curl https://mise.run | sh

WORKDIR /app

######################################################################################################

FROM base AS build-base

COPY . .

RUN mise trust && mise install

######################################################################################################

FROM build-base AS client-builder

RUN yarn install --frozen-lockfile && yarn build

######################################################################################################

FROM build-base AS server-builder

WORKDIR /app/server

RUN go build -o stratus-server ./src/*.go

######################################################################################################

FROM base AS final

WORKDIR /app

RUN mise use -g nodejs go && npm i -g serve

COPY --from=client-builder /app/client/build /app/client/
COPY --from=server-builder /app/server/stratus-server /app/server/
COPY --from=server-builder /app/server/src/templates /app/server/src/templates

EXPOSE 3000 8080

CMD ["bash"]