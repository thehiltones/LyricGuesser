class Matcher {
    static sanitize(word) {
        // """Lowercase and remove non-alphanumeric characters.
        //     e.g., 'Hi!' becomes 'hi' """
        return word.toLowerCase().replace(/[^A-Za-z]+/g, "");
    }

    static EQUIVALENCES = {
        "ho": "hohohod",
        "every": "evry",
        "heaven": "heavn",
        "listening": "listning",
        "th": "thhhhh",
        "evrybody": "evrybody",
        "for": "fer",
        "oo": "OOeeooahah",
        "ting": "tingtang",
        "walla": "wallawallabingbang",
        "wala": "wallawallabingbang",
        "fiddle": "fiddleeeioh",
        "tippy": "tippytoeing",
        "tick": "ticktock",
        "ticky": "tickytacky",
        "ticky": "tikki",
        "ticky": "taki",
        "overflowing": "oerflowing",
        "given": "givn",
        "heavens": "heavns",
        "heavenly": "heavnly",
        "suffering": "suffring",
        "power": "powr",
        "wandering": "wandring",
        "long": "longawaited",
        "offering": "offring"
    }

    constructor(title, body) {
        this.title = [];
        this.words = [];
        this.word_locations = {};
        let title_words = title.split(/\s+/);
        for (let i = 0; i < title_words.length; i++) {
            let sanitized = Matcher.sanitize(title_words[i]);
            if (sanitized != "") {
                if (!(sanitized in this.word_locations)) {
                    this.word_locations[sanitized] = [];
                }
                this.word_locations[sanitized].push(i);
                this.title.push(title_words[i]);
                this.words.push(title_words[i]);
            }
        }
        // let offset = 0;
        for (const line of body) {
            if (line === "") {
                // offset += 1;
                continue;
            }
            let line_words = line.split(/\s+/);
            for (let i = 0; i < line_words.length; i++) {
                let sanitized = Matcher.sanitize(line_words[i]);
                if (sanitized === "") {
                    continue;
                }
                else if (line_words[i] === "CHORUS") {
                    // offset += 1;
                    continue;
                }
                else {
                    if (!(sanitized in this.word_locations)) {
                        this.word_locations[sanitized] = [];
                    }
                    this.word_locations[sanitized].push(this.words.length);
                    this.words.push(line_words[i]);
                }
            }
        }
        this.foundWords = new Set();
    }

    guess(word) {
//         """Return a list of indexes for the word if it hasn't been guessed before.
//         Return empty list if it's already been guessed or isn't in the body."""
        word = Matcher.sanitize(word);
        let equalent_matches = [];
        if (word in Matcher.EQUIVALENCES) {
            console("Has equivalence");
            equalent_matches = this.guess(Matcher.EQUIVALENCES[word]);
        } 
        if (this.foundWords.has(word)) {
            return equalent_matches;
        }
        else if (word in this.word_locations) {
            this.foundWords.add(word);
            return this.word_locations[word].concat(equalent_matches);
        }
        else {
            return equalent_matches;
        }
    }

    give_up() {
        // //  """Return all indices"""
        // let all_indices = new Set();
        // for (let word of Object.keys(this.word_locations)) {
        //     this.foundWords.add(word);
        //     for (let i = 0; i < this.word_locations[word].length; i++) {
        //         all_indices.add(this.word_locations[word][i]);
        //     }
        // }
        // return Array.from(all_indices)
        return [...Array(this.words.length).keys()]
    }

    fetch_spelling(indices) {
        //         """Return the exact spelling, e.g., original capitalization and punctuation
        //         for the words at the gvien indices."""
        indices = new Set(indices);
        let spellings = [];
        for (let i = 0; i < this.words.length; i++) {
            if (indices.has(i)) {
                spellings.push(this.words[i]);
            }
        }
        return spellings
    }

    get_lyrics() {
        //         """Return the full body as a list of words"""
        return this.words
    }

}