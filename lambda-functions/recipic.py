from flask import Flask
from flask import request
from flask import jsonify
from clarifai.rest import ClarifaiApp
import requests
import json
app = Flask(__name__)

@app.route('/clarifai', methods=['POST'])
def clarifai():
    #picture must be in png format
    base64_data = request.form['image']
    app = ClarifaiApp(api_key='cf9b475c76d14fdbbb4c66df41151ba1')

    # get the general model
    model = app.models.get("food-items-v1.0")
    # add image from raw image bytes
    # predict with the model
    image = app.inputs.create_image_from_base64(base64_data)
    p = model.predict([image])
    return jsonify(p)
@app.route('/food2fork/<query>/search')
def f2f_search(query):
    api_key = "6d367c4f3028f205c341c794459b8ab3"
    r = requests.get('http://food2fork.com/api/search',params={'key': api_key, 'q':query })
    return jsonify(r.json())
@app.route('/food2fork/<rid>/get')
def f2f_top(rid):
    api_key = "6d367c4f3028f205c341c794459b8ab3"
    r = requests.get('http://food2fork.com/api/get',params={'key': api_key, 'rId':rid })
    return jsonify(r.json())

@app.route('/edamam',methods=['POST'])
def edamam():
    """Endpoint for the recipic app.
         Form Data
         key: request.form['image'] 
         Value: base64 encoded png
    """
    base64_data = request.form['image']
    app = ClarifaiApp(api_key='cf9b475c76d14fdbbb4c66df41151ba1')
    # get the general model
    model = app.models.get("food-items-v1.0")
    # add image from raw image bytes
    # predict with the model
    image = app.inputs.create_image_from_base64(base64_data)
    predicted = model.predict([image])
    print predicted
    food_names = predicted["outputs"][0]["data"]["concepts"];
    print food_names

    params = (
        ('q', 'chicken'),
        ('app_id', '${YOUR_APP_ID}'),
        ('app_key', '${YOUR_APP_KEY}'),
        ('from', '0'),
        ('to', '3'),
        ('calories', 'gte 591, lte 722'),
        ('health', 'alcohol-free\nview'),
    )

    requests.get('https://api.edamam.com/search', params=params)

    #NB. Original query string below. It seems impossible to parse and
    #reproduce query strings 100% accurately so the one below is given
    #in case the reproduced version is not "correct".
    # requests.get('https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-freeview')

    
@app.route('/recipic', methods=['POST'])
def recipic():
    """Endpoint for the recipic app.
         Form Data
         key: request.form['image'] 
         Value: base64 encoded png
    """
    base64_data = request.form['image']
    app = ClarifaiApp(api_key='cf9b475c76d14fdbbb4c66df41151ba1')
    # get the general model
    model = app.models.get("food-items-v1.0")
    # add image from raw image bytes
    # predict with the model
    image = app.inputs.create_image_from_base64(base64_data)
    predicted = model.predict([image])
    print predicted
    food_names = predicted["outputs"][0]["data"]["concepts"];
    print food_names

    food_name = food_names[0]["name"]
    print food_name
    api_key = "6d367c4f3028f205c341c794459b8ab3"
    f2f_foods = requests.get('http://food2fork.com/api/search',params={'key': api_key, 'q':food_name })
    print f2f_foods
    rid = f2f_foods.json()["recipes"][0]["recipe_id"]
   
    recipe_result = requests.get('http://food2fork.com/api/get',params={'key': api_key, 'rId':rid })
    return jsonify(recipe_result.json())
    

if __name__ == "__main__":
    
    # remember to use DEBUG mode for templates auto reload
    # https://github.com/lepture/python-livereload/issues/144
    #app.debug = True

    #server = Server(app.wsgi_app)
    # server.watch
    #server.serve()
    app.run(port=5000)


    
