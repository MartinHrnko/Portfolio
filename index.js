import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";

const app = express();
const port = 3000;


app.use(express.static("public")); //linking other files such as CSS
app.use(bodyParser.urlencoded({ extended:true })); //ability to open new files

// MAIN PAGE OPEN
app.get("/", (req, res) => {
    try {
        res.render("index.ejs");
    } catch {
        console.log("Failed to make a request :", error.message);
        res.status(404).send("error.message");
    }
});

// requesting a new symbol from API and showing it into a home page
let portfolio = []





app.post("/portfolio", async (req, res) => {
    const companyName = req.body.symbol;
    try {
        const API = "?apikey=bJcGHJL92cISqOKjpLudNTtGaizSMMGr";
        const response = await axios.get("https://financialmodelingprep.com/api/v3/profile/" + companyName + API );
        const reply = response.data;
        portfolio.push(reply[0]);
        res.render("portfolio.ejs", { data: portfolio });
    } catch {
        console.log("Failed to make a request :");
        res.status(404).send("error.message");
    }
});

app.get("/portfolio", (req, res) => {
    res.render("portfolio.ejs", { data: portfolio });
});


// This will open a new page for the symbol of investment, that you have openned
app.get("/portfolio/:lineSymbol", (req, res) => {
    const requestedLine = req.params.lineSymbol;
    res.render("companyPage.ejs", { symbol: requestedLine });
})

app.get("/delete/:lineSymbol", (req, res) => {
    const requestedLine = req.params.lineSymbol;
    portfolio = portfolio.filter(function (line) {
        return (line.symbol) !== requestedLine;
    });
    res.redirect("/");
})


// Opening port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});