const renderToString = (item:JSON) => {
    let string = JSON.stringify(item)
    if (string.indexOf('’') > -1) string = string.split('’').join('');
    if (string.indexOf('\\n') > -1) string = string.split('\\n').join('');
    if (string.indexOf('\\"') > -1) string = string.split('\\"').join('');
    if (string.indexOf("'") > -1) string = string.split("'").join('');
    return string;
}
export default renderToString;