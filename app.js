const 	express 			= require("express"),
  		bodyParser 			= require("body-parser"),
  		constants 			= require("./constants/constants"),
  		jwt 				= require("jsonwebtoken"),
  		verifyJWT 			= require("./middlewares/authorize"),
  		prepareJSONResponse = constants.prepareJSONResponse,
  		SYSTEM_PORT 		= 3000;

const app = express();

app.use(bodyParser.json());


/* ----- ROTAS ----- */

app.get("/", home);
app.get("/data", verifyJWT, authenticatedData);
app.post("/oauth/token", authenticateUser);

/* ----- ROTAS ----- */

/* ----- MÉTODOS ----- */
function home(req, res) {
	const message = "Welcome to our API!";

	console.log("Receiving a request!");
  
	prepareJSONResponse(res, 200, 1, message);
}

function authenticatedData(req, res) {
	console.log("Authenticated and getting data");
  
	prepareJSONResponse(res, 200, 1, { productId: 1, productName: "Teste", });
}

function authenticateUser(req, res) {
	console.log("Receiving an authentication request");
	
	try {
		const { username, password } = req.body;
		console.log(username, password)
	
		if (username === "felipeireslan" && password === "acct.global") {

			const id = 1;
			var token = jwt.sign({ id }, "secret", {
				expiresIn: 15,
			});
	
			return prepareJSONResponse(res, 200, 1, {
				auth: true,
				token: token,
			});
		}
	
		return constants.prepareJSONResponse(res, 200, 0, {
			message: "Invalid credentials!",
		});
	} catch (error) {
		return prepareJSONResponse(res, 500, 0, (error.message || JSON.stringify(error)))
	}
}
/* ----- MÉTODOS ----- */

app.listen(SYSTEM_PORT, () => {
  console.log("App running on Port: " + SYSTEM_PORT);
});
