from flask import Flask
from flask import render_template,render_template_string,request,make_response,jsonify
import sqlite3 as sql
import pandas as pd
from flask_cors import CORS
import json 
app = Flask(__name__)
CORS(app)
@app.route('/api/GetRealestateInfo',methods=['GET'])
def  GetRealestateInfo():    
    conn = sql.connect('RtateDB.db')
    df = pd.read_sql_query("select * from reStateInfo",conn)     
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    json.dumps(parsed, indent=4)        
    
    response = make_response(jsonify(parsed)) 
    # Add Access-Control-Allow-Origin header to allow cross-site request  
   # response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    conn.close()
    
    return response 

    
@app.route('/api/AddRealestate',methods = ['POST', 'GET'])
def addrecord():
    if request.method == 'POST':
        try:
             
            saleValue = request.form['Sale_value_in_shekels']
            partSold = request.form['Part_Sold']
            area = request.form['Area']
            rooms  = request.form['Rooms']
            saleQuarter = request.form['Sale_Quarter']
            saleYear = request.form['Sale_Year']
            numBuilding = request.form['Num_Building']  
            
            sqlite_insert_query = """INSERT INTO Rstatetable
                    (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building) 
                        VALUES 
                        (10,10,'1200',40,10,2020,1990)"""

            with sql.connect("RtateDB.db") as con:                    
                cur = con.cursor()
                
                count = cur.execute(sqlite_insert_query)
                con.commit()
                print("Record inserted successfully into SqliteDb_developers table ", cur.rowcount)
                cur.close()
                rows = cur.fetchall()
                print(rows)
                


            # with sql.connect("RStateNew.db") as con:
            #     cur = con.cursor()
            #     cur.execute("INSERT INTO Rstatetable (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building) 
            #     VALUES (%s,%s)",(saleValue,partSold,area,rooms,saleQuarter,saleYear,numBuilding) )                    
            #     con.commit()
            #     msg = "Record successfully added"
            #return request.form
    
        except sql.Error as error:
            print("Failed to insert data into sqlite table", error)
        finally:
            print("result.html")
            #con.close()
    else:
        print(request.form)
        return request.form
@app.route('/',methods = ['POST', 'GET'])
def testPost():    
    conn = sql.connect('RtateDB.db')
    print(request.form)
    # Add Access-Control-Allow-Origin header to allow cross-site request  
   # response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    conn.close()
    
    return request.form
 
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
        sqlite_insert_query = "INSERT INTO reStateInfo (Sale_value_in_shekels,Part_Sold,Area,Rooms,Sale_Quarter,Sale_Year,Num_Building) VALUES (%s, %s,%s,%s,%s,%s,%s)" %(saleValue, partSold,area,rooms,saleQuarter,saleYear,numBuilding)
        cursorObject.execute(sqlite_insert_query)
        cursorObject.execute("COMMIT")          
        return str(cursorObject.lastrowid)
if __name__ == '__main__':
    app.run(debug=True)


