import pandas as pd
import seaborn as sb
from sklearn.model_selection import train_test_split
import sklearn.linear_model as sl
import requests
import json
import pickle
import sqlite3 as sql

from datetime import datetime      
import seaborn as sns
from sklearn.ensemble import RandomForestRegressor
def load_data():
    df = pd.read_excel('C:\\Users\\USER\\Desktop\\Yael_Course\\RealestateApartmenInfoOriginal.xlsx')
    return df
#this method take all new data added to realEstateInfoNew table
def load_RealEstateNewdata():
    # conn = sql.connect('RtateDB.db')
    # df = pd.read_sql_query("select * from realEstateInfoNew",conn)  
    #conn.close()    
    df = pd.read_excel("C:\\Users\\USER\\Desktop\\Yael_Course\\RealestateApartmenInfoOriginal.xlsx",header=0)
    return df
def load_locality_data():   
    dfLocality =  pd.read_excel("C:\\Users\\USER\\Desktop\\Yael_Course\\NewLocalityList-update.xlsx",header=0)
    return dfLocality 
def reload_data(dfGlobal):    
    headers = {"Content-Type": "application/json",                       
                       "Connection": "close"}
    r = requests.get('http://127.0.0.1:8000/api/GetRealestateInfo',headers=headers)
    dfupdate = pd.DataFrame(json.loads(r.text))   
    dfupdate.Sale_value_in_shekels = dfupdate.Sale_value_in_shekels.astype('float')
    dfupdate.Part_Sold = dfupdate.Part_Sold.astype('float')
    dfupdate.Area = dfupdate.Area.astype('float')
    dfupdate.Rooms = dfupdate.Rooms.astype('float')
    dfupdate.Sale_Year = dfupdate.Sale_Year.astype('int')
    dfupdate.Sale_Quarter = dfupdate.Sale_Quarter.astype('int')
    dfupdate.Num_Building = dfupdate.Num_Building.astype('float')
    dfupdate.NumberResidents_2015 = dfupdate.NumberResidents_2015.astype('float')
    dfupdate.NumberResidents_2016 = dfupdate.NumberResidents_2016.astype('float')
    dfupdate.NumberResidents_2017 = dfupdate.NumberResidents_2017.astype('float')
    dfupdate = pd.concat([dfGlobal,dfupdate])
    dfupdate.describe()
    return dfupdate     
 
def check_realestate_data(df): 
    stat = df.describe()
    if not stat.iloc[0].max() == stat.iloc[0].min():
        return "False - missing values"
    if (stat.Area['min'] < 0) or (stat.Area['max'] > 666):
        return "False - Wrong Area data"
    return "True" 
 
def check_locality_data(dfLocality):
    stat = dfLocality.describe()
    if not stat.iloc[0].max() == stat.iloc[0].min():
        return "False missing values"    
    return "True OK"
def GetQuarter(date_to_convert):
    return pd.Timestamp(date_to_convert).quarter
def CalcYearBuilding(year_building):
    return (datetime.now().year) - year_building   
def UpdateArea(row):
    if row.Area>40:
        return row.Area
    return int(model.predict([[row.Rooms]]).round())
def prepare_realeState_data(df):
    global model     
    df.head()
    df = df[df['Year_Building'] > 1800]
    df = df[df['Part_Sold'] >=1] 
    df = df[df['Area'] < 300]   
    df['Sale_Year'] = df['Sale_Day'].dt.year
    df['Sale_Quarter'] = df['Sale_Day'].apply(GetQuarter)
    df['Num_Building'] =df['Year_Building'].apply(CalcYearBuilding)   
    X = df.query("Rooms>0").Rooms.values.reshape(-1,1)
    y = df.query("Rooms>0").Area
    model = sl.LinearRegression()
    model.fit(X,y)
    df['Area'] = df.apply(UpdateArea,axis=1)  
    return df

def replace_column_names(df):
    df.rename(columns = {'גוש חלקה' : 'Block_plot', 'יום מכירה' : 'Sale_Day','תמורה מוצהרת בש"ח':'Declared_value_in_shekels','שווי מכירה בש"ח':'Sale_value_in_shekels',
                    'מהות':'Essence','חלק נמכר':'Part_Sold','ישוב':'Locality','שנת בניה':'Year_Building','שטח':'Area','חדרים':'Rooms'}, inplace = True)
    return df
def prepare_locality_data(dfLocality):
    dfLocality.columns = ['CityName', 'District', 'NumberResidents_2015', 'NumberResidents_2016', 'NumberResidents_2017', 'LocalityArea', 'PopulationDensity', 'Nicknames', 'Demography', 'AnnualPopulation_Growth', 'SocioEconomicRanking','YearEstablishment','YearDeclarationAsCity','ReligiousCity','TrainAccessible','PercentageJews']
    dfLocality.drop(["PercentageJews"],axis=1,inplace=True)
    return dfLocality
def prepare_global_data(df,dfLocality):
    dfGlobal = pd.merge(df, dfLocality, left_on='Locality', right_on='CityName')
    dfGlobal.drop(['Year_Building','Block_plot','Locality','Sale_Day','Nicknames','Demography','YearEstablishment','YearDeclarationAsCity','CityName','Essence','Declared_value_in_shekels'],axis='columns', inplace=True)
    dfGlobal.dropna(
    axis=0,
    how='any',
    thresh=None,
    subset=None,
    inplace=True
  )
    dfDummies = pd.get_dummies(dfGlobal,prefix=['District','ReligiousCity'],columns=['District','ReligiousCity'])
    dfDummies.rename(columns = {'District_דרום':'District_south','District_ירושלים':'District_jerusalem','District_חיפה': 'District_Haifa', 'District_מרכז' : 'District_center','District_צפון':'District_north',
                    'District_תל אביב':'District_telAviv','ReligiousCity_כן':'ReligiousCity_yes','ReligiousCity_לא':'ReligiousCity_no','ReligiousCity_מעורב':'ReligiousCity_mixed'}, inplace = True)
 
 
    #indexNames = pd.DataFrame({'test_pred':y_test/predictions> 0.9}).query('test_pred ==True').index
    #df.drop(indexNames ,inplace=True)
    return dfDummies
def build_model(df):
    score=0
    y = df.Sale_value_in_shekels
    X = df.drop(['Sale_value_in_shekels'],axis=1)
    for i in range(5):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33)
        model = RandomForestRegressor(n_estimators=500,max_depth=8,max_features='auto',criterion='mse')   
        model.fit(X_train, y_train)
        score = model.score(X_test,y_test)
        if(score<0.91):
            return False,score,model
        return True,score,model
def save_model(model):
    f = open('modeldata','wb')
    pickle.dump(model,f)
    f.close()
    return "saved"
def loadModelWithPredict(predData):
    with open('modeldata', 'rb') as f:
        loaded_model = pickle.load(f)
    return str(loaded_model.predict(predData))   