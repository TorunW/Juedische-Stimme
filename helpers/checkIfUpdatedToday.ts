export const isUpdatedToday = (date:string) => {
    const fbFeedUpdatedMonth = parseInt(date.split('-')[1]);
    const fbFeedUpdatedDay = parseInt(date.split('-')[2]);
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    if (day !== fbFeedUpdatedDay || month !== fbFeedUpdatedMonth) return false
    else return true
}