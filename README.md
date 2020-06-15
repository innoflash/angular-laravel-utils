# LaravelUtils

This library is basically mapping the most common Laravel API responses to an Angular project

## Table of contents
* [Installation](#installion)
* [Usage](#usage)
    * [Action Response](#action-response)

## Installion
```sh 
npm install @innoflash/laravel-utils
```

## Usage
> PS. Note that you can always customise the response by extending the interface to modify params according to your suit.
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
