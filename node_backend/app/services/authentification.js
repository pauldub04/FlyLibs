const jwt = require('jsonwebtoken');

const users = [
  {
    username: 'john',
    password: 'password123admin',
    role: 'admin'
  },
  {
    username: 'anna',
    password: 'password123member',
    role: 'member'
  }
];

module.exports = app => {
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
      // const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.TOKEN_SECRET);

      res.json({
        accessToken
      });
    } else {
      res.send('Username or password incorrect');
    }
  });
};

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};