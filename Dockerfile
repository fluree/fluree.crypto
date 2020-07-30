FROM clojure:tools-deps-1.10.1.590-slim-buster

RUN mkdir -p /usr/src/fluree-crypto
WORKDIR /usr/src/fluree-crypto

# Install the tools we need to install the tools we need
RUN apt-get update && apt-get install -y wget curl gnupg2 software-properties-common

# Add Chrome source for running CLJS tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Add node PPA to get newer versions
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get update && apt-get install -y nodejs google-chrome-stable

# Install & cache project deps
COPY deps.edn ./
RUN clojure -A:cljtest:cljstest -Stree
COPY package.json package-lock.json ./
RUN npm i
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
