from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.ai.connect import get_mindsdb_session
from backend.ai import predict
from backend.env import config
from backend.db.connect import get_db_session, SessionLocal
from backend.db import schemas as db_schemas, utils as db_utils
from requests import Session as RequestSession

DEBUG = config("DEBUG", cast=bool, default=False)
FRONTEND_ORIGINS = config(
    "FRONTEND_ORIGINS", cast=lambda x: [s.strip() for s in x.split(",")], default=""
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/airports", response_model=List[db_schemas.AirportSchema])
def read_airports(
    offset: int = 0,
    limit: int = 100,
    db_session: SessionLocal = Depends(get_db_session),
):
    return db_utils.get_airports(db_session, offset=offset, limit=limit)


@app.get("/flights", response_model=List[db_schemas.FlightPriceSchema])
def read_flight_prices(
    offset: int = 0,
    limit: int = 100,
    db_session: SessionLocal = Depends(get_db_session),
):
    return db_utils.get_flight_prices(db_session, offset=offset, limit=limit)


@app.get("/flights/{flight_price}", response_model=db_schemas.FlightPriceDetailSchema)
def read_flight_price(
    flight_price: int, db_session: SessionLocal = Depends(get_db_session)
):
    db_flight_value = db_utils.get_flight_price(db_session, flight_price)
    if db_flight_value is None:
        raise HTTPException(status_code=404, detail="Flight Price not Found")
    return db_flight_value


@app.post("/predict/")
def write_to_predict(prediction_req:db_schemas.PredictSchema, ai_session: RequestSession = Depends(get_mindsdb_session)):
    request_data = prediction_req.model_dump()
    print(request_data)
    
    predictions = predict.predict_query(
        ai_session,
        **request_data
    )
    
    if len(predictions) == 0:
        return {}
    
    recommendation = predict.recommended_flight(
        ai_session,
        forecast_data=predictions,
        user_data=request_data
    )
    return {
      "recommendation": recommendation,
      "predictions": predictions
    }
