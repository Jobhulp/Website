import React from 'react';
import Link from "next/link";
import logo from '@/assets/img/svg/01_logo_white.svg';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear()
	return (
		<footer id="site-footer" className="footer bg-dark-themes">

			<div className="footer-content">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-0">
							<div className="widget w-info">
								<Link href="/" className="site-logo">
									<img className="puzzle-icon" src={logo.src} alt="Jobhulp logo" width="120" />
								</Link>
								<p>Jobhulp is een slim matching platform dat mensen en jobs aan elkaar koppelt voor er gesolliciteerd wordt. Alleen sterke matches komen in contact. Je spreekt alleen met mensen die echt passen.</p>

								<div className="contact-item">
									<svg className="puzzle-icon" width="11" height="16">
										<path fill="" fillRule="evenodd" d="M5.5 13.089c-.756 0-1.375.654-1.375 1.454 0 .801.619 1.455 1.375 1.455s1.375-.654 1.375-1.455c0-.8-.619-1.454-1.375-1.454zM1.375-.003C.619-.003 0 .653 0 1.452c0 .801.619 1.455 1.375 1.455S2.75 2.253 2.75 1.452c0-.799-.619-1.455-1.375-1.455zm0 4.364C.619 4.361 0 5.016 0 5.816 0 6.617.619 7.27 1.375 7.27S2.75 6.617 2.75 5.816c0-.8-.619-1.455-1.375-1.455zm0 4.364C.619 8.725 0 9.379 0 10.18c0 .8.619 1.455 1.375 1.455S2.75 10.98 2.75 10.18c0-.801-.619-1.455-1.375-1.455zm8.25-5.818c.756 0 1.375-.654 1.375-1.455 0-.799-.619-1.455-1.375-1.455S8.25.653 8.25 1.452c0 .801.619 1.455 1.375 1.455zM5.5 8.725c-.756 0-1.375.654-1.375 1.455 0 .8.619 1.455 1.375 1.455s1.375-.655 1.375-1.455c0-.801-.619-1.455-1.375-1.455zm4.125 0c-.756 0-1.375.654-1.375 1.455 0 .8.619 1.455 1.375 1.455S11 10.98 11 10.18c0-.801-.619-1.455-1.375-1.455zm0-4.364c-.756 0-1.375.655-1.375 1.455 0 .801.619 1.454 1.375 1.454S11 6.617 11 5.816c0-.8-.619-1.455-1.375-1.455zm-4.125 0c-.756 0-1.375.655-1.375 1.455 0 .801.619 1.454 1.375 1.454s1.375-.653 1.375-1.454c0-.8-.619-1.455-1.375-1.455zm0-4.364c-.756 0-1.375.656-1.375 1.455 0 .801.619 1.455 1.375 1.455s1.375-.654 1.375-1.455c0-.799-.619-1.455-1.375-1.455z" />
									</svg>
									<a href="tel:+32800567890">+32 800 567.890</a> Ma-Vr 9u-18u
								</div>

								<div className="contact-item">
									<i className="puzzle-icon far fa-at" />
									<a href="mailto:info@jobhulp.be">info@jobhulp.be</a>
								</div>

							</div>
						</div>

						<div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-0">
							<div className="widget widget_links">
								<h5 className="widget-title">
									Voor Kandidaten
								</h5>

								<ul>
									<li>
										<Link href="/candidates/submit-resume">Maak je profiel</Link>
									</li>

									<li>
										<Link href="/jobs/job-lists">Bekijk matches</Link>
									</li>

									<li>
										<Link href="/how-it-works">Hoe het werkt</Link>
									</li>

									<li>
										<Link href="/candidates/resume-preview">Mijn dashboard</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 mb-4 mb-lg-0">
							<div className="widget widget_links">
								<h5 className="widget-title">
									Voor Werkgevers
								</h5>

								<ul>
									<li>
										<Link href="/jobs/company-profile">Bedrijfsprofiel</Link>
									</li>

									<li>
										<Link href="/candidates/candidate-lists">Bekijk kandidaten</Link>
									</li>

									<li>
										<Link href="/jobs/job-lists">Maak een job</Link>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-0 mb-lg-0">
							<div className="widget w-contacts">
								<h5 className="widget-title">
									Blijf op de hoogte
								</h5>
								<p>Schrijf je in voor onze nieuwsbrief en ontvang tips over slimmer matchen.</p>

								<div className="input--border-bottom">
									<input name="mail" placeholder="E-mailadres" type="email" />
									<i className="puzzle-icon far fa-envelope" />
								</div>

								<ul className="socials">
									<li>
										<a href="#" aria-label="Facebook">
											<i className="puzzle-icon fab fa-facebook-square" />
										</a>
									</li>
									<li>
										<a href="#" aria-label="LinkedIn">
											<i className="puzzle-icon fab fa-linkedin-in" />
										</a>
									</li>
									<li>
										<a href="#" aria-label="Instagram">
											<i className="puzzle-icon fab fa-instagram" />
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="sub-footer">
				<div className="container">
					<div className="row align-items-center">

						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center text-lg-left mb-4 mb-lg-0">
							<ul className="footer-main-menu">
								<li>
									<Link href="/">Home</Link>
								</li>
								<li>
									<Link href="/how-it-works">Hoe het werkt</Link>
								</li>
								<li>
									<Link href="/candidates/submit-resume">Voor Kandidaten</Link>
								</li>
								<li>
									<Link href="/jobs/company-profile">Voor Werkgevers</Link>
								</li>
								<li>
									<Link href="/news/news-page">Nieuws</Link>
								</li>
							</ul>
						</div>

						<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 text-center text-lg-right">
							<div className="copyright">
								<span>&copy; {currentYear} </span>
								<span><a href="https://jobhulp.be">Jobhulp.</a></span>
								<span>Onderdeel van <a href="https://ospi-international.org/" className="logo-title">OSPI</a></span>
							</div>
						</div>

					</div>
				</div>
			</div>

			<a className="back-to-top" href="#">
				<svg className="puzzle-icon" width="24" height="28">
					<path fill="" fillRule="evenodd" d="M23.027 1.966H.973A.98.98 0 0 1 0 .983C0 .44.432 0 .973 0h22.054A.98.98 0 0 1 24 .983a.983.983 0 0 1-.973.983zM11.306 6.105a.975.975 0 0 1 1.382 0l6.083 6.111a.988.988 0 0 1 0 1.39.974.974 0 0 1-1.377 0l-4.415-4.437v17.853A.98.98 0 0 1 12 28a.975.975 0 0 1-.973-.978V9.169l-4.415 4.437a.976.976 0 0 1-1.383 0 .988.988 0 0 1 0-1.39l6.077-6.111z" />
				</svg>
				Naar boven
			</a>
		</footer>
	);
};

export default Footer;
