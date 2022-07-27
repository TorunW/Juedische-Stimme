"use strict";
exports.__esModule = true;
var react_1 = require("react");
var imageUrlHelper_1 = require("helpers/imageUrlHelper");
var Gallery_module_css_1 = require("styles/Gallery.module.css");
var Gallery = function (_a) {
    var gallery = _a.gallery;
    var _b = react_1.useState(1), slideIndex = _b[0], setSlideIndex = _b[1];
    function nextSlide() {
        if (slideIndex !== slideShow.length) {
            setSlideIndex(slideIndex + 1);
        }
        else if (slideIndex === slideShow.length) {
            setSlideIndex(1);
        }
    }
    function prevSlide() {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1);
        }
        else if (slideIndex === 1) {
            setSlideIndex(slideShow.length);
        }
    }
    var slideShow = gallery.imageSrcs
        .split(',')
        .map(function (imgSrc, index) { return (react_1["default"].createElement("div", { className: slideIndex === index + 1 ? Gallery_module_css_1["default"].slideActive : Gallery_module_css_1["default"].slide },
        react_1["default"].createElement("img", { key: Date.now() + index, src: imageUrlHelper_1.generateImageUrl(imgSrc) }))); });
    console.log(slideShow.length);
    // = gallery.imageSrcs
    // .split(',')
    // .map((imgSrc: string, index: number) => (
    //   <div className={styles.item}>
    //     <img key={Date.now() + index} src={generateImageUrl(imgSrc)} />
    //   </div>
    // ));
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: Gallery_module_css_1["default"].containerSlider },
            react_1["default"].createElement("button", { className: Gallery_module_css_1["default"].prev, onClick: prevSlide }, "Prev"),
            slideShow,
            react_1["default"].createElement("button", { className: Gallery_module_css_1["default"].next, onClick: nextSlide }, "Next"))));
};
exports["default"] = Gallery;
