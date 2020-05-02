export function validateTitle(title) {
    return (!title) ? "Title is required"
        :  (title.length > 30)? `Title must 30 characters or less. (Currently ${title.length})`
        :  (title.length < 3)? 'Title must have 3 or more characters'
        :  undefined

}
export function validateAuthor(author) {
    return (!author) ? "Author is required"
        :  (author.length > 25)? `The author's name must have 25 characters or less. (Currently ${author.length}`
        :  (author.length < 3)? "The author's name must have 3 or more characters"
        :  undefined
}
export function validateNumPages(numPages) {
    numPages = Number(numPages);
    const notValidNumber = /[\D]{1,7}/g;
    if (isNaN(numPages)) return "Your input for number of pages is not a number"
    return (notValidNumber.test(numPages.toString())) ? "Number of pages should only contain numbers"
        :  (numPages < 1)? "The number of pages cannot be 0 and must contain only numbers"
        :  (numPages > 100000)? "That's a lie! No book has more than 100,000 pages"
        :  undefined

}
export function validateYearPub(yearPub) {
    yearPub = Number(yearPub);
    const thisYear = new Date().getFullYear();
    if (isNaN(yearPub)) return "Your input for year published is not a number"
    return (yearPub.toString().length !== 4 || yearPub < 1500 || yearPub > thisYear)?
        "The year published must be between 1500 and " + thisYear
        : undefined
}