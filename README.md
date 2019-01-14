# NodeMasterClass-03 #
Node.js Master Class Homework Assignment #3

# GUI for Pizza Delivery API #

For this homework assignment, I've created a frontend application that relies on the api that was built in the previous assignment.

In order to fully test the this frontend application you will need to initialize the api by providing Stripe and Mailgun credentials as described below.

## Initializing the API ##

Before you can place an order you will need to add some information to the config.js file. Open the config.js file for editing and fill in the areas between the `<>` symbols with your stripe.com and mailgun credentials.

# Testing the gui application #

To start, clone this project to you local machine, fill in the fields in the config.js file and start the server. Then, open a browser and go to localhost.com.

The application will allow you to:

- Create a user account
- Edit your user account
- Delete your user account
- Login
- Logout
- Add menu items to your shopping cart
- Review and edit your cart
- Place and order (checkout)
- Review your order history


### Create a user ###

**Path:** /users  
**Method:** POST  
**Body Example:**

```json
{
  "firstName" : "Abe",
  "lastName" : "Lincoln",
  "phone" : 9991234567,
  "email" : "<use an email that your mailgun account will send to>",
  "address" : "1860 Blue St, Gettysburg, PA 12345",
  "password" : "4Score7Years",
  "tosAgreement" : true
}
```

### Get a Token ###

**Path:** /tokens  
**Method:** POST  
**Body Example:**

```json
{
  "phone" : 9991234567,
  "password" : "4Score7Years"
}
```

### Get menu items ###

**Path:** /menu  
**Method:** GET  
*no parameters required*

### Add items to cart ###

**Path:** /carts/items/add  
**Method:** PUT  
**Required:** token key in header with valid token value returned by the earlier post to /tokens

**Body Example:**

```json
{
  "phone" : 9991234567,
  "menuItemId" : "22q43gbfxiccf86t94xb",
  "quantity" : 2
}
```

### Place Order ###

**Path:** /orders  
**Method:** POST  
**Required:** token key in header with valid token value returned by the earlier post to /tokens

**Body Example:**

```json
{
  "phone" : 9991234567
}
```


# API Documentation #

## Routes ##

### /users ###

**Allowable methods:** POST, GET, PUT, DELETE  

**[POST]**:  
  Parameters:  
  - firstName *string* (required)
  - lastName *string* (required)  
  - phone *number* (required 10 digits)  
  - email *string* (required)  
  - address *string* (required)
  - password *string* (required)
  - tosAgreement *boolen* (required - must be true)  

**[GET]**:  
  Parameters:  
  - phone *number* (required in queryString)

  Required header keys:
  - token

**[PUT]**:
  Parameters:  
  - firstName *string* (optional)
  - lastName *string* (required)  
  - phone *number* (optional)  
  - email *string* (optional)  
  - address *string* (optional)
  - password *string* (optional)  
  *at least one optional parameter must be supplied*

  Required header keys:
  - token

**[DELETE]**:  
  Parameters:  
  - phone *number* (required in queryString)

  Required header keys:
  - token

### /tokens ###

**Allowable methods:** POST, GET, PUT, DELETE  

**[POST]**:  
  Parameters:    
  - phone *number* (required 10 digits)
  - password *string* (required)

**[GET]**:  
  Parameters:  
  - id *string* (required in queryString)

**[PUT]**:
  Parameters:  
  - id *string* (required)
  - extend *boolean* (required true)

**[DELETE]**:  
  Parameters:  
  - id *string* (required in queryString)

  Required header keys:
  - token

### /carts ###

**Allowable methods:** GET

**[GET]**:
  Parameters:  
  - phone *string* (required in queryString)

  Required header keys:
  - token

### /carts/items/add ###

**Allowable methods:** PUT

**[PUT]**:
  Parameters:  
  - phone *string* (required)
  - menuId *string* (required)
  - quantity *number* (required)

  Required header keys:
  - token

### /carts/items/update ###

**Allowable methods:** PUT

**[PUT]**:
  Parameters:  
  - phone *string* (required)
  - cartItemId *string* (required)
  - quantity *number* (required)

  Required header keys:
  - token

### /carts/items/remove ###

**Allowable methods:** PUT

**[PUT]**:
  Parameters:  
  - phone *string* (required)
  - cartItemId *string* (required)

  Required header keys:
  - token

### /carts/items/empty ###

**Allowable methods:** PUT

**[PUT]**:
  Parameters:  
  - phone *string* (required)

  Required header keys:
  - token

### /menu ###

**Allowable methods:** POST, GET, PUT, DELETE  

**[POST]**:  
  Parameters:    
  - description *string* (required)
  - price *number* (required)

**[GET]**:  
  Parameters:  
  - id *string* (optional in queryString)

**[PUT]**:
  Parameters:  
  - id *string* (required)
  - description *string* (optional)
  - price *number* (optional)  
  *at least one optional parameter is required*

**[DELETE]**:  
  Parameters:  
  - id *string* (required in queryString)

  Required header keys:
  - token

### /orders ###

**Allowable methods:** POST, GET  

**[POST]**:  
  Parameters:    
  - phone *number* (required)
  - date *string* (optional - must be a valid date string)

  Required header keys:
  - token

**[GET]**:  
  Parameters:  
  - orderId *number* (required in queryString - must be valid numberic value)

  Required header keys:
  - token
