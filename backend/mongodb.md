##Mongodb là gì

- Open source document, NoSQL database
- NoSQL?
    - No linking (foreign key)
    - Faster operation (CRUD)
- document?
    - Table === Collection
    - Row/record === Document
    - Column === Field

##Basic command
- show dbs: show all database in mongodb
- use <db_name>: create and switch to database
- db.createCollection(<db_name>): create collection
- db.collectionName.insertOne(): insert db
- db.collection.find(): query documents