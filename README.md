
# AI Travel

## command to open jupyter
python3 -m venv venv
source venv/bin/activate
venv/bin/jupyter
venv/bin/python -m jupyter notebook


## how to connect to mariadb
 ./connect.sh
 sudo su
  docker compose up -d
docker ps
docker exec -it [container_id] /bin/bash
mariadb -u root -p
then enter [psd]

## how to run fastapi
### got to venv virtual environment
   python3 -m venv venv
   source venv/bin/activate
### run 'uvicorn backend.main:app --reload --port 8080'

## maria db