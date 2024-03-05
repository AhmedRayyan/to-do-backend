# To Do REST API


### 1) Technology & Libraries Used
-------
1) Node.js Runtime
2) Express Framework
3) PostgreSQL Database
4) Prisma ORM
5) JWT (JSON Web Tokens) For Auth.
6) Jest.js Testing Library
7) bcrypt to Hash Passwords


### 2) Installing Instructions
---------
First Make Sure You Have Node.js Runtime, PostgreSQL & GIT Installed On Your System, Then Create a Database With the Name "todo" For Example.


1) Run The Following
 
```
git clone https://github.com/AhmedRayyan/todo-backend.git
```

2) Then Go to todo-backend Folder and Run

```
npm install
```

3) Edit **.env** File With Your Configs
4)  Run DB Migrations With The Following Command

```
prisma db push
```

5) and Finally Run

```
npm run start
```

Then The Api Will Be Up & Running and You Can Consume It According To The Docs at http://host:port/api-doc