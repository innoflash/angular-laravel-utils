# LaravelUtils

This library is basically mapping the most common Laravel API responses to an Angular project

## Table of contents
* [Installation](#installion)
* [Usage](#usage)
    * [Models](#models)
        * [JWToken](#jwtoken)
        * [Date](#date)
        * [Pagination](#pagination)
            * [Links](#links)
            * [Meta](#meta)
    * [API Responses](#api-responses)
        * [Action Response](#action-response)
        * [Error Response](#error-response)
        * [Auth Response](#error-response)
        * [Collection Response](#collection-response)
        * [Paginated Response](#paginated-response)

## Installion
```sh 
npm install @innoflash/laravel-utils
```

# Usage
> PS. Note that you can always customise the response by extending the interface to modify params according to your suit.
>
> All the responses passing extra data have keys named ```data``` but you can extend and override the key if you are wrapping your data with another key
## MODELS

### JWToken
This is used to map API JWT token into the project
* Used on login
* Used on token refresh

> JSON Response:
```json 
{
  "access_token": "access_token",
  "expires_in": 7200,
  "type": "bearer"
}
```
#### [JWToken](./src/lib/models/jwtoken.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```access_token```|string| mandatory|The JSON Web Token to be used as a header on accessing the other middleware protected routes.|
|```expires_in```| number|mandatory|The number of seconds the token is alive|
|```type```|string|mandatory| The token type.|

### Date
Used on manipulating date responses. 
> JSON Response.
````json
    {
        "approx": "3 hours ago",
        "formatted": "Mon 01 Jun 2020",
        "exact": "2020-06-01T12:46:28.000000Z",
        "time": "12:46"
     }
````
#### [Date](./src/lib/models/date.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```approx```|string|mandatory|The time in human readable form.|
|```formatted```|string|mandatory|The date time in a formatted style. (Just the date)|
|```exact```|string|mandatory|The date time as extracted from the DB.|
|```time```|string|mandatory|The date time in a formatted style. (Just the time)|
<hr/>
<br/>

### Pagination
This handles paginated data.
#### Links
Maps the links from pagination.
> JSON Response.
```json
{
    "first": "http://localhost:8000/api/users?page=1",
    "last": "http://localhost:8000/api/users?page=5",
    "prev": null,
    "next": "http://localhost:8000/api/users?page=2"
  }
```
##### [Links](src/lib/models/pagination/links.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```first```|string|mandatory|Link to the first page of the pagination.|
|```last```|string|mandatory|Link to the last page of the pagination.|
|```prev```|string|mandatory|Link to the previous page of the pagination.|
|```next```|string|mandatory|Link to the next page of the pagination.|

#### Meta
Maps the meta data passed from pagination.
> JSON Response.
```json
{
    "current_page": 1,
    "from": 3,
    "last_page": 5,
    "path": "http://localhost:8000/api/users",
    "per_page": 20,
    "to": 20,
    "total": 99
  }
```
##### [Meta](src/lib/models/pagination/meta.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```current_page```|number|mandatory|The current page in the paginated data.|
|```from```|number|mandatory|The number from which pagination is counting paginated data.|
|```last_page```|number|mandatory|The last possible page number from paginated data.|
|```path```|number|mandatory|The url being appended some page data.|
|```to```|number|mandatory|The number to which pagination is counting paginated data.|
|```total```|number|mandatory|The total number of items in the paginated data.|
## API RESPONSES

### Action Response
Used mainly for retrieving results and responses from save and delete ops to name a few.

> JSON Response.
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": [... optional data if any]
}
```
#### [ActionResponse](./src/lib/responses/action.response.ts) 
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```success```|boolean|mandatory|To flag whether a transaction succeeded or failed|
|```message```|string| mandatory|The message being send from the server.|
|```data```| T (generic)| optional| The extra data you can send with for the transaction.|

Example.
```typescript
saveProfile(data: object): Observable<ActionResponse>{
    return this.http.post<ActionResponse>(url, data)
}
```

### Error Response
Used mainly to process and render errors sent back by the server.

> JSON Response.
```json
{
    "exception": "Illuminate\\Validation\\ValidationException",
    "statusCode": 422,
    "message": "The password field is required."
}
```
### [ErrorResponse](./src/lib/responses/error.response.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```exception```|string|mandatory|Helps the backend developer to figure the kind of error the API is giving|
|```statusCode```|number|mandatory|The status code emitted by the failed API call.|
|```message```|string|mandatory|The message emitted by the failed API call|

Example usage is when you are creating an API error message handler.
```typescript
login(credentials: object): Observable<ActionResponse>{
    return this.http.post<ActionResponse>(url, credentials)
        .pipe(catchError(error => {
          const serverError: ErrorResponse = error.error
          throwError(serverError)
    }))
}
```
The consumer of the error will work with the error in this format.

### Auth Response
Used mainly when you are authenticating users especially login and you wanna save the user details on a successful login.

> JSON Response.
```json
{
  "user": {
    "id": 1,
    "user_name": "admin",
    "first_name": "Wendell",
    "last_name": "Halvorson",
    "email": "stoltenberg.meghan@example.org",
    "age": 30,
    "salary": 777084
  },
  "token": {
    "access_token": "access token",
    "expires_in": 7200,
    "type": "bearer"
  }
}
```
#### [AuthResponse](./src/lib/responses/auth.response.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```user```|T (generic)|mandatory|The user object brought from a successful login.|
|```token```|[JWToken](#jwtoken)|mandatory|The auth token from a success model.|

### Collection Response
Used when pulling collections of data
* Usually from ```Model::get()``` method
> JSON Response.
```json
{
  "data": [
    {
      "id": 40,
      "user_name": "odell80",
      "first_name": "Rhiannon",
      "last_name": "Brakus",
    }, 
    {
      "id": 41,
      "user_name": "flash",
      "first_name": "Ruben",
      "last_name": "Sikes",
    }
  ]
}
```
#### [CollectionResponse](./src/lib/responses/collection.response.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```data```|**T[]** (generic)|mandatory|The collection of objects of type T|

### Paginated Response
Used for mapping paginated results from the API.
> JSON Response.
```json
{
    "data": [
        {
            "id": 40,
            "user_name": "odell80",
            "first_name": "Rhiannon",
        },
        {
            "id": 61,
            "user_name": "ykessler",
        }
    ],
    "links": {
        "first": "http://localhost:8000/api/users?page=1",
        "last": "http://localhost:8000/api/users?page=5",
        "prev": null,
        "next": "http://localhost:8000/api/users?page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 5,
        "path": "http://localhost:8000/api/users",
        "per_page": 20,
        "to": 20,
        "total": 99
    }
}
```
#### [PaginatedResponse](./src/lib/responses/paginated.response.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|`````data```|**T[]** (generic)|mandatory|The collection of objects of type T|
|```links```|[Links](#links)|mandatory|The links of the paginated data.|
|```meta```|[Meta](#meta)|mandatory|The meta data of the paginated data.|
