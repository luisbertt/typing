const typingDiv = document.getElementById("typing")
const statsDiv = document.getElementById("stats")
const startGameBtn = document.getElementById("start-game")

const words = [
  "the",
  "be",
  "of",
  "and",
  "a",
  "to",
  "in",
  "he",
  "have",
  "it",
  "that",
  "for",
  "they",
  "I",
  "with",
  "as",
  "not",
  "on",
  "she",
  "at",
  "by",
  "this",
  "we",
  "you",
  "do",
  "but",
  "from",
  "or",
  "which",
  "one",
  "would",
  "all",
  "will",
  "there",
  "say",
  "who",
  "make",
  "when",
  "can",
  "more",
  "if",
  "no",
  "man",
  "out",
  "other",
  "so",
  "what",
  "time",
  "up",
  "go",
  "about",
  "than",
  "into",
  "could",
  "state",
  "only",
  "new",
  "year",
  "some",
  "take",
  "come",
  "these",
  "know",
  "see",
  "use",
  "get",
  "like",
  "then",
  "first",
  "any",
  "work",
  "now",
  "may",
  "such",
  "give",
  "over",
  "think",
  "most",
  "even",
  "find",
  "day",
  "also",
  "after",
  "way",
  "many",
  "must",
  "look",
  "before",
  "great",
  "back",
  "through",
  "long",
  "where",
  "much",
  "should",
  "well",
  "people",
  "down",
  "own",
  "just",
  "because",
  "good",
  "each",
  "those",
  "feel",
  "seem",
  "how",
  "high",
  "too",
  "place",
  "little",
  "world",
  "very",
  "still",
  "nation",
  "hand",
  "old",
  "life",
  "tell",
  "write",
  "become",
  "here",
  "show",
  "house",
  "both",
  "between",
  "need",
  "mean",
  "call",
  "develop",
  "under",
  "last",
  "right",
  "move",
  "thing",
  "general",
  "school",
  "never",
  "same",
  "another",
  "begin",
  "while",
  "number",
  "part",
  "turn",
  "real",
  "leave",
  "might",
  "want",
  "point",
  "form",
  "off",
  "child",
  "few",
  "small",
  "since",
  "against",
  "ask",
  "late",
  "home",
  "interest",
  "large",
  "person",
  "end",
  "open",
  "public",
  "follow",
  "during",
  "present",
  "without",
  "again",
  "hold",
  "govern",
  "around",
  "possible",
  "head",
  "consider",
  "word",
  "program",
  "problem",
  "however",
  "lead",
  "system",
  "set",
  "order",
  "eye",
  "plan",
  "run",
  "keep",
  "face",
  "fact",
  "group",
  "play",
  "stand",
  "increase",
  "early",
  "course",
  "change",
  "help",
  "line",
]

const paragraphs = [
  `There are 195 countries in the world today. This total comprises 193 countries that are member states of the United Nations and 2 countries that are non-member observer states: the Holy See and the State of Palestine.`,
]

const buildParagraph = () => {
  let paragraph = ""

  for (let i = 0; i < 50; i++) {
    console.log(words[parseInt(Math.random() * words.length)])
    paragraph += words[parseInt(Math.random() * words.length)]
    i === 49 ? (paragraph += ".") : (paragraph += " ")
  }

  console.log("paragraph: ", paragraph)
  return paragraph
}

const startGame = () => {
  statsDiv.innerHTML = ""
  startGameBtn.innerText = "Restart"
  startGameBtn.blur()
  typingDiv.classList.remove("hidden")
  typingDiv.innerHTML = ""
  const text = buildParagraph()

  const characters = text.split("").map(char => {
    const div = document.createElement("div")
    div.innerText = char
    typingDiv.appendChild(div)
    return div
  })

  let cursorIndex = 0
  let cursorCharacter = characters[cursorIndex]
  cursorCharacter.classList.add("cursor")

  let startTime = null

  const keydown = ({ key }) => {
    if (!startTime) {
      startTime = new Date()
    }

    if (key == cursorCharacter.innerHTML) {
      cursorCharacter.classList.remove("cursor")
      cursorCharacter.classList.add("done")
      cursorCharacter = characters[++cursorIndex]
    }

    if (cursorIndex >= characters.length) {
      // Game Ends
      const endTime = new Date()
      const delta = endTime - startTime
      const seconds = delta / 1000
      const numberOfWords = text.split(" ").length
      const wps = numberOfWords / seconds
      const wpm = wps * 60
      statsDiv.classList.remove("hidden")
      statsDiv.innerHTML = `wpm<span class="wpm">${parseInt(wpm)}</span>`
      document.removeEventListener("keydown", keydown)
      return
    }

    cursorCharacter.classList.add("cursor")
  }

  document.addEventListener("keydown", keydown)
}

startGame()
