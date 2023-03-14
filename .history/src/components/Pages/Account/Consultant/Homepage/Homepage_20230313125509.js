import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
const Homepage = () => {
	return (
		<div>
			<div className="homepage-contanier">
				<div className="homepage-main">
					<img src="Green.png" alt="logo" className="logo-btn" />

					<h1>Welcome to Intellidigest Consulting</h1>
					<p>Together we would deliver a more sustainable food system</p>

					<div className="home-btn">
						<button>
							<Link
								style={{ color: "white", textDecoration: "none" }}
								to="/consultants/signup"
							>
								Register
							</Link>
						</button>
						<button>
							<Link
								style={{ color: "white", textDecoration: "none" }}
								to="/consultants/login"
							>
								Login
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
