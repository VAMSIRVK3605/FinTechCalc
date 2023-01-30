import json
from flask import request
from flask import Flask, render_template,jsonify
import os
from dotenv import get_key #pip install python-dotenv
from deta import Deta #pip install deta
import ssl
from datetime import datetime
import pytz

# import base64
# import requests
# from bs4 import BeautifulSoup as soup
# import pandas as pd
# import numpy as np
# from urllib.request import urlopen
# from PIL import Image

# app = Flask(__name__)

app = Flask(__name__)
# template_folder="E:/RVK360/MY JUPYTER NOTEBOOKS/PYTHON DEVELOPER/DETA MICROS/FinCalci/templates",
# static_folder="E:/RVK360/MY JUPYTER NOTEBOOKS/PYTHON DEVELOPER/DETA MICROS/FinCalci/static"
# )

# a = load_dotenv(".env")


@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")



# def new():
#     return "working"


@app.route('/form', methods=['POST'])
def form():
    # form = request.form.get("name")
    form = request.form
    # print(type(form))
    # name = form["name"]
    # print(form)

    # Multidict to json:
    js = json.dumps(form)
    js = json.loads(js)

    # Reading Key from dotenv(.env) file
    ## project_id = get_key(key_to_get="Project_Key_ID",dotenv_path=".env")
    project_key = get_key(key_to_get="Project_Key",dotenv_path=".env")
    # print(project_key)
    # print(os.getcwd())

    # Logging into Deta:
    deta = Deta(project_key=project_key) ##project_key=project_key,
    # print(deta)

    # Setting SSL Certificate verification to Unverified, because ssl couldn't verify the DETA:
    ssl._create_default_https_context = ssl._create_unverified_context

    # Creating Deta Database or Opening Database:
    Feedback = deta.Base("Feedback")
    # print("Successfully Created Feedback Database")
    ## Inserting Data(js:json) into the Deta DataBase:

    date =  datetime.now()
    # date1 = date.strftime("%d-%m-%y")
    # time = date.strftime("%H:%M:%S")
    # print(date1)
    # print(time)

    # date = datetime.now()
    timezone = pytz.timezone("Asia/Kolkata")
    date = date.astimezone(timezone)
    date1 = date.strftime("%d-%b-%Y")
    time = date.strftime("%H:%M:%S")

    js["Date"] = date1
    js["Time"] = time

    Feedback.insert(js)

    # print(type(js)," Type")

    # print("Successfully Inserted Data into Feedback Database")

    # print(js)

    # # Fetching DataBase:
    # # fetch = Feedback.fetch()
    # # data = fetch.items
    # # print("Data from Feedback DataBase: \n",data)

    # # Deleting Data in a Data Base:
    # ## a = Feedback.delete(key="jq587fhozd8q")

    return render_template("form_submit.html")
    # return "Hello"

app.run(port=4300,debug=True)


