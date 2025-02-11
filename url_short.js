import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import Darkmode from "darkmode-js";

import qr from "qr-image";
import fs from "fs"; 

const app = express();
app.use(express.static("public")); // Serve static files from the 'public' directory
const port = 3000;
const API_URL = "https://cleanuri.com/api/v1/shorten";
app.use(bodyParser.urlencoded({ extended: false }));
new Darkmode().showWidget();

app.set("view engine", "ejs"); // Set the view engine to EJS




app.post("/submit_url", async (req, res) => {
	const ds = req.body.links;
	const data = new URLSearchParams({ url: ds }).toString();
	console.log(req.body.sel1);

	if (req.body.sel1 === "1") {
		try {
			const response = await axios.post(API_URL, data, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});
			console.log("done");
			res.render("index.ejs", { dat1: response.data.result_url });
		} catch (error) {
			res.render("index.ejs", { dat1: error.status });
		}
	} else {
		try {
			var qr_svg = qr.image(req.body.links);
			qr_svg.pipe(fs.createWriteStream("public/qr-of-link.png"));
			console.log("done2");
			res.render("index.ejs", { dat1: 3 });
		} catch (error) {
			res.render("index.ejs", { dat1: error.status });
		}

		
	}
});

app.listen(port, () => {
	console.log("Listening on port", port);
});
