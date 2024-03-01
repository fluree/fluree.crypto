FROM clojure:tools-deps-1.11.1.1435-bookworm-slim

RUN mkdir -p /usr/src/fluree-crypto
WORKDIR /usr/src/fluree-crypto

# Install the tools we need to install the tools we need
RUN apt-get update && apt-get install -y wget curl gnupg2 software-properties-common chromium
ENV CHROME_BIN=/usr/bin/chromium

# Add node PPA to get newer versions
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN apt-get update && apt-get install -y nodejs

# Install & cache project deps
COPY deps.edn ./
RUN clojure -A:cljtest:cljstest -P

COPY package.json ./
RUN npm install
RUN npm i -g karma-cli

# Copy in the rest of the code
COPY . ./

# create a user for running chrome headless tests
RUN groupadd fluree && useradd --no-log-init -g fluree -m fluree

# move clj deps to fluree's home
# double caching in image layers is unfortunate, but setting this user
# earlier in the build caused its own set of issues
RUN mv /root/.m2 /home/fluree/.m2 && chown -R fluree.fluree /home/fluree/.m2

RUN chown -R fluree.fluree .
USER fluree

ENTRYPOINT []
