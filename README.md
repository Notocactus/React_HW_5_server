## БД 

postgres
Необходимо заранее создать таблицы в базе данных reactproj (путь к бд можно редактировать в файле /src/database/database.js) 

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name varchar(255)
)

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name varchar(255), 
	description text, 
	amount int, 
	unit varchar(255), 
	image varchar(255), 
	price int,
	categoryId int,
	FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
)

## Postman 
все скриншоты в папке Postman