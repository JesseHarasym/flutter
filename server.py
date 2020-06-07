from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import requests

app = Flask(__name__)
api = Api(app)


class Flights(Resource):
    def get(self, departure, arrival):
        locale = "en-CA"
        country = "CA"
        currency = "CAD"
        # departure = "YYC-sky"
        # arrival = "YUL-sky"
        outbound = "2020-07-17"
        inbound = "2020-07-21"

        url = f"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/{country}/{currency}/{locale}/{departure + '-sky'}/{arrival + '-sky'}/{outbound}/{inbound}"

        querystring = {"inboundpartialdate": inbound}

        headers = {
            'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            'x-rapidapi-key': "f1d94c35e3msh00077622ea46cbcp17d0f1jsn5a1ee2750b53"
        }

        response = requests.request(
            "GET", url, headers=headers, params=querystring)

        response.headers['Access-Control-Allow-Origin'] = '*'

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

        flight_data = avrg/count

        return jsonify({'flights': flight_data})


api.add_resource(Flights, '/flights/<departure>/<arrival>')


if __name__ == '__main__':
    app.run(port=5000, debug=False)