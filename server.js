if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
console.log("Serving static files from:", path.join(__dirname, 'public'));

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []
// app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// app.get('/contact', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'contact.html'));
// });
// app.get('/catalog', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'catalog.ejs'));
// });

app.get('/contact', (req, res) => {
  res.render('contact', {name: req.user?.name || null,
  points: req.user?.points || 0,
email: req.user?.email || null })
})
app.post('/place-order', checkAuthenticated, (req, res) => {
  const { name, surname, address, email, number, pointsToUse } = req.body;
  if (!name || !surname || !address || !email || !number) {
    return res.status(400).json({ success: false, message: "Missing order fields" });
  }

  const user = req.user;
  const foundUser = users.find(u => u.id === user.id);

  if (foundUser) {
    let usedPoints = parseInt(pointsToUse) || 0;
    if (usedPoints > foundUser.points) usedPoints = foundUser.points;
    foundUser.points = foundUser.points - usedPoints + 10; // Subtract used, add 10 for new order
    if (foundUser.points < 0) foundUser.points = 0;
    console.log(`${foundUser.name} now has ${foundUser.points} points`);
    return res.json({ success: true, points: foundUser.points });
  } else {
    return res.status(400).json({ success: false, message: "User not found" });
  }
});

app.get('/api/user-points', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ points: req.user.points });
  } else {
    res.status(401).json({ points: 0 });
  }
});
app.use(express.urlencoded({ extended: false }));


app.get("/api/check-auth", (req, res) => {
  res.json({ loggedIn: !!req.user, points: req.user?.points || 0 });
});
app.get('/aboutus', (req, res) => {
  res.render('aboutus.ejs', { name: req.user?.name || null,
  points: req.user?.points || 0,
email: req.user?.email || null})
})


app.get('/catalog', (req, res) => {
  console.log("req.user:", req.user);
 res.render("catalog", {
  name: req.user?.name || null,
  points: req.user?.points || 0,
email: req.user?.email || null
});
})
app.get('/', (req, res) => {
  res.render('test.ejs', {name: req.user?.name || null,
  points: req.user?.points || 0,
email: req.user?.email || null})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      points: 0 // <- This line adds the points field
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})


app.delete('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });  }
    res.redirect('/login');
  
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
// app.get('/users', (req, res) => {
//   res.json(users)
//   res.render('test.ejs')
// })

// app.post('/users', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     const user = { name: req.body.name, password: hashedPassword }
//     users.push(user)
//     res.status(201).send()
//   } catch {
//     res.status(500).send()
//   }
// })

// app.post('/users/login', async (req, res) => {
//   const user = users.find(user => user.name === req.body.name)
//   if (user == null) {
//     return res.status(400).send('Cannot find user')
//   }
//   try {
//     if(await bcrypt.compare(req.body.password, user.password)) {
//       res.send('Success')
//     } else {
//       res.send('Not Allowed')
//     }
//   } catch {
//     res.status(500).send()
//   }
// })

app.listen(4000, () => {
  console.log("Server running on port 4000");
});