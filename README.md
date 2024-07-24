To test the /profile API endpoint in Thunder Client, you need to follow these steps:

1. Register a New User: First, create a new user by sending a POST request to the /auth/register endpoint.

2. Login the User: Then, log in with the registered user's credentials by sending a POST request to the /auth/login endpoint to obtain a JWT token.

3. Access the Profile Endpoint: Finally, use the obtained JWT token to access the /auth/profile endpoint.

Here are the detailed steps:

Step 1: Register a New User
  => Method: POST
  => URL: http://localhost:3000/auth/register
  => Body: {
            "username": "testuser",
            "email": "test@example.com",
            "password": "password"
           }

Step 2: Login the User
  => Method: POST
  => URL: http://localhost:3000/auth/login
  => Body: {
            "email": "test@example.com",
            "password": "password"
           }

Response: You should receive a response with a JWT token. Copy the token from the response body.
{
  "token": "your_jwt_token_here"
}


Step 3: Access the Profile Endpoint
Method: GET

URL: http://localhost:3000/auth/profile

Headers:

Authorization: Bearer your_jwt_token_here
Replace your_jwt_token_here with the actual token you received from the login response.

