import LazyLoad from 'vanilla-lazyload';

function createImageFragment(srcUrl) {
    var imageFragment = document.createElement('img');
    imageFragment.setAttribute('src', srcUrl);
    return imageFragment;
}
function modifyClassUponLoad(element) {
    element.classList.add('is-lazy-loaded');
}


export default function () {

    let imageLazy = new LazyLoad({
        elements_selector: '.image-lazy',
        class_loading: 'is-lazy-loading',
        class_loaded: 'is-lazy-loaded'
    });

    // https://github.com/verlok/lazyload/issues/199
    let bgLazy = new LazyLoad({
        elements_selector: '.bg-lazy',
        callback_load: function (element) {
            if (element.tagName === 'IMG') {
                modifyClassUponLoad(element);
            }
        },
        callback_enter: function (element) {
            if (element.tagName !== 'IMG') {
                function callback_load(event) {
                    imageFragment.removeEventListener('load', callback_load);
                    modifyClassUponLoad(element);
                }
                var imageFragment = createImageFragment(element.getAttribute('data-src'));
                imageFragment.addEventListener('load', callback_load);
            }
        }
    });

}