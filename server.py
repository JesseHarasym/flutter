from flask import Flask, jsonify
from flask_restful import Resource, Api
import requests
from datetime import timedelta, date
from dateutil.relativedelta import relativedelta

app = Flask(__name__)
api = Api(app)


def daterange(start_date, end_date):
    for n in range(int((end_date - start_date).days)):
        yield start_date + timedelta(n)


class Flights(Resource):
    def get(self, departure, arrival):
        currency = "CAD"

        start_date = date.today() + relativedelta(days=+1)
        end_date = date.today() + relativedelta(months=+1)
        delta = timedelta(days=1)

        flight_costs = {}

        for single_date in daterange(start_date, end_date):
            outbound = single_date.strftime('%d/%m/%Y')
            url = f"https://tequila-api.kiwi.com/v2/search?fly_from={departure}&fly_to={arrival}&date_from={outbound}&date_to=" \
                  f"{outbound}&flight_type=oneway&adults=1&children=0&infants=" \
                  f"0&selected_cabins=M&partner_market=ca&curr={currency}&max_stopovers=2&vehicle_type=aircraft&sort=date"

            headers = {
                "accept": "application/json",
                "apikey": "0CeXIAzSC0PKYRiZtdEDwLBTjU8dHdbz"
            }

            response = requests.request(
                "GET", url, headers=headers)

            data = response.json()

            new_data = data["data"]

            temp = new_data[0]

            temp2 = temp["local_departure"]
            local_departure = temp2.split("T", 1)[0]
            price = temp["price"]

            flight_costs[local_departure] = price
            print(outbound)
            start_date += delta
        print(flight_costs)
        return flight_costs


api.add_resource(Flights, '/flights/<departure>/<arrival>')

if __name__ == '__main__':
    app.run(port=5000, debug=False)
