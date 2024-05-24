const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 500;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			let popupName = popupLink.getAttribute('href') || popupLink.getAttribute('data-target-popup');
			popupName = popupName.replace('#', '');
			const curentPopup = document.getElementById(popupName);

			if (curentPopup.classList.contains('video-popup')) {
				createVideoPopup(curentPopup, popupLink);
				findVideosInPopup();
			}

			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup_open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup_open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('popup_open');

		if (popupActive.classList.contains('video-popup')) {
			setTimeout(function () {
				destroyVideoPopup(popupActive);
			}, timeout);
		}

		if (doUnlock) {
			bodyUnLock();
		}
	}
}

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

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup_open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();

//--------------------------------------------------------video

function findVideosInPopup() {
	let videos = document.querySelectorAll('.video');
	if (videos) {
		for (let i = 0; i < videos.length; i++) {
			setupVideoInPopup(videos[i]);
		}
	}
}

function setupVideoInPopup(video) {
	let link = video.querySelector('.video__link');
	let media = video.querySelector('.video__media');
	let button = video.querySelector('.video__button');
	// let id = parseMediaURL(media);
	let id = media.getAttribute("data-video-id");

	video.addEventListener('click', () => {
		handleClickVideoInPopup(id, video, link, button);
	});
	setTimeout(function () {
		handleClickVideoInPopup(id, video, link, button);
	}, timeout);

	link.removeAttribute('href');
	video.classList.add('video--enabled');
}

function handleClickVideoInPopup(id, video, link, button) {
	let iframe = createIframeInPopup(id);

	video.classList.add('video--clicked');

	link.remove();
	button.remove();
	video.appendChild(iframe);
}

function createIframeInPopup(id) {
	let iframe = document.createElement('iframe');

	iframe.setAttribute('allowfullscreen', '');
	iframe.setAttribute('allow', 'autoplay');
	iframe.setAttribute('src', generateURLInPopup(id));
	iframe.classList.add('video__media');

	return iframe;
}

function generateURLInPopup(id) {
	let query = '?rel=0&showinfo=0&autoplay=1';

	return 'https://www.youtube.com/embed/' + id + query;
}


function createVideoPopup(curentPopup, popupLink) {
	let videoId = popupLink.getAttribute("data-video-id");
	let videoLink = popupLink.getAttribute("data-video-link");
	let videoImg = popupLink.querySelector('.video-preview__img img').getAttribute("src");

	// let link = curentPopup.querySelector('.video__link');
	// let media = curentPopup.querySelector('.video__media');
	// link.setAttribute("href", videoLink);
	// media.setAttribute("data-video-id", videoId);
	// media.setAttribute("src", videoImg);

	let videoTemplate = `
		<div class="video">
			<a class="video__link" href="${videoLink}" target="_blank">
				<picture>
					<img class="video__media" data-video-id="${videoId}" src="${videoImg}" alt="Razom video">
				</picture>
			</a>
			<button class="video__button" aria-label="Play">
				<svg class="video-preview__icon" width="136" height="136" viewBox="0 0 136 136" fill="none">
					<circle cx="68" cy="68" r="67.5" stroke="currentColor"/>
					<path d="M83 68L59 81.8564L59 54.1436L83 68Z" fill="currentColor"/>
				</svg>
			</button>
		</div>
	`;
	let popupInner = curentPopup.querySelector('.popup__inner');
	popupInner.insertAdjacentHTML('afterbegin', videoTemplate);
}

function destroyVideoPopup(popupActive) {
	let popupVideo = popupActive.querySelector('.video');
	popupVideo.remove();
}