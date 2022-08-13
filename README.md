<h1>project_vidly</h1>

<h3>About:</h3>

- Learnings from <b>MERN</b> have been put to this project.

- This is the <i>backend</i> of projectvidly web application build on <b>nodejs</b> which is deployed on <i>heroku</i>.

- Meanwhile <i>frontend</i> is build on <b>reactjs</b> which is deployed on <i>netlify</i>: https://projectvidly.netlify.app/movies

- Also <i>database</i> used: <b>MongoDB Cloud</b> aka <i>Altas</i>

- As backend is deployed on heroku and frontend on netlify, therefore <b>CORS</b> policy is resolved. Now only
  this https://projectvidly.netlify.app/movies frontend can use herokus backend

<h3>APIs:</h3>
<ul>
  <li><pre> POST/api/register : to register an user. Returns user-token.
            Needs: {
              "name": "",
              "email": "",
              "pasword": ""
            }</pre></li>
</ul>
