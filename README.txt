Konfigurasi Auth-Service Node.js
--------------------------------
Inisialisasi project
 - npm init -y

Installasi main package
 - npm install express cors axios bcryptjs jsonwebtoken dotenv

Install dependencies untuk database
 - npm install express cors bcrypt jsonwebtoken dotenv sequelize pg pg-hstore
 - untuk MySQL : npm install express cors bcrypt jsonwebtoken dotenv sequelize mysql2


*extra (idk if necessary)
- npm install sequelize sqlite3
- npm install axios
- npm install mysql-migrations

env lokal :
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=db_node
JWT_SECRET=goro-majima-pirating-in-hawaii
REFRESH_SECRET=rahasia_refresh_jwt

env docker :

DB_PORT=3306
DB_USER=appuser
DB_PASS=apppass
DB_NAME=db_node
JWT_SECRET=goro-majima-pirating-in-hawaii
REFRESH_SECRET=rahasia_refresh_jwt


