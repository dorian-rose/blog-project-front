# blog-project-front

## Start:

- Built with node. To download node_modules, run in terminal:

  - npm i

- To run server, run (in developer mode):
  - npm run dev
- In production:

  - npm start

- Environment variables that needs to be configured are noted in .env.template

# APIs

This app uses APIs from https://api-blog-pwi2.onrender.com/
and the following endpoints:

# ENDPOINTS:

## Entry (article) endpoints

1. To get all entries by one author (by author email):
   [urlBase]/entries/entries/:author/:limit/:skip

- Obligatory parameters:
  - :author = author email
  - :limit = results per page
  - :skip = number of results skipped before first shown result

2. To get all results, from all authors:
   [urlBase]/entries/all-entries/:limit/:skip

- Obligatory parameters:
  - :limit = results per page
  - :skip = number of results skipped before first shown result

3. To get one article by title and author:
   [urlBase]/entries/entry/:title/:author

- Obligatory parameters:
  - :title = title of article
  - :author = author email

4. To search all results (all authors) using search term/ key word:
   [urlBase]/entries/search/:search/:limit/:skip

- Obligatory parameters:
  - :search = search key word
  - :limit = results per page
  - :skip = number of results skipped before first shown result

5. To create an entry (article):
   [urlBase]/entries/create/:author (method POST)

- Obligatory parameters:
  - :author = author email (new entry will be assigned to this author via email)
- Body must include all fields (columns) of entry table in db, for example:

```javascript
   {"title": "TEST TITLE",
"content": "test content ",
"extract": "test extract",
"image": "testImage",
"category": "test category"}
```

6. To update an entry (article):
   [urlBase]/entries/update/:title/:author (method PUT)

   - Obligatory parameters:
     - :author = author email
     - :title = title of the article to be updated
   - Body: must include all fields (columns) of entry table in db, for example:

   ````javascript
    {"title": "NEW UPDATED TITLE",
   "content": "test content ",
   "extract": "test extract",
   "image": "testImage",
   "category": "test category"}```

   ````

7. To delete an entry (article):
   [urlBase]/entries/delete (method DELETE)

   - Body: title, for example:

   ```javascript
    {"title": "TITLE" }
   ```

8. Pages: To get the total number of entries/entries per author or search results:
   [server]/entries/number (method POST)

- Body:

  - To retrieve number of entries PER AUTHOR: email, for example:

  ```javascript
  {"email": "test@test.com" }`

  ```

  - To retrieve number of entries resulting from a search: search term, for example:

```javascript
   {"search": "lorem ipsum" }
```

- To retreive number of entries in total (all authors): body empty

## User (author/admin and reader/non-admin) endpoints

1. To login user (retrieve user details, validate password and generate token):
   +For user reader (non-admin): [urlBase]/users (method POST)
   +For user author (admin): [urlBase]/users/author (method POST)

- Body: email, password, for example:

```javascript
   {"email": "test@test.com",
   "password: "123456" }
```

2. To retrieve user details:
   +For user reader (non-admin): [urlBase]/users/verify

- For user author (admin): [urlBase]/users/author/verify
  - Body: email, for example:

```javascript
   {"email": "test@test.com" }
```
