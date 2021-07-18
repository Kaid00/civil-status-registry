const births = require('../models/birthModel')
const marriages = require('../models/marriageModel')
const puppeteer = require('puppeteer');

exports.dashboard =  async(req, res) => {
  try {
    const birth  = await births.find()
    const marriage  = await marriages.find();
    const last = await birth[birth.length-1];
   

    const total = birth.length + marriage.length;
    const birthPercentage = ((birth.length / total) * 100).toFixed(1);
    const marriagePercentage = ((marriage.length / total) * 100).toFixed(1);


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

exports.generateBirth = async (req, res, next) => {
  try {
    const birthData  = await births.find()
    const birth = await birthData[birthData.length-1];


    res.status(200).render('certificate_birth', {
    title: 'Generated Birth Certificate',
    birth
  })

  next()
  } catch(err) {
    res.status(400).json({
      status: 'Failed'
    })

    next()
  }

}

exports.generateBirthPrint = async (req, res, next) => {
  try {
    const birthData  = await births.find()
    const birth = await birthData[birthData.length-1];


    res.status(200).render('print_ready', {
    title: 'Generated Birth Certificate',
    birth
  })

  next()
  } catch(err) {
    res.status(400).json({
      status: 'Failed'
    })

    next()
  }

}


exports.getpuppet = async (req, res, next) => {
  try {
    const url = 'http://localhost:3000/print-ready';
    const browser = await puppeteer.launch()
    
    const page = await browser.newPage();
    await page.goto(url);
    //  await page.setContent(contenthtml)

    await page.pdf({path: "pdf1.pdf", format: "A3"});
    await browser.close();
    res.status(200).json({
      status: 'success',
      message: 'PDF saved'
    })

    return next()

  } catch(err) {
    res.status(400).json({
      status: 'failed',
      message: err
    })
    return next()
  }
}




