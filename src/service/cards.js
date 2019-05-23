export const cardsDisplay = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

export const suits = {
  club: "♣️",
  heart: "♥️",
  spade: "♠️",
  diamond: "♦️"
};

class Cards {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.display = cardsDisplay[value - 2];
  }

  toString = () => {
    return `${this.display}${suits[this.suit]}`;
  };
}

export const generateCards = () => {
  let cards = [];
  Object.keys(suits).forEach(suit => {
    for (let i = 2; i <= 14; i++) {
      cards.push(new Cards(i, suit));
    }
  });
  return cards;
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const shuffleCards = cards => {
  for (let i = 0; i < cards.length; i++) {
    let randomInt = getRandomInt(0, cards.length - 1);
    let temp = cards[i];
    cards[i] = cards[randomInt];
    cards[randomInt] = temp;
  }
  return cards;
};

export const generateShuffledCards = () => {
  return shuffleCards(generateCards());
};

// Poker Hand Evaluator by Pat Wilson ©2012 (Chrome|IE8|IE9)

const hands = [
  "4 of a Kind",
  "Straight Flush",
  "Straight",
  "Flush",
  "High Card",
  "1 Pair",
  "2 Pair",
  "Royal Flush",
  "3 of a Kind",
  "Full House",
  "-Invalid-"
];
const handRanks = [8, 9, 5, 6, 1, 2, 3, 10, 4, 7, 0];

function calcIndex(cs, ss) {
  let v, i, o, s;
  for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) {
    v += o * (((v / o) & 15) + 1);
  }
  if ((v %= 15) != 5) {
    return v - 1;
  } else {
    s =
      (1 << cs[0]) | (1 << cs[1]) | (1 << cs[2]) | (1 << cs[3]) | (1 << cs[4]);
  }
  v -= s / (s & -s) == 31 || s == 0x403c ? 3 : 1;
  return (
    v -
    (ss[0] == (ss[0] | ss[1] | ss[2] | ss[3] | ss[4])) * (s == 0x7c00 ? -5 : 1)
  );
}
function getCombinations(k, n) {
  console.log("called getcombinations" + " " + k + " " + n);
  let result = [],
    comb = [];
  function next_comb(comb, k, n, i) {
    if (comb.length === 0) {
      for (i = 0; i < k; ++i) {
        comb[i] = i;
      }
      return true;
    }
    i = k - 1;
    ++comb[i];
    while (i > 0 && comb[i] >= n - k + 1 + i) {
      --i;
      ++comb[i];
    }
    if (comb[0] > n - k) {
      return false;
    } // No more combinations can be generated
    for (i = i + 1; i < k; ++i) {
      comb[i] = comb[i - 1] + 1;
    }
    return true;
  }
  while (next_comb(comb, k, n)) {
    result.push(comb.slice());
  }
  return result;
}
function getPokerScore(cs) {
  console.log("called getpokerscore " + cs);
  let a = cs.slice(),
    d = {},
    i;
  for (i = 0; i < 5; i++) {
    d[a[i]] = d[a[i]] >= 1 ? d[a[i]] + 1 : 1;
  }
  a.sort(function(a, b) {
    return d[a] < d[b] ? +1 : d[a] > d[b] ? -1 : b - a;
  });
  return (a[0] << 16) | (a[1] << 12) | (a[2] << 8) | (a[3] << 4) | a[4];
}
function showParsedCards(cs, ss) {
  let card, i;
  let suitMap = { "♠": "spades", "♣": "clubs", "♥": "hearts", "♦": "diams" };

  if (cs !== null && ss !== null) {
    if (cs.length == ss.length) {
      for (i = 0; i < 7; i++) {
        card = document.getElementById("card" + (i + 1));
        if (i < 5) {
          if (i < cs.length && cs.length !== 0) {
            card.className =
              "card rank-" + cs[i].toLowerCase() + " " + suitMap[ss[i]];
            card.getElementsByTagName("span")[0].innerHTML = cs[i];
            card.getElementsByTagName("span")[1].innerHTML = ss[i];
          } else {
            card.className = "card back";
            card.getElementsByTagName("span")[0].innerHTML = "";
            card.getElementsByTagName("span")[1].innerHTML = "";
            if (card.parentNode.tagName == "STRONG") {
              card.parentNode.parentNode.innerHTML = card.outerHTML;
            }
          }
        } else {
          if (i < cs.length && cs.length !== 0) {
            card.className =
              "card rank-" + cs[i].toLowerCase() + " " + suitMap[ss[i]];
            card.getElementsByTagName("span")[0].innerHTML = cs[i];
            card.getElementsByTagName("span")[1].innerHTML = ss[i];
          } else {
            card.className = "blank";
            card.getElementsByTagName("span")[0].innerHTML = "";
            card.getElementsByTagName("span")[1].innerHTML = "";
            if (card.parentNode.tagName == "STRONG") {
              card.parentNode.parentNode.innerHTML = card.outerHTML;
            }
          }
        }
        if (cs.length < 5) {
          if (card.parentNode.tagName == "STRONG") {
            card.parentNode.parentNode.innerHTML = card.outerHTML;
          }
        }
      }
    }
  } else {
    //Reset the cards
    for (i = 0; i < 7; i++) {
      card = document.getElementById("card" + (i + 1));
      if (i > 4 && i < 7) {
        card.className = "blank";
        card.getElementsByTagName("span")[0].innerHTML = "";
        card.getElementsByTagName("span")[1].innerHTML = "";
      } else {
        card.className = "card back";
        card.getElementsByTagName("span")[0].innerHTML = "";
        card.getElementsByTagName("span")[1].innerHTML = "";
      }
      if (card.parentNode.tagName == "STRONG") {
        card.parentNode.parentNode.innerHTML = card.outerHTML;
      }
    }
  }

  if (cs === null) {
    document.getElementById("wrapper").style.width = "425px";
  }
  if (cs !== null && ss !== null && cs.length <= 7 && cs.length == ss.length) {
    document.getElementById("wrapper").style.width =
      Math.max(85 * cs.length, 425) + "px";
  }
}

