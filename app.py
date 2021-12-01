from flask import Flask
from flask import render_template,render_template_string,request,make_response,jsonify
import sqlite3 as sql
import pandas as pd
from flask_cors import cross_origin,CORS
import pickle
import numpy as np
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
            json_data = request.json             
            partSold = json_data['Part_Sold']
            area = json_data['Area']
            rooms  = json_data['Rooms']
            saleQuarter = json_data['Sale_Quarter']
            saleYear = json_data['Sale_Year']
            numBuilding = json_data['Num_Building'] 
            city = json_data['city']  
            dfLocality = dm.load_locality_data()  
            dfLocality = dm.prepare_locality_data(dfLocality)
            dfLocality.drop(['Nicknames','Demography','YearEstablishment','YearDeclarationAsCity'],axis='columns', inplace=True)
            dfLocality = pd.get_dummies(dfLocality,prefix=['District','ReligiousCity'],columns=['District','ReligiousCity'])
            dfLocality.rename(columns = {'District_דרום':'District_south','District_ירושלים':'District_jerusalem','District_חיפה': 'District_Haifa', 'District_יהודה ושומרון':'District_yehuda','District_מרכז' : 'District_center','District_צפון':'District_north',
                    'District_תל אביב':'District_telAviv','ReligiousCity_כן':'ReligiousCity_yes','ReligiousCity_לא':'ReligiousCity_no','ReligiousCity_מעורב':'ReligiousCity_mixed'}, inplace = True)
            dfLocality.drop(['ReligiousCity_0','ReligiousCity_1','District_yehuda'],axis=1,inplace = True)
            dfCity =dfLocality.query("CityName ==  @city")
            dfCity.drop(['CityName'],axis='columns', inplace=True)            
            localityArr =dfCity.to_numpy()                     
          
            sqliteConnection= sql.connect("RtateDB.db")
            cursorObject = sqliteConnection.cursor()          
            sqlite_insert_query = ('INSERT INTO realEstateInfoNew (Sale_value_in_shekels,Part_Sold,Area'
            ',Rooms,Sale_Quarter, Sale_Year,Num_Building,'
            'NumberResidents_2015,NumberResidents_2016,NumberResidents_2017,LocalityArea,'
            'PopulationDensity,AnnualPopulation_Growth,SocioEconomicRanking,TrainAccessible,District_south'
            ',District_Haifa,District_jerusalem,District_center,District_north,District_telAviv,'
            'ReligiousCity_yes,ReligiousCity_no,ReligiousCity_mixed) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
             %(saleValue,partSold,area,rooms,saleQuarter,saleYear,numBuilding,
             localityArr[0][0],localityArr[0][1],localityArr[0][2],localityArr[0][3],
             localityArr[0][4],localityArr[0][5],localityArr[0][6],localityArr[0][7],
             localityArr[0][8],localityArr[0][9],localityArr[0][10],localityArr[0][11],
             localityArr[0][12],localityArr[0][13],localityArr[0][14],localityArr[0][15],
             localityArr[0][16]))
            cursorObject.execute(sqlite_insert_query)
            cursorObject.execute("COMMIT")          
            return str(cursorObject.lastrowid)  
        except Exception as e:
            logging.error("Exception occurred", exc_info=True)
            return str("failed")  

@app.route('/api/GetCityies',methods=['GET'])
def  GetCities():    
    dfLocality = dm.load_locality_data()    
    dfLocality = dm.prepare_locality_data(dfLocality)
    result = dfLocality.sort_values(by=['CityName']).to_json(orient="records")
    parsed = json.loads(result)
    json.dumps(parsed, indent=4)            
    response = make_response(jsonify(parsed))  
    return response 

@app.route('/api/predict',methods = ['POST', 'GET'])
def predict(): 
      if request.method == 'POST': 
        try: 
            json_data = request.json             
            partSold = json_data['Part_Sold']
            area = json_data['Area']
            rooms  = json_data['Rooms']
            saleQuarter = json_data['Sale_Quarter']
            saleYear = json_data['Sale_Year']
            numBuilding = json_data['Num_Building'] 
            city = json_data['city'] 
            dfLocality = dm.load_locality_data()  
            dfLocality = dm.prepare_locality_data(dfLocality)
            dfLocality.drop(['Nicknames','Demography','YearEstablishment','YearDeclarationAsCity'],axis='columns', inplace=True)
            dfLocality = pd.get_dummies(dfLocality,prefix=['District','ReligiousCity'],columns=['District','ReligiousCity'])
            dfLocality.rename(columns = {'District_דרום':'District_south','District_ירושלים':'District_jerusalem','District_חיפה': 'District_Haifa', 'District_יהודה ושומרון':'District_yehuda','District_מרכז' : 'District_center','District_צפון':'District_north',
                    'District_תל אביב':'District_telAviv','ReligiousCity_כן':'ReligiousCity_yes','ReligiousCity_לא':'ReligiousCity_no','ReligiousCity_מעורב':'ReligiousCity_mixed'}, inplace = True)
            dfLocality.drop(['ReligiousCity_0','ReligiousCity_1','District_yehuda'],axis=1,inplace = True)
            
            dfCity =dfLocality.query("CityName ==  @city")
            dfCity.drop(['CityName'],axis='columns', inplace=True)            
            localityArr =dfCity.to_numpy()                     
            realestateData = [[partSold,area,rooms,saleQuarter,saleYear,numBuilding]]
            predData = np.concatenate((realestateData,localityArr), axis=1)
            result1 = dm.loadModelWithPredict(predData)
            result = {
                    "value": str(result1)         
                }
            json.dumps(result) 
            response = make_response(jsonify(result))
            return response
        except Exception as inst:
            print(type(inst))    # the exception instance
            print(inst.args)     # arguments stored in .args
            print(inst) 
            response = make_response(inst)        
            return response
        return response
     
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
    result,score,model = dm.build_model(df)
    dataResult = {
    'trainModel': 'RandomForest',
    'result': result,
    'score': score     
}
    saveModel = dm.save_model(model)
    json.dumps(dataResult)       
    response = make_response(jsonify(dataResult))  
    return response
 
if __name__ == '__main__':
    app.run(debug=True,port=8000)


