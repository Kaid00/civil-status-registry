

exports.dashboard =  (req, res) => {
 

    res.status(200).render('dashboard', {
      title: 'Dashboard',
      
    })

}

exports.birth =  (req, res) => {
    res.status(200).render('birth', {
      title: 'Birth'
    }) 
  }

exports.marriage = (req, res) => {
    res.status(200).render('marriage', {
      title: 'Marriage'
    })
  }

exports.upload = (req, res) => {
    res.status(200).render('upload', {
      title: 'CSV'
    })
  }

exports.home = (req, res) => {
  res.status(200).render('home', {
          title: 'CRS' 
      });
}

exports.login = (req, res) => {
    res.status(200).render('login', {
        title: 'Login',
    });

}


