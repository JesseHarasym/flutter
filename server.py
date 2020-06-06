import requests
locale = "en-CA"
country = "CA"
currency = "CAD"
departure = "YYC-sky"
arrival = "YUL-sky"
outbound = "2020-07-17"
inbound = "2020-07-21"

url = f"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/{country}/{currency}/{locale}/{departure}/{arrival}/{outbound}/{inbound}"

querystring = {"inboundpartialdate": inbound}

headers = {
    'x-rapidapi-host': "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    'x-rapidapi-key': "f1d94c35e3msh00077622ea46cbcp17d0f1jsn5a1ee2750b53"
}

response = requests.request("GET", url, headers=headers, params=querystring)

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

print(lowest)
print(avrg/count)
