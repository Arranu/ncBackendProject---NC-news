# Northcoders News API
https://nc-news-au.onrender.com/



# Summary 
https://github.com/Arranu/ncBackendProject---NC-news

An api for managing multiple SQL databases, equipped with several endpoints for handling their data, for more details on the individual endpoints functions go to https://nc-news-au.onrender.com/api, alternatively consult the endpoints.json file located on the root of this repo.


# Setup 
Follow the above link to the repo, click the green '<> Code' button and copy the http url. then open a local terminal cd to the location you want the repo based and run the below command:

```
$ git clone <url>
```

To begin using this api, 2 .env files will need to be created.
To utilise the text enviroment, create a '.env-test' file with a single line 'PGDATABASE=' and the name of the test db (see setup.sql for the db name). 
Now do the same for the development ('.env-development').

# Dependencies
below is the tech stack required to run the api in both development and test enviroments:

```
$ sudo apt install nodejs
```

"node.js":"^20.10.0" 

```
$ sudo apt install postgresql
```

"postgresql": "^14.10"

```
$ npm install <dev_dependencies> --save-dev
```
- "husky" :"^8.0.3"
- "jest" :"^27.5.1"
- "jest-extended" :"^2.0.0"
- "pg-format" :"^1.0.4"

```
$ npm install <dependencies>
```

- "dotenv" "^16.0.0"
- "express" "^4.18.2"
- "pg" "^8.7.3"
- "supertest" "^6.3.4"


# Setup - seeding
Next run the following via terminal:

```
$ npm run setup-dbs
```

this will setup the databases ready for seeding.

```
$ npm run seed
```

this will utilise the seed.js file located /db/seeds/ to populate the newly span up DBs with the data files located in /db/data/.

you should now be ready to utilise this repo. Try testing in terminal by running the below:

```
$ psql

$ \c nc_news_test

$ SELECT * FROM topics
$ SELECT * FROM articles
$ SELECT * FROM comments
$ SELECT * FROM users
```

if all return a table of data, the setup was a success.
