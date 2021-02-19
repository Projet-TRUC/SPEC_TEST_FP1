#image de base
FROM debian:9

#installation des prérequis
RUN apt-get update -yq \
   && apt-get install curl gnupg -yq \
   && curl -sL https://deb.nodesource.com/setup_10.x | bash \
   && apt-get install nodejs -yq \
   && apt-get clean -y

#copie des fichiers du répertoire courant vers le répertoire /app de l'image
ADD . /app/

#on se place dans le répertoire /app
WORKDIR /app

#on installe les packages Node.js nécessaires
RUN npm install express

#on écoutera notre application sur le port 3000
EXPOSE 3000

VOLUME /app/logs

#commande à lancer au démarrage de l'image
CMD node MyNodeServer

