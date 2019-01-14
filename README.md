# NodeMasterClass-03 #
Node.js Master Class Homework Assignment #3

# GUI for Pizza Delivery API #

For this homework assignment, I've created a frontend application that relies on the api that was built in the previous assignment.

In order to fully test this frontend application you will need to initialize the api by providing Stripe and Mailgun credentials as described below.

## Initializing the API ##

Before you can place an order you will need to add some information to the config.js file. Open the config.js file for editing and fill in the areas between the `<>` symbols with your stripe.com and mailgun credentials.

# Testing the gui application #

To start, clone this project to your local machine, fill in the fields in the config.js file and start the server. Then, open a browser and go to localhost.com.

The application will allow you to:

- Create a user account
- Edit your user account
- Delete your user account
- Login
- Logout
- View the menu
- Add menu items to your shopping cart
- Review and edit your cart
- Place an order (checkout)
- Review your order history

The application should be fairly intuitive. The menu can be accessed whether or not you are logged in but items can only be added to the cart if you are logged in. When placing an order, you can specify a delivery date and time within a window of time determined by the allowableLeadTime property in the config file. I find working with dates in javascript to be somewhat challenging. This assignment gave me some good practice.
