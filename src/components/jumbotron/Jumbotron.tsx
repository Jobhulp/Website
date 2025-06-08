import React from 'react';

interface BreadcrumbItem {
	label: string;
	href?: string;
	isActive?: boolean;
}

interface JumbotronProps {
	title: string;
	breadcrumbs: BreadcrumbItem[];
	children: React.ReactNode;
}

const Jumbotron: React.FC<JumbotronProps> = ({ title, breadcrumbs, children }) => {
	return (
		<section className="stunning-header bg-dark-themes pt200">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<ul className="breadcrumbs">
							{breadcrumbs.map((item, index) => (
								<li
									key={index}
									className={`breadcrumbs-item ${item.isActive ? 'active' : ''}`}
								>
									{item.href ? (
										<a href={item.href}>
											{item.label}
											{!item.isActive && <i className="puzzle-icon fal fa-angle-double-right"></i>}
										</a>
									) : (
										<span>{item.label}</span>
									)}
								</li>
							))}
						</ul>

						<h1 className="page-title text-white">{title}</h1>
					</div>
					{children}
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;