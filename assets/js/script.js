function onScrollLinkClickHash(hash) {
    const scrollLink = document.querySelector('a[href="'+hash+'"]');
    if (scrollLink && scrollLink.dataset.scrollto && document.querySelector(scrollLink.dataset.scrollto)) {

        // $('header').addClass('header_scrolled');

        var width = $(window).width();
        if (width <= 1439 && width > 992) {
            var headerScrolledHeight = 113;
        } else if (width <= 992 && width > 768) {
            var headerScrolledHeight = 106;
        } else if (width <= 768) {
            var headerScrolledHeight = 127;
        } else {
            var headerScrolledHeight = 126;
        }
        const scrolltoBlock = document.querySelector(scrollLink.dataset.scrollto);
        const scrolltoBlockValue = scrolltoBlock.getBoundingClientRect().top + pageYOffset - headerScrolledHeight;

        window.scrollTo({
            top: scrolltoBlockValue,
            behavior: "smooth"
        });

        if (scrollLink.classList.contains('menu__link')) {
            $('.mob-menu-close').click();
            $('.menu__link').removeClass('menu__link_active');
            scrollLink.classList.add('menu__link_active');
        }
    }
}


$(document).ready(function () {

	//--------Мобильное меню по клику на бургер
	$('.mob-menu-icon').click(function () {
		$('.mob-menu').addClass('mob-menu_open');
		bodyLock();
	});
	$('.mob-menu-close').click(function () {
		$('.mob-menu').removeClass('mob-menu_open');
		bodyUnLock();
	});

	const lockPadding = document.querySelectorAll(".lock-padding");
	const body = document.querySelector('body');
	let unlock = true;
	const timeout = 500;

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('body_lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('body_lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}


	//--------Изменение хедера при прокрутке
	$(document).scroll(function () {
		scrollHeaderInit();
	});

	scrollHeaderInit();

	function scrollHeaderInit() {
		if ($(document).scrollTop() > 100) {
			$('header').addClass('header_scrolled');
		} else {
			$('header').removeClass('header_scrolled');
		}
	}

	//-------------------------------Прокрутка к нужному разделу-----------------
	const scrollLinks = document.querySelectorAll('.click-scroll[data-scrollto]');
	if (scrollLinks.length > 0) {
		scrollLinks.forEach(scrollLink => {
			scrollLink.addEventListener("click", onScrollLinkClick);
		});

		function onScrollLinkClick(e) {
			const scrollLink = e.target;
			if (scrollLink.dataset.scrollto && document.querySelector(scrollLink.dataset.scrollto)) {

				// $('header').addClass('header_scrolled');

				var width = $(window).width();
				if (width <= 1439 && width > 992) {
					var headerScrolledHeight = 113;
				} else if (width <= 992 && width > 768) {
					var headerScrolledHeight = 106;
				} else if (width <= 768) {
					var headerScrolledHeight = 127;
				} else {
					var headerScrolledHeight = 126;
				}
				const scrolltoBlock = document.querySelector(scrollLink.dataset.scrollto);
				const scrolltoBlockValue = scrolltoBlock.getBoundingClientRect().top + pageYOffset - headerScrolledHeight;

				window.scrollTo({
					top: scrolltoBlockValue,
					behavior: "smooth"
				});
				e.preventDefault();

				if (scrollLink.classList.contains('menu__link')) {
					$('.mob-menu-close').click();
					$('.menu__link').removeClass('menu__link_active');
					scrollLink.classList.add('menu__link_active');
				}

                let href = $(scrollLink).attr('href');
				if(href){
                    history.pushState(null, null, document.location.pathname + href);
                } else {
                    history.pushState(null, null, document.location.pathname);
                }
			}
		}
	}


	//--------Фиксирование высоты экрана мобилки если не менялась ширина
	var width = $(window).width();

	function setHeight() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	if (width <= 768) {
		setHeight();
	}

	$(window).on('resize', function () {
		if ($(this).width() !== width) {
			width = $(this).width();
			if (width <= 768) {
				setHeight();
			}
		} else {
			if (width > 768) {
				setHeight();
			}
		}
	});


	//-------------------------------СЛАЙДЕРЫ------------------------------------
	$('.team .team-slider__body').slick({
		arrows: false,
		infinite: false,
		speed: 500,
		adaptiveHeight: true
	});
	$('.team .arrow_left').click(function (event) {
		$('.team .team-slider__body').slick('slickPrev');
	});
	$('.team .arrow_right').click(function (event) {
		$('.team .team-slider__body').slick('slickNext');
	});

	$('.team-slider .arrow_left').addClass('arrow_disabled');
	$('.team-slider__desktop-photo .item-team__photo:nth-child(1)').addClass('active-slide');

	$('.team .team-slider__body').on('beforeChange', function (event, slick, index, currentSlide, nextSlide) {
		// var slidesAmount = $(this).children.length;
		var slidesAmount = $('.team-slider__item').length;
		var targetSlideIndex = slidesAmount - 1;

		if (currentSlide === 0) {
			$('.team-slider .arrow').removeClass('arrow_disabled');
			$('.team-slider .arrow_left').addClass('arrow_disabled');
		} else if (currentSlide === targetSlideIndex) {
			$('.team-slider .arrow').removeClass('arrow_disabled');
			$('.team-slider .arrow_right').addClass('arrow_disabled');
		} else {
			$('.team-slider .arrow').removeClass('arrow_disabled');
		}
		var desktopPhotos = $('.team-slider__desktop-photo .item-team__photo');
		$(desktopPhotos).removeClass('active-slide');

		var activeSLidePhoto = desktopPhotos[currentSlide];
		$(activeSLidePhoto).addClass('active-slide');
	});
	// =====================================================================================
})

