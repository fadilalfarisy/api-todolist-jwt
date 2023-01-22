## Documentation REST API Todolist JWT

***

##### **Info**
- Title: Todolist JWT
- Description: Todolist API with JWT Authorization
- Version : 1.0.0

##### **Server**
- URL : ``http://localhost:3000``
- Description : development

***

### Users


<!-- REGISTER USER -->
<details>

<summary> <code>POST</code> <code><b>/api/register</b></code> User sign up </summary>

##### Request

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | username  |  required |  String         |
    > | password  |  required |  String         |

- ##### Example 

    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `201`       |  success      | 
> | `400`       |  failed       |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 201,
        "message": "success",
        "username": "admin",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2NjZmMwODljOTI0OTFiYWUyM2Q4ZCIsImlhdCI6MTY3NDM2NjkxMiwiZXhwIjoxNjc0MzY3MjEyfQ.x52bMQDRsRAPPpCDL6C6y79KW17GaJkehMGa5LRqfUk"
    }
    ```

</details>


<!-- LOGIN USER -->
<details>

<summary> <code>POST</code> <code><b>/api/login</b></code> User sign in </summary>

##### Request

- ##### Body

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | username  |  required |  String         |
    > | password  |  required |  String         |

- ##### Example 

    ```json
    {
        "username": "admin",
        "password": "123"
    }
    ```

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      | 
> | `400`       |  failed       |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "username": "admin",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2NjZmMwODljOTI0OTFiYWUyM2Q4ZCIsImlhdCI6MTY3NDM2NzE1NiwiZXhwIjoxNjc0MzY3NDU2fQ.z7-vX-Y9YzUbBkqFKrRh3LuCfI029DxgvGvS1kn6IIk"
    }
    ```

</details>


<!-- LOGOUT USER -->
<details>

<summary> <code>GET</code> <code><b>/api/logout</b></code> User logout </summary>

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "info": "successfully logout"
    }
    ```

</details>


<!-- GET ALL USER -->
<details>

<summary> <code>GET</code> <code><b>/api/user</b></code> Get all data users </summary>

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "data": [
            {
                "_id": "63c7c4e605eb15ad189525f3",
                "username": "nasi",
                "password": "$2b$10$y8WXezqll3TNlSzgo8kKyOnVbhtbp1a6O7bVfiVhFSgetEAze1Gqe",
                "__v": 0
            },
            {
                "_id": "63cccfc089c92491bae23d8d",
                "username": "admin",
                "password": "$2b$10$S4zCq//D09jefv.sNBbIke3wGTVD.33MfneLtGShhi4xARFOi0oya",
                "__v": 0
            }
        ]
    }
    ```

</details>


<!-- DELETE USER -->
<details>

<summary> <code>DELETE</code> <code><b>/api/user/{id}</b></code> Delete user </summary>

##### Request

- ##### Params

    > | Name      |  Type     | Data Type       |
    > |-----------|-----------|-----------------|
    > | id        |  required |  ObjectId       |

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "data": [
            {
                "_id": "63c7c4e605eb15ad189525f3",
                "username": "nasi",
                "password": "$2b$10$y8WXezqll3TNlSzgo8kKyOnVbhtbp1a6O7bVfiVhFSgetEAze1Gqe",
                "__v": 0
            },
            {
                "_id": "63cccfc089c92491bae23d8d",
                "username": "admin",
                "password": "$2b$10$S4zCq//D09jefv.sNBbIke3wGTVD.33MfneLtGShhi4xARFOi0oya",
                "__v": 0
            }
        ]
    }
    ```

</details>



### Todo


<!-- GET ALL TODO USER -->
<details>

<summary> <code>GET</code> <code><b>/api/todo</b></code> Get todo user </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      | 
> | `401`       |  forbidden    |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "data": [
            {
                "_id": "63ccd4bedb7b85e5a3af0705",
                "todo": "drink",
                "status": "done",
                "description": "every 02:00 pm",
                "image": "public\\images\\1674368190714-Untitled Diagram.jpg",
                "user_id": "63cccfc089c92491bae23d8d",
                "__v": 0
            },
            {
                "_id": "63ccd51cdb7b85e5a3af0708",
                "todo": "playing video games",
                "status": "on progress",
                "description": "lego batman 2",
                "image": "public\\images\\1674368284674-conscious-design-TjURD8n3hbU-unsplash.jpg",
                "user_id": "63cccfc089c92491bae23d8d",
                "__v": 0
            }
        ]
    }
    ```

</details>


<!-- CREATE TODO -->
<details>

<summary> <code>POST</code> <code><b>/api/todo</b></code> Create todo user </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Form Data

    > | Name          |  Type     | Data Type                       |
    > |---------------|-----------|---------------------------------|
    > | todo          |  required |  String                         |
    > | status        |  required |  String Enum [on progress, done]|
    > | description   |  required |  String                         |
    > | image_todo    |  optional |  Binary                         |

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `201`       |  success      | 
> | `401`       |  forbidden    |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "data": {
            "todo": "playing video games",
            "status": "on progress",
            "description": "lego batman 2",
            "image": "public\\images\\1674368284674-conscious-design-TjURD8n3hbU-unsplash.jpg",
            "user_id": "63cccfc089c92491bae23d8d",
            "_id": "63ccd51cdb7b85e5a3af0708",
            "__v": 0
        }
    }
    ```

</details>


<!-- UPDATE TODO -->
<details>

<summary> <code>PUT</code> <code><b>/api/todo/{id}</b></code> Update todo user </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | id            |  required |  Object         |

- ##### Form Data

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | todo  |  required |  String           |
    > | status  |  required |  String Enum [on progress, done]           |
    > | description  |  required |  String           |
    > | image_todo  |  optional |  Binary           |

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      | 
> | `401`       |  forbidden    |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "data": "successfully edited todo"
    }
    ```

</details>


<!-- DELETE TODO -->
<details>

<summary> <code>DELETE</code> <code><b>/api/todo/{id}</b></code> Delete todo user </summary>

##### Request

- ##### Bearer Token

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | access token  |  required |  None           |

- ##### Params

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | id            |  required |  Object         |

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      | 
> | `401`       |  forbidden    |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "data": "successfully deleted todo"
    }
    ```

</details>

### Token

<!-- REFRESH TOKEN -->
<details>

<summary> <code>GET</code> <code><b>/api/refresh/</b></code>  Refresh token user </summary>

##### Request

- ##### Cookies

    > | Name          |  Type     | Data Type       |
    > |---------------|-----------|-----------------|
    > | refreshToken  |  required |  None           |

##### Responses

> | Code        | Description   |
> |-------------|---------------|
> | `200`       |  success      | 
> | `401`       |  forbidden    |
> | `500`       | server error  |

- ##### Success

    ```json
    {
        "status": 200,
        "message": "success",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2NjZmMwODljOTI0OTFiYWUyM2Q4ZCIsImlhdCI6MTY3NDM2OTE1MCwiZXhwIjoxNjc0MzY5NDUwfQ.GnNBHOjRdKSrXmpDjfPfNFcMubEh92fvt_3F3aJf6yE"
    }
    ```

</details>