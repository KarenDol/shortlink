import mysql.connector

dataBase = mysql.connector.connect(
    host='localhost',
    user='root',
    passwd='banana228'
    )
cursorObject = dataBase.cursor()

cursorObject.execute("CREATE DATABASE GO")

print("All Done!")