
# AI Travel

## command to open jupyter
  1.  python3 -m venv venv
  2.  source venv/bin/activate
  3.  venv/bin/jupyter
  4.  venv/bin/python -m jupyter notebook


## how to connect to mariadb
  1. ./connect.sh
  2.  sudo su
  3.  docker compose up -d
  4.  docker ps
  5.  docker exec -it [container_id] /bin/bash
  6.  mariadb -u root -p
  7. then enter [psd]

## how to run fastapi
### How to get into to venv virtual environment
  1.  python3 -m venv venv
  2.  source venv/bin/activate
### run fast api api
  1. 'uvicorn backend.main:app --reload --port 8080'

## maria db