function rankHand(str) {
  let index = 10,
    winCardIndexes,
    i,
    e;
  showParsedCards(
    str.match(/(1[0-4]|[2-9]|[J|Q|K|A])/g),
    str.match(/♠|♣|♥|♦/g)
  );

  if (
    str.match(/((?:\s*)(10|[2-9]|[J|Q|K|A])[♠|♣|♥|♦](?:\s*)){5,7}/g) !== null
  ) {
    let cardStr = str
      .replace(/A/g, "14")
      .replace(/K/g, "13")
      .replace(/Q/g, "12")
      .replace(/J/g, "11")
      .replace(/♠|♣|♥|♦/g, ",");
    let cards = cardStr
      .replace(/\s/g, "")
      .slice(0, -1)
      .split(",");
    let suits = str.match(/♠|♣|♥|♦/g);
    if (cards !== null && suits !== null) {
      if (cards.length == suits.length) {
        let o = {},
          keyCount = 0,
          j;
        for (i = 0; i < cards.length; i++) {
          e = cards[i] + suits[i];
          o[e] = 1;
        }
        for (j in o) {
          if (o.hasOwnProperty(j)) {
            keyCount++;
          }
        }

        if (cards.length >= 5) {
          if (cards.length == suits.length && cards.length == keyCount) {
            for (i = 0; i < cards.length; i++) {
              cards[i] -= 0;
            }
            for (i = 0; i < suits.length; i++) {
              suits[i] = Math.pow(2, suits[i].charCodeAt(0) % 9824);
            }
            let c = getCombinations(5, cards.length);
            let maxRank = 0,
              winIndex = 10;
            for (i = 0; i < c.length; i++) {
              let cs = [
                cards[c[i][0]],
                cards[c[i][1]],
                cards[c[i][2]],
                cards[c[i][3]],
                cards[c[i][4]]
              ];
              let ss = [
                suits[c[i][0]],
                suits[c[i][1]],
                suits[c[i][2]],
                suits[c[i][3]],
                suits[c[i][4]]
              ];
              index = calcIndex(cs, ss);

              if (handRanks[index] > maxRank) {
                maxRank = handRanks[index];
                winIndex = index;
                var wci = c[i].slice();
              } else if (handRanks[index] == maxRank) {
                //If by chance we have a tie, find the best one
                let score1 = getPokerScore(cs);
                let score2 = getPokerScore([
                  cards[wci[0]],
                  cards[wci[1]],
                  cards[wci[2]],
                  cards[wci[3]],
                  cards[wci[4]]
                ]);
                if (score1 > score2) {
                  var wci = c[i].slice();
                }
              }
            }
            index = winIndex;
          }
        }

        //Show the best cards if cs.length is less than 7 cards.
        let card;
        if (cards.length <= 7) {
          for (i = 0; i < 7; i++) {
            card = document.getElementById("card" + (i + 1));
            if (wci.indexOf(i) == -1) {
              //Not in the solution
              if (card.parentNode.tagName == "STRONG") {
                card.parentNode.parentNode.innerHTML = card.outerHTML;
              }
            } else {
              //Is in the solution
              if (card.parentNode.tagName == "LI") {
                card.outerHTML = "<strong>" + card.outerHTML + "</strong>";
              }
            }
          }
        }
      }
    }
  }

  document.getElementById("output").innerHTML =
    "<Big><B>Hand: </B>" + hands[index] + "</Big>";
}

