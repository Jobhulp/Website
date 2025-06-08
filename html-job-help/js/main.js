
//Global var
var CRUMINA = {};

(function ($) {

	// USE STRICT
	"use strict";

	//----------------------------------------------------/
	// Predefined Variables
	//----------------------------------------------------/
	var $window = $(window),
		$document = $(document),

		//Elements
		$header = $('#site-header'),
		$countdown_number = $('.crumina-countdown-number'),
		$primaryMenu = $('#primary-menu'),
		$preloader = $('#hellopreloader');


	/* -----------------------
	 * Preloader
	 * --------------------- */

	CRUMINA.preloader = function () {
		$window.scrollTop(0);
		setTimeout(function () {
			$preloader.fadeOut(800);
		}, 500);
		return false;
	};

	/* -----------------------
 * COUNTDOWN
 * https://github.com/wimbarelds/TimeCircles
 * --------------------- */

	CRUMINA.countdowns = function () {

		$countdown_number.each(function () {
			$(this).TimeCircles({
				circle_bg_color: 'transparent',
				animation_interval: 'ticks',
				number_size: 0.36,
				text_size: 0.12,

				time: {
					Days: {color: 'transparent'},
					Hours: {color: 'transparent'},
					Minutes: {color: 'transparent'},
					Seconds: {color: 'transparent'}
				}
			});

		});
	};


	/*---------------------------------
		ACCORDION
	-----------------------------------*/

	$('.crumina-accordion button').on('click', function () {

		var $acordionOpen = $(this).closest(".card").find(".collapse").hasClass("show");

		$(this).closest(".crumina-accordion").find(".card-header").removeClass("active");

		if($acordionOpen){
			$(this).parents(".card-header").removeClass("active");
		}else {
			$(this).parents(".card-header").toggleClass("active");
		}
	});


	/* -----------------------------
     * Select2 for Language Switcher Initialization
     * https://select2.org/getting-started/basic-usage
     * ---------------------------*/

	CRUMINA.select2LS = function () {
		var $switcher = $( '.language-switcher' );

		$switcher.on( 'select2:select', function ( e ) {
			var data = e.params.data;
			var $self = jQuery(data.element);
			if ( !$self.length || data.selected !== true || data.disabled === true ) {
				return;
			}

			var href = $self.data('href');

			if(href){
				location.href = href;
			}

		} );
	};


	/* -----------------------------
     * Select2 Initialization
     * https://select2.org/getting-started/basic-usage
     * ---------------------------*/

	CRUMINA.select2Init = function () {
		$('.puzzle--select').select2();
	};


	/* -----------------------------
 	* Main Menu
 	* http://www.webpulse.com.br/menuzord/index.html
 	* ---------------------------*/

	CRUMINA.primaryMenu = function () {
		$primaryMenu.crumegamenu({
			showSpeed: 200,
			hideSpeed: 200,
			trigger: "hover",
			animation: "none",
			effect: "fade",
			indicatorFirstLevel: "",
			indicatorSecondLevel: ""
		});
	};


	/* ==========================================

	Sticky Header

	========================================== */

	CRUMINA.fixedHeader = function () {
		var $stickyHeader = $('.header--sticky');

		$(document).on("scroll", function(){

			if ($(document).scrollTop() > 100){
				$stickyHeader.addClass("header--fixed");
			} else {
				$stickyHeader.removeClass("header--fixed");
			}

		});

	};

	/* -----------------------
     * Header Spacer
     * --------------------- */
	CRUMINA.headerSpacer = {
        $spacer: null,
        $header: null,
        init: function () {
            this.$header = jQuery('.header--sticky');

            this.$spacer = jQuery('<div class="header--spacer"></div>').insertAfter(this.$header);
        },
        resize: function () {
            var _this = this;

            if (!_this.$spacer) {
                return;
            }

            setTimeout(function () {
                var height = _this.$header.outerHeight();
                var backgroundHeader = _this.$header.css('background-color');
                _this.$spacer.css({'height': height + 'px', 'background-color': backgroundHeader});
            }, 100);
        }
    };

    /* -----------------------
     * Create the map
     * https://leafletjs.com/
     * --------------------- */

    CRUMINA.maps = {
        maps: {
            candidates: {

				config: {
					id: 'map-candidate',
					map: {
						center: new L.LatLng(-37.613611, 144.963056),
						zoom: 10,
						maxZoom: 18,
						layers: new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
							maxZoom: 18,
							attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						})
					},
					icon: {
						iconSize: [60, 60],
						iconAnchor: [22, 94],
						popupAnchor: [-3, -76],
						className: 'icon-candidate'
					},
                    cluster: {
                         iconSize: [40, 40]
                    }
				},

				markers: [
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.813611, 144.963056],
						icon: 'author1.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.713611, 144.863056],
						icon: 'author2.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.713611, 145.5],
						icon: 'author3.jpg'
					},

					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.893611, 144.773056],
						icon: 'author4.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.873611, 145.1],
						icon: 'author11.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.753611, 144.943056],
						icon: 'author6.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.633611, 145.3],
						icon: 'author7.jpg'
					},

					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.813611, 145.4056],
						icon: 'author8.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.613611, 144.993056],
						icon: 'author9.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.613611, 144.873056],
						icon: 'author10.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.73611, 145.183056],
						icon: 'author11.jpg'
					},


					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.883611, 144.693056],
						icon: 'author12.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.833611, 145.503056],
						icon: 'author13.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.813611, 144.163056],
						icon: 'author14.jpg'
					},

					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.793611, 144.863056],
						icon: 'author15.jpg'
					},
					{
						popup: "<a href=\"#\" class=\"link--uppercase-wide fs-12\">Designer</a>" + "<h6>Russell Wright</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<a href='10_candidate_details.html' class=\"crumina-button button--dark button--s button--with-icon button--icon-right\">View profile<i class=\"puzzle-icon far fa-angle-right\"></i></a>",
						coords: [-37.713611, 145.083056],
						icon: 'author16.jpg'
					}

					]

            },
            employers: {
                config: {
                    id: 'map-employer',
                    map: {
                        center: new L.LatLng(-37.613611, 144.963056),
                        zoom: 10,
                        maxZoom: 18,
                        layers: new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                            maxZoom: 18,
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        })
                    },
                    icon: {
                        iconSize: [24, 30],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
						className: ''
                    },
                    cluster: {
                         iconSize: [40, 49]
                    }
                },
                markers: [
                    {
                        popup: "<img class=\"logo\" src=\"./img/client4.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
                        coords: [-37.813611, 144.963056],
                        icon: 'leaf-green.png'
                    },
                    {
                        popup: "<img class=\"logo\" src=\"./img/client1.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
                        coords: [-37.713611, 144.863056],
                        icon: 'leaf-green.png'
                    },
					{
						popup: "<img class=\"logo\" src=\"./img/client2.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.713611, 145.5],
						icon: 'leaf-green.png'
					},

					{
						popup: "<img class=\"logo\" src=\"./img/client3.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.893611, 144.773056],
						icon: 'leaf-red.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client4.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.873611, 145.1],
						icon: 'leaf-red.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client1png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.753611, 144.943056],
						icon: 'leaf-red.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client2.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.633611, 145.3],
						icon: 'leaf-red.png'
					},

					{
						popup: "<img class=\"logo\" src=\"./img/client3.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.813611, 145.4056],
						icon: 'leaf-blue.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client4.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.613611, 144.993056],
						icon: 'leaf-blue.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client1.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.613611, 144.873056],
						icon: 'leaf-blue.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client2.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.73611, 145.183056],
						icon: 'leaf-blue.png'
					},


					{
						popup: "<img class=\"logo\" src=\"./img/client3.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.883611, 144.693056],
						icon: 'leaf-blue-dark.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client4.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.833611, 145.503056],
						icon: 'leaf-blue-dark.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client1.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.813611, 144.163056],
						icon: 'leaf-blue-dark.png'
					},

					{
						popup: "<img class=\"logo\" src=\"./img/client2.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.793611, 144.863056],
						icon: 'leaf-yellow.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client3.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.713611, 145.083056],
						icon: 'leaf-yellow.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client4.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.753611, 144.533056],
						icon: 'leaf-yellow.png'
					},
					{
						popup: "<img class=\"logo\" src=\"./img/client1.png\" title=\"company\"></a>" + "<h6>Data Center Support Specialist Engineer</h6>" + "<div class=\"vacancies-location\">Melbourne, Australia</div>" + "<button type=\"button\" class=\"crumina-button button--red button--xxs button--uppercase-wide\">Temporary</button>",
						coords: [-37.93611, 145.403056],
						icon: 'leaf-yellow.png'
					}

                ]
            },
			contacts: {
				config: {
					id: 'map-contact',
					map: {
						center: new L.LatLng(-37.613611, 144.963056),
						zoom: 10,
						maxZoom: 18,
						layers: new L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
							maxZoom: 18,
							attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						})
					},
					icon: {
						iconSize: [24, 30],
						iconAnchor: [22, 94],
						popupAnchor: [-3, -76],
						className: ''
					},
					cluster: {
						iconSize: [40, 49]
					}
				},
				markers: [
					{
						popup: "<img class=\"logo\" src=\"./img/logo-dark.png\" title=\"company\">" + "<div class=\"fs-16 mb-4\">121 King Street, Melbourne Victoria 3000 Australia\n" +
						"+61 3 8376 6284</div>" + "<a href='#' class=\"crumina-button button--green button--s\" data-toggle=\"modal\" data-target=\"#messageModal\">Send a Message</a>",
						coords: [-37.813611, 144.963056],
						icon: 'leaf-contact.png'
					}

				]
			},
        },
        init: function () {
            var _this = this;

            for (var key in this.maps) {
                var data = this.maps[key];

                if (!data.config || !data.markers) {
                    continue;
                }

                if (!document.getElementById(data.config.id)) {
                    continue;
                }

                var map = new L.map(data.config.id, data.config.map);
                var cluster = L.markerClusterGroup({
                    iconCreateFunction: function (cluster) {
                        var childCount = cluster.getChildCount();
                        var config = data.config.cluster;
                        return new L.DivIcon({
                            html: '<div><span>' + childCount + '</span></div>',
                            className: 'marker-cluster marker-cluster-' + key,
                            iconSize: new L.Point(config.iconSize[0], config.iconSize[1])
                        });
                    }
                });
                data.markers.forEach(function (item) {
                    data.config.icon['iconUrl'] = './img/' + item.icon;
                    var icon = L.icon(data.config.icon);

                    var marker = L.marker(item.coords, {icon: icon});
                    var popup = marker.bindPopup(item.popup);
                    cluster.addLayer(marker);

                    if (key === 'candidates') {
                        _this.toggleMarkerClass(popup);
                    }
                });

                map.addLayer(cluster);
                this.disableScroll(jQuery("#" + data.config.id), map);
            }
        },
        toggleMarkerClass: function (popup) {
            popup.on('popupopen', function (event) {
                jQuery(event.popup._source._icon).addClass('active-marker');
            });
            popup.on('popupclose', function (event) {
                jQuery(event.popup._source._icon).removeClass('active-marker');
            });
        },
        disableScroll: function ($map, map) {
            map.scrollWheelZoom.disable();

            $map.bind('mousewheel DOMMouseScroll', function (event) {
                event.stopPropagation();
                if (event.ctrlKey == true) {
                    event.preventDefault();
                    map.scrollWheelZoom.enable();
                    setTimeout(function () {
                        map.scrollWheelZoom.disable();
                    }, 1000);
                } else {
                    map.scrollWheelZoom.disable();
                }
            });

        }
    };


	/* -----------------------
     * SmoothScroll
     * http://github.com/cferdinandi/smooth-scroll
     * --------------------- */

	CRUMINA.initSmoothScroll = function () {

		// Cut the mustard
		var supports = 'querySelector' in document && 'addEventListener' in window;
		if (!supports) return;

		// Get all Toggle selectors
		var anchors = $('#primary-menu a[href*=\\#], .btn[href*=\\#]').filter(function () {
			return $(this).is(":not([href=\\#])");
		});

		// Add smooth scroll to all anchors
		for (var i = 0, len = anchors.length; i < len; i++) {
			var url = new RegExp(window.location.hostname + window.location.pathname);
			if (!url.test(anchors[i].href)) continue;
			anchors[i].setAttribute('data-scroll', true);
		}

		if (window.location.hash) {
			var anchor = document.querySelector(window.location.hash); // Get the anchor
			var toggle = document.querySelector('a[href*="' + window.location.hash + '"]'); // Get the toggle (if one exists)
			var options = {}; // Any custom options you want to use would go here
			smoothScroll.animateScroll(anchor, toggle, options);
		}

		smoothScroll.init({
			selector: '[data-scroll]',
			speed: 500, // Integer. How fast to complete the scroll in milliseconds
			easing: 'easeOutQuad', // Easing pattern to use
			offset: $header.height(),
			updateURL: true, // Boolean. If true, update the URL hash on scroll
			callback: function (anchor, toggle) {
			} // Function to run after scrolling
		});

		$('#primary-menu').find('[href=\\#]').on('click', function () {
			return false
		})
	};


	/* -----------------------------
	* Editor For Textarea
	* https://www.froala.com/wysiwyg-editor
	* ---------------------------*/
	CRUMINA.initTextareaEditor = function () {
        var $froala = $('#froala-editor');
        if ($froala.length) {
            $froala.froalaEditor();
        }
    };

	/* -----------------------------
	* Sliders and Carousels
	* http://idangero.us/swiper/
	* ---------------------------*/

	CRUMINA.Swiper = {
		$swipers: {},
		init: function () {
			var _this = this;
			$('.swiper-container').each(function (idx) {
				var $self = $(this);
				var id = 'swiper-unique-id-' + idx;
				$self.addClass(id + ' initialized').attr('id', id);
				$self.closest('.crumina-module').find('.swiper-pagination').addClass('pagination-' + id);

				_this.$swipers[id] = new Swiper('#' + id, _this.getParams($self, id));
				_this.addEventListeners(_this.$swipers[id]);

			});
		},
		getParams: function ($swiper, id) {
			var params = {
				parallax: true,
				breakpoints: false,
				keyboardControl: true,
				setWrapperSize: true,
				preloadImages: true,
				updateOnImagesReady: true,
				prevNext: ($swiper.data('prev-next')) ? $swiper.data('prev-next') : false,
				changeHandler: ($swiper.data('change-handler')) ? $swiper.data('change-handler') : '',
				direction: ($swiper.data('direction')) ? $swiper.data('direction') : 'horizontal',
				mousewheelControl: ($swiper.data('mouse-scroll')) ? $swiper.data('mouse-scroll') : false,
				mousewheelReleaseOnEdges: ($swiper.data('mouse-scroll')) ? $swiper.data('mouse-scroll') : false,
				slidesPerView: ($swiper.data('show-items')) ? $swiper.data('show-items') : 1,
				slidesPerGroup: ($swiper.data('scroll-items')) ? $swiper.data('scroll-items') : 1,
				spaceBetween: ($swiper.data('space-between') || $swiper.data('space-between') == 0) ? $swiper.data('space-between') : 20,
				centeredSlides: ($swiper.data('centered-slider')) ? $swiper.data('centered-slider') : false,
				autoplay: ($swiper.data('autoplay')) ? parseInt($swiper.data('autoplay'), 10) : 0,
				loop: ($swiper.data('loop') == false) ? $swiper.data('loop') : true,
				effect: ($swiper.data('effect')) ? $swiper.data('effect') : 'slide',
				pagination: {
					type: ($swiper.data('pagination')) ? $swiper.data('pagination') : 'bullets',
					el: '.pagination-' + id,
					clickable: true
				},
				coverflow: {
					stretch: ($swiper.data('stretch')) ? $swiper.data('stretch') : 0,
					depth: ($swiper.data('depth')) ? $swiper.data('depth') : 0,
					slideShadows: false,
					rotate: 0,
					modifier: 2
				},
				fade: {
					crossFade: ($swiper.data('crossfade')) ? $swiper.data('crossfade') : true
				}
			};

			if (params['slidesPerView'] > 1) {
				params['breakpoints'] = {
					480: {
						slidesPerView: 1,
						slidesPerGroup: 1
					},
					800: {
						slidesPerView: 2,
						slidesPerGroup: 2
					}
				};
			}

			return params;
		},
		addEventListeners: function ($swiper) {
			var _this = this;
			var $wrapper = $swiper.$el.closest('.crumina-module-slider');

			//Prev Next clicks
			if ($swiper.params.prevNext) {
				$wrapper.on('click', '.swiper-btn-next, .swiper-btn-prev', function (event) {
					event.preventDefault();
					var $self = $(this);

					if ($self.hasClass('swiper-btn-next')) {
						$swiper.slideNext();
					} else {
						$swiper.slidePrev();
					}
				});
			}
		},
	};


	//Scroll to top.
	jQuery('.back-to-top').on('click', function () {
		$('html,body').animate({
			scrollTop: 0
		}, 1200);
		return false;
	});


	/* -----------------------------
     * Embedded Video in pop up
     * http://dimsemenov.com/plugins/magnific-popup/
     * ---------------------------*/
	CRUMINA.mediaPopups = function () {
		$('.js-popup-iframe').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
		$('.js-zoom-image, .link-image').magnificPopup({
			type: 'image',
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = 'mfp-zoom-in';
				}
			},
			closeOnContentClick: true,
			midClick: true
		});
	};

	/* -----------------------------
     * Pricing switcher
     * ---------------------------*/
	CRUMINA.pricingSwitcher = function () {
		jQuery('.js-pricing-switcher').on('click', function(){
			var $is_year = $(this).prev().is(':checked');
			var $section = $(this).closest('.crumina-pricings');
			var $price = $section.find('.price');
			$price.each(function(){
				if($is_year){
					$(this).text($(this).data('annually'));
				}else{
					$(this).text($(this).data('monthly'));
				}
			});
		});
	};

	/* -----------------------------
	 * Isotope sorting
	 * https://isotope.metafizzy.co
	 * ---------------------------*/

	CRUMINA.IsotopeSort = function () {
		var $container = $('.sorting-container');
		$container.each(function () {
			var $current = $(this);
			var layout = ($current.data('layout').length) ? $current.data('layout') : 'masonry';
			$current.isotope({
				itemSelector: '.sorting-item',
				layoutMode: layout,
				percentPosition: true
			});

			$current.imagesLoaded().progress(function () {
				$current.isotope('layout');
			});

			var $sorting_buttons = $current.closest('.sorting-section-js').find('.sorting-menu').find('li');

			$sorting_buttons.on('click', function () {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var filterValue = $(this).data('filter');
				if (typeof filterValue != "undefined") {
					$current.isotope({filter: filterValue});
					return false;
				}
			});
		});
	};


	/* -----------------------
		 * Animation for open-menu-button
		 * --------------------- */

	CRUMINA.burgerAnimation = function () {
		/* In animations (to close icon) */

		var beginAC = 80,
			endAC = 320,
			beginB = 80,
			endB = 320;

		function inAC(s) {
			s.draw('80% - 240', '80%', 0.3, {
				delay: 0.1,
				callback: function () {
					inAC2(s)
				}
			});
		}

		function inAC2(s) {
			s.draw('100% - 545', '100% - 305', 0.6, {
				easing: ease.ease('elastic-out', 1, 0.3)
			});
		}

		function inB(s) {
			s.draw(beginB - 60, endB + 60, 0.1, {
				callback: function () {
					inB2(s)
				}
			});
		}

		function inB2(s) {
			s.draw(beginB + 120, endB - 120, 0.3, {
				easing: ease.ease('bounce-out', 1, 0.3)
			});
		}

		/* Out animations (to burger icon) */

		function outAC(s) {
			s.draw('90% - 240', '90%', 0.1, {
				easing: ease.ease('elastic-in', 1, 0.3),
				callback: function () {
					outAC2(s)
				}
			});
		}

		function outAC2(s) {
			s.draw('20% - 240', '20%', 0.3, {
				callback: function () {
					outAC3(s)
				}
			});
		}

		function outAC3(s) {
			s.draw(beginAC, endAC, 0.7, {
				easing: ease.ease('elastic-out', 1, 0.3)
			});
		}

		function outB(s) {
			s.draw(beginB, endB, 0.7, {
				delay: 0.1,
				easing: ease.ease('elastic-out', 2, 0.4)
			});
		}

		/* Scale functions */

		function addScale(m) {
			m.className = 'menu-icon-wrapper scaled';
		}

		function removeScale(m) {
			m.className = 'menu-icon-wrapper';
		}

		/* Awesome burger scaled */

		var pathD = document.getElementById('pathD'),
			pathE = document.getElementById('pathE'),
			pathF = document.getElementById('pathF'),
			segmentD = new Segment(pathD, beginAC, endAC),
			segmentE = new Segment(pathE, beginB, endB),
			segmentF = new Segment(pathF, beginAC, endAC),
			wrapper2 = document.getElementById('menu-icon-wrapper'),
			trigger2 = document.getElementById('menu-icon-trigger'),
			toCloseIcon2 = true;

		wrapper2.style.visibility = 'visible';

		trigger2.onclick = function () {
			addScale(wrapper2);
			if (toCloseIcon2) {
				inAC(segmentD);
				inB(segmentE);
				inAC(segmentF);
			} else {
				outAC(segmentD);
				outB(segmentE);
				outAC(segmentF);

			}
			toCloseIcon2 = !toCloseIcon2;
			setTimeout(function () {
				removeScale(wrapper2)
			}, 450);
		};
	};

	CRUMINA.tabsSmothScroll = {

		$tabs: null,
		init: function () {
			this.$tabs = jQuery('.tabs-scroll');
			this.addEventListeners();
		},

		addEventListeners: function () {

			this.$tabs.on('shown.bs.tab', function (e) {
				var $self = jQuery(e.target);
				var $panel = jQuery($self.prop('hash'));

				if (window.scrollY > 100) {
					return;
				}
				if (!$panel.length) {
					return;
				}

				smoothScroll.animateScroll($panel[0]);
			});
		}
	};

	CRUMINA.StickySidebars = function () {

		var $topSpace = $('#site-header').height();


		$('.crumina-sticky-sidebar').each(function () {

			var sidebar = new StickySidebar (this, {
				topSpacing: $topSpace,
				bottomSpacing: 20,
				containerSelector: false,
				innerWrapperSelector: '.sidebar__inner',
				stickyClass: 'is-affixed',
				minWidth: 0
			})
		});
	};

    CRUMINA.updateResponsiveInit = function () {
		var resizeTimer = null;
		var resize = function () {
			resizeTimer = null;

			// Methods
			CRUMINA.headerSpacer.resize();
		};

		$(window).on('resize', function () {
			if (resizeTimer === null) {
				resizeTimer = window.setTimeout(function () {
					resize();
				}, 200);
			}
		}).resize();
	};


	$document.ready(function () {
        CRUMINA.select2Init();
        CRUMINA.fixedHeader();
        // CRUMINA.preloader();
        CRUMINA.Swiper.init();
        CRUMINA.initSmoothScroll();
        CRUMINA.mediaPopups();
        CRUMINA.countdowns();
        CRUMINA.pricingSwitcher();
        CRUMINA.IsotopeSort();
        CRUMINA.headerSpacer.init();
        CRUMINA.tabsSmothScroll.init();
        CRUMINA.primaryMenu();
		CRUMINA.StickySidebars();

        CRUMINA.maps.init();

        CRUMINA.initTextareaEditor();

        CRUMINA.updateResponsiveInit();

        if($('#primary-menu').length){
			CRUMINA.burgerAnimation();
		}

    });

})(jQuery);