//--------------------------------------------------------services-slider
const servicesSlider = new Swiper('.page-military .services-slider', {
	pagination: {
		el: '.services-list .g-slider__pagination',
		clickable: true
	},
	simulateTouch: false,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 500,
	// autoHeight: true,
	breakpoints: {
		601: {
			enabled: false,
			slidesPerView: "auto",
		},
	},
});

if (document.querySelector('.page-military .services-slider')) {
	let servicesSliderSlidesTotal = document.querySelector('.g-slider__total');
	let servicesSliderSlidesCurrent = document.querySelector('.g-slider__current');

	servicesSliderSlidesTotal.innerHTML = String(servicesSlider.slides.length).padStart(2, '0');
	servicesSliderSlidesCurrent.innerHTML = String(servicesSliderSlidesCurrent.innerHTML).padStart(2, '0');

	servicesSlider.on('slideChange', function () {
		let currentSlide = ++servicesSlider.realIndex;
		servicesSliderSlidesCurrent.innerHTML = String(currentSlide).padStart(2, '0');
	});
}
//--------------------------------------------------------feedback-slider
const feedbackSlider = new Swiper('.feedback-slider', {
	navigation: {
		nextEl: '.feedback .g-slider__btn-next',
		prevEl: '.feedback .g-slider__btn-prev'
	},
	pagination: {
		el: '.feedback .g-slider__pagination',
		clickable: true
	},
	simulateTouch: false,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 500,
	loop: true,
	breakpoints: {
		601: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
		769: {
			slidesPerView: 2,
			spaceBetween: 26,
		},
		1440: {
			slidesPerView: 3,
			spaceBetween: 26,
		},
	},
});
//--------------------------------------------------------videos-slider
const videosSlider = new Swiper('.page-military .videos-slider', {
	navigation: {
		nextEl: '.page-military .big-videos .g-slider__btn-next',
		prevEl: '.page-military .big-videos .g-slider__btn-prev'
	},
	pagination: {
		el: '.page-military .big-videos .g-slider__pagination',
		clickable: true
	},
	simulateTouch: false,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 500,
	loop: true,
	breakpoints: {

		769: {
			spaceBetween: 0,
		},

	},
});
//--------------------------------------------------------videos-slider
const videosSliderRecount = new Swiper('.page-recount .videos-slider', {
	navigation: {
		nextEl: '.page-recount .big-videos .g-slider__btn-next',
		prevEl: '.page-recount .big-videos .g-slider__btn-prev'
	},
	pagination: {
		el: '.page-recount .big-videos .g-slider__pagination',
		clickable: true
	},
	simulateTouch: false,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 500,
	loop: true,
	breakpoints: {

		769: {
			spaceBetween: 0,
		},

	},
});

const awardsWidgetBtn = document.querySelector('#awards-widget .awards-widget__btn');
if (awardsWidgetBtn) {
	awardsWidgetBtn.addEventListener('click', function () {
		const awardsWidget = this.closest('.awards-widget');

		if (awardsWidget.classList.contains('active')) {
			awardsWidget.classList.remove('show');
			setTimeout(function () {
				awardsWidget.classList.remove('active');
			}, 300);
		} else {
			awardsWidget.classList.add('active');
			setTimeout(function () {
				awardsWidget.classList.add('show');
			}, 300);
		}
	});
}


//--------------------------------------------------------videos-slider
const videosSliderMarriage = new Swiper('.page-marriage .videos-slider', {
	navigation: {
		nextEl: '.page-marriage .big-videos .g-slider__btn-next',
		prevEl: '.page-marriage .big-videos .g-slider__btn-prev'
	},
	pagination: {
		el: '.page-marriage .big-videos .g-slider__pagination',
		clickable: true
	},
	simulateTouch: false,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 500,
	loop: false,
	breakpoints: {

		769: {
			spaceBetween: 0,
		},

	},
});

//--------Вставка видео из ютуба с загрузкой по клику (замена картинки на iframe)
function findVideos() {
	let videos = document.querySelectorAll('.video');

	for (let i = 0; i < videos.length; i++) {
		setupVideo(videos[i]);
	}
}

function setupVideo(video) {
	let link = video.querySelector('.video__link');
	let media = video.querySelector('.video__media');
	let button = video.querySelector('.video__button');
	// let id = parseMediaURL(media);
	let id = media.getAttribute("data-video-id");

	video.addEventListener('click', () => {
		let iframe = createIframe(id);

		video.classList.add('video--clicked');

		link.remove();
		button.remove();
		video.appendChild(iframe);
	});

	link.removeAttribute('href');
	video.classList.add('video--enabled');
}

// function parseMediaURL(media) {
//     let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
//     let url = media.src;
//     let match = url.match(regexp);
//
//     return match[1];
// }

function createIframe(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURL(id));
	iframe.classList.add('video__media');

	return iframe;
}

function generateURL(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();



//-------------------------------Динамический адаптив------------------------
function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}
				if (a.place === "first" || b.place === "last") {
					return -1;
				}
				if (a.place === "last" || b.place === "first") {
					return 1;
				}
				return a.place - b.place;
			}
			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}
				if (a.place === "first" || b.place === "last") {
					return 1;
				}
				if (a.place === "last" || b.place === "first") {
					return -1;
				}
				return b.place - a.place;
			}
			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();