function inputCardSymbolsOnly(e) {
  let chrTyped,
    chrCode = 0,
    evt = e ? e : event;
  if (evt.charCode !== undefined) {
    chrCode = evt.charCode;
  } else if (evt.which !== undefined) {
    chrCode = evt.which;
  } else if (evt.keyCode !== undefined) {
    chrCode = evt.keyCode;
  }

  if (chrCode === 0) {
    chrTyped = "SPECIAL KEY";
  } else {
    chrTyped = String.fromCharCode(chrCode);
  }

  //[test only:] display chrTyped on the status bar
  //document.getElementById("output").innerHTML += chrCode;

  //Setup a collection of substitutions
  let keyMap = {
    a: "A",
    k: "K",
    q: "Q",
    j: "J",
    A: "A",
    K: "K",
    Q: "Q",
    J: "J",
    s: "♠",
    c: "♣",
    h: "♥",
    d: "♦",
    S: "♠",
    C: "♣",
    H: "♥",
    D: "♦",
    "@": "A",
    "&": "K",
    $: "Q",
    ")": "J",
    "?": "♠",
    "!": "♣",
    "'": "♥",
    '"': "♦"
  };

  if (chrTyped in keyMap) {
    evt.returnValue = false; //Super important do not move!!!
    if (document.selection) {
      //IE
      let range = document.selection.createRange();
      range.text = keyMap[chrTyped];
      if (evt.preventDefault !== undefined) {
        evt.preventDefault();
      }
      // Chrome + FF
    } else if (e.target.selectionStart || e.target.selectionStart == "0") {
      let start = evt.target.selectionStart;
      let end = evt.target.selectionEnd;
      evt.target.value =
        evt.target.value.substring(0, start) +
        keyMap[chrTyped] +
        evt.target.value.substring(end, evt.target.value.length);
      evt.target.selectionStart = start + 1;
      evt.target.selectionEnd = start + 1;
    } else {
      evt.target.value += keyMap[chrTyped];
    }

    return false;
  }

  if (chrTyped.match(/\d|\s|SPECIAL/)) {
    evt.returnValue = true;
    return true;
  }
  if (evt.altKey || evt.ctrlKey || chrCode < 28) {
    return true;
  }

  //Any other input? Prevent the default response:
  if (evt.preventDefault) {
    evt.preventDefault();
  }
  evt.returnValue = false;

  return false;
}

function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(eventType, handler, true);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + eventType, handler);
  } else {
    return 0;
  }
  return 1;
}

function doRank(e) {
  setTimeout(function() {
    rankHand(document.getElementById("cardInput").value);
  }, 0);
}

let isiPad = navigator.userAgent.match(/iPad/i) !== null;
if (isiPad) {
  document.getElementById("cardInput").type = "tel";
  document.getElementById("output").innerHTML =
    "<small>Use ),$,&,@ to key in J,Q,K,A.<br/>" +
    "Use ?,!,',&quot; to key in suits.</small>";
}

addEventHandler(
  document.getElementById("cardInput"),
  "keypress",
  inputCardSymbolsOnly
);
addEventHandler(document.getElementById("cardInput"), "keyup", doRank);
addEventHandler(document.getElementById("cardInput"), "input", doRank);
document.getElementById("cardInput").focus();
