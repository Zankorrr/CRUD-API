# CRUD-API

1. Clone repo:
```
https://github.com/Zankorrr/CRUD-API.git
```
2. Change branch:
```
git checkout "develop"
```
3. Install packages:
```
npm i
```
4. Run the application in development mode:
```
npm run start:dev
```
5. Or run the application in production mode:
```
npm run start:prod
```

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create new user in database with `user's required fields:`

username (string)

age (number)

hobbies (array of strings or empty array)

`DELETE api/users/${userId}` - to remove existing user from database
