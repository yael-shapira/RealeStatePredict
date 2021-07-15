from flask import Flask
from flask import render_template,render_template_string,request,make_response,jsonify
import sqlite3 as sql
import pandas as pd
from flask_cors import CORS
import pickle
import json 
app = Flask(__name__)
CORS(app)
@app.route('/api/GetRealestateInfo',methods=['GET'])
def  GetRealestateInfo():    
    conn = sql.connect('RtateDB.db')

    df = pd.read_sql_query("select * from realEstateInfoNew",conn)     
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    json.dumps(parsed, indent=4)            
    response = make_response(jsonify(parsed))  
    conn.close()    
    return response 
    
@app.route('/api/addNewRecord',methods = ['POST', 'GET'])
def addRow1():   
    if request.method == 'POST':    
        json_data = request.json
        saleValue = json_data['Sale_value_in_shekels']
        partSold = json_data['Part_Sold']
        area = json_data['Area']
        rooms  = json_data['Rooms']
        saleQuarter = json_data['Sale_Quarter']
        saleYear = json_data['Sale_Year']
        numBuilding = json_data['Num_Building'] 
        sqliteConnection= sql.connect("RtateDB.db")
        cursorObject = sqliteConnection.cursor()          
        sqlite_insert_query = "INSERT INTO realEstateInfoNew (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building) VALUES (%s, %s,%s,%s,%s,%s,%s)" %(saleValue, partSold,area,rooms,saleQuarter,saleYear,numBuilding)
        cursorObject.execute(sqlite_insert_query)
        cursorObject.execute("COMMIT")          
        return str(cursorObject.lastrowid)

@app.route('/predict',methods=['POST'])
def predictitem():  
        json_data = request.json
        saleValue = json_data['Sale_value_in_shekels']
        partSold = json_data['Part_Sold']
        area = json_data['Area']
        rooms  = json_data['Rooms']
        saleQuarter = json_data['Sale_Quarter']
        saleYear = json_data['Sale_Year']
        numBuilding = json_data['Num_Building'] 
        f = open('./data/modeldata','rb')
        model = pickle.load(f)
        f.close()

        ls = [saleValue,partSold,area,rooms,saleQuarter,saleYear,numBuilding] 
        # if ty==1: # OneHotEncode
        # ls += [1,0,0]
        # elif ty==2:
        # ls += [0,1,0]
        # else:
        # ls += [0,0,1] 
        v = model.predict([ls])

        return "END"


if __name__ == '__main__':
    app.run(debug=True,port=8000)


