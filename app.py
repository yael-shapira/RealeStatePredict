from flask import Flask
from flask import render_template,render_template_string,request,make_response,jsonify
import sqlite3 as sql
import pandas as pd
from flask_cors import cross_origin,CORS
import pickle
import json 
import data.handlers.buildmodel as dm 
import os
from werkzeug.utils import secure_filename
import logging
    
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
        try:
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
            sqlite_insert_query = "INSERT INTO realEstateInfoNew (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building) VALUES (%s,%s,%s,%s,%s,%s,%s)" %(saleValue,partSold,area,rooms,saleQuarter,saleYear,numBuilding)
            cursorObject.execute(sqlite_insert_query)
            cursorObject.execute("COMMIT")          
            return str(cursorObject.lastrowid)  
        except Exception as e:
            logging.error("Exception occurred", exc_info=True)
            return str("failed")  
       
   
@app.route('/api/saveToNewTable',methods = ['POST', 'GET'])
def addRows():   
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

@app.route('/api/cleanData',methods = ['POST', 'GET'])
def cleanNewTable(): 
    if request.method == 'POST':    
        df = dm.load_RealEstateNewdata()
        dfLocality = dm.load_locality_data()
        df = dm.prepare_realeState_data(df)
       # dfLocality = dm.prepare_locality_data()
        #dfGlobal = dm.prepare_global_data(df,dfLocality)
        result = dfLocality.to_json(orient="records")
        parsed = json.loads(result)
        json.dumps(parsed, indent=4) 
        response = make_response(jsonify(parsed))  
       
        # dfLocality = dm.load_locality_data()
        # df = dm.replace_column_names(df)
        # df = dm.prepare_realeState_data(df)
        # dfGlobal = dm.prepare_global_data(df,dfLocality)
        # sqliteConnection= sql.connect("RtateDB.db")
        # cursorObject = sqliteConnection.cursor()
        # df.to_sql('realEstateInfoClean', con=sqliteConnection, if_exists='append')          
        #return str(cursorObject.lastrowid)
        return response
        
        # # dfLocality = dm.prepare_locality_data(dfLocality)
        # #print(check_realestate_data(df))
        # return "S"
       
 
# @app.route('/api/saveToCleanTable',methods = ['POST', 'GET'])
# def saveToCleanTable():       
#         sqliteConnection= sql.connect("RtateDB.db")
#         cursorObject = sqliteConnection.cursor()          
#         # sqlite_insert_query = "INSERT INTO realEstateInfoClean (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building) VALUES (%s, %s,%s,%s,%s,%s,%s)" %(saleValue, partSold,area,rooms,saleQuarter,saleYear,numBuilding)
#         # cursorObject.execute(sqlite_insert_query)
#         cursorObject.execute("COMMIT")          
#         return str(cursorObject.lastrowid)
# @app.route('/api/fitModel',methods = ['POST', 'GET'])
# def fitModel(): 
#     # f = open('./data/modeldata','rb')
#     # model = pickle.load(f)
#     # f.close()
#     # model.fit()
#     return ""

# @app.route('/predict',methods=['POST'])
# def predictitem():  
#         json_data = request.json
#         saleValue = json_data['Sale_value_in_shekels']
#         partSold = json_data['Part_Sold']
#         area = json_data['Area']
#         rooms  = json_data['Rooms']
#         saleQuarter = json_data['Sale_Quarter']
#         saleYear = json_data['Sale_Year']
#         numBuilding = json_data['Num_Building'] 
#         f = open('./data/modeldata','rb')
#         model = pickle.load(f)
#         f.close()
#         ls = [saleValue,partSold,area,rooms,saleQuarter,saleYear,numBuilding] 
        
        #         v = model.predict([ls])

#         return "END"


# @app.route('/admin',methods=['POST'])
# def trainModel():
#    conn = sql.connect('RtateDB.db')
#     df = pd.read_sql_query("select * from realEstateInfoNew",conn)     
#     result = df.to_json(orient="records")
#     parsed = json.loads(result)
#     json.dumps(parsed, indent=4)            
#   return "END"
 
if __name__ == '__main__':
    app.run(debug=True,port=8000)


