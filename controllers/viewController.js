const births = require('../models/birthModel')
const marriages = require('../models/marriageModel')

exports.dashboard =  async(req, res) => {
  try {
    const birth  = await births.find()
    const marriage  = await marriages.find();
    const last = await birth[birth.length-1];
    console.log(last);

    const total = birth.length + marriage.length;
    const birthPercentage = (birth.length / total) * 100;
    const marriagePercentage = (marriage.length / total) * 100;


    res.status(200).render('dashboard', {
      title: 'Dashboard',
      birth,
      marriage,
      marriagePercentage,
      birthPercentage
    })
  } catch(err) {
    res.status(200).res.json({
      status: 'Failed',
      message: err
    })
  }

 

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

exports.generateBirth = async (req, res) => {
  try {
    const birthData  = await births.find()
    const birth = await birthData[birthData.length-1];


    res.status(200).render('certificate_birth', {
    title: 'Generated Birth Certificate',
    birth
  })
  } catch {

  }

}




