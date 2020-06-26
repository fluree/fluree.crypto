FROM clojure:lein-2.9.3

RUN mkdir -p /usr/src/fluree.crypto
WORKDIR /usr/src/fluree.crypto

RUN apt-get update && apt-get install -y nodejs

COPY project.clj ./
RUN lein deps

COPY . ./
RUN lein uberjar && mv target/crypto-*-standalone.jar target/fluree.crypto-standalone.jar

ENTRYPOINT []
CMD ["java", "-jar", "target/fluree.crypto-standalone.jar"]