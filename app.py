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
           
@app.route('/api/cleanData',methods = ['POST', 'GET'])
def cleanNewTable(): 
    if request.method == 'POST': 
        try:    
            df = dm.load_RealEstateNewdata()
            dfLocality = dm.load_locality_data()
            df =dm.replace_column_names(df)
            df = dm.prepare_realeState_data(df)
            dfLocality = dm.prepare_locality_data(dfLocality)
            isValid = dm.check_realestate_data(df) 
            if isValid.find("False") != -1:
                result = {
                    "value": isValid               
                }
                json.dumps(result) 
                response = make_response(jsonify(result))
                return response
            isValidLocality = dm.check_locality_data(df)  
            if isValidLocality.find("False") != -1:
                resultLocality = {
                    "value": isValidLocality               
                }
                json.dumps(resultLocality) 
                response = make_response(jsonify(resultLocality))
                return response
           
            dfGlobal = dm.prepare_global_data(df,dfLocality)
            saveToCleanTable(dfGlobal)
            result = dfGlobal.to_json(orient="records")
            parsed = json.loads(result)
            json.dumps(parsed, indent=4) 
            response = make_response(jsonify(parsed))
            return response 
        except Exception as inst:
            print(type(inst))    # the exception instance
            print(inst.args)     # arguments stored in .args
            print(inst) 
            response = make_response(inst)        
        return response
  
def saveToCleanTable(dfGlobal):          
        sqliteConnection= sql.connect("RtateDB.db")
        cursorObject = sqliteConnection.cursor()          
        for index, item in dfGlobal.iterrows():             
            saleValue = item['Sale_value_in_shekels']
            partSold = item['Part_Sold']
            area = item['Area']
            rooms  = item['Rooms']
            saleQuarter = item['Sale_Quarter']
            saleYear = item['Sale_Year']
            numBuilding = item['Num_Building'] 
            NumberResidents_2015 = item['NumberResidents_2015']   
            NumberResidents_2016 = item['NumberResidents_2016']   
            NumberResidents_2017 = item['NumberResidents_2017']  
            LocalityArea = item['LocalityArea']          
            PopulationDensity = item['PopulationDensity']           
            AnnualPopulation_Growth = item['AnnualPopulation_Growth']           
            SocioEconomicRanking = item['SocioEconomicRanking']           
            TrainAccessible = item['TrainAccessible']  
            District_south = item['District_south']           
            District_Haifa = item['District_Haifa']  
            District_jerusalem = item['District_jerusalem'] 
            District_center = item['District_center'] 
            District_north = item['District_north'] 
            District_telAviv = item['District_telAviv'] 
            ReligiousCity_yes = item['ReligiousCity_yes'] 
            ReligiousCity_no = item['ReligiousCity_no']
            ReligiousCity_mixed = item['ReligiousCity_mixed'] 
            sqlite_insert_query = """INSERT INTO realEstateInfoNew (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building,
            NumberResidents_2015,NumberResidents_2016,NumberResidents_2017,
            LocalityArea,PopulationDensity,AnnualPopulation_Growth,SocioEconomicRanking,TrainAccessible,
            District_south,District_Haifa,District_jerusalem,District_center,District_north,
            District_telAviv,ReligiousCity_yes,ReligiousCity_no,ReligiousCity_mixed) VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""" %(saleValue, partSold,area,rooms,saleQuarter,saleYear,numBuilding,NumberResidents_2015,NumberResidents_2016,NumberResidents_2017,
            LocalityArea,PopulationDensity,AnnualPopulation_Growth,SocioEconomicRanking,TrainAccessible,
            District_south,District_Haifa,District_jerusalem,District_center,District_north,
            District_telAviv,ReligiousCity_yes,ReligiousCity_no,ReligiousCity_mixed)
            cursorObject.execute(sqlite_insert_query)
            cursorObject.execute("COMMIT")          
       

@app.route('/api/trainModel',methods = ['POST', 'GET'])
def fitModel():
    conn = sql.connect('RtateDB.db')
    df = pd.read_sql_query("select * from realEstateInfoNew",conn)     
    result = df.to_json(orient="records")
   
    conn.close()
    result,score = dm.build_model(df)
    dataResult = {
    'trainModel': 'RandomForest',
    'result': result,
    'score': score
    
}
    json.dumps(dataResult)       
    response = make_response(jsonify(dataResult))  
    return response

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


