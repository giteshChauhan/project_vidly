<h1>project_vidly</h1>

<h3>Frontend</h3>

-  Code: https://github.com/giteshChauhan/project_vidly_frontend
-  What does this app for?: https://github.com/giteshChauhan/project_vidly_frontend

<h3>About:</h3>

- Learnings from <b>MERN</b> have been put to this project.

- This is the <i>backend</i> of projectvidly web application build on <b>nodejs</b> which is deployed on <i>heroku</i>.

- Meanwhile <i>frontend</i> is build on <b>reactjs</b> which is deployed on <i>netlify</i>: https://projectvidly.netlify.app/movies

- Also <i>database</i> used: <b>MongoDB Cloud</b> aka <i>Altas</i>

- As backend is deployed on heroku and frontend on netlify, therefore <b>CORS</b> policy is resolved. Now only
  this https://projectvidly.netlify.app/movies frontend can use herokus backend

<h3>APIs:</h3>

<ol>
<li><pre> POST/api/register : to register an user. Returns user-token.
Needs: {
    "name": "",
    "email": "",
    "pasword": ""
}</pre></li>
<li><pre> POST/api/login : to login an user. Returns user-token.
Needs: {
    "email": "",
    "pasword": ""
}</pre></li>

<li><ul>
<li><pre> GET/api/movies : to get all listed movies.
Needs: {}</pre></li>
<li><pre> GET:id/api/movies : to get movie by id.
Needs: user-token</pre></li>
<li><pre> POST/api/movies : to add new movie into database. Only admins can access.
Header: user-token
Body:{
    "title": "",
    "genreId": "",
    "numberInStock" : "",
    "dailyRentalRate" : "",
} </pre></li>
<li><pre> PUT:id/api/movies : to update a movie by id. Only admins can access.
Header: user-token
Body:{
    "title": "",
    "genreId": "",
    "numberInStock" : "",
    "dailyRentalRate" : "",
}</pre></li>
<li><pre> DELETE/api/movies : to delete a movie by id. Only admins can access.
Needs: user-token</pre></li>
</ul></li>

<li><ul>
<li><pre> GET/api/genres : to get all listed genres.
Needs: {}</pre></li>
<li><pre> GET:id/api/genres : to get genre by id.
Needs: user-token</pre></li>
<li><pre> POST/api/genres : to add new genre into database. Only admins can access.
Header: user-token
Body: {
    "name" : ""
}</pre></li>
<li><pre> PUT:id/api/genres : to update a genre by id. Only admins can access.
Header: user-token
Body: {
    "name" : ""
}</pre></li>
<li><pre> DELETE/api/genres : to delete a genre by id. Only admins can access.
Needs: user-token</pre></li>
</ul></li>
<!-- 
<li><ul>
<li><pre> GET:id/api/rentals : to get rental by id.
Needs: user-token</pre></li>
<li><pre> POST/api/rentals : to add new rental into users collection.
Header: user-token
Body:{
    "customerId" : "",
    "movieId" : ""
}</pre></li>
</ul></li>
<li><ul>
<li><pre> GET/api/customers : to get all listed customers.Only admins can access.
Needs: {}</pre></li>
<li><pre> GET:id/api/customers : to get customer by id.Only admins can access.
Needs: user-token</pre></li>
<li><pre> POST/api/customers : to add new customer into database. Only admins can access.
Needs: user-token</pre></li>
<li><pre> PUT:id/api/customers : to update a customer by id. Only admins can access.
Needs: user-token</pre></li>
<li><pre> DELETE/api/customers : to delete a customer by id. Only admins can access.
Needs: user-token</pre></li>
</ul></li>
 -->
</ol>
