FROM clojure:lein-2.9.3

RUN mkdir -p /usr/src/fluree.crypto
WORKDIR /usr/src/fluree.crypto

RUN apt-get update && apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y nodejs npm google-chrome-stable

COPY project.clj ./
RUN lein deps

COPY . ./
RUN lein uberjar && mv target/crypto-*-standalone.jar target/fluree.crypto-standalone.jar

ENTRYPOINT []
CMD ["java", "-jar", "target/fluree.crypto-standalone.jar"]