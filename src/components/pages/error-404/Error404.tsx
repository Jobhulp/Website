import Link from 'next/link';

export default function Error404() {
  return (
	<div class="header--spacer" style="height: 142.234px; background-color: rgb(18, 18, 20);"></div>
    <div className="main-content-wrapper">
      <section className="pt120">
		<div className="container">
			<div className="row align-items-start">
				<div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-5 mb-lg-0">
					<header className="crumina-module crumina-heading heading--h2 heading--with-decoration">
						<h2 className="heading-title">We kunnen de pagina die u zoekt niet vinden!</h2>
						<div className="heading-text">Het lijkt erop dat de pagina die u zoekt, is verplaatst of niet
							bestaan. Maar er zijn nog een paar dingen die u kunt doen. Klik op het sitelogo om naar de homepage te gaan of probeer te zoeken.
						</div>
					</header>
					<a href="index.html" className="crumina-button button--primary button--xl">Ga naar Homapagina</a>
				</div>

				<div className="col-lg-8 col-md-6 col-sm-12 col-xs-12 mt-auto">
					<img className="d-block mb-negative-1" src="/img/svg/07_mountains.svg" title="company" />
				</div>
			</div>
		</div>
	</section>
    </div>
  );
}