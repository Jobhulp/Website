import React from 'react';

const SignupCta: React.FC = () => {
	return (
		<section className="medium-padding120 bg-accent-primary">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 mb-4 mb-lg-0">
						<header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline decoration--dark-theme mb-0">
							<h2 className="heading-title">Begin nu met de Jobhulp!</h2>
							<div className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
						</header>
					</div>

					<div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
						<button type="button" className="crumina-button button--dark button--l button--with-icon button--icon-left" data-toggle="modal" data-target="#signupModal">						<i className="puzzle-icon fas fa-user-tie"></i>Sign Up					</button>
					</div>

				</div>
			</div>
		</section>
	);
};

export default SignupCta;