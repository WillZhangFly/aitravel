import requests


MINDSDB_BASE_URL = 'http://127.0.0.1:47334/api/sql/query'

def mindsdb_query(session, sql_query):
  session  = requests.Session()
  url = f"{MINDSDB_BASE_URL}";
  headers ={"Content-Type": "application/json"}
  return session.post(url, json={'query': sql_query}, headers=headers)


def predict_query(session, 
      flightDate="2022-04-21", 
      startingAirport="SFO", 
      isNonStop=1, 
      isBasicEconomy=0, 
      isRefundable=0,
      destinationAirport="BOS", 
      raw_request=False, **kwargs):
    sql_query=f"""
    SELECT m.flightDate,  m.segmentsAirlineName, m.isNonStop, m.totalFare, m.totalFare_confidence FROM mindsdb.flight_prices_predictor AS m
    JOIN ai_travel_agent.flight_prices AS t
    WHERE t.flightDate > "{flightDate}"
    AND t.startingAirport = "{startingAirport}"
    AND t.isBasicEconomy = "{isBasicEconomy}" 
    AND t.isRefundable = "{isRefundable}"
    AND t.isNonStop = "{isNonStop}"
    AND t.destinationAirport = "{destinationAirport}";
    """
    response = mindsdb_query(session, sql_query)
    response.raise_for_status()
    if raw_request:
        return response
    data = response.json()
    columns = data.get("column_names")
    dataset = data.get('data')
    if dataset is None or data is None:
        return []
    web_ready_data = [dict(zip(columns, row)) for row in dataset]
    return web_ready_data