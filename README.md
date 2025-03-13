

//command to open jupyter
python3 -m venv venv
source venv/bin/activate
venv/bin/jupyter
venv/bin/python -m jupyter notebook


python3 -m venv venv
source venv/bin/activate


how to connect to mariadb
 ./connect.sh
 sudo su
  docker compose up -d
docker ps
docker exec -it [container_id] /bin/bash
mariadb -u root -p
then enter [psd]

how to run fastapi
#1. got to venv virtual environment
   python3 -m venv venv
   source venv/bin/activate
#2. run 'uvicorn backend.main:app --reload --port 8080'

maria db