# LaravelUtils

This library is basically mapping the most common Laravel API responses to an Angular project

## Table of contents
* [Installation](#installion)
* [Usage](#usage)
    * [Action Response](#action-response)
    * [Error Response](#error-response)

## Installion
```sh 
npm install @innoflash/laravel-utils
```

## Usage
> PS. Note that you can always customise the response by extending the interface to modify params according to your suit.
>
> All the responses passing extra data have keys named ```data``` but you can extend and override the key if you are wrapping your data with another key
### Action Response
Used mainly for retrieving results and responses from save and delete ops to name a few.

Used on responses like this one:
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

Laravel error responses eg.
```json
{
    "class": "Illuminate\\Validation\\ValidationException",
    "statusCode": 422,
    "message": "The password field is required."
}
```
### [ErrorResponse](./src/lib/responses/error.response.ts)
|Property         |Type         |Availability        |Description|
|------------------|-----------------------|------------------------|------------------------|
|```class```|string|mandatory|Helps the backend developer to figure the kind of error the API is giving|
|```statusCode```|number|mandatory|The status code emitted by the failed API call.|
|```message```|string|mandatory|The message emitted by the failed API call|
