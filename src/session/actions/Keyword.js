export const createKeyword = text => {
    const arrayKeywords = [];

    const arrayWords = text.match(/("[^"]+"|[^"\s]+)/g);

    arrayWords.forEach(word => {
        let summaryWord = "";
        word.split("").forEach(letter => {
            summaryWord += letter;
            arrayKeywords.push(summaryWord.toLowerCase());
        });
    });

    let summaryLetter = "";
    text.split("").forEach(letter => {
        summaryLetter += letter;
        arrayKeywords.push(summaryLetter);
    })

    return arrayKeywords;
}