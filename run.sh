#To update the swagger_v2.json changes on delta slate
./deploy.sh --gen-widdershins
#To build the delta slate docker image
docker build . -t deltaslate
#To run the delta slate docker image on local machine
docker run --rm --name deltaslate -p 4567:4567 -v source/srv/slate/source deltaslate serve