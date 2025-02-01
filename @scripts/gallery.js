import fetchData from "./fetching.js";
const galleryWrapper = document.getElementById("gallery-container");
const noscript = document.getElementById("noscript");
if (noscript) {
	noscript.style.display = "none";
}
fetchData("./../@data/renders.json").then((renders) => {
	const renderArr = renders;
	renderArr.forEach((render) => {
		render.date = new Date(render.date);
	});
	renderArr.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});
	if (galleryWrapper === null) {
		throw new Error("BAJOJAJO NIE MA wrAPperA DO GALERII");
	}
	let previousMonthYear = `${renderArr[0].date.toLocaleDateString("default", {
		month: "short",
	})} ${renderArr[0].date.getFullYear()}`;
	let gallerySectionContainer = document.createElement("section");
	let dateHeader = document.createElement("h1");
	let imagesWrapper = document.createElement("div");
	let sectionLink = document.createElement("a");
	let sectionId = 1;
	dateHeader.innerText = previousMonthYear;
	renderArr.forEach((render) => {
		let currentMonthYear = `${render.date.toLocaleDateString("default", { month: "short" })} ${render.date.getFullYear()}`;
		if (currentMonthYear != previousMonthYear) {
			buildGallerySection(gallerySectionContainer, dateHeader, imagesWrapper, galleryWrapper, sectionLink, sectionId);
			gallerySectionContainer = document.createElement("section");
			imagesWrapper = document.createElement("div");
			dateHeader = document.createElement("h1");
			sectionLink = document.createElement("a");
			sectionId += 1;
			previousMonthYear = currentMonthYear;
			dateHeader.innerText = currentMonthYear;
		}
		const image = buildImageItem(render.imagePath, render.title, render.animationPath);
		imagesWrapper.appendChild(image);
	});
	buildGallerySection(gallerySectionContainer, dateHeader, imagesWrapper, galleryWrapper, sectionLink, sectionId);
});
function openPopUp(image, title, anchor, parent, animation) {
	document.getElementById("pop-up-container")?.remove();
	const popUp = buildPopup(image, title, animation);
	anchor.appendChild(popUp);
}
function closePopUp(popUp) {
	popUp.remove();
}
function buildPopup(image, title, animation) {
	const popUpContainer = document.createElement("div");
	const popUpBand = document.createElement("div");
	const popUpTitle = document.createElement("div");
	const closeButton = document.createElement("button");
	let popUpImage;
	if (animation !== undefined) {
		popUpImage = document.createElement("video");
		setVideoParams(popUpImage);
		popUpImage.src = animation;
	} else {
		popUpImage = document.createElement("img");
		popUpImage.src = image;
		popUpImage.alt = `a 3d render titled ${title}`;
	}
	closeButton.innerText = "x";
	popUpTitle.innerText = `${title}`;
	popUpContainer.id = "pop-up-container";
	popUpContainer.classList.add("ui-widget-content");
	popUpImage.id = "pop-up-image";
	popUpBand.id = "pop-up-band";
	popUpTitle.id = "pop-up-title";
	popUpBand.id = "pop-up-band";
	closeButton.id = "pop-up-close";
	popUpImage.draggable = true;
	$(() => {
		$("#pop-up-container").draggable({
			containment: "window",
		});
		$("#pop-up-image").resizable({
			aspectRatio: true,
			maxWidth: 0.6 * $(document).width(),
			minWidth: 0.2 * $(document).width(),
			maxHeight: 0.8 * $(window).height(),
		});
	});
	closeButton.addEventListener("click", () => {
		closePopUp(popUpContainer);
	});
	popUpContainer.appendChild(popUpBand);
	popUpContainer.appendChild(popUpImage);
	popUpBand.appendChild(popUpTitle);
	popUpBand.appendChild(closeButton);
	return popUpContainer;
}
function buildImageItem(path, title, animationPath) {
	const itemWrapper = document.createElement("figure");
	const caption = document.createElement("figcaption");
	const image = document.createElement("div");
	itemWrapper.appendChild(image);
	itemWrapper.appendChild(caption);
	itemWrapper.classList.add("gallery-item");
	image.classList.add("gallery-image");
	caption.innerText = title;
	image.style.backgroundImage = `url(./../@data/renders/static/${path})`;
	if (animationPath !== undefined) {
		const miniature = document.createElement("video");
		setVideoParams(miniature);
		miniature.style.display = "none";
		miniature.src = `./../@data/renders/dynamic/${animationPath}`;
		miniature.className = "gallery-miniature";
		miniature.currentTime = 0;
		image.addEventListener("mouseover", () => {
			miniature.currentTime = 0;
			miniature.style.display = "block";
		});
		image.addEventListener("mouseleave", () => {
			miniature.currentTime = 0;
			miniature.style.display = "none";
		});
		image.appendChild(miniature);
	}
	const anchor = document.getElementById("pop-up-anchor");
	if (anchor != null) {
		image.addEventListener("click", () => {
			if (animationPath !== undefined) {
				openPopUp(`./../@data/renders/static/${path}`, title, anchor, image, `/@data/renders/dynamic/${animationPath}`);
			} else {
				openPopUp(`./../@data/renders/static/${path}`, title, anchor, image);
			}
		});
	}
	return itemWrapper;
}
function buildGallerySection(gallerySectionContainer, dateHeader, imagesWrapper, galleryWrapper, sectionLink, id) {
	gallerySectionContainer.className = "section-container";
	gallerySectionContainer.id = `section${id}`;
	sectionLink.href = `#${gallerySectionContainer.id}`;
	sectionLink.innerText = "#";
	dateHeader.className = "date-header";
	imagesWrapper.className = "images-wrapper";
	gallerySectionContainer.appendChild(sectionLink);
	gallerySectionContainer.appendChild(imagesWrapper);
	sectionLink.appendChild(dateHeader);
	galleryWrapper.appendChild(gallerySectionContainer);
}
function setVideoParams(video) {
	video.autoplay = true;
	video.muted = true;
	video.loop = true;
}
