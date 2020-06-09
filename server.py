from flask import Flask, jsonify
from flask_restful import Resource, Api
import requests
from datetime import timedelta, date
from dateutil.relativedelta import relativedelta

app = Flask(__name__)
api = Api(app)


class Flights(Resource):
    def get(self, departure, arrival):
        flight_costs = {}

        country = "CA"
        currency = "CAD"
        locale = "en-CA"
        inbound = ""

        start_date = date.today()
        end_date = date.today() + relativedelta(months=+1)
        delta = timedelta(days=1)

        while start_date <= end_date:
            outbound = start_date.strftime('%Y-%m-%d')
            url = f"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/" \
                  f"{country}/{currency}/{locale}/{departure + '-sky'}/{arrival + '-sky'}/{outbound}/{inbound} "

            querystring = {"inboundpartialdate": inbound}

            headers = {
                'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                'x-rapidapi-key': "f1d94c35e3msh00077622ea46cbcp17d0f1jsn5a1ee2750b53"
            }

            response = requests.request(
                "GET", url, headers=headers, params=querystring)

            print(outbound)

            data = response.json()

            quotes = data["Quotes"]

            lowest = 10000
            avrg = 0
            count = 0

            for quote in quotes:
                if quote["MinPrice"] < lowest:
                    lowest = quote["MinPrice"]

            for quote in quotes:
                avrg = avrg + quote["MinPrice"]
                count = count + 1

            lowest_price = ((avrg/count) + lowest) / 2

            flight_costs[outbound] = lowest_price

            start_date += delta
        return jsonify(flight_costs)


api.add_resource(Flights, '/flights/<departure>/<arrival>')

if __name__ == '__main__':
    app.run(port=5000, debug=False)
