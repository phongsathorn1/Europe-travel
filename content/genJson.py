import os
import json

if __name__ == "__main__":
    result = {}
    contentPath = os.path.abspath("")
    countrys = [country for country in os.listdir() if len(country.split('.')) == 1]
    temp = []
    for country in countrys:
        for location in os.listdir(country):
            path = os.path.join(contentPath, country, location)
            content = json.load(open(path, 'r', encoding="utf8"))
            temp += [
                {
                    "country": {
                        "en": content["country"]["en"],
                        "th": content["country"]["th"]
                    }, 
                    "location": {
                        "en": content["location"]["en"].replace(" ", ""),
                        "th": content["location"]["th"]
                    }
                }
            ]
    result["locations"] = temp

    heroImagePath = os.path.abspath("../images/hero")
    temp = []
    for img in os.listdir(heroImagePath):
        temp += [{"url": "images/hero/"+img}]
    result["images"] = temp
    json.dump(result, open("hero.json", "w"), indent=4)
    print("success!")
