# mini-wp
## Routes Users
|Routes|HTTP Method|Request|Response|Description| 
|----|----|----|----|----|----|
|/users  |POST  |email: String,username: String,  password: String |Success: Register a user,<br /> Error: Internal server error |Register a user|
|/users/:id  |GET  |none |Success: Get user data by id, <br/>Error: Internal server error |Get user data by id|
|/users/login  |POST  |email: String , password: String |Success: Login as a user, <br/>Error: Internal server error |Login via email in Database|


## Routes Articles
|Routes|HTTP Method|Request|Response|Description|
|----|----|----|----|----|----|
|/articles/published  |GET  |none |Success: Get all published articles,<br /> Error: Internal server error|Get all published articles|
|/articles  |POST  |token : String, <br />title: String,<br /> content: String ,<br /> published : Boolean,<br /> image: File |Success: Create an article,<br /> Error: Internal server error | Create an article|
|/articles/:id  |PUT  |token : String, <br />title: String,<br /> content: String ,<br /> published : Boolean,<br /> image: File|Success: Update an article by id, <br />Error: Internal server error |Update an article by id|
|/articles/:id  | DELETE  |token: String |Success: Delete an article by id,<br /> Error: Internal server error |Delete an article by id|