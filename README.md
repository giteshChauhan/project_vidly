<h1>project_vidly : Backend Service</h1>

<h3>Frontend</h3>

- Code: https://github.com/giteshChauhan/project_vidly_frontend
- What does this app for?: https://github.com/giteshChauhan/project_vidly_frontend

<h3>About:</h3>

- Learnings from <b>MERN</b> have been put to this project.

- This is the <i>backend</i> of projectvidly web application build on <b>nodejs</b> which is deployed on <i>digitalOcean</i>.

- Meanwhile <i>frontend</i> is build on <b>reactjs</b> which is deployed on <i>netlify</i>: https://projectvidly.netlify.app

- Also <i>database</i> used: <b>MongoDB Cloud</b> aka <i>Altas</i>

- As backend is deployed on digitalOcean and frontend on netlify, therefore <b>CORS</b> policy is resolved. Now only
  this https://projectvidly.netlify.app frontend can use our backend

<h3>Config:</h3>Set custom environment variables.
<pre><ol><li>project_vidly_env=""</li>
<li>project_vidly_db=""</li>
<li>project_vidly_private_key=""</li>
<li>project_vidly_email=""</li>
<li>project_vidly_pass=""</li></ol></pre>
<h3>APIs:</h3>

<ol>
<li><pre> POST/api/register : to register an user. Returns user-token.
Needs: {
    "name": "",
    "email": "",
    "pasword": "",
    "ip": "",
    "userMetaInfo": "",
    "os": "",
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
    "yt_id": "",
    "imdb_id": "",
    "year": "",
    "rating": "",
    "cinema": "",
    "contentType": "",
    "thumbnailUrl": "",
} </pre></li>
<li><pre> PUT:id/api/movies : to update a movie by id. Only admins can access.
Header: user-token
Body:{
    "title": "",
    "genreId": "",
    "yt_id": "",
    "imdb_id": "",
    "year": "",
    "rating": "",
    "cinema": "",
    "contentType": "",
    "thumbnailUrl": "",
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

<li><ul>
<li><pre> GET/api/cinema : to get all listed cinema.
Needs: {}</pre></li>
<li><pre> GET:id/api/cinema : to get genre by id.
Needs: user-token</pre></li>
<li><pre> POST/api/cinema : to add new genre into database. Only admins can access.
Header: user-token
Body: {
    "name" : ""
}</pre></li>
<li><pre> PUT:id/api/cinema : to update a genre by id. Only admins can access.
Header: user-token
Body: {
    "name" : ""
}</pre></li>
<li><pre> DELETE/api/cinema : to delete a genre by id. Only admins can access.
Needs: user-token</pre></li>
</ul></li>

<li><ul>
<li><pre> GET/api/contenttype : to get all listed contenttype.
Needs: {}</pre></li>
<li><pre> GET:id/api/contenttype : to get genre by id.
Needs: user-token</pre></li>
<li><pre> POST/api/contenttype : to add new genre into database. Only admins can access.
Header: user-token
Body: {
    "name" : ""
}</pre></li>
<li><pre> PUT:id/api/contenttype : to update a genre by id. Only admins can access.
Header: user-token
Body: {
    "name" : ""
}</pre></li>
<li><pre> DELETE/api/contenttype : to delete a genre by id. Only admins can access.
Needs: user-token</pre></li>
</ul></li>

<li><ul>
<li><pre> GET/api/history : to get user's history.
Needs: user-token</pre></li>
<li><pre> POST/api/history : to post each movie played to history.
Header: user-token
Body: {
    "movieId": "",
}</pre></li>
</ul></li>

<li><ul>
<li><pre> GET/api/watchlater : to get user's watch later movies.
Needs: user-token</pre></li>
<li><pre> POST/api/watchlater : to post user's movie to watch later.
Header: user-token
Body: {
    "movieId": "",
}</pre></li>
</ul></li>

<li><ul>
<li><pre> GET/api/feedback : to get user's feedback.
Needs: user-token</pre></li>
<li><pre> GET/api/feedback/all : to get all user's sent feedbacks. Only admins can access.
Needs: user-token</pre></li>
<li><pre> POST/api/feedback : to post user's feedback.
Body: {
    "email": "",
    "feedback": "",
    "ip": "",
}
</ul></li>
<h3>Views & utils:</h3>
<ul>
<li><pre>views/welcomeMessage.handlebars : handlebar template sent via email when new user registers'.</pre></li>
<li><pre>utils/mail.js : nodemailer transporter to send emails to users.</pre></li>
</ul>

</ol>
