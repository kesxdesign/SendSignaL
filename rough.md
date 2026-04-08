#   Edit the following content in the head
- the title of the page 
- put a description in the head 
- include SEO meta content in the head
- change favicon to brand logo in the head

# Edit the following in the header
- place the navigation menu in the center
- remove the bottom border line of the header

- remove the login link from the header and align the navigation menu to the center
- confirm that the typography in the header is making use of the inter font family
- confirm that the on primary color is in the color system ask the agent to use in all the primary button text

- remove the sign in button on the hero section and align the start free trial button to the center
- remove the arrow icon in the start free trial button
- confirm that the typography in the hero section is making use of the inter font family
- confirm that the on primary color is in the color system ask the agent to use in all the primary button text
- remove all the sections below the hero section

- ask the agent to use 100vh for the height of the whole marketing page
- add a hover effect to the start free trial button

- in the mobile view of the marketing page let the brand logo be on the left and the hamburger menu be on the right
- let every other item in the header be hidden and only revealed when a hamburger icon is clicked

- redesign the create account page to be more engaging and user-friendly use the typography and color is in the variables.css file
- in the mobile view align all the content of the hamburger menu to the center and remove the bottom border line of the features and how it works links

# signup page experience problem
- navigation : Add a home link on the page. you can use the logo of the app to represent that
- input fields : needs hover effect and a focus effect
- remove form border
- bring the forget password link down below the password input field

- in the create account page and align the form titles to the center of the page and remove the description thats below the form title
- in the sign in page change the form title to sign in and align the form titles to the center of the page and remove the description thats below the form title
- on the sign in page align the "remember me" link and the"forget password" link on the same line
- in the create account page add a view password icon inside the password placeholder and align the logo to the right
- remove the icons in the placeholders of the create account page and the sign up page

# cursor behaviour
- set the cursor ot the form button to a pointer

# Form states
## Empty input state
-for the sign in  form if a user tries to submit the form with all the fields empty or with an invalid input do the following

for the email address input filed display an error message saying enter your company email  and also let the border of the input filled be the error color, use an error color from the variable.css file

for the password input field display an error message saying enter your password for and also let the border of the input filled be the error color, use an error color from the variable.css file

-for the create account  form if a user tries to submit the form with all the fields empty or with an invalid input do the following

for the name input filed display an error message saying enter your full name and also let the border of the input filled be the error color, use an error color from the variable.css file

for the email address input filed display an error message saying enter your company email and also let the border of the input filled be the error color, use an error color from the variable.css file

for the password input filed display an error message saying  choose a password and also let the border of the input filled be the error color, use an error color from the variable.css file

the error states should be displayed inside the placeholders on below them

# company name input field
- prevent special characters from being entered in the company name input field
minimum of 3 characters and maximum of 20 characters
-for the password requirements
- minimum of 8 characters
- maximum of 20 characters
- at least one uppercase letter
- at least one lowercase letter
- at least one number
- at least one special character

- do not display all the password requirements at once . display them as the user types in the password input field and as they meet the requirements, let the text color change to the success color from the variable.css file