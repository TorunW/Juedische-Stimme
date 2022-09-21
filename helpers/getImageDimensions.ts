export default function getImageDimensions(windowWidth,imageType){

    let width, height;

    if (imageType === 'post list item'){
        width = (windowWidth - 120);
        if (windowWidth > 991) width = (width - 64) / 2;
        height = width / 2.2;
    } else if ('newsletter list item'){
        width = (windowWidth - 120);
        if (windowWidth > 991){
            width = (width - (64 * 2)) / 3;
            height = width / 1.6;  
        }
        else if (windowWidth > 601){
            width = (width - 64) / 2;
            height = width / 1.6;
        } else {
            height = width / 2.2;
        }
    }

    return {
        width,
        height
    }
}