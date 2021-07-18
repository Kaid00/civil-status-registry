const births = require('../models/birthModel')
const marriages = require('../models/marriageModel')
const puppeteer = require('puppeteer');
const path = require('path');

// Renders the dashboard view
exports.dashboard =  async(req, res) => {
  try {
    const birth  = await births.find()
    const marriage  = await marriages.find();
    
   
    // caculations for the statistics page
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

// Renders the create birth view
exports.birth =  (req, res) => {
    res.status(200).render('birth', {
      title: 'Birth'
    }) 
  }

  // Renders the create marriage view
exports.marriage = (req, res) => {
    res.status(200).render('marriage', {
      title: 'Marriage'
    })
  }

  // Renders the upload view
exports.upload = (req, res) => {
    res.status(200).render('upload', {
      title: 'CSV'
    })
  }

  // Renders the home view 
exports.home = (req, res) => {
  res.status(200).render('home', {
          title: 'CRS' 
      });
}

  // Renders the login view
exports.login = (req, res) => {
    res.status(200).render('login', {
        title: 'Login',
    });

}

// Renders a birth certificate in the dashboard 
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

// Generates the print-ready template used by the getpuppet function to generate the pdf
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

// Generate Pdf from a print-ready copy of certificate using puppeteer
exports.getpuppet = async (req, res, next) => {
  try {

    const url = 'http://localhost:3000/print-ready';
    const browser = await puppeteer.launch()
    
    const page = await browser.newPage();
    await page.goto(url);

    // path points to the root of the project directory: fixed later
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


exports.generateMarriagePrint = async (req, res, next) => {
  try {
    const marriageData  = await marriages.find();
    const marriage = await marriageData[marriageData.length-1];

    console.log(marriage)

    res.status(200).render('print_ready_marriage', {
    title: 'Generated Marriage Certificate',
    marriage
  })

  next()
  } catch(err) {
    res.status(400).json({
      status: 'Failed'
    })

    next()
  }
}

exports.test = (req, res) => {
  res.status(200).render('print_ready_marriage', {
      title: 'Print ready',
  });

}


// Sends PDf to the browser for downloads
exports.sendPdf = (req, res) => {
    let options = {
      root: path.join(__dirname, '..')
  };
 
    
  let fileName = 'pdf1.pdf';
  
  res.sendFile(fileName, options, function (err) {
      if (err) {
          console.log(err)
      } else {
          console.log('Sent:', fileName);
      }
  });

}






