const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Function to generate subdomain URL
function generateSubdomainURL(subdomain) {
    const mainDomain = 'freeallgame.com';
    return `https://${subdomain}.${mainDomain}`;
}

// Sample data: Mapping of links to subdomains
const linkToSubdomainMap = {
    'https://satyam.freeallgame.com': 'satyam',
    // Add other links and their associated subdomains here
};

// Route to render the form for generating subdomain URL
app.get('/generate', (req, res) => {
    res.render('generate-form');
});
app.post('/process', (req, res) => {
    const link = req.body.link;
    const subdomain = req.body.subdomain;

    // Generate subdomain URL using the provided subdomain
    const mainDomain = 'freeallgame.com';
    const subdomainURL = `https://${subdomain}.${mainDomain}`;

    // Associate the link with the provided subdomain in a simple object
    const linkToSubdomainMap = {
        [link]: subdomain,
        // Add other links and their associated subdomains here
    };

    // You can perform additional actions here based on the inputs

    // Render a response or perform actions based on the inputs
    res.render('generated-result', { link, subdomainURL, linkToSubdomainMap });
});

// Route to handle subdomain URL generation
app.post('/generate', (req, res) => {
    const subdomain = req.body.subdomain;

    if (subdomain) {
        const subdomainURL = generateSubdomainURL(subdomain);
        res.render('generated-url', { subdomainURL });
    } else {
        res.render('error', { error: 'Invalid subdomain provided.' });
    }
});

// Route to render the form for checking associated subdomain
app.get('/check', (req, res) => {
    res.render('check-form');
});

// Route to handle checking associated subdomain
app.post('/check', (req, res) => {
    const link = req.body.link;

    if (link) {
        const subdomain = linkToSubdomainMap[link];
        if (subdomain) {
            res.render('associated-subdomain', { subdomain });
        } else {
            res.render('error', { error: 'No subdomain associated with this link.' });
        }
    } else {
        res.render('error', { error: 'Invalid link provided.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


app.axios()