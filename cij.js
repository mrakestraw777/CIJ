const mySelects = document.querySelectorAll("select");
let searchDisplay = document.getElementById('searchResults');

function checkForDifferences(array){
    let newArray = []
    array.forEach(e=>{
      let newElement = {};
      if(e.kana == e.kanji && e.partOfSpeech == "Verb"){
        newElement.kana = e.kana
        newElement.kanji = e.kanji
        newElement.partOfSpeech = e.partOfSpeech
        newArray.push(newElement);
      }

    })
    console.log(newArray)
}

// console.log(`Here's proof of my new commits working with the same url.`)

mySelects.forEach(e =>{
  e.addEventListener('change', selectsChanged)
})

function selectsChanged(){
  if(searchDisplay.style.display != 'none')
  {
    const searchTerm = document.getElementById('searchInput').value;
    let searchTermArray = searchTranscripts(fullTranscripts, searchTerm, mySelects[0].value, mySelects[1].value);
    if(searchTermArray.length != 0)
    {
      document.getElementById('searchResults').innerHTML = presentArrayData(searchTermArray);
      document.getElementById('searchResults').style.display = 'inherit';
    }else{
      /* document.getElementById('searchResults').innerHTML = core2000Check(core2000,searchTerm); */
    document.getElementById('searchResults').innerHTML = `<p><span class="searchTerm">${searchTerm}</span> does not seem to appear in any transcripts. If you entered a Kanji try removing any suffixes from the root Kanji or enter the pure Kana form of the word</p>
    
    <p>Example: <span class="searchTerm">頑張る</span> has "0" results.  Removing the kana suffix "-る" leaves the root form <span class="searchTerm">頑張</span> which has some results.</p>`;
    document.getElementById('searchResults').style.display = 'inherit';
    }
  }
}

function deleteDictionaryEntries(dictionary){
  let nonMemberArray = []
  dictionary.forEach(e=>{
    if(e.membership != 'members only')
    {
      nonMemberArray.push(e);
    }
    
  })
  console.log(nonMemberArray)
}




/* Source for stringSearch function:
https://medium.com/nerd-for-tech/naive-string-searching-algorithm-2d5fa07fdbcd */

function stringSearch(string, pattern) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
      for (let j = 0; j < pattern.length; j++) {
        if (pattern[j] !== string[i + j]) break;
        if (j === pattern.length - 1) count++;
      }
    }
    return count;
    
  };

function searchCore2000(searchTerm){
    let newSearchElement = {};
    // console.log(newSearchElement.length)
    let searchCount = 0;

  core2000.forEach(e => {
    if(searchTerm == e.kanji || searchTerm==e.kana)
    {
      searchCount += 1;
     
      newSearchElement.kana = e.kana;
      /* console.log(`Kana is ${e.kana}`)
      console.log(`newSearchTerm kana is ${newSearchElement.kana}`)
      console.log(`newSearchElement is ${newSearchElement}`) */
      // console.log(`newSearchElement dictionary is ${JSON.stringify(searchTermDictionary)}`)
      
      newSearchElement.kanji = e.kanji;
      // console.log(newSearchElement)
    }
    
  })
    if(searchCount == 0)
    {
      newSearchElement.term = searchTerm;
      console.log(`The searched term was not in the core2000 at all`)
    }
    console.log(newSearchElement)
    if('kanji' in newSearchElement){
      // console.log(`There is a key for kanji. :)`)
    }else if('term' in newSearchElement){
      // console.log(`No kanji, but we have a term.`)
    }
    
    return newSearchElement;
}
function searchTranscripts(text,searchTerm, availability, level) 
{
      let searchTermElement = searchCore2000(searchTerm);
      // console.log(searchTermArray)
      let newArray = [];
      text.forEach(element => {

        if(availability == 'all' && level == 'all')
        {
          let newElement = {};
          // console.log(`searchTermArray is :  `)
          // console.log(searchTermArray[0])
          if('term' in searchTermElement)
          {
            let countKanji = stringSearch(element.transcript, searchTermElement.term);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.term); 
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }else if('kanji' in searchTermElement){
            let countKanji = stringSearch(element.transcript, searchTermElement.kanji);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.kana);
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }
          newElement.url = element.url;
          newElement.title = element.title;
          newElement.level = element.level;        
          newElement.term = searchTerm;
          if(newElement.termCountKanji > 0 || newElement.termCountKan > 0)
          {
              newArray.push(newElement);
          }

        }else if(element['membership'] == availability && element['level'] == level)
        {
          let newElement = {};
          // console.log(`searchTermArray is :  `)
          // console.log(searchTermArray[0])
          if('term' in searchTermElement)
          {
            let countKanji = stringSearch(element.transcript, searchTermElement.term);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.term); 
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }else if('kanji' in searchTermElement){
            let countKanji = stringSearch(element.transcript, searchTermElement.kanji);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.kana);
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }
          newElement.url = element.url;
          newElement.title = element.title;
          newElement.level = element.level;        
          
          newElement.term = searchTerm;
          if(newElement.termCountKanji > 0 || newElement.termCountKan > 0)
          {
              newArray.push(newElement);
          }
        }else if(element['membership'] == availability && level == 'all')
        {
          let newElement = {};
          // console.log(`searchTermArray is :  `)
          // console.log(searchTermArray[0])
          if('term' in searchTermElement)
          {
            let countKanji = stringSearch(element.transcript, searchTermElement.term);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.term); 
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }else if('kanji' in searchTermElement){
            let countKanji = stringSearch(element.transcript, searchTermElement.kanji);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.kana);
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }
          newElement.url = element.url;
          newElement.title = element.title;
          newElement.level = element.level;        
          
          newElement.term = searchTerm;
          if(newElement.termCountKanji > 0 || newElement.termCountKan > 0)
          {
              newArray.push(newElement);
          }
          
        }else if(availability == 'all' && element['level'] == level)
        {
          let newElement = {};
          // console.log(`searchTermArray is :  `)
          // console.log(searchTermArray[0])
          if('term' in searchTermElement)
          {
            let countKanji = stringSearch(element.transcript, searchTermElement.term);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.term); 
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }else if('kanji' in searchTermElement){
            let countKanji = stringSearch(element.transcript, searchTermElement.kanji);
            let countKana = stringSearch(element.transcript_furigana, searchTermElement.kana);
            newElement.termCountKanji = countKanji;
            newElement.termCountKana = countKana;
            newElement.fullCount = countKana + countKanji;
          }
          newElement.url = element.url;
          newElement.title = element.title;
          newElement.level = element.level;        
          
          newElement.term = searchTerm;
          if(newElement.termCountKanji > 0 || newElement.termCountKan > 0)
          {
              newArray.push(newElement);
          }
        }

      });

      sortSearchArray(newArray);
      // console.log(newArray);
      return newArray;
}

function presentArrayData(formattedArray)
{
  let htmlData = `<p><span class="searchTerm">${formattedArray[0].term}</span> appears in ${formattedArray.length} transcripts. </p><br>`;
  let arrayFormatCount = 0
  formattedArray.forEach(currentArray =>{
    if(arrayFormatCount == 0)
    {

      htmlData += `<a id="ichiban" target="_blank" href="${currentArray.url}"><p>${currentArray.title}</a> has <span class="searchTerm">${currentArray.term}</span> appear ${currentArray.termCountKanji} times in the Non-Furigana transcript and ${currentArray.termCountKana} times in the Furigana transcript. (${currentArray['level']})</p><br>`;

      arrayFormatCount = 1;

    }else
    {

      htmlData += `<a target="_blank" href="${currentArray.url}"><p>${currentArray.title}</a> has <span class="searchTerm">${currentArray.term}</span> appear ${currentArray.termCountKanji} times in the Non-Furigana transcript and ${currentArray.termCountKana} times in the Furigana transcript. (${currentArray['level']})</p><br>`;
    }
    
    // console.log(htmlData)
  })
  return htmlData;
};

/* Got the sort function from:
https://www.codegrepper.com/code-examples/javascript/sort+an+array+of+dictionaries+elements+javascript */
function sortSearchArray(sortedArray){
  sortedArray.sort(function(a, b) {
    return b.fullCount - a.fullCount;
  }); 
};

document.getElementById("searchButton").onclick = function() {
    const searchTerm = document.getElementById('searchInput').value;
    let searchTermArray = searchTranscripts(fullTranscripts, searchTerm, mySelects[0].value, mySelects[1].value);
    if(searchTermArray.length != 0)
    {
      searchDisplay.innerHTML = presentArrayData(searchTermArray);
      searchDisplay.style.display = 'inherit';
    }else{
    /* document.getElementById('searchResults').innerHTML = core2000Check(core2000,searchTerm); */
    document.getElementById('searchResults').innerHTML = `<p><span class="searchTerm">${searchTerm}</span> does not seem to appear in any transcripts. Try searching <a target="blank" href="https://jisho.org/search/${searchTerm}">${searchTerm} on Jisho</a> to see if there's another form you might use.</p>`;
    document.getElementById('searchResults').style.display = 'inherit';
  }
}




  


  

/* BELOW IS THE FULL TRANSCRIPTS  */

/* let numberSwitch = [
  {
    numeral:{
      num: '0',
      unicode: 48,
    },
    fullWidth:{
      num: '０',
      unicode: 65296,
    },
    kana: '',
  },
  {
    numeral:{
      num: '1',
      unicode: 49,
    },
    fullWidth:{
      num: '１',
      unicode: 65297,
    },
    kana: '',
  },
  {
    numeral:{
      num: '2',
      unicode: 50,
    },
    fullWidth:{
      num: '２',
      unicode: 65298,
    },
    kana: '',
  },
  {
    numeral:{
      num: '3',
      unicode: 51,
    },
    fullWidth:{
      num: '３',
      unicode: 65299,
    },
    kana: '',
  },
  {
    numeral:{
      num: '4',
      unicode: 52,
    },
    fullWidth:{
      num: '４',
      unicode: 65300,
    },
    kana: '',
  },
  {
    numeral:{
      num: '5',
      unicode: 53,
    },
    fullWidth:{
      num: '５',
      unicode: 65301,
    },
    kana: '',
  },
  {
    numeral:{
      num: '6',
      unicode: 54,
    },
    fullWidth:{
      num: '６',
      unicode: 65302,
    },
    kana: '',
  },
  {
    numeral:{
      num: '7',
      unicode: 55,
    },
    fullWidth:{
      num: '７',
      unicode: 65303,
    },
    kana: '',
  },
  {
    numeral:{
      num: '8',
      unicode: 56,
    },
    fullWidth:{
      num: '８',
      unicode: 65304,
    },
    kana: '',
  },
  {
    numeral:{
      num: '9',
      unicode: 57,
    },
    fullWidth:{
      num: '９',
      unicode: 65305,
    },
    kana: '',
  },
  
]
 */



let fullTranscripts = [
  {
      title: "雪だるま Snowman",
      url: "https://cijapanese.com/snowman/",
      level: "complete beginner",
      membership: "free",
      transcript: "今、日本は冬です。春、夏、秋、冬。今は冬です。今日はとても寒いです。雪が降っています。雪がたくさん降っています。雪が降ったので、雪だるまを作りましょう。\n\n        丸があります。丸。小さな丸があります。大きな丸があります。小さな丸と大きな丸。１、２。丸が二つあります。これは\b雪だるまの頭です。これは雪だるまの体です。\n        \n        これは何ですか。これは雪だるまの目です。一つ、二つ。二つ、目があります。\n        \n        これは何ですか。これは雪だるまの鼻です。人参の鼻です。\n        \n        これは何ですか。これは雪だるまの口です。\n        \n        これは何ですか。これは雪だるまのボタンです。１、２、３。ボタンが三つあります。青いボタンがあります。\n        \n        今日は雪が降っています。雪がたくさん降っています。風が強いです。風がとても強いです。風がびゅーびゅー吹いています。\n        \n        雪だるまは寒いです。「さむーい」と言っています。雪だるまは、帽子をかぶります。赤い帽子をかぶります。\n        \n        まだ寒いです。「さむーい」と言っています。雪だるまは、今度はマフラーを巻きます。緑のマフラーを巻きます。\n        \n        まだ寒いです。「さむーい」と言っています。今度は耳あてをします。ピンクの耳あてをします。\n        \n        もう寒くありません。寒くないです。雪だるまは笑っています。にこにこ笑っています。\n        \n        今日はこれでおしまい。またね！",
      transcript_furigana: "今いま　日本にほんは　冬ふゆです。\n\n        春はる　夏なつ　秋あき　冬ふゆ。\n        \n        今いまは　冬ふゆです。\n        \n        今日きょうは　とても　寒さむいです。\n        \n        雪ゆきが　降ふっています。\n        \n        雪ゆきが　たくさん　降ふっています。\n        \n        雪ゆきが　降ふったので　雪ゆきだるまを　作つくりましょう。\n        \n        丸まるが　あります。　丸まる。\n        \n        小ちいさな　丸まるが　あります。\n        \n        大おおきな　丸まるが　あります。\n        \n        小ちいさな　丸まると　大おおきな　丸まる。\n        \n        １いち　２に　丸まるが　二ふたつ　あります。\n        \n        これは　雪ゆきだるまの　頭あたまです。\n        \n        これは　雪ゆきだるまの　体からだです。\n        \n        これは　何なんですか。\n        \n        これは　雪ゆきだるまの　目めです。\n        \n        一ひとつ　二ふたつ。\n        \n        二ふたつ　目めが　あります。\n        \n        これは　何なんですか。\n        \n        これは　雪ゆきだるまの　鼻はなです。\n        \n        人参にんじんの　鼻はなです。\n        \n        これは　何なんですか。\n        \n        これは　雪ゆきだるまの　口くちです。\n        \n        これは　何なんですか。\n        \n        これは　雪ゆきだるまの　ボタンぼたんです。\n        \n        １いち　２に　３さん、ボタンが　三みっつ　あります。\n        \n        青あおい　ボタンぼたんが　あります。\n        \n        今日きょうは　雪ゆきが　降ふっています。\n        \n        雪ゆきが　たくさん　降ふっています。\n        \n        風かぜが　強つよいです。\n        \n        風かぜが　とても　強つよいです。\n        \n        風かぜが　びゅーびゅー　吹ふいています。\n        \n        雪ゆきだるまは　寒さむいです。\n        \n        「さむーい」と　言いっています。\n        \n        雪ゆきだるまは　帽子ぼうしを　かぶります。\n        \n        赤あかい　帽子ぼうしを　かぶります。\n        \n        まだ　寒さむいです。\n        \n        「さむーい」と　言いっています。\n        \n        雪ゆきだるまは　今度こんどは　マフラーまふらーを　巻まきます。\n        \n        緑みどりの　マフラーまふらーを　巻まきます。\n        \n        まだ　寒さむいです。\n        \n        「さむーい」と　言いっています。\n        \n        今度こんどは　耳みみあてを　します。\n        \n        ピンクぴんくの　耳みみあてを　します。\n        \n        もう　寒さむくありません。\n        \n        寒さむくないです。\n        \n        雪ゆきだるまは　笑わらっています。\n        \n        にこにこ　笑わらっています。\n        \n        今日きょうは　これで　おしまい。\n        \n        またね！"
  },
  {
      title: "色と果物 Colors and Fruits",
      url: "https://cijapanese.com/colors-and-fruits/",
      level: "complete beginner",
      membership: "free",
      transcript: "絵の具があります。赤、青、黄色、三色の絵の具があります。\n\n        まず赤。赤で何を描きますか。りんごです。赤いりんごです。\n        \n        次は青。青で何を描きますか。ブルーベリーです。青いブルーベリーです。\n        \n        次は黄色。黄色で何を描きますか。バナナです。黄色いバナナです。\n        \n        赤と青を混ぜます。赤と青を混ぜたら何色ですか。赤と青を混ぜたら紫です。紫になりました。紫で何を描きますか。ぶどうです。紫のぶどうです。\n        \n        次は、赤と黄色を混ぜましょう。赤と黄色を混ぜたら何色ですか。赤と黄色を混ぜたらオレンジです。オレンジになりました。オレンジで何を描きますか。みかんです。オレンジのみかんです。\n        \n        次は、青と黄色を混ぜましょう。青と黄色を混ぜたら何色ですか。青と黄色を混ぜたら緑です。緑になりました。緑で何を描きますか。メロンです。緑のメロンです。\n        \n        最後に、赤と青と黄色、全部混ぜましょう。赤と青と黄色、全部混ぜたら何色ですか。全部混ぜたら茶色です。茶色になりました。茶色で何を描きますか。栗です。茶色い栗です。\n        \n        果物がたくさんあります。１、２、３、４、５、６、７。果物が七つあります。どの果物が好きですか。どの果物が好きですか。私はぶどうが好きです。ぶどうを食べます。もぐもぐ。おいしい。\n        \n        今日はこれでおしまい。またね！",
      transcript_furigana: "絵えの具ぐがあります。\n\n        赤あか、青あお、黄色きいろ、三色さんしょくの絵えの具ぐがあります。\n        \n        まず赤あか。赤あかで何なにを描かきますか。\n        \n        りんごです。赤あかいりんごです。\n        \n        次つぎは青あお。青あおで何なにを描かきますか。\n        \n        ブルーベリーぶるーべりーです。青あおいブルーベリーぶるーべりーです。\n        \n        次つぎは黄色きいろ。黄色きいろで何なにを描かきますか。\n        \n        バナナばななです。黄色きいろいバナナばななです。\n        \n        赤あかと青あおを混まぜます。\n        \n        赤あかと青あおを混まぜたら何色なにいろですか。\n        \n        赤あかと青あおを混まぜたら紫むらさきです。\n        \n        紫むらさきになりました。\n        \n        紫むらさきで何なにを描かきますか。\n        \n        ぶどうです。紫むらさきのぶどうです。\n        \n        次つぎは赤あかと黄色きいろを混まぜましょう。\n        \n        赤あかと黄色きいろを混まぜたら何色なにいろですか。\n        \n        赤あかと黄色きいろを混まぜたらオレンジおれんじです。\n        \n        オレンジおれんじになりました。\n        \n        オレンジおれんじで何なにを描かきますか。\n        \n        みかんです。オレンジおれんじのみかんです。\n        \n        次つぎは青あおと黄色きいろを混まぜましょう。\n        \n        青あおと黄色きいろを混まぜたら何色なにいろですか。\n        \n        青あおと黄色きいろを混まぜたら緑みどりです。\n        \n        緑みどりになりました。\n        \n        緑みどりで何なにを描かきますか。\n        \n        メロンめろんです。緑みどりのメロンめろんです。\n        \n        最後さいごに赤あかと青あおと黄色きいろ、全部ぜんぶ混まぜましょう。\n        \n        赤あかと青あおと黄色きいろ、全部ぜんぶ混まぜたら何色なにいろですか。\n        \n        全部ぜんぶ混まぜたら茶色ちゃいろです。\n        \n        茶色ちゃいろになりました。\n        \n        茶色ちゃいろで何なにを描かきますか。\n        \n        栗くりです。茶色ちゃいろい栗くりです。\n        \n        果物くだものがたくさんあります。\n        \n        １いち　２に　３さん　４し　５ご　６ろく　７なな\n        \n        果物くだものが七ななつあります。\n        \n        どの果物くだものが好すきですか。\n        \n        どの果物くだものが好すきですか。\n        \n        私わたしはぶどうが好すきです。\n        \n        ぶどうを食たべます。\n        \n        もぐもぐ。\n        \n        おいしい。\n        \n        今日きょうはこれでおしまい。\n        \n        またね！"
  },
  {
      title: "うさぎとかめ The Tortoise and the Hare",
      url: "https://cijapanese.com/the-tortoise-and-the-hare/",
      level: "beginner",
      membership: "free",
      transcript: "今日はうさぎとかめのお話をします。これはうさぎです。これはかめです。うさぎとかめのお話をします。\n\n        うさぎは走るのが速いです。ぴゅーっととっても速く走ります。かめは走るのが遅いです。ゆっくりゆっくり走ります。\n        \n        うさぎとかめがレースをします。うさぎとかめが競争します。ここがスタートです。ここがゴールです。よーいどん！\n        \n        うさぎはとても速いです。とても速く走ります。かめは遅いです。ゆっくりゆっくり走ります。\n        \n        木があります。うさぎは、木の下で休憩します。うさぎは寝てしまいます。ぐーぐー寝ています。\n        \n        うさぎが寝ている間に、かめは、ゆっくりゆっくりゆっくり、ゆっくりゆっくりゆっくり走ります。かめがうさぎに追いつきました。うさぎはまだ寝ています。\n        \n        うさぎが起きました。うさぎが起きました。目を覚ましました。うさぎはかめを見てびっくりしています。わーっ！と驚いています。\n        \n        かめは、ゆっくりゆっくり、ゆっくりゆっくり走っています。うさぎは急ぎます。急いで走ります。でもかめに追いつきません。\n        \n        かめがゴールしました。かめが勝ちました。かめが一番です。うさぎは負けました。うさぎは二番です。\n        \n        かめは「やったー！」と喜んでいます。かめは嬉しそうです。うさぎは「悔しー！」と泣いています。うさぎは悲しそうです。\n        \n        今日はこれでおしまい。\n        \n        バイバイ！",
      transcript_furigana: "今日きょうはうさぎとかめのお話はなしをします。\n\n        これはうさぎです。\n        \n        これはかめです。\n        \n        うさぎとかめのお話はなしをします。\n        \n        うさぎは走はしるのが速はやいです。\n        \n        ぴゅーっととっても速はやく走はしります。\n        \n        かめは走はしるのが遅おそいです。\n        \n        ゆっくりゆっくり走はしります。\n        \n        うさぎとかめがレースれーすをします。\n        \n        うさぎとかめが競争きょうそうします。\n        \n        ここがスタートすたーとです。\n        \n        ここがゴールごーるです。\n        \n        よーいどん！\n        \n        うさぎはとても速はやいです。\n        \n        とても速はやく走はしります。\n        \n        かめは遅おそいです。\n        \n        ゆっくりゆっくり走はしります。\n        \n        木きがあります。\n        \n        うさぎは木きの下したで休憩きゅうけいします。\n        \n        うさぎは寝ねてしまいます。\n        \n        ぐーぐー寝ねています。\n        \n        うさぎが寝ねている間あいだに、かめはゆっくりゆっくりゆっくり、ゆっくりゆっくりゆっくり走はしります。\n        \n        かめがうさぎに追おいつきました。\n        \n        うさぎはまだ寝ねています。\n        \n        うさぎが起おきました。\n        \n        うさぎが起おきました。\n        \n        目めを覚さましました。\n        \n        うさぎはかめを見みてびっくりしています。\n        \n        わーっ！と驚おどろいています。\n        \n        かめはゆっくりゆっくりゆっくりゆっくり走はしっています。\n        \n        うさぎは急いそぎます。\n        \n        急いそいで走はしります。\n        \n        でもかめに追おいつきません。\n        \n        かめがゴールごーるしました。\n        \n        かめが勝かちました。\n        \n        かめが一番いちばんです。\n        \n        うさぎは負まけました。\n        \n        うさぎは二番にばんです。\n        \n        かめは「やったー！」と喜よろこんでいます。\n        \n        かめは嬉うれしそうです。\n        \n        うさぎは「悔くやしー！」と泣ないています。\n        \n        うさぎは悲かなしそうです。\n        \n        今日きょうはこれでおしまい。\n        \n        バイバイばいばい！"
  },
  {
      title: "折り紙のバス Origami Bus",
      url: "https://cijapanese.com/origami-bus/",
      level: "complete beginner",
      membership: "free",
      transcript: "今日は折り紙をします。黄緑の折り紙です。四角い紙です。表は黄緑、裏は白です。\n\n        半分に折ります。１、２、３、３分の１折ります。裏返します。３分の１折ります。\n        \n        斜めに折ります。反対側も斜めに折ります。裏返します。斜めに折ります。反対側も斜めに折ります。\n        \n        角です。角を少し折ります。反対側も少し折ります。裏返します。角を少し折ります。反対も少し折ります。\n        \n        開きます。半分に折ります。角を中に入れます。反対側も、角を少し中に入れます。\n        \n        バスです。タイヤです。タイヤです。\n        \n        ペンがあります。窓を描きます。大きい窓です。大きい窓が一つ、二つ、二つあります。前に一つ、後ろに一つあります。\n        \n        小さい窓を描きます。小さい窓が、１、２、３、４、５、６。六つあります。真ん中にドアを描きます。\n        \n        男の人がいます。バスの運転手です。バスを運転しています。\n        \n        黄緑色のバスのできあがり。",
      transcript_furigana: "今日きょうは　折おり紙がみをします。\n\n        黄緑きみどりの　折おり紙がみです。\n        \n        四角しかくい　紙かみです。\n        \n        表おもては　黄緑きみどり　裏うらは　白しろです。\n        \n        半分はんぶんに　折おります。\n        \n        １いち　２に　３さん。\n        \n        ３分さんぶんの１いち　折おります。\n        \n        裏返うらがえします。\n        \n        ３分さんぶんの１いち　折おります。\n        \n        斜ななめに　折おります。\n        \n        反対側はんたいがわも　斜ななめに　折おります。\n        \n        裏返うらがえします。\n        \n        斜ななめに　折おります。\n        \n        反対側はんたいがわも　斜ななめに　折おります。\n        \n        角かどです。\n        \n        角かどを　少すこし　折おります。\n        \n        反対側はんたいがわも　少すこし　折おります。\n        \n        裏返うらがえします。\n        \n        角かどを　少すこし　折おります。\n        \n        反対はんたいも　少すこし　折おります。\n        \n        開ひらきます。\n        \n        半分はんぶんに　折おります。\n        \n        角かどを　中なかに　入いれます。\n        \n        反対側はんたいがわも　角かどを　少すこし　中なかに　入いれます。\n        \n        バスばすです。\n        \n        タイヤたいやです。\n        \n        タイヤたいやです。\n        \n        ペンぺんが　あります。\n        \n        窓まどを　描かきます。\n        \n        大おおきい　窓まどです。\n        \n        大おおきい　窓まどが　一ひとつ　二ふたつ。\n        \n        二ふたつ　あります。\n        \n        前まえに　一ひとつ　後うしろに　一ひとつ　あります。\n        \n        小ちいさい　窓まどを　描かきます\n        \n        小ちいさい　窓まどが　１いち　２に　３さん　４し　５ご　６ろく　六むっつ　あります。\n        \n        真まん中なかに　ドアどあを　描かきます。\n        \n        男おとこの人ひとが　います。\n        \n        バスばすの　運転手うんてんしゅです。\n        \n        バスばすを　運転うんてんしています。\n        \n        黄緑色きみどりいろの　バスばすの　できあがり。"
  },
  {
      title: "３匹の子豚 Three Little Pigs",
      url: "https://cijapanese.com/three-little-pigs/",
      level: "beginner",
      membership: "free",
      transcript: "今日は、３匹の子豚のお話をします。\n\n      豚の家族です。豚のお母さんです。豚の子供です。１、２、３、子豚が３匹います。\n      \n      木があります。木がたくさんあります。森です。子豚たちは、森に住んでいます。子豚たちは家を作ります。\n      \n      これは、わらです。１番目の子豚は、わらの家を作ります。\n      \n      これは木です。これは木です。２番目の子豚は、木の家を作ります。\n      \n      これはレンガです。３番目の子豚は、レンガの家を作ります。\n      \n      これは何でしょう。これは何でしょう。これはオオカミです。怖いオオカミです。\n      \n      オオカミが来ました。オオカミがフーと吹きます。わらの家は、ぴゅー、飛ばされます。１番目の子豚は、２番目の子豚の木の家に逃げます。\n      \n      またオオカミが来ました。フーっ。オオカミがフーっと吹きます。木の家は、ぴゅー、飛ばされます。子豚たちは、３番目の子豚のレンガの家に逃げます。\n      \n      またオオカミが来ました。オオカミがフーっと吹きます。でも、フーっと吹いてもレンガの家は飛ばされません。\n      \n      煙突があります。はしごがあります。オオカミがはしごを登ります。家の中です。火があります。熱い火があります。\n      \n      オオカミが煙突の中に入ります。ぴゅー。熱っ！オオカミは死んでしまいました。\n      \n      おしまい。またね！",
      transcript_furigana: "今日きょうは　３匹さんびきの　子豚こぶたの　お話はなしをします。\n\n      豚ぶたの　家族かぞくです。\n      \n      豚ぶたの　お母かあさんです。\n      \n      豚ぶたの　子供こどもです。\n      \n      １いち　２に　３さん　子豚こぶたが　３匹さんびきいます。\n      \n      木きが　あります。\n      \n      木きが　たくさん　あります。\n      \n      森もりです。\n      \n      子豚こぶたたちは　森もりに　住すんでいます。\n      \n      子豚こぶたたちは　家いえを　作つくります。\n      \n      これは　わらです。\n      \n      １番目いちばんめの　子豚こぶたは　わらの　家いえを　作つくります。\n      \n      これは　木きです。\n      \n      これは　木きです。\n      \n      ２番目にばんめの　子豚こぶたは　木きの　家いえを　作つくります。\n      \n      これは　レンガれんがです。\n      \n      ３番目さんばんめの　子豚こぶたは　レンガれんがの　家いえを　作つくります。\n      \n      これは　何なんでしょう。\n      \n      これは　何なんでしょう。\n      \n      これは　オオカミおおかみです。\n      \n      怖こわい　オオカミおおかみです。\n      \n      オオカミおおかみが　来きました。\n      \n      オオカミおおかみが　フーふーと　吹ふきます。\n      \n      わらの　家いえは　ぴゅー　飛とばされます。\n      \n      １番目いちばんめの　子豚こぶたは　２番目にばんめの　子豚こぶたの　木きの　家いえに　逃にげます。\n      \n      また　オオカミおおかみが　来きました。\n      \n      フーふーっ。\n      \n      オオカミおおかみが　フーふーっと　吹ふきます。\n      \n      木きの　家いえは　ぴゅー　飛とばされます。\n      \n      子豚こぶたたちは　３番目さんばんめの　子豚こぶたの　レンガれんがの　家いえに　逃にげます。\n      \n      また　オオカミおおかみが　来きました。\n      \n      オオカミおおかみが　フーふーっと　吹ふきます。\n      \n      でも　フーふーっと　吹ふいても　レンガれんがの　家いえは　飛とばされません。\n      \n      煙突えんとつが　あります。\n      \n      はしごが　あります。\n      \n      オオカミおおかみが　はしごを　登のぼります。\n      \n      家いえの　中です。\n      \n      火ひが　あります。\n      \n      熱あつい　火ひが　あります。\n      \n      オオカミおおかみが　煙突えんとつの　中なかに　入はいります。\n      \n      ぴゅー。\n      \n      熱あつっ！\n      \n      オオカミおおかみは　死しんでしまいました。\n      \n      おしまい。　またね！"
  },
  {
      title: "カラオケ Karaoke",
      url: "https://cijapanese.com/karaoke/",
      level: "beginner",
      membership: "free",
      transcript: "今日はカラオケの話をします。カラオケ、好きですか。\n\n      私の家族です。私はカラオケが好きです。私の夫もカラオケが好きです。子供たちも歌が好きです。\n      \n      夫は歌が上手です。夫は歌が上手です。私は、歌があまり上手ではありません。あんまり得意ではありません。でも好きです。\n      \n      私達家族は時々、時々カラオケに行きます。カラオケのお店です。時々カラオケに行きます。いつもは行きません。時々行きます。\n      \n      今２０２１年です。今年は２０２１年です。２０２０年、２０１９年。前は時々カラオケに行っていました。前は。でも今は行けません。今は行けません。何ででしょう。コロナウイルスです。コロナウイルスが心配です。なので今は行けません。\n      \n      でも私達はカラオケをしたいです。歌いたいです。なので、カラオケのマイクを買いました。これはお金です。マイクを買いました。アマゾンで買いました。昨日家にマイクが届きました。昨日マイクが来ました。\n      \n      なのでカラオケに行かずに、家で歌います。楽しいです。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　カラオケからおけの　話はなしをします。\n\n      カラオケからおけ　好すきですか。\n      \n      私わたしの　家族かぞくです。\n      \n      私わたしは　カラオケからおけが　好すきです。\n      \n      私わたしの　夫おっとも　カラオケからおけが　好すきです。\n      \n      子供こどもたちも　歌うたが　好すきです。\n      \n      夫おっとは　歌うたが　上手じょうずです。\n      \n      夫は　歌うたが　上手じょうずです。\n      \n      私わたしは　歌うたが　あまり　上手じょうずではありません。\n      \n      あんまり　得意とくいではありません。\n      \n      でも　好すきです。\n      \n      私達わたしたち　家族かぞくは　時々ときどき　時々ときどき　カラオケからおけに　行いきます。\n      \n      カラオケからおけの　お店みせです。\n      \n      時々ときどき　カラオケからおけに　行いきます。\n      \n      いつもは　行いきません。\n      \n      時々ときどき　行いきます。\n      \n      今いま　２０２１年にせんにじゅういちねんです。\n      \n      今年ことしは　２０２１年にせんにじゅういちねんです。\n      \n      ２０２０年にせんにじゅうねん、２０１９年にせんじゅうきゅうねん。\n      \n      前まえは　時々ときどき　カラオケからおけに　行いっていました。\n      \n      前まえは。\n      \n      でも　今いまは　行いけません。\n      \n      今いまは　行いけません。\n      \n      何なんででしょう。\n      \n      コロナウイルスころなういるすです。\n      \n      コロナウイルスころなういるすが　心配しんぱいです。\n      \n      なので　今いまは　行いけません。\n      \n      でも　私達わたしたちは　カラオケからおけをしたいです。\n      \n      歌うたいたいです。\n      \n      なので　カラオケからおけの　マイクまいくを　買かいました。\n      \n      これは　お金かねです。\n      \n      マイクまいくを　買かいました。\n      \n      アマゾンあまぞんで　買かいました。\n      \n      昨日きのう　家いえに　マイクまいくが　届とどきました。\n      \n      昨日きのう　マイクまいくが　来きました。\n      \n      なので　カラオケからおけに　行いかずに　家いえで　歌うたいます。\n      \n      楽たのしいです。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "コーヒー Coffee",
      url: "https://cijapanese.com/coffee/",
      level: "beginner",
      membership: "free",
      transcript: "今日は、コーヒーについてお話します。\n\n      これは私です。有紀です。私はコーヒーが好きです。コーヒーが大好きです。毎日コーヒーを飲みます。毎日、毎日コーヒーを飲みます。毎日、朝、毎日、朝、毎朝コーヒーを飲みます。\n      \n      もしも、もしもコーヒーを飲まなかったら、もしコーヒーを飲まないと、頭が、頭が痛くなります。コーヒーを飲まないと、頭痛がします。なので毎日必ずコーヒーを飲みます。\n      \n      コーヒーの豆です。これはコーヒーミルです。コーヒーミルに豆を入れます。ここをぐるぐるぐるぐる回します。ぐるぐる回して豆を挽きます。豆を挽いたら小さくなります。細かくなります。粉になります。\n      \n      やかんです。やかんに水を入れます。火にかけて、お湯を沸かします。やかんに水を入れて、お湯を沸かします。\n      \n      マグカップです。私のマグカップは、赤いマグカップです。フィルターです。ここに粉を入れます。粉を入れます。お湯も入れます。\n      \n      コーヒーができました。これはブラックコーヒーです。私はブラックコーヒーは好きじゃありません。甘いコーヒーが好きです。甘いコーヒーが好きなので、砂糖を入れます。それからミルクも入れます。混ぜます。\n      \n      甘いミルクコーヒーのできあがり。\n      \n      今日はこれでおしまい。またね！  ",
      transcript_furigana: "今日きょうは　コーヒーこーひーについて　お話はなしします。\n\n      これは　私わたしです。\n      \n      有紀ゆきです。\n      \n      私わたしは　コーヒーこーひーが　好すきです。\n      \n      コーヒーこーひーが　大好だいすきです。\n      \n      毎日まいにち　コーヒーこーひーを　飲のみます。\n      \n      毎日まいにち　毎日まいにち　コーヒーこーひーを　飲のみます。\n      \n      毎日まいにち　朝あさ　毎日まいにち　朝あさ　毎朝まいあさ　コーヒーこーひーを　飲のみます。\n      \n      もしも　もしも　コーヒーこーひーを　飲のまなかったら、　\n      \n      もし　コーヒーこーひーを　飲のまないと、　頭あたまが　頭あたまが　痛いたくなります。\n      \n      コーヒーこーひーを　飲のまないと　頭痛ずつうがします。\n      \n      なので　毎日まいにち　必かならず　コーヒーこーひーを　飲のみます。\n      \n      コーヒーこーひーの　豆まめです。\n      \n      これは　コーヒーミルこーひーみるです。\n      \n      コーヒーミルこーひーみるに　豆まめを　入いれます。\n      \n      ここを　ぐるぐるぐるぐる　回まわします。\n      \n      ぐるぐる　回まわして　豆まめを　挽ひきます。\n      \n      豆まめを　挽ひいたら　小ちいさく　なります。\n      \n      細こまかく　なります。\n      \n      粉こなに　なります。\n      \n      やかんです。\n      \n      やかんに　水みずを　入いれます。\n      \n      火ひに　かけて　お湯ゆを　沸わかします。\n      \n      やかんに　水みずを　入いれて　お湯ゆを　沸わかします。\n      \n      マグカップまぐかっぷです。\n      \n      私わたしの　マグカップまぐかっぷは　赤あかい　マグカップまぐかっぷです。\n      \n      フィルターふぃるたーです。\n      \n      ここに　粉こなを　入いれます。\n      \n      粉こなを　入いれます。\n      \n      お湯ゆも　入いれます。\n      \n      コーヒーこーひーが　できました。\n      \n      これは　ブラックコーヒーぶらっくこーひーです。\n      \n      私わたしは　ブラックコーヒーぶらっくこーひーは　好すきじゃありません。\n      \n      甘あまい　コーヒーこーひーが　好すきです。\n      \n      甘あまい　コーヒーこーひーが　好すきなので　砂糖さとうを　入いれます。\n      \n      それから　ミルクみるくも　入いれます。\n      \n      混まぜます。\n      \n      甘あまい　ミルクコーヒーみるくこーひーの　できあがり。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "ペット My Pets",
      url: "https://cijapanese.com/my-pets/",
      level: "beginner",
      membership: "free",
      transcript: "今日はペットの話をします。犬や猫、鳥、魚など、家で飼うペットについて話します。\n\n      これは私です。有紀です。２０２１年、今です。今の私です。昔です。子供の時の私です。\n      \n      私は子供の時、カメを飼っていました。カメを飼っていました。緑色の小さいカメでした。\n      \n      次に鳥を飼いました。名前はピースケです。ピースケという名前です。ピースケは、男の子、オスの鳥でした。ピースケは喋りました。「おはよー！」と喋ることができました。\n      \n      私はピースケのことが大好きでした。でもある日。これは私の家です。窓です。家の窓を開けていました。すると猫が来ました。猫が来て、ピースケを取って行ってしまいました。\n      \n      私と私のお姉ちゃんは、とっても悲しかったです。悲しくて泣きました。たくさん泣きました。\n      \n      次に私達は、私達家族は、魚を飼いました。小さい魚をたくさん飼いました。\n      \n      それから犬も飼っていました。茶色い犬です。名前はチップといいます。チップという名前の、男の子、オスの犬でした。\n      \n      チップは「わんわん！」とよく吠える犬でした。そして時々、ガブッと家族を噛むこともありました。ある日、私が寝ていました。私が寝ています。\n      \n      するとチップが来ました。チップが来て、ガブッと口を、口をガブッと噛まれました。私の口は腫れてしまいました。とっても痛かったです。\n      \n      今はペットを何も飼っていません。犬も猫も鳥も魚も、何にも飼っていません。\n      \n      私の両親、私のお父さんとお母さんは、犬を飼っています。チップではありません。別の犬です。名前はナナといいます。女の子、メスの犬です。\n      \n      私もまた犬を飼いたいなと思っています。今日は、私が飼っていたペットについてお話しました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　ペットぺっとの　話はなしをします。\n\n      犬いぬや　猫ねこ　鳥とり　魚さかななど　家いえで　飼かう　ペットぺっとについて　話はなします。\n      \n      これは　私わたしです。　有紀ゆきです。\n      \n      ２０２１年にせんにじゅういちねん　今いまです。\n      \n      今いまの　私わたしです。\n      \n      昔むかしです。\n      \n      子供こどもの　時ときの　私わたしです。\n      \n      私わたしは　子供こどもの時とき　カメかめを　飼かっていました。\n      \n      カメかめを　飼かっていました。\n      \n      緑色の　小さい　カメでした。\n      \n      次つぎに　鳥とりを　飼かいました。\n      \n      名前なまえは　ピースケぴーすけです。\n      \n      ピースケぴーすけという　名前なまえです。\n      \n      ピースケぴーすけは　男おとこの子こ　オスおすの　鳥とりでした。\n      \n      ピースケぴーすけは　喋しゃべりました。\n      \n      「おはよー！」と　喋しゃべることが　できました。\n      \n      私わたしは　ピースケぴーすけのことが　大好だいすきでした。\n      \n      でも　ある日ひ。\n      \n      これは　私わたしの　家いえです。\n      \n      窓まどです。\n      \n      家いえの　窓まどを　開あけていました。\n      \n      すると　猫ねこが　来きました。\n      \n      猫ねこが　来きて　ピースケぴーすけを　取とって　行いってしまいました。\n      \n      私わたしと　私わたしの　お姉ねえちゃんは　とっても　悲かなしかったです。\n      \n      悲かなしくて　泣なきました。\n      \n      たくさん　泣なきました。\n      \n      次つぎに　私達わたしたちは　私達わたしたち　家族かぞくは　魚さかなを　飼かいました。\n      \n      小ちいさい　魚さかなを　たくさん　飼かいました。\n      \n      それから　犬いぬも　飼かっていました。\n      \n      茶色ちゃいろい　犬いぬです。\n      \n      名前なまえは　チップちっぷといいます。\n      \n      チップちっぷという　名前なまえの　男おとこの子こ　オスおすの　犬いぬでした。\n      \n      チップちっぷは　「わんわん！」と　よく　吠ほえる　犬いぬでした。\n      \n      そして　時々ときどき　ガブッがぶっと　家族かぞくを　噛かむこともありました。\n      \n      ある日ひ　私わたしが　寝ねていました。\n      \n      私わたしが　寝ねています。\n      \n      すると　チップちっぷが　来きました。\n      \n      チップちっぷが　来きて　ガブッがぶっと　口くちを　口くちを　ガブッがぶっと　噛かまれました。\n      \n      私わたしの　口くちは　腫はれてしまいました。\n      \n      とっても　痛いたかったです。\n      \n      今いまは　ペットぺっとを　何なにも　飼かっていません。\n      \n      犬いぬも　猫ねこも　鳥とりも　魚さかなも　何なんにも　飼かっていません。\n      \n      私わたしの　両親りょうしん　私わたしの　お父とうさんと　お母かあさんは　犬いぬを　飼かっています。\n      \n      チップちっぷではありません。\n      \n      別べつの　犬いぬです。\n      \n      名前なまえは　ナナななといいます。\n      \n      女おんなの子こ　メスめすの　犬いぬです。\n      \n      私わたしも　また　犬いぬを　飼かいたいなと　思おもっています。\n      \n      今日きょうは　私わたしが　飼かっていた　ペットぺっとについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。　\n      \n      またね！"
  },
  {
      title: "好きなもの、嫌いなもの Things I Like and Dislike",
      url: "https://cijapanese.com/things-i-like-and-dislike/",
      level: "complete beginner",
      membership: "free",
      transcript: "今日は私の好きなもの、嫌いなものについてお話します。\n\n      まずは野菜。これは人参です。きゅうりです。じゃがいもです。ナスです。これはトマトです。野菜の中で何が好きですか。\n      \n      私は、野菜の中でトマトが好きです。トマトが一番好きです。週に１、２、３、３回トマトを食べます。人参は好きじゃありません。人参は嫌いです。\n      \n      次に飲み物。コーヒーやビールやお茶やジュース。これはオレンジジュースです。飲み物の中で何が好きですか。\n      \n      私はコーヒーが好きです。コーヒーを毎日飲みます。ビールは好きじゃありません。ビールは嫌いです。苦いので嫌いです。ビールは飲みません。全く飲みません。\n      \n      次に学校の勉強、教科。これは学校です。学校の教科、例えば英語、国語、数学や理科。学校の教科の中で何が好きですか。\n      \n      私は英語が好きです。英語が一番好きです。数学は好きじゃありません。数学は嫌いです。数学は難しいです。私は数学が苦手です。\n      \n      最後に季節。チョウチョやお花がたくさん見られる春、暑い夏、葉っぱの色がオレンジや赤に変わる秋、それから寒い冬。春、夏、秋、冬。季節は４つあります。どの季節が好きですか。\n      \n      私は春が好きです。春が一番好きです。春はぽかぽか暖かいので好きです。冬は好きじゃありません。冬は嫌いです。冬は寒いので嫌いです。\n      \n      今日は私の好きなもの、嫌いなものについてお話しました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　私わたしの　好すきなもの　嫌きらいなものについて　お話はなしします。\n\n      まずは　野菜やさい。\n      \n      これは　人参にんじんです。\n      \n      きゅうりです。\n      \n      じゃがいもです。\n      \n      ナスなすです。\n      \n      これは　トマトとまとです。\n      \n      野菜やさいの　中なかで　何なにが　好すきですか。\n      \n      私わたしは　野菜やさいの　中なかで　トマトとまとが　好すきです。\n      \n      トマトとまとが　一番いちばん　好すきです。\n      \n      週しゅうに　１いち　２に　３さん。\n      \n      ３回さんかい　トマトとまとを　食たべます。\n      \n      人参にんじんは　好すきじゃありません。\n      \n      人参にんじんは　嫌きらいです。\n      \n      次つぎに　飲のみ物もの。\n      \n      コーヒーこーひーや　ビールびーるや　お茶ちゃや　ジュースじゅーす。\n      \n      これは　オレンジジュースおれんじじゅーすです。\n      \n      飲のみ物ものの　中なかで　何なにが　好すきですか。\n      \n      私わたしは　コーヒーこーひーが　好すきです。\n      \n      コーヒーこーひーを　毎日まいにち　飲のみます。\n      \n      ビールびーるは　好すきじゃありません。\n      \n      ビールびーるは　嫌きらいです。\n      \n      苦にがいので　嫌きらいです。\n      \n      ビールびーるは　飲のみません。\n      \n      全まったく　飲のみません。\n      \n      次つぎに　学校がっこうの　勉強べんきょう　教科きょうか。\n      \n      これは　学校がっこうです。\n      \n      学校がっこうの　教科きょうか。\n      \n      例たとえば　英語えいご　国語こくご　数学すうがくや　理科りか。\n      \n      学校がっこうの　教科きょうかの　中なかで　何なにが　好すきですか。\n      \n      私わたしは　英語えいごが　好すきです。\n      \n      英語えいごが　一番いちばん　好すきです。\n      \n      数学すうがくは　好すきじゃありません。\n      \n      数学すうがくは　嫌きらいです。\n      \n      数学すうがくは　難むずかしいです。\n      \n      私わたしは　数学すうがくが　苦手にがてです。\n      \n      最後さいごに　季節きせつ。\n      \n      チョウチョちょうちょや　お花はなが　たくさん　見みられる　春はる。\n      \n      暑あつい　夏なつ。\n      \n      葉はっぱの　色いろが　オレンジおれんじや　赤あかに　変かわる　秋あき。\n      \n      それから　寒さむい　冬ふゆ。\n      \n      春はる　夏なつ　秋あき　冬ふゆ。\n      \n      季節きせつは　４よっつあります。\n      \n      どの　季節きせつが　好すきですか。\n      \n      私わたしは　春はるが　好すきです。　\n      \n      春はるが　一番いちばん　好すきです。\n      \n      春はるは　ぽかぽか　暖あたたかいので　好すきです。\n      \n      冬ふゆは　好すきじゃありません。\n      \n      冬ふゆは　嫌きらいです。\n      \n      冬ふゆは　寒さむいので　嫌きらいです。\n      \n      今日きょうは　私わたしの　好すきなもの　嫌きらいなものについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "図書館でのマナー Library Manners",
      url: "https://cijapanese.com/library-manners/",
      level: "beginner",
      membership: "free",
      transcript: "今日は、図書館でのマナーについてお話します。\n\n      ここは図書館です。本がたくさんあります。本棚に本がたくさん、たくさんあります。ここは本屋さんではありません。お金を払って本を買う場所ではありません。本を借りて返す場所です。\n      \n      図書館でのマナー、図書館でしてはいけないこと、何がありますか。\n      \n      まず１つ目。図書館で携帯を使っていいですか。「もしもし」電話をしていいですか。いいえ、いけません。図書館で電話をしてはいけません。\n      \n      ２つ目。これはハンバーガーです。これはジュースです。図書館で食べていいですか。飲んでいいですか。いいえ、いけません。図書館で食べてはいけません。飲んではいけません。食べたり飲んだりしてはいけません。\n      \n      ３つ目。図書館で走っていいですか。図書館で走っていいですか。いいえ、いけません。図書館で走ってはいけません。図書館ではゆっくり歩きます。\n      \n      ４つ目。図書館で大きな声で、大きな声で話してもいいですか。大きな声で話していいですか。いいえ、いけません。図書館では、しー、静かにします。しー、静かにします。小さな声で話します。\n      \n      これが図書館でのマナーです。\n      \n      私は時々、子どもたちと一緒に、子どもたちと一緒に図書館に行きます。１ヶ月に２回行きます。１回、２回、月に２回図書館に行きます。\n      \n      私は図書館で電話をしません。食べません。飲みません。\n      \n      私の息子は時々、図書館で大きな声を出します。私は言います。「だめ！しー！静かに！」と言います。\n      \n      娘は時々図書館で走ります。私は「だめ！ゆっくり歩いて」と言います。\n      \n      今日は、図書館でのマナーについてお話しました。\n      \n      今日はこれでおしまい。バイバイ！",
      transcript_furigana: "今日きょうは　図書館としょかんでの　マナーまなーについて　お話はなしします。\n\n      ここは　図書館としょかんです。\n      \n      本ほんが　たくさん　あります。\n      \n      本棚ほんだなに　本ほんが　たくさん　たくさん　あります。\n      \n      ここは　本屋ほんやさんでは　ありません。\n      \n      お金かねを　払はらって　本ほんを　買かう　場所ばしょではありません。\n      \n      本ほんを　借かりて　返かえす　場所ばしょです。\n      \n      図書館としょかんでの　マナーまなー、　図書館としょかんで　してはいけないこと、　何なにが　ありますか。\n      \n      まず　１ひとつ目め。\n      \n      図書館としょかんで　携帯けいたいを　使つかって　いいですか。\n      \n      「もしもし」　電話でんわをして　いいですか。\n      \n      いいえ　いけません。\n      \n      図書館としょかんで　電話でんわをしては　いけません。\n      \n      ２ふたつ目め。\n      \n      これは　ハンバーガーはんばーがーです。\n      \n      これは　ジュースじゅーすです。\n      \n      図書館としょかんで　食たべて　いいですか。\n      \n      飲のんで　いいですか。\n      \n      いいえ　いけません。\n      \n      図書館としょかんで　食たべては　いけません。\n      \n      飲のんでは　いけません。\n      \n      食たべたり　飲のんだりしては　いけません。\n      \n      ３みっつ目め。\n      \n      図書館としょかんで　走はしって　いいですか。\n      \n      図書館としょかんで　走はしって　いいですか。\n      \n      いいえ　いけません。\n      \n      図書館としょかんで　走はしっては　いけません。\n      \n      図書館としょかんでは　ゆっくり　歩あるきます。\n      \n      ４よっつ目め。\n      \n      図書館としょかんで　大おおきな　声こえで、　大おおきな　声こえで　話はなしても　いいですか。\n      \n      大おおきな　声こえで　話はなして　いいですか。\n      \n      いいえ　いけません。\n      \n      図書館としょかんでは　しー　静しずかにします。\n      \n      しー　静しずかにします。\n      \n      小ちいさな　声こえで　話はなします。\n      \n      これが　図書館としょかんでの　マナーまなーです。\n      \n      私わたしは　時々ときどき　子こどもたちと　一緒いっしょに、　子こどもたちと　一緒いっしょに　図書館としょかんに　行いきます。\n      \n      １ヶ月いっかげつに　２回にかい　行いきます。\n      \n      １回いっかい　２回にかい。\n      \n      月つきに　２回にかい　図書館としょかんに　行いきます。\n      \n      私わたしは　図書館としょかんで　電話でんわをしません。\n      \n      食たべません。\n      \n      飲のみません。\n      \n      私わたしの　息子むすこは　時々ときどき　図書館としょかんで　大おおきな　声こえを　出だします。\n      \n      私わたしは　言いいます。\n      \n      「だめ！　しー！　静しずかに！」と　言いいます。\n      \n      娘むすめは　時々ときどき　図書館としょかんで　走はしります。\n      \n      私わたしは　「だめ！　ゆっくり　歩あるいて」と　言いいます。\n      \n      今日きょうは　図書館としょかんでの　マナーまなーについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      バイバイばいばい！"
  },
  {
      title: "金の斧 銀の斧 Mercury and the Woodman",
      url: "https://cijapanese.com/mercury-and-the-woodman/",
      level: "beginner",
      membership: "free",
      transcript: "「金の斧　銀の斧」のお話です。\n\n      男の人がいます。この人は木こりです。木を斧で切る仕事をしています。\n      \n      木こりが木を切っていました。川があります。木こりは斧を川に落としてしまいました。木こりは悲しいです。「どうしよう。」\n      \n      すると川から神様が出てきました。神様が出てきました。神様が木こりに聞きます。\n      \n      「あなたが落としたのは金の斧ですか。あなたが落としたのはこの金の斧ですか。」木こりが言います。「いいえ、違います。金の斧ではありません。」\n      \n      神様がまた聞きます。「あなたが落としたのはこの銀の斧ですか。あなたが落としたのはこの銀の斧ですか。」木こりが言います。「いいえ、違います。銀の斧ではありません。」\n      \n      神様が聞きます。「あなたが落としたのは鉄の斧ですか」木こりは言います。「はい、そうです。」\n      \n      木こりはとっても正直です。神様は、木こりに３つ全部あげました。\n      \n      別の木こりです。別の木こりがその話を聞きました。この木こりは悪い木こりです。その木こりも思います。自分も金と銀の斧が欲しい！\n      \n      その木こりも川に行きます。そして自分の斧をわざと、ぽいっ、川にぽいっと投げました。\n      \n      神様が出てきました。神様が聞きます。「あなたが落としたのはこの金の斧ですか？」木こりが言います。「はい、そうです。」\n      \n      木こりは嘘をつきました。神様は怒ります。「嘘をついてはいけません。だめです。」神様は、この木こりには斧を一つもあげませんでした。\n      \n      正直な木こりと嘘つきの木こりのお話でした。\n      \n      おしまい。またね！",
      transcript_furigana: "「金きんの斧おの　銀ぎんの斧おの」の　お話はなしです。\n\n      男おとこの人ひとが　います。\n      \n      この人ひとは　木きこりです。\n      \n      木きを　斧おので　切きる　仕事しごとをしています。\n      \n      木きこりが　木きを　切きっていました。\n      \n      川かわが　あります。\n      \n      木きこりは　斧おのを　川かわに　落おとしてしまいました。\n      \n      木きこりは　悲かなしいです。\n      \n      「どうしよう…」\n      \n      すると　川かわから　神様かみさまが　出でてきました。\n      \n      神様かみさまが　出でてきました。\n      \n      神様かみさまが　木きこりに　聞ききます。\n      \n      「あなたが　落おとしたのは　金きんの　斧おのですか。\n      \n      あなたが　落おとしたのは　この　金きんの　斧おのですか。」\n      \n      木きこりが　言いいます。\n      \n      「いいえ　違ちがいます。\n      \n      金きんの　斧おのではありません。」\n      \n      神様かみさまが　また　聞ききます。\n      \n      「あなたが　落おとしたのは　この　銀ぎんの　斧おのですか。\n      \n      あなたが　落おとしたのは　この　銀ぎんの　斧おのですか。」\n      \n      木きこりが　言いいます。\n      \n      「いいえ　違ちがいます。\n      \n      銀ぎんの　斧おのではありません。」\n      \n      神様かみさまが　聞ききます。」\n      \n      「あなたが　落おとしたのは　鉄てつの　斧おのですか。」\n      \n      木きこりは　言いいます。\n      \n      「はい　そうです。」\n      \n      木きこりは　とっても　正直しょうじきです。\n      \n      神様かみさまは　木きこりに　３みっつ　全部ぜんぶ　あげました。\n      \n      別べつの　木きこりです。\n      \n      別べつの　木きこりが　その話はなしを　聞ききました。\n      \n      この　木きこりは　悪わるい　木きこりです。\n      \n      その　木きこりも　思おもいます。\n      \n      自分じぶんも　金きんと　銀ぎんの　斧おのが　欲ほしい。\n      \n      その　木きこりも　川かわに　行いきます。\n      \n      そして　自分じぶんの　斧おのを　わざと　ぽいっ、　川かわに　ぽいっと　投なげました。\n      \n      神様かみさまが　出でてきました。\n      \n      神様かみさまが　聞ききます。\n      \n      「あなたが　落おとしたのは　この　金きんの　斧おのですか。」\n      \n      木きこりが　言いいます。\n      \n      「はい　そうです。」\n      \n      木きこりは　嘘うそを　つきました。\n      \n      神様かみさまは　怒おこります。\n      \n      「嘘うそを　ついては　いけません。\n      \n      だめです。」\n      \n      神様かみさまは　この　木きこりには　斧おのを　一ひとつも　あげませんでした。\n      \n      正直しょうじきな　木きこりと　嘘うそつきの　木きこりの　お話はなしでした。\n      \n      おしまい。\n      \n      またね！"
  },
  {
      title: "形 Shapes",
      url: "https://cijapanese.com/shapes/",
      level: "complete beginner",
      membership: "free",
      transcript: "今日は、色々な形の話をします。\n\n      形。例えばこれは丸です。これは三角です。１、２、３。角が３あるので三角といいます。これは四角です。角が１、２、３、４で四角です。これは長四角です。長い四角なので長四角といいます。これはひし形です。\n      \n      丸、三角、四角、長四角、ひし形。この五つの形を使って絵を描きます。\n      \n      まず、長四角を描きます。大きな長四角です。大きな長四角が１、２、３。三つあります。\n      \n      水色のペンで、長四角の中に小さな四角を描きます。小さな四角が三つ、三つ、三つ。三つずつ、全部で９個、九つあります。\n      \n      上にひし形を描きます。一つ、一つ、一つ。一つずつ、全部で三つあります。\n      \n      下に丸を描きます。１、２、３。１、２、３。１、２、３。三つ、三つ、三つ。三つずつ、全部で九つあります。\n      \n      これは何ですか。これは電車です。がたんごとん。がたんごとん。電車が走っています。\n      \n      黄色のペンで丸を描きます。丸。周りに小さな三角を描きます。小さな三角をたくさん描きます。これは何ですか。これは太陽です。お日様です。今日は晴れです。\n      \n      茶色のペンで長四角を描きます。緑のペンで丸を描きます。木です。赤いペンで小さな丸を描きます。りんごです。木にりんごがなっています。\n      \n      青いペンで三角を描きます。チョウチョです。チョウチョが２匹います。\n      \n      今日は、丸、三角、四角、長四角、ひし形。色んな形を使って絵を描きました。\n      \n      今日は　これで　おしまい。またね！",
      transcript_furigana: "今日きょうは　色々いろいろな　形かたちの　話はなしをします。\n\n      形かたち。\n      \n      例たとえば　これは　丸まるです。\n      \n      これは　三角さんかくです。\n      \n      １いち　２に　３さん\n      \n      角かどが　３さん　あるので　三角さんかくと　いいます。\n      \n      これは　四角しかくです。\n      \n      角かどが　１いち　２に　３さん　４し　で　四角しかくです。\n      \n      これは　長四角ながしかくです。\n      \n      長ながい　四角しかく　なので　長四角ながしかくと　いいます。\n      \n      これは　ひし形がたです。\n      \n      丸まる　三角さんかく　四角しかく　長四角ながしかく　ひし形がた。\n      \n      この　五いつつの　形かたちを　使つかって　絵えを　描かきます。\n      \n      まず　長四角ながしかくを　描かきます。\n      \n      大おおきな　長四角ながしかくです。\n      \n      大おおきな　長四角ながしかくが　１いち　２に　３さん、　三みっつ　あります。\n      \n      水色みずいろの　ペンぺんで　長四角ながしかくの　中なかに　小ちいさな　四角しかくを　描かきます。\n      \n      小ちいさな　四角しかくが　三みっつ　三みっつ　三みっつ。\n      \n      三みっつずつ、　全部ぜんぶで　９個きゅうこ、　九ここのつ　あります。\n      \n      上うえに　ひし形がたを　描かきます。\n      \n      一ひとつ　一ひとつ　一ひとつ。\n      \n      一ひとつずつ、　全部ぜんぶで　三みっつ　あります。\n      \n      下したに　丸まるを　描かきます。\n      \n      １いち　２に　３さん、　１いち　２に　３さん、　１いち　２に　３さん。\n      \n      三みっつ　三みっつ　三みっつ。\n      \n      三みっつずつ、　全部ぜんぶで　九ここのつ　あります。\n      \n      これは　何なんですか。\n      \n      これは　電車でんしゃです。\n      \n      がたん　ごとん、　がたん　ごとん。\n      \n      電車でんしゃが　走はしっています。\n      \n      黄色きいろの　ペンぺんで　丸まるを　描かきます。\n      \n      丸まる。\n      \n      周まわりに　小ちいさな　三角さんかくを　描かきます。\n      \n      小ちいさな　三角さんかくを　たくさん　描かきます。\n      \n      これは　何なんですか。\n      \n      これは　太陽たいようです。\n      \n      お日様ひさまです。\n      \n      今日きょうは　晴はれです。\n      \n      茶色ちゃいろの　ペンぺんで　長四角ながしかくを　描かきます。\n      \n      緑みどりの　ペンぺんで　丸まるを　描かきます。\n      \n      木きです。\n      \n      赤あかい　ペンぺんで　小ちいさな　丸まるを　描かきます。\n      \n      りんごです。\n      \n      木きに　りんごが　なっています。\n      \n      青あおい　ペンぺんで　三角さんかくを　描かきます。\n      \n      チョウチョちょうちょです。\n      \n      チョウチョちょうちょが　２匹にひき　います。\n      \n      今日きょうは　丸まる　三角さんかく　四角しかく　長四角ながしかく　ひし形がた。\n      \n      色いろんな　形かたちを　使つかって　絵えを　描かきました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "家事 Housework",
      url: "https://cijapanese.com/housework/",
      level: "beginner",
      membership: "free",
      transcript: "こんにちは。今日は家事について話します。\n\n      家でする家事。例えば料理、掃除、洗濯。家事です。\n      \n      家事は好きですか。私は料理があまり好きじゃありません。掃除も好きじゃありません。洗濯も好きじゃありません。家事は好きじゃありません。嫌です。\n      \n      でも毎日します。しなければいけません。\n      \n      これは私です。これは私の夫です。私と夫は一緒に家事をします。協力して家事をします。\n      \n      料理は私がします。私が毎日します。夫は料理はしません。全くしません。夫は食べた後、お皿洗いをします。お皿をゴシゴシ、洗います。\n      \n      掃除は交代でします。私、夫、私…交代でします。\n      \n      洗濯も交代でします。私、夫、私、夫…交代交代します。これは洗濯機です。私達は夜、洗濯をします。夜洗濯をして、次の日の朝、服をたたみます。\n      \n      これはスーパーマーケット、スーパーです。色々な食べ物を買う場所です。買い物は私がします。週に３回買い物に行きます。\n      \n      今日は、私達の家の家事についてお話しました。\n      \n      今日はこれでおしまい。またね。",
      transcript_furigana: "こんにちは。\n\n      今日きょうは　家事かじについて　話はなします。\n      \n      家いえでする　家事かじ。\n      \n      例たとえば　料理りょうり　掃除そうじ　洗濯せんたく。\n      \n      家事かじです。\n      \n      家事かじは　好すきですか。\n      \n      私わたしは　料理りょうりが　あまり　好すきじゃありません。\n      \n      掃除そうじも　好すきじゃありません。\n      \n      洗濯せんたくも　好すきじゃありません。\n      \n      家事かじは　好すきじゃありません。\n      \n      嫌いやです。\n      \n      でも　毎日まいにちします。\n      \n      しなければ　いけません。\n      \n      これは　私わたしです。\n      \n      これは　私わたしの　夫おっとです。\n      \n      私わたしと　夫おっとは　一緒いっしょに　家事かじをします。\n      \n      協力きょうりょくして　家事かじをします。\n      \n      料理りょうりは　私わたしがします。\n      \n      私わたしが　毎日まいにちします。\n      \n      夫おっとは　料理りょうりはしません。\n      \n      全まったくしません。\n      \n      夫おっとは　食たべた後あと　お皿洗さらあらいをします。\n      \n      お皿さらを　ゴシゴシごしごし　洗あらいます。\n      \n      掃除そうじは　交代こうたいでします。\n      \n      私わたし　夫おっと　私わたし…　交代こうたいでします。\n      \n      洗濯せんたくも　交代こうたいでします。\n      \n      私わたし　夫おっと　私わたし　夫おっと…　交代交代こうたいごうたいします。\n      \n      これは　洗濯機せんたくきです。\n      \n      私達わたしたちは　夜よる　洗濯せんたくをします。\n      \n      夜よる　洗濯せんたくをして　次つぎの日ひの　朝あさ　服ふくを　たたみます。\n      \n      これは　スーパーマーケットすーぱーまーけっと　スーパーすーぱーです。\n      \n      色々いろいろな　食たべ物ものを　買かう場所ばしょです。\n      \n      買かい物ものは　私わたしがします。\n      \n      週しゅうに　３回さんかい　買かい物ものに　行いきます。\n      \n      今日きょうは　私達わたしたちの　家いえの　家事かじについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "赤ずきん Little Red Riding Hood",
      url: "https://cijapanese.com/little-red-riding-hood/",
      level: "beginner",
      membership: "free",
      transcript: "今日は「赤ずきん」の話をします。\n\n      女の子がいます。男の子ではありません。女の子がいます。女の子は、赤い頭巾をかぶっています。赤ずきんといいます。\n      \n      これは赤ずきんちゃんのお母さんです。これは赤ずきんちゃんのおばあちゃんです。\n      \n      お母さんが言います。「おばあちゃんが病気です。おばあちゃんが病気です。おばあちゃんが病気で寝ています。おばあちゃんの家にお見舞いに行って。」\n      \n      「はーい！行ってきまーす！」赤ずきんちゃんは出かけます。\n      \n      赤ずきんちゃんは、森の中を歩いています。するとオオカミに会いました。\n      \n      オオカミが聞きます。「赤ずきんちゃん、どこに行くの？」\n      \n      赤ずきんちゃんが言います。「おばあちゃんの家に行きます。おばあちゃんが病気です。」\n      \n      するとオオカミが言います。「あそこに花があるよ。花がたくさんあるよ。花を摘んで持っていってあげたら？」\n      \n      赤ずきんちゃんが言います。「ありがとう！オオカミさん！」赤ずきんちゃんは、お花畑に行って花を摘みます。\n      \n      その間に、オオカミはおばあちゃんの家に行きます。そしてオオカミは、おばあちゃんをガブッ、食べてしまいました。\n      \n      オオカミがおばあちゃんのベッドに寝ています。赤ずきんちゃんが来ました。\n      \n      「おばあちゃん、どうして耳が大きいの？」「お前の声を聞くためだよ。」\n      \n      「おばあちゃん、どうして目が大きいの？」「お前をよーく見るためだよ。」\n      \n      「おばあちゃん、どうして口が大きいの？」「お前を食べるためだ！」オオカミは、赤ずきんちゃんもガブッ、食べてしまいました。\n      \n      オオカミはお腹いっぱいです。ぐーぐー寝ています。そこへ男の人が来ました。何か聞こえます。「助けて！助けて！」と聞こえます。\n      \n      男の人は、オオカミのお腹を切ります。ハサミでちょきちょき切りました。オオカミのお腹の中から、赤ずきんちゃんとおばあちゃんが出てきました。二人は助かりました。\n      \n      おしまい。",
      transcript_furigana: "今日きょうは　「赤あかずきん」の　話はなしをします。\n\n      女おんなの子こが　います。\n      \n      男おとこの子こではありません。\n      \n      女おんなの子こが　います。\n      \n      女おんなの子こは　赤あかい　頭巾ずきんを　かぶっています。\n      \n      赤あかずきんと　いいます。\n      \n      これは　赤あかずきんちゃんの　お母かあさんです。\n      \n      これは　赤あかずきんちゃんの　おばあちゃんです。\n      \n      お母かあさんが　言いいます。\n      \n      「おばあちゃんが　病気びょうきです。\n      \n      おばあちゃんが　病気びょうきです。\n      \n      おばあちゃんが　病気びょうきで　寝ねています。\n      \n      おばあちゃんの　家いえに　お見舞みまいに　行いって。」\n      \n      「はーい　行いってきまーす！」\n      \n      赤あかずきんちゃんは　出でかけます。\n      \n      赤あかずきんちゃんは　森もりの　中なかを　歩あるいています。\n      \n      すると　オオカミおおかみに　会あいました。\n      \n      オオカミおおかみが　聞ききます。\n      \n      「赤あかずきんちゃん　どこに　行いくの。」\n      \n      赤あかずきんちゃんが　言いいます。\n      \n      「おばあちゃんの　家いえに　行いきます。\n      \n      おばあちゃんが　病気びょうきです。」\n      \n      すると　オオカミおおかみが　言いいます。\n      \n      「あそこに　花はなが　あるよ。\n      \n      花はなが　たくさん　あるよ。\n      \n      花はなを　摘つんで　持もっていってあげたら。」\n      \n      赤あかずきんちゃんが　言いいます。\n      \n      「ありがとう　オオカミおおかみさん。」\n      \n      赤あかずきんちゃんは　お花畑はなばたけに　行いって　花はなを　摘つみます。\n      \n      その間あいだに　オオカミおおかみは　おばあちゃんの　家いえに　行いきます。\n      \n      そして　オオカミおおかみは　おばあちゃんを　ガブッがぶっ　食たべてしまいました。\n      \n      オオカミおおかみが　おばあちゃんの　ベッドべっどに　寝ねています。\n      \n      赤あかずきんちゃんが　来きました。\n      \n      「おばあちゃん　どうして　耳みみが　大おおきいの。」\n      \n      「お前まえの　声こえを　聞きくためだよ。」\n      \n      「おばあちゃん　どうして　目めが　大おおきいの。」\n      \n      「お前まえを　よーく　見みるためだよ。」\n      \n      「おばあちゃん　どうして　口くちが　大おおきいの。」\n      \n      「お前まえを　食たべるためだ。」\n      \n      オオカミおおかみは　赤あかずきんちゃんも　ガブッがぶっ　食たべてしまいました。\n      \n      オオカミおおかみは　お腹なかいっぱいです。\n      \n      ぐーぐー　寝ねています。\n      \n      そこへ　男おとこの人ひとが　来きました。\n      \n      何なにか　聞きこえます。\n      \n      「助たすけて　助たすけて。」と　聞きこえます。\n      \n      男おとこの人ひとは　オオカミおおかみの　お腹なかを　切きります。\n      \n      ハサミはさみで　ちょきちょき　切きりました。\n      \n      オオカミおおかみの　お腹なかの　中なかから　赤あかずきんちゃんと　おばあちゃんが　出でてきました。\n      \n      二人ふたりは　助たすかりました。\n      \n      おしまい。"
  },
  {
      title: "カレーライス Curry and Rice",
      url: "https://cijapanese.com/curry-and-rice/",
      level: "beginner",
      membership: "free",
      transcript: "この料理は、カレーライスといいます。今日はカレーを作りましょう。\n\n      カレーの中には何が入っていますか。にんじんとじゃがいもと玉ねぎが入っています。\n      \n      それから肉も入っています。肉は、牛肉でも豚肉でも鶏肉でも、どれでもOKです。どれでもいいです。今日は牛肉を使いましょう。\n      \n      あとは水。それからカレールーが入っています。\n      \n      冷蔵庫があります。冷蔵庫を開けます。開きます。冷蔵庫の中には、にんじんと水とお肉が入っています。\n      \n      にんじんはあります。お肉もあります。水もあります。にんじんと肉と水はあるので、買わなくていいです。\n      \n      じゃがいもと玉ねぎとカレールーは、ありません。じゃがいもと玉ねぎとカレールーはないので、買わなくてはいけません。\n      \n      買い物に行きます。じゃがいもと玉ねぎとカレールーを買います。家に帰ります。買い物をして家に帰ります。\n      \n      まず水で野菜を洗います。ゴシゴシ、野菜を洗います。\n      \n      それから次に、野菜と肉を切ります。これは包丁です。包丁で、野菜と肉を小さく切ります。\n      \n      これは鍋です。鍋があります。鍋を火にかけます。鍋に油を入れます。野菜と肉を入れます。野菜と肉を入れて炒めます。\n      \n      水を入れます。水を入れてぐつぐつ煮込みます。それからカレールーを入れます。またぐつぐつ煮込みます。\n      \n      できあがり！カレーができました。火を消します。\n      \n      お皿です。器です。ご飯を盛り付けます。ご飯をお皿にのせます。ご飯にカレーをかけます。\n      \n      スプーンで食べます。もぐもぐもぐ。おいしい！ごちそうさまでした！\n      \n      今日はこれでおしまい。\n      \n      またね！",
      transcript_furigana: "この　料理りょうりは　カレーライスかれーらいすといいます。\n\n      今日きょうは　カレーかれーを　作つくりましょう。\n      \n      カレーかれーの　中なかには　何なにが　入はいっていますか。\n      \n      にんじんと　じゃがいもと　玉たまねぎが　入はいっています。\n      \n      それから　肉にくも　入はいっています。\n      \n      肉にくは　牛肉ぎゅうにくでも　豚肉ぶたにくでも　鶏肉とりにくでも　どれでも　OKおっけいです。\n      \n      どれでも　いいです。\n      \n      今日きょうは　牛肉ぎゅうにくを　使つかいましょう。\n      \n      あとは　水みず。\n      \n      それから　カレールーかれーるーが　入はいっています。\n      \n      冷蔵庫れいぞうこが　あります。\n      \n      冷蔵庫れいぞうこを　開あけます。\n      \n      開ひらきます。\n      \n      冷蔵庫れいぞうこの　中なかには　にんじんと　水みずと　お肉にくが　入はいっています。\n      \n      にんじんは　あります。\n      \n      お肉にくも　あります。\n      \n      水みずも　あります。\n      \n      にんじんと　肉にくと　水みずは　あるので　買かわなくて　いいです。\n      \n      じゃがいもと　玉たまねぎと　カレールーかれーるーは　ありません。\n      \n      じゃがいもと　玉たまねぎと　カレールーかれーるーは　ないので　買かわなくては　いけません。\n      \n      買かい物ものに　行いきます。\n      \n      じゃがいもと　玉たまねぎと　カレールーかれーるーを　買かいます。\n      \n      家いえに　帰かえります。\n      \n      買かい物ものをして　家いえに　帰かえります。\n      \n      まず　水みずで　野菜やさいを　洗あらいます。\n      \n      ゴシゴシごしごし　野菜やさいを　洗あらいます。\n      \n      それから　次つぎに　野菜やさいと　肉にくを　切きります。\n      \n      これは　包丁ほうちょうです。\n      \n      包丁ほうちょうで　野菜やさいと　肉にくを　小ちいさく　切きります。\n      \n      これは　鍋なべです。\n      \n      鍋なべが　あります。\n      \n      鍋なべを　火ひに　かけます。\n      \n      鍋なべに　油あぶらを　入いれます。\n      \n      野菜やさいと　肉にくを　入いれます。\n      \n      野菜やさいと　肉にくを　入いれて　炒いためます。\n      \n      水みずを　入いれます。\n      \n      水みずを　入いれて　ぐつぐつ　煮込にこみます。\n      \n      それから　カレールーかれーるーを　入いれます。\n      \n      また　ぐつぐつ　煮込にこみます。\n      \n      できあがり。\n      \n      カレーかれーが　できました。\n      \n      火ひを　消けします。\n      \n      お皿さらです。\n      \n      器うつわです。\n      \n      ご飯はんを　盛もり付つけます。\n      \n      ご飯はんを　お皿さらに　のせます。\n      \n      ご飯はんに　カレーかれーを　かけます。\n      \n      スプーンすぷーんで　食たべます。\n      \n      もぐもぐもぐ。\n      \n      おいしい。\n      \n      ごちそうさまでした。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "住んだことのある場所 Places I’ve Lived",
      url: "https://cijapanese.com/places-ive-lived/",
      level: "beginner",
      membership: "free",
      transcript: "今日は、私が住んだことのある場所についてお話します。\n\n      これは地図です。日本の地図、日本地図です。\n      \n      ここは北海道です。ここは東京です。ここは大阪です。日本には１、２、３、４、５、６…と全部で４７の都道府県があります。\n      \n      ４７の都道府県の中で、私は４つの県に住んだことがあります。\n      \n      ここは大分県です。私は大分県で生まれました。これは０歳、赤ちゃんの時の私です。大分県で生まれました。\n      \n      それから４歳まで４年間、福岡県に住んでいました。\n      \n      ４歳の時に静岡県に引っ越しました。４歳から１２歳まで８年間、静岡県に住んでいました。これは学校です。小学校、中学校、高校、大学。私は小学校を卒業するまで静岡県に住んでいました。\n      \n      そしてまた、福岡県に引っ越しました。静岡県に行って、福岡県に戻りました。１２歳から２２歳まで１０年間、福岡県に住んでいました。中学校、高校、大学を卒業するまで、１０年間福岡県に住んでいました。\n      \n      途中、２０歳、はたちの時に、オーストラリアに留学しました。２００６年の２月から２００６年の１２月まで１０ヶ月間、オーストラリアのタスマニアに住んでいました。\n      \n      大学を卒業してから、群馬県に引っ越しました。２２歳から２４歳まで　２年間、群馬県に住んでいました。\n      \n      そして山口県に引っ越しました。２４歳から２６歳まで２年間、山口県に住んでいました。\n      \n      ２６歳の時に、結婚しました。２６歳の時に結婚して、また福岡県に引っ越しました。それから今までずっと、８年間福岡県に住んでいます。\n      \n      １、２、３、４。４７都道府県のうち、４つの県に住んだことがあります。\n      \n      今日は、私が住んだことのある場所についてお話しました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　私わたしが　住すんだことのある　場所ばしょについて　お話はなしします。\n\n      これは　地図ちずです。\n      \n      日本にほんの　地図ちず、日本地図にほんちずです。\n      \n      ここは　北海道ほっかいどうです。\n      \n      ここは　東京とうきょうです。\n      \n      ここは　大阪おおさかです。\n      \n      日本にほんには　１いち　２に　３さん　４し　５ご　６ろく…と、\n      \n      全部ぜんぶで　４７よんじゅうななの　都道府県とどうふけんが　あります。\n      \n      ４７よんじゅうななの　都道府県とどうふけんの　中なかで　私わたしは　４よっつの　県けんに　住すんだことが　あります。\n      \n      ここは　大分県おおいたけんです。\n      \n      私わたしは　大分県おおいたけんで　生うまれました。\n      \n      これは　０歳ぜろさん、赤あかちゃんの時ときの　私わたしです。\n      \n      大分県おおいたけんで　生うまれました。\n      \n      それから　４歳よんさいまで　４年間よんねんかん　福岡県ふくおかけんに　住すんでいました。\n      \n      ４歳よんさいの時ときに　静岡県しずおかけんに　引ひっ越こしました。\n      \n      ４歳よんさいから　１２歳じゅうにさいまで　８年間はちねんかん　静岡県しずおかけんに　住すんでいました。\n      \n      これは　学校がっこうです。\n      \n      小学校しょうがっこう　中学校ちゅうがっこう　高校こうこう　大学だいがく。\n      \n      私わたしは　小学校しょうがっこうを　卒業そつぎょうするまで　静岡県しずおかけんに　住すんでいました。\n      \n      そして　また　福岡県ふくおかけんに　引ひっ越こしました。\n      \n      静岡県しずおかけんに　行って　福岡県ふくおかけんに　戻もどりました。\n      \n      １２歳じゅうにさいから　２２歳にじゅうにさいまで　１０年間じゅうねんかん　福岡県ふくおかけんに　住すんでいました。\n      \n      中学校ちゅうがっこう　高校こうこう　大学だいがくを　卒業そつぎょうするまで　１０年間じゅうねんかん　福岡県ふくおかけんに　住すんでいました。\n      \n      途中とちゅう　２０歳にじゅっさい、はたちの時ときに　オーストラリアおーすとらりあに　留学りゅうがくしました。\n      \n      ２００６年にせんろくねんの　２月にがつから　２００６年にせんろくねんの　１２月じゅうにがつまで　１０ヶ月間じゅっかげつかん　オーストラリアおーすとらりあの　タスマニアたすまにあに　住すんでいました。\n      \n      大学だいがくを　卒業そつぎょうしてから　群馬県ぐんまけんに　引ひっ越こしました。\n      \n      ２２歳にじゅうにさいから　２４歳にじゅうよんさいまで　２年間にねんかん　群馬県ぐんまけんに　住すんでいました。\n      \n      そして　山口県やまぐちけんに　引ひっ越こしました。\n      \n      ２４歳にじゅうよんさいから　２６歳にじゅうろくさいまで　２年間にねんかん　山口県やまぐちけんに　住すんでいました。\n      \n      ２６歳にじゅうろくさいの時ときに　結婚けっこんしました。\n      \n      ２６歳にじゅうろくさいの時ときに　結婚けっこんして　また　福岡県ふくおかけんに　引ひっ越こしました。\n      \n      それから　今いままで　ずっと　８年間はちねんかん　福岡県ふくおかけんに　住すんでいます。\n      \n      １いち　２に　３さん　４し。\n      \n      ４７よんじゅうなな都道府県とどうふけんのうち　４よっつの　県けんに　住すんだことがあります。\n      \n      今日きょうは　私わたしが　住すんだことのある場所ばしょ　について　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "お風呂 Bathtime",
      url: "https://cijapanese.com/bathtime/",
      level: "beginner",
      membership: "free",
      transcript: "今日はお風呂についてお話します。\n\n      皆さんはお風呂に入りますか。それともシャワーを浴びますか。\n      \n      これは私です。私はいつもお風呂に入ります。毎日夜、毎晩お風呂に入ります。\n      \n      日本では多くの人、沢山の人が、お風呂に入ります。シャワーではなくお風呂に入ります。\n      \n      お風呂に入ります。まず服を脱ぎます。ズボンを脱ぎます。Tシャツを脱ぎます。靴下を脱ぎます。\n      \n      髪の毛を洗います。これはシャンプーです。シャンプーで髪の毛を洗います。ゴシゴシ、ゴシゴシ。お湯です。お湯で流します。\n      \n      顔を洗います。これは石鹸です。石鹸で顔を洗います。ゴシゴシ。お湯で流します。\n      \n      体を洗います。ボディーソープで体を洗います。腕、足、お腹、ゴシゴシ。お湯で流します。\n      \n      湯船に入ります。あー気持ちいい。お風呂は温かくて気持ちがいいです。ゆっくり温まったら、湯船から出ます。\n      \n      体を拭きます。これはタオルです。タオルで体を拭きます。パジャマです。パジャマを着ます。\n      \n      髪の毛が濡れています。髪の毛を乾かしましょう。これはドライヤーです。ドライヤーで髪の毛を乾かしましょう。\n      \n      おしまい。またね。",
      transcript_furigana: "今日きょうは　お風呂ふろについて　お話はなしします。\n\n      皆みなさんは　お風呂ふろに　入りますか。\n      \n      それとも　シャワーしゃわーを　浴あびますか。\n      \n      これは　私わたしです。\n      \n      私わたしは　いつも　お風呂ふろに　入はいります。\n      \n      毎日まいにち　夜よる、　毎晩まいばん　お風呂ふろに　入はいります。\n      \n      日本にほんでは　多おおくの人ひと　沢山たくさんの人ひとが　お風呂ふろに　入はいります。\n      \n      シャワーしゃわーではなく　お風呂ふろに　入はいります。\n      \n      お風呂ふろに　入はいります。\n      \n      まず　服ふくを　脱ぬぎます。\n      \n      ズボンずぼんを　脱ぬぎます。\n      \n      Tシャツてぃーしゃつを　脱ぬぎます。\n      \n      靴下くつしたを　脱ぬぎます。\n      \n      髪かみの毛けを　洗あらいます。\n      \n      これは　シャンプーしゃんぷーです。\n      \n      シャンプーしゃんぷーで　髪かみの毛けを　洗あらいます。\n      \n      ゴシゴシごしごし　ゴシゴシごしごし。\n      \n      お湯ゆです。\n      \n      お湯ゆで　流ながします。\n      \n      顔かおを　洗あらいます。\n      \n      これは　石鹸せっけんです。\n      \n      石鹸せっけんで　顔かおを　洗あらいます。\n      \n      ゴシゴシごしごし。\n      \n      お湯ゆで　流ながします。\n      \n      体からだを　洗あらいます。\n      \n      ボディーソープぼでぃーそーぷで　体からだを　洗あらいます。\n      \n      腕うで　足あし　お腹なか　ゴシゴシごしごし。\n      \n      お湯ゆで　流ながします。\n      \n      湯船ゆぶねに　入はいります。\n      \n      あー　気持きもちいい。\n      \n      お風呂ふろは　温あたたかくて　気持きもちが　いいです。\n      \n      ゆっくり　温あたたまったら　湯船ゆぶねから　出でます。\n      \n      体からだを　拭ふきます。\n      \n      これは　タオルたおるです。\n      \n      タオルたおるで　体からだを　拭ふきます。\n      \n      パジャマぱじゃまです。\n      \n      パジャマぱじゃまを　着きます。\n      \n      髪かみの毛けが　濡ぬれています。\n      \n      髪かみの毛けを　乾かわかしましょう。\n      \n      これは　ドライヤーどらいやーです。\n      \n      ドライヤーどらいやーで　髪かみの毛けを　乾かわかしましょう。\n      \n      おしまい。　\n      \n      またね！"
  },
  {
      title: "私の家 My House",
      url: "https://cijapanese.com/my-house/",
      level: "beginner",
      membership: "free",
      transcript: "今日は私の家を紹介します。\n\n      これは私の家です。私の家は四角い家です。１階、２階。２階建ての家です。家族四人で住んでいます。\n      \n      ここは玄関です。玄関を入ります。\n      \n      ここは１階です。１階にはお風呂があります。トイレもあります。\n      \n      台所、キッチンもあります。ここで私は料理をします。ここは私が料理をする場所です。\n      \n      テーブルがあります。ここでご飯を食べます。食事をします。みんなで食事をする場所です。\n      \n      ソファーがあります。ここでテレビを見ます。ここは座ってテレビを見る場所です。\n      \n      階段を登ります。ここは２階です。２階には、１、２、３、三つ部屋があります。\n      \n      この部屋には布団があります。ここは寝室です。寝る部屋です。ここでみんなで寝ます。\n      \n      この部屋には机があります。大きな机があります。パソコンもあります。ここで夫が仕事をします。ここは夫が仕事をする部屋です。\n      \n      この部屋にはおもちゃがあります。おもちゃがたくさんあります。子どもたちがここで遊びます。ここは子どもたちが遊ぶ部屋です。\n      \n      家の外には駐車場があります。車を停める場所です。\n      \n      これは庭です。私たちの家には、庭はありません。\n      \n      ここは公園です。私たちの家には庭がないので、子どもたちは近くの公園に行って遊びます。\n      \n      今日は私の家を紹介しました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　私わたしの　家いえを　紹介しょうかいします。\n\n      これは　私わたしの　家いえです。\n      \n      私わたしの　家いえは　四角しかくい　家いえです。\n      \n      １階いっかい　２階にかい、　２階建にかいだての　家いえです。\n      \n      家族かぞく　四人よにんで　住すんでいます。\n      \n      ここは　玄関げんかんです。\n      \n      玄関げんかんを　入はいります。\n      \n      ここは　１階いっかいです。\n      \n      １階いっかいには　お風呂ふろが　あります。\n      \n      トイレといれも　あります。\n      \n      台所だいどころ、　キッチンきっちんも　あります。\n      \n      ここで　私わたしは　料理りょうりをします。\n      \n      ここは　私わたしが　料理りょうりをする場所ばしょです。\n      \n      テーブルてーぶるが　あります。\n      \n      ここで　ご飯はんを食たべます。\n      \n      食事しょくじをします。\n      \n      みんなで　食事しょくじをする場所ばしょです。\n      \n      ソファーそふぁーが　あります。\n      \n      ここで　テレビてれびを　見みます。\n      \n      ここは　座すわって　テレビてれびを　見みる場所ばしょです。\n      \n      階段かいだんを　登のぼります。\n      \n      ここは　２階にかいです。\n      \n      ２階にかいには　１いち　２に　３さん　三みっつ　部屋へやが　あります。\n      \n      この部屋へやには　布団ふとんが　あります。\n      \n      ここは　寝室しんしつです。\n      \n      寝ねる　部屋へやです。\n      \n      ここで　みんなで　寝ねます。\n      \n      この部屋へやには　机つくえが　あります。\n      \n      大おおきな　机つくえが　あります。\n      \n      パソコンぱそこんも　あります。\n      \n      ここで　夫おっとが　仕事しごとをします。\n      \n      ここは　夫おっとが　仕事しごとをする部屋へやです。\n      \n      この部屋へやには　おもちゃが　あります。\n      \n      おもちゃが　たくさん　あります。\n      \n      子こどもたちが　ここで　遊あそびます。\n      \n      ここは　子こどもたちが　遊あそぶ部屋へやです。\n      \n      家いえの　外そとには　駐車場ちゅうしゃじょうが　あります。\n      \n      車くるまを　停とめる場所ばしょです。\n      \n      これは　庭にわです。\n      \n      私わたしたちの　家いえには　庭にわは　ありません。\n      \n      ここは　公園こうえんです。\n      \n      私わたしたちの　家いえには　庭にわが　ないので、　子こどもたちは　近ちかくの　公園こうえんに　行いって　遊あそびます。\n      \n      今日きょうは　私わたしの　家いえを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "オオカミ少年 The Boy Who Cried Wolf",
      url: "https://cijapanese.com/the-boy-who-cried-wolf/",
      level: "beginner",
      membership: "free",
      transcript: "これはオオカミです。これは少年、男の子です。\n\n      今日はオオカミ少年のお話をします。\n      \n      少年がいます。少年は羊飼いです。羊を飼っています。\n      \n      少年は退屈でした。つまらないなぁ。楽しくないなぁ。\n      \n      そうだ！少年は良いことを思いつきました。そうだ！村の人達を驚かせよう！びっくりさせよう！\n      \n      少年は言いました。「オオカミが来た！助けて！」\n      \n      村の人達は、急いで、慌てて少年のところに行きました。助けに行きました。でもオオカミはいません。\n      \n      嘘でした。少年は笑っています。あはははは！と笑っています。村の人達は怒りました。\n      \n      次の日、少年はまた言いました。「オオカミが来た！助けて！」\n      \n      村の人達は、また急いで少年のところに助けに行きました。でもオオカミはいません。また嘘でした。\n      \n      次の日、本当にオオカミが来ました。少年は「オオカミが来た！助けて！」と叫びました。\n      \n      でもみんなは、また嘘だと思いました。誰も、一人も少年を助けに行きませんでした。\n      \n      少年も羊たちも、オオカミに食べられてしまいました。\n      \n      おしまい。",
      transcript_furigana: "これは　オオカミおおかみです。\n\n      これは　少年しょうねん、　男おとこの子こです。\n      \n      今日きょうは　オオカミおおかみ少年しょうねんの　お話はなしをします。\n      \n      少年しょうねんが　います。\n      \n      少年しょうねんは　羊飼ひつじかいです。\n      \n      羊ひつじを　飼かっています。\n      \n      少年しょうねんは　退屈たいくつでした。\n      \n      つまらないなぁ。\n      \n      楽たのしくないなぁ。\n      \n      そうだ！\n      \n      少年しょうねんは　良いいことを　思おもいつきました。\n      \n      そうだ！\n      \n      村むらの人達ひとたちを　驚おどろかせよう。\n      \n      びっくりさせよう。\n      \n      少年しょうねんは　言いいました。\n      \n      「オオカミおおかみが　来きた！　助たすけて！」\n      \n      村むらの人達ひとたちは　急いそいで、　慌あわてて　少年しょうねんのところに　行いきました。\n      \n      助たすけに　行いきました。\n      \n      でも　オオカミおおかみは　いません。\n      \n      嘘うそでした。\n      \n      少年しょうねんは　笑わらっています。\n      \n      あはははは！と　笑わらっています。\n      \n      村むらの人達ひとたちは　怒おこりました。\n      \n      次つぎの日ひ　少年しょうねんは　また　言いいました。\n      \n      「オオカミおおかみが　来きた！　助たすけて！」\n      \n      村むらの人達ひとたちは　また　急いそいで　少年しょうねんのところに　助たすけに　行いきました。\n      \n      でも　オオカミおおかみは　いません。\n      \n      また　嘘うそでした。\n      \n      次つぎの日ひ　本当ほんとうに　オオカミおおかみが　来きました。\n      \n      少年しょうねんは　「オオカミおおかみが　来きた！　助たすけて！」と　叫さけびました。\n      \n      でも　みんなは　また　嘘うそだと　思おもいました。\n      \n      誰だれも、　一人ひとりも　少年しょうねんを　助たすけに　行いきませんでした。\n      \n      少年しょうねんも　羊ひつじたちも　オオカミおおかみに　食たべられて　しまいました。\n      \n      おしまい。"
  },
  {
      title: "日本一VS世界一 No.1 in Japan VS No.1 in the World",
      url: "https://cijapanese.com/no-1-in-japan-vs-no-1-in-the-world/",
      level: "beginner",
      membership: "free",
      transcript: "今日は色々な日本一、日本で一番のものと世界一、世界で一番のものを紹介します。\n\n      まずは山です。\n      \n      日本一高い山を知っていますか。日本一高い山は、富士山です。富士山は静岡県にあります。ここにあります。富士山の高さは、３７７６メートルです。\n      \n      世界一高い山は、エベレストです。エベレストはここにあります。エベレストの高さは、８８４８メートルもあります。富士山の２倍以上です。\n      \n      次は湖です。\n      \n      日本一広い湖を知っていますか。日本一広い湖は、琵琶湖といいます。琵琶湖は滋賀県にあります。ここにあります。滋賀県は大阪の近くです。\n      \n      世界一広い湖は、カスピ海です。カスピ海はここです。ここにあります。\n      \n      琵琶湖の広さは、６６９平方ｋｍです。カスピ海は、３７４００平方キロメートルもあります。琵琶湖の５５倍以上の広さです。\n      \n      最後は川です。\n      \n      日本一長い川を知っていますか。日本一長い川は、信濃川といいます。信濃川は、長野県と新潟県を流れています。信濃川はここを流れています。\n      \n      世界一長い川は、ナイル川です。ナイル川はアフリカにあります。ここにあります。\n      \n      信濃川の長さは、３６７キロメートルです。ナイル川の長さは、６６９５メートルもあります。信濃川の１８倍以上の長さです。\n      \n      今日は、色々な日本一と世界一の話をしました。\n      \n      今日はこれでおしまい。またね。",
      transcript_furigana: "今日きょうは　色々いろいろな　日本一にほんいち、　日本にほんで　一番いちばんのものと\n\n      世界一せかいいち、　世界せかいで　一番いちばんのものを　紹介しょうかいします。\n      \n      まずは　山やまです。\n      \n      日本一にほんいち　高たかい　山やまを　知しっていますか。\n      \n      日本一にほんいち　高たかい　山やまは　富士山ふじさんです。\n      \n      富士山ふじさんは　静岡県しずおかけんに　あります。\n      \n      ここに　あります。\n      \n      富士山ふじさんの　高たかさは　３７７６さんぜんななひゃくななじゅうろくメートルめーとるです。\n      \n      世界一　高たかい　山やまは　エベレストえべれすとです。\n      \n      エベレストえべれすとは　ここに　あります。\n      \n      エベレストえべれすとの　高たかさは　８８４８はっせんはっぴゃくよんじゅうはちメートルめーとるも　あります。\n      \n      富士山ふじさんの　２倍以上にばいいじょうです。\n      \n      次つぎは　湖みずうみです。\n      \n      日本一にほんいち　広ひろい　湖みずうみを　知しっていますか。\n      \n      日本一にほんいち　広ひろい　湖みずうみは　琵琶湖びわこと　いいます。\n      \n      琵琶湖びわこは　滋賀県しがけんに　あります。\n      \n      ここに　あります。\n      \n      滋賀県しがけんは　大阪おおさかの　近ちかくです。\n      \n      世界一せかいいち　広ひろい　湖みずうみは　カスピかすぴ海かいです。\n      \n      カスピかすぴ海かいは　ここです。\n      \n      ここに　あります。\n      \n      琵琶湖びわこの　広ひろさは　６６９ろっぴゃくろくじゅうきゅう平方へいほうキロメートルきろめーとるです。\n      \n      カスピかすぴ海かいは　３７４００さんまんななせんよんひゃく平方へいほうキロメートルきろめーとるも　あります。\n      \n      琵琶湖びわこの　５５倍以上ごじゅうごばいいじょうの　広ひろさです。\n      \n      最後さいごは　川かわです。\n      \n      日本一にほんいち　長ながい　川かわを　知しっていますか。\n      \n      日本一にほんいち　長ながい　川かわは　信濃川しなのがわ　といいます。\n      \n      信濃川しなのがわは　長野県ながのけんと　新潟県にいがたけんを　流ながれています。\n      \n      信濃川しなのがわは　ここを　流ながれています。\n      \n      世界一せかいいち　長ながい　川かわは　ナイル川ないるがわです。\n      \n      ナイル川ないるがわは　アフリカあふりかに　あります。\n      \n      ここに　あります。\n      \n      信濃川しなのがわの　長ながさは　３６７さんびゃくろくじゅうななキロメートルきろめーとるです。\n      \n      ナイル川ないるがわの　長ながさは　６６９５ろくせんろっぴゃくきゅうじゅうご*メートルめーとるも　あります。\n      *キロメートル\n      \n      信濃川しなのがわの　１８倍以上じゅうはちばいいじょうの　長ながさです。\n      \n      今日きょうは　色々いろいろな　日本一にほんいちと　世界一せかいいちの　話はなしを　しました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "ラーメン Ramen",
      url: "https://cijapanese.com/ramen/",
      level: "beginner",
      membership: "free",
      transcript: "日本には、色々な種類の麺料理があります。例えばうどん、そば、ラーメンなど、色々な種類の麺料理があります。\n\n      その中で私は、ラーメンが一番好きです。今日はラーメンについてお話をします。\n      \n      私はラーメンが大好きです。月に１、２、３。３回くらい。一ヶ月に３回くらいラーメン屋さんに行きます。\n      \n      家でもよくラーメンを食べます。カップラーメンや、袋に入ったインスタントラーメンを家でよく食べます。\n      \n      朝です。昼です。夜です。お昼ごはんによく食べます。朝ごはんには食べません。\n      \n      日本には、色々な種類のラーメンがあります。例えば醤油ラーメン、味噌ラーメン、塩ラーメン、豚骨ラーメンなどがあります。\n      \n      それぞれスープが違います。醤油ラーメンは醤油味のスープです。味噌ラーメンは味噌味のスープです。塩ラーメンは塩味のスープです。豚骨ラーメンの豚骨とは、豚の骨のことです。豚の骨のことです。豚の骨のスープです。\n      \n      地方によって、地方ごとにラーメンの種類が違います。例えば北海道の札幌。札幌は、味噌ラーメンが有名です。北海道の函館は、塩ラーメンが有名です。東京は、醤油ラーメンが有名です。私が住んでいる福岡は、豚骨ラーメンが有名です。\n      \n      私は豚骨ラーメンが大好きです。他のラーメンは食べません。いっつも、いつも豚骨ラーメンを食べます。\n      \n      今日はラーメンの話をしました。\n      \n      おしまい。またね！",
      transcript_furigana: "日本にほんには　色々いろいろな　種類しゅるいの　麺料理めんりょうりが　あります。\n\n      例たとえば　うどん　そば　ラーメンらーめんなど　色々いろいろな　種類しゅるいの　麺料理めんりょうりが　あります。\n      \n      その中なかで　私わたしは　ラーメンらーめんが　一番いちばん　好すきです。\n      \n      今日きょうは　ラーメンらーめんについて　お話はなしをします。\n      \n      私わたしは　ラーメンらーめんが　大好だいすきです。\n      \n      月つきに　１いち、２に、３さん、　３回さんかいくらい、\n      \n      一ヶ月いっかげつに　３回さんかいくらい　ラーメンらーめん屋やさんに　行いきます。\n      \n      家いえでも　よく　ラーメンらーめんを　食たべます。\n      \n      カップラーメンかっぷらーめんや　袋ふくろに　入はいった　インスタントラーメンいんすたんとらーめんを　家いえで　よく　食たべます。\n      \n      朝あさです。　昼ひるです。　夜よるです。\n      \n      お昼ひるごはんに　よく　食たべます。\n      \n      朝あさごはんには　食たべません。\n      \n      日本にほんには　色々いろいろな　種類しゅるいの　ラーメンらーめんが　あります。\n      \n      例たべえば　醤油ラーメンしょうゆらーめん　味噌ラーメンみそらーめん　塩ラーメンしおらーめん　豚骨ラーメンとんこつらーめんなどが　あります。\n      \n      それぞれ　スープすーぷが　違ちがいます。\n      \n      醤油ラーメンしょうゆらーめんは　醤油味しょうゆあじの　スープすーぷです。\n      \n      味噌ラーメンみそらーめんは　味噌味みそあじの　スープすーぷです。\n      \n      塩ラーメンしおらーめんは　塩味しおあじの　スープすーぷです。\n      \n      豚骨ラーメンとんこつらーめんの　豚骨とんこつとは　豚ぶたの　骨ほねのことです。\n      \n      豚ぶたの　骨ほねのことです。\n      \n      豚ぶたの　骨ほねの　スープすーぷです。\n      \n      地方ちほうによって、　地方ちほうごとに　ラーメンらーめんの　種類しゅるいが　違ちがいます。\n      \n      例たとえば　北海道ほっかいどうの　札幌さっぽろ。\n      \n      札幌さっぽろは　味噌ラーメンみそらーめんが　有名ゆうめいです。\n      \n      北海道ほっかいどうの　函館はこだては　塩ラーメンしおらーめんが　有名ゆうめいです。\n      \n      東京とうきょうは　醤油ラーメンしょうゆらーめんが　有名ゆうめいです。\n      \n      私わたしが　住すんでいる　福岡ふくおかは　豚骨ラーメンとんこつらーめんが　有名ゆうめいです。\n      \n      私わたしは　豚骨ラーメンとんこつらーめんが　大好だいすきです。\n      \n      他ほかの　ラーメンらーめんは　食たべません。\n      \n      いっつも　いつも　豚骨とんこつラーメンを　食たべます。\n      \n      今日きょうは　ラーメンらーめんの　話はなしをしました。\n      \n      おしまい。　またね！"
  },
  {
      title: "運転 Driving",
      url: "https://cijapanese.com/driving/",
      level: "beginner",
      membership: "free",
      transcript: "これは車です。今日は、車の運転の話をします。\n\n      うちには車が１台あります。紫色の車です。今２０２１年です。２０２０年、２０１９年、２０１８年。１、２、３。３年前に買いました。\n      \n      月火水木金。平日です。土日。週末です。休みの日です。私は平日は、毎日車を運転します。休日は運転しません。夫が運転します。\n      \n      平日は、子どもたちを保育園に連れて行ったり、迎えに行ったり。子どもたちを送り迎えするために運転します。時々、買い物に行くためにも運転します。\n      \n      私は車の運転があまり好きじゃありません。なぜなら苦手だからです。得意じゃありません。上手じゃありません。下手です。\n      \n      これまでに１回、２回、３回。３回、車をバン！ぶつけてしまったことがあります。他の車にぶつけてしまったこともあります。ガードレールにぶつけてしまったこともあります。車に傷をつけてしまいました。\n      \n      夫は、もっと大きい車が欲しいと言います。今よりももっと大きい車が欲しいと言います。でも私は嫌です。大きい車を運転するのは怖いです。怖いです。私は小さい車が良いです。\n      \n      皆さんは車の運転が好きですか。今日は運転について話をしました。\n      \n      おしまい。またね。",
      transcript_furigana: "これは　車くるまです。\n\n      今日きょうは　車くるまの　運転うんてんの　話はなしをします。\n      \n      うちには　車くるまが　１台いちだい　あります。\n      \n      紫色むらさきいろの　車くるまです。\n      \n      今いま　２０２１にせんにじゅういち年ねんです。\n      \n      ２０２０年にせんにじゅうねん　２０１９年にせんじゅうきゅうねん　２０１８年にせんじゅうはちねん。\n      \n      １いち、２に、３さん。\n      \n      ３年前さんねんまえに　買かいました。\n      \n      月げつ、火か、水すい、木もく、金きん。\n      \n      平日へいじつです。\n      \n      土ど　日にち。\n      \n      週末しゅうまつです。\n      \n      休やすみの日ひです。\n      \n      私わたしは　平日へいじつは　毎日まいにち　車くるまを　運転うんてんします。\n      \n      休日きゅうじつは　運転うんてんしません。\n      \n      夫おっとが　運転うんてんします。\n      \n      平日へいじつは　子こどもたちを　保育園ほいくえんに　連つれて　行いったり　迎むかえに　行いったり、\n      \n      子こどもたちを　送おくり迎むかえするために　運転うんてんします。\n      \n      時々ときどき　買かい物ものに　行いくためにも　運転うんてんします。\n      \n      私わたしは　車くるまの　運転うんてんが　あまり　好すきじゃありません。\n      \n      なぜなら　苦手にがてだからです。\n      \n      得意とくいじゃありません。\n      \n      上手じょうずじゃありません。\n      \n      下手へたです。\n      \n      これまでに　１回いっかい　２回にかい　３回さんかい。\n      \n      ３回さんかい　車くるまを　バンばん！\n      \n      ぶつけてしまったことが　あります。\n      \n      他ほかの　車くるまに　ぶつけてしまったことも　あります。\n      \n      ガードレールがーどれーるに　ぶつけてしまったことも　あります。\n      \n      車くるまに　傷きずを　つけてしまいました。\n      \n      夫おっとは　もっと　大おおきい　車くるまが　欲ほしいと　言いいます。\n      \n      今よりも　もっと　大おおきい　車くるまが　欲ほしいと　言いいます。\n      \n      でも　私わたしは　嫌いやです。\n      \n      大おおきい　車くるまを　運転うんてんするのは　怖こわいです。\n      \n      怖こわいです。\n      \n      私わたしは　小ちいさい　車くるまが　良いいです。\n      \n      皆みなさんは　車くるまの　運転うんてんが　好すきですか。\n      \n      今日きょうは　運転うんてんについて　話はなしをしました。\n      \n      おしまい。\n      \n      またね！"
  },
  {
      title: "アリとキリギリス The Ant and the Grashopper",
      url: "https://cijapanese.com/the-ant-and-the-grashopper/",
      level: "beginner",
      membership: "free",
      transcript: "今日は、アリとキリギリスのお話をします。\n\n      今は夏です。暑い夏です。アリとキリギリスがいます。\n      \n      アリたちは働き者です。よく働きます。一生懸命働きます。キリギリスは怠け者です。働きません。働かずにバイオリンを弾いて歌っています。\n      \n      アリたちは食べ物を運んでいます。ここはアリの巣です。アリの家です。アリたちは、食べ物を巣に運びます。\n      \n      キリギリスがアリに聞きます。「何をしているの？」アリが答えます。「食べ物を集めているんだよ。」\n      \n      「どうして？なぜ？」「冬に備えて。夏が終わって秋が終わって、冬が来たときのために、食べ物を集めているんだよ。」\n      \n      キリギリスはアリを見て笑います。「アハハハハ！働かないで一緒に歌おう！」\n      \n      アリは言います。「キリギリスさんも夏の間に働いたほうが良いよ。冬が来た時、食べるものがなくなるよ。」\n      \n      「大丈夫だよ。僕は働かない。歌う！」\n      \n      そして冬が来ました。夏が終わって秋が終わって、冬になりました。\n      \n      ここはアリの家です。アリの家には、たくさんたくさん食べ物があります。キリギリスは食べ物がありません。お腹が空いています。\n      \n      家もありません。寒いです。誰もいません。キリギリスは一人ぼっちです。寂しいです。\n      \n      キリギリスが歩いています。家があります。家を見つけました。トントン。ドアをノックします。アリの家です。\n      \n      「こんばんは、キリギリスさん。どうしたの？」「お腹が空いています。食べ物をください。食べ物を分けてください。」\n      \n      アリたちは優しいです。キリギリスに食べ物をあげました。「どうぞ。」とあげました。「ありがとう。」\n      \n      キリギリスは、次の夏はよく働きました。\n      \n      おしまい。",
      transcript_furigana: "今日きょうは　アリありと　キリギリスきりぎりすの　お話はなしをします。\n\n      今いまは　夏なつです。\n      \n      暑あつい　夏なつです。\n      \n      アリありと　キリギリスきりぎりすが　います。\n      \n      アリありたちは　働はたらき者ものです。\n      \n      よく　働はたらきます。　\n      \n      一生懸命いっしょうけんめい　働はたらきます。\n      \n      キリギリスきりぎりすは　怠なまけ者ものです。\n      \n      働はたらきません。\n      \n      働はたらかずに　バイオリンばいおりんを　弾ひいて　歌うたっています。\n      \n      アリありたちは　食たべ物ものを　運はこんでいます。\n      \n      ここは　アリありの　巣すです。\n      \n      アリありの　家いえです。\n      \n      アリありたちは　食たべ物ものを　巣すに　運はこびます。\n      \n      キリギリスきりぎりすが　アリありに　聞ききます。\n      \n      「何なにを　しているの。」\n      \n      アリありが　答こたえます。\n      \n      「食たべ物ものを　集あつめているんだよ。」\n      \n      「どうして？なぜ？」\n      \n      「冬ふゆに　備そなえて。\n      \n      夏なつが　終おわって　秋あきが　終おわって\n      \n      冬ふゆが　来きたときの　ために　食たべ物ものを　集あつめているんだよ。」\n      \n      キリギリスきりぎりすは　アリありを　見みて　笑わらいます。\n      \n      アハハハハあはははは！\n      \n      「働はたらかないで　一緒いっしょに　歌うたおう！」\n      \n      アリありは　言いいます。\n      \n      「キリギリスきりぎりすさんも　夏なつの間あいだに　働はたらいたほうが　良いいよ。\n      \n      冬ふゆが　来きた時とき　食たべるものが　なくなるよ。」\n      \n      「大丈夫だいじょうぶだよ！\n      \n      僕ぼくは　働はたらかない。　歌うたう。」\n      \n      そして　冬ふゆが　来きました。\n      \n      夏なつが　終おわって　秋あきが　終おわって　冬ふゆに　なりました。\n      \n      ここは　アリありの　家いえです。\n      \n      アリありの　家いえには　たくさん　たくさん　食たべ物ものが　あります。\n      \n      キリギリスきりぎりすは　食たべ物ものが　ありません。\n      \n      お腹なかが　空すいています。\n      \n      家いえも　ありません。\n      \n      寒さむいです。\n      \n      誰だれも　いません。\n      \n      キリギリスきりぎりすは　一人ひとりぼっちです。\n      \n      寂さみしいです。\n      \n      キリギリスきりぎりすが　歩あるいています。\n      \n      家いえが　あります。\n      \n      家いえを　見みつけました。\n      \n      トントンとんとん。\n      \n      ドアどあを　ノックのっくします。\n      \n      アリありの　家いえです。\n      \n      「こんばんは　キリギリスきりぎりすさん　どうしたの？」\n      \n      「お腹なかが　空すいています。\n      \n      食たべ物ものを　ください。\n      \n      食たべ物ものを　分わけてください。」\n      \n      アリありたちは　優やさしいです。\n      \n      キリギリスきりぎりすに　食たべ物ものを　あげました。\n      \n      「どうぞ。」と　あげました。\n      \n      「ありがとう。」\n      \n      キリギリスきりぎりすは　次つぎの　夏なつは　よく　働はたらきました。\n      \n      おしまい。"
  },
  {
      title: "朝すること What I do in the morning",
      url: "https://cijapanese.com/what-i-do-in-the-morning/",
      level: "beginner",
      membership: "free",
      transcript: "朝です。昼です。夕方です。夜です。今日は、私が朝することについてお話します。\n\n      これは私です。寝ています。まだ布団で寝ています。７時です。７時になりました。起きます。\n      \n      起きたらまず、一番にトイレに行きます。これはトイレです。まずトイレに行きます。それから水で手と顔を洗います。\n      \n      これは洗濯機です。洗濯物をたたみます。そして化粧をします。化粧をします。\n      \n      ７時半です。７時半になったら家族を起こします。起きて！家族を起こします。おはよう！おはよう！家族が起きます。\n      \n      家族が起きたら、娘のおむつを替えます。娘のおむつを替えます。\n      \n      それから朝ごはんを作ります。朝ごはんを作って、みんなで食べます。朝ごはんを食べます。いただきます！もぐもぐもぐもぐ。\n      \n      食べ終わりました。ごちそうさま！食べ終わったら、お皿を洗います。お水でお皿やコップを洗います。\n      \n      それから服を着替えます。パジャマから、服に着替えます。そして髪の毛をセットします。寝癖を直します。\n      \n      自分の準備が終わったら、子どもたちの準備を手伝います。子供たちが着替えます。私は手伝います。子供たちがバッグ、荷物を準備します。私は手伝います。\n      \n      ８時半です。８時半になりました。８時半になったら出かけます。これは保育園です。８時半になったら、子供たちを保育園に連れていきます。車で連れていきます。\n      \n      家に帰ります。家に帰って仕事をします。家に帰って仕事をします。\n      \n      朝はとっても忙しいです。やることがたくさんあります。\n      \n      今日は私が朝することの紹介でした。\n      \n      おしまい。またね！",
      transcript_furigana: "朝あさです。　昼ひるです。　夕方ゆうがたです。　夜よるです。\n\n      今日きょうは　私わたしが　朝あさすることについて　お話はなしします。\n      \n      これは　私わたしです。\n      \n      寝ねています。\n      \n      まだ　布団ふとんで　寝ねています。\n      \n      ７時しちじです。\n      \n      ７時しちじに　なりました。\n      \n      起おきます。\n      \n      起おきたら　まず　一番いちばんに　トイレといれに　行いきます。\n      \n      これは　トイレといれです。\n      \n      まず　トイレといれに　行いきます。\n      \n      それから　水みずで　手てと　顔かおを　洗あらいます。\n      \n      これは　洗濯機せんたくきです。\n      \n      洗濯物せんたくものを　たたみます。\n      \n      そして　化粧けしょうを　します。\n      \n      化粧けしょうを　します。\n      \n      ７時半しちじはんです。\n      \n      ７時半しちじはんに　なったら　家族かぞくを　起おこします。\n      \n      「起おきて！」　家族かぞくを　起おこします。\n      \n      「おはよう！」　「おはよう！」　家族かぞくが　起おきます。\n      \n      家族かぞくが　起おきたら　娘むすめの　おむつを　替かえます。\n      \n      娘むすめの　おむつを　替かえます。\n      \n      それから　朝あさごはんを　作つくります。\n      \n      朝あさごはんを　作つくって　みんなで　食たべます。\n      \n      朝あさごはんを　食たべます。\n      \n      「いただきます！」　もぐもぐもぐもぐ。\n      \n      食たべ終おわりました。\n      \n      「ごちそうさま！」\n      \n      食たべ終おわったら　お皿さらを　洗あらいます。\n      \n      お水みずで　お皿さらや　コップこっぷを　洗あらいます。\n      \n      それから　服ふくを　着替きがえます。\n      \n      パジャマから　服ふくに　着替きがえます\n      \n      そして　髪かみの毛けを　セットせっとします。\n      \n      寝癖ねぐせを　直なおします。\n      \n      自分じぶんの　準備じゅんびが　終おわったら　子供こどもたちの　準備じゅんびを　手伝てつだいます。\n      \n      子供こどもたちが　着替きがえます。\n      \n      私わたしは　手伝てつだいます。\n      \n      子供こどもたちが　バッグばっぐ、　荷物にもつを　準備じゅんびします。\n      \n      私わたしは　手伝てつだいます。\n      \n      ８時半はちじはんです。\n      \n      ８時半はちじはんに　なりました。\n      \n      ８時半はちじはんに　なったら　出でかけます。\n      \n      これは　保育園ほいくえんです。\n      \n      ８時半はちじはんに　なったら　子供こどもたちを　保育園ほいくえんに　連つれていきます。\n      \n      車くるまで　連つれていきます。\n      \n      家いえに　帰かえります。\n      \n      家いえに　帰かえって　仕し事ごとを　します。\n      \n      家いえに　帰かえって　仕し事ごとを　します。\n      \n      朝あさは　とっても　忙いそがしいです。\n      \n      やることが　たくさん　あります。\n      \n      今日きょうは　私わたしが　朝あさすることの　紹介しょうかいでした。\n      \n      おしまい。　またね！"
  },
  {
      title: "動物当てクイズ Animal Guessing Game",
      url: "https://cijapanese.com/animal-guessing-game/",
      level: "beginner",
      membership: "free",
      transcript: "これは犬です。これは猫です。これは猿です。これはライオンです。動物です。動物の仲間です。\n\n      今日はクイズをします。動物のクイズをします。私がヒントを言います。ヒントを出します。ヒントを聞いて、何の動物か当ててください。何の動物か考えて、当ててください。\n      \n      第１問\n      \n      この動物は背が高いです。背が高いです。これは木です。葉っぱです。この動物は葉っぱを食べます。この動物は足が長いです。そして首も長いです。\n      \n      何でしょう？わかりましたか？正解はキリンです。\n      \n      第２問\n      \n      この動物はとても大きいです。大きいです。小さくありません。そしてとても重いです。軽くありません。重いです。大きくて、体重が重い動物です。草や果物を食べます。そして、鼻、鼻が長いです。\n      \n      何でしょう？わかりましたか？正解はぞうです。\n      \n      第３問\n      \n      この動物は小さいです。小さいです。大きくありません。小さくてかわいい動物です。ぴょんぴょんぴょん、ぴょんぴょんぴょんと跳ねます。この動物は人参が好きです。そして耳が長いです。\n      \n      何でしょう？正解はうさぎです。\n      \n      第４問\n      \n      この動物はかわいいです。寒い場所に住んでいます。氷の上に住んでいます。鳥の仲間です。でも、鳥のように飛ぶことはできません。鳥の仲間ですが、飛べません。魚のように泳げます。泳ぐことができます。\n      \n      何でしょう？わかりましたか？正解はペンギンです。\n      \n      第５問、最後の問題です。\n      \n      この動物には足がありません。この動物は怖いです。私はこの動物が好きじゃありません。怖いので嫌いです。この動物は体が長いです。そして、舌、舌も長いです。\n      \n      何でしょう？正解は蛇です。\n      \n      今日は、動物あてクイズをしました。動物のクイズを５つ出しました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "これは　犬いぬです。\n\n      これは　猫ねこです。\n      \n      これは　猿さるです。\n      \n      これは　ライオンらいおんです。\n      \n      動物どうぶつです。\n      \n      動物どうぶつの　仲間なかまです。\n      \n      今日きょうは　クイズくいずをします。\n      \n      動物どうぶつの　クイズくいずをします。\n      \n      私わたしが　ヒントひんとを　言いいます。\n      \n      ヒントひんとを　出だします。\n      \n      ヒントひんとを　聞きいて　何なんの　動物どうぶつか　当あててください。\n      \n      何なんの　動物どうぶつか　考かんがえて　当あててください。\n      \n      第一問だいいちもん\n      \n      この　動物どうぶつは　背せが　高たかいです。\n      \n      背せが　高たかいです。\n      \n      これは　木きです。　\n      \n      葉はっぱです。\n      \n      この　動物どうぶつは　葉はっぱを　食たべます。\n      \n      この　動物どうぶつは　足が　長ながいです。\n      \n      そして　首くびも　長ながいです。\n      \n      何なんでしょう。　わかりましたか？\n      \n      正解せいかいは　キリンきりんです。\n      \n      第２問だいにもん\n      \n      この　動物どうぶつは　とても　大おおきいです。\n      \n      大おおきいです。　小ちいさくありません。\n      \n      そして　とても　重おもいです。\n      \n      軽かるくありません。　重おもいです。\n      \n      大おおきくて　体重たいじゅうが　重おもい　動物どうぶつです。\n      \n      草くさや　果物くだものを　食たべます。\n      \n      そして　鼻はな、　鼻はなが　長ながいです。\n      \n      何なんでしょう。　わかりましたか？\n      \n      正解せいかいは　ぞうです。\n      \n      第３問だいさんもん\n      \n      この　動物どうぶつは　小ちいさいです。　\n      \n      小ちいさいです。　大おおきくありません。\n      \n      小ちいさくて　かわいい　動物どうぶつです。\n      \n      ぴょんぴょんぴょん、ぴょんぴょんぴょんと　跳はねます。\n      \n      この　動物どうぶつは　人参にんじんが　好すきです。\n      \n      そして　耳みみが　長ながいです。\n      \n      何なんでしょう。\n      \n      正解せいかいは　うさぎです。\n      \n      第４問だいよんもん\n      \n      この　動物どうぶつは　かわいいです。\n      \n      寒さむい場所ばしょに　住すんでいます。\n      \n      氷こおりの　上うえに　住すんでいます。\n      \n      鳥とりの　仲間なかまです。\n      \n      でも　鳥とりのように　飛とぶことは　できません。\n      \n      鳥とりの　仲間なかまですが　飛とべません。\n      \n      魚さかなのように　泳およげます。\n      \n      泳およぐことが　できます。\n      \n      何なんでしょう。　わかりましたか？\n      \n      正解せいかいは　ペンギンぺんぎんです。\n      \n      第５問だいごもん、　最後さいごの　問題もんだいです。\n      \n      この　動物どうぶつには　足あしが　ありません。\n      \n      この　動物どうぶつは　怖こわいです。\n      \n      私わたしは　この　動物どうぶつが　好すきじゃありません。\n      \n      怖こわいので　嫌きらいです。\n      \n      この　動物どうぶつは　体からだが　長ながいです。\n      \n      そして　舌した、　舌したも　長ながいです。\n      \n      何なんでしょう。\n      \n      正解せいかいは　蛇へびです。\n      \n      今日きょうは　動物どうぶつあて　クイズくいずをしました。\n      \n      動物どうぶつの　クイズくいずを　５いつつ　出だしました。\n      \n      今日きょうは　これで　おしまい。　またね。"
  },
  {
      title: "節分 Setsubun",
      url: "https://cijapanese.com/setsubun/",
      level: "beginner",
      membership: "free",
      transcript: "今日のテーマは節分です。\n\n      節分、知っていますか？節分とは日本の行事の一つです。例えばクリスマスやハロウィンなど、色々な行事があります。節分は日本の行事です。\n      \n      節分は毎年２月３日です。今日は１月２９日なので、もうすぐ節分です。今日は、節分の日にすることを３つ紹介します。\n      \n      まず１つ目。\n      \n      これは豆です。節分の日には豆を撒きます。豆をポーン、投げます。豆をまく。「豆まき」といいます。\n      \n      豆まきをする時、こう言います。「鬼は外！福は内！」豆を撒きながら「鬼は外！福は内！」と言います。\n      \n      これは鬼です。鬼といいます。鬼は怖いです。鬼は怖い、嫌なことです。悪いことです。嫌なこと、悪いことは来てほしくありません。来たら嫌です。鬼は外に出てほしいです。外に出ていってほしいです。なので、鬼は外「鬼は外！」と言います。\n      \n      これは福といいます。福は怖くありません。鬼のように怖くありません。優しいです。福、福は良いことです。良いことは来てほしいです。うちに来てほしいです。なので、福は、内「福は内！」と言います。\n      \n      節分の日にすること２つ目は、豆を食べることです。豆を食べます。\n      \n      これは私の家族です。私の息子は６歳です。なので、豆を１２３４５６、６個食べます。娘は１歳です。なので豆を１個だけ食べます。自分の年齢、歳と、同じ数の豆を食べます。\n      \n      私は３４歳です。３４個も豆を食べなくてはいけません。でもそんなにたくさんは食べられません。\n      \n      節分の日にすること３つ目は、恵方巻を食べることです。恵方巻とは寿司です。寿司の種類です。\n      \n      これは海苔です。これは海苔です。これはご飯です。海苔の上にご飯をのせます。ご飯をのせました。そして具をのせます。色々な具をのせます。例えば、卵、魚、エビ、きゅうり、など色々な具をのせます。そして、くるくるくる、と巻きます。\n      \n      これは包丁です。恵方巻は切りません。切らずにそのまま、長いまま食べます。そして、食べる時に願い事をします。食べながら願い事をします。\n      \n      今日は、２月３日の節分という日本の行事を紹介しました。\n      \n      おしまい。またね。",
      transcript_furigana: "今日きょうの　テーマてーまは　節分せつぶんです。\n\n      節分せつぶん　知しっていますか。\n      \n      節分せつぶんとは　日本にほんの　行事ぎょうじの　一ひとつです。\n      \n      例たとえば　クリスマスくりすますや　ハロウィンはろうぃんなど　色々いろいろな　行事ぎょうじが　あります。\n      \n      節分せつぶんは　日本にほんの　行事ぎょうじです。\n      \n      節分せつぶんは　毎年まいとし　２月３日にがつみっかです。\n      \n      今日きょうは　１月２９日いちがつにじゅうくにちなので　もうすぐ　節分せつぶんです。\n      \n      今日きょうは　節分せつぶんの日ひに　することを　３みっつ　紹介しょうかいします。\n      \n      まず　１ひとつ目め。\n      \n      これは　豆まめです。\n      \n      節分せつぶんの日ひには　豆まめを　撒まきます。\n      \n      豆まめを　ポーンぽーん　投なげます。\n      \n      豆まめを　まく。\n      \n      「豆まめまき」と　いいます。\n      \n      豆まめまきを　する時とき　こう　言いいます。\n      \n      「鬼おには　外そと！　福ふくは　内うち！」\n      \n      豆まめを　撒きながら　「鬼おには　外そと！　福ふくは　内うち！」と　言いいます。\n      \n      これは　鬼おにです。\n      \n      鬼おにと　いいます。\n      \n      鬼おには　怖こわいです。\n      \n      鬼おには　怖こわい　嫌いやなことです。\n      \n      悪わるいことです。\n      \n      嫌いやなこと　悪わるいことは　来きてほしくありません。\n      \n      来きたら　嫌いやです。\n      \n      鬼おには　外そとに　出でてほしいです。\n      \n      外そとに　出でていってほしいです。\n      \n      なので　鬼おには　外そと、「鬼おには　外そと」と　言いいます。\n      \n      これは　福ふくと　いいます。\n      \n      福ふくは　怖こわくありません。\n      \n      鬼おにのように　怖こわくありません。\n      \n      優やさしいです。\n      \n      福ふく、　福ふくは　良いいことです。\n      \n      良いいことは　来きてほしいです。\n      \n      うちに　来きてほしいです。\n      \n      なので　福ふくは　内うち、「福ふくは　内うち」と　言いいます。\n      \n      節分せつぶんの日ひに　すること　２ふたつ目めは　豆まめを　食たべることです。\n      \n      豆まめを　食たべます。\n      \n      これは　私わたしの　家族かぞくです。\n      \n      私わたしの　息子むすこは　６歳ろくさいです。\n      \n      なので　豆まめを　１いち　２に　３さん　４し　５ご　６ろく、　６個ろっこ　食たべます。\n      \n      娘むすめは　１歳いっさいです。\n      \n      なので　豆まめを　１個いっこだけ　食たべます。\n      \n      自分じぶんの　年ねん齢れい、　歳としと　同おなじ　数かずの　豆まめを　食たべます。\n      \n      私わたしは　３４歳さんじゅうよんさいです。\n      \n      ３４個さんじゅうよんこも　豆まめを　食たべなくてはいけません。\n      \n      でも　そんなに　たくさんは　食たべられません。\n      \n      節分せつぶんの日ひに　すること　３みっつ目めは　恵方巻えほうまきを　食たべることです。\n      \n      恵方巻えほうまきとは　寿司すしです。\n      \n      寿司すしの　種類しゅるいです。\n      \n      これは　海苔のりです。\n      \n      これは　海苔のりです。\n      \n      これは　ご飯はんです。\n      \n      海苔のりの　上うえに　ご飯はんを　のせます。\n      \n      ご飯はんを　のせました。\n      \n      そして　具ぐを　のせます。\n      \n      色々いろいろな　具ぐを　のせます。\n      \n      例たとえば　卵たまご　魚さかな　エビえび　きゅうりなど　色々いろいろな　具ぐを　のせます。\n      \n      そして　くるくるくると　巻まきます。\n      \n      これは　包丁ほうちょうです。\n      \n      恵方巻えほうまきは　切きりません。\n      \n      切きらずに　そのまま　長ながいまま　食たべます。\n      \n      そして　食たべる時ときに　願ねがい事ごとをします。\n      \n      食たべながら　願ねがい事ごとをします。\n      \n      今日きょうは　２月３日にがつみっかの　節分せつぶんという　日本にほんの　行事ぎょうじを　紹介しょうかいしました。\n      \n      おしまい。　またね！  "
  },
  {
      title: "白雪姫 Snow White",
      url: "https://cijapanese.com/snow-white/",
      level: "beginner",
      membership: "free",
      transcript: "ここはお城です。お城に王様とお妃様が住んでいます。王様とお妃様に赤ちゃんが生まれました。白雪姫という名前のかわいい女の子です。\n\n      しばらくして、お妃様は病気になりました。お妃様は病気で亡くなってしまいました。死んでしまいました。\n      \n      またしばらくして、新しいお妃様が来ました。新しいお妃様は意地悪な人です。優しくありません。\n      \n      お城に鏡があります。これは鏡です。この鏡は魔法の鏡です。質問をすると答えてくれます。\n      \n      お妃様が鏡に聞きます。質問します。「世界で１番美しいのは誰？」「世界で１番美しいのは誰？」\n      \n      鏡が答えます。「お妃様、あなたです。世界で一番美しいのはあなたです。」お妃様は喜んでいます。嬉しいです。お妃様は、毎日毎日鏡に聞きます。\n      \n      またしばらくして、白雪姫が大きくなりました。大きくなってとても美しいお姫様になりました。\n      \n      お妃様が鏡に「世界で一番美しいのは誰？」と聞くと、鏡はこう答えました。「世界で一番美しいのは、白雪姫です。」\n      \n      するとお妃様は怒ります。怒ったお妃様は、家来を呼びます。家来に言います。「白雪姫を殺しなさい。」お妃様が家来に命令します。\n      \n      でも家来は、白雪姫がかわいそうと思いました。家来は白雪姫を殺しませんでした。家来が白雪姫に言います。「森に逃げなさい。」白雪姫は森に逃げます。\n      \n      森の中に家があります。一軒の家があります。ここは七人の小人の家です。小人が七人住んでいます。白雪姫は小人たちと一緒にここで暮らします。\n      \n      お城でお妃様が、また鏡に聞きます。「世界で一番美しいのは誰？」鏡が言いました。「それは白雪姫です。」お妃様はまた怒りました。\n      \n      お妃様は怖い魔女になりました。魔女に化けました。そして毒りんごを作りました。毒が入ったりんごです。魔女になったお妃様は、毒りんごを持って白雪姫のところに行きます。\n      \n      トントン。「りんごをどうぞ。」白雪姫が毒りんごを食べます。毒りんごを食べて、白雪姫は眠りました。\n      \n      小人たちが家に帰ってきました。小人たちが白雪姫を見ます。小人たちは、白雪姫が死んでしまったと思います。みんな泣いています。悲しいです。\n      \n      そこへ王子様が来ました。かっこいい王子様が来ました。王子様が白雪姫にキスをします。すると白雪姫は目を覚ましました。\n      \n      おしまい。",
      transcript_furigana: "ここは　お城しろです。\n\n      お城しろに　王様おうさまと　お妃様きさきさまが　住すんでいます。\n      \n      王様おうさまと　お妃様きさきさまに　赤あかちゃんが　生うまれました。\n      \n      白雪姫しらゆきひめという　名前なまえの　かわいい　女おんなの子こです。\n      \n      しばらくして　お妃様きさきさまは　病気びょうきになりました。\n      \n      お妃様きさきさまは　病気びょうきで　亡なくなってしまいました。\n      \n      死しんでしまいました。\n      \n      また　しばらくして　新あたらしい　お妃様きさきさまが　来きました。\n      \n      新あたらしい　お妃様きさきさまは　意地悪いじわるな　人ひとです。\n      \n      優やさしくありません。\n      \n      お城しろに　鏡かがみが　あります。\n      \n      これは　鏡かがみです。\n      \n      この鏡かがみは　魔法まほうの　鏡かがみです。\n      \n      質問しつもんをすると　答こたえてくれます。\n      \n      お妃様きさきさまが　鏡かがみに　聞ききます。\n      \n      質問しつもんします。\n      \n      「世界せかいで　１番いちばん　美うつくしいのは　誰だれ？」\n      \n      「世界せかいで　１番いちばん　美うつくしいのは　誰だれ？」\n      \n      鏡かがみが　答こたえます。\n      \n      「お妃様きさきさま、　あなたです。\n      \n      世界せかいで　１番いちばん　美うつくしいのは　あなたです。」\n      \n      お妃様きさきさまは　喜よろこんでいます。\n      \n      嬉うれしいです。\n      \n      お妃様きさきさまは　毎日まいにち　毎日まいにち　鏡かがみに　聞ききます。\n      \n      また　しばらくして　白雪姫しらゆきひめが　大おおきくなりました。\n      \n      大おおきくなって　とても　美うつくしい　お姫様ひめさまに　なりました。\n      \n      お妃様きさきさまが　鏡かがみに　「世界せかいで　１番いちばん　美うつくしいのは　誰だれ？」と　聞きくと　鏡かがみは　こう　答こたえました。\n      \n      「世界せかいで　１番いちばん　美うつくしいのは　白雪姫しらゆきひめです。」\n      \n      すると　お妃様きさきさまは　怒おこります。\n      \n      怒おこった　お妃様きさきさまは　家来けらいを　呼よびます。\n      \n      家来けらいに　言いいます。　「白雪姫しらゆきひめを　殺ころしなさい。」\n      \n      お妃様きさきさまが　家来けらいに　命令めいれいします。\n      \n      でも　家来けらいは　白雪姫しらゆきひめが　かわいそうと　思おもいました。\n      \n      家来けらいは　白雪姫しらゆきひめを　殺ころしませんでした。\n      \n      家来けらいが　白雪姫しらゆきひめに　言いいます。\n      \n      「森もりに　逃にげなさい。」\n      \n      白雪姫しらゆきひめは　森もりに　逃にげます。\n      \n      森もりの　中なかに　家いえが　あります。\n      \n      一軒いっけんの　家いえが　あります。\n      \n      ここは　七人しちにんの　小人こびとの　家いえです。　\n      \n      小人こびとが　七人しちにん　住すんでいます。\n      \n      白雪姫しらゆきひめは　小人こびとたちと　一緒いっしょに　ここで　暮くらします。\n      \n      お城しろで　お妃様きさきさまが　また　鏡かがみに　聞ききます。\n      \n      「世界せかいで　１番いちばん　美うつくしいのは　誰だれ？」\n      \n      鏡かがみが　言いいました。　「それは　白雪姫しらゆきひめです。」\n      \n      お妃様きさきさまは　また　怒おこりました。\n      \n      お妃様きさきさまは　怖こわい　魔女まじょに　なりました。\n      \n      魔女まじょに　化ばけました。\n      \n      そして　毒どくりんごを　作つくりました。\n      \n      毒どくが　入はいった　りんごです。\n      \n      魔女まじょに　なった　お妃様きさきさまは　毒どくりんごを　持もって　白雪姫しらゆきひめのところに　行いきます。\n      \n      トントンとんとん　「りんごを　どうぞ。」　白雪姫しらゆきひめが　毒どくりんごを　食たべます。\n      \n      毒どくりんごを　食たべて　白雪姫しらゆきひめは　眠ねむりました。\n      \n      小人こびとたちが　家いえに　帰かえってきました。　\n      \n      小人こびとたちが　白雪姫しらゆきひめを　見みます。\n      \n      小人こびとたちは　白雪姫しらゆきひめが　死しんでしまったと　思おもいます。\n      \n      みんな　泣ないています。\n      \n      悲かなしいです。\n      \n      そこへ　王子様おうじさまが　来きました。\n      \n      かっこいい　王子様おうじさまが　来きました。\n      \n      王子様おうじさまが　白雪姫しらゆきひめに　キスきすをします。\n      \n      すると　白雪姫しらゆきひめは　目めを　覚さましました。\n      \n      おしまい。"
  },
  {
      title: "外国語の勉強 Language Learning",
      url: "https://cijapanese.com/language-learning/",
      level: "beginner",
      membership: "free",
      transcript: "これは日本語です。これは英語です。これは中国語、韓国語、そしてスペイン語です。皆さんは何語を話しますか？\n\n      私は日本人です。日本で生まれた、日本生まれの、日本人です。私の両親、私のお父さんとお母さんも日本人です。なので私は日本語を話します。子供の時からずーっと日本語を話しています。日本語は、私の母語です。\n      \n      英語や中国語、韓国語、スペイン語は、私にとって外国語です。自分の国の言葉では、ありません。外国の言葉です。なので外国語といいます。\n      \n      皆さんにとって日本語は外国語ですね。皆さんは日本語を勉強していますね。日本語の勉強は好きですか？楽しいですか？\n      \n      私は外国語の勉強が好きです。外国語を勉強するのは楽しいです。私は英語と韓国語を勉強しています。\n      \n      英語は中学生の時に始めました。中学生の時から勉強しています。これは学校の先生です。英語は、中学、高校、大学の授業で勉強しました。\n      \n      そして大学生の時、大学３年生の時、オーストラリアに留学しました。１０ヶ月間オーストラリアに住んでいました。なので私は英語を喋ることができます。英語が喋れます。\n      \n      韓国語は、大学で、大学の授業で２年間勉強しました。\n      \n      それから、それ以来、勉強したりやめたり、勉強したりやめたり、勉強したりやめたりを、何度も何度も繰り返しています。なので韓国語はあまり喋れません。少しだけ喋れます。\n      \n      最近また韓国語の勉強を始めました。時々韓国のドラマを観ます。ネットフリックスで韓国のドラマを観たりユーチューブで韓国語の動画を観たりします。\n      \n      それから、毎日ポッドキャストを聞いています。スマートフォンで、スマホで、毎日ポッドキャストを聞いています。\n      \n      それから、韓国語の絵本も読んでいます。これは絵本です。子供が読む本です。子供向けの本です。絵本を読んで韓国語を練習しています。\n      \n      韓国語がもっと上手になりたいです。もっと話せるようになりたいです。頑張ります！皆さんも日本語の勉強を頑張ってください！\n      \n      今日は外国語の勉強の話をしました。\n      \n      おしまい。またね！",
      transcript_furigana: "これは　日本語にほんごです。\n\n      これは　英語えいごです。\n      \n      これは　中国語ちゅうごくご、　韓国語かんこくご、　そして　スペイン語すぺいんごです。\n      \n      皆みなさんは　何語なにごを　話はなしますか。\n      \n      私わたしは　日本人にほんじんです。\n      \n      日本にほんで　生うまれた　日本生にほんうまれの　日本人にほんじんです。\n      \n      私わたしの　両親りょうしん、　私わたしの　お父とうさんと　お母かあさんも　日本人にほんじんです。\n      \n      なので　私わたしは　日本語にほんごを　話はなします。\n      \n      子供こどもの時ときから　ずーっと　日本語にほんごを　話はなしています。\n      \n      日本語にほんごは　私わたしの　母語ぼごです。\n      \n      英語えいごや　中国語ちゅうごくご、　韓国語かんこくご、　スペイン語すぺいんごは　私わたしにとって　外国語がいこくごです。\n      \n      自分じぶんの　国くにの　言葉ことばでは　ありません。\n      \n      外国がいこくの　言葉ことばです。\n      \n      なので　外国語がいこくごと　いいます。\n      \n      皆みなさんにとって　日本語にほんごは　外国語がいこくごですね。\n      \n      皆みなさんは　日本語にほんごを　勉強べんきょうしていますね。\n      \n      日本語にほんごの　勉強べんきょうは　好すきですか。\n      \n      楽たのしいですか。\n      \n      私わたしは　外国語がいこくごの　勉強べんきょうが　好すきです。　\n      \n      外国語がいこくごを　勉強べんきょうするのは　楽たのしいです。\n      \n      私わたしは　英語えいごと　韓国語かいこくごを　勉強べんきょうしています。\n      \n      英語えいごは　中学生ちゅうがくせいの時ときに　始はじめました。\n      \n      中学生ちゅうがくせいの時ときから　勉強べんきょうしています。\n      \n      これは　学校がっこうの　先生せんせいです。\n      \n      英語えいごは　中学ちゅうがく、　高校こうこう、　大学だいがくの　授業じゅぎょうで　勉強べんきょうしました。\n      \n      そして　大学生だいがくせいの時とき、　大学３年生だいがくさんねんせいの時とき、　オーストラリアおーすとらりあに　留学りゅうがくしました。\n      \n      １０ヶ月間じゅっかげつかん　オーストラリアおーすとらりあに　住すんでいました。\n      \n      なので　私わたしは　英語えいごを　喋しゃべることが　できます。\n      \n      英語えいごが　喋しゃべれます。\n      \n      韓国語かんこくごは　大学だいがくで、　大学だいがくの　授業じゅぎょうで　２年間にねんかん　勉強べんきょうしました。\n      \n      それから、　それ以来いらい　勉強べんきょうしたり　やめたり　勉強べんきょうしたり　やめたり　勉強べんきょうしたり　やめたりを　何度なんども　何度なんども　繰くり返かえしています。\n      \n      なので　韓国語かんこくごは　あまり　喋しゃべれません。\n      \n      少すこしだけ　喋しゃべれます。\n      \n      最近さいきん　また　韓国語かんこくごの　勉強べんきょうを　始はじめました。\n      \n      時々ときどき　韓国かんこくの　ドラマどらまを　観みます。\n      \n      ネットフリックスねっとふりっくすで　韓国かんこくの　ドラマどらまを　観みたり　ユーチューブゆーちゅーぶで　韓国語かんこくごの　動画どうがを　観みたりします。\n      \n      それから　毎日まいにち　ポッドキャストぽっどきゃすとを　聞きいています。\n      \n      スマートフォンすまーとふぉんで、　スマホすまほで　毎日まいにち　ポッドキャストぽっどきゃすとを　聞きいています。\n      \n      それから　韓国語かんこくごの　絵本えほんも　読よんでいます。\n      \n      これは　絵本えほんです。\n      \n      子供こどもが　読よむ　本ほんです。\n      \n      子供向こどもむけの　本ほんです。\n      \n      絵本えほんを　読よんで　韓国語かんこくごを　練習れんしゅうしています。\n      \n      韓国語かんこくごが　もっと　上手じょうずになりたいです。\n      \n      もっと　話はなせるように　なりたいです。\n      \n      頑張がんばります。\n      \n      皆みなさんも　日本語にほんごの　勉強べんきょうを　頑張がんばってください。\n      \n      今日きょうは　外国語がいこくごの　勉強べんきょうの　話はなしを　しました。\n      \n      おしまい。\n      \n      またね！"
  },
  {
      title: "雨の日 Rainy Day",
      url: "https://cijapanese.com/rainy-day/",
      level: "beginner",
      membership: "free",
      transcript: "私は日本の福岡に住んでいます。日本の福岡に住んでいます。\n\n      今日は２０２１年２月１日です。今日、福岡では雨が降っています。今日の福岡の天気は雨です。晴れていません。天気が悪いです。雨が降っています。\n      \n      皆さんの住んでいる場所の天気はどうですか？晴れですか？曇りですか？雨ですか？それとも雪ですか？\n      \n      今、夕方です。福岡では朝から今までずーっと、雨が降ったり止んだり降ったり止んだりしています。\n      \n      雨の日、好きですか？私は、あまり好きではありません。\n      \n      雨の日には何が必要ですか？雨の日には何が要りますか？これは傘です。雨の日には傘が必要です。雨の日には傘を持って出かけます。傘をさして出かけます。\n      \n      私の子供はまだ小さいです。６歳と１歳です。まだ上手に傘をさせません。娘はまだ傘を自分でさすことができません。\n      \n      息子に傘を渡すと、息子が傘を持つと、くるくる〜と、くるくる〜と、傘を回して遊びます。傘をささずに傘で遊びます。そして濡れます。びしょびしょになります。\n      \n      なので子どもたちは傘はさしません。傘の代わりにレインコートを着ます。傘をささずに、傘をさすかわりに、レインコートを着ます。それから長靴を履きます。これは長靴です。\n      \n      これは水たまりです。雨が降ると水たまりができます。道路にたくさん水たまりができます。\n      \n      子どもたちは水たまりに入ります。私は「だめ！」と言います。「水たまりを避けて。水たまりを避けて歩いて。」と言います。\n      \n      でも子どもたちは聞きません。私の話を聞きません。水たまりに入りたいです。そして、ぴょんぴょんぴょん、ジャンプします。水たまりに入ってジャンプします。\n      \n      これは普通の靴です。普通の靴だと足が濡れてしまいます。足がびしょびしょになります。なので長靴を履きます。\n      \n      今日は雨の日のお話をしました。\n      \n      おしまい。またね！",
      transcript_furigana: "私わたしは　日本にほんの　福岡ふくおかに　住すんでいます。\n\n      日本にほんの　福岡ふくおかに　住すんでいます。\n      \n      今日きょうは　２０２１年２月１日にせんにじゅういちねんにがつついたちです。\n      \n      今日きょう　福岡ふくおかでは　雨あめが　降ふっています。\n      \n      今日きょうの　福岡ふくおかの　天気てんきは　雨あめです。\n      \n      晴はれていません。\n      \n      天気てんきが　悪わるいです。\n      \n      雨あめが　降ふっています。\n      \n      皆みなさんの　住すんでいる　場所ばしょの　天気てんきは　どうですか。\n      \n      晴はれですか。\n      \n      曇くもりですか。\n      \n      雨あめですか。\n      \n      それとも　雪ゆきですか。\n      \n      今いま　夕方ゆうがたです。\n      \n      福岡ふくおかでは　朝あさから　今いままで　ずーっと　雨あめが　降ふったり　止やんだり　降ふったり　止やんだりしています。\n      \n      雨あめの日ひ　好すきですか。\n      \n      私は　あまり　好すきではありません。\n      \n      雨あめの日ひには　何なにが　必要ひつようですか。\n      \n      雨あめの日ひには　何なにが　要いりますか。\n      \n      これは　傘かさです。\n      \n      雨あめの日ひには　傘かさが　必要ひつようです。\n      \n      雨あめの日ひには　傘かさを　持もって　出でかけます。\n      \n      傘かさを　さして　出でかけます。\n      \n      私わたしの　子供こどもは　まだ　小ちいさいです。\n      \n      ６歳ろくさいと　１歳いっさいです。\n      \n      まだ　上手じょうずに　傘かさを　させません。\n      \n      娘むすめは　まだ　傘かさを　自分じぶんで　さすことが　できません。\n      \n      息子むすこに　傘かさを　渡わたすと　息子むすこが　傘かさを　持もつと　くるくる〜と　くるくる〜と　傘かさを　回まわして　遊あそびます。\n      \n      傘かさを　ささずに　傘かさで　遊あそびます。\n      \n      そして　濡ぬれます。\n      \n      びしょびしょに　なります。\n      \n      なので　子供こどもたちは　傘かさは　さしません。\n      \n      傘かさの　代かわりに　レインコートれいんこーとを　着きます。\n      \n      傘かさを　ささずに　傘かさを　さす　代かわりに　レインコートれいんこーとを　着きます。\n      \n      それから　長靴ながぐつを　履はきます。\n      \n      これは　長靴ながぐつです。\n      \n      これは　水みずたまりです。\n      \n      雨あめが　降ふると　水みずたまりが　できます。\n      \n      道路どうろに　たくさん　水みずたまりが　できます。\n      \n      子供こどもたちは　水みずたまりに　入はいります。\n      \n      私わたしは　「だめ！」と　言いいます。\n      \n      「水みずたまりを　避よけて。　水みずたまりを　避よけて　歩あるいて。」と　言いいます。\n      \n      でも　子供こどもたちは　聞ききません。\n      \n      私わたしの　話はなしを　聞ききません。\n      \n      水みずたまりに　入はいりたいです。\n      \n      そして　ぴょんぴょんぴょん　ジャンプじゃんぷします。\n      \n      水みずたまりに　入はいって　ジャンプじゃんぷします。\n      \n      これは　普通ふつうの　靴くつです。\n      \n      普通ふつうの　靴くつだと　足あしが　濡ぬれてしまいます。\n      \n      足あしが　びしょびしょに　なります。\n      \n      なので　長靴ながぐつを　履はきます。\n      \n      今日きょうは　雨あめの日ひの　お話はなしをしました。\n      \n      おしまい。　またね。"
  },
  {
      title: "私の町 My Town",
      url: "https://cijapanese.com/my-town/",
      level: "beginner",
      membership: "free",
      transcript: "これは地図です。私が住んでいる町の地図です。\n\n      これは私の家です。今日は私の家の周りを紹介します。私の家の近くにあるものを紹介します。\n      \n      私の家の周りは家がたくさんあります。住宅地です。隣はマンションです。背の高いマンションが隣にあります。\n      \n      これは向かいの家です。向かいの家には犬がいます。いつもワンワン！と犬の鳴き声が聞こえます。\n      \n      家の前の道をまっすぐ、まっすぐ行きます。角を右に曲がります。少し行くとコンビニがあります。\n      \n      コンビニの向かいには学校があります。学校の隣にはバス停があります。もう少しまっすぐ行くとスーパーがあります。私はよくここで買い物をします。\n      \n      この角を左に曲がります。左に曲がります。そして右に曲がります。しばらく行くと駅があります。電車の駅があります。\n      \n      駅の周りには色々なものがあります。駅の近くにはコンビニがあります。銀行もあります。郵便局もあります。\n      \n      この道をずーっとまっすぐ行くと海があります。とても景色がいいです。時々家族で海に行きます。海に散歩に行きます。\n      \n      私の家から小学校までは５分くらいです。歩いて５分くらいかかります。家から駅までも５分くらいです。歩いて５分くらいかかります。家から海までは１０分くらいです。歩いて１０分くらいかかります。\n      \n      今日は私の家の周りを紹介しました。\n      \n      とても住みやすい良い場所です。お店や学校や駅が近くにあります。遠くありません。近いです。とても便利です。私はこの町が好きです。この町を気に入っています。\n      \n      皆さんの家の周りには何がありますか？\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "これは　地図ちずです。\n\n      私わたしが　住すんでいる　町まちの　地図ちずです。\n      \n      これは　私わたしの　家いえです。\n      \n      今日きょうは　私わたしの　家いえの　周まわりを　紹介しょうかいします。\n      \n      私わたしの　家いえの　近ちかくに　あるものを　紹介しょうかいします。\n      \n      私わたしの　家いえの　周まわりは　家いえが　たくさん　あります。\n      \n      住宅地じゅうたくちです。\n      \n      隣となりは　マンションまんしょんです。\n      \n      背せの　高たかい　マンションまんしょんが　隣となりに　あります。\n      \n      これは　向むかいの　家いえです。\n      \n      向むかいの　家いえには　犬いぬが　います。\n      \n      いつも　ワンワン！わんわんと　犬いぬの　鳴なき声ごえが　聞きこえます。\n      \n      家いえの　前まえの　道みちを　まっすぐ　まっすぐ　行いきます。\n      \n      角かどを　右みぎに　曲まがります。\n      \n      少すこし　行いくと　コンビニこんびにが　あります。\n      \n      コンビニこんびにの　向むかいには　学校がっこうが　あります。\n      \n      学校がっこうの　隣となりには　バス停ばすていが　あります。\n      \n      もう少すこし　まっすぐ　行いくと　スーパーすーぱーが　あります。\n      \n      私わたしは　よく　ここで　買かい物ものをします。\n      \n      この　角かどを　左ひだりに　曲まがります。\n      \n      左ひだりに　曲まがります。\n      \n      そして　右みぎに　曲まがります。\n      \n      しばらく　行いくと　駅えきが　あります。\n      \n      電車でんしゃの　駅えきが　あります。\n      \n      駅えきの　周まわりには　色々いろいろなものが　あります。\n      \n      駅えきの　近ちかくには　コンビニこんびにが　あります。\n      \n      銀行ぎんこうも　あります。\n      \n      郵便局ゆうびんきょくも　あります。\n      \n      この　道みちを　ずーっと　まっすぐ　行いくと　海うみが　あります。\n      \n      とても　景色けしきが　いいです。\n      \n      時々ときどき　家族かぞくで　海うみに　行いきます。\n      \n      海うみに　散歩さんぽに　行いきます。\n      \n      私わたしの　家いえから　小学校しょうがっこうまでは　５分ごふんくらいです。\n      \n      歩あるいて　５分ごふんくらい　かかります。\n      \n      家いえから　駅えきまでも　５分ごふんくらいです。\n      \n      歩あるいて　５分ごふんくらい　かかります。\n      \n      家いえから　海うみまでは　１０分じゅっぷんくらいです。\n      \n      歩あるいて　１０分じゅっぷんくらい　かかります。\n      \n      今日きょうは　私わたしの　家いえの　周まわりりを　紹介しょうかいしました。\n      \n      とても　住すみやすい　良いい　場所ばしょです。\n      \n      お店みせや　学校がっこうや　駅えきが　近ちかくに　あります。\n      \n      遠とおくありません。\n      \n      近ちかいです。\n      \n      とても　便利べんりです。\n      \n      私わたしは　この　町まちが　好すきです。\n      \n      この　町まちを　気きに入いっています。\n      \n      皆みなさんの　家いえの　周まわりには　何なにが　ありますか。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "動物当てクイズ② Animal Guessing Game#2",
      url: "https://cijapanese.com/animal-guessing-game2/",
      level: "beginner",
      membership: "free",
      transcript: "今日はクイズをしましょう。\n\n      これは動物です。猫、ウサギ、象、動物の仲間です。動物のクイズをします。\n      \n      私がヒントを言います。ヒントを出します。考えてください。私がヒントを言うので、答えを考えてください。\n      \n      第一問、最初の問題です。\n      \n      これは草です。草がたくさんあります。草原です。この動物は草原に住んでいます。\n      \n      この動物は肉を食べます。これは肉です。この動物は草は食べません。肉を食べます。草ではなく肉を食べます。\n      \n      この動物は強いです。とっても強いです。動物の中で一番強いです。動物の王様と呼ばれています。\n      \n      何でしょう？正解はライオンです。\n      \n      第２問\n      \n      この動物はオーストラリアにたくさん住んでいます。\n      \n      これはお腹です。この動物はお腹に袋があります。赤ちゃんです。お母さんです。この動物の赤ちゃんはお母さんのお腹の袋の中にいます。\n      \n      この動物はジャンプします。ぴょーんぴょーんぴょんと飛び跳ねます。\n      \n      何でしょう？正解はカンガルーです。\n      \n      第３問\n      \n      この動物は小さいです。大きくありません。とても小さいです。うさぎよりも小さいです。\n      \n      この動物はしっぽが長いです。しっぽが長いです。\n      \n      ネズミに似ています。ネズミの仲間です。\n      \n      ペットとして、家で買うペットとして人気があります。ペットとして人気の動物です。\n      \n      何でしょう？正解はハムスターです。\n      \n      第４問、最後の問題です。\n      \n      この動物も草原に住んでいます。ライオンと同じです。草原に住んでいます。\n      \n      この動物は草を食べます。ライオンとは違います。肉は食べません。草を食べます。\n      \n      この動物は馬に似ています。馬の仲間です。\n      \n      この動物はしましまです。縞模様です。水玉模様ではありません。縞模様です。\n      \n      何でしょう？正解はシマウマです。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　クイズくいずを　しましょう。\n\n      これは　動物どうぶつです。\n      \n      猫ねこ、　ウサギうさぎ、　象ぞう、　動物どうぶつの　仲間なかまです。\n      \n      動物どうぶつの　クイズくいずを　します。\n      \n      私わたしが　ヒントひんとを　言いいます。\n      \n      ヒントひんとを　出だします。\n      \n      考かんがえてください。\n      \n      私わたしが　ヒントひんとを　言いうので　答こたえを　考かんがえてください。\n      \n      第１問だいいちもん　最初さいしょの　問題もんだいです。\n      \n      これは　草くさです。\n      \n      草くさが　たくさん　あります。\n      \n      草原そうげんです。\n      \n      この　動物どうぶつは　草原そうげんに　住すんでいます。\n      \n      この　動物どうぶつは　肉にくを　食たべます。\n      \n      これは　肉にくです。\n      \n      この　動物どうぶつは　草くさは　食たべません。\n      \n      肉にくを　食たべます。\n      \n      草くさではなく　肉にくを　食たべます。\n      \n      この　動物どうぶつは　強つよいです。\n      \n      とっても　強つよいです。\n      \n      動物どうぶつの　中なかで　一番いちばん　強つよいです。\n      \n      動物どうぶつの　王様おうさまと　呼よばれています。\n      \n      何なんでしょう。\n      \n      正解せいかいは　ライオンらいおんです。\n      \n      第２問だいにもん\n      \n      この　動物どうぶつは　オーストラリアおーすとらりあに　たくさん　住すんでいます。\n      \n      これは　お腹なかです。\n      \n      この　動物どうぶつは　お腹なかに　袋ふくろが　あります。\n      \n      赤あかちゃんです。\n      \n      お母かあさんです。\n      \n      この　動物どうぶつの　赤あかちゃんは　お母かあさんの　お腹なかの　袋ふくろの　中なかに　います。\n      \n      この　動物どうぶつは　ジャンプじゃんぷします。\n      \n      ぴょーん　ぴょーん　ぴょんと　飛とび跳はねます。\n      \n      何なんでしょう。\n      \n      正解せいかいは　カンガルーかんがるーです。\n      \n      第３問だいさんもん\n      \n      この　動物どうぶつは　小ちいさいです。\n      \n      大おおきくありません。\n      \n      とても　小ちいさいです。\n      \n      うさぎよりも　小ちいさいです。\n      \n      うさぎよりも　小ちいさいです。\n      \n      この　動物どうぶつは　しっぽが　長ながいです。\n      \n      しっぽが　長ながいです。\n      \n      ネズミねずみに　似にています。\n      \n      ネズミねずみの　仲間なかまです。\n      \n      ペットぺっととして　家いえで　買かう　ペットぺっととして　人気にんきが　あります。\n      \n      ペットぺっととして　人気にんきの　動物どうぶつです。\n      \n      何なんでしょう。\n      \n      正解せいかいは　ハムスターはむすたーです。\n      \n      第４問だいよんもん　最後さいごの　問題もんだいです。\n      \n      この　動物どうぶつも　草原そうげんに　住すんでいます。\n      \n      ライオンらいおんと　同おなじです。\n      \n      草原そうげんに　住すんでいます。\n      \n      この　動物どうぶつは　草くさを　食たべます。\n      \n      ライオンらいおんとは　違ちがいます。\n      \n      肉にくは　食たべません。\n      \n      草くさを　食たべます。\n      \n      この　動物どうぶつは　馬うまに　似にています。\n      \n      馬うまの　仲間なかまです。\n      \n      この　動物どうぶつは　しましまです。\n      \n      縞模様しまもようです。\n      \n      水玉模様みずたまもようでは　ありません。\n      \n      縞模様しまもようです。\n      \n      何なんでしょう。\n      \n      正解せいかいは　シマウマしまうまです。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "コロナウイルス対策 Measures Against COVID-19",
      url: "https://cijapanese.com/measures-against-covid-19/",
      level: "beginner",
      membership: "free",
      transcript: "これは何ですか？これはコロナウイルスです。\n\n      今２０２１年です。今、世界中でコロナウイルスが流行っていますね。世界中でコロナウイルスが広がっていますね。怖いですね。\n      \n      コロナウイルスと戦うために、コロナウイルスを予防するため、防ぐために何をしていますか。\n      \n      今日は日本で多くの人が気をつけていることをお話します。日本でみんなが気をつけていることを紹介します。\n      \n      １つ目。これは家です。家から出る時、外に出るときは、マスクをします。必ずマスクをして出かけます。\n      \n      人と会う時は必ずマスクをします。人と話す時は絶対にマスクをします。\n      \n      ２つ目、気をつけていること２つ目。\n      \n      家に帰ってきたら、外から戻ったら、必ず手を洗います。ゴシゴシ、石鹸で手を洗います。よーく、丁寧に丁寧に洗います。\n      \n      それからうがいをします。コップに水を入れて、ガラガラガラとうがいをします。\n      \n      気をつけていること３つ目。\n      \n      混んでいる場所、人が多い場所には行きません。人がたくさんいる場所には行きません。\n      \n      気をつけていること４つ目。\n      \n      テイクアウトをします。お店に行きます。これはお金です。お店で食べ物を買います。お金を払って食べ物を買います。家に帰ります。家で食べます。お店でテイクアウトして家で食べます。\n      \n      またはデリバリーを頼みます。宅配を頼みます。お店に電話します。電話で注文します。お店の人に注文した食べ物を持ってきてもらいます。宅配してもらいます。そして家で食べます。\n      \n      日本では多くの人がこの４つを気をつけています。皆さんの国ではどうですか。何をしていますか。\n      \n      今日はこれでおしまいです。またね！",
      transcript_furigana: "これは　何なんですか。\n\n      これは　コロナウイルスころなういるすです。\n      \n      今いま　２０２１年にせんにじゅういちねんです。\n      \n      今いま　世界中せかいじゅうで　コロナウイルスころなういるすが　流行はやっていますね。\n      \n      世界中せかいじゅうで　コロナウイルスころなういるすスが　広ひろがっていますね。\n      \n      怖こわいですね。\n      \n      コロナウイルスころなういるすと　戦たたかうために、　コロナウイルスころなういるすを　予防よぼうするため、　防ふせぐために、　何なにをしていますか。\n      \n      今日きょうは　日本にほんで　多おおくの　人ひとが　気きをつけていることを　お話はなしします。\n      \n      日本にほんで　みんなが　気きをつけていることを　紹介しょうかいします。\n      \n      １ひとつ目め。\n      \n      これは　家いえです。\n      \n      家いえから　出でる時とき　外そとに　出でる時ときは　マスクますくをします。\n      \n      必かならず　マスクますくをして　出でかけます。\n      \n      人ひとと　会あう時ときは　必かならず　マスクますくをします。\n      \n      人ひとと　話はなす時ときは　絶対ぜったいに　マスクますくをします。\n      \n      ２ふたつ目め。　気きをつけていること　２ふたつ目め。\n      \n      家いえに　帰かえってきたら、　外そとから　戻もどったら　必かならず　手てを　洗あらいます。\n      \n      ゴシゴシごしごし　石鹸せっけんで　手てを　洗あらいます。\n      \n      よーく　丁寧ていねいに　丁寧ていねいに　洗あらいます。\n      \n      それから　うがいを　します。\n      \n      コップこっぷに　水みずを　入いれて　ガラガラガラがらがらがらと　うがいをします。\n      \n      気きをつけていること　３みっつ目め。\n      \n      混こんでいる場所ばしょ、　人ひとが　多おおい場所ばしょには　行いきません。\n      \n      人ひとが　たくさん　いる場所ばしょには　行いきません。\n      \n      気きをつけていること　４よっつ目め。\n      \n      テイクアウトていくあうとをします。\n      \n      お店みせに　行いきます。\n      \n      これは　お金かねです。\n      \n      お店みせで　食たべ物ものを　買かいます。\n      \n      お金かねを　払はらって　食たべ物ものを　買かいます。\n      \n      家いえに　帰かえります。\n      \n      家いえで　食たべます。\n      \n      お店みせで　テイクアウトていくあうとして　家いえで　食たべます。\n      \n      または　デリバリーでりばりーを　頼たのみます。\n      \n      宅配たくはいを　頼たのみます。\n      \n      お店みせに　電話でんわします。\n      \n      電話でんわで　注文ちゅうもんします。\n      \n      お店みせの　人ひとに　注文ちゅうもんした　食たべ物ものを　持もってきてもらいます。\n      \n      宅配たくはいしてもらいます。\n      \n      そして　家いえで　食たべます。\n      \n      日本にほんでは　多おおくの　人ひとが　この　４よっつを　気きをつけています。\n      \n      皆みなさんの　国くにでは　どうですか。\n      \n      何なにをしていますか。\n      \n      今日きょうは　これで　おしまいです。\n      \n      またね！"
  },
  {
      title: "山登り Mountain Climbing",
      url: "https://cijapanese.com/mountain-climbing/",
      level: "beginner",
      membership: "free",
      transcript: "これは山です。今日は２月８日月曜日です。昨日は２月７日日曜日でした。昨日はいい天気でした。\n\n      これは私です。これは私の息子です。\n      \n      昨日息子と二人で、息子と私二人で山登りをしました。山に登りました。登山をしました。\n      \n      これは私達の家です。家から車で３０分の場所にある山です。家から山まで車で３０分です。\n      \n      この山の高さは２００メートルくらいです。高い山ではありません。低い山です。\n      \n      山の下から上まで１時間位かかります。上から下までは３０分位かかります。上りは１時間、下りは３０分です。\n      \n      息子は前に、以前に、お父さんと一緒に、お父さんと二人でこの山に登りました。息子はお父さんと前に登ったことがあります。息子は昨日が２回目でした。私は昨日が１回目でした。初めてでした。\n      \n      なので私はとても疲れました。少し登って休憩、少し登って休憩、また少し登って休憩、と何回も休憩しながら登りました。\n      \n      山の上で、山の頂上でお昼ごはんを食べました。朝、昼、夜。お昼ごはんを食べました。\n      \n      山のすぐ近くに海があります。すぐそばに海があります。山の上から海が見えます。とても綺麗でした。海が綺麗でした。いい景色でした。\n      \n      私はすごく疲れました。すごく疲れたので昨日の夜はよーく寝ました。ぐっすり寝ました。すごく疲れていたのでたくさん寝ました。\n      \n      今日は足が痛いです。ここは膝です。足が痛いです。特に膝が痛いです。\n      \n      でも山登りはとっても楽しかったです。いつかまた行きたいです。\n      \n      今日は山登りのお話をしました。\n      \n      おしまい。",
      transcript_furigana: "これは　山やまです。\n\n      今日きょうは　２月８日にがつようか　月曜日げつようびです。\n      \n      昨日きのうは　２月７日にがつなのか　日曜日にちようびでした。\n      \n      昨日きのうは　いい　天気てんきでした。\n      \n      これは　私わたしです。\n      \n      これは　私わたしの　息子むすこです。\n      \n      昨日きのう　息子むすこと　二人ふたりで、　息子むすこと　私わたし　二人ふたりで　山登やまのぼりを　しました。\n      \n      山やまに　登のぼりました。\n      \n      登山とざんを　しました。\n      \n      これは　私達わたしの　家いえです。\n      \n      家いえから　車くるまで　３０分さんじゅっぷんの　場所ばしょに　ある　山やまです。\n      \n      家いえから　山やままで　車くるまで　３０分さんじゅっぷんです。\n      \n      この　山やまの　高たかさは　２００メートルにひゃくめーとる　くらいです。\n      \n      高たかい　山やまではありません。\n      \n      低い　山やまです。\n      \n      山やまの　下したから　上うえまで　１時間位いちじかんくらい　かかります。\n      \n      上いえから　下したまでは　３０分位さんじゅっぷんくらい　かかります。\n      \n      上のぼりは　１時間いちじかん、　下くだりは　３０分さんじゅっぷんです。\n      \n      息子むすこは　前まえに、　以前いぜんに　お父とうさんと　一緒いっしょに、　お父とうさんと　二人ふたりで　この　山やまに　登のぼりました。\n      \n      息子むすこは　お父とうさんと　前まえに　登のぼったことがあります。\n      \n      息子むすこは　昨日きのうが　２回目にかいめでした。\n      \n      私わたしは　昨日わたしが　１回目いっかいめでした。\n      \n      初はじめてでした。\n      \n      なので　私わたしは　とても　疲つかれました。\n      \n      少すこし　登のぼって　休憩きゅうけい、　少すこし　登のぼって　休憩きゅうけい、　また　少すこし　登のぼって　休憩きゅうけいと　何回なんかいも　休憩きゅうけいしながら　登のぼりました。\n      \n      山やまの　上うえで、　山やまの　頂上ちょうじょうで　お昼ひるごはんを　食たべました。\n      \n      朝あさ　昼ひる　夜よる　お昼ひるごはんを　食たべました。\n      \n      山やまの　すぐ　近ちかくに　海うみが　あります。\n      \n      すぐ　そばに　海うみが　あります。\n      \n      山やまの　上うえから　海うみが　見みえます。\n      \n      とても　綺麗きれいでした。\n      \n      海うみが　綺麗きれいでした。\n      \n      いい　景色けしきでした。\n      \n      私わたしは　すごく　疲つかれました。\n      \n      すごく　疲つかれたので　昨日きのうの　夜よるは　よーく　寝ねました。\n      \n      ぐっすり　寝ねました。\n      \n      すごく　疲つかれていたので　たくさん　寝ねました。\n      \n      今日きょうは　足あしが　痛いたいです。\n      \n      ここは　膝ひざです。\n      \n      足あしが　痛いたいです。\n      \n      特とくに　膝ひざが　痛いたいです。\n      \n      でも　山登やまのぼりは　とっても　楽たのしかったです。\n      \n      いつか　また　行いきたいです。\n      \n      今日きょうは　山登やまのぼりの　お話はなしをしました。\n      \n      おしまい。"
  },
  {
      title: "間違い探し① Spot the Difference",
      url: "https://cijapanese.com/spot-the-difference/",
      level: "complete beginner",
      membership: "free",
      transcript: "今日は間違い探しをしましょう。\n\n      絵があります。絵が１枚、２枚。２枚あります。２枚の絵を比べましょう。\n      \n      この２枚の絵は似ています。でも少し違います。違うところが６つあります。探しましょう。\n      \n      左の絵を見てください。テーブルがあります。テーブルの上に猫がいます。右の絵を見てください。猫はどこにいますか？テーブルの上にはいません。テーブルの下にいます。\n      \n      左の絵を見てください。窓が開いています。窓が開いています。右の絵を見てください。窓は開いていますか？いいえ、窓は閉まっています。閉じています。開いていません。\n      \n      左の絵を見てください。テーブルの上にりんごが２つあります。１つ、２つ。２つりんごがあります。右の絵を見てください。テーブルの上にりんごはいくつありますか？１つ、２つ、３つ。３つあります。\n      \n      左の絵を見てください。テーブルの上にフォークがあります。右の絵を見てください。フォークはありますか？いいえ、フォークはありません。スプーンがあります。フォークではなくスプーンがあります。\n      \n      左の絵を見てください。テーブルの上に赤いコップがあります。右の絵を見てください。テーブルの上には何色のコップがありますか？青いコップがあります。赤いコップではありません。青いコップがあります。\n      \n      左の絵を見てください。時計を見てください。何時ですか？３時です。右の絵の時計を見てください。何時ですか？９時です。\n      \n      違いはいくつありましたか？１，２，３，４，５、６。全部で６つありました。\n      \n      今日は間違い探しをしました。今日はこれでおしまい。",
      transcript_furigana: "今日きょうは　間違まちがい探さがしを　しましょう。\n\n      絵えが　あります。\n      \n      絵えが　１枚いちまい、　２枚にまい、　２枚にまい　あります。\n      \n      ２枚にまいの　絵えを　比くらべましょう。\n      \n      この　２枚にまいの　絵えは　似にています。\n      \n      でも　少すこし　違ちがいます。\n      \n      違ちがうところが　６むっつ　あります。\n      \n      探さがしましょう。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      テーブルてーぶるが　あります。\n      \n      テーブルてーぶるの　上うえに　猫ねこが　います。\n      \n      右みぎの　絵えを　見みてください。\n      \n      猫ねこは　どこに　いますか。\n      \n      テーブルてーぶるの　上うえには　いません。\n      \n      テーブルてーぶるの　下したに　います。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      窓まどが　開あいています。\n      \n      窓まどが　開あいています。\n      \n      右みぎの　絵えを　見みてください。\n      \n      窓まどは　開あいていますか。\n      \n      いいえ　窓まどは　閉しまっています。\n      \n      閉とじています。\n      \n      開あいていません。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      テーブルてーぶるの　上うえに　りんごが　２ふたつ　あります。\n      \n      １ひとつ　２ふたつ。　２ふたつ　りんごが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      テーブルてーぶるの　上うえに　りんごは　いくつ　ありますか。\n      \n      １ひとつ　２ふたつ　３みっつ。　３みっつ　あります。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      テーブルてーぶるの　上うえに　フォークふぉーくが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      フォークふぉーくは　ありますか。\n      \n      いいえ　フォークふぉーくは　ありません。\n      \n      スプーンすぷーんが　あります。\n      \n      フォークふぉーくではなく　スプーンすぷーんが　あります。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      テーブルてーぶるの　上うえに　赤あかい　コップこっぷが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      テーブルてーぶるの　上うえには　何色なにいろの　コップこっぷが　ありますか。\n      \n      青あおい　コップこっぷが　あります。\n      \n      赤あかい　コップこっぷではありません。\n      \n      青あおい　コップこっぷが　あります。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      時計とけいを　見みてください。\n      \n      何時なんじですか。\n      \n      ３時さんじです。\n      \n      右みぎの　絵えの　時計とけいを　見みてください。\n      \n      何時なんじですか。\n      \n      ９時くじです。\n      \n      違ちがいは　いくつ　ありましたか。\n      \n      １いち　２に　３さん　４し　５ご　６ろく。\n      \n      全部ぜんぶで　６むっつ　ありました。\n      \n      今日きょうは　間違まちがい探さがしを　しました。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "日本のバレンタイン Valentine’s Day in Japan",
      url: "https://cijapanese.com/valentines-day-in-japan/",
      level: "beginner",
      membership: "free",
      transcript: "今日は２月１３日です。明日は２月１４日です。２月１４日は何の日ですか。明日２月１４日はバレンタインです。\n\n      今日は日本のバレンタインを紹介します。\n      \n      皆さんの国ではバレンタインの日に何をしますか。日本のバレンタインは他の国の、外国のバレンタインとは少し違います。ちょっと違います。\n      \n      これは男の人です。男性です。これは女の人です。女性です。\n      \n      皆さんの国では、バレンタインの日に男性が女性にプレゼントをあげますか。女性が男性にプレゼントをあげますか？それとも、お互いにプレゼントを交換しますか？\n      \n      日本では女性が男性にプレゼントをあげます。女性が男性にプレゼントを渡します。\n      \n      皆さんの国では何をプレゼントしますか。これは花です。花束をあげますか。それともメッセージカードをあげますか。\n      \n      日本ではチョコレートをプレゼントします。チョコレートのケーキやお菓子をあげます。\n      \n      これは恋人同士です。彼氏です。彼女です。彼女から彼氏へチョコレートをあげます。\n      \n      この男性とこの女性は、恋人同士ではありません。女性は男性のことが好きです。女性から好きな男性にチョコレートをあげます。「好きです。」と伝えます。言います。\n      \n      これは学校です。友達です。学校の友達です。友達同士でもチョコレートを交換します。\n      \n      これは会社です。仕事をしています。仕事をしています。会社の人にもチョコレートを渡します。\n      \n      「いつもありがとう」「いつもありがとう」という気持ちを伝えます。\n      \n      これはお店です。チョコレートをお店で買う人もいます。自分で作る人もいます。私は今年は作りません。今年は買います。そして明日、夫と息子にあげます。\n      \n      今日は日本のバレンタインを紹介しました。\n      \n      今日はこれでおしまい。",
      transcript_furigana: "今日きょうは　２月にがつ１３日じゅうさんにちです。\n\n      明日あしたは　２月にがつ１４日じゅうよっかです。\n      \n      ２月にがつ１４日じゅうよっかは　何なんの日ひですか。\n      \n      明日あした　２月にがつ１４日じゅうよっかは　バレンタインばれんたいんです。\n      \n      今日きょうは　日本にほんの　バレンタインばれんたいんを　紹介しょうかいします。\n      \n      皆みなさんの　国くにでは　バレンタインばれんたいんの日ひに　何なにをしますか。\n      \n      日本にほんの　バレンタインばれんたいんは　他ほかの国くにの、　外国がいこくの　バレンタインばれんたいんとは　少すこし　違ちがいます。\n      \n      ちょっと　違ちがいます。\n      \n      これは　男おとこの人ひとです。\n      \n      男性だんせいです。\n      \n      これは　女おんなの人ひとです。\n      \n      女性じょせいです。\n      \n      皆みなさんの　国くにでは　バレンタインばれんたいんの日ひに　男性だんせいが　女性じょせいに　プレゼントぷれぜんとを　あげますか。\n      \n      女性じょせいが　男性だんせいに　プレゼントぷれぜんとを　あげますか。\n      \n      それとも　お互たがいに　プレゼントぷれぜんとを　交換こうかんしますか。\n      \n      日本にほんでは　女性じょせいが　男性だんせいに　プレゼントぷれぜんとを　あげます。\n      \n      女性じょせいが　男性だんせいに　プレゼントぷれぜんとを　渡わたします。\n      \n      皆みなさんの　国くにでは　何なにを　プレゼントぷれぜんとしますか。\n      \n      これは　花はなです。\n      \n      花束はなたばを　あげますか。\n      \n      それとも　メッセージカードめっせーじかーどを　あげますか。\n      \n      日本にほんでは　チョコレートちょこれーとを　プレゼントぷれぜんとします。\n      \n      チョコレートちょこれーとの　ケーキけーきや　お菓子かしを　あげます。\n      \n      これは　恋人同士こいびとどうしです。\n      \n      彼氏かれしです。\n      \n      彼女かのじょです。\n      \n      彼女かのじょから　彼氏かれしへ　チョコレートちょこれーとを　あげます。\n      \n      この男性だんせいと　この女性じょせいは　恋人同士こいびとどうしでは　ありません。\n      \n      女性じょせいは　男性だんせいのことが　好すきです。\n      \n      女性じょせいから　好すきな　男性だんせいに　チョコレートちょこれーとを　あげます。\n      \n      「好すきです」と　伝つたえます。\n      \n      言いいます。\n      \n      これは　学校がっこうです。\n      \n      友達ともだちです。\n      \n      学校がっこうの　友達ともだちです。\n      \n      友達同士ともだちどうしでも　チョコレートちょこれーとを　交換こうかんします。\n      \n      これは　会社かいしゃです。\n      \n      仕事しごとを　しています。\n      \n      仕事しごとを　しています。\n      \n      会社かいしゃの　人ひとにも　チョコレートちょこれーとを　渡わたします。\n      \n      「いつも　ありがとう。」「いつも　ありがとう。」という　気持きもちを　伝つたえます。\n      \n      これは　お店みせです。\n      \n      チョコレートちょこれーとを　お店みせで　買かう　人ひとも　います。\n      \n      自分じぶんで　作つくる　人ひとも　います。\n      \n      私わたしは　今年ことしは　作つくりません。\n      \n      今年ことしは　買かいます。\n      \n      そして　明日あした　夫おっとと　息子むすこに　あげます。\n      \n      今日きょうは　日本にほんの　バレンタインばれんたいんを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "日本の美術（富嶽三十六景） Japanese Art",
      url: "https://cijapanese.com/japanese-art/",
      level: "beginner",
      membership: "free",
      transcript: "今日は日本の美術についてお話します。\n\n      富嶽三十六景という絵を知っていますか。とても有名な日本の絵です。みんな知っているとても有名な日本の絵です。富士山の絵です。昔の絵です。\n      \n      今は2021年です。この絵は1831年から1834年の間に描かれました。19世紀に描かれた絵です。今から約200年前に描かれた昔の絵です。\n      \n      画家です。有名な画家です。名前は葛飾北斎、葛飾北斎といいます。葛飾北斎という名前の画家です。彼が富嶽三十六景を描きました。\n      \n      彼は富士山の絵をたくさん描きました。全部で46枚、全部で46種類の富士山の絵を描きました。\n      \n      富士山を近くから描いたり、遠くから描いたりしました。海から見て描いたり、町から見て描いたりしました。朝描いたり、夜描いたりしました。色々な富士山を描きました。\n      \n      今日は4つ紹介します。46枚のうち4枚の絵を紹介します。\n      \n      まず1枚目。この絵を見てください。これは一番有名な絵です。一番有名な作品です。\n      \n      富士山は遠くにあります。富士山を海から見ています。これは波です。とても高い波です。とても大きな波です。\n      \n      2枚目。これも富士山を遠くから描いた絵です。富士山はここにあります。\n      \n      川があります。川に橋がかかっています。橋の上にはたくさん人がいます。沢山の人が橋を渡っています。川には船があります。釣りをしている人もいます。魚を釣っています。\n      \n      3枚目です。この絵を見てください。沢山の人が富士山を登っています。上に上に登っています。\n      \n      4枚目。これは富士山を近くから見た絵です。\n      \n      この富士山は赤いです。赤富士といいます。富士山は普段は青いです。青く見えます。でも時々、赤く見える時があります。\n      \n      これはお日様です。太陽です。時々、太陽の光で赤く見えるときがあります。とてもきれいです。\n      \n      今日は有名な日本の絵「富嶽三十六景」を紹介しました。\n      \n      おしまい。",
      transcript_furigana: "今日きょうは　日本にほんの　美術びじゅつについて　お話はなしします。\n\n      富嶽三十六景ふがくさんじゅうろっけいという絵えを　知しっていますか。\n      \n      とても　有名ゆうめいな　日本にほんの　絵えです。\n      \n      みんな　知しっている　とても　有名ゆうめいな　日本にほんの　絵えです。\n      \n      富士山ふじさんの　絵えです。\n      \n      昔むかしの　絵えです。\n      \n      今いまは　2021年にせんにじゅういちねんです。\n      \n      この　絵えは　1831年せんはっぴゃくさんじゅういちねんから　1834年せんはっぴゃくさんじゅうよねんの間あいだに　描かかれました。\n      \n      19世紀じゅうきゅうせいきに　描かかれた　絵えです。\n      \n      今いまから　約200年前に　描かかれた　昔むかしの　絵えです。\n      \n      画家がかです。\n      \n      有名ゆうめいな　画家がかです。\n      \n      名前なまえは　葛飾北斎かつしかほくさい、　葛飾北斎かつしかほくさいと　いいます。\n      \n      葛飾北斎かつしかほくさいという　名前なまえの　画家がかです。\n      \n      彼かれが　富嶽三十六景ふがくさんじゅうろっけいを　描かきました。\n      \n      彼かれは　富士山ふじさんの　絵えを　たくさん　描かきました。\n      \n      全部ぜんぶで　46枚よんじゅうろくまい、　全部ぜんぶで　46種類よんじゅうろくしゅるいの　富士山ふじさんの　絵えを　描かきました。\n      \n      富士山ふじさんを　近ちかくから　描かいたり　遠とおくから　描かいたりしました。\n      \n      海うみから　見みて　描かいたり　町まちから　見みて　描かいたりしました。\n      \n      朝あさ　描かいたり　夜よる　描かいたりしました。\n      \n      色々いろいろな　富士山ふじさんを　描かきました。\n      \n      今日きょうは　4よっつ　紹介しょうかいします。\n      \n      46枚よんじゅうろくまいのうち　4枚よんまいの　絵えを　紹介しょうかいします。\n      \n      まず　1枚目いちまいめ。\n      \n      この　絵えを　見みてください。\n      \n      これは　一番いちばん　有名ゆうめいな　絵えです。\n      \n      一番いちばん　有名ゆうめいな　作品さくひんです。\n      \n      富士山ふじさんは　遠とおくに　あります。\n      \n      富士山ふじさんを　海うみから　見みています。\n      \n      これは　波なみです。\n      \n      とても　高たかい　波なみです。\n      \n      とても　大おおきな　波なみです。\n      \n      2枚目にまいめ。\n      \n      これも　富士山ふじさんを　遠とおくから　描かいた　絵えです。\n      \n      富士山ふじさんは　ここに　あります。\n      \n      川かわが　あります。\n      \n      川かわに　橋はしが　かかっています。\n      \n      橋はしの　上うえには　たくさん　人ひとが　います。\n      \n      沢山たくさんの　人ひとが　橋はしを　渡わたっています。\n      \n      川かわには　船ふねが　あります。\n      \n      釣つりを　している　人ひとも　います。\n      \n      魚さかなを　釣つっています。\n      \n      3枚目さんまいめです。\n      \n      この　絵えを　見みてください。\n      \n      沢山たくさんの　人ひとが　富士山ふじさんを　登のぼっています。\n      \n      上うえに　上うえに　登のぼっています。\n      \n      4枚目よんまいめ。\n      \n      これは　富士山ふじさんを　近ちかくから　見みた　絵えです。\n      \n      この　富士山ふじさんは　赤あかいです。\n      \n      赤富士あかふじと　いいます。\n      \n      富士山ふじさんは　普段ふだんは　青あおいです。\n      \n      青あおく　見みえます。\n      \n      でも　時々ときどき　赤あかく　見みえる時ときが　あります。\n      \n      これは　お日様ひさまです。\n      \n      太陽たいようです。\n      \n      時々ときどき　太陽たいようの　光ひかりで　赤あかく　見みえる時ときが　あります。\n      \n      とても　きれいです。\n      \n      今日きょうは　有名ゆうめいな　日本にほんの　絵え　「富嶽三十六景ふがくさんじゅうろっけい」を　紹介しょうかいしました。\n      \n      おしまい。"
  },
  {
      title: "海外旅行 Overseas Trip",
      url: "https://cijapanese.com/overseas-trip/",
      level: "beginner",
      membership: "free",
      transcript: "今日のテーマは海外旅行です。私は旅行が好きです。\n\n      ここは日本です。外国です。日本です。海外です。今２０２１年です。私は昔は、以前はよく海外旅行に行きました。海外旅行をよくしました。\n      \n      最近はしていません。最近は海外旅行に行っていません。\n      \n      この動画では、私がこれまでに行ったことのある国、旅行したことのある国についてお話します。\n      \n      私は２００２年に人生で初めて海外旅行をしました。人生で初めて外国に行きました。中国に行きました。\n      \n      これは私です。私の姉です。私の母です。母のお姉さんです。私のおばです。お姉ちゃんとお母さんとおばさんと私、４人で中国に行きました。\n      \n      それから今までに９つの国に行きました。\n      \n      ここはアジアです。アジアの中では、中国、韓国、タイ、ベトナム、インドネシアに行ったことがあります。\n      \n      ここはヨーロッパです。ヨーロッパの中では、イギリスとフランスに行ったことがあります。\n      \n      それからオーストラリアとニュージーランドにも行ったことがあります。\n      \n      北アメリカには行ったことがありません。南アメリカにも行ったことがありません。アフリカにも行ったことがありません。中東にも行ったことがありません。\n      \n      これはなんでしょう。これは万里の長城です。中国にあります。中国では万里の長城に登りました。\n      \n      韓国の食べ物はとても辛いです。とっても辛いです。韓国では辛い料理をたくさん食べました。\n      \n      これは象です。これは象です。タイでは象に乗りました。\n      \n      これはアオザイというベトナムの服です。ベトナムではアオザイを着ました。\n      \n      これは海です。インドネシアは海がとっても綺麗です。インドネシアでは海に行きました。\n      \n      これはビッグベンです。イギリスのロンドンにあります。イギリスではビッグベンを見ました。それからフィッシュアンドチップスを食べました。\n      \n      この絵はモナリザです。フランスのパリにあるルーブル美術館にあります。フランスではルーブル美術館に行ってモナリザの絵を見ました。\n      \n      これはコアラです。これはカンガルーです。オーストラリアではコアラやカンガルーを見ました。\n      \n      これは森です。これは湖です。自然です。ニュージーランドは自然がいっぱいです。ニュージーランドでは自然の中を歩きました。\n      \n      人生で最初の海外旅行は２００２年でした。最後の海外旅行をしたのは２０１３年です。今から８年前です。８年間海外旅行をしていません。どこにも行っていません。いつかまた、将来、海外旅行をたくさんしたいです。\n      \n      今日は私が行ったことのある国についてお話しました。おしまい。",
      transcript_furigana: "今日きょうの　テーマてーまは　海外旅行かいがいりょこうです。\n\n      私わたしは　旅行りょこうが　好すきです。\n      \n      ここは　日本にほんです。\n      \n      外国がいこくです。\n      \n      日本にほんです。\n      \n      海外かいがいです。\n      \n      今いま　２０２１年にせんにじゅういちねんです。\n      \n      私わたしは　昔むかしは　以前いぜんは　よく　海外旅行かいがいりょこうに　行いきました。\n      \n      海外旅行かいがいりょこうを　よく　しました。\n      \n      最近さいきんは　していません。\n      \n      最近さいきんは　海外旅行かいがいりょこうに　行いっていません。\n      \n      この　動画どうがでは　私わたしが　これまでに　行いったことのある国くに　旅行りょこうしたことのある国くにについて　お話はなしします。\n      \n      私わたしは　２００２年にせんにねんに　人生じんせいで　初はじめて　海外旅行かいがいりょこうを　しました。\n      \n      人生じんせいで　初はじめて　外国がいこくに　行いきました。\n      \n      中国ちゅうごくに　行いきました。\n      \n      これは　私わたしです。\n      \n      私わたしの　姉あねです。\n      \n      私わたしの　母ははです。\n      \n      母の　お姉ねえさんです。\n      \n      私わたしの　おばです。\n      \n      お姉ねえちゃんと　お母かあさんと　おばさんと　私わたし　４人よにんで　中国ちゅうごくに　行いきました。\n      \n      それから　今いままでに　９ここのつの　国くにに　行いきました。\n      \n      ここは　アジアあじあです。\n      \n      アジアあじあの　中なかでは　中国ちゅうごく　韓国かんこく　タイたい　ベトナムべとなむ　インドネシアいんどねしあに　行いったことがあります。\n      \n      ここは　ヨーロッパよーろっぱです。\n      \n      ヨーロッパよーろっぱの　中なかでは　イギリスいぎりすと　フランスふらんすに　行いったことがあります。\n      \n      それから　オーストラリアおーすとらりあと　ニュージーランドにゅーじーらんどにも　行いったことがあります。\n      \n      北アメリカきたあめりかには　行いったことがありません。\n      \n      南アメリカみなみあめりかにも　行いったことがありません。\n      \n      アフリカあふりかにも　行いったことがありません。\n      \n      中東ちゅうとうにも　行いったことがありません。\n      \n      これは　なんでしょう。\n      \n      これは　万里ばんりの長城ちょうじょうです　。\n      \n      中国ちゅうごくに　あります。\n      \n      中国ちゅうごくでは　万里ばんりの長城ちょうじょうに　登のぼりました。\n      \n      韓国かんこくの　食たべ物ものは　とても　辛からいです。\n      \n      とっても　辛からいです。\n      \n      韓国かんこくでは　辛からい　料理りょうりを　たくさん　食たべました。\n      \n      これは　象ぞうです。\n      \n      これは　象ぞうです。\n      \n      タイたいでは　象ぞうに　乗のりました。\n      \n      これは　アオザイあおざいという　ベトナムべとなむの　服ふくです。\n      \n      ベトナムべとなむでは　アオザイあおざいを　着きました。\n      \n      これは　海うみです。\n      \n      インドネシアいんどねしあは　海うみが　とっても　綺麗きれいです。\n      \n      インドネシアいんどねしあでは　海うみに　行いきました。\n      \n      これは　ビッグベンびっぐべんです。\n      \n      イギリスいぎりすの　ロンドンろんどんに　あります。\n      \n      イギリスいぎりすでは　ビッグベンびっぐべんを　見みました。\n      \n      それから　フィッシュアンドチップスふぃっしゅあんどちっぷすを　食たべました。\n      \n      この　絵えは　モナリザもなりざです。\n      \n      フランスふらんすの　パリぱりに　ある　ルーブル美術館るーぶるびじゅつかんに　あります。\n      \n      フランスふらんすでは　ルーブル美術館るーぶるびじゅつかんに　行いって　モナリザもなりざの　絵えを　見みました。\n      \n      これは　コアラこあらです。\n      \n      これは　カンガルーかんがるーです。\n      \n      オーストラリアおーすとらりあでは　コアラこあらや　カンガルーかんがるーを　見みました。\n      \n      これは　森もりです。\n      \n      これは　湖みずうみです。\n      \n      自然しぜんです。\n      \n      ニュージーランドにゅーじーらんどは　自然しぜんが　いっぱいです。\n      \n      ニュージーランドにゅーじーらんどでは　自然しぜんの　中なかを　歩あるきました。\n      \n      人生じんせいで　最初さいしょの　海外旅行かいがいりょこうは　２００２年にせんにねんでした。\n      \n      最後さいごの　海外旅行かいがいりょこうを　したのは　２０１３年にせんじゅうさんねんです。\n      \n      今いまから　８年前はちねんまえです。\n      \n      ８年間はちねんかん　海外旅行かいがいりょこうを　していません。\n      \n      どこにも　行いっていません。\n      \n      いつか　また、　将来しょうらい、　海外旅行かいがいりょこうを　たくさん　したいです。\n      \n      今日きょうは　私わたしが　行いったことのある国くにについて　お話はなししました。\n      \n      おしまい。"
  },
  {
      title: "キャンプ Camping",
      url: "https://cijapanese.com/camping/",
      level: "beginner",
      membership: "free",
      transcript: "こんにちは。今日の動画のテーマはキャンプです。\n\n      皆さんキャンプは好きですか？キャンプに行きますか？\n      \n      今日は２月１９日です。今週です。先週です。先週の木曜日から土曜日まで。木曜日、金曜日、土曜日。木金土３日間、私達家族はキャンプに行きました。\n      \n      これはテントです。木曜日と金曜日、１回２回。１日２日。二日間テントで寝ました。テントに泊まりました。そして土曜日に家に帰りました。二泊三日しました。\n      \n      私達家族はキャンプが好きです。私も子供たちもみんな好きです。みんなキャンプが好きです。みんな好きですが、特に夫がキャンプにハマっています。大好きです。月に一回、毎月一回キャンプに行きます。\n      \n      最近日本ではキャンプが流行っています。キャンプが人気です。たくさんの人がキャンプに行きます。\n      \n      私達家族も最近キャンプを始めました。去年キャンプを始めました。去年の秋からキャンプを始めました。昔からずーっとはしていません。昔からはしていません。最近始めたばかりです。\n      \n      これはイスです。キャンプに行くと私と夫はゆっくりします。のんびり過ごします。自然の中で、ゆっくりのんびりリラックスします。コーヒーを飲んでゆっくりします。\n      \n      子供たちは自然の中で遊びます。走り回って遊びます。\n      \n      ここはキャンプ場です。キャンプ場には私達家族以外にも、私達家族の他にもたくさん家族が来ています。\n      \n      お兄ちゃんは他の子供達と一緒に遊びます。他の子供達と友達になります。仲良くなります。友達を作って仲良くなって一緒に遊びます。\n      \n      キャンプはとても楽しいです。\n      \n      今日はキャンプについてお話しました。今日はこれでおしまい。",
      transcript_furigana: "こんにちは。　\n\n      今日きょうの　動画どうがの　テーマてーまは　キャンプきゃんぷです。\n      \n      皆みなさん　キャンプきゃんぷは　好すきですか。\n      \n      キャンプきゃんぷに　行いきますか。\n      \n      今日きょうは　２月１９日にがつじゅうくにちです。\n      \n      今週こんしゅうです。\n      \n      先週せんしゅうです。\n      \n      先週せんしゅうの　木曜日もくようびから　土曜日どようびまで、　先週の　木曜日もくようび　金曜日きんようび　土曜日どようび、　木もく　金きん　土ど　三日間みっかかん、　私達わたしたち　家族かぞくは　キャンプきゃんぷに　行いきました。\n      \n      これは　テントてんとです。\n      \n      木曜日もくようびと　金曜日きんようび　１回いっかい　２回にかい、　１日いちにち　２日ふつか、　二日間ふつかかん　テントてんとで　寝ねました。\n      \n      テントてんとに　泊とまりました。\n      \n      そして　土曜日どようびに　家いえに　帰かえりました。\n      \n      二泊にはく　三日みっか　しました。\n      \n      私達わたしたち　家族かぞくは　キャンプきゃんぷが　好すきです。\n      \n      私わたしも　子供こどもたちも　みんな　好すきです。\n      \n      みんな　キャンプきゃんぷが　好すきです。\n      \n      みんな　好すきですが　特とくに　夫おっとが　キャンプきゃんぷに　ハマはまっています。\n      \n      大好だいすきです。\n      \n      月つきに　一回いっかい、　毎月まいつき　一回いっかい　キャンプきゃんぷに　行いきます。\n      \n      最近さいきん　日本にほんでは　キャンプきゃんぷが　流行はやっています。\n      \n      キャンプきゃんぷが　人気にんきです。\n      \n      たくさんの　人ひとが　キャンプきゃんぷに　行いきます。\n      \n      私達わたしたち　家族かぞくも　最近さいきん　キャンプきゃんぷを　始はじめました。\n      \n      去年きょねん　キャンプきゃんぷを　始はじめました。\n      \n      去年きょねんの　秋あきから　キャンプきゃんぷを　始はじめました。\n      \n      昔むかしから　ずーっとは　していません。\n      \n      昔むかしからは　していません。\n      \n      最近さいきん　始はじめた　ばかりです。\n      \n      これは　イスいすです。\n      \n      キャンプきゃんぷに　行いくと　私わたしと　夫おっとは　ゆっくりします。\n      \n      のんびり　過すごします。\n      \n      自然しぜんの　中なかで　ゆっくり　のんびり　リラックスりらっくすします。\n      \n      コーヒーこーひーを　飲のんで　ゆっくりします。\n      \n      子供こどもたちは　自然しぜんの　中なかで　遊あそびます。\n      \n      走はしり回まわって　遊あそびます。\n      \n      ここは　キャンプ場きゃんぷじょうです。\n      \n      キャンプ場きゃんぷじょうには　私達わたしたち　家族かぞく　以外にも　私達　家族かぞくの　他ほかにも　たくさん　家族かぞくが　来ています。\n      \n      お兄にいちゃんは　他ほかの　子供達こどもたちと　一緒いっしょに　遊あそびます。\n      \n      他ほかの　子供達こどもたちと　友達ともだちに　なります。\n      \n      仲良なかよく　なります。\n      \n      友達ともだちを　作つくって、　仲良なかよく　なって　一緒いっしょに　遊あそびます。\n      \n      キャンプきゃんぷは　とても　楽たのしいです。\n      \n      今日きょうは　キャンプきゃんぷについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "間違い探し② Spot the Difference#2",
      url: "https://cijapanese.com/spot-the-difference2/",
      level: "complete beginner",
      membership: "free",
      transcript: "今日は間違い探しをしましょう。2回目の間違い探しです。\n\n      絵があります。絵が１枚、２枚。２枚あります。２枚の絵を比べましょう。比べてみましょう。\n      \n      ２枚の絵は似ています。でも少し違います。違うところが全部で５つあります。違うところを探しましょう。違うところを見つけましょう。\n      \n      左の絵を見てください。机の上にパソコンがあります。パソコンの左に本があります。本が１冊２冊３冊。３冊あります。右の絵を見てください。パソコンの左に本は何冊ありますか。１冊２冊。２冊しかありません。\n      \n      左の絵を見てください。パソコンの右にスマートフォンがあります。スマホがあります。右の絵を見てください。パソコンの右にスマホはありますか。いいえ、スマホはありません。カメラがあります。\n      \n      左の絵を見てください。パソコンの前にコーヒーがあります。右の絵を見てください。パソコンの前にコーヒーはありますか。はい、あります。\n      \n      でも同じコーヒーですか。いいえ、違います。左の絵のコーヒーはホットコーヒーです。温かいコーヒーです。右の絵のコーヒーはアイスコーヒーです。冷たいコーヒーです。\n      \n      左の絵を見てください。パソコンの前に眼鏡があります。黒い眼鏡があります。右の絵を見てください。パソコンの前に眼鏡はありますか。いいえ、ありません。眼鏡はありません。\n      \n      左の絵を見てください。パソコンの前にペンがあります。黄色いペンがあります。右の絵を見てください。右の絵もパソコンの前にペンがあります。\n      \n      でも同じペンですか。いいえ、違います。右の絵のペンは紫のペンです。黄色ではありません。紫のペンです。\n      \n      違いはいくつ見つかりましたか。１つ、２つ、３つ、４つ、５つありました。\n      \n      今日は間違い探しをしました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは　間違まちがい探さがしを　しましょう。\n\n      ２回目にかいめの　間違まちがい探さがしです。\n      \n      絵えが　あります。\n      \n      絵えが　１枚いちまい　２枚にまい、２枚にまい　あります。\n      \n      ２枚にまいの　絵えを　比くらべましょう。\n      \n      比くらべてみましょう。\n      \n      ２枚にまいの　絵えは　似にています。\n      \n      でも　少すこし　違ちがいます。\n      \n      違ちがうところが　全部ぜんぶで　５いつつ　あります。\n      \n      違ちがうところを　探さがしましょう。\n      \n      違ちがうところを　見みつけましょう。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      机つくえの　上うえに　パソコンぱそこんが　あります。\n      \n      パソコンぱそこんの　左ひだりに　本ほんが　あります。\n      \n      本ほんが　１冊いっさつ　２冊にさつ　３冊さんさつ。\n      \n      ３冊さんさつ　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      パソコンぱそこんの　左ひだりに　本ほんは　何冊なんさつ　ありますか。\n      \n      １冊いっさつ　２冊にさつ。\n      \n      ２冊にさつしか　ありません。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      パソコンぱそこんの　右みぎに　スマートフォンすまーとふぉんが　あります。\n      \n      スマホすまほが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      パソコンぱそこんの　右みぎに　スマホすまほは　ありますか。\n      \n      いいえ　スマホすまほは　ありません。\n      \n      カメラかめらが　あります。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      パソコンぱそこんの　前まえに　コーヒーこーひーが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      パソコンぱそこんの　前まえに　コーヒーこーひーは　ありますか。\n      \n      はい　あります。\n      \n      でも　同おなじ　コーヒーこーひーですか。\n      \n      いいえ　違ちがいます。\n      \n      左ひだりの　絵えの　コーヒーこーひーは　ホットコーヒーほっとこーひーです。\n      \n      温あたたかい　コーヒーこーひーです。\n      \n      右みぎの　絵えの　コーヒーこーひーは　アイスコーヒーあいすこーひーです。\n      \n      冷つめたい　コーヒーこーひーです。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      パソコンぱそこんの　前まえに　眼鏡めがねが　あります。\n      \n      黒くろい　眼鏡めがねが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      パソコンぱそこんの　前まえに　眼鏡めがねは　ありますか。\n      \n      いいえ　ありません。\n      \n      眼鏡めがねは　ありません。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      パソコンぱそこんの　前まえに　ペンぺんが　あります。\n      \n      黄色きいろい　ペンぺんが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      右みぎの　絵えも　パソコンの　前に　ペンぺんが　あります。\n      \n      でも　同おなじ　ペンぺんですか。\n      \n      いいえ　違ちがいます。\n      \n      右みぎの　絵えの　ペンぺんは　紫むらさきの　ペンぺんです。\n      \n      黄色きいろでは　ありません。\n      \n      紫むらさきの　ペンぺんです。\n      \n      違ちがいは　いくつ　見みつかりましたか。\n      \n      １ひとつ　２ふたつ　３みっつ　４よっつ　５いつつ　ありました。\n      \n      今日きょうは　間違まちがい探さがしを　しました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "一番痛かった思い出 The Most Painful Memory",
      url: "https://cijapanese.com/the-most-painful-memory/",
      level: "beginner",
      membership: "free",
      transcript: "今日の動画のテーマは「痛い」です。\n\n      歩いています。どてっ。転びます。怪我をします。痛いです。ドーン。ぶつかります。怪我をします。痛いです。頭が痛いです。お腹が痛いです。痛い時、色々あります。\n      \n      今日は、私が今までで一番痛かったことについてお話します。\n      \n      私が人生で一番痛かった時。２０１９年。今から、１年、２年。２年前です。今から２年前の出来事です。\n      \n      私はその時、娘を妊娠していました。娘がお腹の中にいました。お腹の中に娘がいました。\n      \n      ２０１９年の１月でした。１月は冬です。寒い冬です。私は風邪を引きました。風邪を引くと熱が出ます。それから鼻水が出ます。それから、コンコン、ゴホゴホ、咳が出ます。\n      \n      私はその時、熱はありませんでした。鼻水も出ませんでした。でも咳がたくさん出ました。コンコン、ゴホゴホ、とてもひどい咳でした。\n      \n      １週間、２週間。１週間経っても２週間経っても、咳が続いています。咳が止まりません。咳がずーっと続いています。なかなか良くなりません。なかなか風邪が治りません。\n      \n      これは病院です。病院に行きます。これは薬です。病院で薬をもらいます。薬をもらって飲みます。それでも咳が治りません。まだ咳が続きます。\n      \n      するとある日、ポキっ。ここの骨が折れてしまいました。たくさん咳をしたので、たくさんたくさん咳をし過ぎて、ここの骨が折れてしまいました。\n      \n      とても痛かったです。痛くて痛くて涙が出ました。泣きました。赤ちゃんがいてお腹も大きいし、骨も折れているし、とても辛かったです。\n      \n      病院で薬をもらって、薬を飲んで、痛くなくなりました。\n      \n      今日は、私が人生で一番痛かった出来事についてお話しました。\n      \n      おしまい。",
      transcript_furigana: "今日きょうの　動画どうがの　テーマてーまは　「痛いたい」です。\n\n      歩あるいています。\n      \n      どてっ　転ころびます。\n      \n      怪我けがをします。\n      \n      痛いたいです。\n      \n      ドーンどーん　ぶつかります。\n      \n      怪我けがをします。\n      \n      痛いたいです。\n      \n      頭あたまが　痛いたいです。\n      \n      お腹なかが　痛いたいです。\n      \n      痛いたい時とき、　色々いろいろ　あります。\n      \n      今日きょうは　私わたしが　今いままでで　一番いちばん　痛いたかったことについて　お話はなしします。\n      \n      私わたしが　人生じんせいで　一番いちばん　痛いたかった時とき。\n      \n      ２０１９年にせんじゅうきゅうねん　今いまから　１年いちねん　２年にねん　２年前にねんまえです。\n      \n      今から　２年前にねんまえの　出来事できごとです。\n      \n      私わたしは　その時とき　娘むすめを　妊娠にんしんしていました。\n      \n      娘むすめが　お腹なかの　中なかに　いました。\n      \n      お腹なかの　中なかに　娘むすめが　いました。\n      \n      ２０１９年にせんじゅうきゅうねんの　１月いちがつでした。\n      \n      １月いちがつは　冬ふゆです。\n      \n      寒さむい　冬ふゆです。\n      \n      私わたしは　風邪かぜを　引ひきました。\n      \n      風邪かぜを　引ひくと　熱ねつが　出でます。\n      \n      それから　鼻水はなみずが　出でます。\n      \n      それから　コンコンこんこん　ゴホゴホごほごほ　咳が　出でます。\n      \n      私わたしは　その時とき　熱ねつは　ありませんでした。\n      \n      鼻水はなみずも　出でませんでした。\n      \n      でも　咳せきが　たくさん　出でました。\n      \n      コンコンこんこん　ゴホゴホごほごほ　とても　ひどい　咳せきでした。\n      \n      １週間いっしゅうかん　２週間にしゅうかん\n      \n      １週間いっしゅうかん　経たっても　２週間にしゅうかん　経たっても　咳せきが　続つづいています。\n      \n      咳せきが　止とまりません。\n      \n      咳せきが　ずーっと　続つづいています。\n      \n      なかなか　良よくなりません。\n      \n      なかなか　風邪かぜが　治なおりません。\n      \n      これは　病院びょういんです。\n      \n      病院びょういんに　行いきます。\n      \n      これは　薬くすりです。\n      \n      病院びょういんで　薬くすりを　もらいます。\n      \n      薬くすりを　もらって　飲のみます。\n      \n      それでも　咳せきが　治なおりません。\n      \n      まだ　咳せきが　続つづきます。\n      \n      すると　ある日ひ　ポキぽきっ。\n      \n      ここの　骨ほねが　折おれてしまいました。\n      \n      たくさん　咳せきを　したので、　たくさん　たくさん　咳せきを　し過すぎて　ここの　骨ほねが　折おれてしまいました。\n      \n      とても　痛いたかったです。\n      \n      痛いたくて　痛いたくて　涙なみだが　出でました。\n      \n      泣なきました。\n      \n      赤あかちゃんが　いて　お腹なかも　大おおきいし　骨ほねも　折おれているし　とても　辛つらかったです。\n      \n      病院びょういんで　薬くすりを　もらって　薬くすりを　飲のんで　痛いたくなくなりました。\n      \n      今日きょうは　私わたしが　人生じんせいで　一番いちばん　痛いたかった　出来事できごとについて　お話はなししました。\n      \n      おしまい。"
  },
  {
      title: "桃太郎 Momotaro",
      url: "https://cijapanese.com/momotaro/",
      level: "beginner",
      membership: "free",
      transcript: "今日は「桃太郎」という日本の昔話をします。今です。昔です。昔々のお話です。\n\n      これは村です。家があります。これは村です。\n      \n      ある村におじいさんとおばあさんが住んでいました。おじいさんとおばあさんには子供がいません。子供が欲しいです。でも子供がいません。\n      \n      おじいさんは毎日山に行きます。これは山です。おじいさんは毎日山に行きます。おじいさんは毎日山に行って仕事をします。\n      \n      おばあさんは毎日川に行きます。これは川です。おばあさんは毎日川に行きます。おばあさんは毎日川に行って洗濯をします。服を洗います。ゴシゴシゴシ。川で洗濯をします。\n      \n      おばあさんが川で洗濯をしていると、上の方から何かが流れてきます。桃です。川の上の方から桃が流れてきます。とても大きな桃です。おばあさんは桃を見てびっくりしています。驚いています。\n      \n      おじいさんは桃が好きです。桃が大好きです。おばあさんは思いました。おじいさんがきっと喜ぶ！桃を拾って家に持って帰ろう。\n      \n      おばあさんは桃を持って家に帰りました。おじいさんも山から家に帰ってきました。\n      \n      おばあさんが言います。「おじいさん、見てください！大きな桃ですよ。川で拾いました。」「わあ！大きい！」おじいさんもびっくりしています。驚いています。\n      \n      桃を食べましょう。これは包丁です。おばあさんが包丁を持ちます。おばあさんが包丁で桃を切ろうとします。\n      \n      すると、パカっ。桃が割れました。桃が割れて赤ちゃんが生まれました。おじいさんもおばあさんもびっくりしています。赤ちゃんは男の子です。桃から生まれたので桃太郎という名前にしました。\n      \n      それから数年経ちました。桃太郎が生まれてからしばらく経ちました。桃太郎は大きくなりました。とても元気で強い男の子になりました。\n      \n      これは島です。鬼ヶ島という名前の島です。鬼ヶ島には鬼が住んでいます。怖い鬼が住んでいます。悪い鬼が住んでいます。\n      \n      ある日鬼が村にやって来ました。鬼が村に来ました。村の人達です。村の人達のお金です。村の人達の宝石です。ある日鬼が来て村の人達のお金や宝石を奪いました。取りました。村の人達のお金や宝石を取って持っていってしまいました。\n      \n      村の人達は泣いています。みんな困っています。桃太郎は「そうだ！僕が鬼ヶ島に行きます。そして僕が鬼と戦います。鬼を倒します。」（と言いました。）\n      \n      これは団子です。美味しい団子です。おじいさんとおばあさんはお団子を作ります。桃太郎のために、きびだんごというお団子を作ります。「桃太郎、これを持っていきなさい。どうぞ。」桃太郎にきびだんごを渡します。\n      \n      「ありがとう。行ってきます。」桃太郎が出発します。桃太郎が歩いています。すると犬がいます。犬に会いました。\n      \n      犬が聞きます。「桃太郎さん、どこに行くんですか？」「鬼ヶ島に行きます。」「どうして鬼ヶ島に行くんですか？」「鬼を倒すためです。」「桃太郎さん、それは何ですか？」「これはきびだんごです。」\n      \n      犬が言います。「そのきびだんごをください。私も一緒に鬼ヶ島に行きます。」桃太郎と犬が一緒に歩いています。すると次に猿に会いました。猿に会いました。\n      \n      猿が聞きます。「桃太郎さん、どこに行くんですか？」「鬼ヶ島に行きます。」「どうして鬼ヶ島に行くんですか？」「鬼を倒しに行きます。」「それは何ですか？」「これはきびだんごです。」\n      \n      猿が言います。「そのきびだんごをください。私も一緒に鬼ヶ島に行きます。」桃太郎は猿にきびだんごをあげます。桃太郎と犬と猿が歩いていると、今度はキジに会いました。鳥です。\n      \n      キジが聞きます。「桃太郎さん、どこに行くんですか？」「鬼ヶ島に行きます。」「どうして鬼ヶ島に行くんですか？」「鬼を倒しに行きます。」「それは何ですか？」「これはきびだんごです。」\n      \n      キジが言います。「そのきびだんごをください。私も一緒に鬼ヶ島に行きます。」桃太郎はキジにもきびだんごをあげます。\n      \n      そしてみんなで一緒に鬼ヶ島に行きました。鬼ヶ島に着きました。みんなで鬼と戦います。そして鬼を倒しました。鬼は「ごめんなさい」と言います。そして村の人達のお金や宝石を返します。\n      \n      桃太郎たちはお金と宝石を持って村に帰ります。村に戻ります。お金と宝石を村の人達に渡します。「桃太郎、ありがとう！」村の人達は喜んでいます。\n      \n      おしまい。",
      transcript_furigana: "今日きょうは　「桃太郎ももたろう」という　日本にほんの　昔話むかしばなしをします。\n\n      今いまです。\n      \n      昔むかしです。\n      \n      昔々むかしむかしの　お話はなしです。\n      \n      これは　村むらです。\n      \n      家いえが　あります。\n      \n      これは　村むらです。\n      \n      ある村むらに　おじいさんと　おばあさんが　住すんでいました。\n      \n      おじいさんと　おばあさんには　子供こどもが　いません。\n      \n      子供こどもが　欲ほしいです。\n      \n      でも　子供こどもが　いません。\n      \n      おじいさんは　毎日まいにち　山やまに　行いきます\n      \n      これは　山やまです。\n      \n      おじいさんは　毎日まいにち　山やまに　行いきます。\n      \n      おじいさんは　毎日まいにち　山やまに　行いって　仕事しごとをします。\n      \n      おばあさんは　毎日まいにち　川かわに　行いきます。\n      \n      これは　川かわです。\n      \n      おばあさんは　毎日まいにち　川かわに　行いきます。\n      \n      おばあさんは　毎日まいにち　川かわに　行いって　洗濯せんたくをします。\n      \n      服ふくを　洗あらいます。\n      \n      ゴシゴシゴシごしごしごし。\n      \n      川かわで　洗濯せんたくをします。\n      \n      おばあさんが　川かわで　洗濯せんたくをしていると、　上うえの方ほうから　何なにかが　流ながれてきます。\n      \n      桃ももです。\n      \n      川かわの　上うえの方ほうから　桃ももが　流ながれてきます。\n      \n      とても　大おおきな　桃ももです。\n      \n      おばあさんは　桃ももを　見みて　びっくりしています。\n      \n      驚おどろいています。\n      \n      おじいさんは　桃ももが　好すきです。\n      \n      桃ももが　大好だいすきです。\n      \n      おばあさんは　思おもいました。\n      \n      おじいさんが　きっと　喜よろこぶ。\n      \n      桃ももを　拾ひろって　家いえに　持もって　帰かえろう。\n      \n      おばあさんは　桃ももを　持もって　家いえに　帰かえりました。\n      \n      おじいさんも　山やまから　家いえに　帰かえってきました。\n      \n      おばあさんが　言いいます。\n      \n      「おじいさん　見みてください。　大おおきな　桃ももですよ。　川かわで　拾ひろいました。」\n      \n      「わあ　大おおきい。」\n      \n      おじいさんも　びっくりしています。\n      \n      驚おどろいています。\n      \n      桃ももを　食たべましょう。\n      \n      これは　包丁ほうちょうです。\n      \n      おばあさんが　包丁ほうちょうを　持もちます。\n      \n      おばあさんが　包丁ほうちょうで　桃ももを　切きろうとします。\n      \n      すると　パカぱかっ。\n      \n      桃ももが　割われました。\n      \n      桃ももが　割われて　赤あかちゃんが　生うまれました。\n      \n      おじいさんも　おばあさんも　びっくりしています。\n      \n      赤あかちゃんは　男おとこの子こです。\n      \n      桃ももから　生うまれたので　桃太郎ももたろうという　名前なまえに　しました。\n      \n      それから　数年すうねん　経たちました。\n      \n      桃太郎ももたろうが　生うまれてから　しばらく　経たちました。\n      \n      桃太郎ももたろうは　大おおきく　なりました。\n      \n      とても　元気げんきで　強つよい　男おとこの子こに　なりました。\n      \n      これは　島しまです。\n      \n      鬼ヶ島おにがしまという　名前なまえの　島しまです。\n      \n      鬼ヶ島おにがしまには　鬼おにが　住すんでいます。\n      \n      怖こわい　鬼おにが　住すんでいます。\n      \n      悪わるい　鬼おにが　住すんでいます。\n      \n      ある日ひ　鬼おにが　村むらに　やって来きました。\n      \n      鬼おにが　村むらに　来きました。\n      \n      村むらの　人達ひとたちです。\n      \n      村むらの　人達ひとたちの　お金かねです。\n      \n      村むらの　人達ひとたちの　宝石ほうせきです。\n      \n      ある日ひ　鬼おにが　来きて　村むらの　人達ひとたちの　お金かねや　宝石ほうせきを　奪うばいました。\n      \n      取とりました。\n      \n      村むらの　人達ひとたちの　お金かねや　宝石ほうせきを　取とって　持もっていってしまいました。\n      \n      村むらの　人達ひとたちは　泣ないています。\n      \n      みんな　困こまっています。\n      \n      桃太郎ももたろうは　「そうだ！　僕ぼくが　鬼ヶ島おにがしまに　行いきます。　そして　僕ぼくが　鬼おにと　戦たたかいます。　鬼おにを　倒たおします。」（と言いいました）\n      \n      これは　団子だんごです。\n      \n      美味おいしい　団子だんごです。\n      \n      おじいさんと　おばあさんは　お団子だんごを　作つくります。\n      \n      桃太郎ももたろうのために　きびだんごという　お団子だんごを　作つくります。\n      \n      「桃太郎ももたろう　これを　持もっていきなさい。　どうぞ。」\n      \n      桃太郎ももたろうに　きびだんごを　渡わたします。\n      \n      「ありがとう。　行いってきます。」\n      \n      桃太郎ももたろうが　出発しゅっぱつします。\n      \n      桃太郎ももたろうが　歩あるいています。\n      \n      すると　犬いぬが　います。\n      \n      犬いぬに　会あいました。\n      \n      犬いぬが　聞ききます。\n      \n      「桃太郎ももたろうさん　どこに　行いくんですか。」\n      \n      「鬼ヶ島おにがしまに　行いきます。」\n      \n      「どうして　鬼ヶ島おにがしまに　行いくんですか。」\n      \n      「鬼おにを　倒たおすためです。」\n      \n      「桃太郎ももたろうさん、　それは　何なんですか。」\n      \n      「これは　きびだんごです。」\n      \n      犬いぬが　言いいます。\n      \n      「その　きびだんごを　ください。　私わたしも　一緒いっしょに　鬼ヶ島おにがしまに　行いきます。」\n      \n      桃太郎ももたろうと　犬いぬが　一緒いっしょに　歩あるいています。\n      \n      すると　次つぎに　猿さるに　会あいました。\n      \n      猿さるに　会あいました。\n      \n      猿さるが　聞ききます。\n      \n      「桃太郎ももたろうさん、　どこに　行いくんですか。」\n      \n      「鬼ヶ島おにがしまに　行いきます。」\n      \n      「どうして　鬼ヶ島おにがしまに　行いくんですか。」\n      \n      「鬼おにを　倒たおしに　行いきます。」\n      \n      「それは　何なんですか。」\n      \n      「これは　きびだんごです。」\n      \n      猿さるが　言いいます。\n      \n      「その　きびだんごを　ください。　私わたしも　一緒いっしょに　鬼ヶ島おにがしまに　行いきます。」\n      \n      桃太郎ももたろうは　猿さるに　きびだんごを　あげます。\n      \n      桃太郎ももたろうと　犬いぬと　猿さるが　歩あるいていると　今度こんどは　キジきじに　会あいました。\n      \n      鳥とりです。\n      \n      キジきじが　聞ききます。\n      \n      「桃太郎ももたろうさん、　どこに　行いくんですか。」\n      \n      「鬼ヶ島おにがしまに　行いきます。」\n      \n      「どうして　鬼ヶ島おにがしまに　行いくんですか。」\n      \n      「鬼おにを　倒たおしに　行いきます。」\n      \n      「それは　何なんですか。」\n      \n      「これは　きびだんごです。」\n      \n      キジきじが　言いいます。\n      \n      「その　きびだんごを　ください。　私わたしも　一緒いっしょに　鬼ヶ島おにがしまに　行いきます。」\n      \n      桃太郎ももたろうは　キジきじにも　きびだんごを　あげます。\n      \n      そして　みんなで　一緒いっしょに　鬼ヶ島おにがしまに　行いきました。\n      \n      鬼ヶ島おにがしまに　着つきました。\n      \n      みんなで　鬼おにと　戦たたかいます。\n      \n      そして　鬼おにを　倒たおしました。\n      \n      鬼おには　「ごめんなさい。」と　言いいます。\n      \n      そして　村むらの　人達ひとたちの　お金かねや　宝石ほうせきを　返します。\n      \n      桃太郎ももたろうたちは　お金かねと　宝石ほうせきを　持もって　村むらに　帰かえります。\n      \n      村むらに　戻もどります。\n      \n      お金かねと　宝石ほうせきを　村むらの　人達ひとたちに　渡わたします。\n      \n      「桃太郎ももたろう　ありがとう。」村むらの　人達ひとたちは　喜よろこんでいます。\n      \n      おしまい。"
  },
  {
      title: "雛人形 Hina Dolls",
      url: "https://cijapanese.com/hina-dolls/",
      level: "beginner",
      membership: "free",
      transcript: "クリスマスやハロウィンなど色々な行事があります。日本では３月３日にひな祭りという行事があります。\n\n      これは男の子です。これは女の子です。ひな祭りは女の子のための行事です。\n      \n      赤ちゃんです。大人です。赤ちゃんから大人に成長します。大きくなります。病気です。元気です。健康です。\n      \n      ひな祭りは女の子が病気をせず、病気をしないで元気に健康に大きくなりますように、元気に健康に成長しますようにとお願いする日です。お祈りする日です。\n      \n      これは家です。この家には女の子がいます。この家には男の子しかいません。女の子はいません。\n      \n      ひな祭りの日に、女の子がいる家では雛人形という人形を飾ります。雛人形という人形を家に置きます。男の子しかいない家では飾りません。雛人形を置きません。\n      \n      これは事故です。この子は病気です。これは人形です。日本では、人形が事故や病気など悪いことから子供を守ってくれると言われます。人形が事故や病気から子供を守ってくれます。そのため、ひな祭りの日に人形を飾ります。\n      \n      これが雛人形です。これはとても大きな雛人形です。全部で７段あります。１２３４５６７。全部で７段あります。\n      \n      私の家にも女の子がいます。１歳の娘がいます。なのでうちにも雛人形があります。でもこんなに大きな雛人形ではありません。\n      \n      小さな雛人形です。広い家です。広い家です。狭い家です。うちは広くありません。狭い家です。なのでこの雛人形は大き過ぎます。小さな雛人形を置いています。\n      \n      今から娘の雛人形を紹介します。これが娘の雛人形です。１段、２段、３段。３段の雛人形です。\n      \n      一番上には男の人と女の人がいます。真ん中には女の人が一人、二人、三人、三人います。\n      \n      一番下には男の人が一人、二人、三人、四人、五人、五人います。全部で１０体、人形があります。みんなきれいな着物を着ています。\n      \n      これは太鼓です。これは小さな太鼓です。これは笛です。太鼓や笛、楽器です。この人形は太鼓を叩いています。この人形も太鼓を叩いています。この人形は笛を持っています。\n      \n      花があります。右側にはピンクの花があります。左側には黄色と白の花があります。\n      \n      今日は雛人形を紹介しました。今日はこれでおしまい。またね。",
      transcript_furigana: "クリスマスくりすますや　ハロウィンはろうぃんなど　色々いろいろな　行事ぎょうじが　あります。\n\n      日本にほんでは　３月３日さんがつみっかに　ひな祭まつりという　行事ぎょうじが　あります。\n      \n      これは　男おとこの子こです。\n      \n      これは　女おんなの子こです。\n      \n      ひな祭まつりは　女おんなの子このための　行事ぎょうじです。\n      \n      赤あかちゃんです。\n      \n      大人おとなです。\n      \n      赤あかちゃんから　大人おとなに　成長せいちょうします。\n      \n      大おおきくなります。\n      \n      病気びょうきです。\n      \n      元気げんきです。\n      \n      健康けんこうです。\n      \n      ひな祭まつりは　女おんなの子こが　病気びょういんをせず　病気びょうきをしないで　元気げんきに　健康けんこうに　大おおきくなりますように、\n      \n      元気げんきに　健康けんこうに　成長せいちょうしますようにと　お願ねがいする日ひです。\n      \n      お祈いのりする日ひです。\n      \n      これは　家いえです。\n      \n      この家いえには　女おんなの子こが　います。\n      \n      この家いえには　男おとこの子こしか　いません。\n      \n      女おんなの子こは　いません。\n      \n      ひな祭まつりの日ひに　女おんなの子こが　いる　家いえでは　雛人形ひなにんぎょうという　人形にんぎょうを　飾かざります。\n      \n      雛人形ひなにんぎょうという　人形にんぎょうを　家いえに　置おきます。\n      \n      男おとこの子こしか　いない　家いえでは　飾かざりません。\n      \n      雛人形ひなにんぎょうを　置おきません。\n      \n      これは　事故じこです。\n      \n      この子は　病気びょうきです。\n      \n      これは　人形にんぎょうです。\n      \n      日本にほんでは　人形にんぎょうが　事故じこや　病気びょうきなど　悪わるいことから　子供こどもを　守まもってくれると　言いわれます。\n      \n      人形にんぎょうが　事故じこや　病気びょうきから　子供こどもを　守まもってくれます。\n      \n      そのため　ひな祭まつりの日ひに　人形にんぎょうを　飾かざります。\n      \n      これが　雛人形ひなにんぎょうです。\n      \n      これは　とても　大おおきな　雛人形ひなにんぎょうです。\n      \n      全部ぜんぶで　７段ななだん　あります。\n      \n      １いち２に３さん４し５ご６ろく７なな。\n      \n      全部ぜんぶで　７段ななだん　あります。\n      \n      私わたしの　家いえにも　女おんなの子こが　います。\n      \n      １歳いっさいの　娘むすめが　います。\n      \n      なので　うちにも　雛人形ひなにんぎょうが　あります。\n      \n      でも　こんなに　大おおきな　雛人形ひなにんぎょうでは　ありません。\n      \n      小ちいさな　雛人形ひなにんぎょうです。\n      \n      広ひろい　家いえです。\n      \n      広ひろい　家いえです。\n      \n      狭せまい　家いえです。\n      \n      うちは　広ひろく　ありません。\n      \n      狭せまい　家いえです。\n      \n      なので　この　雛人形ひなにんぎょうは　大おおき過すぎます。\n      \n      小ちいさな　雛人形ひなにんぎょうを　置おいています。\n      \n      今いまから　娘むすめの　雛人形ひなにんぎょうを　紹介しょうかいします。\n      \n      これが　娘むすめの　雛人形ひなにんぎょうです。\n      \n      １段いちだん　２段にだん　３段さんだん。\n      \n      ３段さんだんの　雛人形ひなにんぎょうです。\n      \n      一番いちばん　上うえには　男おとこの人ひとと　女おんなの人ひとが　います。\n      \n      真ん中には　女おんなの人ひとが　一人ひとり　二人ふたり　三人さんにん　三人さんにん　います。\n      \n      一番いちばん　下には　男おとこの人ひとが　一人ひとり　二人ふたり　三人さんにん　四人よにん　五人ごにん　五人ごにん　います。\n      \n      全部ぜんぶで　１０体じゅったい　人形にんぎょうが　あります。\n      \n      みんな　きれいな　着物きものを　着きています。\n      \n      これは　太鼓たいこです。\n      \n      これは　小ちいさな　太鼓たいこです。\n      \n      これは　笛ふえです。\n      \n      太鼓たいこや　笛ふえ　楽器がっきです。\n      \n      この　人形にんぎょうは　太鼓たいこを　叩たたいています。\n      \n      この　人形にんぎょうも　太鼓たいこを　叩たたいています。\n      \n      この　人形にんぎょうは　笛ふえを　持もっています。\n      \n      花はなが　あります。\n      \n      右側みぎがわには　ピンクぴんくの　花はなが　あります。\n      \n      左側ひだりがわには　黄色きいろと　白しろの　花はなが　あります。\n      \n      今日きょうは　雛人形ひなにんぎょうを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "坂本龍馬 Ryoma Sakamoto",
      url: "https://cijapanese.com/ryoma-sakamoto/",
      level: "beginner",
      membership: "free",
      transcript: "この人を知っていますか？彼の名前は坂本龍馬といいます。\n\n      今です。昔です。坂本龍馬は昔の人です。江戸時代の人です。日本の歴史上の人物、昔の人物です。今日は坂本龍馬についてお話します。\n      \n      坂本龍馬は1836年に生まれました。江戸時代です。土佐で生まれました。ここが土佐です。土佐で生まれました。\n      \n      これが龍馬です。龍馬にはお兄さんが一人、お姉さんが三人いました。１２３４５、５人兄弟の一番下、末っ子でした。\n      \n      これは刀です。剣です。剣で戦います。剣術といいます。龍馬は14歳の時に剣術を始めました。龍馬は剣術がとても強かったそうです。\n      \n      もっと強くなりたいです。もっと強くなるために、１９歳の時に江戸に行きます。江戸はここにありました。今の東京です。坂本龍馬は江戸に行って、江戸で剣術の練習をしていました。\n      \n      龍馬が江戸にいる時、ある日黒い船が来ました。大きな黒い船が日本に来ました。とても大きな船です。大きな大砲もあります。この船はアメリカから来ました。日本の人たちはびっくりしました！大きな黒いアメリカの船を見てびっくりしました。\n      \n      その頃日本は弱い国でした。アメリカやイギリスは強い国でした。日本はアメリカやイギリスのように強くありませんでした。日本は大きな船や武器を持っていません。日本には大きな船や武器はまだありませんでした。なのでみんな驚きました。龍馬も驚きました。\n      \n      そして龍馬は思いました。今の日本はダメだ！このままじゃダメだ！今の日本は弱すぎる。もっと強くならなければ！もっと強くならないとアメリカやヨーロッパから攻撃されてしまうと思いました。日本をもっと強い国にしよう！新しい日本を作ろう！と思いました。\n      \n      そして龍馬は江戸から土佐に帰ります。そこで二人の人に出会います。ジョン万次郎と勝海舟という人に出会います。\n      \n      彼らは前にアメリカに行ったことがあります。アメリカに住んでいました。なのでアメリカやヨーロッパのことをよく知っています。アメリカやヨーロッパのことに詳しいです。龍馬は二人から外国のことについて教えてもらいます。二人から教えてもらって外国のことについて勉強します。\n      \n      その頃の日本は江戸時代でした。江戸幕府がありました。龍馬は江戸幕府を壊して、江戸幕府をなくして、新しい日本を作りたいと思っていました。そのためにはみんなが協力しなければいけません。\n      \n      ここに薩摩という国がありました。ここに長州という国がありました。薩摩と長州はとても強かったです。でも薩摩と長州はとても仲が悪かったです。龍馬は薩摩と長州が「仲良くなる手伝いをしました。龍馬のおかげで薩摩と長州は仲良くなりました。\n      \n      そしてみんなで協力して、みんなで力を合わせて江戸幕府を壊しました。なくしました。そして新しい日本を作りました。\n      \n      でも幕府の人たちは龍馬のことを怒っています。１８６７年、龍馬は京都にいました。京都で刀で殺されてしまいました。龍馬は死んでしまいました。誰が龍馬を殺したのかはわかっていません。わかりません。\n      \n      龍馬は今も日本でとても人気があります。これはテレビです。これは映画館です。これは本です。これは漫画です。日本には坂本龍馬のドラマや映画や本や漫画がたくさんあります。とても人気です。これは銅像です。\n      \n      日本中色々な場所に、坂本龍馬の銅像があります。\n      \n      今日は日本の歴史上の人物、坂本龍馬についてお話しました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "この人ひとを　知しっていますか。\n\n      彼かれの　名前なまえは　坂本龍馬さかもとりょうまと　いいます。\n      \n      今いまです。昔むかしです。\n      \n      坂本龍馬さかもとりょうまは　昔むかしの　人ひとです。\n      \n      江戸時代えどじだいの　人ひとです。\n      \n      日本にほんの　歴史上れきしじょうの　人物じんぶつ　昔むかしの　人物じんぶつです。\n      \n      今日きょうは　坂本龍馬さかもとりょうまについて　お話はなしします。\n      \n      坂本龍馬さかもとりょうまは　１８３６年せんはっぴゃくさんじゅうろくねんに　生うまれました。\n      \n      江戸時代えどじだいです。\n      \n      土佐とさで　生うまれました。\n      \n      ここが　土佐とさです。\n      \n      土佐とさで　生うまれました。\n      \n      これが　龍馬りょうまです。\n      \n      龍馬りょうまには　お兄にいさんが　一人ひとり　お姉ねえさんが　三人さんにん　いました。\n      \n      １いち２に３さん４し５ご　５人兄弟ごにんきょうだいの　一番下いちばんした　末すえっ子こでした。\n      \n      これは　刀かたなです。\n      \n      剣けんです。\n      \n      剣けんで　戦たたかいます。\n      \n      剣術けんじゅつと　いいます。\n      \n      龍馬りょうまは　１４歳じゅうよんさいの時ときに　剣術けんじゅつを　始はじめました。\n      \n      龍馬りょうまは　剣術けんじゅつが　とても　強つよかったそうです。\n      \n      もっと　強つよくなりたいです。\n      \n      もっと　強つよくなるために　１９歳じゅうきゅうさいの時ときに　江戸えどに　行いきます。\n      \n      江戸えどは　ここに　ありました。\n      \n      今いまの　東京とうきょうです。\n      \n      坂本龍馬さかもとりょうまは　江戸えどに　行いって　江戸えどで　剣術けんじゅつの　練習れんしゅうを　していました。\n      \n      龍馬りょうまが　江戸えどに　いる時とき　ある日ひ　黒くろい　船ふねが　来きました。\n      \n      大おおきな　黒くろい　船ふねが　日本にほんに　来ました。\n      \n      とても　大おおきな　船ふねです。\n      \n      大おおきな　大砲たいほうも　あります。\n      \n      この　船ふねは　アメリカあめりかから　来きました。\n      \n      日本にほんの　人ひとたちは　びっくりしました。\n      \n      大おおきな　黒くろい　アメリカあめりかの　船ふねを　見みて　びっくりしました。\n      \n      その頃ころ　日本にほんは　弱よわい　国くにでした。\n      \n      アメリカあめりかや　イギリスいぎりすは　強つよい　国くにでした。\n      \n      日本にほんは　アメリカあめりかや　イギリスいぎりすのように　強つよくありませんでした。\n      \n      日本にほんは　大おおきな　船ふねや　武器ぶきを　持もっていません。\n      \n      日本にほんには　大おおきな　船ふねや　武器ぶきは　まだ　ありませんでした。\n      \n      なので　みんな　驚おどろきました。\n      \n      龍馬りょうまも　驚おどろきました。\n      \n      そして　龍馬りょうまは　思おもいました。\n      \n      今いまの　日本にほんは　ダメだめだ。\n      \n      このままじゃ　ダメだめだ。\n      \n      今いまの　日本にほんは　弱よわすぎる。\n      \n      もっと　強つよくならなければ、　もっと　強つよくならないと　アメリカあめりかや　ヨーロッパよーろっぱから　攻撃こうげきされてしまうと　思おもいました。\n      \n      日本にほんを　もっと　強つよい　国くににしよう、新あたらしい　日本にほんを　作つくろうと　思おもいました。\n      \n      そして　龍馬りょうまは　江戸えどから　土佐とさに　帰かえります。\n      \n      そこで　二人ふたりの　人ひとに　出会であいます。\n      \n      ジョン万次郎じょんまんじろうと　勝海舟かつかいしゅうという　人ひとに　出会であいます。\n      \n      彼かれらは　前まえに　アメリカあめりかに　行いったことが　あります。\n      \n      アメリカあめりかに　住すんでいました。\n      \n      なので　アメリカあめりかや　ヨーロッパよーろっぱのことを　よく　知しっています。\n      \n      アメリカあめりかや　ヨーロッパよーろっぱのことに　詳くわしいです。\n      \n      龍馬りょうまは　二人ふたりから　外国がいこくのことについて　教おしえてもらいます。\n      \n      二人ふたりから　教おしえてもらって　外国がいこくのことについて　勉強べんきょうします。\n      \n      その頃ころの　日本にほんは　江戸時代えどじだいでした。\n      \n      江戸幕府えどばくふが　ありました。\n      \n      龍馬りょうまは　江戸幕府えどばくふを　壊こわして、江戸幕府えどばくふを　なくして　新あたらしい　日本にほんを　作つくりたいと　思おもっていました。\n      \n      そのためには　みんなが　協力きょうりょくしなければいけません。\n      \n      ここに　薩摩さつまという　国くにが　ありました。\n      \n      ここに　長州ちょうしゅうという　国くにが　ありました。\n      \n      薩摩さつまと　長州ちょうしゅうは　とても　強つよかったです。\n      \n      でも　薩摩さつまと　長州ちょうしゅうは　とても　仲なかが　悪わるかったです。\n      \n      龍馬りょうまは　薩摩さつまと　長州ちょうしゅうが　仲良なかよくなる　手伝てつだいを　しました。\n      \n      龍馬りょうまの　おかげで　薩摩さつまと　長州ちょうしゅうは　仲良なかよくなりました。\n      \n      そして　みんなで　協力きょうりょくして　みんなで　力ちからを　合あわせて　江戸幕府えどばくふを　壊こわしました。\n      \n      なくしました。\n      \n      そして　新あたらしい　日本にほんを　作つくりました。\n      \n      でも　幕府ばくふの　人たちは　龍馬りょうまのことを　怒おこっています。\n      \n      １８６７年せんはっぴゃくろくじゅうななねん　龍馬りょうまは　京都きょうとに　いました。\n      \n      京都きょうとで　刀かたなで　殺ころされてしまいました。\n      \n      龍馬りょうまは　死しんでしまいました。\n      \n      誰だれが　龍馬りょうまを　殺ころしたのかは　わかっていません。\n      \n      わかりません。\n      \n      龍馬りょうまは　今いまも　日本にほんで　とても　人気にんきが　あります。\n      \n      これは　テレビてれびです。\n      \n      これは　映画館えいがかんです。\n      \n      これは　本ほんです。\n      \n      これは　漫画まんがです。\n      \n      日本にほんには　坂本龍馬さかもとりょうまの　ドラマどらまや　映画えいがや　本ほんや　漫画まんがが　たくさん　あります。\n      \n      とても　人気にんきです。\n      \n      これは　銅像どうぞうです。\n      \n      日本中にほんじゅう　色々いろいろな　場所ばしょに　坂本龍馬さかもとりょうまの　銅像どうぞうが　あります。\n      \n      今日きょうは　日本にほんの　歴史上れきしじょうの　人物じんぶつ　坂本龍馬さかもとりょうまについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "大きなかぶ The Enormous Turnip",
      url: "https://cijapanese.com/the-enormous-turnip/",
      level: "beginner",
      membership: "free",
      transcript: "これはかぶです。白くて丸い野菜です。\n\n      今日は「大きなかぶ」大きなかぶのお話をします。\n      \n      白、青、赤。どこの国の国旗ですか。ロシアの国旗です。「大きなかぶ」はロシアの昔話です。\n      \n      おじいさんがいます。これはかぶです。これはかぶの種です。おじいさんがかぶの種を植えます。これは土です。おじいさんが土にかぶの種を植えました。\n      \n      「大きくなあれ。おいしくなあれ。」「大きなかぶになあれ。おいしいかぶになあれ。」と言いながら、おじいさんは毎日毎日かぶのお世話をしました。\n      \n      するとかぶは大きくなりました。どんどんどんどん大きくなりました。もっと大きくなりました。巨大なかぶになりました。おじいさんは「よし！かぶを抜こう！」と思いました。\n      \n      おじいさん一人でかぶを抜こうとします。「よいしょ、よいしょ。」かぶは抜けません。かぶは大き過ぎて抜けません。\n      \n      おじいさんはおばあさんを呼びます。おばあさんが来ました。おばあさんがおじいさんを手伝います。二人で一緒に「よいしょ、よいしょ。」かぶを抜こうとします。でも二人で引っ張っても抜けません。まだ抜けません。\n      \n      今度は孫を呼びます。孫が来ました。孫も手伝います。三人で「よいしょ、よいしょ。」かぶを引っ張ります。それでも抜けません。まだ抜けません。\n      \n      今度は犬を呼びます。犬が来ました。犬も手伝います。「よいしょ、よいしょ。」まだ抜けません。\n      \n      猫が来ました。猫も手伝います。「よいしょ、よいしょ。」それでもかぶは抜けません。\n      \n      今度はネズミが来ました。ネズミも手伝います。みんなで一緒に「よいしょ、よいしょ。」かぶを引っ張ります。\n      \n      すると、ぽーんっ。かぶが抜けました。やっと抜けました。「やったー！抜けた！」みんな喜んでいます。みんな嬉しそうです。\n      \n      おしまい。",
      transcript_furigana: "これは　かぶです。\n\n      白しろくて　丸まるい　野菜やさいです。\n      \n      今日きょうは　「大おおきな　かぶ」　大おおきな　かぶの　お話はなしをします。\n      \n      白しろ　青あお　赤あか。\n      \n      どこの　国くにの　国旗こっきですか。\n      \n      ロシアろしあの　国旗こっきです。\n      \n      「大おおきな　かぶ」は　ロシアろしあの　昔話むかしばなしです。\n      \n      おじいさんが　います。\n      \n      これは　かぶです。\n      \n      これは　かぶの　種たねです。\n      \n      おじいさんが　かぶの　種たねを　植うえます。\n      \n      これは　土つちです。\n      \n      おじいさんが　土つちに　かぶの　種たねを　植うえました。\n      \n      「大おおきく　なあれ。　おいしく　なあれ。」\n      \n      「大おおきな　かぶに　なあれ。　おいしい　かぶに　なあれ。」と　言いいながら　おじいさんは　毎日まいにち　毎日まいにち　かぶの　お世話せわを　しました。\n      \n      すると　かぶは　大おおきく　なりました。\n      \n      どんどん　どんどん　大おおきく　なりました。\n      \n      もっと　大おおきく　なりました。\n      \n      巨大きょだいな　かぶに　なりました。\n      \n      おじいさんは　「よし　かぶを　抜ぬこう！」と　思おもいました。\n      \n      おじいさん　一人ひとりで　かぶを　抜ぬこうと　します。\n      \n      「よいしょ　よいしょ」\n      \n      かぶは　抜ぬけません。\n      \n      かぶは　大おおき過ぎて　抜ぬけません。\n      \n      おじいさんは　おばあさんを　呼よびます。\n      \n      おばあさんが来きました。\n      \n      おばあさんが　おじいさんを　手伝てつだいます。\n      \n      二人ふたりで　一緒いっしょに　「よいしょ　よいしょ」　かぶを　抜ぬこうと　します。\n      \n      でも　二人ふたりで　引ひっ張ぱっても　抜ぬけません。\n      \n      まだ　抜ぬけません。\n      \n      今度こんどは　孫まごを　呼よびます。\n      \n      孫まごが　来きました。\n      \n      孫まごも　手伝てつだいます。\n      \n      三人さんにんで　「よいしょ　よいしょ」　かぶを　引ひっ張ぱります。\n      \n      それでも　抜ぬけません。\n      \n      まだ　抜ぬけません。\n      \n      今度こんどは　犬いぬを　呼よびます。\n      \n      犬いぬが　来きました。\n      \n      犬いぬも　手伝てつだいます。\n      \n      「よいしょ　よいしょ」　まだ　抜ぬけません。\n      \n      猫ねこが　来きました。\n      \n      猫ねこも　手伝てつだいます。\n      \n      「よいしょ　よいしょ」\n      \n      それでも　かぶは　抜ぬけません。\n      \n      今度こんどは　ネズミねずみが　来きました。\n      \n      ネズミねずみも　手伝てつだいます。\n      \n      みんなで　一緒いっしょに　「よいしょ　よいしょ」　かぶを　引ひっ張ぱります。\n      \n      すると　ぽーんっ　かぶが　抜ぬけました。\n      \n      やっと　抜ぬけました。\n      \n      「やったー！　抜ぬけた！」\n      \n      みんな　喜よろこんでいます。\n      \n      みんな　嬉うれしそうです。\n      \n      おしまい。"
  },
  {
      title: "人生で一番怖かったこと The Scariest Memory in My Life",
      url: "https://cijapanese.com/the-scariest-memory-in-my-life/",
      level: "beginner",
      membership: "free",
      transcript: "これはおばけです。これは蛇です。これはジェットコースターです。\n\n      おばけは怖いですか。それとも怖くないですか。蛇は怖いですか。怖くないですか。ジェットコースターは怖いですか。怖くないですか。\n      \n      私は全部怖いです。おばけも蛇もジェットコースターも全部怖いです。\n      \n      今日は私が人生で一番怖かったことについてお話します。私が今までで一番怖いと思ったことについてお話します。\n      \n      今２０２１年です。今年の１月１日。お正月です。今年のお正月に家族でキャンプに行きました。\n      \n      私たちの家は福岡にあります。キャンプ場は大分にあります。大分にキャンプに行きました。大分ではその前の日、前日、１２月３１日にたくさん雪が降りました。なので道路にも雪が積もっていました。\n      \n      ここはキャンプ場です。キャンプ場から車で３０分位の場所に温泉がありました。これは温泉です。お風呂です。キャンプ場は雪が降っていてとても寒かったです。\n      \n      とても寒かったので、温泉に行こうと思いました。みんなで温泉に行って温かい、温かいお風呂に入ろうと思いました。\n      \n      みんなで車に乗りました。夫が運転しました。キャンプ場を出発します。温泉に向かいます。\n      \n      途中に、キャンプ場から温泉に行く途中に、坂がありました。坂です。なだらかな坂、緩やかな坂ではありません。急な坂です。急な坂がありました。坂の横は崖です。下は川です。下には川があります。\n      \n      前の日、前日に、雪が降ったので道路は凍っていました。これは水です。これは氷です。凍っています。道路も凍っていました。ツルッツルッと滑ります。\n      \n      車が坂を上がろうとします。でも滑って上がれません。上がることができません。上がろうとします。すると少しずつ少しずつ、車が左に行きます。ちょっとずつちょっとずつ左に行きます。\n      \n      日本の車は運転する人が右に乗ります。運転席が右です。夫が運転していたので夫が右側に乗っていました。私が左側に乗っていました。子供たちは後ろに乗っていました。\n      \n      車が少しずつ少しずつ左に行きます。私は落ちる！と思いました。そして、死ぬ！と思いました。車が落ちてしまう、そして家族みんな死んでしまうと思いました。とっても怖かったです。人生で一番怖かったです。私は怖くて泣いていました。\n      \n      私達は車を降りました。車を止めて外に出ました。どうしよう、どうしようと困っていました。\n      \n      その時後ろからトラックが来ました。トラックから男の人が降りてきました。若い男の人が降りてきました。「どうしましたか」「車が坂を登れません。」「車が坂を上がれません。」と言いました。説明しました。\n      \n      若い男の人は「大丈夫ですよ！」と言いました。家族です。親戚です。その人は「親戚が坂の上に住んでいます。坂の上に住んでいる親戚がいます。電話をして親戚を呼びます。」と言いました。\n      \n      そして電話をして親戚のおじさんを呼んでくれました。そしておじさんの車で私達の車を引っ張ってくれました。坂の上まで引っ張ってくれました。\n      \n      私達は2人に助けてもらいました。私は今度は嬉しくて泣きました。落ちなくて良かった、死ななくて良かった、2人が助けてくれて良かったと安心しました。安心して涙が出ました。\n      \n      「ありがとうございました。」「ありがとうございました。」とお礼を言いました。\n      \n      その後みんなで温泉に行きました。\n      \n      今日は、私が今までで一番怖い思いをした出来事についてお話しました。\n      \n      今日はこれでおしまい。",
      transcript_furigana: "これは　おばけです。\n\n      これは　蛇へびです。\n      \n      これは　ジェットコースターじぇっとこーすたーです。\n      \n      おばけは　怖こわいですか。\n      \n      それとも　怖こわくないですか。\n      \n      蛇へびは　怖こわいですか。\n      \n      怖こわくないですか。\n      \n      ジェットコースターじぇっとこーすたーは　怖こわいですか。\n      \n      怖こわくないですか。\n      \n      私わたしは　全部　怖こわいです。\n      \n      おばけも　蛇へびも　ジェットコースターじぇっとこーすたーも　全部　怖こわいです。\n      \n      今日きょうは　私わたしが　人生じんせいで　一番いちばん　怖こわかったことについて　お話はなしします。\n      \n      私わたしが　今いままでで　一番いちばん　怖こわいと　思ったことについて　お話はなしします。\n      \n      今いま　２０２１年にせんにじゅういちねんです。\n      \n      今年ことしの　１月１日いちがつついたち　お正月しょうがつです。\n      \n      今年ことしの　お正月しょうがつに　家族かぞくで　キャンプきゃんぷに　行いきました。\n      \n      私わたしたちの　家いえは　福岡ふくおかに　あります。\n      \n      キャンプ場きゃんぷじょうは　大分おおいたに　あります。\n      \n      大分おおいたに　キャンプきゃんぷに　行いきました。\n      \n      大分おおいたでは　その　前まえの日ひ、　前日ぜんじつ　１２月３１日じゅうにがつさんじゅういちにちに　たくさん　雪ゆきが　降ふりました。\n      \n      なので　道路どうろにも　雪ゆきが　積つもっていました。\n      \n      ここは　キャンプ場きゃんぷじょうです。\n      \n      キャンプ場きゃんぷじょうから　車くるまで　３０分位さんじゅっぷんくらいの　場所ばしょに　温泉おんせんが　ありました。\n      \n      これは　温泉おんせんです。\n      \n      お風呂ふろです。\n      \n      キャンプ場きゃんぷじょうは　雪ゆきが　降ふっていて　とても　寒さむかったです。\n      \n      とても　寒さむかったので　温泉おんせんに　行いこうと　思おもいました。\n      \n      みんなで　温泉おんせんに　行いって　温あたたかい　温あたたかい　お風呂ふろに　入はいろうと　思おもいました。\n      \n      みんなで　車くるまに　乗のりました。\n      \n      夫おっとが　運転うんてんしました。\n      \n      キャンプ場きゃんぷじょうを　出発しゅっぱつします。\n      \n      温泉おんせんに　向むかいます。\n      \n      途中とちゅうに　キャンプ場きゃんぷじょうから　温泉おんせんに　行いく　途中とちゅうに　坂さかが　ありました。\n      \n      坂さかです。\n      \n      なだらかな　坂さか、　緩ゆるやかな　坂さかではありません。\n      \n      急きゅうな　坂さかです。\n      \n      急きゅうな　坂さかが　ありました。\n      \n      坂さかの　横よこは　崖がけです。\n      \n      下したは　川かわです。\n      \n      下したには　川かわが　あります。\n      \n      前まえの日ひ、　前日ぜんじつに　雪ゆきが　降ふったので　道路どうろは　凍こおっていました。\n      \n      これは　水みずです。　\n      \n      これは　氷こおりです。\n      \n      凍こおっています。\n      \n      道路どうろも　凍こおっていました。\n      \n      ツルッつるっ　ツルッつるっと　滑すべります。\n      \n      車くるまが　坂さかを　上あがろうとします。\n      \n      でも　滑すべって　上あがれません。\n      \n      上あがることが　できません。\n      \n      上あがろうとします。\n      \n      すると　少すこしずつ　少すこしずつ　車くるまが　左ひだりに　行いきます。\n      \n      ちょっとずつ　ちょっとずつ　左ひだりに　行いきます。\n      \n      日本にほんの　車くるまは　運転うんてんする人ひとが　右みぎに　乗のります。\n      \n      運転席うんてんせきが　右みぎです。\n      \n      夫おっとが　運転うんてんしていたので　夫おっとが　右側みぎがわに　乗のっていました。\n      \n      私わたしが　左側ひだりがわに　乗のっていました。\n      \n      子供こどもたちは　後うしろに　乗のっていました。\n      \n      車くるまが　少すこしずつ　少すこしずつ　左ひだりに　行いきます。\n      \n      私わたしは　落おちると　思おもいました。\n      \n      そして　死しぬと　思おもいました。\n      \n      車くるまが　落おちてしまう　そして　家族かぞく　みんな　死しんでしまうと　思おもいました。\n      \n      とっても　怖こわかったです。\n      \n      人生じんせいで　一番いちばん　怖こわかったです。\n      \n      私わたしは　怖こわくて　泣ないていました。\n      \n      私わたしたちは　車くるまを　降おりました。\n      \n      車くるまを　止とめて　外そとに　出でました。\n      \n      どうしよう　どうしようと　困こまっていました。\n      \n      その時とき　後うしろから　トラックとらっくが　来きました。\n      \n      トラックとらっくから　男おとこの人ひとが　降おりてきました。\n      \n      若わかい　男おとこの人ひとが　降おりてきました。\n      \n      「どうしましたか。」\n      \n      「車くるまが　坂さかを　登のぼれません。」\n      \n      「車くるまが　坂さかを　上あがれません。」と　言いいました。　\n      \n      説明せつめいしました。\n      \n      若わかい　男おとこの人ひとは　「大丈夫だいじょうぶですよ。」と　言いいました。\n      \n      家族かぞくです。\n      \n      親戚しんせきです。\n      \n      その人ひとは　「親戚しんせきが　坂さかの　上うえに　住すんでいます。\n      \n      坂さかの　上うえに　住すんでいる　親戚しんせきが　います。\n      \n      電話でんわをして　親戚しんせきを　呼よびます。」と　言いいました。\n      \n      そして　電話でんわをして　親戚しんせきの　おじさんを　呼よんでくれました。\n      \n      そして　おじさんの　車くるまで　私わたしたちの　車くるまを　引ひっ張ぱってくれました。\n      \n      坂さかの　上うえまで　引ひっ張ぱってくれました。\n      \n      私わたしたちは　2人ふたりに　助たすけてもらいました。\n      \n      私わたしは　今度こんどは　嬉うれしくて　泣なきました。\n      \n      落おちなくて　良よかった　死しななくて　良よかった　２人ふたりが　助たすけてくれて　良よかったと　安心あんしんしました。\n      \n      安心あんしんして　涙なみだが　出でました。\n      \n      「ありがとうございました。」「ありがとうございました。」と　お礼れいを　言いいました。\n      \n      その後あと　みんなで　温泉おんせんに　行いきました。\n      \n      今日きょうは　私わたしが　今いままでで　一番いちばん　怖こわい　思おもいをした　出来事できごとについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "ホワイトデー White Day",
      url: "https://cijapanese.com/white-day/",
      level: "beginner",
      membership: "free",
      transcript: "２月１４日は何の日ですか。バレンタインデーですね。\n\n      今３月です。先月２月に、日本のバレンタインデーについての動画をアップしました。見ましたか。まだですか。まだ見ていない人はぜひ見てください。\n      \n      これは男の人です。これは女の人です。日本ではバレンタインの日に、女の人が男の人にプレゼントをします。日本ではバレンタインの日に、女性が男性にチョコレートをあげます。彼氏や好きな人、会社の人や学校の友達など、いろいろな人にチョコレートをあげます。\n      \n      バレンタインのちょうど１ヶ月後。３月１４日にホワイトデーという日があります。聞いたことがありますか。ないですか。初めて聞きましたか。ホワイトデーとは何でしょう。\n      \n      女性がいます。この女性の名前は花子さんです。男性がいます。この男性の名前は太郎さんです。２月１４日バレンタインの日に、花子さんは太郎さんにチョコレートをあげました。\n      \n      １ヶ月経ちました。１ヶ月後です。３月１４日ホワイトデーです。今度は太郎さんが花子さんにプレゼントをします。マシュマロやクッキーや飴などお菓子をあげます。\n      \n      太郎さんはバレンタインの日に花子さんからチョコを貰いました。なのでホワイトデーに花子さんにお返しをします。ホワイトデーとは、バレンタインにチョコを貰った男性が、チョコをくれた女性にお返しをする日です。「ありがとう」とお返しをする日です。\n      \n      これは指輪です。これはネックレスです。恋人同士の場合は、指輪やネックレスなどアクセサリーをプレゼントすることもあります。\n      \n      私はバレンタインの日に夫と息子にチョコをあげました。今日は３月９日です。もうすぐホワイトデーです。お菓子をもらうのを楽しみにしています。\n      \n      今日は日本の３月のイベント、ホワイトデーを紹介しました。今日はこれでおしまい。またね。",
      transcript_furigana: "２月１４日にがつじゅうよっかは　何なんの日ひですか。\n\n      バレンタインデーばれんたいんでーですね。\n      \n      今いま　３月さんがつです。\n      \n      先月せんげつ　２月にがつに　日本にほんの　バレンタインデーばれんたいんでーについての　動画どうがを　アップあっぷしました。\n      \n      見みましたか。　まだですか。\n      \n      まだ　見みていない　人ひとは　ぜひ　見みてください。\n      \n      これは　男おとこの人ひとです。\n      \n      これは　女おんなの人ひとです。\n      \n      日本にほんでは　バレンタインばれんたいんの　日ひに　女おんなの人ひとが　男おとこの人ひとに　プレゼントぷれぜんとをします。\n      \n      日本にほんでは　バレンタインばれんたいんの　日ひに　女性じょせいが　男性だんせいに　チョコレートちょこれーとを　あげます。\n      \n      彼氏かれしや　好すきな人ひと　会社かいしゃの　人ひとや　学校がっこうの　友達ともだちなど　いろいろな人ひとに　チョコレートちょこれーとを　あげます。\n      \n      バレンタインばれんたいんの　ちょうど　１ヶ月後いっかげつご　３月１４日さんがつじゅうよっかに　ホワイトデーほわいとでーという　日ひが　あります。\n      \n      聞きいたことが　ありますか。　ないですか。\n      \n      初はじめて　聞ききましたか。\n      \n      ホワイトデーほわいとでーとは　何なんでしょう。\n      \n      女性じょせいが　います。\n      \n      この　女性じょせいの　名前なまえは　花子はなこさんです。\n      \n      男性だんせいが　います。\n      \n      この　男性だんせいの　名前なまえは　太郎たろうさんです。\n      \n      ２月１４日にがつじゅうよっか　バレンタインばれんたいんの　日ひに　花子はなこさんは　太郎たろうさんに　チョコレートちょこれーとを　あげました。\n      \n      １ヶ月いっかげつ　経たちました。　１ヶ月後いっかげつごです。\n      \n      ３月１４日さんがつじゅうよっか　ホワイトデーほわいとでーです。\n      \n      今度こんどは　太郎たろうさんが　花子はなこさんに　プレゼントぷれぜんとをします。\n      \n      マシュマロましゅまろや　クッキーくっきーや　飴あめなど　お菓子かしを　あげます。\n      \n      太郎たろうさんは　バレンタインばれんたいんの　日ひに　花子はなこさんから　チョコちょこを　貰もらいました。\n      \n      なので　ホワイトデーほわいとでーに　花子はなこさんに　お返かえしをします。\n      \n      ホワイトデーほわいとでーとは　バレンタインばれんたいんに　チョコちょこを　貰もらった　男性だんせいが　チョコちょこを　くれた　女性じょせいに　お返かえしを　する日ひです。\n      \n      「ありがとう。」と　お返かえしを　する日ひです。\n      \n      これは　指輪ゆびわです。\n      \n      これは　ネックレスねっくれすです。\n      \n      恋人同士こいびとどうしの　場合ばあいは　指輪ゆびわや　ネックレスねっくれすなど　アクセサリーあくせさりーを　プレゼントぷれぜんとすることも　あります。\n      \n      私わたしは　バレンタインばれんたいんの　日ひに　夫おっとと　息子むすこに　チョコちょこを　あげました。\n      \n      今日きょうは　３月９日さんがつここのかです。\n      \n      もうすぐ　ホワイトデーほわいとでーです。\n      \n      お菓子かしを　もらうのを　楽たのしみにしています。\n      \n      今日きょうは　日本にほんの　３月の　イベントいべんと　ホワイトデーほわいとでーを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。　またね。"
  },
  {
      title: "日本の春 Spring in Japan",
      url: "https://cijapanese.com/spring-in-japan/",
      level: "beginner",
      membership: "free",
      transcript: "日本には春、夏、秋、冬、４つの季節があります。四季があります。\n\n      今３月です。今、日本は春です。３月から５月までが春です。今日は日本の春を紹介します。\n      \n      夏は暑いです。冬は寒いです。春は夏のように暑くないです。冬のように寒くないです。暑くもないし寒くもないです。\n      \n      春は暖かくて過ごしやすいです。なので私は春が好きです。春は私が一年の中で一番好きな季節です。日本に来るなら、日本に旅行をするなら春がおすすめです。\n      \n      日本の春といえばこれです。桜です。桜の花です。桜はとてもきれいです。日本人はみんな桜が好きです。私も桜が好きです。春になると日本中で桜が咲きます。\n      \n      ここは九州です。私は九州に住んでいます。私が住んでいる九州では、３月の終わりから４月の初め、３月下旬から４月上旬に桜が咲きます。\n      \n      ここは北海道です。北海道では、４月の終わりから５月の初め、４月下旬から５月上旬に桜が咲きます。\n      \n      北です。南です。南の方が先に咲きます。南の方が早く桜が咲きます。北の方が後に咲きます。北の方が遅く桜が咲きます。\n      \n      もう一つ日本の春といえば、卒業と入学です。\n      \n      学校です。保育園、幼稚園、小学校、中学校、高校、大学です。日本の学校はどれも３月に終わります。３月に卒業します。そして春休みがあります。そして４月にまた始まります。４月に入学します。\n      \n      私の息子は今６歳です。今月、今年の３月に保育園を卒業します。保育園を卒園します。そして来月、４月に小学校に入学します。\n      \n      今日は日本の春についてお話しました。今日はこれでおしまい。またね。",
      transcript_furigana: "日本にほんには　春はる　夏なつ　秋あき　冬ふゆ、　４よっつの　季節きせつが　あります。\n\n      四季しきが　あります。\n      \n      今いま　３月さんがつです。\n      \n      今いま　日本にほんは　春はるです。\n      \n      ３月さんがつから　５月ごがつまでが　春はるです。\n      \n      今日きょうは　日本にほんの　春はるを　紹介しょうかいします。\n      \n      夏なつは　暑あついです。\n      \n      冬ふゆは　寒さむいです。\n      \n      春はるは　夏なつのように　暑あつくないです。\n      \n      冬ふゆのように　寒さむくないです。\n      \n      暑あつくもないし　寒さむくもないです。\n      \n      春はるは　暖あたたかくて　過すごしやすいです。\n      \n      なので　私わたしは　春はるが　好すきです。\n      \n      春はるは　私わたしが　一年いちねんの　中なかで　一番いちばん　好すきな　季節きせつです。\n      \n      日本にほんに　来くるなら　日本にほんに　旅行りょこうを　するなら　春はるが　おすすめです。\n      \n      日本にほんの　春はるといえば　これです。\n      \n      桜さくらです。\n      \n      桜さくらの　花はなです。\n      \n      桜さくらは　とても　きれいです。\n      \n      日本人にほんじんは　みんな　桜さくらが　好すきです。\n      \n      私わたしも　桜さくらが　好すきです。\n      \n      春はるになると　日本中にほんじゅうで　桜さくらが　咲さきます。\n      \n      ここは　九州きゅうしゅうです。\n      \n      私わたしは　九州きゅうしゅうに　住すんでいます。\n      \n      私わたしが　住すんでいる　九州きゅうしゅうでは　３月さんがつの　終おわりから　４月しがつの　初はじめ、　３月下旬さんがつげじゅんから　４月上旬しがつじょうじゅんに　桜さくらが　咲さきます。\n      \n      ここは　北海道ほっかいどうです。\n      \n      北海道ほっかいどうでは　４月しがつの　終おわりから　５月ごがつの　初はじめ、　４月下旬しがつげじゅんから　５月上旬ごがつじょうじゅんに　桜さくらが　咲さきます。\n      \n      北きたです。南みなみです。\n      \n      南みなみの　方ほうが　先さきに　咲さきます。\n      \n      南みなみの　方ほうが　早はやく　桜さくらが　咲さきます。\n      \n      北きたの　方ほうが　後あとに　咲さきます。\n      \n      北きたの　方ほうが　遅おそく　桜さくらが　咲さきます。\n      \n      もう一ひとつ　日本にほんの　春はるといえば　卒業そつぎょうと　入学にゅうがくです。\n      \n      学校がっこうです。\n      \n      保育園ほいくえん　幼稚園ようちえん　小学校しょうがっこう　中学校ちゅうがっこう　高校こうこう　大学だいがくです。\n      \n      日本にほんの　学校がっこうは　どれも　３月さんがつに　終おわります。\n      \n      ３月さんがつに　卒業そつぎょうします。\n      \n      そして　春休はるやすみが　あります。\n      \n      そして　４月しがつに　また　始はじまります。\n      \n      ４月しがつに　入学にゅうがくします。\n      \n      私わたしの　息子むすこは　今いま　６歳ろくさいです。\n      \n      今月こんげつ　今年ことしの　３月さんがつに　保育園ほいくえんを　卒業そつぎょうします。\n      \n      保育園ほいくえんを　卒園そつえんします。\n      \n      そして　来月らいげつ　４月しがつに　小学校しょうがっこうに　入学にゅうがくします。\n      \n      今日きょうは　日本にほんの　春はるについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "七つの大罪 The Seven Deadly Sins (Anime)",
      url: "https://cijapanese.com/the-seven-deadly-sins-anime/",
      level: "beginner",
      membership: "free",
      transcript: "日本の漫画やアニメは好きですか。「七つの大罪」という漫画を知っていますか。アニメもあります。ゲームもあるそうです。とても人気のアニメだそうです。観たことがありますか。好きですか。\n\n      今日です。先日ユーチューブでコメントをもらいました。「七つの大罪について話してください」とコメントをもらいました。\n      \n      私はこのアニメについて知りませんでした。なのでこのアニメについて調べてみました。そしてアニメを少しだけ観てみました。とても面白そうなアニメです。\n      \n      「七つの大罪」は長い話です。漫画は全部で４１巻あります。アニメは３４６話まであります。この動画では最初の部分、始まりの部分を話します。\n      \n      これはお城です。昔あるところにリオネスという名前の国がありました。\n      \n      これは騎士です。騎士たちが国を守っています。その中にとても強い７人の騎士がいました。１２３４５６７。７人の騎士がいました。彼らのリーダーの名前はメリオダスといいます。\n      \n      ある日この７人がたくさんの騎士たちを殺してしまいました。たった７人でたくさんの騎士を殺しました。そして７人は国外に、国の外に逃げました。彼ら７人は「七つの大罪」と呼ばれました。\n      \n      それから１０年経ちました。１０年後です。七つの大罪はどこにいるのかわかりません。騎士たちは今も七つの大罪を探しています。でも見つかりません。\n      \n      その頃リオネスの騎士たちは、戦争をしようとしていました。戦いを始めようとしていました。王様や王様の家族は戦いをしたくありません。嫌です。騎士たちは戦いをしたいです。\n      \n      騎士たちは王様や王様の家族を捕まえます。王様たちを捕まえて閉じ込めます。\n      \n      これは王様の娘、王女です。彼女の名前はエリザベスといいます。エリザベスは騎士たちを止めたいです。そして国を守りたいです。王様たちを助けたいです。\n      \n      エリザベスは考えました。どうしよう。そうだ！エリザベスは、騎士たちを止めるために七つの大罪を探すことにしました。七つの大罪を探そう！見つけよう！そして彼らに騎士たちを止めてもらおう！と思いました。\n      \n      エリザベスは一人で七つの大罪を探します。でも見つかりません。なかなか見つかりません。\n      \n      丘があります。丘の上にお店があります。お酒を飲むお店です。エリザベスは七つの大罪を探して疲れています。ある日エリザベスは歩いていました。そして酒場でバタリ、倒れてしまいます。酒場のマスターが助けてくれました。\n      \n      そこへ騎士たちがエリザベスを探して来ました。捕まえに来ました。でも彼が騎士を倒してエリザベスを助けてくれました。\n      \n      エリザベスは言います。「国を守るために七つの大罪を探しています。」するとその酒場の人が言います。「実は私は七つの大罪のリーダー、メリオダスです。」と言います。\n      \n      そしてメリオダスとエリザベスは一緒に残りの６人を探しに行きます。旅を始めます。\n      \n      というお話です。面白そうですね。\n      \n      今日は日本のアニメ「七つの大罪」を紹介しました。おしまい。",
      transcript_furigana: "日本にほんの　漫画まんがや　アニメあにめは　好すきですか。\n\n      「七ななつの大罪たいざい」という　漫画まんがを　知しっていますか。\n      \n      アニメあにめも　あります。\n      \n      ゲームげーむも　あるそうです。\n      \n      とても　人気にんきの　アニメあにめだそうです。\n      \n      観みたことが　ありますか。\n      \n      好すきですか。\n      \n      今日きょうです。\n      \n      先日せんじつ　ユーチューブゆーちゅーぶで　コメントこめんとを　もらいました。\n      \n      「七ななつの大罪たいざいについて　話はなしてください」と　コメントこめんとを　もらいました。\n      \n      私わたしは　この　アニメあにめについて　知しりませんでした。\n      \n      なので　この　アニメあにめについて　調しらべてみました。\n      \n      そして　アニメあにめを　少すこしだけ　観みてみました。\n      \n      とても　面白おもしろそうな　アニメあにめです。\n      \n      「七ななつの大罪たいざい」は　長ながい　話はなしです。\n      \n      漫画まんがは　全部ぜんぶで　４１巻よんじゅういっかん　あります。\n      \n      アニメあにめは　３４６話さんびゃくよんじゅうろくわまで　あります。\n      \n      この　動画どうがでは　最初さいしょの　部分ぶぶん　始はじまりの　部分ぶぶんを　話はなします。\n      \n      これは　お城しろです。\n      \n      昔むかし　あるところに　リオネスりおねすという　名前なまえの　国くにが　ありました。\n      \n      これは　騎士きしです。\n      \n      騎士きしたちが　国くにを　守まもっています。\n      \n      その　中なかに　とても　強つよい　７人しちにんの　騎士きしが　いました。\n      \n      １いち２に３さん４し５ご６ろく７しち　７人しちにんの　騎士きしが　いました。\n      \n      彼かれらの　リーダーりーだーの　名前なまえは　メリオダスめりおだすと　いいます。\n      \n      ある日ひ　この　７人しちにんが　たくさんの　騎士きしたちを　殺ころしてしまいました。\n      \n      たった　７人しちにんで　たくさんの　騎士きしを　殺ころしました。\n      \n      そして　７人しちにんは　国外こくがいに　国くにの　外そとに　逃にげました。\n      \n      彼かれら　７人しちにんは　七ななつの大罪たいざいと　呼よばれました。\n      \n      それから　１０年じゅうねん　経たちました。\n      \n      １０年後じゅうねんごです。\n      \n      七ななつの大罪たいざいは　どこに　いるのか　わかりません。\n      \n      騎士きしたちは　今いまも　七ななつの大罪たいざいを　探さがしています。\n      \n      でも　見みつかりません。\n      \n      その頃ころ　リオネスりおねすの　騎士きしたちは　戦争せんそうを　しようと　していました。\n      \n      戦たたかいを　始はじめようと　していました。\n      \n      王様おうさまや　王様おうさまの　家族かぞくは　戦たたかいを　したくありません。\n      \n      嫌いえです。\n      \n      騎士きしたちは　戦たたかいを　したいです。\n      \n      騎士きしたちは　王様おうさまや　王様おうさまの　家族かぞくを　捕つかまえます。\n      \n      王様おうさまたちを　捕つかまえて　閉とじ込こめます。\n      \n      これは　王様おうさまの　娘むすめ　王女おうじょです。\n      \n      彼女かのじょの　名前なまえは　エリザベスえりざべすと　いいます。\n      \n      エリザベスえりざべすは　騎士きしたちを　止とめたいです。\n      \n      そして　国くにを　守まもりたいです。\n      \n      王様おうさまたちを　助たすけたいです。\n      \n      エリザベスえりざべすは　考かんがえました。\n      \n      どうしよう。\n      \n      そうだ！\n      \n      エリザベスえりざべすは　騎士きしたちを　止とめるために　七ななつの大罪たいざいを　探さがすことにしました。\n      \n      七ななつの大罪たいざいを　探さがそう。　見みつけよう。\n      \n      そして　彼かれらに　騎士きしたちを　止とめてもらおうと　思おもいました。\n      \n      エリザベスえりざべすは　一人ひとりで　七ななつの大罪たいざいを　探さがします。\n      \n      でも　見みつかりません。\n      \n      なかなか　見みつかりません。\n      \n      丘おかが　あります。\n      \n      丘おかの　上うえに　お店みせが　あります。\n      \n      お酒さけを　飲のむ　お店みせです。\n      \n      エリザベスえりざべすは　七ななつの大罪たいざいを　探さがして　疲つかれています。\n      \n      ある日ひ　エリザベスえりざべすは　歩あるいていました。\n      \n      そして　酒場さかばで　バタリばたり　倒たおれてしまいます。\n      \n      酒場さかばの　マスターますたーが　助たすけてくれました。\n      \n      そこへ　騎士きしたちが　エリザベスえりざべすを　探さがして　来きました。\n      \n      捕つかまえに　来きました。\n      \n      でも　彼かれが　騎士きしを　倒たおして　エリザベスえりざべすを　助たすけてくれました。\n      \n      エリザベスえりざべすは　言いいます。\n      \n      「国くにを　守まもるために　七ななつの大罪たいざいを　探さがしています。」\n      \n      すると　その　酒場さかばの　人ひとが　言いいます。\n      \n      「実じつは　私わたしは　七ななつの大罪たいざいの　リーダーりーだー　メリオダスめりおだすです。」と　言いいます。\n      \n      そして　メリオダスめりおだすと　エリザベスえりざべすは　一緒いっしょに　残のこりの　６人ろくにんを　探さがしに　行いきます。\n      \n      旅たびを　始はじめます。\n      \n      という　お話はなしです。\n      \n      面白おもしろそうですね。\n      \n      今日きょうは　日本にほんの　アニメあにめ　「七ななつの大罪たいざい」を　紹介しょうかいしました。\n      \n      おしまい。"
  },
  {
      title: "花咲かじいさん Hanasaka Jiisan",
      url: "https://cijapanese.com/hanasaka-jiisan/",
      level: "beginner",
      membership: "free",
      transcript: "今日は日本の昔話「花咲かじいさん」のお話をします。\n\n      家があります。この家にはおじいさんとおばあさんが住んでいます。優しいおじいさんとおばあさんが住んでいます。\n      \n      隣にもう一軒家があります。隣の家にもおじいさんとおばあさんが住んでいます。この家のおじいさんとおばあさんは意地悪なおじいさんとおばあさんでした。\n      \n      川があります。これは川です。冬です。とても寒いです。川の水はとても冷たいです。優しいおじいさんが歩いていると、冷たい川に一匹の犬がいます。白い犬がいます。寒くて震えています。凍えています。\n      \n      優しいおじいさんはその犬を助けます。助けてあげます。犬を助けて家に連れて帰ります。シロと名前をつけました。優しいおじいさんとおばあさんは、シロをとても可愛がりました。\n      \n      これは畑です。人参やキャベツなど、野菜を作る畑です。おじいさんとおばあさんの家の裏に畑があります。\n      \n      ある日シロが畑で吠えています。ワンワンワンワンとずっと吠えています。おじいさんは「どうしたんだろう。どうしてここでずっと吠えているんだろう。」と思いました。\n      \n      おじいさんはその場所を掘ってみました。土を掘りました。すると土の中からお金がたくさん出てきました。\n      \n      その様子を隣の意地悪なおじいさんとおばあさんが見ています。自分たちもお金が欲しいです。意地悪なおじいさんは優しいおじいさんの真似をします。\n      \n      シロを連れて畑に行きます。そしてシロが吠えた場所を掘ります。でもお金は出てきません。お金ではなくゴミが出てきました。\n      \n      意地悪なおじいさんは怒っています。怒ってシロを殺してしまいます。シロは死んでしまいました。\n      \n      優しいおじいさんとおばあさんは悲しいです。悲しくて泣いています。二人はシロを土に埋めました。そして小さい枝を刺しました。\n      \n      するとその枝は大きな木になりました。おじいさんとおばあさんはその木を切ります。そしてその木で杵と臼を作ります。これは杵といいます。これは臼といいます。これで餅を作ります。でも餅ではなくまたお金が出てきました。\n      \n      また意地悪なおじいさんとおばあさんがその様子を見ています。そしてまた二人は優しいおじいさんとおばあさんの真似をします。\n      \n      意地悪なおじいさんとおばあさんは、優しいおじいさんとおばあさんの杵と臼を借ります。でもまたお金ではなくゴミが出てきました。\n      \n      意地悪なおじいさんとおばあさんは怒ります。これは火です。怒ったおじいさんとおばあさんは杵と臼に火をつけます。火をつけて燃やしてしまいます。杵と臼は燃えて灰になりました。これは灰です。\n      \n      優しいおじいさんとおばあさんは悲しいです。泣いています。二人は灰を持って帰ります。\n      \n      するとその時、ぴゅーっと風が吹きました。風が吹いて灰がひらひらひらーと飛んでいきます。木があります。風で飛んだ灰が木にかかります。するときれいな花が咲きました。桜の花が咲きました。\n      \n      ちょうどその時お殿様が来ました。お殿様が桜を見ます。お殿様は喜びます。優しいおじいさんとおばあさんに「きれいな桜をありがとう」とご褒美をあげます。\n      \n      また隣の意地悪なおじいさんとおばあさんがその様子を見ています。自分たちもご褒美が欲しいです。お金が欲しいです。意地悪なおじいさんとおばあさんは、また優しいおじいさんとおばあさんの真似をして灰を撒きます。\n      \n      でも花は咲きません。お殿様に灰がかかります。お殿様は怒ります。お殿様は怒って意地悪なおじいさんとおばあさんを逮捕します。\n      \n      優しいおじいさんとおばあさんは、桜の花を見てシロのことを思い出します。二人は幸せに暮らしました。\n      \n      おしまい。",
      transcript_furigana: "今日きょうは　日本にほんの　昔話むかしばなし　「花咲はなさかじいさん」の　お話はなしを　します。\n\n      家いえが　あります。\n      \n      この家いえには　おじいさんと　おばあさんが　住すんでいます。\n      \n      優やさしい　おじいさんと　おばあさんが　住すんでいます。\n      \n      隣となりに　もう一軒いっけん　家いえが　あります。\n      \n      隣となりの　家いえにも　おじいさんと　おばあさんが　住すんでいます。\n      \n      この　家いえの　おじいさんと　おばあさんは　意地悪いじわるな　おじいさんと　おばあさんでした。\n      \n      川かわが　あります。\n      \n      これは　川かわです。\n      \n      冬ふゆです。\n      \n      とても　寒さむいです。\n      \n      川かわの　水みずは　とても　冷つめたいです。\n      \n      優やさしい　おじいさんが　歩あるいていると　冷つめたい　川かわに　一匹いっぴきの　犬いぬが　います。\n      \n      白しろい　犬いぬが　います。\n      \n      寒さむくて　震ふるえています。\n      \n      凍こごえています。\n      \n      優やさしい　おじいさんは　その犬いぬを　助たすけます。\n      \n      助たすけてあげます。\n      \n      犬いぬを　助たすけて　家いえに　連つれて　帰かえります。\n      \n      シロしろと　名前なまえを　つけました。\n      \n      優やさしい　おじいさんと　おばあさんは　シロしろを　とても　可愛かわいがりました。\n      \n      これは　畑はたけです。\n      \n      人参にんじんや　キャベツきゃべつなど　野菜やさいを　作つくる　畑はたけです。\n      \n      おじいさんと　おばあさんの　家いえの　裏うらに　畑はたけが　あります。\n      \n      ある日ひ　シロしろが　畑はたけで　吠ほえています。\n      \n      ワンワンわんわん　ワンワンわんわんと　ずっと　吠ほえています。\n      \n      おじいさんは　「どうしたんだろう。　どうして　ここで　ずっと　吠ほえているんだろう。」と　思おもいました。\n      \n      おじいさんは　その場所ばしょを　掘ほってみました。\n      \n      土つちを　掘ほりました。\n      \n      すると　土つちの　中なかから　お金かねが　たくさん　出でてきました。\n      \n      その　様子ようすを　隣となりの　意地悪いじわるな　おじいさんと　おばあさんが　見みています。\n      \n      自分じぶんたちも　お金かねが　欲ほしいです。\n      \n      意地悪いじわるな　おじいさんは　優やさしい　おじいさんの　真似まねを　します。\n      \n      シロしろを　連つれて　畑はたけに　行いきます。\n      \n      そして　シロしろが　吠ほえた　場所ばしょを　掘ほりります。\n      \n      でも　お金かねは　出でてきません。\n      \n      お金かねではなく　ゴミごみが　出でてきました。\n      \n      意地悪いじわるな　おじいさんは　怒おこっています。\n      \n      怒おこって　シロしろを　殺ころしてしまいます。\n      \n      シロしろは　死しんでしまいました。\n      \n      優やさしい　おじいさんと　おばあさんは　悲かなしいです。\n      \n      悲かなしくて　泣ないています。\n      \n      二人ふたりは　シロしろを　土つちに　埋うめました。\n      \n      そして　小ちいさい　枝えだを　刺さしました。\n      \n      すると　その　枝えだは　大おおきな　木きに　なりました。\n      \n      おじいさんと　おばあさんは　その　木きを　切きります。\n      \n      そして　その　木˚いで　杵きねと　臼うすを　作ります。\n      \n      これは　杵きねと　いいます。\n      \n      これは　臼うすと　いいます。\n      \n      これで　餅もちを　作つくります。\n      \n      でも　餅もちではなく　また　お金かねが　出でてきました。\n      \n      また　意地悪いじわるな　おじいさんと　おばあさんが　その　様子ようすを　見みています。\n      \n      そして　また　二人ふたりは　優やさしい　おじいさんと　おばあさんの　真似まねを　します。\n      \n      意地悪いじわるな　おじいさんと　おばあさんは　優やさしい　おじいさんと　おばあさんの　杵きねと　臼うすを　借かります。\n      \n      でも　また　お金かねではなく　ゴミごみが　出でてきました。\n      \n      意地悪いじわるな　おじいさんと　おばあさんは　怒おこります。\n      \n      これは　火ひです。\n      \n      怒おこった　おじいさんと　おばあさんは　杵きねと　臼うすに　火ひを　つけます。\n      \n      火ひを　つけて　燃もやしてしまいます。\n      \n      杵きねと　臼うすは　燃もえて　灰はいに　なりました。\n      \n      これは　灰はいです。\n      \n      優やさしい　おじいさんと　おばあさんは　悲かなしいです。\n      \n      泣ないています。\n      \n      二人ふたりは　灰はいを　持もって　帰かえります。\n      \n      すると　その時とき　ぴゅーっと　風かぜが　吹ふきました。\n      \n      風かぜが　吹ふいて　灰はいが　ひらひらひらーと　飛とんでいきます。\n      \n      木きが　あります。\n      \n      風かぜで　飛とんだ　灰はいが　木きに　かかります。\n      \n      すると　きれいな　花はなが　咲さきました。\n      \n      桜さくらの　花はなが　咲さきました。\n      \n      ちょうど　その時とき　お殿様とのさまが　来きました。\n      \n      お殿様とのさまが　桜さくらを　見みます。\n      \n      お殿様とのさまは　喜よろこびます。\n      \n      優やさしい　おじいさんと　おばあさんに　「きれいな　桜さくらを　ありがとう。」と　ご褒美ほうびを　あげます。\n      \n      また　隣となりの　意地悪いじわるな　おじいさんと　おばあさんが　その　様子ようすを　見みています。\n      \n      自分じぶんたちも　ご褒美ほうびが　欲ほしいです。\n      \n      お金かねが　欲ほしいです。\n      \n      意地悪いじわるな　おじいさんと　おばあさんは　また　優やさしい　おじいさんと　おばあさんの　真似まねを　して　灰はいを　撒まきます。\n      \n      でも　花はなは　咲さきません。\n      \n      お殿様とのさまに　灰はいが　かかります。\n      \n      お殿様とのさまは　怒おこります。\n      \n      お殿様とのさまは　怒おこって　意地悪いじわるな　おじいさんと　おばあさんを　逮捕たいほします。\n      \n      優やさしい　おじいさんと　おばあさんは　桜さくらの　花はなを　見みて　シロしろのことを　思おもい出だします。\n      \n      二人ふたりは　幸しあわせに　暮くらしました。\n      \n      おしまい。"
  },
  {
      title: "間違い探し③ Spot the Difference #3",
      url: "https://cijapanese.com/spot-the-difference-3/",
      level: "beginner",
      membership: "free",
      transcript: "今日は間違い探しをします。3回目の間違い探しです。\n\n      ここに2枚の絵があります。2枚の絵は似ています。でも少し違います。2枚の絵を比べましょう。2枚の絵を比べて違うところを探しましょう。\n      \n      道路があります。道路があります。ここは交差点です。\n      \n      左の絵を見てください。これは犬です。女の人が犬の散歩をしています。右の絵を見てください。犬の散歩をしているのは女の人ですか。いいえ、違います。犬の散歩をしているのは男の人です。男の人が犬の散歩をしています。\n      \n      左の絵を見てください。これは自転車です。女の子が自転車に乗っています。右の絵を見てください。自転車に乗っているのは女の子ですか。いいえ、違います。自転車に乗っているのは男の子です。男の子が自転車に乗っています。\n      \n      左の絵を見てください。これは車です。車が1台道路を走っています。何色の車が走っていますか。白い車が走っています。右の絵を見てください。右の絵も車が1台走っています。白い車ですか。いいえ、違います。何色ですか。黒です。黒い車が走っています。\n      \n      左の絵を見てください。ここにケーキ屋があります。ケーキを売っています。ケーキ屋の隣に郵便局があります。右の絵を見てください。ケーキ屋の隣にあるのは郵便局ですか。いいえ、違います。ケーキ屋の隣にはコンビニがあります。\n      \n      左の絵を見てください。ケーキ屋の向かいに銀行があります。右の絵を見てください。ケーキ屋の向かいにあるのは銀行ですか。いいえ、違います。ケーキ屋の向かいにはパン屋があります。パンを売っています。\n      \n      左の絵を見てください。信号があります。信号は何色ですか。青です。青信号です。右の絵を見てください。信号は青ですか。いいえ、違います。信号は赤です。赤信号です。\n      \n      横断歩道があります。これは横断歩道です。道路は車が通ります。横断歩道は歩く人が通ります。\n      \n      左の絵を見てください。男の子が横断歩道を渡っています。歩いています。信号が青なので横断歩道を渡っています。右の絵を見てください。\n      \n      男の子は横断歩道を渡っていますか。歩いていますか。いいえ、渡っていません。横断歩道の手前で待っています。信号が赤なので渡りません。渡らずに待っています。\n      \n      今日は間違い探しをしました。違いはいくつ見つかりましたか。１２３４５６７。全部で7つありました。\n      \n      今日はこれでおしまい。またね。",
      transcript_furigana: "今日きょうは　間違まちがい探さがしを　します。\n\n      ３回目さんかいめの　間違まちがい探さがしです。\n      \n      ここに　２枚にまいの　絵えが　あります。\n      \n      ２枚にまいの　絵えは　似にています。\n      \n      でも　少すこし　違ちがいます。\n      \n      ２枚にまいの　絵えを　比くらべましょう。\n      \n      ２枚にまいの　絵えを　比くらべて　違ちがうところを　探さがしましょう。\n      \n      道路どうろが　あります。\n      \n      道路どうろが　あります。\n      \n      ここは　交差点こうさてんです。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      これは　犬いぬです。\n      \n      女おんなの人ひとが　犬いぬの　散歩さんぽを　しています。\n      \n      右みぎの　絵えを　見みてください。\n      \n      犬いぬの　散歩さんぽを　しているのは　女おんなの人ひとですか。\n      \n      いいえ　違ちがいます。\n      \n      犬いぬの　散歩さんぽを　しているのは　男おとこの人ひとです。\n      \n      男おとこの人ひとが　犬いぬの　散歩さんぽを　しています。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      これは　自転車じてんしゃです。\n      \n      女おんなの子こが　自転車じてんしゃに　乗っています。\n      \n      右みぎの　絵えを　見みてください。\n      \n      自転車じてんしゃに　乗のっているのは　女おんなの子こですか。\n      \n      いいえ　違ちがいます。\n      \n      自転車じてんしゃに　乗のっているのは　男おとこの子こです。\n      \n      男おとこの子こが　自転車じてんしゃに　乗のっています。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      これは　車くるまです。\n      \n      車くるまが　１台いちだい　道路どうろを　走はしっています。\n      \n      何色の　車くるまが　走はしっていますか。\n      \n      白しろい　車くるまが　走はしっています。\n      \n      右みぎの　絵えを　見みてください。\n      \n      右みぎの　絵えも　車くるまが　１台いちだい　走はしっています。\n      \n      白しろい　車くるまですか。\n      \n      いいえ　違ちがいます。\n      \n      何色なにいろですか。\n      \n      黒くろです。\n      \n      黒くろい　車くるまが　走はしっています。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      ここに　ケーキ屋けーきやが　あります。\n      \n      ケーキけーきを　売うっています。\n      \n      ケーキ屋けーきやの　隣となりに　郵便局ゆうびんきょくが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      ケーキ屋けーきやの　隣となりに　あるのは　郵便局ゆうびんきょくですか。\n      \n      いいえ　違ちがいます。\n      \n      ケーキ屋けーきやの　隣となりには　コンビニこんびにが　あります。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      ケーキ屋けーきやの　向むかいに　銀行ぎんこうが　あります。\n      \n      右みぎの　絵えを　見みてください。\n      \n      ケーキ屋けーきやの　向むかいに　あるのは　銀行ぎんこうですか。\n      \n      いいえ　違ちがいます。\n      \n      ケーキ屋けーきやの　向むかいには　パン屋ぱんやが　あります。\n      \n      パンぱんを　売うっています。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      信号しんごうが　あります。\n      \n      信号しんごうは　何色なにいろですか。\n      \n      青あおです。\n      \n      青信号あおしんごうです。\n      \n      右みぎの　絵えを　見みてください。\n      \n      信号しんごうは　青あおですか。\n      \n      いいえ　違ちがいます。\n      \n      信号しんごうは　赤あかです。\n      \n      赤信号あかしんごうです。\n      \n      横断歩道おうだんほどうが　あります。\n      \n      これは　横断歩道おうだんほどうです。\n      \n      道路どうろは　車くるまが　通とおります。\n      \n      横断歩道おうだんほどうは　歩あるく人ひとが　通とおります。\n      \n      左ひだりの　絵えを　見みてください。\n      \n      男おとこの子こが　横断歩道おうだんほどうを　渡わたっています。\n      \n      歩あるいています。\n      \n      信号しんごうが　青あおなので　横断歩道おうだんほどうを　渡わたっています。\n      \n      右みぎの　絵えを　見みてください。\n      \n      男おとこの子こは　横断歩道おうだんほどうを　渡わたっていますか。\n      \n      歩あるいていますか。\n      \n      いいえ　渡わたっていません。\n      \n      横断歩道おうだんほどうの　手前てまえで　待まっています。\n      \n      信号しんごうが　赤あかなので　渡わたりません。\n      \n      渡わたらずに　待まっています。\n      \n      今日きょうは　間違まちがい探さがしを　しました。\n      \n      違ちがいは　いくつ　見みつかりましたか。\n      \n      １いち２に３さん４し５ご６ろく７しち\n      \n      全部ぜんぶで　７ななつ　ありました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "音楽 Music",
      url: "https://cijapanese.com/music/",
      level: "beginner",
      membership: "free",
      transcript: "今日のテーマは音楽です。音楽は好きですか。音楽をよく聴きますか。私は毎日聴きます。\n\n      朝です。昼です。夜です。朝ごはんです。昼ごはんです。晩ごはんです。私はいつも、朝ごはんの時と晩ごはんの時に音楽を聴きます。ご飯を食べています。ご飯を食べながら音楽を聴きます。食事中に音楽を聴きます。\n      \n      それから時々、車を運転しながら音楽を聴きます。運転中に音楽を聴きます。\n      \n      皆さんはどんな音楽を聴きますか。例えばクラシックやヒップホップ、ロックなど色々な音楽の種類があります。色々なジャンルがあります。どんな音楽が好きですか。私は色々聴きます。\n      \n      日本の音楽は好きですか。これは歌手です。これはバンドです。好きな日本の歌手やバンドはいますか。誰が好きですか。\n      \n      私が今一番好きな日本の歌手は、藤井風という人です。彼は日本の岡山県出身の歌手です。男性の歌手です。彼はピアノを弾きます。ピアノがとても上手です。ピアノを弾きながら歌を歌います。とてもかっこいいです。ぜひ聴いてみてください。おすすめです。\n      \n      今日は音楽のお話をしました。今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうの　テーマてーまは　音楽おんがくです。\n\n      音楽おんがくは　好きですか。\n      \n      音楽おんがくを　よく　聴ききますか。\n      \n      私わたしは　毎日まいにち　聴ききます。\n      \n      朝あさです。\n      \n      昼ひるです。\n      \n      夜よるです。\n      \n      朝あさごはんです。\n      \n      昼ひるごはんです。\n      \n      晩ばんごはんです。\n      \n      私わたしは　いつも　朝あさごはんの時ときと　晩ばんごはんの時ときに　音楽おんがくを　聴ききます。\n      \n      ご飯はんを　食たべています。\n      \n      ご飯はんを　食たべながら　音楽おんがくを　聴ききます。\n      \n      食事中しょくじちゅうに　音楽おんがくを　聴ききます。\n      \n      それから　時々ときどき　車くるまを　運転うんてんしながら　音楽おんがくを　聴ききます。\n      \n      運転中うんてんちゅうに　音楽おんがくを　聴ききます。\n      \n      皆みなさんは　どんな　音楽おんがくを　聴ききますか。\n      \n      例たとえば　クラシックくらしっくや　ヒップホップひっぷほっぷ　ロックろっくなど　色々いろいろな　音楽おんがくの　種類しゅるいが　あります。\n      \n      色々いろいろな　ジャンルじゃんるが　あります。\n      \n      どんな　音楽おんがくが　好すきですか。\n      \n      私わたしは　色々いろいろ　聴ききます。\n      \n      日本にほんの　音楽おんがくは　好すきですか。\n      \n      これは　歌手かしゅです。\n      \n      これは　バンドばんどです。\n      \n      好すきな　日本にほんの　歌手かしゅや　バンドばんどは　いますか。\n      \n      誰だれが　好すきですか。\n      \n      私わたしが　今いま　一番いちばん　好すきな　日本にほんの　歌手かしゅは　藤井風ふじいかぜという　人ひとです。\n      \n      彼かれは　日本にほんの　岡山県おかやまけん　出身しゅっしんの　歌手かしゅです。\n      \n      男性だんせいの　歌手かしゅです。\n      \n      彼かれは　ピアノぴあのを　弾ひきます。\n      \n      ピアノぴあのが　とても　上手じょうずです。\n      \n      ピアノぴあのを　弾ひきながら　歌うたを　歌うたいます。\n      \n      とても　かっこいいです。\n      \n      ぜひ　聴きいてみて　ください。\n      \n      おすすめです。\n      \n      今日きょうは　音楽おんがくの　お話はなしを　しました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "ナルト Naruto (Anime)",
      url: "https://cijapanese.com/naruto-anime/",
      level: "beginner",
      membership: "free",
      transcript: "今日は日本のアニメ「ナルト」についてお話します。ナルトは世界中で人気のアニメですね。今日はナルトの最初の部分、始まりの部分をお話します。\n\n      ここは”木の葉隠れの里”という場所です。\n      \n      これは狐です。しっぽです。この狐はしっぽが９本もあります。１２３４５６７８９。しっぽが９本あります。しっぽが９本ある妖怪の狐です。悪い狐です。\n      \n      ある日、この狐が木の葉隠れの里に来ます。そして人々を襲います。\n      \n      これは忍者です。忍者の中で一番強い人です。火影といいます。火影が狐と戦います。そして狐を倒します。狐は死にます。でも火影も死んでしまいます。\n      \n      ちょうどその時赤ちゃんが生まれます。悪い狐の魂が赤ちゃんの中に入ります。赤ちゃんの名前はうずまきナルトといいます。\n      \n      それから１２年経ちました。１２年後です。ナルトは１２歳になりました。これは学校です。忍者の学校です。ナルトは忍者になりたいです。忍者になるために忍者の学校に通っています。\n      \n      ナルトは火影になりたいです。一番強い忍者になりたいです。火影になることがナルトの夢です。\n      \n      ナルトの体には悪い狐が入っています。ナルトはそのことを知りません。里の人達はみんな知っています。なのでみんなナルトのことが嫌いです。好きじゃありません。ナルトは里のみんなに嫌われています。\n      \n      ナルトは寂しいです。一人ぼっちで寂しいです。これはお父さんです。お母さんです。親です。ナルトには親がいません。寂しいです。寂しいのでナルトはいつも悪いことばかりしています。いたずらばかりしています。\n      \n      学校でテストがあります。試験があります。学校を卒業するための試験です。学校を卒業して忍者になるための試験です。学校の生徒たちです。ナルト以外の生徒はみんな合格します。ナルトだけ合格できません。卒業できません。\n      \n      これは先生です。忍者学校の先生です。イルカ先生といいます。実はイルカ先生のお父さんはこの火影でした。イルカ先生のお父さんは１２年前狐に殺された火影でした。\n      \n      イルカ先生にもお父さんとお母さんがいません。親がいません。なのでイルカ先生はナルトの気持ちがわかります。ナルトの寂しい気持ちが理解できます。なのでイルカ先生はナルトに優しいです。里の人々はナルトに優しくありません。みんなナルトに冷たいです。\n      \n      この人も忍者学校の先生です。ミズキ先生といいます。ミズキ先生は悪い人でした。ある日イルカ先生がミズキ先生に倒されそうになります。ナルトがイルカ先生を助けます。\n      \n      その後ナルトも忍者学校を卒業することができました。忍者学校を卒業して忍者になりました。\n      \n      今日はナルトの第一話をお話しました。おしまい。",
      transcript_furigana: "今日きょうは　日本にほんの　アニメあにめ　「ナルトなると」について　お話はなしします。\n\n      ナルトなるとは　世界中せかいじゅうで　人気にんきの　アニメあにめですね。\n      \n      今日きょうは　ナルトなるとの　最初さいしょの　部分ぶぶん　始はじまりの　部分ぶぶんを　お話はなしします。\n      \n      ここは　”木この葉は　隠がくれの　里さと“　という場所ばしょです。\n      \n      これは　狐きつねです。\n      \n      しっぽです。\n      \n      この　狐きつねは　しっぽが　９本きゅうほんも　あります。\n      \n      １いち２に３さん４し５ご６ろく７しち８はち９きゅう\n      \n      しっぽが　９本きゅうほん　あります。\n      \n      しっぽが　９本きゅうほん　ある　妖怪ようかいの　狐きつねです。\n      \n      悪わるい　狐きつねです。\n      \n      ある日ひ　この　狐きつねが　木この葉は隠がくれの里さとに　来きます。\n      \n      そして　人々ひとびとを　襲おそいます。\n      \n      これは　忍者にんじゃです。\n      \n      忍者にんじゃの　中なかで　一番いちばん　強つよい人ひとです。\n      \n      火影ほかげと　いいます。\n      \n      火影ほかげが　狐きつねと　戦たたかいます。\n      \n      そして　狐きつねを　倒たおします。\n      \n      狐きつねは　死しにます。\n      \n      でも　火影ほかげも　死しんでしまいます。\n      \n      ちょうど　その時とき　赤あかちゃんが　生うまれます。\n      \n      悪わるい　狐きつねの　魂たましいが　赤あかちゃんの　中なかに　入はいります。\n      \n      赤あかちゃんの　名前なまえは　うずまきナルトなるとと　いいます。\n      \n      それから　１２年じゅうにねん　経たちました。\n      \n      １２年後じゅうにねんごです。\n      \n      ナルトなるとは　１２歳じゅうにさいに　なりました。\n      \n      これは　学校がっこうです。\n      \n      忍者にんじゃの　学校がっこうです。\n      \n      ナルトなるとは　忍者にんじゃに　なりたいです。\n      \n      忍者にんじゃに　なるために　忍者にんじゃの　学校がっこうに　通かよっています。\n      \n      ナルトなるとは　火影ほかげに　なりたいです。\n      \n      一番いちばん　強つよい　忍者にんじゃに　なりたいです。\n      \n      火影ほかげに　なることが　ナルトなるとの　夢ゆめです。\n      \n      ナルトなるとの　体からだには　悪わるい　狐きつねが　入はいっています。\n      \n      ナルトなるとは　そのことを　知しりません。\n      \n      里さとの　人達ひとたちは　みんな　知しっています。\n      \n      なので　みんな　ナルトなるとのことが　嫌きらいです。\n      \n      好すきじゃありません。\n      \n      ナルトなるとは　里さとの　みんなに　嫌きらわれています。\n      \n      ナルトなるとは　寂さみしいです。\n      \n      一人ひとりぼっちで　寂さみしいです。\n      \n      これは　お父とおさんです。\n      \n      お母かあさんです。\n      \n      親おやです。\n      \n      ナルトなるとには　親おやが　いません。\n      \n      寂さみしいです。\n      \n      寂さみしいので　ナルトなるとは　いつも　悪わるいこと　ばかり　しています。\n      \n      いたずら　ばかり　しています。\n      \n      学校がっこうで　テストてすとが　あります。\n      \n      試験しけんが　あります。\n      \n      学校がっこうを　卒業そつぎょうするための　試験しけんです。\n      \n      学校がっこうを　卒業そつぎょうして　忍者にんじゃに　なるための　試験しけんです。\n      \n      学校がっこうの　生徒せいとたちです。\n      \n      ナルトなると　以外いがいの　生徒せいとは　みんな　合格ごうかくします。\n      \n      ナルトなるとだけ　合格ごうかく　できません。\n      \n      卒業そつぎょう　できません。\n      \n      これは　先生せんせいです。\n      \n      忍者学校にんじゃがっこうの　先生せんせいです。\n      \n      イルカ先生いるかせんせいと　いいます。\n      \n      実じつは　イルカ先生いるかせんせいの　お父とうさんは　この　火影ほかげでした。\n      \n      *イルカ先生いるかせんせいの　お父とうさんは　１２年前じゅうにねんまえ　狐きつねに　殺ころされた　火影ほかげでした。\n      \n      イルカ先生いるかせんせいにも　お父とうさんと　お母かあさんが　いません。\n      \n      親おやが　いません。\n      \n      なので　イルカ先生いるかせんせいは　ナルトなるとの　気持きもちが　わかります。\n      \n      ナルトなるとの　寂さみしい　気持きもちが　理解りかいできます。\n      \n      なので　イルカ先生いるかせんせいは　ナルトなるとに　優やさしいです。\n      \n      里さとの　人々ひとびとは　ナルトなるとに　優やさしくありません。\n      \n      みんな　ナルトなるとに　冷つめたいです。\n      \n      この人ひとも　忍者学校にんじゃがっこうの　先生せんせいです。\n      \n      ミズキ先生みずきせんせいと　いいます。\n      \n      ミズキ先生みずきせんせいは　悪わるい　人ひとでした。\n      \n      ある日ひ　イルカ先生いるかせんせいが　ミズキ先生みずきせんせいに　倒たおされそうに　なります。\n      \n      ナルトなるとが　イルカ先生いるかせんせいを　助たすけます。\n      \n      その後あと　ナルトなるとも　忍者学校にんじゃがっこうを　卒業そつぎょうすることが　できました。\n      \n      忍者学校にんじゃがっこうを　卒業そつぎょうして　忍者にんじゃに　なりました。\n      \n      今日きょうは　ナルトなるとの　第一話だいいちわを　お話はなししました。\n      \n      おしまい。"
  },
  {
      title: "ランドセル Japanese School Bag",
      url: "https://cijapanese.com/japanese-school-bag/",
      level: "beginner",
      membership: "free",
      transcript: "これは学校です。子供です。大人です。\n\n      日本の子供たちは、６歳の春に小学校に入学します。６歳の春に小学生になります。\n      \n      これはかばんです。ランドセルというかばんです。日本の小学生はみんなランドセルを持っています。\n      \n      お腹です。背中です。背中にランドセルを背負います。日本の小学生はみんな、ランドセルを背負って小学校に通います。\n      \n      日本の小学校は１年生から６年生まであります。１年生から６年生まで６年間小学校に通います。ランドセルは６年間ずっと使います。\n      \n      なのでランドセルはとても頑丈です。壊れません。破れません。すぐに壊れたり破れたりしません。頑丈です。\n      \n      私も子供の頃、ランドセルを持っていました。ランドセルを背負って小学校に通っていました。\n      \n      男の子です。女の子です。私が小学生の頃は１９９０年代です。この頃は、男の子はほとんどみんな黒のランドセルを持っていました。そして女の子はほとんどみんな赤のランドセルを持っていました。黒と赤以外の色はとても珍しかったです。\n      \n      私の小学校では一人だけ、たった一人だけピンクのランドセルを持っている子がいました。この子以外はみんな赤でした。私も赤のランドセルを持っていました。\n      \n      でも最近は、色々な色のランドセルがあります。黒や赤以外にも、青、茶色、ピンク、水色、紫、緑、黄色など、色々な種類のランドセルがあります。みんな自分の好きな色を選びます。女の子には、赤やピンク、水色や紫が人気です。男の子には青と黒が人気です。\n      \n      私の息子も今６歳です。今２０２１年３月です。来月小学生になります。もうすぐ小学校に入学します。\n      \n      今日は３月２１日です。昨日、一昨日。一昨日、息子のランドセルが届きました。家に来ました。息子は何色を選んだでしょう。息子は黄色のランドセルを選びました。黄色のランドセルは今も珍しいです。黄色を持っている子は少ないです。ほとんどいません。でも彼は黄色のランドセルを気に入っています。\n      \n      今日は日本の小学生がみんな持っているランドセルについてお話しました。今日はこれでおしまい。",
      transcript_furigana: "これは　学校がっこうです。\n\n      子供こどもです。　大人おとなです。\n      \n      日本にほんの　子供こどもたちは　６歳ろくさいの　春はるに　小学校しょうがっこうに　入学にゅうがくします。\n      \n      ６歳ろくさいの　春はるに　小学生しょうがくせいに　なります。\n      \n      これは　かばんです。\n      \n      ランドセルらんどせるという　かばんです。\n      \n      日本にほんの　小学生しょうがくせいは　みんな　ランドセルらんどせるを　持もっています。\n      \n      お腹なかです。　背中せなかです。\n      \n      背中せなかに　ランドセルらんどせるを　背負せおいます。\n      \n      日本にほんの　小学生しょうがくせいは　みんな　ランドセルらんどせるを　背負せおって　小学校しょうがっこうに　通かよいます。\n      \n      日本にほんの　小学校しょうがっこうは　１年生いちねんせいから　６年生ろくねんせいまで　あります。\n      \n      １年生いちねんせいから　６年生ろくねんせいまで　６年間ろくねんかん　小学校しょうがっこうに　通かよいます。\n      \n      ランドセルらんどせるは　６年間ろくねんかん　ずっと　使つかいます。\n      \n      なので　ランドセルらんどせるは　とても　頑丈がんじょうです。\n      \n      壊こわれません。　破やぶれません。\n      \n      すぐに　壊こわれたり　破やぶれたり　しません。\n      \n      頑丈がんじょうです。\n      \n      私わたしも　子供こどもの頃ころ　ランドセルらんどせるを　持もっていました。\n      \n      ランドセルらんどせるを　背負せおって　小学校しょうがっこうに　通かよっていました。\n      \n      男おとこの子こです。　女おんなの子こです。\n      \n      私わたしが　小学生しょうがくせいの頃ころは　１９９０年代せんきゅうひゃくきゅうじゅうねんだいです。\n      \n      この頃ころは　男おとこの子こは　ほとんど　みんな　黒くろの　ランドセルらんどせるを　持もっていました。\n      \n      そして　女おんなの子こは　ほとんど　みんな　赤あかの　ランドセルらんどせるを　持もっていました。\n      \n      黒くろと　赤あか　以外いがいの　色いろは　とても　珍めずろしかったです。\n      \n      私わたしの　小学校しょうがくせいでは　一人ひとりだけ、　たった　一人ひとりだけ　ピンクぴんくの　ランドセルらんどせるを　持もっている　子こが　いました。\n      \n      この子こ　以外いがいは　みんな　赤あかでした。\n      \n      私わたしも　赤あかの　ランドセルらんどせるを　持もっていました。\n      \n      でも　最近さいきんは　色々いろいろな　色いろの　ランドセルらんどせるが　あります。\n      \n      黒くろや　赤あか　以外いがいにも　青あお　茶色ちゃいろ　ピンクぴんく　水色みずいろ　紫むらさき　緑みどり　黄色きいろなど　色々いろいろな　種類しゅるいの　ランドセルらんどせるが　あります。\n      \n      みんな　自分じぶんの　好すきな　色いろを　選えらびます。\n      \n      女おんなの子こには　赤あかや　ピンクぴんく　水色みずいろや　紫むらさきが　人気にんきです。\n      \n      男おとこの子こには　青あおと　黒くろが　人気にんきです。\n      \n      私わたしの　息子むすこも　今いま　６歳ろくさいです。\n      \n      今いま　２０２１年にせんにじゅういちねん　３月さんがつです。\n      \n      来月らいげつ　小学生しょうがくせいに　なります。\n      \n      もうすぐ　小学校しょうがっこうに　入学にゅうがくします。\n      \n      今日きょうは　３月さんがつ　２１日にじゅういちです。\n      \n      昨日きのう、　一昨日おととい。\n      \n      一昨日おととい　息子むすこの　ランドセルらんどせるが　届とどきました。\n      \n      家いえに　来きました。\n      \n      息子むすこは　何色なにいろを　選えらんだでしょう。\n      \n      息子むすこは　黄色きいろの　ランドセルらんどせるを　選えらびました　。\n      \n      黄色きいろの　ランドセルらんどせるは　今いまも　珍めずらしいです。\n      \n      黄色きいろを　持もっている　子こは　少すくないです。\n      \n      ほとんど　いません。\n      \n      でも　彼かれは　黄色きいろの　ランドセルらんどせるを　気きに入いっています。\n      \n      今日きょうは　日本にほんの　小学生しょうがくせいが　みんな　持もっている　ランドセルらんどせるについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "美容院 Hair Salon",
      url: "https://cijapanese.com/hair-salon/",
      level: "beginner",
      membership: "free",
      transcript: "ここは美容院です。髪の毛を切る場所です。この人は美容師です。髪の毛を切ってくれる人です。\n\n      今日は３月２３日です。昨日私は美容院に行きました。私の家です。家の近くの美容院に行きました。\n      \n      美容院で何をしますか。\n      \n      髪を切ります。髪が長いです。伸びています。切って短くします。髪を染めます。髪の色を変えます。パーマをかけます。ストレートパーマをかけます。トリートメントをします。美容院では、髪を切ったり染めたりパーマをかけたりトリートメントをしたりします。\n      \n      皆さんは美容院に行ったら何をしますか。\n      \n      私は昨日、髪を切りました。髪が伸びていました。長かったです。なので切って短くしました。それから髪を染めました。私の髪の毛は黒です。元の髪の毛は黒ですが、少しだけ茶色く染めました。\n      \n      今は３月です。１ヶ月、２ヶ月。２ヶ月くらい経つと、また髪の毛が伸びます。長くなります。そして増えます。多くなります。なので、２ヶ月後にまた美容院に行きます。\n      \n      日本の美容院のサービスは素晴らしいです。\n      \n      例えば、ここは頭です。美容師さんがシャンプーをしています。シャンプーをしながら、頭をマッサージしてくれます。ここは首です。ここは肩です。首や肩もマッサージしてくれます。揉んでくれます。気持ちいいです。\n      \n      それからコーヒーやお菓子を出してくれます。コーヒーを飲んだりお菓子を食べたりしながら待ちます。\n      \n      今日は美容院についてお話しました。今日はこれでおしまい。またね。",
      transcript_furigana: "ここは　美容院びよういんです。\n\n      髪かみの毛けを　切きる　場所ばしょです。\n      \n      この人ひとは　美容師びようしです。\n      \n      髪かみの毛けを　切きってくれる　人ひとです。\n      \n      今日きょうは　３月２３日さんがつにじゅうさんにちです。\n      \n      昨日きのう　私わたしは　美容院びよういんに　行いきました。\n      \n      私わたしの　家いえです。\n      \n      家いえの　近ちかくの　美容院びよういんに　行いきました。\n      \n      美容院びよういんで　何なにを　しますか。\n      \n      髪かみを　切きります。\n      \n      髪かみが　長ながいです。\n      \n      伸のびています。\n      \n      切きって　短みじかくします。\n      \n      髪かみを　染そめます。\n      \n      髪かみの　色いろを　変かえます。\n      \n      パーマぱーまを　かけます。\n      \n      ストレートパーマすとれーとぱーまを　かけます。\n      \n      トリートメントとりーとめんとを　します。\n      \n      美容院びよういんでは　髪かみを　切きったり　染そめたり　パーマぱーまを　かけたり　トリートメントとりーとめんとを　したり　します。\n      \n      皆みなさんは　美容院びよういんに　行いったら　何なにを　しますか。\n      \n      私わたしは　昨日きのう　髪かみを　切きりました。\n      \n      髪かみが　伸のびていました。\n      \n      長ながかったです。\n      \n      なので　切きって　短みじかくしました。\n      \n      それから　髪かみを　染そめました。\n      \n      私わたし　の　髪かみの毛けは　黒くろです。\n      \n      元もとの　髪かみの毛けは　黒くろですが　少すこしだけ　茶色ちゃいろく　染そめました。\n      \n      今いまは　３月さんがつです。\n      \n      １ヶ月いっかげつ　２ヶ月にかげつ。\n      \n      ２ヶ月にかげつくらい　経たつと　また　髪かみの毛けが　伸のびます。\n      \n      長ながく　なります。\n      \n      そして　増ふえます。\n      \n      多おおく　なります。\n      \n      なので　２ヶ月後にかげつごに　また　美容院びよういんに　行いきます。\n      \n      日本にほんの　美容院びよういんの　サービスさーびすは　素晴すばらしいです。\n      \n      例たとえば　ここは　頭あたまです。\n      \n      美容師びようしさんが　シャンプーしゃんぷーを　しています。\n      \n      シャンプーしゃんぷーを　しながら　頭あたまを　マッサージまっさーじ　してくれます。\n      \n      ここは　首くびです。\n      \n      ここは　肩かたです。\n      \n      首くびや　肩かたも　マッサージまっさーじ　してくれます。\n      \n      揉もんでくれます。\n      \n      気持きもちいいです。\n      \n      それから　コーヒーこーひーや　お菓子かしを　出だしてくれます。\n      \n      コーヒーこーひーを　飲のんだり　お菓子かしを　食たべたり　しながら　待まちます。\n      \n      今日きょうは　美容院びよういんについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "国あてクイズ Country Guessing Game",
      url: "https://cijapanese.com/country-guessing-game/",
      level: "beginner",
      membership: "free",
      transcript: "今日はクイズをします。国あてクイズをします。\n\n      私がある国について話します。ヒントを出します。ヒントを聞いて考えてください。どの国について話しているか考えてあててください。\n      \n      第１問\n      \n      この国は南米にあります。これはサッカーボールです。この国はサッカーが強いです。ワールドカップで今までに５回優勝したことがあります。この国ではポルトガル語が話されています。とても有名なお祭りがあります。そのお祭りではたくさんの人が踊ります。踊りながらパレードをします。\n      \n      どこの国でしょう。正解はブラジルです。\n      \n      第２問\n      \n      この国はヨーロッパにあります。私はこの国の食べ物が大好きです。パスタやピザが有名です。この国はブーツのような形をしています。この絵はモナリザです。モナリザの作者、モナリザを描いたレオナルドダビンチはこの国の出身です。\n      \n      どこの国でしょう。正解はイタリアです。\n      \n      第３問\n      \n      この国は世界で二番目に広い国です。英語とフランス語が話されています。山や川や湖など自然が豊かです。有名な滝があります。歌手のジャスティン・ビーバーはこの国の出身です。\n      \n      どこの国でしょう。正解はカナダです。\n      \n      第４問\n      \n      この国は世界で二番目に人口が多い国です。これはヨガです。ヨガをしています。この国はヨガ発祥の地です。それから仏教発祥の地です。この国はカレーが有名です。\n      \n      どこの国でしょう。正解はインドです。\n      \n      第５問、最後の問題です。\n      \n      この国はアフリカにあります。アフリカの北の方にあります。この国には砂漠があります。ピラミッドがあります。世界で一番長い川が流れています。\n      \n      どこの国でしょう。正解はエジプトです。\n      \n      今日は国あてクイズをしました。全部わかりましたか？今日はこれでおしまい。",
      transcript_furigana: "今日きょうは　クイズくいずを　します。\n\n      国くにあて　クイズくいずを　します。\n      \n      私わたしが　ある　国くにについて　話はなします。\n      \n      ヒントひんとを　出だします。\n      \n      ヒントひんとを　聞きいて　考かんがえてください。\n      \n      どの　国くにについて　話はなしているか　考かんがえて　あててください。\n      \n      第１問だいいちもん\n      \n      この　国くには　南米なんべいに　あります。\n      \n      これは　サッカーボールさっかーぼーるです。\n      \n      この　国くには　サッカーさっかーが　強つよいです。\n      \n      ワールドカップわーるどかっぷで　今いままでに　５回ごかい　優勝ゆうしょうしたことが　あります。\n      \n      この国くにでは　ポルトガル語ぽるとがるごが　話はなされています。\n      \n      とても　有名ゆうめいな　お祭まつりが　あります。\n      \n      その　お祭まつりでは　たくさんの　人ひとが　踊おどります。\n      \n      踊おどりながら　パレードぱれーどを　します。\n      \n      どこの　国くにでしょう。\n      \n      正解せいかいは　ブラジルぶらじるです。\n      \n      第２問だいにもん\n      \n      この　国くには　ヨーロッパよーろっぱにあります。\n      \n      私わたしは　この　国くにの　食たべ物ものが　大好だいすきです。\n      \n      パスタぱすたや　ピザぴざが　有名ゆうめいです。\n      \n      この　国くには　ブーツぶーつのような　形かたちを　しています。\n      \n      この　絵えは　モナリザもなりざです。\n      \n      モナリザもなりざの　作者さくしゃ　モナリザもなりざを　描かいた　レオナルドダビンチれおなるどだびんちは　この　国くにの　出身しゅっしんです。\n      \n      どこの　国くにでしょう。\n      \n      正解せいかいは　イタリアいたりあです。\n      \n      第３問だいさんもん\n      \n      この　国くには　世界せかいで　二番目にばんめに　広ひろい　国くにです。\n      \n      英語えいごと　フランス語ふらんすごが　話はなされています。\n      \n      山やまや　川かわや　湖みずうみなど　自然しぜんが　豊ゆたかです。\n      \n      有名ゆうめいな　滝たきが　あります。\n      \n      歌手かしゅの　ジャスティンじゃすてぃん・ビーバーびーばーは　この　国くにの　出身しゅっしんです。\n      \n      どこの　国くにでしょう。\n      \n      正解せいかいは　カナダかなだです。\n      \n      第４問だいよんもん\n      \n      この　国くには　世界せかいで　二番目にばんめに　人口じんこうが　多おおい　国くにです。\n      \n      これは　ヨガよがです。\n      \n      ヨガよがを　しています。\n      \n      この　国くには　ヨガよが　発祥はっしょうの　地ちです。\n      \n      それから　仏教ぶっきょう　発祥はっしょうの　地ちです。\n      \n      この　国くには　カレーかれーが　有名ゆうめいです。\n      \n      どこの　国くにでしょう。\n      \n      正解せいかいは　インドいんどです。\n      \n      第５問だいごもん　最後さいごの　問題もんだいです。\n      \n      この　国くには　アフリカあふりかに　あります。\n      \n      アフリカあふりかの　北きたの　方ほうに　あります。\n      \n      この　国くにには　砂漠さばくが　あります。\n      \n      ピラミッドぴらみっどが　あります。\n      \n      世界せかいで　一番いちばん　長ながい　川かわが　流ながれています。\n      \n      どこの　国くにでしょう。\n      \n      正解せいかいは　エジプトえじぷとです。\n      \n      今日きょうは　国くにあて　クイズくいずを　しました。\n      \n      全部ぜんぶ　わかりましたか。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "鶴の恩返し Tsuru no Ongaeshi",
      url: "https://cijapanese.com/tsuru-no-ongaeshi/",
      level: "beginner",
      membership: "free",
      transcript: "この鳥は鶴といいます。今日は「鶴の恩返し」という日本の昔話をします。\n\n      昔あるところに、おじいさんとおばあさんが住んでいました。この夫婦は貧しいです。お金がありません。今は冬です。寒い冬です。\n      \n      ここは町です。おじいさんが町に行きます。これは薪です。おじいさんは薪を持って町に行きます。おじいさんは薪を売りに町へ行きます。\n      \n      その途中で一羽の鶴を見つけます。鶴は罠にかかっています。鶴は罠にかかって動けません。動くことができません。おじいさんは「かわいそうに」と思います。そして鶴を助けます。助けてあげます。鶴は空に飛んでいきます。\n      \n      その日の夜です。外は雪が降っています。雪が激しく降っています。「トントントン」おじいさんとおばあさんの家に、誰かがやって来ました。ドアを開けます。するとそこには美しい女の子が立っていました。\n      \n      女の子が言います。「私にはお父さんもお母さんもいません。家族がいません。家族がいないので親戚の家に行くところです。でも途中で道に迷ってしまいました。親戚の家に行くことができません。」\n      \n      「お願いします。今日の夜、今晩ここに泊めてください。」と頼みました。優しいおじいさんとおばあさんは、「どうぞ」と言って女の子を家に泊めてあげました。\n      \n      次の日もその次の日も、雪が降っています。ずっと雪が降り続けています。女の子はまだおじいさんとおばあさんの家にいます。その間、女の子はおじいさんとおばあさんのために、料理をします。掃除をします。二人を手伝います。\n      \n      ある日女の子が言いました。「私をおじいさんとおばあさんの娘にしてください。二人の娘になりたいです。」おじいさんとおばあさんは嬉しいです。二人は喜んで彼女を娘にしました。そして三人は仲良く幸せに暮らしていました。\n      \n      これは糸です。布です。これは機織り機です。布を作る機械です。ある日娘が言います。「布を作りたいです。」そしておじいさんに「町で糸を買ってきてください。」と頼みます。おじいさんが町に行って糸を買ってきます。\n      \n      娘はその糸で機を織ります。娘はおじいさんとおばあさんにお願いします。「絶対にドアを開けないでください。見ないでください。絶対に覗かないでください。」おじいさんとおばあさんは娘と約束しました。絶対ドアを開けません。絶対見ません。絶対覗きません。と約束しました。\n      \n      布ができました。娘は「この布を町に持って行って売ってください。」と言います。おじいさんは町に布を売りに行きます。布はとても高く売れました。とても高い値段で売れました。おじいさんとおばあさんはお金持ちになりました。\n      \n      それからしばらく経ちました。おじいさんとおばあさんは、娘のことが気になります。ドアを開けて見たいです。でも、絶対開けません。絶対見ません。と約束しました。なので我慢します。見ません。約束を守ります。\n      \n      でもある日とうとう、約束を破ってしまいました。約束を破って見てしまいました。するとそこには、娘ではなく鶴がいました。鶴は自分の羽を抜いて布を作っていました。\n      \n      おじいさんとおばあさんは驚きます。娘が言います。「私はあの時おじいさんに助けてもらった鶴です。おじいさんに恩返ししたくて、恩返しするために、ここに来ました。でも二人に見られてしまいました。バレてしまいました。なのでもう帰らなくてはいけません。さようなら。」と言って空に飛んでいきました。\n      \n      おしまい。",
      transcript_furigana: "この　鳥とりは　鶴つると　いいます。\n\n      今日きょうは　「鶴つるの恩返おんがえし」という　日本にほんの　昔話むかしばなしを　します。\n      \n      昔むかし　あるところに　おじいさんと　おばあさんが　住すんでいました。\n      \n      この　夫婦ふうふは　貧まずしいです。\n      \n      お金かねが　ありません。\n      \n      今いまは　冬ふゆです。\n      \n      寒さむい　冬ふゆです。\n      \n      ここは　町まちです。\n      \n      おじいさんが　町まちに　行いきます。\n      \n      これは　薪まきです。\n      \n      おじいさんは　薪まきを　持もって　町まちに　行いきます。\n      \n      おじいさんは　薪まきを　売うりに　町まちへ　行いきます。\n      \n      その　途中とちゅうで　一羽いちわの　鶴つるを　見みつけます。\n      \n      鶴つるは　罠わなに　かかっています。\n      \n      鶴つるは　罠わなに　かかって　動うごけません。\n      \n      動うごくことが　できません。\n      \n      おじいさんは　「かわいそうに」と　思おもいます。\n      \n      そして　鶴つるを　助たすけます。\n      \n      助たすけて　あげます。\n      \n      鶴つるは　空そらに　飛とんでいきます。\n      \n      その日ひの　夜よるです。\n      \n      外そとは　雪ゆきが　降ふっています。\n      \n      雪ゆきが　激はげしく　降ふっています。\n      \n      「トントントンとんとんとん」　おじいさんと　おばあさんの　家いえに　誰だれかが　やって来きました。\n      \n      ドアどあを　開あけます。\n      \n      すると　そこには　美うつくしい　女おんなの子こが　立たっていました。\n      \n      女おんなの子こが　言いいます。\n      \n      「私わたしには　お父とうさんも　お母かあさんも　いません。\n      \n      家族かぞくが　いません。\n      \n      家族かぞくが　いないので　親戚しんせきの　家いえに　行いくところです。\n      \n      でも　途中とちゅうで　道みちに　迷まよってしまいました。\n      \n      親戚しんせきの　家いえに　行いくことが　できません。\n      \n      お願ねがいします。\n      \n      今日きょうの　夜よる、　今晩こんばん　ここに　泊とめてください。」と　頼たのみました。\n      \n      優やさしい　おじいさんと　おばあさんは　「どうぞ。」と　言いって　女おんなの子こを　家いえに　泊とめてあげました。\n      \n      次つぎの　日ひも　その　次つぎの　日ひも　雪ゆきが　降ふっています。\n      \n      ずっと　雪ゆきが　降ふりり続つづけています。\n      \n      女おんなの子こは　まだ　おじいさんと　おばあさんの　家いえに　います。\n      \n      その間　女おんなの子こは　おじいさんと　おばあさんのために　料理りょうりを　します。\n      \n      掃除そうじを　します。\n      \n      二人ふたりを　手伝てつだいます。\n      \n      ある日ひ　女おんなの子こが　言いいました。\n      \n      「私わたしを　おじいさんと　おばあさんの　娘むすめに　してください。\n      \n      二人ふたりの　娘むすめに　なりたいです。」　\n      \n      おじいさんと　おばあさんは　嬉うれしいです。\n      \n      二人ふたりは　喜よろこんで　彼女かのじょを　娘むすめに　しました。\n      \n      そして　三人さんにんは　仲良なかよく　幸しあわせに　暮くらしていました。\n      \n      これは　糸いとです。\n      \n      布ぬのです。\n      \n      これは　機織はたおり機きです。\n      \n      布ぬのを　作つくる　機械きかいです。\n      \n      ある日ひ　娘むすめが　言いいます。\n      \n      「布ぬのを　作つくりたいです。」\n      \n      そして　おじいさんに　「町まちで　糸いとを　買かってきて　ください。」と　頼たのみます。\n      \n      おじいさんが　町まちに　行いって　糸いとを　買かってきます。\n      \n      娘むすめは　その　糸いとで　機はたを　織おります。\n      \n      娘むすめは　おじいさんと　おばあさんに　お願ねがいします。\n      \n      「絶対ぜったいに　ドアどあを　開あけないで　ください。\n      \n      見みないで　ください。\n      \n      絶対ぜったいに　覗のぞかないで　ください。」\n      \n      おじいさんと　おばあさんは　娘むすめと　約束やくそくしました。\n      \n      絶対ぜったい　ドアどあを　開あけません。\n      \n      絶対ぜったい　見みません。\n      \n      絶対ぜったい　覗のぞきません。\n      \n      と　約束やくそくしました。\n      \n      布ぬのが　できました。\n      \n      娘むすめは　「この　布ぬのを　町まちに　持もって　行いって　売うって　ください。」と　言いいます。\n      \n      おじいさんは　町まちに　布ぬのを　売うりに　行いきます。\n      \n      布ぬのは　とても　高たかく　売うれました。\n      \n      とても　高たかい　値段ねだんで　売うれました。\n      \n      おじいさんと　おばあさんは　お金持かねもちに　なりました。\n      \n      それから　しばらく　経たちました。\n      \n      おじいさんと　おばあさんは　娘むすめのことが　気きになります。\n      \n      ドアどあを　開あけて　見みたいです。\n      \n      でも　絶対ぜったい　開あけません。\n      \n      絶対ぜったい　見みません。\n      \n      と　約束やくそくしました。\n      \n      なので　我慢がまんします。\n      \n      見みません。\n      \n      約束やくそくを　守まもります。\n      \n      でも　ある日ひ　とうとう　約束やくそくを　破やぶってしまいました。\n      \n      約束やくそくを　破やぶって　見みてしまいました。\n      \n      すると　そこには　娘むすめではなく　鶴つるが　いました。\n      \n      鶴つるは　自分じぶんの　羽はねを　抜ぬいて　布ぬのを　作つくっていました。\n      \n      おじいさんと　おばあさんは　驚おどろきます。\n      \n      娘むすめが　言いいます。\n      \n      「私わたしは　あの時とき　おじいさんに　助たすけてもらった　鶴つるです。\n      \n      おじいさんに　恩返おんがえししたくて　恩返おんがえしするために　ここに　来きました。\n      \n      でも　二人ふたりに　見みられてしまいました。\n      \n      バレばれてしまいました。\n      \n      なので　もう　帰かえらなくてはいけません。\n      \n      さようなら」と　言いって　空そらに　飛とんでいきました。\n      \n      おしまい。"
  },
  {
      title: "日本語の文字の歴史 History of Japanese Writing System",
      url: "https://cijapanese.com/history-of-japanese-writing-system/",
      level: "beginner",
      membership: "free",
      transcript: "日本語には平仮名、片仮名、漢字の３種類の文字があります。\n\n      例えば私の名前は「きむらゆき」といいますが、平仮名で書くとこうです。片仮名で書くとこうです。漢字で書くとこうです。\n      \n      今日は、日本語の文字の歴史についてお話します。\n      \n      日本で１番に、最初に使われた文字は漢字でした。漢字は元々中国の文字です。紀元前１３００年頃に中国で生まれました。\n      \n      その後４世紀から５世紀頃に中国から日本に伝わったと言われています。それ以前の日本には文字はありませんでした。\n      \n      ７世紀頃、漢字を基にして「万葉仮名」という文字を使い始めました。７世紀頃から万葉仮名を使い始めました。例えば「あ」という音を万葉仮名で書くとこうです。「あ」という１つの音に対して１２３４５６７、７つも文字がありました。しかも複雑で難しいです。\n      \n      そこで９世紀頃に万葉仮名を基にして平仮名が作られました。これは万葉仮名の「あいうえお」です。これをくずします。シンプルに簡単に書き換えます。こうして平仮名ができました。\n      \n      当時漢字は主に男の人によって使われていました。男の人が漢字を使っていました。平仮名は女の人によって使われていました。女の人が平仮名を使っていました。\n      \n      これは本です。「枕草子」や「源氏物語」など有名な本が、この頃女性によって平仮名で書かれました。\n      \n      同じ頃に同じく万葉仮名を基にして片仮名も作られました。片仮名は万葉仮名の一部をとったものです。これも万葉仮名の「あいうえお」です。\n      \n      この人は仏教のお坊さんです。僧侶といいます。この本には仏教の教えが書かれています。経典といいます。経典は全て漢文で書かれています。漢文とは中国の古い、昔の文のことです。お坊さんたちは、漢文を日本語に訳して読んでいました。\n      \n      その時、振り仮名のように横にメモをしながら読んでいました。メモをする時、万葉仮名では書きにくいです。文字が複雑で難しいので書きにくいです。そのため、万葉仮名を略して一部だけをとって書くようになりました。こうして片仮名ができました。\n      \n      今日は日本語の文字の歴史を紹介しました。今日はこれでおしまい。またね。",
      transcript_furigana: "日本語にほんごには　平仮名ひらがな　片仮名かたかな　漢字かんじの　３種類さんしゅるいの　文字もじが　あります。\n\n      例たとえば　私わたしの　名前なまえは　「きむらゆき」と　いいますが　平仮名ひらがなで　書かくと　こうです。\n      \n      片仮名かたかなで　書かくと　こうです。\n      \n      漢字かんじで　書かくと　こうです。\n      \n      今日きょうは　日本語にほんごの　文字もじの　歴史れきしについて　お話はなしします。\n      \n      日本にほんで　１番いちばんに　最初さいしょに　使つかわれた　文字もじは　漢字かんじでした。\n      \n      漢字かんじは　元々もともと　中国ちゅうごくの　文字もじです。\n      \n      紀元前きげんぜん　１３００年頃せんさんびゃくねんごろに　中国ちゅうごくで　生うまれました。\n      \n      その後ご　４世紀よんせいきから　５世紀頃ごせいきごろに　中国ちゅうごくから　日本にほんに　伝つたわったと　言いわれています。\n      \n      それ　以前いぜんの　日本にほんには　文字もじは　ありませんでした。\n      \n      ７世紀頃ななせいきごろ　漢字かんじを　基もとにして　「万葉仮名まんようがな」という　文字もじを　使つかい始はじめました。\n      \n      ７世紀頃ななせいきごろから　万葉仮名まんようがなを　使つかい始はじめました。\n      \n      例たとえば　「あ」という　音おとを　万葉仮名まんようがなで　書かくと　こうです。\n      \n      「あ」という　１ひとつの　音おとに　対たいして　１いち２に３さん４し５ご６ろく７しち　７ななつも　文字もじが　ありました。\n      \n      しかも　複雑ふくざつで　難むずかしいです。\n      \n      そこで　９世紀頃きゅうせいきごろに　万葉仮名まんようがなを　基もとにして　平仮名ひらがなが　作つくられました。\n      \n      これは　万葉仮名まんようがなの　「あいうえお」です。\n      \n      これを　くずします。\n      \n      シンプルしんぷるに　簡単かんたんに　書かき換かえます。\n      \n      こうして　平仮名ひらがなが　できました。\n      \n      当時とうじ　漢字かんじは　主おもに　男おとこの人ひとによって　使つかわれていました。\n      \n      男おとこの人ひとが　漢字かんじを　使つかっていました。\n      \n      平仮名ひらがなは　女おんなの人ひとによって　使つかわれていました。\n      \n      女おんなの人ひとが　平仮名ひらがなを　使つかっていました。\n      \n      これは　本ほんです。\n      \n      「枕草子まくらのそうし」や　「源氏物語げんじものがたり」など　有名ゆうめいな　本ほんが　この頃ころ　女性じょせいによって　平仮名ひらがなで　書かかれました。\n      \n      同おなじ頃ころに　同おなじく　万葉仮名まんようがなを　基もとにして　片仮名かたかなも　作つくられました。\n      \n      片仮名かたかなは　万葉仮名まんようがなの　一部いちぶを　とったものです。\n      \n      これも　万葉仮名まんようがなの　「あいうえお」です。\n      \n      この人ひとは　仏教ぶっきょうの　お坊ぼうさんです。\n      \n      僧侶そうりょといいます。\n      \n      この本ほんには　仏教ぶっきょうの　教おしえが　書かかれています。\n      \n      経典きょうてんといいます。\n      \n      経典きょうてんは　全すべて　漢文かんぶんで　書かかれています。\n      \n      漢文かんぶんとは　中国ちゅうごくの　古ふるい　昔むかしの　文ぶんのことです。\n      \n      お坊ぼうさんたちは　漢文かんぶんを　日本語にほんごに　訳やくして　読よんでいました。\n      \n      その時とき　振ふり仮名がなのように　横よこに　メモめもを　しながら　読よんでいました。\n      \n      メモめもを　する時とき　万葉仮名まんようがなでは　書かきにくいです。\n      \n      文字もじが　複雑ふくざつで　難むずかしいので　書かきにくいです。\n      \n      そのため　万葉仮名まんようがなを　略りゃくして　一部いちぶだけを　とって　書かくように　なりました。\n      \n      こうして　片仮名かたかなが　できました。\n      \n      今日きょうは　日本語にほんごの　文字もじの　歴史れきしを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "サッカー観戦 Watching a Soccer Game",
      url: "https://cijapanese.com/watching-a-soccer-game/",
      level: "beginner",
      membership: "free",
      transcript: "これはサッカーボールです。サッカーの試合です。\n\n      サッカーの試合を観るのは好きですか？よく観ますか？家でテレビで観ますか？それともスタジアムで観ますか？\n      \n      私は家でたまにサッカーの試合を観ます。テレビでたまに観ます。でもスタジアムで観たことはありませんでした。\n      \n      これは野球です。野球はスタジアムで観たことがあります。何度もあります。でもサッカーは観たことがありませんでした。\n      \n      今日は４月５日月曜日です。一昨日４月３日土曜日、人生で初めてサッカーを観に行きました。初めてスタジアムで試合を観ました。家族で観に行きました。\n      \n      この人達はサッカー選手です。ユニフォームを着ています。青いユニフォームのチームは福岡のチームです。アビスパ福岡という名前のチームです。白いユニフォームのチームは北海道のチームです。コンサドーレ札幌という名前のチームです。\n      \n      コンサドーレ札幌対アビスパ福岡の試合でした。私たちは福岡出身なので、もちろんアビスパ福岡を応援しました。家族みんな、アビスパのユニフォームと同じ、青い服を着て応援しました。\n      \n      前半、コンサドーレが１点入れました。前半は１−０でした。後半、アビスパも１点入れました。１−１、同点になりました。でもそのすぐあとに、コンサドーレがまた１点入れました。同点になったけど、直後に逆転されました。\n      \n      結局２対１でコンサドーレが勝ちました。アビスパは負けました。負けてしまいました。残念でした。悔しかったです。でも試合は面白かったです。面白い試合でした。いつかまた試合を観に行きたいです。\n      \n      今日はサッカー観戦についてお話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "これは　サッカーボールさっかーぼーるです。\n\n      サッカーさっかーの　試合しあいです。\n      \n      サッカーさっかーの　試合しあいを　観みるのは　好すきですか。\n      \n      よく　観みますか。\n      \n      家いえで　テレビてれびで　観みますか。\n      \n      それとも　スタジアムすたじあむで　観みますか。\n      \n      私わたしは　家いえで　たまに　サッカーさっかーの　試合しあいを　観みます。\n      \n      テレビてれびで　たまに　観みます。\n      \n      でも　スタジアムすたじあむで　観みたことは　ありませんでした。\n      \n      これは　野球やきゅうです。\n      \n      野球やきゅうは　スタジアムすたじあむで　観みたことが　あります。\n      \n      何度なんども　あります。\n      \n      でも　サッカーさっかーは　観みたことが　ありませんでした。\n      \n      今日きょうは　４月しがつ　５日いつか　月曜日げつようびです。\n      \n      一昨日おととい　４月しがつ　３日みっか　土曜日どようび　人生じんせいで　初はじめて　サッカーさっかーを　観みに　行いきました。\n      \n      初はじめて　スタジアムすたじあむで　試合しあいを　観みました。\n      \n      家族かぞくで　観みに　行いきました。\n      \n      この　人達ひとたちは　サッカーさっかー選手せんしゅです。\n      \n      ユニフォームゆにふぉーむを　着きています。\n      \n      青あおい　ユニフォームゆにふぉーむの　チームちーむは　福岡ふくおかの　チームちーむです。\n      \n      アビスパあびすぱ福岡ふくおかという　名前なまえの　チームちーむです。\n      \n      白しろい　ユニフォームゆにふぉーむの　チームちーむは　北海道ほっかいどうの　チームちーむです。\n      \n      コンサドーレこんさどーれ札幌さっぽろという　名前なまえの　チームちーむです。\n      \n      コンサドーレこんさどーれ札幌さっぽろ　対たい　アビスパあびすぱ福岡ふくおかの　試合しあいでした。\n      \n      私わたしたちは　福岡出身ふくおかしゅっしんなので　もちろん　アビスパあびすぱ福岡ふくおかを　応援おうえんしました。\n      \n      家族かぞく　みんな　アビスパあびすぱの　ユニフォームゆにふぉーむと　同おなじ　青あおい　服ふくを　着きて　応援おうえんしました。\n      \n      前半ぜんはん　コンサドーレこんさどーれが　１点いってん　入いれました。\n      \n      前半ぜんはんは　１−０いったいぜろでした。\n      \n      後半こうはん　アビスパあびすぱも　１点いってん　入いれました。\n      \n      １−１いったいいち　同点どうてんに　なりました。\n      \n      でも　その　すぐ　あとに　コンサドーレこんさどーれが　また　１点いってん　入いれました。\n      \n      同点どうてんに　なったけど　直後ちょくごに　逆転ぎゃくてんされました。\n      \n      結局けっきょく　２対１にたいいいちで　コンサドーレこんさどーれが　勝かちました。\n      \n      アビスパあびすぱは　負まけました。\n      \n      負まけてしまいました。\n      \n      残念ざんねんでした。\n      \n      悔くやしかったです。\n      \n      でも　試合しあいは　面白おもしろかったです。\n      \n      面白おもしろい　試合しあいでした。\n      \n      いつか　また　試合しあいを　観みに　行いきたいです。\n      \n      今日きょうは　サッカーさっかー観戦かんせんについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "ワンピース One Piece",
      url: "https://cijapanese.com/one-piece/",
      level: "beginner",
      membership: "free",
      transcript: "今日は漫画「ワンピース」の第一巻のあらすじをお話します。\n\n      これは海賊です。ワンピースは海賊の話です。\n      \n      この人はゴールド・ロジャーというとても強い海賊です。ゴールド・ロジャーは死にました。死ぬ間際、死ぬ直前に「ある場所に宝を全部置いてきた」と言いました。\n      \n      海賊たちはみんなその宝が欲しいです。たくさんの海賊たちがその宝のために争っていました。\n      \n      海です。ここはフーシャ村という村です。海の近くにあります。ここにルフィーという名前の少年が住んでいました。7歳の男の子です。ルフィーの夢は、海賊になることでした。ルフィーは海賊になりたいです。\n      \n      この人は海賊です。赤い髪の毛の海賊です。名前はシャンクスといいます。シャンクスとルフィーは仲が良いです。友だちです。\n      \n      ルフィーはいつもシャンクスに言っていました。「海賊になりたい！シャンクスと一緒に行きたい！連れて行って！」と頼んでいました。でも、シャンクスは「ダメ」と断っていました。\n      \n      これは食べ物です。ルフィーは食べることが大好きです。たくさん食べます。食いしん坊です。食いしん坊のルフィーは、ある日紫色の実を見つけました。これはゴムゴムの実という悪魔の実です。\n      \n      これはゴムです。ゴムは伸びます。このゴムゴムの実を食べるとゴムのようになります。ゴムのように手が伸びたり、足が伸びたりします。それから泳ぐことができなくなります。泳げなくなってしまいます。\n      \n      これは山賊です。海賊は海にいます。山賊は山にいます。山にいる悪い人たちです。\n      \n      ある日山賊がシャンクスのことをバカにします。それを聞いてルフィーは怒ります。山賊たちと喧嘩をします。でも山賊たちは強いです。ルフィーは勝てません。山賊たちに敵いません。山賊はルフィーを海に落とします。\n      \n      ルフィーはゴムゴムの実のせいで泳ぐことができません。そこへ怪物が来ます。とても大きいです。怪物がルフィーを食べようとします。ルフィーは怪物に食べられそうになります。\n      \n      その時シャンクスが来ました。シャンクスがルフィーを助けてくれました。これは腕です。ルフィーがシャンクスを見ます。するとシャンクスの腕がありません。ルフィーを助けた時に怪物に腕を食べられてしまいました。\n      \n      少し経ちました。シャンクスがフーシャ村を出発します。海に行きます。シャンクスとルフィーはお別れです。ルフィーはシャンクスに言います。「俺は海賊になる！海賊王になる！」と約束します。シャンクスは自分の帽子をルフィーにあげます。ルフィーはシャンクスの帽子をもらいます。\n      \n      １０年経ちました。１０年後です。ルフィーは１７歳になりました。とても強くなりました。これは船です。ルフィーは船に乗ります。船に乗って海へ出発します。\n      \n      ワンピース第一話のあらすじでした。おしまい。",
      transcript_furigana: "今日きょうは　漫画まんが　「ワンピースわんぴーす」の　第一巻だいいっかんの　あらすじを　お話はなしします。\n\n      これは　海賊かいぞくです。\n      \n      ワンピースわんぴーすは　海賊かいぞくの　話はなしです。\n      \n      この人ひとは　ゴールド・ロジャーごーるど・ろじゃーという　とても　強つよい　海賊かいぞくです。\n      \n      ゴールド・ロジャーごーるど・ろじゃーは　死しにました。\n      \n      死しぬ　間際まぎわ　死しぬ　直前ちょくぜんに　「ある　場所ばしょに　宝たからを　全部ぜんぶ　置おいてきた」と　言いいました。\n      \n      海賊かいぞくたちは　みんな　その　宝たからが　欲ほしいです。\n      \n      たくさんの　海賊かいぞくたちが　その　宝たからの　ために　争あらそっていました。\n      \n      海うみです。\n      \n      ここは　フーシャ村ふーしゃむらという　村むらです。\n      \n      海うみの　近ちかくに　あります。\n      \n      ここに　ルフィーるふぃーという　名前なまえの　少年しょうねんが　住すんでいました。\n      \n      7歳ななさいの　男おとこの子こです。\n      \n      ルフィーるふぃーの　夢ゆめは　海賊かいぞくに　なることでした。\n      \n      ルフィーるふぃーは　海賊かいぞくに　なりたいです。\n      \n      この人ひとは　海賊かいぞくです。\n      \n      赤あかい　髪かみの毛けの　海賊かいぞくです。\n      \n      名前なまえは　シャンクスしゃんくすといいます。\n      \n      シャンクスしゃんくすと　ルフィーるふぃーは　仲なかが　良いいです。\n      \n      友ともだちです。\n      \n      ルフィーるふぃーは　いつも　シャンクスしゃんくすに　言いっていました。\n      \n      「海賊かいぞくに　なりたい。　シャンクスしゃんくすと　一緒いっしょに　行いきたい。　連つれて　行いって。」と　頼たのんでいました。\n      \n      でも　シャンクスしゃんくすは　「ダメだめ」と　断ことわっていました。\n      \n      これは　食たべ物ものです。\n      \n      ルフィーるふぃーは　食たべることが　大好だいすきです。\n      \n      たくさん　食たべます。\n      \n      食くいしん坊ぼうです。\n      \n      食くいしん坊ぼうの　ルフィーるふぃーは　ある日ひ　紫色むらさきいろの　実みを　見みつけました。\n      \n      これは　ゴムゴムごむごむの　実みという　悪魔あくまの　実みです。\n      \n      これは　ゴムごむです。\n      \n      ゴムごむは　伸のびます。\n      \n      この　ゴムごむゴムごむの　実みを　食たべると　ゴムごむのように　なります。\n      \n      ゴムごむのように　手てが　伸のびたり　足あしが　伸のびたりします。\n      \n      それから　泳およぐことが　できなく　なります。\n      \n      泳およげなく　なってしまいます。\n      \n      これは　山賊さんぞくです。\n      \n      海賊かいぞくは　海うみに　います。\n      \n      山賊さんぞくは　山やまに　います。\n      \n      山やまに　いる　悪わるい　人ひとたち　です。\n      \n      ある日ひ　山賊さんぞくが　シャンクスしゃんくすの　ことを　バカばかにします。\n      \n      それを　聞きいて　ルフィーるふぃーは　怒おこります。\n      \n      山賊さんぞくたちと　喧嘩けんかを　します。\n      \n      でも　山賊さんぞくたちは　強つよいです。\n      \n      ルフィーるふぃーは　勝かてません。\n      \n      山賊さんぞくたちに　敵かないません。\n      \n      山賊さんぞくは　ルフィーるふぃーを　海うみに　落おとします。\n      \n      ルフィーるふぃーは　ゴムごむゴムごむの　実みの　せいで　泳およぐことが　できません。\n      \n      そこへ　怪物かいぶつが　来きます。\n      \n      とても　大おおきいです。\n      \n      怪物かいぶつが　ルフィーるふぃーを　食たべようと　します。\n      \n      ルフィーるふぃーは　怪物かいぶつに　食たべられそうに　なります。\n      \n      その時とき　シャンクスしゃんくすが　来きました。\n      \n      シャンクスしゃんくすが　ルフィーるふぃーを　助たすけてくれました。\n      \n      これは　腕うでです。\n      \n      ルフィーるふぃーが　シャンクスしゃんくすを　見みます。\n      \n      すると　シャンクスしゃんくすの　腕うでが　ありません。\n      \n      ルフィーるふぃーを　助たすけた時ときに　怪物かいぶつに　腕うでを　食たべられてしまいました。\n      \n      少すこし　経たちました。\n      \n      シャンクスしゃんくすが　フーシャ村ふーしゃむらを　出発しゅっぱつします。\n      \n      海うみに　行いきます。\n      \n      シャンクスしゃんくすと　ルフィーるふぃーは　お別わかれです。\n      \n      ルフィーるふぃーは　シャンクスしゃんくすに　言いいます。\n      \n      「俺おれは　海賊かいぞくに　なる。　海賊王かいぞくおうに　なる。」と　約束やくそくします。\n      \n      シャンクスしゃんくすは　自分じぶんの　帽子ぼうしを　ルフィーるふぃーに　あげます。\n      \n      ルフィーるふぃーは　シャンクスしゃんくすの　帽子ぼうしを　もらいます。\n      \n      １０年じゅうねん　経たちました。\n      \n      １０年後じゅうねんごです。\n      \n      ルフィーるふぃーは　１７歳じゅうななさいに　なりました。\n      \n      とても　強つよく　なりました。\n      \n      これは　船ふねです。\n      \n      ルフィーるふぃーは　船ふねに　乗のります。\n      \n      船ふねに　乗のって　海うみへ　出発しゅっぱつします。\n      \n      ワンピースわんぴーす　第一話だいいちわの　あらすじでした。\n      \n      おしまい。"
  },
  {
      title: "日本の食事のマナー Japanese Table Manners",
      url: "https://cijapanese.com/japanese-table-manners/",
      level: "beginner",
      membership: "free",
      transcript: "今日は日本の食事のマナーについてお話します。日本で食事をする時、しなければいけないこと、してはいけないこと、良いマナーと悪いマナーを紹介します。\n\n      まず、１つ目。ご飯を食べています。食事をしています。食事の前には「いただきます。」と言います。ご飯を食べる前に「いただきます。」と挨拶をします。食事の後には「ごちそうさまでした。」と言います。ご飯を食べた後に「ごちそうさまでした。」と挨拶をします。\n      \n      これは右手です。左手です。両手です。両手を合わせます。そして頭を少し下げて「いただきます」「ごちそうさまでした」と言いましょう。\n      \n      ２つ目。日本ではこのように小さなお皿や器は手で持って食べます。持って食べます。テーブルに置いたまま食べてはいけません。持って食べましょう。\n      \n      このように大きなお皿は持ちません。持たなくていいです。置いたまま食べます。\n      \n      ３つ目。ここは肘です。食事の時テーブルに肘をついてはいけません。行儀が悪いです。\n      \n      これは私です。私の父です。お父さんです。私は子供の頃、よく肘をついてご飯を食べていました。そしてよく父に叱られていました。「肘をついて食べるな」と注意されていました。\n      \n      ４つ目。これは口です。口の中に食べ物が入っています。口の中に食べ物が入っている時、このように口を開けて「くちゃくちゃくちゃくちゃ」音を立てて食べるのは行儀が悪いです。このように口を閉じて「もぐもぐもぐもぐ」と音を立てずに食べましょう。\n      \n      ５つ目。茶碗にこのように箸を立ててはいけません。絶対にしてはいけません。\n      \n      これは葬式です。人が亡くなったら、死んでしまったら、葬式をします。葬式の時にこのように茶碗に箸を立てて置きます。亡くなった人にお供えします。なので食事の時にこれはしてはいけません。\n      \n      ６つ目。これは箸です。このように箸から箸へ食べ物を渡してはいけません。絶対にしてはいけません。\n      \n      日本では、葬式の後、亡くなった人を火で燃やします。これは骨です。火で燃やして骨になります。これは亡くなった人の家族です。家族がこのように骨を箸と箸で掴みます。そして壺に運びます。\n      \n      なので、同じように食べ物を箸と箸で掴んではいけません。箸から箸へ渡してはいけません。\n      \n      今日は日本の食事のマナーを紹介しました。今日はこれでおしまい。",
      transcript_furigana: "今日きょうは　日本にほんの　食事しょくじの　マナーまなーについて　お話はなしします。\n\n      日本にほんで　食事しょくじを　する時とき　しなければいけないこと　してはいけないこと　良よい　マナーまなーと　悪わるい　マナーまなーを　紹介しょうかいします。\n      \n      まず　１ひとつ目め。\n      \n      ご飯はんを　食たべています。\n      \n      食事しょくじを　しています。\n      \n      食事しょくじの　前まえには　「いただきます」と　言いいます。\n      \n      ご飯はんを　食たべる前まえに　「いただきます」と　挨拶あいさつを　します。\n      \n      食事しょくじの　後あとには　「ごちそうさまでした」と　言いいます。\n      \n      ご飯はんを　食たべた後あとに　「ごちそうさまでした」と　挨拶あいさつを　します。\n      \n      これは　右手みぎてです。\n      \n      左手ひだりてです。\n      \n      両手りょうてです。\n      \n      両手りょうてを　合あわせます。\n      \n      そして　頭あたまを　少すこし　下さげて　「いただきます」「ごちそうさまでした」と　言いいましょう。\n      \n      ２ふたつ目め。\n      \n      日本にほんでは　このように　小ちいさな　お皿さらや　器うつわは　手てで　持もって　食たべます。\n      \n      持もって　食たべます。\n      \n      テーブルてーぶるに　置おいたまま　食たべてはいけません。\n      \n      持もって　食たべましょう。\n      \n      このように　大おおきな　お皿さらは　持もちません。\n      \n      持もたなくて　いいです。　\n      \n      置おいたまま　食たべます。\n      \n      ３みっつ目め。\n      \n      ここは　肘ひじです。\n      \n      食事しょくじの時とき　テーブルてーぶるに　肘ひじを　ついては　いけません。\n      \n      行儀ぎょうぎが　悪わるいです。\n      \n      これは　私わたしです。\n      \n      私わたしの　父ちちです。\n      \n      お父とうさんです。\n      \n      私わたしは　子供こどもの頃ころ　よく　肘ひじを　ついて　ご飯はんを　食たべていました。\n      \n      そして　よく　父ちちに　叱しかられていました。\n      \n      「肘ひじを　ついて　食たべるな」と　注意ちゅういされていました。\n      \n      ４よっつ目め。\n      \n      これは　口くちです。\n      \n      口くちの　中なかに　食たべ物ものが　入はいっています。\n      \n      口くちの　中なかに　食たべ物ものが　入はいっている時とき　このように　口くちを　開あけて　「くちゃくちゃくちゃくちゃ」音おとを　立たてて　食たべるのは　行儀ぎょうぎが　悪わるいです。\n      \n      このように　口くちを　閉とじて　「もぐもぐもぐもぐ」と　音おとを　立たてずに　食たべましょう。\n      \n      ５いつつ目め。\n      \n      茶碗ちゃわんに　このように　箸はしを　立たてては　いけません。\n      \n      絶対ぜったいに　しては　いけません。\n      \n      これは　葬式そうしきです。\n      \n      人ひとが　亡なくなったら　死しんでしまったら　葬式そうしきを　します。\n      \n      葬式そうしきの　時ときに　このように　茶碗ちゃわんに　箸はしを　立たてて　置おきます。\n      \n      亡なくなった　人ひとに　お供そなえします。\n      \n      なので　食事しょくじの　時ときに　これは　しては　いけません。\n      \n      ６むっつ目め。\n      \n      これは　箸はしです。\n      \n      このように　箸はしから　箸はしへ　食たべ物ものを　渡わたしては　いけません。\n      \n      絶対ぜったいに　しては　いけません。\n      \n      日本にほんでは　葬式そうしきの後あと　亡なくなった　人ひとを　火ひで　燃もやします。\n      \n      これは　骨ほねです。\n      \n      火ひで　燃もやして　骨ほねに　なります。\n      \n      これは　亡なくなった　人ひとの　家族かぞくです。\n      \n      家族かぞくが　このように　骨ほねを　箸はしと　箸はしで　掴つかみます。\n      \n      そして　壺つぼに　運はこびます。\n      \n      なので　同おなじように　食たべ物ものを　箸はしと　箸はしで　掴つかんでは　いけません。\n      \n      箸はしから　箸はしへ　渡わたしては　いけません。\n      \n      今日きょうは　日本にほんの　食事しょくじの　マナーまなーを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。"
  },
  {
      title: "将来の夢 Future Dream",
      url: "https://cijapanese.com/future-dream/",
      level: "beginner",
      membership: "free",
      transcript: "今日のテーマは「夢」です。夢には2種類あります。一つは寝ている時に見る夢です。もう一つは将来の夢です。\n\n      これは子供です。大人です。皆さん、子供の頃の夢は何でしたか？私は子供の頃、色々な夢がありました。\n      \n      まず１つ目はケーキ屋さんです。５歳くらいの時は、ケーキ屋さんになるのが夢でした。\n      \n      ８歳くらいの時は、料理人になるのが夢でした。私は今は、料理があまり好きではありません。今は好きじゃないですが、昔、子供の頃は、料理が好きでした。なので料理人になりたいと思っていました。\n      \n      ここは日本です。外国に行きたい！というのも私の子供の頃の夢でした。外国に行きました。この夢は叶いました。\n      \n      これは猫です。犬です。うさぎです。動物です。獣医になりたいという夢もありました。獣医とは動物のお医者さんです。動物の病院の先生です。子供の頃動物が好きでした。特に犬が大好きでした。\n      \n      他には、助産師になりたいという夢もありました。これは赤ちゃんです。助産師とは赤ちゃんが産まれる時に手伝う人です。\n      \n      子供の頃、色々な夢がありました。今私は３５歳です。大人です。もう子供ではありません。でも今も夢はあります。私の今の夢は何でしょう。\n      \n      私の今の夢は、日本語のコンテンツをたくさん作ることです。そして世界中の人に、私が作ったものを観たり、聞いたり、読んだりして楽しく日本語を勉強してもらうことです。\n      \n      皆さんの、子供の頃の夢は何でしたか？その夢は叶いましたか？今の夢は何ですか？\n      \n      今日は将来の夢について話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうの　テーマてーまは　「夢ゆめ」です。\n\n      夢ゆめには　２種類にしゅるい　あります。\n      \n      一ひとつは　寝ねている時ときに　見みる　夢ゆめです。\n      \n      もう一ひとつは　将来しょうらいの　夢ゆめです。\n      \n      これは　子供こどもです。\n      \n      大人おとなです。\n      \n      皆さん　子供こどもの頃ころの　夢ゆめは　何なんでしたか。\n      \n      私わたしは　子供こどもの頃ころ　色々いろいろな　夢ゆめが　ありました。\n      \n      まず　１ひとつ目めは　ケーキ屋けーきやさんです。\n      \n      ５歳ごさいくらいの時ときは　ケーキ屋けーきやさんに　なるのが　夢ゆめでした。\n      \n      ８歳はっさいくらいの時ときは　料理人りょうりにんに　なるのが　夢ゆめでした。\n      \n      私わたしは　今いまは　料理りょうりが　あまり　好すきではありません。\n      \n      今いまは　好すきじゃないですが　昔むかし　子供こどもの頃ころは　料理りょうりが　好すきでした。\n      \n      なので　料理人りょうりにんになりたいと　思おもっていました。\n      \n      ここは　日本にほんです。\n      \n      外国がいこくに　行いきたいというのも　私わたしの　子供こどもの頃ころの　夢ゆめでした。\n      \n      外国がいこくに　行いきました。\n      \n      この夢ゆめは　叶かないました。\n      \n      これは　猫ねこです。　犬いぬです。　うさぎです。　動物どうぶつです。\n      \n      獣医じゅういに　なりたいという　夢ゆめも　ありました。\n      \n      獣医じゅういとは　動物じょうぶつの　お医者いしゃさんです。\n      \n      動物どうぶつの　病院びょういんの　先生せんせいです。\n      \n      子供こどもの頃ころ　動物どうぶつが　好すきでした。\n      \n      特とくに　犬いぬが　大好だいすきでした。\n      \n      他ほかには　助産師じょさんしに　なりたいという　夢ゆめも　ありました。\n      \n      これは　赤あかちゃんです。\n      \n      助産師じょさんしとは　赤あかちゃんが　産うまれる時ときに　手伝てつだう人ひとです。\n      \n      子供こどもの頃ころ　色々いろいろな　夢ゆめが　ありました。\n      \n      今いま　私わたしは　３５歳さんじゅうごさいです。\n      \n      大人おとなです。\n      \n      もう　子供こどもでは　ありません。\n      \n      でも　今いまも　夢ゆめは　あります。\n      \n      私わたしの　今いまの　夢ゆめは　何なんでしょう。\n      \n      私わたしの　今いまの　夢ゆめは　日本語にほんごの　コンテンツこんてんつを　たくさん　作つくるることです。\n      \n      そして　世界中せかいじゅうの　人ひとに　私わたしが　作つくったものを　観みたり　聞きいたり　読よんだりして　楽たのしく　日本語にほんごを　勉強べんきょうしてもらうことです。\n      \n      皆みなさんの　子供こどもの　頃ころの　夢ゆめは　何なんでしたか。\n      \n      その　夢ゆめは　叶かないましたか。\n      \n      今いまの　夢ゆめは　何なんですか。\n      \n      今日きょうは　将来しょうらいの　夢ゆめについて　話はなしました。\n      \n      今日きょうは　これで　おしまい。　またね。"
  },
  {
      title: "顔 Face",
      url: "https://cijapanese.com/face/",
      level: "complete beginner",
      membership: "free",
      transcript: "これは顔です。顔を描きます。１、２、３。一つ、二つ、三つ。顔を描きます。\n\n      これは耳です。　耳　耳\n      \n      ここは頭です。　頭　頭\n      \n      これは髪の毛です。この人の髪の毛は短いです。長くありません。\n      \n      この人の髪の毛は長いです。短くありません。\n      \n      この人の髪の毛も長いです。短くありません。\n      \n      これは眉毛です。　眉毛　眉毛　　\n      \n      これは目です。　目　目　\n      \n      これは鼻です。　鼻　鼻　\n      \n      これは口です。　口　口\n      \n      この人は笑っています。にこにこ笑っています。\n      \n      この人は泣いています。　えんえん泣いています。\n      \n      この人は怒っています。プンプン怒っています。\n      \n      笑った顔、泣いた顔、怒った顔。今日は顔を三つ描きました。\n      \n      今日はこれでおしまい。またね。",
      transcript_furigana: "これは　顔かおです。\n\n      顔かおを　描かきます。\n      \n      １いち、２に、３さん。\n      \n      一ひとつ、二ふたつ、三みっつ。\n      \n      顔かおを　描かきます。\n      \n      これは　耳みみです。　耳みみ　耳みみ\n      \n      ここは　頭あたまです。　頭あたま　頭あたま\n      \n      これは　髪かみの毛けです。\n      \n      この人ひとの　髪かみの毛けは　短みじかいです。\n      \n      長ながく　ありません。\n      \n      この人の　髪かみの毛けは　長ながいです。\n      \n      短みじかく　ありません。\n      \n      この人の　髪かみの毛けも　長ながいです。\n      \n      短みじかく　ありません。\n      \n      これは　眉毛まゆげです。　眉毛まゆげ　眉毛まゆげ　　\n      \n      これは　目めです。　目め　目め　\n      \n      これは　鼻はなです。　鼻はな　鼻はな　\n      \n      これは　口くちです。　口くち　口くち\n      \n      この人ひとは　笑わらっています。\n      \n      にこにこ　笑わらっています。\n      \n      この人ひとは　泣ないています。　\n      \n      えんえん　泣ないています。\n      \n      この人ひとは　怒おこっています。\n      \n      プンプンぷんぷん　怒おこっています。\n      \n      笑わらった顔かお、　泣ないた顔かお、　怒おこった顔かお。\n      \n      今日きょうは　顔かおを　三みっつ　描かきました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "お寺と神社",
      url: "https://cijapanese.com/temples-and-shrines/",
      level: "intermediate",
      membership: "free",
      transcript: "今日はお寺と神社についてお話します。こっちはお寺です。どれも有名なお寺です。こっちは神社です。どれも有名な神社です。\n\n      日本には、お寺と神社がたくさんあります。お寺は全国に７万以上あるそうです。神社は全国に８万以上あるそうです。\n      \n      日本に旅行したことはありますか。日本に来たことがあるという方は、おそらくお寺や神社に行ったことがあると思います。\n      \n      お寺と神社は同じでしょうか。似ていますよね。でも実は、同じではないんです。お寺と神社は実は全く違うものなんです。何が違うのかご存知ですか。知っていますか。\n      \n      今日はお寺と神社を比べて、お寺と神社を比較して、違いを説明します。\n      \n      まずお寺と神社はそもそも宗教が違います。キリスト教やイスラム教など、世界には\b様々な宗教があります。教会はキリスト教の建物、モスクはイスラム教の建物です。お寺は何の宗教の建物かと言うと、お寺は仏教の建物です。\n      \n      仏教は紀元前６世紀頃にインドで生まれ、その後アジア全体に広まりました。そして６世紀頃に、中国から日本に伝わりました。\n      \n      一方神社は何の宗教の建物かと言うと、神社は神道の建物です。神道は外国から日本に入ってきたものではありません。古くからずっと日本にあったものです。\n      \n      神道では、すべてのものに神様がいると考えられています。例えば太陽には太陽の神様、山には山の神様、木には木の神様というように、全てのものにそれぞれの神様がいると考えられています。\n      \n      お寺にいるのは、お寺に祀られているのは、仏様です。お寺に行ったら仏様にお参りします。一方神社に祀られているのは、神様です。神社に行ったら神様にお参りします。\n      \n      お寺にいるこの人のことは、お坊さんと呼んだり僧侶と呼んだりします。神社にいるこの人は神主さんと呼ばれます。\n      \n      それからお寺と神社では、お参りの仕方、参拝方法も異なります。お寺では静かに手を合わせてお参りします。\n      \n      一方神社では、まず最初に二度お辞儀します。深く２回お辞儀をします。それから２回パンパンと手を叩きます。そして最後にもう一度お辞儀をします。\n      \n      初めにお寺と神社はそもそも異なる宗教だと言いました。ですが、実は日本人の多くは、仏教のお寺にも行くし神道の神社にも行きます。両方とも行きます。\n      \n      例えば神社にはどんな時に行くかというと、一年の初め、お正月に「今年もよろしくお願いします。今年も良いことがたくさんありますうように。」とお願いしたり、妊娠中に「無事に元気な赤ちゃんが生まれますように」とお願いしたり、大事なテストの前に「テストに合格しますように」とお願いしたり。\n      \n      そんな時は私たちは神社に行きます。神社に行って神様にお参りします。\n      \n      でも例えばお葬式の時、人がなくなってお葬式をする時は、日本人の殆どが仏教の方法で行います。\n      \n      私の祖父母、私のおじいちゃんおばあちゃんが亡くなったときも、仏教のお寺の住職さんに来てもらってお葬式をあげました。そしておじいちゃんとおばあちゃんのお墓はお寺にあります。\n      \n      お寺も神社も、私たち日本人にとってはとても大切な場所です。\n      \n      今日は日本のお寺と神社についてお話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうはお寺てらと神社じんじゃについてお話はなしします。\n\n      こっちはお寺てらです。\n      \n      どれも有名ゆうめいなお寺てらです。\n      \n      こっちは神社じんじゃです。\n      \n      どれも有名ゆうめいな神社じんじゃです。\n      \n      日本にほんには、お寺てらと神社じんじゃがたくさんあります。\n      \n      お寺てらは全国ぜんこくに７万以上ななまんいじょうあるそうです。\n      \n      神社じんじゃは全国ぜんこくに８万以上はちまんいじょうあるそうです。\n      \n      日本にほんに旅行りょこうしたことはありますか。\n      \n      日本にほんに来きたことがあるという方かたは、おそらくお寺てらや神社じんじゃに行いったことがあると思おもいます。\n      \n      お寺てらと神社じんじゃは同おなじでしょうか。\n      \n      似にていますよね。\n      \n      でも実じつは、同おなじではないんです。\n      \n      お寺てらと神社じんじゃは実じつは全まったく違ちがうものなんです。\n      \n      何なにが違ちがうのかご存知ぞんじですか。知しっていますか。\n      \n      今日きょうはお寺てらと神社じんじゃを比くらべて、お寺てらと神社じんじゃを比較ひかくして、違ちがいを説明せつめいします。\n      \n      まずお寺てらと神社じんじゃはそもそも宗教しゅうきょうが違ちがいます。\n      \n      キリスト教きりすときょうやイスラム教いすらむきょうなど、世界せかいには様々さまざまな宗教しゅうきょうがあります。\n      \n      教会きょうかいはキリスト教きりすときょうの建物たてもの、モスクもすくはイスラム教いすらむきょうの建物たてものです。\n      \n      お寺てらは何なんの宗教しゅうきょうの建物たてものかというと、お寺てらは仏教ぶっきょうの建物たてものです。\n      \n      仏教ぶっきょうは紀元前きげんぜん６世紀頃ろくせいきごろにインドいんどで生うまれ、その後ごアジア全体あじあぜんたいに広ひろまりました。\n      \n      そして６世紀頃ろくせいきごろに、中国ちゅうごくから日本にほんに伝つたわりました。\n      \n      一方いっぽう神社じんじゃは、何なんの宗教しゅうきょうの建物たてものかというと、神社じんじゃは神道しんとうの建物たてものです。\n      \n      神道しんとうは外国がいこくから日本にほんに入はいってきたものではありません。\n      \n      古ふるくからずっと日本にほんにあったものです。\n      \n      神道しんとうでは、全すべてのものに神様かみさまがいると考かんがえられています。\n      \n      例たとえば太陽たいようには太陽たいようの神様かみさま、山やまには山やまの神様かみさま、木きには木きの神様かみさまというように、全すべてのものにそれぞれの神様かみさまがいると考かんがえられています。\n      \n      お寺てらにいるのは、お寺てらに祀まつられているのは仏様ほとけさまです。\n      \n      お寺てらに行いったら仏様ほとけさまにお参まいりします。\n      \n      一方いっぽう神社じんじゃに祀まつられているのは、神様かみさまです。\n      \n      神社じんじゃに行いったら神様かみさまにお参まいりします。\n      \n      お寺てらにいるこの人ひとのことは、お坊ぼうさんと呼よんだり僧侶そうりょと呼よんだりします。\n      \n      神社じんじゃにいるこの人ひとは神主かんぬしさんと呼よばれます。\n      \n      それからお寺てらと神社じんじゃでは、お参まいりの仕方しかた、参拝方法さんぱいほうほうも異ことなります。\n      \n      お寺てらでは静しずかに手てを合あわせてお参まいりします。\n      \n      一方いっぽう神社じんじゃでは、まず最初さいしょに二度にどお辞儀じぎをします。\n      \n      深ふかく２回にかいお辞儀じぎをします。\n      \n      それから２回にかいパンパンぱんぱんと手てを叩たたきます。\n      \n      そして最後さいごにもう一度いちどお辞儀じぎをします。\n      \n      初はじめにお寺てらと神社じんじゃはそもそも異ことなる宗教しゅうきょうだと言いいました。\n      \n      ですが、実じつは日本人にほんじんの多おおくは、仏教ぶっきょうのお寺てらにも行いくし神道しんとうの神社じんじゃにも行いきます。\n      \n      両方りょうほうとも行いきます。\n      \n      例たとえば神社じんじゃにはどんな時ときに行いくかというと、一年いちねんの初はじめ、お正月しょうがつに「今年ことしもよろしく　お願ねがいします。今年ことしも良いいことがたくさんありますように。」とお願ねがいしたり、\n      \n      妊娠中にんしんちゅうに「無事ぶじに元気げんきな赤あかちゃんが生うまれますように」とお願ねがいしたり、大事だいじなテストてすとの前まえに「テストてすとに合格ごうかくしますように」とお願ねがいしたり。\n      \n      そんな時ときには私達わたしたちは神社じんじゃに行いきます。\n      \n      神社じんじゃに行って神様かみさまにお参まいりします。\n      \n      でも例たとえばお葬式そうしきの時、人ひとが亡なくなってお葬式そうしきをする時ときは、日本人にほんじんのほとんどが仏教ぶっきょうの方法ほうほうで行おこないます。\n      \n      私わたしの祖父母そふぼ、私わたしのおじいちゃんおばあちゃんが亡なくなった時ときも、仏教ぶっきょうのお寺てらの住職じゅうしょくさんに来きてもらってお葬式そうしきをあげました。\n      \n      そしておじいちゃんとおばあちゃんのお墓はかはお寺てらにあります。\n      \n      お寺てらも神社じんじゃも、私達わたしたち日本人にほんじんにとってはとても大切たいせつな場所ばしょです。\n      \n      今日きょうは日本にほんのお寺てらと神社じんじゃについてお話はなししました。\n      \n      今日きょうはこれでおしまい。\n      \n      またね。"
  },
  {
      title: "スーパーで買ったもの What I Bought at a Supermarket",
      url: "https://cijapanese.com/what-i-bought-at-a-supermarket/",
      level: "beginner",
      membership: "free",
      transcript: "今買い物に行ってきました。スーパーに買い物に行って帰ってきました。私が買ってきたものを見せます。\n\n      これは牛乳です。私は牛乳を飲みませんが、子供たちが毎朝牛乳を飲みます。毎日朝、牛乳を飲みます。\n      \n      これはパンです。食パンです。１２３４５６。６枚入っています。６枚入りの食パンです。私達家族は全員、よく朝ごはんに食パンを食べます。\n      \n      これはヨーグルトです。１２３４．４個セットのヨーグルトです。いちご味です。いちごが入っています。私はあまり食べません。私はあまり食べませんが、私以外の３人がよくヨーグルトを食べます。\n      \n      これは卵です。１２３４５６７８９１０、１０個入りの卵です。卵を使って、目玉焼きやゆで卵や卵焼きを作ります。\n      \n      これは紅茶です。２５個入りの紅茶です。私も夫もコーヒーが好きです。コーヒーを毎日飲みます。コーヒーを毎日飲みますが、紅茶も時々飲みます。時々紅茶を飲むときもあります。\n      \n      ここに賞味期限が書いてあります。この牛乳は５月８日までに飲まなければいけません。このパンの賞味期限は５月１日です。このパンは５月１日までに食べなけれないけません。今日が４月２７日なので、２８、２９、３９、１、あと４日以内に食べなければいけません。\n      \n      ヨーグルトの賞味期限は５月１１日です。５月１１日までに食べなくては行けません。卵の賞味期限は５月９日です。５月９日までに食べなくては行けません。紅茶の賞味期限は２０２２年、来年の１０月です。\n      \n      全部で５つ買いました。これはレシートです。パンは１６０円です。ヨーグルトは１３９円です。紅茶はいくらですか。２４９円です。牛乳はいくらですか。１６８円です。卵はいくらですか。２０２円です。合計で９１８円でした。\n      \n      今日は私が買い物したものを紹介しました。きょうはこれでおしまい。またね！",
      transcript_furigana: "今いま　買かい物ものに　行いってきました。\n\n      スーパーすーぱーに　買かい物ものに　行いって　帰かえってきました。\n      \n      私わたしが　買かってきた物ものを　見みせます。\n      \n      これは　牛乳ぎゅうにゅうです。\n      \n      私わたしは　牛乳ぎゅうにゅうを　飲のみませんが　子こどもたちが　毎朝まいあさ　牛乳ぎゅうにゅうを　飲のみます。\n      \n      毎日まいにち　朝あさ　牛乳ぎゅうにゅうを　飲のみます。\n      \n      これは　パンぱんです。\n      \n      食パンしょくぱんです。\n      \n      １いち２に３さん４し５ご６ろく\n      \n      ６枚ろくまい　入はいっています。\n      \n      ６枚入ろくまいいりの　食パンしょくぱんです。\n      \n      私達わたしたち　家族かぞくは　全員ぜんいん　よく　朝あさごはんに　食パンしょくぱんを　食たべます。\n      \n      これは　ヨーグルトよーぐるとです。\n      \n      １いち２に３さん４し。\n      \n      ４個よんこ　セットせっとの　ヨーグルトよーぐるとです。\n      \n      いちご味あじです。\n      \n      いちごが　入はいっています。\n      \n      私わたしは　あまり　食たべません。\n      \n      私わたしは　あまり　食たべませんが　私わたし　以外いがいの　３人さんにんが　よく　ヨーグルトよーぐるとを　食たべます。\n      \n      これは　卵たまごです。\n      \n      １いち２に３さん４し５ご６ろく７しち８はち９きゅう１０じゅう\n      \n      １０個入じゅっこいりの　卵たまごです。\n      \n      卵たまごを　使つかって　目玉焼めだまやきや　ゆで卵たまごや　卵焼たまごやきを　作つくります。\n      \n      これは　紅茶こうちゃです。\n      \n      ２５個入にじゅうごこいりの　紅茶こうちゃです。\n      \n      私わたしも　夫おっとも　コーヒーこーひーが　好すきです。\n      \n      コーヒーこーひーを　毎日まいにち　飲のみます。\n      \n      コーヒーこーひーを　毎日まいにち　飲のみますが　紅茶こうちゃも　時々ときどき　飲のみます。\n      \n      時々ときどき　紅茶こうちゃを　飲のむ時ときも　あります。\n      \n      ここに　賞味期限しょうみきげんが　書かいてあります。\n      \n      この牛乳ぎゅうにゅうは　５月８日ごがつようかまでに　飲のまなければいけません。\n      \n      このパンぱんの　賞味期限しょうみきげんは　５月１日ごがつついたちです。\n      \n      このパンは　５月１日ごがつついたちまでに　食たべなければいけません。\n      \n      今日きょうが　４月２７日しがつにじゅうしちにちなので　２８にじゅうはち　２９にじゅうきゅう　３０さんじゅう　１いち　あと　４日以内よっかいないに　食たべなければいけません。\n      \n      ヨーグルトよーぐるとの　賞味期限しょうみきげんは　５月１１日ごがつじゅういちにちです。\n      \n      ５月１１日ごがつじゅういちにちまでに　食たべなくてはいけません。\n      \n      卵たまごの　賞味期限しょうみきげんは　５月９日ごがつここのかです。\n      \n      ５月９日ごがつここのかまでに　食たべなくてはいけません。\n      \n      紅茶こうちゃの　賞味期限しょうみきげんは　２０２２年にせんにじゅうにねん　来年らいねんの　１０月じゅうがつです。\n      \n      全部ぜんぶで　５いつつ　買かいました。\n      \n      これは　レシートれしーとです。\n      \n      パンぱんは　１６０円ひゃくろくじゅうえんです。\n      \n      ヨーグルトよーぐるとは　１３９円ひゃくさんじゅうきゅうえんです。\n      \n      紅茶こうちゃは　いくらですか。\n      \n      ２４９円にひゃくよんじゅうきゅうえんです。\n      \n      牛乳ぎゅうにゅうは　いくらですか。\n      \n      １６８円ひゃくろくじゅうはちえんです。\n      \n      卵たまごは　いくらですか。\n      \n      ２０２円にひゃくにえんです。\n      \n      合計ごうけいで　９１８円きゅうひゃくじゅうはちえんでした。\n      \n      今日きょうは　私わたしが　買かい物ものしたものを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "日本の紙幣に描かれている人物",
      url: "https://cijapanese.com/the-people-on-japanese-bills/",
      level: "intermediate",
      membership: "free",
      transcript: "これは日本のお金です。これはコインです。これはお札です。コインのことは硬貨とも言います。お札のことは紙幣とも言います。今日は紙幣の話をします。\n\n      これは千円札です。これは五千円札です。そしてこれは一万円札です。ここには３種類しかお札がありません。私は今３種類しか持っていませんが、実際にはもう１種類あります。もう１種類、に二千円札というお札もあります。ただ、二千円札は今は殆ど使われていません。\n      \n      お札を見ると、どれも人の顔が書かれています。この人達は日本の昔の、歴史上の人物です。今日はこの三人のことを紹介します。\n      \n      一人目。千円札に描かれているこの人の名前は、野口英世といいます。野口英世はお医者さんです。彼は明治時代に生まれました。１歳の時、左手に火傷をします。火傷して指がくっついて、動かすことができなくなってしまいます。\n      \n      でも彼は一生懸命勉強して、とても優秀だったそうです。１７歳の時に手術を受けます。手術を受けて指が動かせるようになります。その時に「お医者さんってすごい！自分も将来お医者さんになりたい！」と医者を目指すようになります。\n      \n      ２２歳の時に医者になり、その後アメリカやヨーロッパに渡って病気の研究をします。ちなみに彼の奥さんはアメリカ人だったそうです。その後アフリカに渡って黄熱病という病気の研究をしていました。\n      \n      病気の研究をしている時に、病気の研究をしている最中に、自分がその病気にかかってしまい、５３歳で亡くなりました。\n      \n      二人目・五千円札に描かれているこの人の名前は、樋口一葉といいます。この人は女性です。樋口一葉も明治時代の人です。彼女は小説家でした。本を書く人でした。「たけくらべ」という作品で有名です。\n      \n      彼女も小さい頃からとても頭が良くて賢い子供でした。学校の成績もとても優秀でした。でも１２歳の時に、学校に行くのをやめてしまいました。なぜかと言うと、樋口一葉のお母さんが、女はべんきょうしなくていい、女には勉強は必要ないという考えだったからだそうです。\n      \n      ですがお父さんがサポートしてくれて、その後も勉強を続けます。しかし樋口一葉が１８歳の時に、そのお父さんが亡くなってしまいます。彼女は若いです。まだ若いですが、家族のためにお金を稼がなくてはいけません。\n      \n      そして「小説を書いてお金を稼ごう！」と考えて小説を書き始めます。彼女の書いた作品は人気が出ました。そして高く評価されました。でも２４歳の時に病気でなくなってしまいました。まだ若いです。とても若くで亡くなりました。\n      \n      三人目。一万円札に描かれているこの人の名前は、福沢諭吉といいます。福沢諭吉は江戸時代に生まれました。福沢諭吉は貧しい家に生まれましたが、彼もとても勉強熱心でした。一生懸命勉強しました。\n      \n      英語やオランダ語が上手でした。英語やオランダ語が堪能でした。実際にアメリカやヨーロッパに行き、西洋の文化を日本に伝えたり、本を日本語に訳して、翻訳して、西洋の考え方を日本に広めたりしました。\n      \n      東京に慶応義塾大学という有名な大学があります。とてもレベルの高い大学です。その大学を作ったのが福沢諭吉です。彼は慶應義塾大学を作った人として有名です。それから彼が書いた「学問のすすめ」という本も有名です。学問とは勉強のことです。「勉強は大切ですよ。」と広めた人です。\n      \n      今日は日本のお札と、お札に描かれている人物を紹介しました。今日はこれでおしまい。またね！",
      transcript_furigana: "これは日本にほんのお金かねです。\n\n      これはコインこいんです。\n      \n      これはお札さつです。\n      \n      コインこいんのことは硬貨こうかとも言いいます。\n      \n      お札さつのことは紙幣しへいとも言いいます。\n      \n      今日きょうは紙幣しへいの話はなしをします。\n      \n      これは千円札せんえんさつです。\n      \n      これは５千円札ごせんえんさつです。\n      \n      そしてこれは１万円札いちまんえんさつです。\n      \n      ここには３種類さんしゅるいしかお札さつがありません。\n      \n      私わたしは今いま３種類さんしゅるいしか持もっていませんが、実際じっさいにはもう１種類いっしゅるいあります。\n      \n      もう１種類いっしゅるい、２千円札にせんえんさつというお札さつもあります。\n      \n      ただ２千円札にせんえんさつは、今いまはほとんど使つかわれていません。\n      \n      お札さつを見みると、どれも人ひとの顔かおが描かかれています。\n      \n      この人達ひとたちは日本にほんの昔むかしの、歴史上れきしじょうの人物じんぶつです。\n      \n      今日きょうはこの三人さんにんのことを紹介しょうかいします。\n      \n      一人目ひとりめ。\n      \n      千円札せんえんさつに描えがかれているこの人ひとの名前なまえは、野口英世のぐちひでよといいます。\n      \n      野口英世のぐちひでよはお医者いしゃさんです。\n      \n      彼かれは明治時代めいじじだいに生うまれました。\n      \n      １歳いっさいの時とき左手ひだりてに火傷やけどをします。\n      \n      火傷やけどをして指ゆびがくっついて、動うごかすことができなくなってしまいます。　\n      \n      でも彼かれは一生懸命いっしょうけんめい勉強べんきょうして、とても優秀ゆうしゅうだったそうです。\n      \n      １７歳じゅうななさいの時ときに手術しゅじゅつを受うけます。\n      \n      手術しゅじゅつを受うけて指ゆびが動うごかせるようになります。\n      \n      その時ときに「お医者いしゃさんってすごい！自分じぶんも将来しょうらいお医者いしゃさんになりたい。」と医者いしゃを目指めざすようになります。\n      \n      ２２歳にじゅうにさいの時ときに医者いしゃになり、その後ごアメリカあめりかやヨーロッパよーろっぱに渡わたって病気びょうきの研究けんきゅうをします。\n      \n      ちなみに彼かれの奥おくさんはアメリカ人あめりかじんだったそうです。\n      \n      その後ごアフリカあふりかに渡わたって、黄熱病おうねつびょうという病気びょうきの研究けんきゅうをしていました。\n      \n      病気びょうきの研究けんきゅうをしている時ときに、病気びょうきの研究けんきゅうをしている最中さいちゅうに、自分じぶんがその病気びょうきにかかってしまい５３歳ごじゅうさんさいで亡なくなりました。\n      \n      二人目ふたりめ。\n      \n      五千円札ごせんえんさつに描えがかれているこの人ひとの名前なまえは樋口一葉ひぐちいちようといいます。\n      \n      この人ひとは女性じょせいです。\n      \n      樋口一葉ひぐちいちようも明治時代めいじじだいの人ひとです。\n      \n      彼女かのじょは小説家しょうせつかでした。\n      \n      本ほんを書かく人ひとでした。\n      \n      「たけくらべ」という作品さくひんで有名ゆうめいです。\n      \n      彼女かのじょも小ちいさい頃ころからとても頭あたまがよくて賢かしこい子供こどもでした。\n      \n      学校がっこうの成績せいせきもとても優秀ゆうしゅうでした。\n      \n      でも１２歳じゅうにさいの時ときに学校がっこうに行いくのをやめてしまいました。\n      \n      なぜかと言いうと、樋口一葉ひぐちいちようのお母かあさんが女おんなは勉強べんきょうしなくていい、女おんなには勉強べんきょうは必要ひつようないという考かんがえだったからだそうです。\n      \n      ですがお父とうさんがサポートさぽーとしてくれて、その後ごも勉強べんきょうを続つづけます。\n      \n      しかし樋口一葉ひぐちいちようが１８歳じゅうはっさいの時ときに、そのお父とうさんが亡なくなってしまいます。\n      \n      彼女かのじょはまだ若わかいです。\n      \n      まだ若わかいですが、家族かぞくのためにお金かねを稼かせがなくてはいけません。\n      \n      そして「小説しょうせつを書かいてお金かねを稼かせごう！」と考かんがえて小説しょうせつを書かき始はじめます。\n      \n      彼女かのじょの書かいた作品さくひんは人気にんきが出でました。\n      \n      そして高たかく評価ひょうかされました。\n      \n      でも２４歳にじゅうよんさいの時ときに病気びょうきで亡なくなってしまいました。\n      \n      まだ若わかいです。\n      \n      とても若わかくで亡なくなりました。\n      \n      ３人目さんにんめ。\n      \n      １万円札いちまんえんさつに描えがかれているこの人ひとの名前なまえは、福沢諭吉ふくざわゆきちといいます。\n      \n      福沢諭吉ふくざわゆきちは江戸時代えどじだいに生うまれました。\n      \n      福沢諭吉ふくざわゆきちは貧まずしい家いえに生うまれましたが、彼かれもとても勉強べんきょう熱心ねっしんでした。\n      \n      一生懸命いっしょうけんめい勉強べんきょうしました。\n      \n      英語えいごやオランダ語おらんだごが上手じょうずでした。\n      \n      英語えいごやオランダ語おらんだごが堪能たんのうでした。\n      \n      実際じっさいにアメリカあめりかやヨーロッパよーろっぱに行いき、西洋せいようの文化ぶんかを日本にほんに伝つたえたり、本ほんを日本語にほんごに訳やくして、翻訳ほんやくして西洋せいようの考かんがえ方かたを日本にほんに広ひろめたりしました。\n      \n      東京とうきょうに慶応義塾大学けいおうぎじゅくだいがくという有名ゆうめいな大学だいがくがあります。\n      \n      とてもレベルれべるの高たかい大学だいがくです。\n      \n      その大学だいがくを作つくったのが福沢諭吉ふくざわゆきちです。\n      \n      彼かれは慶應義塾大学けいおうぎじゅくだいがくを作つくった人ひととして有名ゆうめいです。\n      \n      それから彼かれが書かいた「学問がくもんのすすめ」という本ほんも有名ゆうめいです。\n      \n      学問がくもんとは勉強べんきょうのことです。\n      \n      「勉強べんきょうは大切たいせつですよ。」と広ひろめた人ひとです。\n      \n      今日きょうは日本にほんのお札さつと、お札さつに描えがかれている人物じんぶつを紹介しょうかいしました。\n      \n      今日きょうはこれでおしまい。　\n      \n      またね！"
  },
  {
      title: "体 Body Parts",
      url: "https://cijapanese.com/body-parts/",
      level: "complete beginner",
      membership: "free",
      transcript: "これは人です。これは顔です。これは体です。今から体を描きます。\n\n      これは首です。首、首。\n      \n      これは肩です。肩、肩。\n      \n      これは腕です。腕、腕、腕、腕。\n      \n      これは手です。手、手。これは私の手です。右手、左手、両手。指です。１２３４５、指が５本あります。\n      \n      ここはお腹です。お腹、お腹。\n      \n      ここは足です。足、足。\n      \n      この人は女の人です。男の人じゃありません。この人は男の人です。女の人じゃありません。この人も男の人です。女の人じゃありません。\n      \n      この人は背が高いです。背が低くないです。この人も背が高いです。背が低くないです。この人は背が低いです。背が高くないです。\n      \n      この人は太っています。痩せていません。この人は痩せています。太っていません。この人も痩せています。太っていません。\n      \n      今日は体を描きました。今日はこれでおしまい。またね。",
      transcript_furigana: "これは　人ひとです。\n\n      これは　顔かおです。\n      \n      これは　体からだです。\n      \n      今いまから　体からだを　描かきます。\n      \n      これは　首くびです。　首くび　首くび\n      \n      これは　肩かたです。　肩かた　肩かた\n      \n      これは　腕うでです。　腕うで　腕うで　腕うで　腕うで\n      \n      これは　手てです。　手て　手て\n      \n      これは　私わたしの　手てです。\n      \n      右手みぎて　左手ひだりて　両手りょうて\n      \n      指ゆびです。\n      \n      １いち２に３さん４し５ご\n      \n      指ゆびが　５本ごほん　あります。\n      \n      ここは　お腹なかです。　お腹なか　お腹なか\n      \n      これは　足あしです。　足あし　足あし\n      \n      この人ひとは　女おんなの人ひとです。\n      \n      男おとこの人ひとじゃありません。\n      \n      この人ひとは　男おとこの人ひとです。\n      \n      女おんなの人ひとじゃありません。\n      \n      この人ひとも　男おとこの人ひとです。\n      \n      女おんなの人ひとじゃありません。\n      \n      この人ひとは　背せが　高たかいです。\n      \n      背せが　低ひくくないです。\n      \n      この人ひとも　背せが　高たかいです。\n      \n      背せが　低ひくくないです。\n      \n      この人ひとは　背せが　低ひくいです。\n      \n      背せが　高たかくないです。\n      \n      この人ひとは　太ふとっています。\n      \n      痩やせていません。\n      \n      この人ひとは　痩やせています。\n      \n      太ふとっていません。\n      \n      この人ひとも　痩やせています。\n      \n      太ふとっていません。\n      \n      今日きょうは　体からだを　描かきました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "こどもの日 Children’s Day",
      url: "https://cijapanese.com/childrens-day/",
      level: "beginner",
      membership: "free",
      transcript: "この子達は子供です。この人達は大人です。日本では毎年５月５日はこどもの日です。こどもの日には、子供たちの成長をお祝いします。それから、これからも元気に大きくなりますように、病気や事故がありませんようにとお願いします。\n\n      今は２０２１年の５月ですが、以前の動画で、前にアップした動画で、３月３日のひなまつりについて話しました。観ましたか？\n      \n      ひなまつりは女の子のための日です。５月５日は特に男の子のための日です。ひな祭りの動画では、雛人形という人形について話しました。今日の動画では、こどもの日に飾るものを紹介します。\n      \n      一つは鯉のぼりです。これは魚です。こいのぼりの鯉とは、魚の種類の一つです。これがこいのぼりです。黒や赤、青など、いろんな色のこいのぼりがあります。家の外に飾ったりベランダに飾ったりします。どうして鯉を飾るのでしょう。\n      \n      ここは中国です。中国の昔の話です。川があります。川がゆっくりゆっくり流れています。ここはとても早く流れています。流れが早いです。鯉が泳いでいます。鯉たちがこの流れの速い場所を登ろうとします。とても流れが速いので登るのが難しいです。\n      \n      でも、一生懸命頑張って登ります。この鯉は登ることができました。登れました。登ることができた鯉は、龍になれます。龍になって天に行くことができます。\n      \n      この中国の話しが日本に伝わりました。この鯉のように、大変なことを乗り越えられる強い男の子になりますように、たくましい男の子になりますように、強くたくましく成長しますようにと願って、こいのぼりをかざります。\n      \n      もう一つは鎧兜です。これは武士です。日本の昔の武士です。これは武士の鎧です。これは武士が頭にかぶる兜です。こどもの日の時に、家に鎧や兜を飾ります。どうして鎧や兜を飾るのでしょう。\n      \n      鎧や兜は武士の体を守ります。鎧や兜が身を守ってくれます。子供を病気や事故から守ってくださいと願って、鎧や兜を飾ります。\n      \n      私の家にも男の子がいます。息子がいます。うちにはこいのぼりはありません。こいのぼりは持っていません。ですが我が家には、かっこいい兜があります。これが私の息子の兜です。\n      \n      今日はこどもの日に飾る、こいのぼりと鎧兜を紹介しました。今日はこれでおしまい。またね！",
      transcript_furigana: "この子達こたちは　子供こどもです。\n\n      この人達ひとたちは　大人おとなです。\n      \n      日本にほんでは　毎年まいとし　５月５日ごがついつかは　こどもの日ひです。\n      \n      こどもの日ひには　子供達こどもたちの　成長せいちょうを　お祝いわいします。\n      \n      それから　これからも　元気げんきに　大おおきくなりますように　病気びょうきや　事故じこが　ありませんようにと　お願ねがいします。\n      \n      今いまは　２０２１年にせんにじゅういちねんの　５月ごがつですが　以前いぜんの　動画どうがで　前まえに　アップあっぷした　動画どうがで　３月３日さんがつみっかの　ひなまつりについて　話はなしました。\n      \n      観みましたか。\n      \n      ひなまつりは　女おんなの子このための日ひです。\n      \n      ５月５日ごがついつかは　特とくに　男おとこの子このための日ひです。\n      \n      ひなまつりの　動画どうがでは　雛人形ひなにんぎょうという　人形にんぎょうについて　話はなしました。\n      \n      今日きょうの　動画どうがでは　こどもの日ひに　飾かざるものを　紹介しょうかいします。\n      \n      一ひとつは　こいのぼりです。\n      \n      これは　魚さかなです。\n      \n      こいのぼりの　鯉こいとは　魚さかなの　種類しゅるいの　一ひとつです。\n      \n      これが　こいのぼりです。\n      \n      黒くろや　赤あか　青あおなど　いろんな色いろの　こいのぼりが　あります。\n      \n      家いえの　外そとに　飾かざったり　ベランダべらんだに　飾かざったりします。\n      \n      どうして　鯉こいを　飾かざるのでしょう。\n      \n      ここは　中国ちゅうごくです。\n      \n      中国ちゅうごくの　昔むかしの　話はなしです。\n      \n      川かわが　あります。\n      \n      川かわが　ゆっくり　ゆっくり　流ながれています。\n      \n      ここは　とても　速はやく　流ながれています。\n      \n      流ながれが　速はやいです。\n      \n      鯉こいが　泳およいでいます。\n      \n      鯉こいたちが　この　流ながれの　速はやい　場所ばしょを　登のぼろうとします。\n      \n      とても　流ながれが　速はやいので　登のぼるのが　難むずかしいです。\n      \n      でも　一生懸命いっしょうけんめい　頑張がんばって　登のぼります。\n      \n      この鯉こいは　登のぼることが　できました。\n      \n      登のぼれました。\n      \n      登のぼることが　できた　鯉こいは　龍りゅうに　なります。\n      \n      龍りゅうに　なって　天てんに　行いくことが　できます。\n      \n      この　中国ちゅうごくの　話はなしが　日本にほんに　伝つたわりました。\n      \n      この鯉こいのように　大変たいへんなことを　乗のり越こえられる　強つよい　男おとこの子こに　なりますように\n      \n      たくましい　男おとこの子こに　なりますように\n      \n      強つよく　たくましく　成長せいちょうしますようにと　願ねがって　こいのぼりを　飾かざります。\n      \n      もう一ひとつは　鎧兜よろいかぶとです。\n      \n      これは　武士ぶしです。\n      \n      日本にほんの　昔むかしの　武士ぶしです。\n      \n      これは　武士ぶしの　鎧よろいです。\n      \n      これは　武士ぶしが　頭あたまに　かぶる　兜かぶとです。\n      \n      こどもの日ひの時ときに　家いえに　鎧よろいや　兜かぶとを　飾かざります。\n      \n      どうして　鎧よろいや　兜かぶとを　飾かざるのでしょう。\n      \n      鎧よろいや　兜かぶとは　武士ぶしの　体からだを　守まもります。\n      \n      鎧よろいや　兜かぶとが　身みを　守まもってくれます。\n      \n      子供こどもを　病気びょうきや　事故じこから　守まもってくださいと　願ねがって　鎧よろいや　兜かぶとを　飾かざります。\n      \n      私わたしの　家いえにも　男おとこの子こが　います。\n      \n      息子むすこが　います。\n      \n      うちには　こいのぼりは　ありません。\n      \n      こいのぼりは　持もっていません。\n      \n      ですが　我わが家やには　かっこいい　兜かぶとが　あります。\n      \n      これが　私わたしの　息子むすこの　兜かぶとです。\n      \n      今日きょうは　こどもの日ひに　飾かざる　こいのぼりと　鎧兜よろいかぶとを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。　またね。"
  },
  {
      title: "魔の二歳児！？",
      url: "https://cijapanese.com/terrible-two/",
      level: "intermediate",
      membership: "free",
      transcript: "今回の中級の動画では、私の娘の話をしたいと思います。私の娘は今二歳です。今５月ですが、先月４月に誕生日を迎えて二歳になったばかりです。\n\n      皆さんの中に子供がいる方はいらっしゃいますか。子育ての経験がある方はいらっしゃいますか。英語でも”Terrible Twos”という言葉があるそうですが、日本でも二歳の子供は「魔の二歳児」と呼ばれたりします。”魔”の二歳児です。\n      \n      二歳児の子育てはけっこう大変です。「イヤイヤ期」という言葉があります。二歳になると、何でも「いや！」「いや！」と言うので、二歳は「イヤイヤ期」と言われています。\n      \n      娘もまさに今イヤイヤ来です。私が「ご飯食べるよ」と言うと「いや！」「お風呂入ろう」と行っても「いや！」「歯磨きするよ！」と言っても「いや！」いつもこんな感じです。\n      \n      そして時々「もう歯磨きしたもん！」と嘘をつくときもあります。唯一「おやつ食べようか！」といった時だけは、絶対に「いや」と言いません。嬉しそうに「食べる！」と言います。\n      \n      それから、こだわりが強くなるというのも二歳児の特徴です。例えば今、娘はピンクとリボンが大好きです。例えば私が黒い服を娘のために用意すると「これじゃない！」と言って来たがりません。ピンクが良い！リボンがいい！と言って自分のお気に入りの服ばかり着たがります。\n      \n      スプーンはなぜか絶対に銀色がいい！というこだわりがあります。私が娘の好きなピンクのスプーンを渡しても、なぜかスプーンだけはピンクではなくて銀色を使いたがります。\n      \n      そして靴にもこだわりがあります。毎日長靴を履きたがります。たとえ晴れていても、雨が降っていなくても、毎日「今日は長靴！」と言って長靴を履きたがります。とっても不思議です。\n      \n      それからもう一つ、何でも自分でやりたがるというのも二歳児の特徴です。娘は何でも「自分でする！」と言います。私が手伝って上げると怒ることもあります。例えばこの前、こんなことがありました。\n      \n      これは靴箱です。靴が並んでいます。私が娘の靴を靴箱から取って靴を履かせてあげると「自分でする！ママしないで！」と怒って、もう一回最初からやり直していました。わざわざ自分で靴を脱いで靴箱に戻して、もう一回取って履き直していました。\n      \n      こんな風に、ちょっと不思議で大変なこともある二歳児ですが、とっても可愛いし娘の行動。娘のすることをみていると、毎日面白いです。\n      \n      今日は二歳の娘の様子についてお話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "今回こんかいの中級ちゅうきゅうの動画どうがでは、私わたしの娘むすめの話はなしをしたいと思おもいます。\n\n      私わたしの娘むすめは今二歳いまにさいです。\n      \n      今５月いまごがつですが、先月４月せんげつしがつに誕生日たんじょうびを迎むかえて二歳にさいになったばかりです。\n      \n      皆みなさんの中なかに子供こどもがいる方かたはいらっしゃいますか？\n      \n      子育こそだての経験けいけんがある方かたはいらっしゃいますか？\n      \n      英語えいごでも”Terrible Twos”という言葉ことばがあるそうですが、日本にほんでも二歳にさいの子供こどもは「魔まの二歳児にさいじ」と呼よばれたりします。\n      \n      “魔ま“の二歳児にさいじです。\n      \n      二歳児にさいじの子育こそだては結構大変けっこうたいへんです。\n      \n      「イヤイヤ期き」という言葉ことばがあります。\n      \n      二歳にさいになると何なんでも「いや！」「いや！」と言いうので、二歳にさいは「イヤイヤ期き」と言いわれています。\n      \n      娘むすめもまさに今いまイヤイヤ期きです。\n      \n      私わたしが「ご飯はん食たべるよ」と言いうと「いや！」「お風呂ふろ入ろう」と言いっても「いや！」「歯磨はみがきするよ！」と言いっても「いや！」いつもこんな感かんじです。\n      \n      そして時々ときどき「もう歯磨はみがきしたもん！」と嘘うそをつくときもあります。\n      \n      唯一ゆいいつ「おやつ食たべようか！」と言いったときだけは、絶対ぜったいに「いや」と言いいません。\n      \n      嬉うれしそうに「食たべる！」と言いいます。\n      \n      それから、こだわりが強つよくなるというのも二歳児にさいじの特徴とくちょうです。\n      \n      例たとえば今いま娘むすめはピンクとリボンが大好だいすきです。\n      \n      例たとえば私わたしが黒くろい服ふくを娘むすめのために用意よういすると「これじゃない！」と言いって着きたがりません。\n      \n      ピンクがいい！リボンのがいい！と言いって自分じぶんのお気きに入いりの服ふくばかり着きたがります。\n      \n      スプーンはなぜか絶対ぜったいに銀色ぎんいろがいい！というこだわりがあります。\n      \n      私わたしが娘むすめの好すきなピンクのスプーンを渡わたしても、なぜかスプーンだけはピンクではなくて銀色ぎんいろを使つかいたがります。\n      \n      そして靴くつにもこだわりがあります。\n      \n      毎日まいにち長靴ながぐつを履はきたがります。\n      \n      たとえ晴はれていても雨あめが降ふっていなくても、毎日まいにち「今日きょうは長靴ながぐつ！」と言いって長靴ながぐつを履はきたがります。\n      \n      とっても不思議ふしぎです。\n      \n      それからもう一ひとつ、何なんでも自分じぶんでやりたがるというのも二歳児にさいじの特徴とくちょうです。\n      \n      娘むすめは何なんでも「自分じぶんでする！」と言いいます。\n      \n      私わたしが手伝てつだってあげると怒おこることもあります。\n      \n      例たとえばこの前まえこんなことがありました。\n      \n      これは靴箱くつばこです。靴くつが並ならんでいます。\n      \n      私わたしが娘むすめの靴くつを靴箱くつばこから取とって靴くつを履はかせてあげると「自分じぶんでする！ママまましないで！」と怒おこって、もう一回いっかい最初さいしょからやり直なおしていました。\n      \n      わざわざ自分じぶんで靴くつを脱ぬいで靴箱くつばこに戻もどして、もう一回いっかい取とって履はき直なおしていました。\n      \n      こんな風ふうにちょっと不思議ふしぎで大変たいへんなこともある二歳児にさいじですが、とっても可愛かわいいし娘むすめの行動こうどう、娘むすめのすることを見みていると毎日まいにち面白おもしろいです。\n      \n      今日きょうは二歳にさいの娘むすめの様子ようすについてお話はなししました。\n      \n      今日きょうはこれでおしまい。またね！"
  },
  {
      title: "天気 Weather",
      url: "https://cijapanese.com/weather/",
      level: "complete beginner",
      membership: "free",
      transcript: "晴れ、曇、雨、雪。今日は天気の話をします。\n\n      これは日本の地図です。ここは東京です。ここは大阪です。ここは北海道です。ここは福岡です。\n      \n      東京の天気はどうですか。雨ですか。いいえ、雨ではありません。東京は晴れです。天気が良いです。\n      \n      大阪の天気はどうですか。大阪は晴れですか。いいえ、大阪は晴れではありません。曇りです。\n      \n      北海道の天気はどうですか。北海道は曇りですか。いいえ、北海道は曇りではありません。北海道は雪です。雪が降っています。\n      \n      福岡の天気はどうですか。雪が降っていますか。いいえ、福岡は雪は降っていません。雨です。雨が降っています。天気が悪いです。\n      \n      晴れ、曇り、雨、雪。どの天気が好きですか。\n      \n      私は晴れが好きです。雨は好きじゃありません。\n      \n      今日は天気の話をしました。今日はこれでおしまい。またね！",
      transcript_furigana: "晴はれ　曇くもり　雨あめ　雪ゆき。\n\n      今日きょうは　天気てんきの　話はなしをします。\n      \n      これは　日本にほんの　地図ちずです。\n      \n      ここは　東京とうきょうです。\n      \n      ここは　大阪おおさかです。\n      \n      ここは　北海道ほっかいどうです。\n      \n      ここは　福岡ふくおかです。\n      \n      東京とうきょうの　天気てんきは　どうですか。\n      \n      雨あめですか。\n      \n      いいえ　雨あめではありません。\n      \n      東京とうきょうは　晴はれです。\n      \n      天気てんきが　良いいです。\n      \n      大阪おおさかの　天気てんきは　どうですか。\n      \n      大阪おおさかは　晴はれですか。\n      \n      いいえ　大阪おおさかは　晴れではありません。\n      \n      曇くもりです。\n      \n      北海道ほっかいどうの　天気てんきは　どうですか。\n      \n      北海道ほっかいどうは　曇くもりですか。\n      \n      いいえ　北海道ほっかいどうは　曇くもりではありません。\n      \n      北海道ほっかいどうは　雪です。\n      \n      雪ゆきが　降ふっています。\n      \n      福岡ふくおかの　天気てんきは　どうですか。\n      \n      雪ゆきが　降ふっていますか。\n      \n      いいえ　福岡ふくおかは　雪ゆきは　降ふっていません。\n      \n      雨あめです。\n      \n      雨あめが　降ふっています。\n      \n      天気てんきが　悪わるいです。\n      \n      晴はれ　曇くもり　雨あめ　雪ゆき。\n      \n      どの　天気てんきが　好すきですか。\n      \n      私わたしは　晴はれが　好すきです。\n      \n      雨あめは　好すきじゃありません。\n      \n      今日きょうは　天気てんきの　話はなしを　しました。\n      \n      今日きょうは　これで　おしまい。またね！"
  },
  {
      title: "コロナのワクチン COVID-19 Vaccine",
      url: "https://cijapanese.com/covid-19-vaccine/",
      level: "beginner",
      membership: "free",
      transcript: "これは注射です。病気のウイルスです。病気にならないように、病気を予防するために受ける注射のことを、ワクチンといいます。今２０２１年の５月です。最近、毎日コロナのワクチンのニュースを見たり聞いたりします。\n\n      日本でも２月にコロナのワクチン接種が始まりました。皆さんの国ではもう始まっていますか。コロナのワクチンをもう受けましたか。私はまだ受けていません。私はまだ受けられません。ワクチンを受けるには順番が決まっています。\n      \n      １番に受けられるのは、医者や看護師、薬剤師など、医療関係の仕事をしている人たちです。この人達はもうすでに２月からワクチンを受け始めています。\n      \n      私は医者ではありません。看護師でもありません。薬剤師でもありません。私はまだ受けられません。私の姉は看護師です。姉はもう２回受け終わったそうです。\n      \n      ２番めにワクチンを受けられるのは、高齢者です。高齢者とは、おじいさんおばあさんのことです。お年寄りです。\n      \n      日本では６５歳以上のお年寄りが、先にワクチンを受けられます。高齢者のワクチン接種は、４月から始まっています。私の父はちょうど６５歳です。なので父は先にワクチンを受けることができます。\n      \n      ３番めに受けられるのは、元々心臓や肺に病気がある人です。それから高齢者のための施設で働いている人、仕事をしている人です。\n      \n      それ以外の人たちは最後に受けます。私はいつワクチンが受けられるのかわかりません。\n      \n      ワクチンは１６歳以上の人が対象です。１６歳以上の人だけが受けられます。１６歳未満の子供たちは受けられません。対象ではありません。私は子供が二人います。二人共１６歳未満なので、受けることができません。\n      \n      今世界では、どれくらいの割合の人がワクチンを受け終わっているんでしょう。ちょっとネットで調べてみました。これは５月７日のデータです。ワクチン接種がすでに２回とも完了した人、受け終わった人の割合が世界で一番高いのは、どこの国だと思いますか。\n      \n      １番はイスラエルだそうです。イスラエルでは、なんともうすでに５８．５６％の人が受け終わっているそうです。約６０％です。\n      \n      ２番はどこの国だと思いますか。２番はUAEだそうです。３８．７９％の人がワクチンを完了しているそうです。約４０％です。\n      \n      日本では何％くらいの人が受け終わっていると思いますか。日本はなんとまだ０．８２％しか終わっていないそうです。１％も終わっていません。\n      \n      皆さんの国ではどうですか。今日はコロナのワクチンについてお話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "これは　注射ちゅうしゃです。\n\n      病気びょうきの　ウイルスういるすです。\n      \n      病気びょうきに　ならないように　病気びょうきを　予防よぼうするために　受うける　注射ちゅうしゃのことを　ワクチンわくちんと　いいます。\n      \n      今いま　２０２１年にせんにじゅういちねんの　５月ごがつです。\n      \n      最近さいきん　毎日まいにち　コロナころなの　ワクチンわくちんの　ニュースにゅーすを　見みたり　聞きいたり　します。\n      \n      日本にほんでも　２月にがつに　コロナころなの　ワクチンわくちん接種せっしゅが　始はじまりました。\n      \n      皆みなさんの　国くにでは　もう　始はじまっていますか。\n      \n      コロナころなの　ワクチンわくちんを　もう　受うけましたか。\n      \n      私わたしは　まだ　受うけていません。\n      \n      私わたしは　まだ　受うけられません。\n      \n      ワクチンわくちんを　受うけるには　順番じゅんばんが　決きまっています。\n      \n      １番いちばんに　受うけられるのは　医者いしゃや　看護師かんごし　薬剤師やくざいしなど　医療関係いりょうかんけいの　仕事しごとを　している　人ひとたちです。\n      \n      この人ひとたちは　もう　すでに　２月にがつから　ワクチンわくちんを　受うけ始はじめています。\n      \n      私わたしは　医者いしゃでは　ありません。\n      \n      看護師かんごしでも　ありません。\n      \n      薬剤師やくざいしでも　ありません。\n      \n      私わたしは　まだ　受うけられません。\n      \n      私わたしの　姉あねは　看護師かんごしです。\n      \n      姉あねは　もう　２回にかい　受うけ終おわったそうです。\n      \n      ２番目にばんめに　ワクチンわくちんを　受うけられるのは　高齢者こうれいしゃです。\n      \n      高齢者こうれいしゃとは　おじいさん　おばあさんのことです。\n      \n      お年寄としよりです。\n      \n      日本にほんでは　６５歳ろくじゅうごさい以上いじょうの　お年寄としよりが　先さきに　ワクチンわくちんを　受うけられます。\n      \n      高齢者こうれいしゃの　ワクチンわくちん接種せっしゅは　４月しがつから　始はじまっています。\n      \n      私わたしの　父ちちは　ちょうど　６５歳ろくじゅうごさいです。\n      \n      なので　父ちちは　先さきに　ワクチンわくちんを　受うけることが　できます。\n      \n      ３番目さんばんめに　受うけられるのは　元々もともと　心臓しんぞうや　肺はいに　病気びょうきが　ある人ひとです。\n      \n      それから　高齢者こうれいしゃのための　施設しせつで　働はたらいている人ひと　仕事しごとを　している人ひとです。\n      \n      それ　以外いがいの　人ひとたちは　最後さいごに　受うけます。\n      \n      私わたしは　いつ　ワクチンわくちんが　受うけられるのか　わかりません。\n      \n      ワクチンわくちんは　１６歳じゅうろくさい以上いじょうの　人ひとが　対象たいしょうです。\n      \n      １６歳じゅうろくさい以上いじょうの　人ひとだけが　受うけられます。\n      \n      １６歳じゅうろくさい未満みまんの　子供こどもたちは　受うけられません。\n      \n      対象たいしょうでは　ありません。\n      \n      私わたしは　子供こどもが　二人ふたり　います。\n      \n      二人共ふたりと　１６歳じゅうろくさい未満みまんなので　受うけることが　できません。\n      \n      今いま　世界せかいでは　どれくらいの　割合わりあいの　人ひとが　ワクチンわくちんを　受うけ終おわっているんでしょう。\n      \n      ちょっと　ネットねっとで　調しらべてみました。\n      \n      これは　５月７日ごがつなのかの　データでーたです。\n      \n      ワクチンわくちん接種せっしゅが　すでに　２回にかいとも　完了かんりょうした人ひと　受うけ終おわった人ひとの　割合わりあいが　世界せかいで　一番いちばん　高たかいのは　どこの　国くにだと　思おもいますか。\n      \n      １番いちばんは　イスラエルいすらえるだそうです。\n      \n      イスラエルいすらえるでは　なんと　もう　すでに　５８．５６％ごじゅうはってんごろくぱーせんとの　人ひとが　受うけ終おわっているそうです。\n      \n      約６０％やくろくじゅっぱーせんとです。\n      \n      ２番にばんは　どこの　国くにだと　思おもいますか。\n      \n      ２番にばんは　UAEゆーえーいーだそうです。\n      \n      ３８．７９%さんじゅうはってんななきゅうぱーせんとの　人ひとが　ワクチンわくちんを　完了かんりょうしているそうです。\n      \n      約４０％やくよんじゅっぱーせんとです。\n      \n      日本にほんでは　何％なんぱーせんとくらいの　人ひとが　受うけ終おわっていると　思おもいますか。\n      \n      日本にほんは　なんと　まだ　０．８２％れいてんはちにぱーせんとしか　終おわっていないそうです。\n      \n      １％いっぱーせんとも　終おわっていません。\n      \n      皆みなさんの　国くにでは　どうですか。\n      \n      今日きょうは　コロナころなの　ワクチンわくちんについて　お話はなししました。\n      \n      今日きょうは　これで　おしまい！　またね！"
  },
  {
      title: "“理解可能なインプット”とは？",
      url: "https://cijapanese.com/what-is-comprehensible-input/",
      level: "intermediate",
      membership: "free",
      transcript: "このチャンネルの名前は” Comprehensible Japanese”といいます。私は日本語を学んでいる皆さんに、日本語の”Comprehensible Input”つまり”理解可能なインプット”を提供するために動画を作っています。\n\n      今回の中級動画では”理解可能なインプット”とは何かについて解説したいと思います。\n      \n      スティーブンクラッシェンというアメリカ出身の有名な言語学者がいます。言語の研究をしている人がいます。彼が「言語を身につけるためには、理解可能なインプットが重要だ」と主張しています\n      \n      理解可能とは、理解できる、わかるという意味ですね。そしてインプットとは呼んだり聞いたりすることです。\n      \n      クラッシェン博士は「言語の”学習”と”習得”は違う」と言っています。\n      \n      学習とは、例えば文法のルールを学んだり単語を暗記したりと、頭を使って意識的に勉強することです。\n      \n      一方習得とは、例えば日本人の子供が日本語を身につける時のように、たくさんたくさん聞いてインプットをして、意識的に勉強してではなく、自然に身につけることです。そしてクラッシェン博士はこちらが重要だと言っています。\n      \n      言語学者の中には、これは小さな子供だけができることで、大人にはできない。大人には無理だと言う人もいます。ですがクラッシェン博士はこの”理解可能なインプット”をたくさんすれば、大人にもできると言っています。\n      \n      つまり自分が理解できるレベルのものを大量に呼んだり聞いたりすれば、大人でも子供と同じように、意識的な勉強ではなく自然に外国語を身につけられると主張しています。\n      \n      理解可能と言っても１００％全ての単語や文法が分かる必要はありません。１００％ではなくて、ほぼ理解できるというのが大切です。\n      \n      これは日本語を勉強中のジョンさんです。例えば私が「昨日電車で学校に行きました。」と言ったとします。ジョンさんは、昨日、で、学校、に　行きました。この部分はすでにもう分かります。もう習得しているとします。\n      \n      “電車”という単語だけが分かりません。分からなかったとします。そこで私が電車の絵を書いて「昨日電車で学校に行きました。」と言います。そうすると、ジョンさんは全体の意味が理解できますね。そして知らなかった”電車”という単語が新たに習得されます。\n      \n      殆どの部分は理解できる、もう習得しているけれど、少しだけ、一部分だけまだ習得していない単語や文法が含まれた文を、たくさん、大量に繰り返し呼んだり聞いたりすることで、ちょっとずつちょっとずつ言葉が身についていきます。\n      \n      クラッシェン博士はこれを” i + 1 “と呼んでいます。例えばジョンさんの今の日本語力、現在の日本語レベルがこれくらいだとします。今現在の日本語力を”i”とします。\n      \n      今の自分の日本語力+1つまりi+1のインプットを大量にすると、この+1の部分が習得されます。そしてまた更にその+1のレベルのものをたくさん読んだり聞いたりすることで、少しずつ少しずつ身についていきます。これが”理解可能なインプット”による言語習得です。\n      \n      もう一つ重要なのは、自分にとって面白いもの、興味があるものをたくさん読んだり聞いたりするということです。面白くないもの、つまらないものや興味のないものではあまり効果がありません。\n      \n      “外国語”ということを忘れてしまうくらい、楽しめるものを読んだり聞いたりすることが大切だとクラッシェン博士は言っています。\n      \n      私もクラッシェン博士の主張に賛成です。大賛成です。なので今こうして理解可能な日本語の動画を作って皆さんに提供しています。皆さんが理解できるように、私はゆっくりはっきり話したり、絵を描いたり、ジェスチャーをしたり、難しい言葉は簡単な言葉に言い換えたりしています。\n      \n      これからも皆さんにとって理解可能な日本語のコンテンツをたくさん作るので、楽しみにしていてください。\n      \n      今日は理解可能なインプットとは何かについて説明しました。今日はこれでおしまい。またね！",
      transcript_furigana: "このチャンネルの名前なまえは”Comprehensible Japanese”と　いいます。\n\n      私わたしは日本語にほんごを学まなんでいる皆みなさんに、日本語にほんごの”Comprehensible Input”つまり”理解可能りかいかのうなインプット”を提供ていきょうするために動画どうがを作つくっています。\n      \n      今回こんかいの中級動画ちゅうきゅうどうがでは”理解可能りかいかのうなインプット”とは何なにかについて解説かいせつしたいと思おもいます。\n      \n      スティーブンクラッシェンというアメリカ出身しゅっしんの有名ゆうめいな言語学者げんごがくしゃがいます。\n      \n      言語げんごの研究けんきゅうをしている人ひとです。\n      \n      彼かれが「言語げんごを身みにつけるためには理解可能りかいかのうなインプットが重要じゅうようだ」と主張しゅちょうしています。\n      \n      理解可能りかいかのうとは理解りかいできる、わかるという意味いみですね。\n      \n      そしてインプットとは読よんだり聞きいたりすることです。\n      \n      クラッシェン博士はかせは「言語げんごの”学習がくしゅう“と”習得しゅうとく“は違ちがう」と言いっています。\n      \n      学習がくしゅうとは、例たとえば文法ぶんぽうのルールを学まなんだり単語たんごを暗記あんきしたりと、頭あたまを使つかって意識的いしきてきに勉強べんきょうすることです。\n      \n      一方いっぽう習得しゅうとくとは、例たとえば日本人にほんじんの子供こどもが日本語にほんごを身みにつける時ときのように、たくさんたくさん聞きいてインプットをして、意識的いしきてきに勉強べんきょうしてではなく、自然しぜんに身みにつけることです。\n      \n      そしてクラッシェン博士はかせはこちらが重要じゅうようだと言いっています。\n      \n      言語学者げんごがくしゃの中なかには、これは小ちいさな子供こどもだけができることで、大人おとなにはできない、大人おとなには無理むりだと言いう人ひともいます。\n      \n      ですがクラッシェン博士はかせはこの”理解可能りかいかのうなインプット”をたくさんすれば、大人おとなにもできると言いっています。\n      \n      つまり自分じぶんが理解りかいできるレベルのものを大量たいりょうに読よんだり聞きいたりすれば、大人おとなでも子供こどもと同じように、意識的いしきてきな勉強べんきょうではなく自然しぜんに外国語がいこくごを身みにつけられると主張しゅちょうしています。\n      \n      理解可能りかいかのうといっても１００％ひゃくぱーせんと全すべての単語たんごや文法ぶんぽうがわかる必要ひつようはありません。\n      \n      １００％ひゃくぱーせんとではなくて、ほぼ理解りかいできるというのが大切たいせつです。\n      \n      これは日本語にほんごを勉強中べんきょうちゅうのジョンさんです。\n      \n      例たとえば私わたしが「昨日きのう電車でんしゃで学校がっこうに行いきました。」と言いったとします。\n      \n      ジョンさんは、昨日きのう、で、学校がっこう、に、行いきました。\n      \n      この部分ぶぶんはすでにもう分わかります。\n      \n      もう習得しゅうとくしているとします。\n      \n      “電車でんしゃ“という単語たんごだけが分わかりません。\n      \n      分わからなかったとします。\n      \n      そこで私わたしが電車でんしゃの絵えを描かいて「昨日きのう電車でんしゃで学校がっこうに行いきました。」と言いいます。\n      \n      そうすると、ジョンさんは全体ぜんたいの意味いみが理解りかいできますね。\n      \n      そして知しらなかった”電車でんしゃ“という単語たんごが新あらたに習得しゅうとくされます。\n      \n      ほとんどの部分ぶぶんは理解りかいできる、もう習得しゅうとくしているけれど、少すこしだけ、一部分いちぶぶんだけ、まだ習得しゅうとくしていない単語たんごや文法ぶんぽうが含ふくまれた文ぶんを、たくさん、大量たいりょうに繰くり返かえし読よんだり聞きいたりすることで、ちょっとずつちょっとずつ言葉ことばが身みについていきます。\n      \n      クラッシェン博士はかせはこれを”i+1あいぷらすわん“と呼よんでいます。\n      \n      例たとえばジョンさんの今いまの日本語力にほんごりょく、現在げんざいの日本語にほんごレベルがこれくらいだとします。\n      \n      今現在いまげんざいの日本語力にほんごりょくを”iあい“とします。\n      \n      今いまの自分じぶんの日本語力にほんごりょく+1ぷらすいち、つまりi+1のインプットを大量たいりょうにすると、この+1の部分ぶぶんが習得しゅうとくされます。\n      \n      そしてまた更さらにその+1のレベルのものをたくさん読よんだり聞きいたりすることで、少すこしずつ 少すこしずつ身みについていきます。\n      \n      これが、”理解可能りかいかのうなインプット”による言語習得げんごしゅうとくです。\n      \n      もう一ひとつ重要じゅうようなのは、自分じぶんにとって面白おもしろいもの、興味きょうみがあるものをたくさん読よんだり聞きいたりするということです。\n      \n      面白おもしろくないもの、つまらないものや興味きょうみのないものではあまり効果こうかがありません。\n      \n      “外国語がいこくご“ということを忘わすれてしまうくらい、楽たのしめるものを読よんだり聞きいたりすることが大切たいせつだとクラッシェン博士はかせは言いっています。\n      \n      私わたしもクラッシェン博士はかせの主張しゅちょうに賛成さんせいです。大賛成だいさんせいです。\n      \n      なので今いまこうして理解可能りかいかのうな日本語にほんごの動画どうがを作つくって皆みなさんに提供ていきょうしています。\n      \n      皆みなさんが理解りかいできるように、私わたしはゆっくりはっきり話はなしたり、絵えを描かいたり、ジェスチャーをしたり、難むずかしい言葉ことばは簡単かんたんな言葉ことばに言いい換かえたりしています。\n      \n      これからも皆みなさんにとって理解可能りかいかのうな日本語にほんごのコンテンツをたくさん作つくるので、楽たのしみにしていてください。\n      \n      今日きょうは理解可能りかいかのうなインプットとは何なにかについて説明せつめいしました。\n      \n      今日きょうはこれでおしまい。またね！"
  },
  {
      title: "私の家族 My Family",
      url: "https://cijapanese.com/my-family/",
      level: "complete beginner",
      membership: "free",
      transcript: "これは私です。私の名前は有紀といいます。今日は私の家族を紹介します。\n\n      これは私の夫です。私たちは夫婦です。私と夫、私たちには子供がいます。子供が二人います。一人は男の子です。もう一人は女の子です。\n      \n      私の息子です。私の娘です。息子は６歳です。娘は２歳です。二人は兄弟です。\n      \n      これは私の父です。私のお父さんです。これは夫のお父さんです。これは私の母です。お母さんです。これは夫のお母さんです。二人は夫婦です。二人は夫婦です。\n      \n      子供たちのおじいちゃんです。子供たちのおじいちゃんです。子供たちのおばあちゃんです。子供たちのおばあちゃんです。\n      \n      夫の兄弟です。私の兄弟です。夫は兄弟が二人います。私は兄弟が一人います。私の姉です。お姉さんです。夫の妹です。夫の弟です。\n      \n      私の姉には子供がいます。子供が一人います。男の子です。８歳です。夫の妹には子供がいません。夫の弟には子供がいます。子供が二人います。二人共女の子です。５歳と３歳です。二人は兄弟です。\n      \n      これは犬です。猫です。鳥です。ペットです。これは家です。私の父と母の家にはペットがいます。犬がいます。私たちの家にはペットはいません。夫のお父さんとお母さんの家にもペットはいません。\n      \n      今日は私の家族を紹介しました。今日はこれでおしまい。またね！",
      transcript_furigana: "これは　私わたしです。\n\n      私わたしの　名前なまえは　有紀ゆきと　いいます。\n      \n      今日きょうは　私わたしの　家族かぞくを　紹介しょうかいします。\n      \n      これは　私わたしの　夫おっとです。\n      \n      私わたしたちは　夫婦ふうふです。\n      \n      私わたしと　夫おっと　私わたしたちには　子供こどもが　います。\n      \n      子供こどもが　二人ふたり　います。\n      \n      一人ひとりは　男おとこの子こです。\n      \n      もう　一人ひとりは　女おんなの子こです。\n      \n      私わたしの　息子むすこです。\n      \n      私わたしの　娘むすめです。\n      \n      息子むすこは　６歳ろくさいです。\n      \n      娘むすめは　２歳にさいです。\n      \n      二人ふたりは　兄弟きょうだいです。\n      \n      これは　私わたしの　父ちちです。　お父とうさんです。\n      \n      これは　夫おっとの　お父とうさんです。\n      \n      これは　私わたしの　母ははです。　お母かあさんです。\n      \n      これは　夫おっとの　お母かあさんです。\n      \n      二人ふたりは　夫婦ふうふです。　二人ふたりは　夫婦ふうふです。\n      \n      子供こどもたちの　おじいちゃんです。\n      \n      子供こどもたちの　おじいちゃんです。\n      \n      子供こどもたちの　おばあちゃんです。\n      \n      子供こどもたちの　おばあちゃんです。\n      \n      夫おっとの　兄弟きょうだいです。\n      \n      私わたしの　兄弟きょうだいです。\n      \n      夫おっとは　兄弟きょうだいが　二人ふたりいます。\n      \n      私わたしは　兄弟きょうだいが　一人ひとりいます。\n      \n      私わたしの　姉あねです。お姉ねえさんです。\n      \n      夫おっとの　妹いもうとです。　夫おっとの　弟おとうとです。\n      \n      私わたしの　姉あねには　子供こどもが　います。\n      \n      子供こどもが　一人ひとり　います。\n      \n      男おとこの子こです。８歳はっさいです。\n      \n      夫おっとの　妹いもうとには　子供こどもが　いません。\n      \n      夫おっとの　弟おとうとには　子供こどもが　います。\n      \n      子供こどもが　二人ふたりいます。\n      \n      二人ふたり共とも　女おんなの子こです。\n      \n      ５歳ごさいと　３歳さんさいです。\n      \n      二人ふたりは　兄弟きょうだいです。\n      \n      これは　犬いぬです。　猫ねこです。　鳥とりです。　ペットぺっとです。\n      \n      これは　家いえです。\n      \n      私わたしの　父と　母の　家いえには　ペットぺっとが　います。　\n      \n      犬いぬが　います。\n      \n      私わたしたちの　家いえには　ペットぺっとは　いません。\n      \n      夫おっとの　お父とうさんと　お母かあさんの　家いえにも　ペットぺっとは　いません。\n      \n      今日きょうは　私わたしの　家族かぞくを　紹介しょうかいしました。\n      \n      今日きょうは　これで　おしまい。　またね！"
  },
  {
      title: "ヒヤッとした出来事",
      url: "https://cijapanese.com/things-that-scare-me/",
      level: "intermediate",
      membership: "free",
      transcript: "今日のテーマは「ヒヤッとした出来事」です。「ヒヤッとする」とか「ヒヤヒヤする」という言葉を聞いたことはありますか。\n\n      例えばこんな風に、恐怖や心配や不安で心臓がドキッとする気持ちのことを「ヒヤッとする」とか「ヒヤヒヤする」と言います。\n      \n      皆さん、最近ヒヤッとする出来事はありましたか。私はしょっちゅうあります。よくあります。\n      \n      例えば、これは私の後ろ姿です。ここにポケットがあります。\n      \n      私はよくお尻のポケットにスマホを入れているんですが、スマホをポケットに入れたままトイレに座ろうとして、スマホをトイレに落としそうになることがよくあります。\n      \n      スマホをトイレに落としそうになってヒヤッとすることが、しょっちゅうあります。\n      \n      もし落としてしまったら濡れて故障してしまうので大変ですね。壊れてしまったら大変です。なので落としそうになった時にヒヤッとします。\n      \n      あともう一つ、よくあるのは、車を運転しているときです。以前「運転」というタイトルの初級の動画でも話した通り、私は運転がが大の苦手です。下手です。\n      \n      なので特に狭い道を運転しているときや、狭い駐車場に車を停めないといけないときは、他の車にぶつけてしまいそうで怖いです。いつもヒヤヒヤしながら運転しています。\n      \n      それからこれはもう今からもう１５年ほど前の話なんですが、私が二十歳の時、大学生の時の出来事です。オーストラリアに留学していたときの出来事です。\n      \n      その日は英語のテストの日でした。私にとってとても大事な英語のテストを受ける日でした。\n      \n      もしもそのテストでいいスコアが取れたら、オーストラリアで大学の授業が受けられる、でももしもスコアが悪かったら大学の授業が受けられなくなる、という私にとってとっても大事なテストの日でした。\n      \n      そんな重要なテストの日なのに、重要なテストの日にも関わらず、私は寝坊してしまいました。朝起きられませんでした。幸い、同じシェアハウスに住んでいたマレーシア人の友人が私が寝坊していることに気づいて起こしてくれました。\n      \n      目が覚めて時計を見たらびっくりです。時間がない！とヒヤヒヤしながら走って試験会場に行きました。なんとかギリギリ間に合って試験を受けることができました。\n      \n      あとは、私は今小さい子供が二人いるので、ヒヤヒヤする出来事は本当に多いです。子供が危険な目に合いそうになって、危ない目に合いそうになってヒヤッとすることがよくあります。\n      \n      例えば子供が高い場所から落ちそうになったり、階段から落ちそうになったり、転んで怪我をしそうになったりしてヒヤッとすることがたくさんあります。\n      \n      私が最近一番ヒヤッとした出来事をお話します。去年の出来事です。子供たちと一緒に公園にいました。息子は友達と一緒に遊んでいました。私は娘と遊びながら、子供の友達のお母さんと話をしていました。お喋りしていました。\n      \n      私が一瞬娘から目を離したすきに、娘が一人で公園から出ようとしていました。道路に出ようとしていました。私は「危ない！」と思って急いで走って娘のところに行こうとしました。\n      \n      でも焦りすぎて、なんと私が転んでしまいました。娘はもう出口まで歩いて行っています。しかもそこに車が来ていました。\n      \n      娘が車にひかれてしまいそうと思ってヒヤヒヤしていると、たまたま娘のそばにいた人が気づいて娘を止めてくれました。\n      \n      私は「あぁ良かった〜」とホッとしました。安心しました。そして、ほんの一瞬でも娘から目を離しちゃいけないなと反省しました。\n      \n      今日は私がヒヤッとした出来事、ヒヤヒヤした出来事を色々お話しました。皆さんは最近どんなことでヒヤッとしましたか。今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうのテーマは「ヒヤッとした出来事できごと」です。\n\n      「ヒヤッとする」とか「ヒヤヒヤする」という言葉ことばを聞きいたことはありますか。\n      \n      例たとえばこんな風ふうに、恐怖きょうふや心配しんぱいや不安ふあんで心臓しんぞうがドキッとする気持きもちのことを「ヒヤッとする」とか「ヒヤヒヤする」と言いいます。\n      \n      皆みなさん、最近さいきんヒヤッとする出来事できごとはありましたか。\n      \n      私わたしはしょっちゅうあります。\n      \n      よくあります。\n      \n      例たとえば、これは私わたしの後うしろ姿すがたです。\n      \n      ここにポケットがあります。\n      \n      私わたしはよくお尻しりのポケットにスマホを入いれているんですが、スマホをポケットに入いれたままトイレに座すわろうとして、スマホをトイレに落おとしそうになることがよくあります。\n      \n      スマホをトイレに落おとしそうになってヒヤッとすることが、しょっちゅうあります。\n      \n      もし落おとしてしまったら濡ぬれて故障こしょうしてしまうので大変たいへんですね。\n      \n      壊こわれてしまったら大変たいへんです。\n      \n      なので落おとしそうになった時ときにヒヤッとします。\n      \n      あともう一ひとつ、よくあるのは、車くるまを運転うんてんしているときです。\n      \n      以前いぜん「運転うんてん」というタイトルの初級しょきゅうの動画どうがでも話はなした通とおり、私わたしは運転うんてんが大だいの苦手にがてです。\n      \n      下手へたです。\n      \n      なので特とくに狭せまい道みちを運転うんてんしているときや、狭せまい駐車場ちゅうしゃじょうに車くるまを停とめないといけないときは、他ほかの車くるまにぶつけてしまいそうで怖こわいです。\n      \n      いつもヒヤヒヤしながら運転うんてんしています。\n      \n      それからこれはもう今いまからもう１５年じゅうごねんほど前まえの話はなしなんですが、私わたしが二十歳はたちの時とき、大学生だいがくせいの時ときの出来事できごとです。\n      \n      オーストラリアに留学りゅうがくしていたときの出来事できごとです。\n      \n      その日ひは英語えいごのテストの日ひでした。\n      \n      私わたしにとってとても大事だいじな英語えいごのテストを受うける日ひでした。\n      \n      もしもそのテストでいいスコアが取とれたら、オーストラリアで大学だいがくの授業じゅぎょうが受うけられる、でももしもスコアが悪わるかったら大学だいがくの授業じゅぎょうが受うけられなくなる、という私わたしにとってとっても大事だいじなテストの日ひでした。\n      \n      そんな重要じゅうようなテストの日ひなのに、重要じゅうようなテストの日ひにも関かかわらず、私わたしは寝坊ねぼうしてしまいました。\n      \n      朝あさ起おきられませんでした。\n      \n      幸さいわい、同おなじシェアハウスに住すんでいたマレーシア人じんの友人ゆうじんが私わたしが寝坊ねぼうしていることに気きづいて起おこしてくれました。\n      \n      目めが覚さめて時計とけいを見みたらびっくりです。\n      \n      時間じかんがない！とヒヤヒヤしながら走はしって試験会場しけんかいじょうに行いきました。\n      \n      なんとかギリギリ間まに合あって試験しけんを受うけることができました。\n      \n      あとは、私わたしは今いま小ちいさい子供こどもが二人ふたりいるので、ヒヤヒヤする出来事できごとは本当ほんとうに多おおいです。\n      \n      子供こどもが危険きけんな目めに合あいそうになって、危あぶない目めに合あいそうになってヒヤッとすることがよくあります。\n      \n      例たとえば子供こどもが高たかい場所ばしょから落おちそうになったり、階段かいだんから落おちそうになったり、転ころんで怪我けがをしそうになったりしてヒヤッとすることがたくさんあります。\n      \n      私わたしが最近さいきん一番いちばんヒヤッとした出来事できごとをお話はなしします。\n      \n      去年きょねんの出来事できごとです。\n      \n      子供達こどもたちと一緒いっしょに公園こうえんにいました。\n      \n      息子むすこは友達ともだちと一緒いっしょに遊あそんでいました。\n      \n      私わたしは娘むすめと遊あそびながら、子供こどもの友達ともだちのお母かあさんと話はなしをしていました。\n      \n      お喋しゃべりしていました。\n      \n      私わたしが一瞬いっしゅん娘むすめから目めを離はなしたすきに、娘むすめが一人ひとりで公園こうえんから出でようとしていました。\n      \n      道路どうろに出でようとしていました。\n      \n      私わたしは「危あぶない！」と思おもって急いそいで走はしって娘むすめのところに行いこうとしました。\n      \n      でも焦あせりすぎて、なんと私わたしが転ころんでしまいました。\n      \n      娘むすめはもう出口でぐちまで歩あるいて行いっています。\n      \n      しかもそこに車くるまが来きていました。\n      \n      娘むすめが車くるまにひかれてしまいそうと思おもってヒヤヒヤしていると、たまたま娘むすめのそばにいた人ひとが気きづいて娘むすめを止とめてくれました。\n      \n      私わたしは「あぁ良よかった〜」とホッとしました。\n      \n      安心あんしんしました。\n      \n      そして、ほんの一瞬いっしゅんでも娘むすめから目めを離はなしちゃいけないなと反省はんせいしました。\n      \n      今日きょうは私わたしがヒヤッとした出来事できごと、ヒヤヒヤした出来事できごとを色々いろいろお話はなししました。\n      \n      皆みなさんは最近さいきんどんなことでヒヤっとしましたか。\n      \n      今日きょうはこれでおしまい。またね！"
  },
  {
      title: "どこに行く？ Where Are They Going?",
      url: "https://cijapanese.com/where-are-they-going/",
      level: "complete beginner",
      membership: "free",
      transcript: "ここは学校です。ここは病院です。ここは郵便局です。ここはレストランです。ここは公園です。\n\n      人がいます。１２３４５。一人。二人、三人、四人、五人。人が五人います。\n      \n      大人です。大人。大人。子供です。子供。大人が三人います。子供が二人います。\n      \n      これは手紙です。この人は手紙を持っています。手紙を持ってどこに行きますか。病院に行きますか。それとも郵便局に行きますか。この人は郵便局に行きます。\n      \n      この人を見てください。マスクをしています。風邪をひいています。この人はどこに行きますか。公園に行きますか。いいえ、公園には行きません。病院に行きます。\n      \n      この人を見てください。お腹が空いています。何か食べたいです。この人はどこに行きますか。病院に行きますか。いいえ、病院には行きません。レストランに行きます。\n      \n      これはボールです。この子はボールを持っています。ボールを持ってどこに行きますか。レストランに行きますか。それとも公園に行きますか。公園に行きます。\n      \n      これは教科書です。これは鉛筆です。この子は教科書と鉛筆を持っています。教科書と鉛筆を持ってどこに行きますか。学校に行きます。\n      \n      これは私です。私の家です。今日私はどこにも行きません。家にいます。皆さんは今日どこに行きますか。今日はこれでおしまい。またね！",
      transcript_furigana: "ここは　学校がっこうです。\n\n      ここは　病院びょういんです。\n      \n      ここは　郵便局ゆうびんきょくです。\n      \n      ここは　レストランれすとらんです。\n      \n      ここは　公園こうえんです。\n      \n      人ひとが　います。１いち２に３さん４し５ご\n      \n      １人ひとり、２人ふたり、３人さんにん、４人よにん、５人ごにん\n      \n      人ひとが　５人ごにん　います。\n      \n      大人おとなです。大人おとな。大人おとな。\n      \n      子供こどもです。子供こども。\n      \n      大人おとなが　３人さんにん　います。\n      \n      子供こどもが　２人ふたりいます。\n      \n      これは　手紙てがみです。\n      \n      この人ひとは　手紙てがみを　持もっています。\n      \n      手紙てがみを　持もって　どこに　行いきますか。\n      \n      病院びょういんに　行いきますか。\n      \n      それとも　郵便局ゆうびんきょくに　行いきますか。\n      \n      この人ひとは　郵便局ゆうびんきょくに　行いきます。\n      \n      この人ひとを　見みてください。\n      \n      マスクますくを　しています。\n      \n      風邪かぜを　ひいています。\n      \n      この人ひとは　どこに　行いきますか。\n      \n      公園こうえんに　行いきますか。\n      \n      いいえ　公園こうえんには　行いきません。\n      \n      病院びょういんに　行いきます。\n      \n      この人ひとを　見みてください。\n      \n      お腹なかが　空すいています。\n      \n      何なにか　食たべたいです。\n      \n      この人ひとは　どこに　行いきますか。\n      \n      病院びょういんに　行いきますか。\n      \n      いいえ　病院びょういんには　行いきません。\n      \n      レストランれすとらんに　行いきます。\n      \n      これは　ボールぼーるです。\n      \n      この子こは　ボールぼーるを　持もっています。\n      \n      ボールぼーるを　持もって　どこに　行いきますか。\n      \n      レストランれすとらんに　行いきますか。\n      \n      それとも　公園こうえんに　行いきますか。\n      \n      公園こうえんに　行いきます。\n      \n      これは　教科書きょうかしょです。\n      \n      これは　鉛筆えんぴつです。\n      \n      この子こは　教科書きょうかしょと　鉛筆えんぴつを　持もっています。\n      \n      教科書きょうかしょと　鉛筆えんぴつを　持もって　どこに　行いきますか。\n      \n      学校がっこうに　行いきます。\n      \n      これは　私わたしです。\n      \n      私わたしの　家いえです。\n      \n      今日きょう　私わたしは　どこにも　行いきません。\n      \n      家いえに　います。\n      \n      皆みなさんは　今日きょう　どこに　行いきますか。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "なぜ日本語を勉強するの？ Why Do You Learn Japanese?",
      url: "https://cijapanese.com/why-do-you-learn-japanese/",
      level: "beginner",
      membership: "free",
      transcript: "皆さんは今日本語を勉強していますね。私は韓国語を勉強しています。少しだけ韓国語を勉強しています。\n\n      私は韓国のドラマが好きです。韓国ドラマを観るのが好きです。だから韓国語の勉強を始めました。韓国ドラマがきっかけで韓国語の勉強を始めました。\n      \n      皆さんはどうですか。何がきっかけで日本語の勉強を始めましたか。日本語に興味を持ったきっかけは何ですか。\n      \n      例えば、日本のアニメや漫画やゲームが好きだからですか。それとも神社やお寺など日本の建物に興味があるからですか。日本の歴史に興味があるからですか。日本の音楽が好きだからですか。日本人の友達がいるからですか。\n      \n      私は韓国語学習の目標があります。韓国ドラマを字幕無しで観れるようになりたいです。これが私の目標です。\n      \n      もう一つ目標があります。私は今までに2回韓国に旅行に行ったことがあります。いつかまた行きたいです。そして次に韓国に行くときは、韓国語で話してみたいです。これも私の目標です。\n      \n      皆さんの日本語学習の目標は何ですか。日本のアニメを日本語で見れるようになることですか。字幕無しで観れるようになることですか。日本の漫画を日本語で読めるようになることですか。\n      \n      日本人の友達と日本語で話せるようになることですか。日本に留学することですか。日本に旅行することですか。日本で働くことですか。\n      \n      目標を持つことはとても大切です。日本語を勉強し始めたきっかけ、そして日本語学習の目標は何ですか。ぜひ教えて下さい。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "皆みなさんは　今いま　日本語にほんごを　勉強べんきょうしていますね。\n\n      私わたしは　韓国語かんこくごを　勉強べんきょうしています。\n      \n      少すこしだけ　韓国語かんこくごを　勉強べんきょうしています。\n      \n      私わたしは　韓国かんこくの　ドラマどらまが　好すきです。\n      \n      韓国かんこくドラマどらまを　観みるのが　好すきです。\n      \n      だから　韓国語かんこくごの　勉強べんきょうを　始はじめました。\n      \n      韓国かんこくドラマどらまが　きっかけで　韓国語かんこくごの　勉強べんきょうを　始はじめました。\n      \n      皆みなさんは　どうですか。\n      \n      何なにが　きっかけで　日本語にほんごの　勉強べんきょうを　始はじめましたか。\n      \n      日本語にほんごに　興味きょうみを　持もった　きっかけは　何なんですか。\n      \n      例たとえば　日本にほんの　アニメあにめや　漫画まんがや　ゲームげーむが　好すきだからですか。\n      \n      それとも　神社じんじゃや　お寺てらなど　日本にほんの　建物たてものに　興味きょうみがあるからですか。\n      \n      日本にほんの　歴史れきしに　興味きょうみがあるからですか。\n      \n      日本にほんの　音楽おんがくが　好すきだからですか？\n      \n      日本人にほんじんの　友達ともだちが　いるからですか。\n      \n      私わたしは　韓国語学習かんこくごがくしゅうの　目標もくひょうが　あります。\n      \n      韓国かんこくドラマどらまを　字幕無じまくなしで　観みれるように　なりたいです。\n      \n      これが　私わたしの　目標もくひょうです。\n      \n      もう一ひとつ　目標もくひょうが　あります。\n      \n      私わたしは　今いままでに　２回にかい　韓国かんこくに　旅行りょこうに　行いったことが　あります。\n      \n      いつか　また　行いきたいです。\n      \n      そして　次つぎに　韓国かんこくに　行いくときは　韓国語かんこくごで　話はなしてみたいです。\n      \n      これも　私わたしの　目標もくひょうです。\n      \n      皆みなさんの　日本語学習にほんごがくしゅうの　目標もくひょうは　何なんですか。\n      \n      日本にほんの　アニメあにめを　日本語にほんごで　観みれるように　なることですか。\n      \n      字幕無じまくなしで　観みれるように　なることですか。\n      \n      日本にほんの　漫画まんがを　日本語にほんごで　読よめるように　なることですか。\n      \n      日本人にほんじんの　友達ともだちと　日本語にほんごで　話はなせるように　なることですか。\n      \n      日本にほんに　留学りゅうがくすることですか。\n      \n      日本にほんに　旅行りょこうすることですか。\n      \n      日本にほんで　働はたらくことですか。\n      \n      目標もくひょうを　持もつことは　とても　大切たいせつです。\n      \n      日本語にほんごを　勉強べんきょうし始はじめた　きっかけ、　そして　日本語学習にほんごがくしゅうの　目標もくひょうは　何なんですか。\n      \n      ぜひ　教おしえて下ください。\n      \n      今日きょうは　これで　おしまい。またね！"
  },
  {
      title: "福岡の名物 Fukuoka’s Local Specialties",
      url: "https://cijapanese.com/fukuokas-local-specialties/",
      level: "intermediate",
      membership: "free",
      transcript: "私は日本の福岡という街に住んでいます。日本には北海道、本州、四国、九州と４つの島がありますが、私が住んでいる福岡は九州にあります。ここが福岡です。\n\n      福岡は九州の中では一番人口が多い街です。そしておいしい食べ物がたくさんある街として有名です。日本国内でも、おいしい食べ物を目当てに福岡に旅行に来る人がとても多いです。\n      \n      今日は写真を見ながら福岡の有名な食べ物、福岡の名物を紹介したいと思います。\n      \n      まず一枚目の写真を見てください。これは”もつ鍋”といいます。もつ鍋という名前の鍋料理です。スープの中に野菜ともつが入っています。\n      \n      “もつ”というのは、豚や牛や鳥の内臓のことです。心臓や肝臓や腸のことです。これを鍋に入れてぐつぐつ煮込んで食べます。スープの味は、醤油味や味噌味や塩味など色々な種類があります。\n      \n      私は実はモツ鍋はあんまり好きじゃありません。モツが苦手なのであんまり食べたことがありません。\n      \n      次の写真を見ましょう。これは”水炊き”です。水炊きも先程紹介したもつ鍋と同じく鍋料理です。鍋に鶏肉と野菜を入れて煮込んだ料理です。鶏肉の出汁のスープがとっても美味しいです。\n      \n      これは辛子明太子といいます。これ、何だと思いますか？実はこれはスケトウダラという名前の魚の卵からできています。スケトウダラの卵を唐辛子などで味付けをしたものです。\n      \n      辛子明太子という名前の通り辛いです。辛いけど美味しいです。こんな風に白ごはんの上にのせて食べるととっても美味しいです。辛子明太子のおにぎりや、辛子明太子のパスタなどもあります。\n      \n      これはラーメンです。私の大好きなラーメンです。\n      \n      日本には色々な種類のラーメンがあります。地域ごとにスープの味や麺が違います。スープには醤油味や味噌味、塩味などがあります。麺には真っ直ぐなストレート麺や縮れ麺、太い麺、細い麺などがあります。\n      \n      福岡のラーメンは豚の骨からとった豚骨スープに細くて真っ直ぐな麺が入っているのが特徴です。\n      \n      これはうどんです。うどんも先程のラーメンと同じ麺料理です。うどんも全国どこでも食べられる料理ですが、福岡のうどんは麺が柔らかいのが特徴です。\n      \n      そして福岡のうどんといえばこのごぼ天うどんです。ごぼ天とはごぼうの天ぷらのことです。ごぼうという野菜を知っていますか。こんな風に土の中で育つ茶色くて細長い野菜です。\n      \n      このごぼうの天ぷらがのったごぼ天うどんが有名です。私もごぼ天うどんが大好きです。\n      \n      福岡には他にもおいしい食べ物がたくさんあります。果物で有名なのはイチゴです。実が大きくて、真っ赤で甘くてとても美味しいです。\n      \n      それから福岡は海が近いので、魚やイカや牡蠣など、海の幸も有名です。海で採ってすぐ、採れたての新鮮な魚介類が食べられます。\n      \n      紹介した中で食べたことがある食べ物はありましたか。一番食べてみたいと思ったものはどれでしたか。\n      \n      今日は福岡の有名な食べ物、福岡の名物を紹介しました。今日はこれでおしまい。またね！",
      transcript_furigana: "私わたしは日本にほんの福岡ふくおかという街まちに住すんでいます。\n\n      日本にほんには北海道ほっかいどう、本州ほんしゅう、四国しこく、九州きゅうしゅうと４よっつの島しまがありますが、私わたしが住すんでいる福岡ふくおかは九州きゅうしゅうにあります。\n      \n      ここが福岡ふくおかです。\n      \n      福岡ふくおかは九州きゅうしゅうの中なかでは一番いちばん人口じんこうが多おおい街まちです。\n      \n      そしておいしい食たべ物ものがたくさんある街まちとして有名ゆうめいです。\n      \n      日本にほん国内こくないでも、おいしい食たべ物ものを目当めあてに福岡ふくおかに旅行りょこうに来くる人ひとがとても多おおいです。\n      \n      今日きょうは写真しゃしんを見みながら福岡ふくおかの有名ゆうめいな食たべ物もの、福岡ふくおかの名物めいぶつを紹介しょうかいしたいと思おもいます。\n      \n      まず一枚目いちまいめの写真しゃしんを見みてください。\n      \n      これは”もつ鍋なべ“といいます。\n      \n      もつ鍋なべという名前なまえの鍋料理なべりょうりです。\n      \n      スープすーぷの中なかに野菜やさいと”もつ”が入はいっています。\n      \n      もつというのは、豚ぶたや牛うしや鳥とりの内臓ないぞうのことです。\n      \n      心臓しんぞうや肝臓かんぞうや腸ちょうのことです。\n      \n      これを鍋なべに入いれてぐつぐつ煮込にこんで食たべます。\n      \n      スープすーぷの味あじは、醤油味しょうゆあじや味噌味みそあじや塩味しおあじなど色々いろいろな種類しゅるいがあります。\n      \n      私わたしは実じつはもつ鍋なべはあんまり好すきじゃありません。\n      \n      もつが苦手にがてなのであんまり食たべたことがありません。\n      \n      次つぎの写真しゃしんを見みましょう。\n      \n      これは”水炊みずたき”です。\n      \n      水炊みずたきも先程さきほど紹介しょうかいしたもつ鍋なべと同おなじく鍋料理なべりょうりです。\n      \n      鍋なべに鶏肉とりにくと野菜やさいを入いれて煮込にこんだ料理りょうりです。\n      \n      鶏肉とりにくの出汁だしのスープすーぷがとっても美味おいしいです。\n      \n      これは”辛子明太子からしめんたいこ“といいます。\n      \n      これ、何なんだと思おもいますか。\n      \n      実じつはこれは”スケトウダラすけとうだら“という名前なまえの魚さかなの卵たまごからできています。\n      \n      スケトウダラすけとうだらの卵たまごを唐辛子とうがらしなどで味付あじつけしたものです。\n      \n      “辛子からし“明太子めんたいこという名前なまえの通とおり辛からいです。\n      \n      辛からいけど美味おいしいです。\n      \n      こんな風ふうに、白しろごはんの上うえにのせて食たべるととっても美味おいしいです。\n      \n      辛子明太子からしめんたいこのおにぎりや、辛子明太子からしめんたいこのパスタぱすたなどもあります。\n      \n      これはラーメンらーめんです。\n      \n      私わたしの大好だいすきなラーメンらーめんです。\n      \n      日本にほんには色々いろいろな種類しゅるいのラーメンらーめんがあります。\n      \n      地域ちいきごとにスープすーぷの味あじや麺めんが違ちがいます。\n      \n      スープすーぷには醤油味しょうゆあじや味噌味みそあじ、塩味しおあじなどがあります。\n      \n      麺めんには真まっ直すぐなストレートすとれーと麺めんや縮ちぢれ麺めん、太ふとい麺めん、細ほそい麺めんなどがあります。\n      \n      福岡ふくおかのラーメンらーめんは豚ぶたの骨ほねからとった豚骨とんこつスープすーぷに細ほそくて真まっ直すぐな麺めんが入はいっているのが特徴とくちょうです。\n      \n      これはうどんです。\n      \n      うどんも先程さきほどのラーメンらーめんと同おなじ麺料理めんりょうりです。\n      \n      うどんも全国ぜんこくどこでも食たべられる料理りょうりですが、福岡ふくおかのうどんは麺めんが柔やわらかいのが特徴とくちょうです。\n      \n      そして福岡ふくおかのうどんといえばこの”ごぼ天てんうどん”です。\n      \n      “ごぼ天てん“とはごぼうの天てんぷらのことです。\n      \n      ごぼうという野菜やさいを知しっていますか。\n      \n      こんな風ふうに土つちの中なかで育そだつ茶色ちゃいろくて細長ほそながい野菜やさいです。\n      \n      このごぼうの天てんぷらがのったごぼ天てんうどんが有名ゆうめいです。\n      \n      私わたしもごぼ天てんうどんが大好だいすきです。\n      \n      福岡ふくおかには他ほかにもおいしい食たべ物ものがたくさんあります。\n      \n      果物くだもので有名ゆうめいなのはいちごです。\n      \n      実みが大おおきくて、真まっ赤かで甘あまくてとても美味おいしいです。\n      \n      それから福岡ふくおかは海うみが近ちかいので、魚さかなやイカいかや牡蠣かきなど海うみの幸さちも有名ゆうめいです。\n      \n      海うみで採とってすぐ、採とれたての新鮮しんせんな魚介類ぎょかいるいが食たべられます。\n      \n      紹介しょうかいした中なかで食たべたことがある食たべ物ものはありましたか。\n      \n      一番いちばん食たべてみたいと思おもったものはどれでしたか。\n      \n      今日きょうは福岡ふくおかの有名ゆうめいな食たべ物もの、福岡ふくおかの名物めいぶつを紹介しょうかいしました。\n      \n      今日きょうはこれでおしまい。またね！"
  },
  {
      title: "朝ごはん Breakfast",
      url: "https://cijapanese.com/breakfast/",
      level: "complete beginner",
      membership: "free",
      transcript: "朝です。昼です。夜です。朝ごはん、昼ごはん、晩ごはん。今日は朝ごはんについて話します。\n\n      これは食べ物です。食べるものです。ごはん、パン、魚、いちご、ハンバーガー。食べ物です。\n      \n      これは飲み物です。飲むものです。牛乳、ビール、コーヒー、紅茶、ジュース。飲み物です。\n      \n      皆さんは、朝ごはんに何を食べますか。何を飲みますか。\n      \n      これは私です。私の家族です。\n      \n      私たちは朝ごはんにパンを食べます。毎日パンを食べます。私も夫も息子も娘もみんな毎日パンを食べます。\n      \n      ごはんは食べません。ハンバーガーも食べません。朝ごはんには毎日パンを食べます。\n      \n      これは卵です。これは目玉焼きです。私と夫と息子は毎日目玉焼きを食べます。娘は食べません。\n      \n      これはヨーグルトです。子供たちと夫は毎日ヨーグルトを食べます。私は食べません。\n      \n      りんごです。バナナです。ぶどうです。フルーツです。果物です。私たちは時々朝ごはんに果物を食べます。毎日は食べません。時々食べます。\n      \n      私と夫は毎日コーヒーを飲みます。子供たちは毎日牛乳を飲みます。コーヒーは飲みません。毎日牛乳を飲みます。\n      \n      皆さんは朝ごはんに何を食べますか。何を飲みますか。今日は朝ごはんの話をしました。今日はこれでおしまい。またね！",
      transcript_furigana: "朝あさです。昼ひるです。夜よるです。\n\n      朝あさごはん、昼ひるごはん、晩ばんごはん。\n      \n      今日きょうは　朝あさごはんについて　話はなします。\n      \n      これは　食たべ物ものです。食たべるものです。\n      \n      ごはん、パンぱん、魚さかな、いちご、ハンバーガーはんばーがー。食たべ物ものです。\n      \n      これは　飲のみ物ものです。飲のむものです。\n      \n      牛乳ぎゅうにゅう、ビールびーる、コーヒーこーひー、紅茶こうちゃ、ジュースじゅーす。飲のみ物ものです。\n      \n      皆みなさんは、朝あさごはんに　何なにを　食たべますか。\n      \n      何なにを　飲のみますか。\n      \n      これは　私わたしです。\n      \n      私わたしの　家族かぞくです。\n      \n      私わたしたちは　朝あさごはんに　パンぱんを　食たべます。毎日まいにち　パンぱんを　食たべます。\n      \n      私わたしも　夫おっとも　息子むすこも　娘むすめも　みんな　毎日まいにち　パンぱんを　食たべます。\n      \n      ごはんは　食たべません。ハンバーガーはんばーがーも　食たべません。\n      \n      朝あさごはんには　毎日まいにち　パンぱんを　食たべます。\n      \n      これは　卵たまごです。これは　目玉焼めだまやきです。\n      \n      私わたしと　夫おっとと　息子むすこは　毎日まいにち　目玉焼めだまやきを　食たべます。\n      \n      娘むすめは　食たべません。\n      \n      これは　ヨーグルトよーぐるとです。\n      \n      子供こどもたちと夫おっとは　毎日まいにち　ヨーグルトよーぐるとを　食たべます。\n      \n      私わたしは　食たべません。\n      \n      りんごです。バナナばななです。ぶどうです。\n      \n      フルーツふるーつです。果物くだものです。\n      \n      私わたしたちは　時々ときどき　朝あさごはんに　果物くだものを　食たべます。\n      \n      毎日まいにちは　食たべません。時々ときどき　食たべます。\n      \n      私わたしと　夫おっとは　毎日まいにち　コーヒーこーひーを　飲のみます。\n      \n      子供こどもたちは　毎日まいにち　牛乳ぎゅうにゅうを　飲のみます。\n      \n      コーヒーこーひーは　飲のみません。毎日まいにち　牛乳ぎゅうにゅうを　飲のみます。\n      \n      皆みなさんは　朝あさごはんに　何なにを　食たべますか。\n      \n      何なにを　飲のみますか。\n      \n      今日きょうは　朝あさごはんの　話はなしをしました。\n      \n      今日きょうは　これで　おしまい。またね！"
  },
  {
      title: "茶道",
      url: "https://cijapanese.com/tea-ceremony/",
      level: "intermediate",
      membership: "free",
      transcript: "今日のテーマは茶道です。日本に昔から伝わる伝統文化、茶道について話します。「お茶の道」と書いて茶道と読みます。茶道とは、簡単に一言でいうと「お茶を飲むこと」ですが、単にお茶を飲むだけではありません。\n\n      まず簡単に茶道の歴史を紹介したいと思います。\n      \n      お茶は元々中国が原産地です。一番最初にお茶が作られたのは中国です。８世紀から９世紀頃、奈良時代から平安時代の頃に日本に伝わりました。\n      \n      その頃「遣唐使」といわれる人たちがいました。遣唐使たちは、日本から中国に行って中国で勉強して、学んだ知識を日本に持ち帰っていました。\n      \n      遣唐使たちが中国から日本に帰国する際に、お茶の種を持ち帰ったそうです。そして日本でもお茶が栽培されるようになりました。でもこの時は実はあまり、日本にお茶は広まりませんでした。\n      \n      それからしばらく経って、１２世紀、鎌倉時代に今度は栄西という仏教のお坊さんが中国に留学しました。そして彼もまた帰国する時にお茶の種を持ち帰りました。そして日本に帰国後、お茶の飲み方やお茶の栽培方法などをまとめたお茶の専門書を書きました。\n      \n      その当時、お茶は薬として飲まれていたそうです。その後徐々に仏教のお坊さんの間で広まりました。武士の間でも流行して、薬としてだけではなくて飲み物としても楽しまれるようになりました。パーティーのような「お茶会」を開いてみんなでお茶を飲んで楽しむようになりました。\n      \n      そこに村田珠光という名前の仏教のお坊さんが「禅」の考え方を取り入れて、現在の茶道の基となる「侘び茶」というものを始めました。\n      \n      その後、千利休という人がそれを更に発展させて、今の茶道ができました。\n      \n      お茶にも色々な種類があるんですが、茶道で飲むお茶は抹茶です。濃い緑色のお茶です。\n      \n      抹茶の粉とお湯を茶碗に入れて、茶筅というこの道具を使ってかき混ぜてお茶を作ります。茶道の言葉では「お茶を点てる」といいます。\n      \n      茶道では、立ち方から、歩き方、座り方、茶碗の持ち方、混ぜ方、道具を置く場所、ふきんのたたみ方、お茶の飲み方、お辞儀の仕方、お菓子の食べ方まで、一つ一つ、細かくルールが決まっています。この決まりのことを作法といいます。作法に従ってお茶を飲みます。\n      \n      そして茶道というのはただお茶を飲むだけではありません。\n      \n      お茶を飲む部屋のことを茶室といいますが、この茶室の空間や、茶室から見える庭の景色、茶室に飾る花、使う道具や、お茶と一緒に出すお菓子など全部含めて茶道です。お茶会を開く人は、その全てに気を配って、全てを考えて、お客さんをおもてなしします。\n      \n      「一期一会」という茶道の言葉があります。これは一生に一度の出来事という意味です。\n      \n      一回一回のお茶会を人生に一度しかない時間と考えて、最高のおもてなしをしましょう、そしてもてなす人も、お客さんも、お互いに一生に一度しかないこの時間を大切にしましょう。という意味です。\n      \n      とても素敵な言葉だなと思います。\n      \n      私は昔、小学生の頃に何回か茶道をやったことがあります。私のおばが趣味が茶道だったのでおばに教えてもらって2,3回やったことがあります。その時はまだ子供だったし、かなり昔のことなのでもう忘れてしまいました。いつか機会があったらまたやってみたいなと思います。\n      \n      今日は茶道について話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうのテーマは茶道さどうです。\n\n      日本にほんに昔むかしから伝つたわる伝統文化でんとうぶんか、茶道さどうについて話はなします。\n      \n      「お茶ちゃの道みち」と書かいて茶道さどうと読よみます。\n      \n      茶道さどうとは、簡単かんたんに一言ひとことでいうと「お茶ちゃを飲のむこと」ですが、単たんにお茶ちゃを飲のむだけではありません。\n      \n      まず簡単かんたんに茶道さどうの歴史れきしを紹介しょうかいしたいと思おもいます。\n      \n      お茶ちゃは元々もともと中国ちゅうごくが原産地げんさんちです。\n      \n      一番いちばん最初さいしょにお茶ちゃが作つくられたのは中国ちゅうごくです。\n      \n      ８世紀はっせいきから９世紀頃きゅうせいきごろ、奈良時代ならじだいから平安時代へいあんじだいの頃ころに日本にほんに伝つたわりました。\n      \n      その頃ころ「遣唐使けんとうし」といわれる人ひとたちがいました。\n      \n      遣唐使けんとうしたちは、日本にほんから中国ちゅうごくに行いって中国ちゅうごくで勉強べんきょうして、学まなんだ知識ちしきを日本にほんに持もち帰かえっていました。\n      \n      遣唐使けんとうしたちが中国ちゅうごくから日本にほんに帰国きこくする際さいに、お茶ちゃの種たねを持もち帰かえったそうです。\n      \n      そして日本にほんでもお茶ちゃが栽培さいばいされるようになりました。\n      \n      でもこの時ときは実じつはあまり、日本にほんにお茶ちゃは広ひろまりませんでした。\n      \n      それからしばらく経たって、１２世紀じゅうにせいき、鎌倉時代かまくらじだいに今度こんどは栄西えいさいという仏教ぶっきょうのお坊ぼうさんが中国ちゅうごくに留学りゅうがくしました。\n      \n      そして彼かれもまた帰国きこくする時ときにお茶ちゃの種たねを持もち帰かえりました。\n      \n      そして日本にほんに帰国後きこくご、お茶ちゃの飲のみ方かたやお茶ちゃの栽培方法さいばいほうほうなどをまとめたお茶ちゃの専門書せんもんしょを書かきました。\n      \n      その当時とうじ、お茶ちゃは薬くすりとして飲のまれていたそうです。\n      \n      その後ご徐々じょじょに仏教ぶっきょうのお坊ぼうさんの間あいだで広ひろまりました。\n      \n      武士ぶしの間あいだでも流行りゅうこうして、薬くすりとしてだけではなくて飲のみ物ものとしても楽たのしまれるようになりました。\n      \n      パーティーのような「お茶会ちゃかい」を開ひらいてみんなでお茶ちゃを飲のんで楽たのしむようになりました。\n      \n      そこに村田珠光むらたじゅこうという名前なまえの仏教ぶっきょうのお坊ぼうさんが「禅ぜん」の考かんがえ方かたを取とり入いれて、現在げんざいの茶道さどうの基もととなる「侘わび茶ちゃ」というものを始はじめました。\n      \n      その後ご、千利休せんのりきゅうという人ひとがそれを更さらに発展はってんさせて、今いまの茶道さどうができました。\n      \n      お茶ちゃにも色々いろいろな種類しゅるいがあるんですが、茶道さどうで飲のむお茶ちゃは抹茶まっちゃです。濃こい緑色みどりいろのお茶ちゃです。\n      \n      抹茶まっちゃの粉こなとお湯ゆを茶碗ちゃわんに入いれて、茶筅ちゃせんというこの道具どうぐを使つかってかき混まぜてお茶ちゃを作つくります。\n      \n      茶道さどうの言葉ことばでは「お茶ちゃを点たてる」といいます。\n      \n      茶道さどうでは、立たち方かたから、歩あるき方かた、座すわり方かた、茶碗ちゃわんの持もち方かた、混まぜ方かた、道具どうぐを置おく場所ばしょ、ふきんのたたみ方かた、お茶ちゃの飲のみ方かた、お辞儀じぎの仕方しかた、お菓子かしの食たべ方かたまで、一ひとつ一ひとつ、細こまかくルールが決きまっています。\n      \n      この決きまりのことを作法さほうといいます。\n      \n      作法さほうに従したがってお茶ちゃを飲のみます。\n      \n      そして茶道さどうというのはただお茶ちゃを飲のむだけではありません。\n      \n      お茶ちゃを飲のむ部屋へやのことを茶室ちゃしつといいますが、この茶室ちゃしつの空間くうかんや、茶室ちゃしつから見みえる庭にわの景色けしき、茶室ちゃしつに飾かざる花はな、使つかう道具どうぐや、お茶ちゃと一緒いっしょに出だすお菓子かしなど全部ぜんぶ含ふくめて茶道さどうです。\n      \n      お茶会ちゃかいを開ひらく人ひとは、その全すべてに気きを配くばって、全すべてを考かんがえて、お客きゃくさんをおもてなしします。\n      \n      「一期一会いちごいちえ」という茶道さどうの言葉ことばがあります。\n      \n      これは一生いっしょうに一度いちどの出来事できごとという意味いみです。\n      \n      一回一回いっかいいっかいのお茶会ちゃかいを人生じんせいに一度いちどしかない時間じかんと考かんがえて、最高さいこうのおもてなしをしましょう、そしてもてなす人ひとも、お客きゃくさんも、お互たがいに一生いっしょうに一度いちどしかないこの時間じかんを大切たいせつにしましょうという意味いみです。\n      \n      とても素敵すてきな言葉ことばだなと思います。\n      \n      私わたしは昔むかし、小学生しょうがくせいの頃ころに何回なんかいか茶道さどうをやったことがあります。\n      \n      私わたしのおばが趣味しゅみが茶道さどうだったのでおばに教おしえてもらって2,3回にさんかいやったことがあります。\n      \n      その時ときはまだ子供こどもだったし、かなり昔むかしのことなのでもう忘わすれてしまいました。\n      \n      いつか機会きかいがあったらまたやってみたいなと思おもいます。\n      \n      今日きょうは茶道さどうについて話はなしました。今日きょうはこれでおしまい。またね！"
  },
  {
      title: "りんごはどこ？ Where is the apple?",
      url: "https://cijapanese.com/where-is-the-apple/",
      level: "complete beginner",
      membership: "free",
      transcript: "これはりんごです。赤いりんごです。りんごは好きですか。私は好きです。\n\n      りんごはどこにありますか。テーブルの上にあります。\n      \n      りんごはどこにありますか。箱の上にあります。\n      \n      りんごはどこにありますか。木の下にあります。\n      \n      りんごはどこにありますか。いすの下にあります。\n      \n      りんごはどこにありますか。カゴの中にあります。\n      \n      りんごはどこにありますか。袋の中にあります。\n      \n      りんごはどこにありますか。バナナの右にあります。\n      \n      りんごはどこにありますか。ぶどうの右にあります。\n      \n      りんごはどこにありますか。バナナの左にあります。\n      \n      りんごはどこにありますか。ぶどうの左にあります。\n      \n      りんごはどこにありますか。バナナとぶどうの間にあります。\n      \n      りんごはどこにありますか。りんごはもうありません。私が食べました。美味しかった！\n      \n      おしまい。またね！",
      transcript_furigana: "これは　りんごです。\n\n      赤あかい　りんごです。\n      \n      りんごは　好すきですか。\n      \n      私わたしは　好すきです。\n      \n      りんごは　どこに　ありますか。\n      \n      テーブルてーぶるの　上うえに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      箱はこの　上うえに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      木きの　下したに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      いすの　下したに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      カゴかごの　中なかに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      袋ふくろの　中なかに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      バナナばななの　右みぎに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      ぶどうの　右みぎに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      バナナばななの　左ひだりに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      ぶどうの　左ひだりに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      バナナばななと　ぶどうの　間あいだに　あります。\n      \n      りんごは　どこに　ありますか。\n      \n      りんごは　もう　ありません。\n      \n      私わたしが　食たべました。\n      \n      美味おいしかった！\n      \n      おしまい。またね！"
  },
  {
      title: "進撃の巨人 Attack on Titan",
      url: "https://cijapanese.com/attack-on-titan/",
      level: "beginner",
      membership: "free",
      transcript: "今回の動画ではアニメ「進撃の巨人」の第一話の内容を話します。\n\n      今８４５年です。ここはシガンシナ区という場所です。エレンという名前の１０歳の少年と、ミカサという名前の少女が住んでいます。\n      \n      この町の周りには高い壁があります。こんな風に町全体が高い壁に囲まれています。この壁は５０メートルもあります。なぜ、どうして、こんなに高い壁があるんでしょう。\n      \n      街の外には巨人がいます。巨人たちが中に入れないように、巨人たちが入ってくるのを防ぐために壁を作りました。この壁は１００年前に作られました。この１００年間、巨人は入ってきていません。\n      \n      町の人々は壁の中で、１００年間安全に平和に暮らしてきました。壁の外は危険です。でも壁の中にいれば危なくありません。安全です。戦いもありません。平和です。なのでこの町の人達は１００年間ずーっと壁の中で暮らしてきました。\n      \n      調査兵団という人たちがいます。この人達は、壁の外に出て巨人の調査をしています。巨人について調べています。\n      \n      ある時調査兵団が調査が終わって帰ってきました。１００人以上の人が調査をしに行きました。でも帰ってきたのはたった２０人ほどでした。１００人以上が行ったのに、戻ったのは２０人くらいでした。残りの人たちはみんな死んでしまいました。\n      \n      調査兵団のことを人々はみんな反対しています。みんな壁の外は危険、中にいれば安全と思っています。なので外に出ることを反対しています。\n      \n      でもこの少年エレンは外の世界に興味があります。外のことが気になります。知りたいです。彼はずーっと壁の中だけで生きていくのは嫌だと思っています。エレンは自分も調査兵団に入りたい、調査兵団になりたいと思っています。\n      \n      もう一人、アルミンという少年がいます。友達です。彼もエレンと同じように外の世界に興味があります。\n      \n      ある時３人が歩いていました。すると突然大きな音がしました。大きな音が聞こえました。そして地面が揺れました。３人は音のする方に走っていきます。そして上を見上げます。すると壁の上に大きな巨人の手が見えます。\n      \n      壁が壊れます。壁が壊れて巨人の顔が見えます。巨人が壁を蹴ります。足で蹴ります。壁を蹴って穴を開けます。その穴から何人もの巨人が入ってきました。\n      \n      人々は走ります。走って逃げます。巨人たちから逃げます。アルミンも逃げます。エレンとミカサは家に戻ります。家にエレンのお母さんがいます。お母さんのことが心配で家に戻ります。\n      \n      家に着きました。すると家は崩れていました。家が崩れてお母さんが家の下敷きになっています。お母さんは動けません。動くことができません。\n      \n      エレンとミカサはお母さんを引っ張ります。引っ張って助けようとします。助けようとしますが、助けられません。お母さんは「行きなさい」「逃げなさい」と言います。でもエレンはお母さんを助けたいです。\n      \n      そこにハンネスという名前の男の人が来ました。彼もエレンのお母さんを助けようとします。でもそこに巨人が現れます。巨人が近づいてきます。ハンネスは、お母さんを助けられない、助けるのは無理だと思います。お母さんを助けることを諦めて二人を抱えて逃げます。\n      \n      その後、なんと、お母さんは巨人に捕まえられて食べられてしまいました。\n      \n      これが「進撃の巨人」第一話のあらすじです。私は１話だけ観ました。１話しか観ていません。続きは知りません。この後どうなるのか気になります。\n      \n      今日はアニメ「進撃の巨人」の第一話のお話をしました。今日はこれでおしまい。またね！",
      transcript_furigana: "今回こんかいの　動画どうがでは　アニメあにめ　「進撃しんげきの　巨人きょじん」の　第一話だいいちわの　内容ないようを　話はなします。\n\n      今いま　８４５年はっぴゃくよんじゅうごねんです。\n      \n      ここは　シガンシナしがんしな区くという　場所ばしょです。\n      \n      エレンえれんという　名前なまえの　１０歳じゅっさいの　少年しょうねんと　ミカサみかさという　名前なまえの　少女しょうじょが　住すんでいます。\n      \n      この町まちの　周まわりには　高たかい　壁かべが　あります。\n      \n      こんな風ふうに　町まち全体ぜんたいが　高たかい　壁かべに　囲かこまれています。\n      \n      この壁かべは　５０メートルごじゅうめーとるも　あります。\n      \n      なぜ　どうして　こんなに　高たかい　壁かべが　あるんでしょう。\n      \n      町まちの　外そとには　巨人きょじんが　います。\n      \n      巨人きょじんたちが　中なかに　入はいれないように　巨人きょじんたちが　入はいってくるのを　防ふせぐために　壁かべを　作つくりました。\n      \n      この壁かべは　１００年前ひゃくねんまえに　作つくられました。\n      \n      この　１００年間ひゃくねんかん　巨人きょじんは　入はいってきていません。\n      \n      町まちの　人々ひとびとは　壁かべの　中なかで　１００年間ひゃくねんかん　安全あんぜんに　平和へいわに　暮くらしてきました。\n      \n      壁かべの　外そとは　危険きけんです。\n      \n      でも　壁かべの　中なかに　いれば　危あぶなくありません。\n      \n      安全あんぜんです。\n      \n      戦たたかいも　ありません。　\n      \n      平和へいわです。\n      \n      なので　この町まちの　人達ひとたちは　１００年間ひゃくねんかん　ずーっと　壁かべの　中なかで　暮くらしてきました。\n      \n      調査兵団ちょうさへいだんという　人ひとたちが　います。\n      \n      この人達ひとたちは　壁かべの　外そとに　出でて　巨人きょじんの　調査ちょうさを　しています。\n      \n      巨人きょじんについて　調しらべています。\n      \n      ある時とき　調査兵団ちょうさへいだんが　調査ちょうさが　終おわって　帰かえってきました。\n      \n      １００人ひゃくにん以上いじょうの　人ひとが　調査ちょうさをしに　行いきました。\n      \n      でも　帰かえってきたのは　たった　２０人にじゅうにんほどでした。\n      \n      １００人ひゃくにん以上いじょうが　行いったのに　戻もどったのは　２０人にじゅうにんくらいでした。\n      \n      残のこりの　人ひとたちは　みんな　死しんでしまいました。\n      \n      調査兵団ちょうさへいだんのことを　人々ひとびとは　みんな　反対はんたいしています。\n      \n      みんな　壁かべの　外そとは　危険きけん　中なかに　いれば　安全あんぜんと　思おもっています。\n      \n      なので　外そとに　出でることを　反対はんたいしています。\n      \n      でも　この少年しょうねん　エレンえれんは　外そとの　世界せかいに　興味きょうみが　あります。\n      \n      外そとのことが　気きになります。　知しりたいです。\n      \n      彼かれは　ずーっと　壁かべの　中なかだけで　生いきていくのは　嫌いやだと　思おもっています。\n      \n      エレンえれんは　自分じぶんも　調査兵団ちょうさへいだんに　入はいりたい　調査兵団ちょうさへいだんに　なりたいと　思おもっています。\n      \n      もう一人ひとり　アルミンあるみんという　少年しょうねんが　います。　友達ともだちです。\n      \n      彼かれも　エレンえれんと　同おなじように　外そとの　世界せかいに　興味きょうみが　あります。\n      \n      ある時とき　３人さんにんが　歩あるいていました。\n      \n      すると　突然とつぜん　大おおきな　音おとが　しました。\n      \n      大おおきな　音おとが　聞きこえました。\n      \n      そして　地面じめんが　揺ゆれました。\n      \n      ３人さんにんは　音おとの　する方ほうに　走はしっていきます。\n      \n      そして　上うえを　見上みあげます。\n      \n      すると　壁かべの　上うえに　大おおきな　巨人きょじんの　手てが　見みえます。\n      \n      壁かべが　壊こわれます。\n      \n      壁かべが　壊こわれて　巨人きょじんの　顔かおが　見みえます。\n      \n      巨人きょじんが　壁かべを　蹴けります。　足あしで　蹴けります。\n      \n      壁かべを　蹴けって　穴あなを　開あけます。\n      \n      その　穴あなから　何人なんにんもの　巨人きょじんが　入はいってきました。\n      \n      人々ひとびとは　走はしります。　走はしって　逃にげます。\n      \n      巨人きょじんたちから　逃にげます。\n      \n      アルミンあるみんも　逃にげます。\n      \n      エレンえれんと　ミカサみかさは　家いえに　戻もどります。\n      \n      家いえに　エレンえれんの　お母かあさんが　います。\n      \n      お母かあさんのことが　心配しんぱいで　家いえに　戻もどります。\n      \n      家いえに　着つきました。\n      \n      すると　家いえは　崩くずれていました。\n      \n      家いえが　崩くずれて　お母かあさんが　家いえの　下敷したじきに　なっています。\n      \n      お母かあさんは　動うごけません。\n      \n      動うごくことが　できません。\n      \n      エレンえれんと　ミカサみかさは　お母かあさんを　引ひっ張ぱります。\n      \n      引ひっ張ぱって　助たすけようと　します。\n      \n      助たすけようと　しますが　助たすけられません。\n      \n      お母かあさんは「行いきなさい」「逃にげなさい」と　言いいます。\n      \n      でも　エレンえれんは　お母かあさんを　助たすけたいです。\n      \n      そこに　ハンネスはんねすという　名前なまえの　男おとこの　人ひとが　来きました。\n      \n      彼かれも　エレンえれんの　お母かあさんを　助たすけようとします。\n      \n      でも　そこに　巨人きょじんが　現あらわれます。\n      \n      巨人きょじんが　近ちかづいてきます。\n      \n      ハンネスはんねすは　お母かあさんを　助たすけられない　助たすけるのは　無理むりだと　思おもいます。\n      \n      お母かあさんを　助たすけることを　諦あきらめて　二人ふたりを　抱かかえて　逃にげます。\n      \n      その後あと　なんと　お母かあさんは　巨人きょじんに　捕つかまえられて　食たべられてしまいました。\n      \n      これが　「進撃しんげきの　巨人きょじん」　第一話だいいちわの　あらすじです。\n      \n      私わたしは　１話いちわだけ　観みました。\n      \n      １話いちわしか　観みていません。\n      \n      続つづきは　知しりません。\n      \n      この後あと　どうなるのか　気きになります。\n      \n      今日きょうは　アニメあにめ　「進撃しんげきの　巨人きょじん」の　第一話だいいちわの　お話はなしを　しました。\n      \n      今日きょうは　これで　おしまい。　またね！"
  },
  {
      title: "かちかち山",
      url: "https://cijapanese.com/kachi-kachi-yama/",
      level: "intermediate",
      membership: "free",
      transcript: "今回の中級の動画では「かちかち山」という日本の昔話をします。\n\n      ある山の麓の村に、優しいおじいさんとおばあさんが仲良く暮らしていました。おじいさんとおばあさんの家の裏には小さな畑があります。おじいさんはここで野菜を作って、おばあさんは家の中で団子を作って暮らしていました。\n      \n      ある朝おじいさんが仕事をしに畑に行くと、畑が誰かに荒らされていました。おじいさんが一生懸命育てた野菜が盗まれています。おじいさんは困っています。「困ったなぁ。誰がこんなことをしたんだろう。」\n      \n      おじいさんの畑を荒らした犯人はたぬきでした。たぬきが夜のうちに畑にやってきて、野菜を盗んでいたのです。\n      \n      やがてたぬきは昼間にも現れるようになりました。そして野菜を取るだけじゃなくて、おじいさんに石や土を投げつけていたずらをするようになりました。「早く野菜を作れ！俺が全部食べてやる！」\n      \n      いくら優しいおじいさんでももう我慢できません。いくら優しいおじいさんでも怒ります。怒ったおじいさんは畑のそばに罠を作りました。そして美味しそうな焼き魚を置いておきました。\n      \n      たぬきは食べるのが大好きです。食いしん坊です。焼き魚の美味しそうな匂いに釣られてやってきます。「くんくん。うまそうな匂いだなぁ。あ！うまそうな魚だ！よし、これも盗んでやる！」と言って、魚を取ろうとしました。たぬきが魚に手を伸ばした瞬間、罠にかかってしまいました。\n      \n      「よし！捕まえた！」おじいさんはたぬきを家に連れて行きます。「ごめんなさい。許してください。」と泣いていますが、おじいさんは許しません。簡単には許しません。おじいさんはたぬきを連れて帰って家の柱に縛り付けました。縄で縛り付けました。おじいさんはまた畑に戻っていきました。\n      \n      家の中ではおばあさんが団子を作っています。たぬきはおばあさんの前で泣き始めます。「痛いよ〜おばあさん、お願い、縄をほどいてください。縄をとってください。縄をほどいてくれたら、団子を作るのを手伝うから。」とおばあさんに頼みます。\n      \n      優しいおばあさんはたぬきがかわいそうになってきました。おばあさんは「わかった。じゃあ縄をほどいてあげるから、団子を作るのを手伝ってね。」そう言って手の縄をほどいてあげました。するとたぬきは自分で足の縄をほどき、逃げ出そうとしました。\n      \n      たぬきは反省しているふりをしていたんです。嘘をついていました。優しいおばあさんはたぬきの嘘に騙されてしまいました。\n      \n      おばあさんは逃げるたぬきを捕まえようとします。ですがたぬきに押されて倒れてしまいました。たぬきにポーンと突き倒されてしまいました。おばあさんは腰を怪我して動けなくなっています。その間にたぬきは遠くへ逃げていきました。\n      \n      そこへおじいさんが急いでやってきます。おばあさんが倒れて苦しんでいます。「おばあさんどうしたの？大丈夫？」おじいさんは心配です。\n      \n      おばあさんは寝込んでしまいました。おじいさんは毎日毎日おばあさんの看病をします。怪我をしたおばあさんの世話をします。でもなかなかよくなりません。\n      \n      山の上に薬の代わりになる草があります。おばあさんの腰の怪我を治す草があります。おじいさんは山へこの草を取りに行くことにしました。「おばあさん、山に行っておばあさんの怪我に効く草をとってくるね。」そう言って出かけていきました。\n      \n      山で１匹のうさぎに出会いました。うさぎにたぬきのことを話すと、うさぎもカンカンに怒っています。「なんてひどいたぬきなんだ！なんて悪いたぬきなんだ！おばあさんがかわいそう。僕が仕返ししてやるよ！たぬきを懲らしめてやる！」\n      \n      次の日うさぎは団子を持って野原に行きました。そこへおいしそうな団子の匂いにつられて、食いしん坊のたぬきが近づいてきます。「うさぎさん、美味しそうな団子だね。」うさぎは言います。「たぬきくん、この草を運ぶのを手伝ってくれる？手伝ってくれるなら団子をあげるよ。」「いいよ！もちろん！手伝ってあげる！」そう言ってたぬきは背中に草を背負います。\n      \n      「さあ行こう！」たぬきが前を、うさぎが後ろを歩いています。これは火打ち石です。カチカチと石を叩いて火をつけます。たぬきの後ろでうさぎは火打ち石を叩いています。カチカチカチ。たぬきがうさぎに尋ねます。「うさぎさん、うしろで何してるの？カチカチって音が聞こえるけど、何の音？」うさぎが答えます。「ここはカチカチ山っていう場所なんだ。カチカチ鳥がカチカチカチって鳴いてるんだよ。」\n      \n      たぬきは「へぇ〜そうなんだ。」とうさぎを信じて団子を食べながら歩き続けます。そのうち、草に火がつきました。今度はぼうぼうと草が燃える音がします。「うさぎさん、今度は後ろでぼうぼうって音がするけど、何の音？」うさぎが答えます。「ここはぼうぼう山っていう場所なんだ。ぼうぼう鳥がぼうぼうって鳴いてるんだよ。」\n      \n      そのうちに、たぬきの背中にまで火がついてたぬきは大やけどしました。やけどをして寝込んでいるたぬきの家に、うさぎがお見舞いに来ます。「たぬきくん大丈夫？やけどに効く薬を持ってきたよ。」と言って辛い唐辛子入りの薬をたぬきの背中に塗りました。「痛いよ〜」たぬきは泣いています。\n      \n      それからしばらく経って、やけどが治って元気になったたぬきは海に行きました。海に行くとうさぎが木で船を作っています。「たぬきくん、今から海に魚を捕りに行くんだ。たぬきくんも一緒に行こう」「いいね！」食いしん坊のたぬきは早く魚を食べたいです。早く魚を食べたいので、大急ぎで砂を集めて泥の船を作りました。うさぎは木の船に乗って、たぬきは泥の船に乗って海に出ます。船を海に浮かべて漕ぎ始めます。\n      \n      でも泥でできたたぬきの船はすぐに水に溶けて沈み始めました。たぬきは溺れています。「うさぎさん助けて！」でもうさぎは助けません。うさぎはこう言います「おじいさんとおばあさんにあんな酷いことをした罰だよ」「ごめんなさい！もう二度と、あんな悪いことはしません！」たぬきはなんとか、自分で海から出て、遠くへ逃げていきました。\n      \n      うさぎは海で捕った魚を持って、おじいさんとおばあさんの家に遊びに行きます。おばあさんは怪我が治ってすっかり元気になっていました。いたずらをする悪いたぬきがいなくなったので、おじいさんとおばあさんは幸せに暮らしました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "今回こんかいの中級ちゅうきゅうの動画どうがでは「かちかち山やま」という日本にほんの昔話むかしばなしをします。\n\n      ある山やまの麓ふもとの村むらに、優やさしいおじいさんとおばあさんが仲良なかよく暮くらしていました。\n      \n      おじいさんとおばあさんの家いえの裏うらには小ちいさな畑はたけがあります。\n      \n      おじいさんはここで野菜やさいを作つくって、おばあさんは家いえの中なかで団子だんごを作つくって暮くらしていました。\n      \n      ある朝あさおじいさんが仕事しごとをしに畑はたけに行いくと、畑はたけが誰だれかに荒あらされていました。\n      \n      おじいさんが一生懸命いっしょうけんめい育そだてた野菜やさいが盗ぬすまれています。\n      \n      おじいさんは困こまっています。「困こまったなぁ。誰だれがこんなことをしたんだろう。」\n      \n      おじいさんの畑はたけを荒あらした犯人はんにんはたぬきでした。\n      \n      たぬきが夜よるのうちに畑はたけにやってきて、野菜やさいを盗ぬすんでいたのです。\n      \n      やがてたぬきは昼間ひるまにも現あらわれるようになりました。\n      \n      そして野菜やさいを取とるだけじゃなくて、おじいさんに石いしや土つちを投なげつけていたずらをするようになりました。\n      \n      「早はやく野菜やさいを作つくれ！俺おれが全部ぜんぶ食たべてやる！」\n      \n      いくら優やさしいおじいさんでももう我慢がまんできません。\n      \n      いくら優やさしいおじいさんでも怒おこります。\n      \n      怒おこったおじいさんは畑のはたけそばに罠わなを作つくりました。\n      \n      そして美味おいしそうな焼やき魚ざかなを置おいておきました。\n      \n      たぬきは食たべるのが大好だいすきです。食くいしん坊ぼうです。\n      \n      焼やき魚ざかなの美味おいしそうな匂においに釣つられてやってきます。\n      \n      「くんくん。うまそうな匂においだなぁ。あ！うまそうな魚さかなだ！よし、これも盗ぬすんでやる！」と言いって、魚さかなを取とろうとしました。\n      \n      たぬきが魚さかなに手てを伸のばした瞬間しゅんかん、罠わなにかかってしまいました。\n      \n      「よし！捕つかまえた！」おじいさんはたぬきを家いえに連つれて行いきます。\n      \n      「ごめんなさい。許ゆるしてください。」と泣ないていますが、おじいさんは許ゆるしません。簡単かんたんには許ゆるしません。\n      \n      おじいさんはたぬきを連つれて帰かえって家いえの柱はしらに縛しばり付つけました。\n      \n      縄なわで縛しばり付つけました。おじいさんはまた畑はたけに戻もどっていきました。\n      \n      家いえの中なかではおばあさんが団子だんごを作っています。\n      \n      たぬきはおばあさんの前まえで泣なき始はじめます。\n      \n      「痛いたいよ〜おばあさん、お願ねがい、縄なわを解ほどいてください。縄なわをとってください。縄なわを解ほどいてくれたら、団子だんごを作つくるのを手伝てつだうから。」とおばあさんに頼たのみます。\n      \n      優やさしいおばあさんはたぬきがかわいそうになってきました。\n      \n      おばあさんは「わかった。じゃあ縄なわを解ほどいてあげるから、団子だんごを作つくるのを手伝てつだってね。」そう言いって手ての縄なわを解ほどいてあげました。\n      \n      するとたぬきは自分じぶんで足あしの縄なわを解ほどき、逃にげ出だそうとしました。\n      \n      たぬきは反省はんせいしているふりをしていたんです。嘘うそをついていました。\n      \n      優やさしいおばあさんはたぬきの嘘うそに騙だまされてしまいました。\n      \n      おばあさんは逃にげるたぬきを捕つかまえようとします。\n      \n      ですがたぬきに押おされて倒たおれてしまいました。\n      \n      たぬきにポーンと突つき倒たおされてしまいました。\n      \n      おばあさんは腰こしを怪我けがして動うごけなくなっています。\n      \n      その間あいだにたぬきは遠とおくへ逃にげていきました。\n      \n      そこへおじいさんが急いそいでやってきます。\n      \n      おばあさんが倒たおれて苦くるしんでいます。\n      \n      「おばあさんどうしたの？大丈夫だいじょうぶ？」おじいさんは心配しんぱいです。\n      \n      おばあさんは寝込ねこんでしまいました。\n      \n      おじいさんは毎日まいにち毎日まいにちおばあさんの看病かんびょうをします。\n      \n      怪我けがをしたおばあさんの世話せわをします。\n      \n      でもなかなかよくなりません。\n      \n      山やまの上うえに薬くすりの代かわりになる草くさがあります。\n      \n      おばあさんの腰こしの怪我けがを治なおす草くさがあります。\n      \n      おじいさんは山やまへこの草くさを取とりに行いくことにしました。\n      \n      「おばあさん、山やまに行いっておばあさんの怪我けがに効きく草くさをとってくるね。」そう言いって出でかけていきました。\n      \n      山やまで１匹いっぴきのうさぎに出会であいました。\n      \n      うさぎにたぬきのことを話はなすと、うさぎもカンカンに怒おこっています。\n      \n      「なんてひどいたぬきなんだ！なんて悪わるいたぬきなんだ！おばあさんがかわいそう。僕ぼくが仕返しかえししてやるよ！たぬきを懲こらしめてやる！」\n      \n      次つぎの日ひうさぎは団子だんごを持もって野原のはらに行いきました。\n      \n      そこへおいしそうな団子だんごの匂においにつられて、食くいしん坊ぼうのたぬきが近ちかづいてきます。\n      \n      「うさぎさん、美味おいしそうな団子だんごだね。」\n      \n      うさぎは言いいます。「たぬきくん、この草くさを運はこぶのを手伝てつだってくれる？手伝てつだってくれるなら団子だんごをあげるよ。」\n      \n      「いいよ！もちろん！手伝てつだってあげる！」そう言いってたぬきは背中せなかに草くさを背負せおいます。\n      \n      「さあ行いこう！」たぬきが前まえを、うさぎが後うしろを歩あるいています。\n      \n      これは火打ひうち石いしです。カチカチと石いしを叩たたいて火ひをつけます。\n      \n      たぬきの後うしろでうさぎは火打ひうち石いしを叩たたいています。カチカチカチ。\n      \n      たぬきがうさぎに尋たずねます。「うさぎさん、後うしろで何なにしてるの？カチカチって音おとが聞きこえるけど、何なんの音おと？」\n      \n      うさぎが答こたえます。「ここはかちかち山やまっていう場所ばしょなんだ。かちかち鳥どりがカチカチカチって鳴ないてるんだよ。」\n      \n      たぬきは「へぇ〜そうなんだ。」とうさぎを信しんじて団子だんごを食たべながら歩あるき続つづけます。\n      \n      そのうち、草くさに火ひがつきました。\n      \n      今度こんどはぼうぼうと草くさが燃もえる音おとがします。\n      \n      「うさぎさん、今度こんどは後うしろでぼうぼうって音おとがするけど、何なんの音おと？」\n      \n      うさぎが答こたえます。「ここはぼうぼう山やまっていう場所ばしょなんだ。ぼうぼう鳥どりがぼうぼうって鳴ないてるんだよ。」\n      \n      そのうちに、たぬきの背中せなかにまで火ひがついてたぬきは大おお火傷やけどしました。\n      \n      火傷やけどをして寝込ねこんでいるたぬきの家いえに、うさぎがお見舞みまいに来きます。\n      \n      「たぬきくん大丈夫だいじょうぶ？火傷やけどに効きく薬くすりを持もってきたよ。」と言いって辛からい唐辛子とうがらし入いりの薬くすりをたぬきの背中せなかに塗ぬりました。\n      \n      「痛いたいよ〜」たぬきは泣ないています。\n      \n      それからしばらく経たって、火傷やけどが治なおって元気げんきになったたぬきは海うみに行いきました。\n      \n      海うみに行いくとうさぎが木きで船ふねを作つくっています。\n      \n      「たぬきくん、今いまから海うみに魚さかなを捕とりにに行いくんだ。たぬきくんも一緒いっしょに行いこう」\n      \n      「いいね！」食くいしん坊ぼうのたぬきは早はやく魚さかなを食たべたいです。\n      \n      早はやく魚さかなを食たべたいので、大急おおいそぎで砂すなを集あつめて泥どろの船ふねを作つくりました。\n      \n      うさぎは木きのの船ふねに乗のって、たぬきは泥どろの船ふねに乗のって海うみに出でます。\n      \n      船ふねを海うみに浮うかべて漕こぎ始はじめます。\n      \n      でも泥どろでできたたぬきの船ふねはすぐに水みずに溶とけて沈しずみ始はじめました。\n      \n      たぬきは溺おぼれています。「うさぎさん助たすけて！」\n      \n      でもうさぎは助たすけません。\n      \n      うさぎはこう言いいます「おじいさんとおばあさんにあんな酷ひどいことをした罰ばつだよ」\n      \n      「ごめんなさい！もう二度にどと、あんな悪わるいことはしません！」たぬきはなんとか、自分じぶんで海うみから出でて、遠とおくへ逃にげていきました。\n      \n      うさぎは海うみで捕とった魚さかなを持もって、おじいさんとおばあさんの家いえに遊あそびに行いきます。\n      \n      おばあさんは怪我けがが治なおってすっかり元気げんきになっていました。\n      \n      いたずらをする悪わるいたぬきがいなくなったので、おじいさんとおばあさんは幸しあわせに暮くらしました。\n      \n      今日きょうはこれでおしまい。またね！"
  },
  {
      title: "誰でしょう？ Guess Who?",
      url: "https://cijapanese.com/guess-who/",
      level: "complete beginner",
      membership: "free",
      transcript: "ここに５人、人がいます。１人２人３人４人５人。全部で５人、人がいます。\n\n      これは色です。黒、白、ピンク、水色、黄緑、紫。全部で６色、色があります。\n      \n      これはTシャツです。ズボンです。スカートです。これは帽子、靴、そして鞄です。\n      \n      クイズをしましょう。私がヒントを言います。聞いてください。よーく聞いてください。そして考えてください。この中の誰のことを言っているか、よく聞いて考えてください。\n      \n      第１問。この人はピンクのTシャツを着ています。黒いスカートを履いています。紫の帽子を被っています。水色の靴を履いています。鞄は持っていません。\n      \n      もう一度言います。この人は、ピンクのTシャツを着て、黒いスカートを履いて、紫の帽子を被って、水色の靴を履いています。誰でしょう。正解はこの人です。\n      \n      第２問。この人は黄緑のTシャツを着ています。白いスカートを履いています。帽子は被っていません。水色の靴を履いています。そして紫の鞄を持っています。誰でしょう。\n      \n      もう一度言いますね。黄緑のTシャツを着て、白いスカートと水色の靴を履いて、紫の鞄を持っています。誰でしょう。正解はこの人ですね。\n      \n      第３問。この人はピンクのTシャツを着ています。黒いズボンを履いています。水色の帽子を被っています。黒い靴を履いています。そして紫の鞄を持っています。\n      \n      もう一度言います。この人はピンクのTシャツを着て、黒いズボンを履いて、水色の帽子を被って、黒い靴を履いて、紫の鞄を持っています。誰でしょう。正解はこの人ですね。\n      \n      第４問。この人はピンクのTシャツを着ています。白いズボンを履いています。紫の帽子を被っています。水色の靴を履いています。そして黄緑の鞄を持っています。誰でしょう。\n      \n      もう一度言います。この人はピンクのTシャツを着て、白いズボンを履いて、紫の帽子を被って、水色の靴を履いて、黄緑の鞄を持っています。誰でしょう。正解はこの人ですね。\n      \n      第５問。この人は黄緑のTシャツを着ています。白いズボンを履いています。帽子は被っていません。黒い靴を履いています。鞄は持っていません。誰でしょう。\n      \n      もう一度言います。この人は黄緑のTシャツを着て、白いズボンと黒い靴を履いています。誰でしょう。正解はこの人ですね。\n      \n      私は今、黄緑のTシャツを着ています。水色のズボンを履いています。帽子は被っていません。家の中にいるので靴は履いていません。\n      \n      皆さんはどうですか。今Tシャツを着ていますか。何色のTシャツを着ていますか。ズボンを履いていますか。それともスカートを履いていますか。何色ですか。帽子は被っていますか。靴は履いていますか。鞄は持っていますか。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "ここに　５人ごにん　人ひとが　います。\n\n      １人ひとり　２人ふたり　３人さんにん　４人よにん　５人ごにん。\n      \n      全部ぜんぶで　５人ごにん　人ひとが　います。\n      \n      これは　色いろです。\n      \n      黒くろ　白しろ　ピンクぴんく　水色みずいろ　黄緑きみどり　紫むらさき。\n      \n      全部ぜんぶで　６色ろくしょく　色いろが　あります。\n      \n      これは　Tシャツてぃーしゃつです。\n      \n      ズボンずぼんです。\n      \n      スカートすかーとです。\n      \n      これは　帽子ぼうし　靴くつ　そして　鞄かばんです。\n      \n      クイズくいずを　しましょう。\n      \n      私わたしが　ヒントひんとを　言いいます。\n      \n      聞きいてください。\n      \n      よーく　聞きいてください。\n      \n      そして　考かんがえてください。\n      \n      この中なかの　誰だれのことを　言いっているか　よく　聞きいて　考かんがえてください。\n      \n      第１問だいいちもん。\n      \n      この人ひとは　ピンクぴんくの　Tシャツてぃーしゃつを　着きています。\n      \n      黒くろい　スカートすかーとを　履はいています。\n      \n      紫むらさきの　帽子ぼうしを　被かぶっています。\n      \n      水色みずいろの　靴くつを　履はいています。\n      \n      鞄かばんは　持もっていません。\n      \n      もう一度いちど　言いいます。\n      \n      この人ひとは　ピンクぴんくの　Tシャツてぃーしゃつを　着きて　黒くろい　スカートすかーとを　履はいて　紫むらさきの　帽子ぼうしを　被かぶって　水色みずいろの　靴くつを　履はいています。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　この人ひとです。\n      \n      第２問だいにもん。\n      \n      この人ひとは　黄緑きみどりの　Tシャツてぃーしゃつを　着きています。\n      \n      白しろい　スカートすかーとを　履はいています。\n      \n      帽子ぼうしは　被かぶっていません。\n      \n      水色みずいろの　靴くつを　履はいています。\n      \n      そして　紫むらさきの　鞄かばんを　持もっています。\n      \n      誰だれでしょう。\n      \n      もう一度いちど　言いいますね。\n      \n      黄緑きみどりの　Tシャツてぃーしゃつを　着きて　白しろい　スカートすかーとと　水色みずいろの　靴くつを　履はいて　紫むらさきの　鞄かばんを　持もっています。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　この人ひとですね。\n      \n      第３問だいさんもん。\n      \n      この人ひとは　ピンクぴんくの　Tシャツてぃーしゃつを　着きています。\n      \n      黒くろい　ズボンを　履はいています。\n      \n      水色みずいろの　帽子ぼうしを　被かぶっています。\n      \n      黒くろい　靴くつを　履はいています。\n      \n      そして　紫むらさきの　鞄かばんを　持もっています。\n      \n      もう一度いちど　言いいます。\n      \n      この人ひとは　ピンクぴんくの　Tシャツてぃーしゃつを　着きて　黒くろい　ズボンずぼんを　履はいて　水色みずいろの　帽子ぼうしを　被かぶって　黒くろい　靴くつを　履はいて　紫むらさきの　鞄かばんを　持もっています。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　この人ひとですね。\n      \n      第４問だいよんもん。\n      \n      この人ひとは　ピンクぴんくの　Tシャツてぃーしゃつを　着きています。\n      \n      白しろい　ズボンずぼんを　履はいています。\n      \n      紫むらさきの　帽子ぼうしを　被かぶっています。\n      \n      水色みずいろの　靴くつを　履はいています。\n      \n      そして　黄緑きみどりの　鞄かばんを　持もっています。\n      \n      誰だれでしょう。\n      \n      もう一度いちど　言いいます。\n      \n      この人ひとは　ピンクぴんくの　Tシャツてぃーしゃつを　着きて　白しろい　ズボンずぼんを　履はいて　紫むらさきの　帽子ぼうしを　被かぶって　水色みずいろの　靴くつを　履はいて　黄緑きみどりの　鞄かばんを　持もっています。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　この人ひとですね。\n      \n      第５問だいごもん。\n      \n      この人ひとは　黄緑きみどりの　Tシャツてぃーしゃつを　着きています。\n      \n      白しろい　ズボンずぼんを　履はいています。\n      \n      帽子ぼうしは　被かぶっていません。\n      \n      黒くろい　靴くつを　履はいています。\n      \n      鞄かばんは　持もっていません。\n      \n      誰だれでしょう。\n      \n      もう一度いちど　言いいます。\n      \n      この人ひとは　黄緑きみどりの　Tシャツてぃーしゃつを　着きて　白しろい　ズボンずぼんと　黒くろい　靴くつを　履はいています。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　この人ひとですね。\n      \n      私わたしは　今いま　黄緑きみどりの　Tシャツてぃーしゃつを　着きています。\n      \n      水色みずいろの　ズボンずぼんを　履はいています。\n      \n      帽子ぼうしは　被かぶっていません。\n      \n      家いえの　中なかに　いるので　靴くつは　履はいていません。\n      \n      皆みなさんは　どうですか。\n      \n      今いま　Tシャツてぃーしゃつを　着きていますか。\n      \n      何色なにいろの　Tシャツてぃーしゃつを　着きていますか。\n      \n      ズボンずぼんを　履はいていますか。\n      \n      それとも　スカートすかーとを　履はいていますか。\n      \n      何色なにいろですか。\n      \n      帽子ぼうしは　被かぶっていますか。\n      \n      靴くつは　履はいていますか。\n      \n      鞄かばんは　持もっていますか。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "私のかばんの中身 What I have in my bag",
      url: "https://cijapanese.com/what-i-have-in-my-bag/",
      level: "complete beginner",
      membership: "free",
      transcript: "これは私のかばんです。私がよく使うかばんです。毎日ではないですがよく使うかばんです。\n\n      私がよく使うこのかばんは、黒いかばんです。赤ではありません。青ではありません。赤でも青でもありません。黒いかばんです。\n      \n      小さいかばんです。大きいかばんではありません。小さいかばんです。\n      \n      長ーい紐が付いています。長い紐が付いています。この紐を肩にかけます。首にはかけません。手には持ちません。肩にかけて持ちます。\n      \n      かばんの中に何が入っているでしょう。開けてみます。チャックを開けます。\n      \n      これは財布です。財布の中には何が入っていますか。財布の中にはお金やカードが入っています。これで買い物をします。\n      \n      他には鍵が入っています。鍵が２つあります。これは家の鍵です。私の家の鍵です。こっちは車の鍵です。私の車の鍵です。\n      \n      他にはハンカチが入っています。これはハンカチです。これで手を拭きます。水で手を洗います。手を洗った後、ハンカチで手を拭きます。\n      \n      あとはスマートフォンも入っています。スマホです。これで電話をします。LINEをします。ツイッターをします。YouTubeを観ます。スマホで電話したりツイッターをしたりLINEをしたりYouTubeを観たりします。\n      \n      これは何でしょう。イヤホンです。イヤホンで音楽やポッドキャストを聴きます。\n      \n      他にはこれ。この赤いケースの中にはキンドルが入っています。キンドルで本を読みます。\n      \n      これは何でしょう。これはバッグです。エコバッグです。買い物をした後、この袋に入れます。\n      \n      今日は私のかばんの中に入っているものを見せました。皆さんのかばんの中には何が入っていますか。\n      \n      今日はこれでおしまい。またね。",
      transcript_furigana: "これは　私わたしの　かばんです。\n\n      私わたしが　よく　使う　かばんです。\n      \n      毎日まいにちではないですが　よく　使つかう　かばんです。\n      \n      私わたしが　よく　使つかう　このかばんは　黒くろい　かばんです。\n      \n      赤あかではありません。\n      \n      青あおではありません。\n      \n      赤あかでも　青あおでもありません。\n      \n      黒くろい　かばんです。\n      \n      小ちいさい　かばんです。\n      \n      大おおきい　かばんではありません。\n      \n      小ちいさい　かばんです。\n      \n      長ながーい　紐ひもが　付ついています。\n      \n      長ながい　紐ひもが　付ついています。\n      \n      この　紐ひもを　肩かたに　かけます。\n      \n      首くびには　かけません。\n      \n      手てには　持もちません。\n      \n      肩かたに　かけて　持もちます。\n      \n      かばんの　中なかに　何なにが　入はいっているでしょう。\n      \n      開あけてみます。\n      \n      チャックちゃっくを　開あけます。\n      \n      これは　財布さいふです。\n      \n      財布さいふの　中なかには　何なにが　入はいっていますか。\n      \n      財布さいふの　中なかには　お金かねや　カードかーどが　入はいっています。\n      \n      これで　買かい物ものを　します。\n      \n      他ほかには　鍵かぎが　入はいっています。\n      \n      鍵かぎが　２ふたつ　あります。\n      \n      これは　家いえの　鍵かぎです。\n      \n      私わたしの　家いえの　鍵かぎです。\n      \n      こっちは　車くるまの　鍵かぎです。\n      \n      私わたしの　車くるまの　鍵かぎです。\n      \n      他ほかには　ハンカチはんかちが　入はいっています。\n      \n      これは　ハンカチはんかちです。\n      \n      これで　手てを　拭ふきます。\n      \n      水みずで　手てを　洗あらいます。\n      \n      手てを　洗あらった後あと　ハンカチはんかちで　手てを　拭ふきます。\n      \n      あとは　スマートフォンすまーとふぉんも　入はいっています。　スマホすまほです。\n      \n      これで　電話でんわを　します。\n      \n      LINEらいんを　します。\n      \n      ツイッターついったーを　します。\n      \n      YouTubeゆーちゅーぶを　観みます。\n      \n      スマホすまほで　電話でんわしたり　ツイッターついったーを　したり　LINEらいんを　したり　YouTubeゆーちゅーぶを　観みたりします。\n      \n      これは　何なんでしょう。\n      \n      イヤホンいやほんです。\n      \n      イヤホンいやほんで　音楽おんがくや　ポッドキャストぽっどきゃすとを　聴ききます。\n      \n      他ほかには　これ。\n      \n      この　赤あかい　ケースけーすの　中なかには　キンドルきんどるが　入はいっています。\n      \n      キンドルきんどるで　本ほんを　読よみます。\n      \n      これは　何なんでしょう。\n      \n      これは　バッグばっぐです。\n      \n      エコバッグえこばっぐです。\n      \n      買かい物ものを　した後あと　この　袋ふくろに　入いれます。\n      \n      今日きょうは　私わたしの　かばんの　中なかに　入はいっているものを　見せました。\n      \n      皆みなさんの　かばんの　中なかには　何なにが　入はいっていますか。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね。"
  },
  {
      title: "七夕 Tanabata Festival",
      url: "https://cijapanese.com/tanabata-festival/",
      level: "intermediate",
      membership: "free",
      transcript: "今日は６月２５日です。もうすぐ６月が終わろうとしています。今年２０２１年も半分が終わろうとしています。早いですね。あっという間ですね。\n\n      もうすぐ６月が終わって７月になります。今日は７月にある日本の行事を紹介します。今日紹介するのは７月７日の七夕という行事です。\n      \n      七夕はある物語に基づいています。この物語は昔中国から日本に伝わったと言われています。今からその七夕という行事の由来となった物語を話しますね。\n      \n      これは空の上の物語です。昔々、織姫という女性と彦星という男性がいました。織姫は神様の娘でした。\n      \n      これは機織りといいます。機織り機という機械で布を織っています。織姫は機織りがとっても上手で、一生懸命機を織る働き者の女性でした。仕事をよく頑張っていました。彦星は牛を育てている牛飼いの青年でした。彼も一生懸命牛を育てる働き者の男性でした。\n      \n      ある時神様が娘の織姫と彦星を引き合わせます。紹介します。二人はすぐに一目見ただけでお互いに惹かれ合います。お互いのことが好きになって恋に落ちました。やがて二人は結婚することになりました。幸せそうですね。いいですね。\n      \n      ところが、結婚した途端、あんなに働き者だった織姫と彦星は働かなくなってしまいました。あんなに仕事熱心だったのに、二人で遊ぶのが楽しすぎて、すっかり怠け者になってしまいました。織姫は機織りをしなくなりました。彦星も牛を育てなくなりました。二人とも真面目に働かなくなってしまいました。\n      \n      そんな二人の様子を見ていた神様は怒ります。結婚した途端に仕事もしないでそんなに遊んでばっかりなら、もう会わせないと言って、神様が二人を引き離してしまうんですね。\n      \n      天の川という星でできた川の両岸に引き離してしまいます。二人はもう会えません。可愛そうですね。\n      \n      織姫はずっと泣いています。彦星に会いたくて泣いています。「彦星に会いたい。彦星に会わせて。」「織姫に会いたい。織姫に会わせて。」と言って二人共悲しんでいます。\n      \n      その様子を見て、怒っていた神様も「これはさすがにかわいそうだな」と思って１年に１回だけ二人を会わせてあげることにしました。「また前みたいにちゃんと働くなら、一生懸命働くなら会わせてあげるよ」と、以前のように真面目に働くことを条件に１年に１度だけ会わせてあげることにしました。\n      \n      毎年７月７日になると、カササギという鳥が飛んできます。この鳥がたくさん集まってきて、織姫と彦星が渡れるように橋を作ってくれます。二人はこの橋を渡って橋の上で１年に１度だけ再会できるようになりました。\n      \n      という物語です。７月７日は織姫と彦星の願いが叶う日ですね。会いたいという願いが叶う日です。なのでこの話が由来となって、７月７日七夕の日に願い事をするようになりました。\n      \n      毎年七夕が近づくと、日本ではこんな飾りをよく見かけます。この緑の葉っぱは笹の葉といいます。笹の葉に色んな色のカラフルな紙が飾ってありますね。これは短冊といいます。\n      \n      短冊をよーく見ると文字が書いてあるのが分かりますか。文字が書いてあるのが見えますか。短冊には願い事が書かれています。\n      \n      例えば、試験に合格しますようにとか、サッカーがうまくなりますように、とか、家族みんな健康で幸せに過ごせますようにとか、そういった自分の願い事を紙に書いて笹に飾ります。これが七夕です。\n      \n      皆さんだったらどんなことをお願いしたいですか。短冊にどんな願い事を書きますか。\n      \n      今日は７月７日七夕の話をしました。今日はこれでおしまい。またね！",
      transcript_furigana: "今日きょうは６月２５日ろくがつにじゅうごにちです。\n\n      もうすぐ６月ろくがつが終おわろうとしています。\n      \n      今年ことし２０２１年にせんにじゅういちねんも半分はんぶんが終おわろうとしています。\n      \n      早はやいですね。あっという間まですね。\n      \n      もうすぐ６月ろくがつが終おわって７月しちがつになります。\n      \n      今日きょうは７月しちがつにある日本にほんの行事ぎょうじを紹介しょうかいします。\n      \n      今日きょう紹介しょうかいするのは７月７日しちがつなのかの七夕たなばたという行事ぎょうじです。\n      \n      七夕たなばたはある物語ものがたりに基づいています。\n      \n      この物語ものがたりは昔むかし中国ちゅうごくから日本にほんに伝つたわったと言いわれています。\n      \n      今いまからその七夕たなばたという行事ぎょうじの由来ゆらいとなった物語ものがたりを話はなしますね。\n      \n      これは空そらの上うえの物語ものがたりです。\n      \n      昔々むかしむかし、織姫おりひめという女性じょせいと彦星ひこぼしという男性だんせいがいました。\n      \n      織姫おりひめは神様かみさまの娘むすめでした。\n      \n      これは機織はたおりといいます。\n      \n      機織はたおり機きという機械きかいで布ぬのを織おっています。\n      \n      織姫おりひめは機織はたおりがとっても上手じょうずで、一生懸命いっしょうけんめい機はたを織おる働はたらき者ものの女性じょせいでした。\n      \n      仕事しごとをよく頑張がんばっていました。\n      \n      彦星ひこぼしは牛うしを育そだてている牛飼うしかいの青年せいねんでした。\n      \n      彼かれも一生懸命いっしょうけんめい牛うしを育そだてる働はたらき者ものの男性だんせいでした。\n      \n      ある時とき神様かみさまが娘むすめの織姫おりひめと彦星ひこぼしを引ひき合あわせます。紹介しょうかいします。\n      \n      二人ふたりはすぐに一目ひとめ見みただけでお互たがいに惹ひかれ合あいます。\n      \n      お互たがいのことが好すきになって恋こいに落おちました。\n      \n      やがて二人ふたりは結婚けっこんすることになりました。\n      \n      幸しあわせそうですね。いいですね。\n      \n      ところが、結婚けっこんした途端とたん、あんなに働はたらき者ものだった織姫おりひめと彦星ひこぼしは働はたらかなくなってしまいました。\n      \n      あんなに仕事しごと熱心ねっしんだったのに、二人ふたりで遊あそぶのが楽たのしすぎて、すっかり怠なまけ者ものになってしまいました。\n      \n      織姫おりひめは機織はたおりをしなくなりました。\n      \n      彦星ひこぼしも牛うしを育そだてなくなりました。\n      \n      二人ふたりとも真面目まじめに働はたらかなくなってしまいました。\n      \n      そんな二人ふたりの様子ようすを見みていた神様かみさまは怒おこります。\n      \n      結婚けっこんした途端とたんに仕事しごともしないでそんなに遊あそんでばっかりなら、もう会あわせないと言いって、神様かみさまが二人ふたりを引ひき離はなしてしまうんですね。\n      \n      天あまの川がわという星ほしでできた川かわの両岸りょうぎしに引ひき離はなしてしまいます。\n      \n      二人ふたりはもう会あえません。可愛かわいそうですね。\n      \n      織姫おりひめはずっと泣ないています。\n      \n      彦星ひこぼしに会あいたくて泣ないています。\n      \n      「彦星ひこぼしに会あいたい。彦星ひこぼしに会あわせて。」「織姫おりひめに会あいたい。織姫おりひめに会あわせて。」と言いって二人共ふたりとも悲かなしんでいます。\n      \n      その様子ようすを見みて、怒おこっていた神様かみさまも「これはさすがにかわいそうだな」と思おもって１年いちねんに１回いっかいだけ二人ふたりを会あわせてあげることにしました。\n      \n      「また前まえみたいにちゃんと働はたらくなら、一生懸命いっしょうけんめい働はたらくなら会あわせてあげるよ」と、以前いぜんのように真面目まじめに働はたらくことを条件じょうけんに１年いちねんに１度いちどだけ会あわせてあげることにしました。\n      \n      毎年まいとし７月７日しちがつなのかになると、カササギかささぎという鳥とりが飛とんできます。\n      \n      この鳥とりがたくさん集あつまってきて、織姫おりひめと彦星ひこぼしが渡わたれるように橋はしを作つくってくれます。\n      \n      二人ふたりはこの橋はしを渡わたって橋はしの上うえで１年いちねんに１度いちどだけ再会さいかいできるようになりました。\n      \n      という物語ものがたりです。\n      \n      ７月７日しちがつなのかは織姫おりひめと彦星ひこぼしの願ねがいが叶かなう日ひですね。\n      \n      会あいたいという願ねがいが叶かなう日ひです。\n      \n      なのでこの話はなしが由来ゆらいとなって、７月７日しちがつなのか七夕たなばたの日ひに願ねがい事ごとをするようになりました。\n      \n      毎年まいとし七夕たなばたが近ちかづくと、日本にほんではこんな飾かざりをよく見みかけます。\n      \n      この緑みどりの葉はっぱは笹ささの葉はといいます。\n      \n      笹ささの葉はに色いろんな色いろのカラフルからふるな紙かみが飾かざってありますね。\n      \n      これは短冊たんざくといいます。\n      \n      短冊たんざくをよーく見みると文字もじが書かいてあるのが分わかりますか。\n      \n      文字もじが書かいてあるのが見みえますか。\n      \n      短冊たんざくには願ねがい事ごとが書かかれています。\n      \n      例たとえば、試験しけんに合格ごうかくしますようにとか、サッカーさっかーがうまくなりますように、とか、家族かぞくみんな健康けんこうで幸しあわせに過すごせますようにとか、そういった自分じぶんの願ねがい事ごとを紙かみに書かいて笹ささに飾かざります。\n      \n      これが七夕たなばたです。\n      \n      皆みなさんだったらどんなことをお願ねがいしたいですか。\n      \n      短冊たんざくにどんな願ねがい事ごとを書かきますか。\n      \n      今日きょうは７月７日しちがつなのか七夕たなばたの話はなしをしました。今日きょうはこれでおしまい。またね！"
  },
  {
      title: "ジブリ映画クイズ Ghibli Movie Quiz",
      url: "https://cijapanese.com/ghibli-movie-quiz/",
      level: "beginner",
      membership: "free",
      transcript: "この映画を知っていますか。これは「魔女の宅急便」という映画です。見たことありますか。この映画は知っていますか。これは「となりのトトロ」という映画です。見たことありますか。これは全部ジブリの映画です。ジブリの映画、見たことありますか。好きですか。今日はジブリ映画のクイズをしたいと思います。\n\n      この女の子は誰でしょう。彼女の名前はキキといいます。「魔女の宅急便」の主人公です。この子の名前はサツキといいます。「となりのトトロ」に出てくる女の子です。この子の名前は千尋です。「千と千尋の神隠し」の主人公です。この子はポニョです。「崖の上のポニョ」の主人公です。そしてこの女の子はナウシカです。「風の谷のナウシカ」の主人公です。\n      \n      今から私がヒントを言います。誰のことを話しているか考えてください。\n      \n      第一問。この子は５歳です。ハムが大好きです。ハムが大好物です。そうすけという男の子と友達になります。顔は人間です。顔は人です。でも体は魚です。顔は人間で体は魚です。ピンク色の魚です。誰でしょう。\n      \n      正解はポニョです。\n      \n      第２問。この子は１３歳です。ここはパン屋さんです。この子はパン屋さんで働きます。パン屋さんで仕事をします。トンボという名前の男の子と友だちになります。頭に赤いリボンをつけています。黒猫のジジといつも一緒にいます。この子は魔女です。ほうきに乗って飛びます。誰でしょう。\n      \n      正解はキキです。\n      \n      第３問。この子は１２歳です。お父さんと妹と一緒に暮らしています。お母さんは病院に入院しています。妹の名前はメイです。猫のバスに乗ります。そしてトトロと友達になります。誰でしょう。\n      \n      正解はサツキです。\n      \n      第４問。この子は１６歳です。鳥と馬が混ざった「とりうま」という動物に乗っています。そしてキツネとリスが混ざった「キツネリス」という動物をいつも肩に乗せています。こんな白い乗り物に乗って空を飛びます。水色の服を着ています。誰でしょう。\n      \n      正解はナウシカです。\n      \n      第５問。この子は１０歳です。ここで働きます。ここで仕事をします。ハクという名前の少年と友達になります。この子のお父さんとお母さん、両親は豚になってしまいます。誰でしょう。\n      \n      正解は千尋です。\n      \n      今日はジブリ映画のクイズをしました。皆さんが一番好きなジブリ映画は何ですか。私は「魔女の宅急便」が一番好きです。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "この　映画えいがを　知しっていますか。\n\n      これは　「魔女まじょの　宅急便たっきゅうびん」という　映画えいがです。\n      \n      見みたこと　ありますか。\n      \n      この　映画えいがは　知しっていますか。\n      \n      これは　「となりの　トトロととろ」という　映画えいがです。\n      \n      見みたこと　ありますか。\n      \n      これは　全部ぜんぶ　ジブリじぶりの　映画えいがです。\n      \n      ジブリじぶりの　映画えいが、　見みたこと　ありますか。\n      \n      好すきですか。\n      \n      今日きょうは　ジブリじぶり映画えいがの　クイズくいずを　したいと　思おもいます。\n      \n      この　女おんなの子こは　誰だれでしょう。\n      \n      彼女かのじょの　名前なまえは　キキききと　いいます。\n      \n      「魔女まじょの　宅急便たっきゅうびん」の　主人公しゅじんこうです。\n      \n      この子この　名前なまえは　サツキさつきと　いいます。\n      \n      「となりの　トトロととろ」に　出でてくる　女おんなの子こです。\n      \n      この子の　名前なまえは　千尋ちひろです。\n      \n      「千せんと　千尋ちひろの　神隠かみかくし」の　主人公しゅじんこうです。\n      \n      この子こは　ポニョぽにょです。\n      \n      「崖がけの　上うえの　ポニョぽにょ」の　主人公しゅじんこうです。\n      \n      そして　この女おんなの子こは　ナウシカなうしかです。\n      \n      「風かぜの　谷たにの　ナウシカなうしか」の　主人公しゅじんこうです。\n      \n      今いまから　私わたしが　ヒントひんとを　言いいます。\n      \n      誰だれのことを　話はなしているか　考かんがえてください。\n      \n      第一問だいいちもん。\n      \n      この子こは　５歳ごさいです。\n      \n      ハムはむが　大好だいすきです。\n      \n      ハムはむが　大好物だいこうぶつです。\n      \n      そうすけという　男おとこの子こと　友達ともだちに　なります。\n      \n      顔かおは　人間にんげんです。\n      \n      顔かおは　人ひとです。\n      \n      でも　体からだは　魚さかなです。\n      \n      顔かおは　人間にんげんで　体からだは　魚さかなです。\n      \n      ピンク色ぴんくいろの　魚さかなです。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　ポニョぽにょです。\n      \n      第２問だいにもん。\n      \n      この子こは　１３歳じゅうさんさいです。\n      \n      ここは　パン屋ぱんやさんです。\n      \n      この子こは　パン屋ぱんやさんで　働はたきます。\n      \n      パン屋ぱんやさんで　仕事しごとを　します。\n      \n      トンボとんぼという　名前なまえの　男おとこの子こと　友達ともだちに　なります。\n      \n      頭あたまに　赤あかい　リボンりぼんを　つけています。\n      \n      黒猫くろねこの　ジジじじと　いつも　一緒いっしょに　います。\n      \n      この子こは　魔女まじょです。\n      \n      ほうきに　乗のって　飛とびます。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　キキききです。\n      \n      第３問だいさんもん。\n      \n      この子こは　１２歳じゅうにさいです。\n      \n      お父とうさんと　妹いもうとと　一緒いっしょに　暮くらしています。\n      \n      お母かあさんは　病院びょういんに　入院にゅういんしています。\n      \n      妹いもうとの　名前なまえは　メイめいです。\n      \n      猫ねこの　バスばすに　乗のります。\n      \n      そして　トトロととろと　友達ともだちに　なります。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　サツキさつきです。\n      \n      第４問だいよんもん。\n      \n      この子こは　１６歳じゅうろくさいです。\n      \n      鳥とりと　馬うまが　混まざった　「とりうま」という　動物どうぶつに　乗のっています。\n      \n      そして　キツネきつねと　リスりすが　混まざった　「キツネリスきつねりす」という　動物どうぶつを　いつも　肩かたに　乗のせています。\n      \n      こんな　白しろい　乗のり物ものに　乗のって　空そらを　飛とびます。\n      \n      水色みずいろの　服ふくを　着きています。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　ナウシカなうしかです。\n      \n      第５問だいごもん。\n      \n      この子こは　１０歳じゅっさいです。\n      \n      ここで　働はたらきます。\n      \n      ここで　仕事しごとを　します。\n      \n      ハクはくという　名前なまえの　少年しょうねんと　友達ともだちに　なります。\n      \n      この子この　お父とうさんと　お母かあさん、　両親りょうしんは　豚ぶたに　なってしまいます。\n      \n      誰だれでしょう。\n      \n      正解せいかいは　千尋ちひろです。\n      \n      今日きょうは　ジブリじぶり映画えいがの　クイズくいずを　しました。\n      \n      皆みなさんが　一番いちばん　好すきな　ジブリじぶり映画えいがは　何なんですか。\n      \n      私わたしは　「魔女まじょの　宅急便たっきゅうびん」が　一番いちばん　好すきです。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "どうやって行く？ How do you get there?",
      url: "https://cijapanese.com/how-do-you-get-there/",
      level: "complete beginner",
      membership: "free",
      transcript: "ここは私の家です。私の家です。ここは公園です。ここはスーパーです。買い物をします。ここはデパートです。買い物をします。ここはどこですか。ここはフランスです。\n\n      私の家から公園は近いです。遠くないです。近いです。スーパーも近いです。遠くないです。デパートはちょっと遠いです。近くないです。少し遠いです。フランスはどうですか。フランスは近いですか。それとも遠いですか。フランスは近くないですね。遠いです。日本からフランスはとっても遠いです。\n      \n      公園に行きます。どうやって行きますか。歩いて行きます。家から公園まで歩いて行きます。\n      \n      スーパーに行きます。スーパーにはどうやって行きますか。飛行機で行きますか。スーパーに飛行機で行きますか。飛行機では行きません。私は車で行きます。私はいつもスーパーに車で行きます。\n      \n      デパートに行きます。デパートにはどうやって行きますか。デパートはちょっと遠いです。なので歩いては行けません。歩いて行くことはできません。少し遠いので歩いて行けません。私は電車で行きます。家からデパートまで電車で行きます。\n      \n      フランスに行きます。行きたいです。フランスにはどうやって行きますか。フランスはとっても遠いです。日本からフランスはすごく遠いです。歩いて行けますか。歩いて行けません。車で行けますか。日本からフランスまで車で行けますか。日本からフランスまで電車で行けますか。車でも電車でも行けません。\n      \n      船はどうですか。船で行けますか。日本からフランスまで船で行けますか。船で行けます。船で行くことができます。でも、船で行けますが、時間がかかります。時間がたくさんかかります。なので飛行機で行きます。飛行機で行きます。船は遅いです。時間がかかります。飛行機は速いです。船よりも飛行機の方が速いです。\n      \n      皆さんはどうですか。家からスーパーまでどうやって行きますか。車で行きますか。歩いて行きますか。学校にはどうやって行きますか。学校にはどうやって行きますか。電車で行きますか。バスで行きますか。会社にはどうやって行きますか。自転車で行きますか。飛行機で行きますか。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "ここは　私わたしの　家いえです。\n\n      私わたしの　家いえです。\n      \n      ここは　公園こうえんです。\n      \n      ここは　スーパーすーぱーです。\n      \n      買かい物ものを　します。\n      \n      ここは　デパートでぱーとです。\n      \n      買かい物ものを　します。\n      \n      ここは　どこですか。\n      \n      ここは　フランスふらんすです。\n      \n      私わたしの　家いえから　公園こうえんは　近ちかいです。\n      \n      遠とおくないです。\n      \n      近ちかいです。\n      \n      スーパーすーぱーも　近ちかいです。\n      \n      遠とおくないです。\n      \n      デパートでぱーとは　ちょっと　遠とおいです。\n      \n      近ちかくないです。\n      \n      少すこし　遠とおいです。\n      \n      フランスふらんすは　どうですか。\n      \n      フランスふらんすは　近ちかいですか。\n      \n      それとも　遠とおいですか。\n      \n      フランスふらんすは　近ちかくないですね。\n      \n      遠とおいです。\n      \n      日本にほんから　フランスふらんすは　とっても　遠とおいです。\n      \n      公園こうえんに　行いきます。\n      \n      どうやって　行いきますか。\n      \n      歩あるいて　行いきます。\n      \n      家いえから　公園こうえんまで　歩あるいて　行いきます。\n      \n      スーパーすーぱーに　行いきます。\n      \n      スーパーすーぱーには　どうやって　行いきますか。\n      \n      飛行機ひこうきで　行いきますか。\n      \n      スーパーすーぱーに　飛行機ひこうきで　行いきますか。\n      \n      飛行機ひこうきでは　行いきません。\n      \n      私わたしは　車くるまで　行いきます。\n      \n      私は　いつも　スーパーすーぱーに　車くるまで　行いきます。\n      \n      デパートでぱーとに　行いきます。\n      \n      デパートでぱーとには　どうやって　行いきますか。\n      \n      デパートでぱーとは　ちょっと　遠とおいです。\n      \n      なので　歩あるいては　行いけません。\n      \n      歩あるいて　行いくことは　できません。\n      \n      少すこし　遠とおいので　歩あるいて　行いけません。\n      \n      私わたしは　電車でんしゃで　行いきます。\n      \n      家いえから　デパートでぱーとまで　電車でんしゃで　行いきます。\n      \n      フランスふらんすに　行いきます。\n      \n      行いきたいです。\n      \n      フランスふらんすには　どうやって　行いきますか。\n      \n      フランスふらんすは　とっても　遠とおいです。\n      \n      日本にほんから　フランスふらんすは　すごく　遠とおいです。\n      \n      歩あるいて　行いけますか。\n      \n      歩あるいて　行いけません。\n      \n      車くるまで　行いけますか。\n      \n      日本にほんから　フランスふらんすまで　車くるまで　行いけますか。\n      \n      日本にほんから　フランスふらんすまで　電車でんしゃで　行いけますか。\n      \n      車くるまでも　電車でんしゃでも　行いけません。\n      \n      船ふねは　どうですか。\n      \n      船ふねで　行いけますか。\n      \n      日本にほんから　フランスふらんすまで　船ふねで　行いけますか。\n      \n      船ふねで　行いけます。\n      \n      船ふねで　行いくことが　できます。\n      \n      でも　船ふねで　行いけますが　時間じかんが　かかります。\n      \n      時間じかんが　たくさん　かかります。\n      \n      なので　飛行機ひこうきで　行きます。\n      \n      飛行機ひこうきで　行いきます。\n      \n      船ふねは　遅おそいです。\n      \n      時間じかんが　かかります。\n      \n      飛行機ひこうきは　速はやいです。\n      \n      船ふねよりも　飛行機ひこうきの　方ほうが　速はやいです。\n      \n      皆みなさんは　どうですか。\n      \n      家いえから　スーパーすーぱーまで　どうやって　行いきますか。\n      \n      車くるまで　行いきますか。\n      \n      歩あるいて　行いきますか。\n      \n      学校がっこうには　どうやって　行いきますか。\n      \n      学校がっこうには　どうやって　行いきますか。\n      \n      電車でんしゃで　行いきますか。　\n      \n      バスばすで　行いきますか。\n      \n      会社かいしゃには　どうやって　行いきますか。\n      \n      自転車じてんしゃで　行いきますか。\n      \n      飛行機ひこうきで　行いきますか。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "わかりやすい日本語で私のウェブサイト紹介 Introduction to my website in Comprehensible Japanese",
      url: "https://cijapanese.com/introduction-to-my-website-in-comprehensible-japanese/",
      level: "beginner",
      membership: "free",
      transcript: "こんにちは。今日の動画では、私のウェブサイトを皆さんに紹介したいと思います。”cijapanese.com” これが私のウェブサイトです。皆さん、使ったことはありますか。もう使ってみましたか。\n\n      まずこのページを開いてみます。ここは私とこのサイトの紹介のページです。ここに私の写真があります。日本語と英語でサイトの紹介が書かれています。\n      \n      このページを開いてみます。ここは動画の検索のページです。超初心者、初級、中級、３つのレベルがあります。ここではレベルごとに動画の検索ができます。例えば、超初心者を選ぶと超初心者向けの動画が出てきます。初級を選ぶと初級の動画が出てきます。中級を選ぶと中級の動画が出てきます。\n      \n      トピックごとに検索することもできますよ。例えば、日本の文化、日本の文化に興味がある人は、日本の文化を選ぶと、日本の文化に関する動画が出てきます。アニメや漫画に興味がある人は、アニメ、漫画を選ぶと、アニメと漫画に関する動画が出てきます。\n      \n      ここに文字を入力して検索することもできますよ。例えば夏、夏とここに入力すると、夏という言葉が使われた動画が出てきます。\n      \n      一つ動画を開いてみましょう。ここをクリックするともう観ました、視聴済みのマークをつけることができます。ここをクリックするとプレイリストに追加することができます。このプレイリストのページを開いてみましょう。ここに追加されています。\n      \n      動画の下にはスクリプトがあります。すべての動画のスクリプトを読むことができます。超初心者と初級の動画には３種類のスクリプトがあります。１、２、３。３種類のスクリプトがあります。１つ目はふりがなとスペースがあるスクリプトです。２つ目はふりがながあるスクリプトです。スペースはありません。３つ目はふりがなもスペースもないスクリプトです。\n      \n      中級の動画には２種類のスクリプトがあります。１つ目はふりがながあるスクリプトです。２つ目はふりがながないスクリプトです。日本語を読む練習にぜひ使ってくださいね。\n      \n      スクリプトの下にはタグがあります。例えば昔話の動画をもっと観たいと思ったら、ここをクリックすれば、昔話の動画が出てきます。クイズやゲームの動画がもっと観たいと思ったら、ここをクリックすればクイズやゲームの動画が出てきます。\n      \n      あとはここ。このページを開いてみましょう。このページには私が皆さんにおすすめする、私が良いと思う、日本語の学習リソースが載っています。日本語のページと英語のページがあります。おすすめのYouTubeやポッドキャストやリーディング教材が載っているので、ぜひ参考にしてください。\n      \n      このサイトには、無料の動画と会員限定の動画があります。無料の動画はYouTubeにある動画と同じものです。無料の動画はYouTubeで観ることができます。会員限定の動画はYouTubeでは観ることができません。このサイトでしか観ることができません。\n      \n      もし私の動画をもっと観たい、もっとたくさん観て日本語を学びたいと思った方は、ぜひ会員登録をしてくださいね！\n      \n      今日は私のウェブサイトを皆さんに紹介しました。皆さんが日本語を学習するお手伝いができたら、役に立てたら、私はとっても嬉しいです。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "こんにちは。\n\n      今日きょうの　動画どうがでは　私わたしの　ウェブサイトうぇぶさいとを　皆みなさんに　紹介しょうかいしたいと　思おもいます。\n      \n      “cijapanese.com” 　これが　私わたしの　ウェブサイトうぇぶさいとです。\n      \n      皆みなさん　使つかったことは　ありますか。\n      \n      もう　使つかってみましたか。\n      \n      まず　この　ページぺーじを　開ひらいてみます。\n      \n      ここは　私わたしと　この　サイトさいとの　紹介しょうかいの　ページぺーじです。\n      \n      ここに　私わたしの　写真しゃしんが　あります。\n      \n      日本語にほんごと　英語えいごで　サイトさいとの　紹介しょうかいが　書かかれています。\n      \n      この　ページぺーじを　開ひらいてみます。\n      \n      ここは　動画どうがの　検索けんさくの　ページぺーじです。\n      \n      超初心者ちょうしょしんしゃ　初級しょきゅう　中級ちゅうきゅう　３みっつの　レベルれべるが　あります。\n      \n      ここでは　レベルれべるごとに　動画どうがの　検索けんさくが　できます。\n      \n      例たとえば　超初心者ちょうしょしんしゃを　選えらぶと　超初心者ちょうしょしんしゃ向むけの　動画どうがが　出でてきます。\n      \n      初級しょきゅうを　選えらぶと　初級しょきゅうの　動画どうがが　出でてきます。\n      \n      中級ちゅうきゅうを　選えらぶと　中級ちゅうきゅうの　動画どうがが　出でてきます。\n      \n      トピックとぴっくごとに　検索けんさくすることも　できますよ。\n      \n      例たとえば　日本にほんの　文化ぶんか　日本にほんの　文化ぶんかに　興味きょうみが　ある人ひとは　日本にほんの　文化ぶんかを　選えらぶと　日本にほんの　文化ぶんかに　関かんする　動画どうがが　出でてきます。\n      \n      アニメあにめや　漫画まんがに　興味きょうみが　ある人ひとは　アニメあにめ　漫画まんがを　選えらぶと　アニメあにめと　漫画まんがに　関かんする　動画どうがが　出でてきます。\n      \n      ここに　文字もじを　入力にゅうりょくして　検索けんさくすることも　できますよ。\n      \n      例たとえば　夏なつ　夏なつと　ここに　入力にゅうりょくすると　夏なつという　言葉ことばが　使つかわれた　動画どうがが　出でてきます。\n      \n      一ひとつ　動画どうがを　開ひらいてみましょう。\n      \n      ここを　クリックくりっくすると　もう　観みました　視聴済しちょうずみの　マークまーくを　つけることが　できます。\n      \n      ここを　クリックくりっくすると　プレイリストぷれいりすとに　追加ついかすることが　できます。\n      \n      この　プレイリストぷれいりすとの　ページぺーじを　開ひらいてみましょう。\n      \n      ここに　追加ついかされています。\n      \n      動画どうがの　下したには　スクリプトすくりぷとが　あります。\n      \n      すべての　動画どうがの　スクリプトすくりぷとを　読よむことが　できます。\n      \n      超初心者ちょうしょしんしゃと　初級しょきゅうの　動画どうがには　３種類さんしゅるいの　スクリプトすくりぷとが　あります。\n      \n      １いち、２に、３さん。\n      \n      ３種類さんしゅるいの　スクリプトすくりぷとが　あります。\n      \n      １ひとつ目めは　ふりがなと　スペースすぺーすが　ある　スクリプトすくりぷとです。\n      \n      ２ふたつ目めは　ふりがなが　ある　スクリプトすくりぷとです。\n      \n      スペースすぺーすは　ありません。\n      \n      ３みつ目めは　ふりがなも　スペースすぺーすも　ない　スクリプトすくりぷとです。\n      \n      中級ちゅうきゅうの　動画どうがには　２種類にしゅるいの　スクリプトすくりぷとが　あります。\n      \n      １ひとつ目めは　ふりがなが　ある　スクリプトすくりぷとです。\n      \n      ２ふたつ目めは　ふりがなが　ない　スクリプトすくりぷとです。\n      \n      日本語にほんごを　読よむ　練習れんしゅうに　ぜひ　使つかってくださいね。\n      \n      スクリプトすくりぷとの　下したには　タグたぐが　あります。\n      \n      例たとえば　昔話むかしばなしの　動画どうがを　もっと　観みたいと　思おもったら　ここを　クリックくりっくすれば　昔話むかしばなしの　動画どうがが　出でてきます。\n      \n      クイズくいずや　ゲームげーむの　動画どうがが　もっと　観みたいと　思おもったら　ここを　クリックくりっくすれば　クイズくいずや　ゲームげーむの　動画どうがが　出でてきます。\n      \n      あとは　ここ。\n      \n      この　ページぺーじを　開ひらいてみましょう。\n      \n      この　ページぺーじには　私わたしが　皆みなさんに　おすすめする　私わたしが　良いいと　思おもう　日本語にほんごの　学習がくしゅうリソースりそーすが　載のっています。\n      \n      日本語にほんごの　ページぺーじと　英語えいごの　ページぺーじが　あります。\n      \n      おすすめの　YouTubeゆーちゅーぶや　ポッドキャストぽっどきゃすとや　リーディングりーでぃんぐ教材きょうざいが　載のっているので　ぜひ　参考さんこうに　してください。\n      \n      この　サイトさいとには　無料むりょうの　動画どうがと　会員限定かいいんげんていの　動画どうがが　あります。\n      \n      無料むりょうの　動画どうがは　YouTubeゆーちゅーぶに　ある　動画どうがと　同おなじものです。\n      \n      無料むりょうの　動画どうがは　YouTubeゆーちゅーぶで　観みることが　できます。\n      \n      会員限定かいいんげんていの　動画どうがは　YouTubeゆーちゅーぶでは　観みることが　できません。\n      \n      この　サイトさいとでしか　観みることが　できません。\n      \n      もし　私わたしの　動画どうがを　もっと　観みたい　もっと　たくさん　観みて　日本語にほんごを　学まなびたいと　思おもった方かたは　ぜひ　会員登録かいいんとうろくを　してくださいね！\n      \n      今日きょうは　私わたしの　ウェブサイトうぇぶさいとを　皆みなさんに　紹介しょうかいしました。\n      \n      皆みなさんが　日本語にほんごを　学習がくしゅうする　お手伝てつだいが　できたら　役やくに　立たてたら　私わたしは　とっても　嬉うれしいです。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "猫は何をしてる？ What is the cat doing?",
      url: "https://cijapanese.com/what-is-the-cat-doing/",
      level: "complete beginner",
      membership: "free",
      transcript: "これは猫です。猫は好きですか。これは猫の写真です。写真です。色々な猫の写真があります。今日の動画では猫の写真を見ながら話します。\n\n      この猫は立っています。この猫は立っています。この猫は立っていますか。それとも座っていますか。この猫は座っています。立っていません。座っています。\n      \n      私は今座っています。立っていません。私は今椅子に座っています。皆さんは今立っていますか。それとも座っていますか。ソファに座っていますか。それとも椅子に座っていますか。\n      \n      この猫は何をしていますか。この猫は寝ています。この猫も寝ています。目を閉じて寝ています。\n      \n      この猫は寝ていますか。この猫は寝ていません。この猫は歩いています。この猫も歩いています。\n      \n      この猫は何をしていますか。寝ていますか。歩いていますか。それとも食べていますか。この猫は食べています。この猫たちも食べています。猫が１匹います。猫が３匹います。１匹で食べています。３匹で食べています。\n      \n      この猫は何をしていますか。寝ていますか。食べていますか。寝ていません。食べていません。この猫は今遊んでいます。\n      \n      この猫は何をしていますか。テレビを見ていますか。それともパソコンを見ていますか。この猫はパソコンを見ています。この猫はどうですか。何を見ていますか。この猫はスマホを見ています。\n      \n      私は今何をしていますか。私は今動画を撮影しています。私は今喋っています。皆さんは今何をしていますか。食べていますか。歩いていますか。寝ていますか。皆さんは今動画を見ています。皆さんは今動画を見て日本語を勉強しています。\n      \n      今日は猫の写真を見ながら話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "これは　猫ねこです。\n\n      猫ねこは　好すきですか。\n      \n      これは　猫ねこの　写真しゃしんです。\n      \n      写真しゃしんです。\n      \n      色々いろいろな　猫ねこの　写真しゃしんが　あります。\n      \n      今日きょうの　動画どうがでは　猫ねこの　写真しゃしんを　見みながら　話はなします。\n      \n      この　猫ねこは　立たっています。\n      \n      この　猫ねこは　立たっています。\n      \n      この　猫ねこは　立たっていますか。\n      \n      それとも　座すわっていますか。\n      \n      この　猫ねこは　座すわっています。\n      \n      立たっていません。\n      \n      座すわっています。\n      \n      私わたしは　今いま　座すわっています。\n      \n      立たっていません。\n      \n      私わたしは　今いま　椅子いすに　座すわっています。\n      \n      皆みなさんは　今いま　立たっていますか。\n      \n      それとも　座すわっていますか。\n      \n      ソファそふぁに　座すわっていますか。\n      \n      それとも　椅子いすに　座すわっていますか。\n      \n      この　猫ねこは　何なにを　していますか。\n      \n      この　猫ねこは　寝ねています。\n      \n      この　猫ねこも　寝ねています。\n      \n      目めを　閉とじて　寝ねています。\n      \n      この　猫ねこは　寝ねていますか。\n      \n      この　猫ねこは　寝ねていません。\n      \n      この　猫ねこは　歩あるいています。\n      \n      この　猫ねこも　歩あるいています。\n      \n      この　猫ねこは　何なにを　していますか。\n      \n      寝ねていますか。\n      \n      歩あるいていますか。\n      \n      それとも　食たべていますか。\n      \n      この　猫ねこは　食たべています。\n      \n      この　猫ねこたちも　食たべています。\n      \n      猫ねこが　１匹いっぴき　います。\n      \n      猫ねこが　３匹さんびき　います。\n      \n      １匹いっぴきで　食たべています。\n      \n      ３匹さんびきで　食たべています。\n      \n      この　猫ねこは　何なにを　していますか。\n      \n      寝ねていますか。\n      \n      食たべていますか。\n      \n      寝ねていません。\n      \n      食たべていません。\n      \n      この　猫ねこは　今いま　遊あそんでいます。\n      \n      この　猫ねこは　何なにを　していますか。\n      \n      テレビてれびを　見みていますか。\n      \n      それとも　パソコンぱそこんを　見みていますか。\n      \n      この　猫ねこは　パソコンぱそこんを　見みています。\n      \n      この　猫ねこは　どうですか。\n      \n      何なにを　見みていますか。\n      \n      この　猫ねこは　スマホすまほを　見みています。\n      \n      私わたしは　今いま　何なにを　していますか。\n      \n      私わたしは　今いま　動画どうがを　撮影さつえいしています。\n      \n      私わたしは　今いま　喋しゃべっています。\n      \n      皆みなさんは　今いま　何なにを　していますか。\n      \n      食たべていますか。\n      \n      歩あるいていますか。\n      \n      寝ねていますか。\n      \n      皆みなさんは　今いま　動画どうがを　見みています。\n      \n      皆みなさんは　今いま　動画どうがを　見みて　日本語にほんごを　勉強べんきょうしています。\n      \n      今日きょうは　猫ねこの　写真しゃしんを　見みながら　話はなしました。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "お盆の風習 Traditions of Obon Festival",
      url: "https://cijapanese.com/traditions-of-obon-festival/",
      level: "intermediate",
      membership: "free",
      transcript: "今日は８月６日です。もうすぐ日本ではお盆と言われる行事があります。地域によっても違いますが、一般的には８月１３日から１６日のことをお盆と言います。\n\n      お盆の期間には多くの人が生まれ育った故郷に帰って、家族と一緒に過ごします。多くの人が両親が住む実家に帰省します。\n      \n      私は子供の頃、家族で静岡県に住んでいたんですけど、毎年お盆の時期には大分県の父の実家に帰省していました。父が生まれ育った家、私の祖父母が住む家に帰省して、祖父母や親戚と一緒に過ごしていました。結婚して以来は、毎年お盆に私の実家と夫の実家両方に帰省しています。\n      \n      お盆は元々仏教の行事です。死んでしまった人、亡くなった人の霊はあの世にありますが、年に一度お盆の期間だけ亡くなった人の霊があの世からこの世に戻ってくると考えられています。\n      \n      亡くなった私のおじいちゃんやおばあちゃん、ひいおじいちゃん、ひいおばあちゃん、ひいひいおじいちゃん、ひいひいおばあちゃん、この人達は私の先祖、ご先祖様です。お盆は家族、それからご先祖様と一緒に過ごす期間です。\n      \n      お盆の過ごし方は、地域によっても家庭によっても違いがあります。今日の動画では昔からの習わし、お盆の風習をいくつか紹介したいと思います。\n      \n      まずお盆の初日、１３日には、家の前でこんな風に迎え火と言われる火をつけたり提灯を飾ったりします。お盆にはご先祖様の霊が家に帰ってきます。ご先祖様が道に迷わないように、道に迷わずにちゃんと家に帰って来れるように、目印として迎え火をしたり提灯を飾ったりします。火や提灯があれば「あ！あそこが家だ！」とご先祖様がわかるからです。\n      \n      私の父の実家では、火をつけたり提灯を飾ったりはしていません。その代わりにお墓までご先祖様を迎えに行きます。１３日にお墓に行ってお墓参りをして、あの世から戻ってきたご先祖様と一緒に家に帰ります。\n      \n      精霊馬と呼ばれるきゅうりで作った馬と、精霊牛と呼ばれるナスで作った牛を飾る地域もあります。ご先祖様に早く会いたいです。早くこの世に帰ってきてほしいです。なので、馬に乗って早く帰って来てくださいという願いを込めてきゅうりの馬を飾ります。逆にあの世に戻る時にはゆっくり帰ってほしいです。牛に乗ってこの世での時間を楽しみながらゆっくりあの世に戻ってくださいという願いを込めてナスの牛を飾ります。\n      \n      昔ながらの日本の家には、仏壇と言われるこんなものがあります。お盆の間は仏壇にご先祖様の食事をお供えします。１日３食、朝昼晩、ご先祖様の分の食事を作って仏壇に置いておきます。\n      \n      また、お盆の期間中には日本全国で盆踊りが開催されます。こんな風にみんなで輪になって踊りを踊ります。見て下さい、浴衣を着ている人がたくさんいますね。盆踊りは元々は、亡くなった人のことを思って、亡くなった人を供養するための踊りですが、今では、こんな風に屋台で食べ物や飲み物を買って食べたり飲んだり、子供達は遊んだりと夏のイベントの一つとしても楽しまれています。\n      \n      お盆の最終日、最後の日、１６日には送り火をしてご先祖様の霊を見送ります。こんな風に灯籠と言われるものを川や海に流す地域もあります。\n      \n      地域や家庭によって見送り方も様々です。私の父の実家では送り火はしません。その代わりに１６日にご先祖様をお墓まで連れていきます。お墓参りをして見送ります。\n      \n      今日は昔から伝わる日本のお盆の風習について話しました。今日はこれでおしまい。またね。",
      transcript_furigana: "今日きょうは８月６日はちがつむいかです。\n\n      もうすぐ日本にほんではお盆ぼんと言いわれる行事ぎょうじがあります。\n      \n      地域ちいきによっても違ちがいますが、一般的いっぱんてきには８月１３日はちがつじゅうさんにちから１６日じゅうろくにちのことをお盆ぼんと言います。\n      \n      お盆ぼんの期間きかんには多おおくの人ひとが生うまれ育そだった故郷こきょうに帰かえって、家族かぞくと一緒いっしょに過すごします。\n      \n      多おおくの人ひとが両親りょうしんが住すむ実家じっかに帰省きせいします。\n      \n      私わたしは子供こどもの頃ころ、家族かぞくで静岡県しずおかけんに住すんでいたんですけど、毎年まいとしお盆ぼんの時期じきには大分県おおいたけんの父ちちの実家じっかに帰省きせいしていました。\n      \n      父ちちが生うまれ育そだった家いえ、私わたしの祖父母そふぼが住すむ家いえに帰省きせいして、祖父母そふぼや親戚しんせきと一緒いっしょに過すごしていました。\n      \n      結婚けっこんして以来いらいは、毎年まいとしお盆ぼんに私わたしの実家じっかと夫おっとの実家じっか両方りょうほうに帰省きせいしています。\n      \n      お盆ぼんは元々もともと仏教ぶっきょうの行事ぎょうじです。\n      \n      死しんでしまった人ひと、亡なくなった人ひとの霊れいはあの世よにありますが、年ねんに一度いちどお盆ぼんの期間きかんだけ亡なくなった人ひとの霊れいがあの世よからこの世よに戻もどってくると考かんがえられています。\n      \n      亡なくなった私わたしのおじいちゃんやおばあちゃん、ひいおじいちゃん、ひいおばあちゃん、ひいひいおじいちゃん、ひいひいおばあちゃん、この人達ひとたちは私わたしの先祖せんぞ、ご先祖様せんぞさまです。\n      \n      お盆ぼんは家族かぞく、それからご先祖様せんぞさまと一緒いっしょに過すごす期間きかんです。\n      \n      お盆ぼんの過すごし方かたは、地域ちいきによっても家庭かていによっても違ちがいがあります。\n      \n      今日きょうの動画どうがでは昔むかしからの習ならわし、お盆ぼんの風習ふうしゅうをいくつか紹介しょうかいしたいと思おもいます。\n      \n      まずお盆ぼんの初日しょにち、１３日じゅうさんにちには、家いえの前まえでこんな風ふうに迎むかえ火びと言いわれる火ひをつけたり提灯ちょうちんを飾かざったりします。\n      \n      お盆ぼんにはご先祖様せんぞさまの霊たましいが家いえに帰かえってきます。\n      \n      ご先祖様せんぞさまが道みちに迷まよわないように、道みちに迷まよわずにちゃんと家いえに帰かえって来これるように、目印めじるしとして迎むかえ火びをしたり提灯ちょうちんを飾かざったりします。\n      \n      火ひや提灯ちょうちんがあれば「あ！あそこが家いえだ！」とご先祖様せんぞさまがわかるからです。\n      \n      私わたしの父ちちの実家じっかでは、火ひをつけたり提灯ちょうちんを飾かざったりはしていません。\n      \n      その代かわりにお墓はかまでご先祖様せんぞさまを迎むかえに行いきます。\n      \n      １３日じゅうさんにちにお墓はかに行いってお墓参はかまいりをして、あの世よから戻もどってきたご先祖様せんぞさまと一緒いっしょに家いえに帰かえります。\n      \n      精霊馬しょうりょううまと呼よばれるきゅうりで作つくった馬うまと、精霊牛しょうりょううしと呼よばれるナスで作つくった牛うしを飾かざる地域ちいきもあります。\n      \n      ご先祖様せんぞさまに早はやく会あいたいです。\n      \n      早はやくこの世よに帰かえってきてほしいです。\n      \n      なので、馬うまに乗のって早はやく帰かえって来きてくださいという願ねがいを込こめてきゅうりの馬うまを飾かざります。\n      \n      逆ぎゃくにあの世よに戻もどる時ときにはゆっくり帰かえってほしいです。\n      \n      牛うしに乗のってこの世よでの時間じかんを楽たのしみながらゆっくりあの世よに戻もどってくださいという願ねがいを込こめてナスの牛うしを飾かざります。\n      \n      昔むかしながらの日本にほんの家いえには、仏壇ぶつだんと言いわれるこんなものがあります。\n      \n      お盆ぼんの間あいだは仏壇ぶつだんにご先祖様せんぞさまの食事しょくじをお供そなえします。\n      \n      １日いちにち３食さんしょく、朝昼晩あさひるばん、ご先祖様せんぞさまの分ぶんの食事しょくじを作つくって仏壇ぶつだんに置おいておきます。\n      \n      また、お盆ぼんの期間中きかんちゅうには日本全国にほんぜんこくで盆ぼん踊おどりが開催かいさいされます。\n      \n      こんな風ふうにみんなで輪わになって踊おどりを踊おどります。\n      \n      見みて下ください、浴衣ゆかたを着きている人ひとがたくさんいますね。\n      \n      盆ぼん踊おどりは元々もともとは、亡なくなった人ひとのことを思おもって、亡なくなった人ひとを供養くようするための踊おどりですが、\n      \n      今いまでは、こんな風ふうに屋台やたいで食たべ物ものや飲のみ物ものを買かって食たべたり飲のんだり、子供達こどもたちは遊あそんだりと夏なつのイベントの一ひとつとしても楽たのしまれています。\n      \n      お盆ぼんの最終日さいしゅうび、最後さいごの日ひ、１６日じゅうろくにちには送おくり火びをしてご先祖様せんぞさまの霊たましいを見送みおくります。\n      \n      こんな風ふうに灯籠とうろうと言いわれるものを川かわや海うみに流ながす地域ちいきもあります。\n      \n      地域ちいきや家庭かていによって見送みおくり方かたも様々さまざまです。\n      \n      私わたしの父ちちの実家じっかでは送おくり火びはしません。\n      \n      その代かわりに１６日じゅうろくにちにご先祖様せんぞさまをお墓はかまで連つれていきます。\n      \n      お墓参はかまいりをして見送みおくります。\n      \n      今日きょうは昔むかしから伝つたわる日本にほんのお盆ぼんの風習ふうしゅうについて話はなしました。\n      \n      今日きょうはこれでおしまい。またね。"
  },
  {
      title: "ねずみのすもう Sumo Mice",
      url: "https://cijapanese.com/sumo-mice/",
      level: "beginner",
      membership: "free",
      transcript: "これはネズミです。これは相撲です。今日の動画では「ねずみのすもう」という日本の昔話をします。\n\n      昔々、あるところにおじいさんとおばあさんが住んでいました。おじいさんとおばあさんは貧乏でした。お金がありません。ある日、おじいさんは山へ仕事をしに行きました。\n      \n      おじいさんが山で仕事をしていると、相撲を取る声が聞こえてきます。おじいさんは「何だろう？」と気になって、声のする方へ行ってみました。木の陰から覗いてみました。すると２匹のネズミが相撲を取っていました。痩せたネズミと太ったネズミが二匹で相撲を取っていました。\n      \n      よーく見ると、痩せた方のネズミはおじいさんの家に住んでいるネズミでした。そして、太った方のネズミは、近所のお金持ちのおじいさんの家に住んでいるネズミでした。\n      \n      おじいさんは木の陰に隠れて、二匹の様子を見ていました。太ったネズミのほうが強いです。痩せたネズミは負けてばかりです。何度も何度も勝負をします。何度勝負をしても太ったネズミが勝ちます。痩せたネズミが負けます。\n      \n      おじいさんはがっかりします。家に帰っておばあさんにネズミたちの話をしました。「うちのネズミは負けてばかりでかわいそう。」とおばあさんに話しました。\n      \n      おばあさんはいい考えを思いつきました。「そうだ！力がつくように餅を食べさせてあげよう。」「太ったネズミに勝てるように、餅を食べさせてあげよう。」と言いました。おじいさんも「それはいい考えだね。そうしよう！」と言いました。\n      \n      おじいさんとおばあさんはその日の夜、餅をつきました。痩せたネズミのために餅をつきました。そして餅を置いておきました。次の日の朝、餅はなくなっていました。\n      \n      おじいさんはまた山へ行きます。仕事をしに山へ行きます。するとまたネズミたちの声が聞こえてきました。おじいさんはまた木の陰からこっそり様子を覗いていました。\n      \n      今日は痩せたネズミが強いです。今日は痩せたネズミが勝っています。太ったネズミが負けています。太ったネズミが痩せたネズミに聞きました。「どうして急に強くなったの？昨日は弱かったのに、どうして今日はそんなに強いの？」と尋ねました。\n      \n      「うちのおじいさんとおばあさんが、昨日餅をついて食べさせてくれたんだ。餅のおかげで力がついたんだよ。」太ったネズミは「いいなぁ」と思います。痩せたネズミのことが羨ましいです。太ったネズミが言います。「いいな。うちのおじいさんはお金持ちだけど、餅はくれないよ。僕も餅が食べたいな。」\n      \n      痩せたネズミはこう言いました。「うーん。君にも餅を食べさせてあげたい。だけど、うちのおじいさんとおばあさんは貧乏なんだ。お金がないんだ。餅は高いから、なかなか食べられないんだよ。ごめんね。」と言いました。\n      \n      ネズミたちの話をおじいさんが聞いています。おじいさんはネズミたちの話を聞いて笑っています。家に帰っておばあさんに話しました。おじいさんとおばあさんは「太ったネズミにも餅を食べさせてあげよう。」と思いました。\n      \n      その日の夜おじいさんとおばあさんは、ネズミたちのためにまた餅をつきました。それから二匹のために赤いふんどしを作りました。そして餅とふんどしを棚に置いておきました。\n      \n      次の日の朝棚を開けてみると、餅もふんどしもなくなっていました。代わりにお金が置いてありました。おじいさんとおばあさんはびっくりしました。「きっと太ったネズミが持ってきてくれたんだろう。」二人は嬉しそうです。\n      \n      その日おじいさんが山へ行くと、二匹のネズミが赤いふんどしをつけて楽しそうに相撲を取っていました。おじいさんとおばあさんは太ったネズミがくれたお金のおかげで貧乏じゃなくなりました。そして幸せに暮らしました。今日は「ねずみのすもう」という日本の昔話をしました。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "これは　ネズミねずみです。\n\n      これは　相撲すもうです。\n      \n      今日きょうの　動画どうがでは　「ねずみの　すもう」という　日本にほんの　昔話むかしばなしを　します。\n      \n      昔々むかしむかし　あるところに　おじいさんと　おばあさんが　住すんでいました。\n      \n      おじいさんと　おばあさんは　貧乏びんぼうでした。\n      \n      お金かねが　ありません。\n      \n      ある日ひ　おじいさんは　山やまへ　仕事しごとを　しに　行いきました。\n      \n      おじいさんが　山やまで　仕事しごとを　していると　相撲すもうを　取とる　声こえが　聞きこえてきます。\n      \n      おじいさんは　「何なんだろう？」と　気きになって　声こえの　する方ほうへ　行いってみました。\n      \n      木きの　陰かげから　覗のぞいてみました。\n      \n      すると　二匹にひきの　ネズミねずみが　相撲すもうを　取とっていました。\n      \n      痩やせた　ネズミねずみと　太ふとった　ネズミねずみが　二匹にひきで　相撲すもうを　取とっていました。\n      \n      よーく　見みると　痩やせた方ほうの　ネズミねずみは　おじいさんの　家いえに　住すんでいる　ネズミねずみでした。\n      \n      そして　太ふとった方ほうの　ネズミねずみは　近所きんじょの　お金持かねもちの　おじいさんの　家いえに　住すんでいる　ネズミねずみでした。\n      \n      おじいさんは　木きの　陰かげに　隠かくれて　二匹にひきの　様子ようすを　見みていました。\n      \n      太ふとった　ネズミねずみの　ほうが　強つよいです。\n      \n      痩やせた　ネズミねずみは　負まけて　ばかりです。\n      \n      何度なんども　何度なんども　勝負しょうぶを　します。\n      \n      何度なんど　勝負しょうぶを　しても　太ふとった　ネズミねずみが　勝かちます。\n      \n      痩やせた　ネズミねずみが　負まけます。\n      \n      おじいさんは　がっかりします。\n      \n      家いえに　帰かえって　おばあさんに　ネズミねずみたちの　話はなしを　しました。\n      \n      「うちの　ネズミねずみは　負まけて　ばかりで　かわいそう。」と　おばあさんに　話はなしました。\n      \n      おばあさんは　いい　考かんがえを　思おもいつきました。\n      \n      「そうだ！　力ちからが　つくように　餅もちを　食たべさせてあげよう。」\n      \n      「太ふとった　ネズミねずみに　勝かてるように　餅もちを　食たべさせてあげよう。」と　言いいました。\n      \n      おじいさんも　「それは　いい　考かんがえだね。　そうしよう！」と　言いいました。\n      \n      おじいさんと　おばあさんは　その　日ひの　夜よる　餅もちを　つきました。\n      \n      痩やせた　ネズミねずみのために　餅もちを　つきました。\n      \n      そして　餅もちを　置おいておきました。\n      \n      次つぎの　日ひの　朝あさ　餅もちは　なくなっていました。\n      \n      おじいさんは　また　山やまへ　行いきます。\n      \n      仕事しごとを　しに　山やまへ　行いきます。\n      \n      すると　また　ネズミねずみたちの　声こえが　聞きこえてきました。\n      \n      おじいさんは　また　木きの　陰かげから　こっそり　様子ようすを　覗のぞいていました。\n      \n      今日きょうは　痩やせた　ネズミねずみが　強つよいです。\n      \n      今日きょうは　痩やせた　ネズミねずみが　勝かっています。\n      \n      太ふとった　ネズミねずみが　負まけています。\n      \n      太ふとった　ネズミねずみが　痩やせた　ネズミねずみに　聞ききました。\n      \n      「どうして　急きゅうに　強つよくなったの？　昨日きのうは　弱よわかったのに　どうして　今日きょうは　そんなに　強つよいの？」と　尋たずねました。\n      \n      「うちの　おじいさんと　おばあさんが　昨日きのう　餅もちを　ついて　食たべさせて　くれたんだ。　餅もちの　おかげで　力ちからが　ついたんだよ。」\n      \n      太ふとった　ネズミねずみは　「いいなぁ」と　思おもいます。\n      \n      痩やせた　ネズミねずみの　ことが　羨うらやましいです。\n      \n      太ふとった　ネズミねずみが　言いいます。\n      \n      「いいな。　うちの　おじいさんは　お金持かねもちだけど　餅もちは　くれないよ。　僕ぼくも　餅もちが　食べたいな。」\n      \n      痩やせた　ネズミねずみは　こう　言いいました。\n      \n      「うーん。　君きみにも　餅もちを　食たべさせてあげたい。　だけど　うちの　おじいさんと　おばあさんは　貧乏びんぼうなんだ。　お金かねが　ないんだ。　餅もちは　高たかいから　なかなか　食たべられないんだよ。　ごめんね。」と　言いいました。\n      \n      ネズミねずみたちの　話はなしを　おじいさんが　聞きいています。\n      \n      おじいさんは　ネズミねずみたちの　話はなしを　聞きいて　笑わらっています。\n      \n      家いえに　帰かえって　おばあさんに　話はなしました。\n      \n      おじいさんと　おばあさんは　「太ふとった　ネズミねずみにも　餅もちを　食たべさせてあげよう。」と　思おもいました。\n      \n      その　日ひの　夜よる　おじいさんと　おばあさんは　ネズミねずみたちのために　また　餅もちを　つきました。\n      \n      それから　二匹にひきのために　赤あかい　ふんどしを　作つくりました。\n      \n      そして　餅もちと　ふんどしを　棚たなに　置おいておきました。\n      \n      次つぎの　日ひの　朝あさ　棚たなを　開あけてみると　餅もちも　ふんどしも　なくなっていました。\n      \n      代かわりに　お金かねが　置おいてありました。\n      \n      おじいさんと　おばあさんは　びっくりしました。\n      \n      「きっと　太ふとった　ネズミねずみが　持もってきてくれたんだろう。」\n      \n      二人ふたりは　嬉うれしそうです。\n      \n      その日ひ　おじいさんが　山やまへ　行いくと　二匹にひきの　ネズミねずみが　赤あかい　ふんどしを　つけて　楽たのしそうに　相撲すもうを　取とっていました。\n      \n      おじいさんと　おばあさんは　太ふとった　ネズミねずみが　くれた　お金かねの　おかげで　貧乏びんぼうじゃなくなりました。\n      \n      そして　幸しあわせに　暮くらしました。\n      \n      今日きょうは　「ねずみの　すもう」という　日本にほんの　昔話むかしばなしを　しました。\n      \n      今日きょうは　これで　おしまい。またね！"
  },
  {
      title: "文房具 Stationery",
      url: "https://cijapanese.com/stationery/",
      level: "complete beginner",
      membership: "free",
      transcript: "ここに色々な文房具があります。今日は文房具の使い方の話をします。\n\n      これは紙です。紙が何枚ありますか。紙が何枚ありますか。一枚、二枚。紙が二枚あります。これはハサミです。これはカッターです。これは鉛筆です。これはボールペンです。これは消しゴムです。これはのりです。そしてこれはテープです。\n      \n      ハサミは何をするものですか。ハサミは紙を切るものです。ハサミで紙を切ります。ハサミで紙を切ります。ハサミで紙を切ります。カッターも紙を切るものです。カッターで紙を切ります。カッターで紙を切ります。ハサミとカッターは紙を切るものです。\n      \n      鉛筆は紙を切るものですか。違いますね。鉛筆は切るものではありません。鉛筆は字を書くものです。鉛筆で字を書きます。私の名前は何ですか。私の名前は木村有紀と言います。鉛筆で名前を書きます。木村有紀。ボールペンも字を書くものです。ボールペンで名前を書きます。木村有紀。私の名前を２回書きました。こっちは鉛筆で書きました。こっちはボールペンで書きました。\n      \n      消しゴムで書けますか。消しゴムでは書けませんね。消しゴムは字を消すものです。消しゴムで字を消します。鉛筆で書いた字は消せますか。鉛筆で書いた字は消せます。ボールペンで書いた字は消せますか。ボールペンで書いた字は消せません。鉛筆で書いた字は消せるけど、ボールペンで書いた字は消せません。\n      \n      オレンジの紙と水色の紙があります。オレンジの紙を三角に切ります。オレンジの紙を三角に切りました。水色の紙を四角に切ります。水色の紙を四角に切りました。\n      \n      オレンジの三角の紙を白い紙に貼ります。どれで貼りますか。鉛筆で貼れますか。消しゴムで貼れますか。鉛筆では貼れません。消しゴムでも貼れません。紙を貼るものはどれですか。紙を貼るものはのりとテープです。のりかテープで貼ります。こっちはのりで貼ります。こっちはテープで貼ります。\n      \n      今日は色々な文房具の話をしました。ホワイトボードにマーカーで書きます。今日はこれでおしまい。またね！",
      transcript_furigana: "ここに　色々いろいろな　文房具ぶんぼうぐが　あります。\n\n      今日きょうは　文房具ぶんぼうぐの　使つかい方かたの　話はなしを　します。\n      \n      これは　紙かみです。\n      \n      紙かみが　何枚なんまい　ありますか。\n      \n      紙かみが　何枚なんまい　ありますか。\n      \n      一枚いちまい　二枚にまい。\n      \n      紙かみが　二枚にまい　あります。\n      \n      これは　ハサミはさみです。\n      \n      これは　カッターかったーです。\n      \n      これは　鉛筆えんぴつです。\n      \n      これは　ボールペンぼーるぺんです。\n      \n      これは　消けしゴムごむです。\n      \n      これは　のりです。\n      \n      そして　これは　テープてーぷです。\n      \n      ハサミはさみは　何なにを　するものですか。\n      \n      ハサミはさみは　紙かみを　切きるものです。\n      \n      ハサミはさみで　紙かみを　切きります。\n      \n      ハサミはさみで　紙かみを　切きります。\n      \n      ハサミはさみで　紙かみを　切きります。\n      \n      カッターかったーも　紙かみを　切きるものです。\n      \n      カッターかったーで　紙かみを　切きります。\n      \n      カッターかったーで　紙かみを　切きります。\n      \n      ハサミはさみと　カッターかったーは　紙かみを　切きるものです。\n      \n      鉛筆えんぴつは　紙かみを　切きるものですか。\n      \n      違ちがいますね。\n      \n      鉛筆えんぴつは　切きるものではありません。\n      \n      鉛筆えんぴつは　字じを　書かくものです。\n      \n      鉛筆えんぴつで　字じを　書かきます。\n      \n      私わたしの　名前なまえは　何なんですか。\n      \n      私わたしの　名前なまえは　木村有紀きむらゆきと　言いいます。\n      \n      鉛筆えんぴつで　名前なまえを　書かきます。\n      \n      木村有紀きむらゆき。\n      \n      ボールペンぼーるぺんも　字じを　書かくものです。\n      \n      ボールペンぼーるぺんで　名前なまえを　書かきます。\n      \n      木村有紀きむらゆき。\n      \n      私わたしの　名前なまえを　２回にかい　書かきました。\n      \n      こっちは　鉛筆えんぴつで　書かきました。\n      \n      こっちは　ボールペンぼーるぺんで　書かきました。\n      \n      消けしゴムごむで　書かけますか。\n      \n      消けしゴムごむでは　書かけませんね。\n      \n      消けしゴムごむは　字じを　消けすものです。\n      \n      消けしゴムごむで　字じを　消けします。\n      \n      鉛筆えんぴつで　書かいた　字じは　消けせますか。\n      \n      鉛筆えんぴつで　書かいた　字じは　消けせます。\n      \n      ボールペンぼーるぺんで　書かいた　字じは　消けせますか。\n      \n      ボールペンぼーるぺんで　書かいた　字じは　消けせません。\n      \n      鉛筆えんぴつで　書かいた　字じは　消けせるけど　ボールペンぼーるぺんで　書かいた　字じは　消けせません。\n      \n      オレンジおれんじの　紙かみと　水色みずいろの　紙かみが　あります。\n      \n      オレンジおれんじの　紙かみを　三角さんかくに　切きります。\n      \n      オレンジおれんじの　紙かみを　三角さんかくに　切きりました。\n      \n      水色みずいろの　紙かみを　四角しかくに　切きります。\n      \n      水色みずいろの　紙かみを　四角しかくに　切きりました。\n      \n      オレンジおれんじの　三角さんかくの　紙かみを　白しろい　紙かみに　貼はります。\n      \n      どれで　貼はりますか。\n      \n      鉛筆えんぴつで　貼はれますか。\n      \n      消けしゴムごむで　貼はれますか。\n      \n      鉛筆えんぴつでは　貼はれません。\n      \n      消けしゴムごむでも　貼はれません。\n      \n      紙かみを　貼はるものは　どれですか。\n      \n      紙かみを　貼はるものは　のりと　テープてーぷです。\n      \n      のりか　テープてーぷで　貼はります。\n      \n      こっちは　のりで　貼はります。\n      \n      こっちは　テープてーぷで　貼はります。\n      \n      今日きょうは　色々いろいろな　文房具ぶんぼうぐの　話を　しました。\n      \n      ホワイトボードほわいとぼーどに　マーカーまーかーで　書かきます。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "日本の秋 Autumn in Japan",
      url: "https://cijapanese.com/autumn-in-japan/",
      level: "intermediate",
      membership: "free",
      transcript: "こんにちは、今日のテーマは「日本の秋」です。日本の秋について話します。今日の日付は２０２１年９月３日です。９月になりました。小学生の息子の夏休みもあっという間に終わって２学期が始まりました。皆さんが住んでいる地域では今季節は何ですか。\n\n      日本では今、夏が終わって秋が始まろうとしています。夏から秋に変わろうとしていますよ。とはいえ、昼間はまだ気温が３０度ぐらいまで上がります。日中はまだまだ暑いです。まだまだ残暑が厳しいです。でも朝晩は少し涼しくなってきました。\n      \n      それから、だいぶ日が短くなってきました。少し前までは夜７時半ぐらいまで外が明るかったんですけど、最近はもう６時半を過ぎると外が暗くなり始めます。段々日が短くなってきました。\n      \n      それから少し前までは１日中「ミーンミーン」とうるさかった蝉の鳴き声も、いつの間にか聞こえなくなりました。代わりに最近よく聞こえるのは「リンリンリン」という鈴虫の鳴き声やコオロギの鳴き声です。それから夕方になるとトンボがたくさん飛んでいます。\n      \n      皆さん秋は好きですか。秋に何をしますか。どんなことをして秋を楽しみますか。秋は夏のように暑すぎもせず、かと言って冬のように寒すぎもせず、ちょうどいい過ごしやすい季節ですよね。なので秋には色んなことが楽しめると思います。\n      \n      「秋」と聞いて一番に思い浮かぶのは美味しい食べ物です。秋は美味しい食べ物がたくさん穫れる季節です。秋は収穫の季節です。お米が穫れるのも秋ですね。私の父はお米を作っているので秋になると稲刈りで忙しいです。お米の収穫で忙しいです。\n      \n      日本の秋の食べ物、秋の味覚といえば、まず思い浮かぶのはこれです。サンマです。サンマは秋が旬の魚です。こうやって塩焼きにして食べると美味しいです。それから松茸。松茸、食べたことありますか。私はあんまり食べたことないです。松茸は秋に穫れる高級なきのこです。値段の高いきのこです。\n      \n      あとはさつまいも。それから秋は果物が美味しい季節です。秋が旬の果物、色々ありますよ。例えば栗とか、桃、柿、梨、それからぶどうなんかも秋になる果物です。\n      \n      夏の間って食欲が落ちませんか。夏は暑いのであんまりたくさんは食べられなくないですか。でも秋になって涼しくなると、また食欲が出て食べ物が美味しく食べられます。秋は美味しい食べ物がたくさん穫れるし、夏の間落ちていた食欲が戻ってご飯が美味しく食べられるので「食欲の秋」とよく言われます。\n      \n      この〇〇の秋という言葉は「食欲の秋」以外にも色々あって、例えば「読書の秋」とか「スポーツの秋」あとは「芸術の秋」という言葉もあります。秋は涼しくて過ごしやすいので、食べ物も美味しく食べられるし、読書をするにもスポーツをするにも芸術を楽しむにもぴったりな季節です。\n      \n      あとは秋といえばやっぱり紅葉ですよね。秋になると葉っぱの色が緑から赤や黄色やオレンジに変わります。地域によっても違うんですけど、大体日本では１０月から１１月が紅葉の見頃です。紅葉が一番綺麗な時期です。北へ行けば行くほど早く、南へ行けば行くほど遅く見頃を迎えます。\n      \n      この黄色い葉っぱは銀杏の葉っぱです。そしてこの真っ赤な葉っぱは紅葉と言います。紅葉が始まると日本では多くの人が紅葉狩りに行きますよ。紅葉がきれいな場所に行って景色を楽しみます。\n      \n      皆さんももし秋に日本に遊びに来る機会があれば、日本各地に紅葉の名所があるのでぜひ行ってみて下さいね。\n      \n      今日は日本の秋について話しました。最後に皆さん、今年２０２１年の秋は何をする予定ですか。どんなことをして秋を楽しみたいですか。\n      \n      私はもう少し涼しくなったら家族でハイキングやキャンプに行きたいです。それから「読書の秋」なので韓国語の本にも挑戦してみたいです。皆さんも読書の秋に日本語の本に挑戦してみるのはいかがですか。\n      \n      では今日はこれでおしまい。またね！",
      transcript_furigana: "こんにちは、今日きょうのテーマは「日本にほんの秋あき」です。\n\n      日本にほんの秋あきについて話はなします。\n      \n      今日きょうの日付ひづけは２０２１年にせんにじゅういちねん９月くがつ３日みっかです。\n      \n      ９月くがつになりました。\n      \n      小学生しょうがくせいの息子むすこの夏休なつやすみもあっという間まに終おわって２学期にがっきが始はじまりました。\n      \n      皆みなさんが住すんでいる地域ちいきでは今いま季節きせつは何なんですか。\n      \n      日本にほんでは今いま、夏なつが終おわって秋あきが始はじまろうとしています。\n      \n      夏なつから秋あきに変かわろうとしていますよ。\n      \n      とはいえ、昼間ひるまはまだ気温きおんが３０度さんじゅうどぐらいまで上あがります。\n      \n      日中にっちゅうはまだまだ暑あついです。まだまだ残暑ざんしょが厳きびしいです。\n      \n      でも朝晩あさばんは少すこし涼すずしくなってきました。\n      \n      それから、だいぶ日ひが短みじかくなってきました。\n      \n      少すこし前まえまでは夜７時半よるしちじはんぐらいまで外そとが明あかるかったんですけど、最近さいきんはもう６時半ろくじはんを過すぎると外そとが暗くらくなり始はじめます。\n      \n      段々だんだん日ひが短みじかくなってきました。\n      \n      それから少すこし前まえまでは１日中いちにちじゅう「ミーンミーン」とうるさかった蝉せみの鳴なき声ごえも、いつの間まにか聞きこえなくなりました。\n      \n      代かわりに最近さいきんよく聞きこえるのは「リンリンリン」という鈴虫すずむしの鳴なき声ごえやコオロギの鳴なき声ごえです。\n      \n      それから夕方ゆうがたになるとトンボがたくさん飛とんでいます。\n      \n      皆みなさん秋あきは好すきですか。秋あきに何なにをしますか。どんなことをして秋あきを楽たのしみますか。\n      \n      秋あきは夏なつのように暑あつすぎもせず、かと言いって冬ふゆのように寒さむすぎもせず、ちょうどいい過すごしやすい季節きせつですよね。\n      \n      なので秋あきには色いろんなことが楽たのしめると思おもいます。\n      \n      「秋あき」と聞きいて一番いちばんに思おもい浮うかぶのは美味おいしい食たべ物ものです。\n      \n      秋あきは美味おいしい食たべ物ものがたくさん穫とれる季節きせつです。秋あきは収穫しゅうかくの季節きせつです。\n      \n      お米こめが穫とれるのも秋あきですね。\n      \n      私わたしの父ちちはお米こめを作つくっているので秋あきになると稲刈いねかりで忙いそがしいです。\n      \n      お米こめの収穫しゅうかくで忙いそがしいです。\n      \n      日本にほんの秋あきの食たべ物もの、秋あきの味覚みかくといえば、まず思おもい浮うかぶのはこれです。サンマです。\n      \n      サンマは秋あきが旬しゅんの魚さかなです。\n      \n      こうやって塩焼しおやきにして食たべると美味おいしいです。\n      \n      それから松茸まつたけ。松茸まつたけ、食たべたことありますか。\n      \n      私はあんまり食たべたことないです。\n      \n      松茸まつたけは秋あきに穫とれる高級こうきゅうなきのこです。値段ねだんの高たかいきのこです。\n      \n      あとはさつまいも。それから秋あきは果物くだものが美味おいしい季節きせつです。\n      \n      秋あきが旬しゅんの果物くだもの、色々いろいろありますよ。\n      \n      例たとえば栗くりとか、桃もも、柿かき、梨なし、それからぶどうなんかも秋あきになる果物くだものです。\n      \n      夏なつの間あいだって食欲しょくよくが落おちませんか。\n      \n      夏なつは暑あついのであんまりたくさんは食たべられなくないですか。\n      \n      でも秋あきになって涼すずしくなると、また食欲しょくよくが出でて食たべ物ものが美味おいしく食たべられます。\n      \n      秋あきは美味おいしい食たべ物ものがたくさん穫とれるし、夏なつの間あいだ落おちていた食欲しょくよくが戻もどってご飯はんが美味おいしく食たべられるので「食欲しょくよくの秋あき」とよく言われます。\n      \n      この〇〇まるまるの秋あきという言葉ことばは「食欲しょくよくの秋あき」以外いがいにも色々いろいろあって、例たとえば「読書どくしょの秋あき」とか「スポーツの秋あき」あとは「芸術げいじゅつの秋あき」という言葉ことばもあります。\n      \n      秋あきは涼すずしくて過すごしやすいので、食たべ物ものも美味おいしく食たべられるし、読書どくしょをするにもスポーツをするにも芸術げいじゅつを楽たのしむにもぴったりな季節きせつです。\n      \n      あとは秋あきといえばやっぱり紅葉こうようですよね。\n      \n      秋あきになると葉はっぱの色いろが緑みどりから赤あかや黄色きいろやオレンジに変かわります。\n      \n      地域ちいきによっても違ちがうんですけど、大体だいたい日本にほんでは１０月じゅうがつから１１月じゅういちがつが紅葉こうようの見頃みごろです。\n      \n      紅葉こうようが一番いちばん綺麗きれいな時期じきです。\n      \n      北きたへ行いけば行いくほど早はやく、南みなみへ行いけば行いくほど遅おそく見頃みごろを迎むかえます。\n      \n      この黄色きいろい葉はっぱは銀杏いちょうの葉はっぱです。\n      \n      そしてこの真まっ赤かな葉はっぱは紅葉もみじと言いいます。\n      \n      紅葉こうようが始はじまると日本にほんでは多おおくの人ひとが紅葉狩もみじがりに行いきますよ。\n      \n      紅葉こうようがきれいな場所ばしょに行いって景色けしきを楽たのしみます。\n      \n      皆みなさんももし秋あきに日本にほんに遊あそびに来くる機会きかいがあれば、日本各地にほんかくちに紅葉こうようの名所めいしょがあるのでぜひ行いってみて下くださいね。\n      \n      今日きょうは日本にほんの秋あきについて話はなしました。\n      \n      最後さいごに皆みなさん、今年ことし２０２１年にせんにじゅういちねんの秋あきは何なにをする予定よていですか。どんなことをして秋あきを楽たのしみたいですか。\n      \n      私わたしはもう少すこし涼すずしくなったら家族かぞくでハイキングやキャンプに行いきたいです。\n      \n      それから「読書どくしょの秋あき」なので韓国語かんこくごの本ほんにも挑戦ちょうせんしてみたいです。\n      \n      皆みなさんも読書どくしょの秋あきに日本語にほんごの本ほんに挑戦ちょうせんしてみるのはいかがですか。\n      \n      では今日きょうはこれでおしまい。またね！"
  },
  {
      title: "誰の帽子？ Whose hat is this?",
      url: "https://cijapanese.com/whose-hat-is-this/",
      level: "complete beginner",
      membership: "free",
      transcript: "これは何ですか。これは帽子です。頭に被ります。帽子を被ります。帽子を脱ぎます。\n\n      １つ、２つ、３つ、４つ。帽子が４つあります。\n      \n      これは私です。私の家族です。私、夫、息子、娘。一人、二人、三人、四人。四人家族です。\n      \n      これは誰の帽子でしょう。これは私の帽子です。この帽子は私のものです。\n      \n      これは誰の帽子でしょう。これは夫の帽子です。この帽子は夫のものです。\n      \n      これは誰の帽子でしょう。これは息子の帽子です。この帽子は息子のです。\n      \n      これは誰のでしょう。この帽子は誰のでしょう。この帽子は娘のです。これは娘の帽子です。\n      \n      帽子の絵を描きます。帽子の絵を描きました。帽子の絵を４つ描きました。\n      \n      これは誰の帽子ですか。この赤い帽子は誰のものですか。これはマリオの帽子です。この帽子はマリオのです。この帽子はマリオのものです。\n      \n      じゃあこれは誰の帽子ですか。この緑の帽子は誰のものですか。これはルイージの帽子です。\n      \n      マリオの帽子とルイージの帽子は同じ形です。形は同じです。でも色が違います。形は同じだけど色が違います。マリオの帽子は赤です。ルイージの帽子は緑です。\n      \n      これは誰の帽子ですか。この麦わら帽子は誰のものですか。これはルフィーの帽子です。ワンピースのルフィーの帽子です。\n      \n      これは誰の帽子ですか。このピンクの帽子は誰のですか。これはチョッパーの帽子です。\n      \n      皆さんは帽子を被りますか。どんな帽子を被りますか。\n      \n      今日はこれでおしまい。またね！",
      transcript_furigana: "これは　何なんですか。\n\n      これは　帽子ぼうしです。\n      \n      頭あたまに　被かぶります。\n      \n      帽子ぼうしを　被かぶります。\n      \n      帽子ぼうしを　脱ぬぎます。\n      \n      １ひとつ　２ふたつ　３みっつ　４よっつ。\n      \n      帽子ぼうしが　４よっつ　あります。\n      \n      これは　私わたしです。\n      \n      私わたしの　家族かぞくです。\n      \n      私わたし　夫おっと　息子むすこ　娘むすめ。\n      \n      一人ひとり　二人ふたり　三人さんにん　四人よにん。\n      \n      四人よにん家族かぞくです。\n      \n      これは　誰だれの　帽子ぼうしでしょう。\n      \n      これは　私わたしの　帽子ぼうしです。\n      \n      この　帽子ぼうしは　私わたしのものです。\n      \n      これは　誰だれの　帽子ぼうしでしょう。\n      \n      これは　夫おっとの　帽子ぼうしです。\n      \n      この　帽子ぼうしは　夫おっとのものです。\n      \n      これは　誰だれの　帽子ぼうしでしょう。\n      \n      これは　息子むすこの　帽子ぼうしです。\n      \n      この　帽子ぼうしは　息子むすこのです。\n      \n      これは　誰だれのでしょう。\n      \n      この　帽子ぼうしは　誰だれのでしょう。\n      \n      この　帽子ぼうしは　娘むすめのです。\n      \n      これは　娘むすめの　帽子ぼうしです。\n      \n      帽子ぼうしの　絵えを　描かきます。\n      \n      帽子ぼうしの　絵えを　描かきました。\n      \n      帽子ぼうしの　絵えを　４よっつ　描かきました。\n      \n      これは　誰だれの　帽子ぼうしですか。\n      \n      この　赤あかい　帽子ぼうしは　誰だれのものですか。\n      \n      これは　マリオまりおの　帽子ぼうしです。\n      \n      この　帽子ぼうしは　マリオまりおのです。\n      \n      この　帽子ぼうしは　マリオまりおのものです。\n      \n      じゃあ　これは　誰だれの　帽子ぼうしですか。\n      \n      この　緑みどりの　帽子ぼうしは　誰だれのものですか。\n      \n      これは　ルイージるいーじの　帽子ぼうしです。\n      \n      マリオまりおの　帽子ぼうしと　ルイージるいーじの　帽子ぼうしは　同おなじ　形かたちです。\n      \n      形かたちは　同おなじです。\n      \n      でも　色いろが　違ちがいます。\n      \n      形かたちは　同おなじだけど　色いろが　違ちがいます。\n      \n      マリオまりおの　帽子ぼうしは　赤あかです。\n      \n      ルイージるいーじの　帽子ぼうしは　緑みどりです。\n      \n      これは　誰だれの　帽子ぼうしですか。\n      \n      この　麦むぎわら帽子ぼうしは　誰だれのものですか。\n      \n      これは　ルフィーるふぃーの　帽子ぼうしです。\n      \n      ワンピースわんぴーすの　ルフィーるふぃーの　帽子ぼうしです。\n      \n      これは　誰だれの　帽子ぼうしですか。\n      \n      この　ピンクぴんくの　帽子ぼうしは　誰だれのですか。\n      \n      これは　チョッパーちょっぱーの　帽子ぼうしです。\n      \n      皆みなさんは　帽子ぼうしを　被かぶりますか。\n      \n      どんな　帽子ぼうしを　被かぶりますか。\n      \n      今日きょうは　これで　おしまい。\n      \n      またね！"
  },
  {
      title: "多読 Extensive Reading",
      url: "https://cijapanese.com/extensive-reading/",
      level: "intermediate",
      membership: "free",
      transcript: "外国語を身につける方法はたくさんありますね。例えば文法を勉強したり単語を暗記したり、たくさんたくさん聞いたり…。皆さんはどんな方法を試したことがありますか。どんな勉強法が好きですか。\n\n      今日は外国語の学習法の一つ「多読」について話したいと思います。多読って知っていますか。やってみたことはありますか。多読というのは、読んで字のごとく、多く読む、たくさん読むということです。\n      \n      まず私自身の英語学習の経験について少し話します。私は中学生のときに学校の授業で初めて英語を勉強しました。日本人の先生が日本語で文法を説明したり、単語を暗記したり、英文を日本語に訳したり…そんな授業をずっと受けていました。\n      \n      学校の英語の成績は割と良かったんです。あと日本語学習者向けにはJLPTという試験がありますよね。それと同じように英語の学習者向けにも色々英語の試験があるんですけど、そういう試験のスコアも結構良かったんです。\n      \n      でもいざ実際に会話をしようとすると、英語が全然出てきません。英語のテストは得意だけど会話をすることには全く自信がありませんでした。それがずーっと私の悩みでした。英語、わかるけど、喋れないっていうのがずっと悩みでした。\n      \n      それで２０代の頃、色んなことを試してみました。文法を復習してみたり、文法をもう一回勉強し直してみたり、単語を復習してみたり。でも文法も単語もあんまり楽しくないので続けられませんでした。継続できませんでした。それにあんまり上達も感じませんでした。\n      \n      あとは毎日１日２５分間オンラインで英会話レッスンを受けてみたこともあります。でもこれもそこまで上達を感じませんでした。\n      \n      色々試した中で、私にとって一番効果があったのはこの「多読」だったんです。今から４，５年前に多読をしました。\n      \n      元々ずっとこういう方法で、頭を使って英語を勉強してきたので、多読をする前は頭の中でいちいち訳す癖が付いてしまっていました。英語を読んだり聞いたりしたときに、一回頭の中で英語から日本語に訳して、で自分が言いたいことをまず日本語で考えてそれを英語に直して、それから言うっていう癖が付いていました。頭ばっかり使って全然自然なコミュニケーションができなかったんですね。\n      \n      でも多読をしてから、多読をした後はいちいち頭の中でこうやって１回日本語に変換しなくても、英語を聞いて英語のまま理解して英語で答えるということがちょっとずつできるようになりました。\n      \n      もちろん今でもまだまだ勉強中です。わからない単語はまだまだたくさんあるし、ちょっと長くて複雑な文になったり、あとは自分に馴染みのないトピック、あんまり詳しくないトピックですね、よく知らない話題になると難しい時もまだまだあります。でも多読をする前と比べると明らかに自然に英語が使えるようになりました。\n      \n      実はこの多読の経験がきっかけになって私はインプットの重要性に気づいたんです。多読をしたことがきっかけで今動画で行っているCIのアプローチに興味を持つようになりました。\n      \n      なので日本語を学習している皆さん、特に今この動画を見ている中級以上の皆さんに、日本語の本をたくさん読むことをおすすめしたいです。\n      \n      とはいえ、ただたくさん読めばいいというわけではありません。多読をする上で大事なポイントが３つあります。多読３原則と言われる３つのルールがあります。ちなみにこれは「英語多読研究会」という会のサイトから引用したものです。\n      \n      まず１つ目は「辞書は引かない」ということです。わからない単語が出てくるとその度にいちいち辞書を引いて意味を確認していませんか。多読のルールでは辞書はいちいち引きません。辞書を引かなくてもわかる、理解できるレベルの本を選びます。\n      \n      ２つ目。「わからないところは飛ばして前へ進む」。わからないところがあってもいちいち「うーん…」って気にしないで読み進めます。でももしわからないところがたくさん出てきたら全く意味がわかりませんよね。なので、こんな難しい本は選びません。わからないところがほんの少ししか出てこないような、自分にとって易しいレベルの本を選びます。\n      \n      ３つ目は「つまらなくなったらやめる」です。多読の重要なポイントは「楽しく読む」ということです。読んでいて面白くないなぁと思ったら、そこで読むのをやめます。どうしても本を買うと最初から最後まで全部読まなきゃ！って思ってしまいますけど、内容が好みじゃないとか、ちょっと今の自分には難しすぎるなと思ったら、その本はそこでやめます。\n      \n      以上が多読の３つの基本ルールです。まぁとにかくいちいち辞書を引いたり、「うーん…」って悩んだりしなくてもスラスラ読めるレベル、楽しく読めるレベルの本をたくさん読みましょうということです。\n      \n      私はこの時自分にとって少し易しめの英語の本、多分アメリカとかイギリスのネイティブの小学生から中学生向けに書かれた本をたくさん読みました。その時３ヶ月間で単語１００万語分の本を読みました。それで英語力がなんか上がったなって上達を感じました。\n      \n      興味を持った方はぜひ日本語で多読、試してみてください。私のサイトcijapanese.comでは易しい日本語、難しくない日本語の本を探すのに便利なサイトもいくつか紹介しています。なのでよかったらぜひ参考にしてください。\n      \n      今日は多読について話しました。今日はこれでおしまい。またね！",
      transcript_furigana: "外国語がいこくごを身みにつける方法ほうほうはたくさんありますね。例たとえば文法ぶんぽうを勉強べんきょうしたり単語たんごを暗記あんきしたり、たくさんたくさん聞きいたり…。皆みなさんはどんな方法ほうほうを試ためしたことがありますか。どんな勉強法べんきょうほうが好すきですか。\n\n      今日きょうは外国語がいこくごの学習法がくしゅうほうの一ひとつ「多読たどく」について話はなしたいと思おもいます。多読たどくって知しっていますか。やってみたことはありますか。多読たどくというのは、読よんで字じのごとく、多おおく読よむ、たくさん読よむということです。\n      \n      まず私自身わたしじしんの英語学習えいごがくしゅうの経験けいけんについて少すこし話はなします。私わたしは中学生ちゅうがくせいのときに学校がっこうの授業じゅぎょうで初はじめて英語えいごを勉強べんきょうしました。日本人にほんじんの先生せんせいが日本語にほんごで文法ぶんぽうを説明せつめいしたり、単語たんごを暗記あんきしたり、英文えいぶんを日本語にほんごに訳やくしたり…そんな授業じゅぎょうをずっと受うけていました。\n      \n      学校がっこうの英語えいごの成績せいせきは割わりと良よかったんです。あと日本語にほんご学習がくしゅう者しゃ向むけにはJLPTという試験しけんがありますよね。それと同おなじように英語えいごの学習がくしゅう者しゃ向むけにも色々いろいろ英語えいごの試験しけんがあるんですけど、そういう試験しけんのスコアも結構けっこう良よかったんです。\n      \n      でもいざ実際じっさいに会話かいわをしようとすると、英語えいごが全然ぜんぜん出でてきません。英語えいごのテストは得意とくいだけど会話かいわをすることには全まったく自信じしんがありませんでした。それがずーっと私わたしの悩なやみでした。英語えいご、わかるけど、喋しゃべれないっていうのがずっと悩なやみでした。\n      \n      それで２０代にじゅうだいの頃ころ、色いろんなことを試ためしてみました。文法ぶんぽうを復習ふくしゅうしてみたり、文法ぶんぽうをもう一回いっかい勉強べんきょうし直なおしてみたり、単語たんごを復習ふくしゅうしてみたり。でも文法ぶんぽうも単語たんごもあんまり楽たのしくないので続つづけられませんでした。継続けいぞくできませんでした。それにあんまり上達じょうたつも感かんじませんでした。\n      \n      あとは毎日まいにち１日いちにち２５分間にじゅうごふんかんオンラインで英会話えいかいわレッスンを受うけてみたこともあります。でもこれもそこまで上達じょうたつを感かんじませんでした。\n      \n      色々いろいろ試ためした中なかで、私わたしにとって一番いちばん効果こうかがあったのはこの「多読たどく」だったんです。今いまから４，５年前しごねんまえに多読たどくをしました。\n      \n      元々もともとずっとこういう方法ほうほうで、頭あたまを使つかって英語えいごを勉強べんきょうしてきたので、多読たどくをする前まえは頭あたまの中なかでいちいち訳やくす癖くせが付ついてしまっていました。英語えいごを読よんだり聞きいたりしたときに、一回いっかい頭あたまの中なかで英語えいごから日本語にほんごに訳やくして、で自分じぶんが言いいたいことをまず日本語にほんごで考かんがえてそれを英語えいごに直なおして、それから言いうっていう癖くせが付ついていました。頭あたまばっかり使つかって全然ぜんぜん自然しぜんなコミュニケーションができなかったんですね。\n      \n      でも多読たどくをしてから、多読たどくをした後あとはいちいち頭あたまの中なかでこうやって１回いっかい日本語にほんごに変換へんかんしなくても、英語えいごを聞きいて英語えいごのまま理解りかいして英語えいごで答こたえるということがちょっとずつできるようになりました。\n      \n      もちろん今いまでもまだまだ勉強中べんきょうちゅうです。わからない単語たんごはまだまだたくさんあるし、ちょっと長ながくて複雑ふくざつな文ぶんになったり、あとは自分じぶんに馴染なじみのないトピック、あんまり詳くわしくないトピックですね、よく知しらない話題わだいになると難むずかしい時ときもまだまだあります。でも多読たどくをする前まえと比くらべると明あきらかに自然しぜんに英語えいごが使つかえるようになりました。\n      \n      実じつはこの多読たどくの経験けいけんがきっかけになって私わたしはインプットの重要性じゅうようせいに気きづいたんです。多読たどくをしたことがきっかけで今いま動画どうがで行おこなっているCIしーあいのアプローチに興味きょうみを持もつようになりました。\n      \n      なので日本語にほんごを学習がくしゅうしている皆みなさん、特とくに今いまこの動画どうがを見みている中級ちゅうきゅう以上いじょうの皆みなさんに、日本語にほんごの本ほんをたくさん読よむことをおすすめしたいです。\n      \n      とはいえ、ただたくさん読よめばいいというわけではありません。多読たどくをする上うえで大事だいじなポイントが３みっつあります。多読たどく３原則さんげんそくと言いわれる３みっつのルールがあります。ちなみにこれは「英語えいご多読たどく研究会けんきゅうかい」という会かいのサイトから引用いんようしたものです。\n      \n      まず１ひとつ目めは「辞書じしょは引ひかない」ということです。わからない単語たんごが出でてくるとその度たびにいちいち辞書じしょを引ひいて意味いみを確認かくにんしていませんか。多読たどくのルールでは辞書じしょはいちいち引ひきません。辞書じしょを引ひかなくてもわかる、理解りかいできるレベルの本ほんを選えらびます。\n      \n      ２ふたつ目め。「わからないところは飛とばして前まえへ進すすむ」。わからないところがあってもいちいち「うーん…」って気きにしないで読よみ進すすめます。でももしわからないところがたくさん出でてきたら全まったく意味いみがわかりませんよね。なので、こんな難むずかしい本ほんは選えらびません。わからないところがほんの少すこししか出でてこないような、自分じぶんにとって易やさしいレベルの本ほんを選えらびます。\n      \n      ３みっつ目は「つまらなくなったらやめる」です。多読たどくの重要じゅうようなポイントは「楽たのしく読よむ」ということです。読よんでいて面白おもしろくないなぁと思おもったら、そこで読よむのをやめます。どうしても本ほんを買かうと最初さいしょから最後さいごまで全部ぜんぶ読よまなきゃ！って思おもってしまいますけど、内容ないようが好このみじゃないとか、ちょっと今いまの自分じぶんには難むずかしすぎるなと思おもったら、その本ほんはそこでやめます。\n      \n      以上いじょうが多読たどくの３みっつの基本きほんルールです。まぁとにかくいちいち辞書じしょを引ひいたり、「うーん…」って悩なやんだりしなくてもスラスラ読よめるレベル、楽たのしく読よめるレベルの本ほんをたくさん読よみましょうということです。\n      \n      私わたしはこの時とき自分じぶんにとって少すこし易やさしめの英語えいごの本ほん、多分たぶんアメリカとかイギリスのネイティブの小学生しょうがくせいから中学生ちゅうがくせい向むけに書かかれた本ほんをたくさん読よみました。その時とき３ヶ月間さんかげつかんで単語たんご１００万語分ひゃくまんごぶんの本ほんを読よみました。それで英語力えいごりょくがなんか上あがったなって上達じょうたつを感かんじました。\n      \n      興味きょうみを持もった方かたはぜひ日本語にほんごで多読たどく、試ためしてみてください。私わたしのサイトcijapanese.comでは易やさしい日本語にほんご、難むずかしくない日本語にほんごの本ほんを探さがすのに便利べんりなサイトもいくつか紹介しょうかいしています。なのでよかったらぜひ参考さんこうにしてください。\n      \n      今日きょうは多読たどくについて話しました。今日きょうはこれでおしまい。またね！"
  },
  {
      title: ``,
      url: ``,
      level: ``,
      membership: ``,
      transcript: ``,
      transcript_furigana: ``
  },
  {
      title: ``,
      url: ``,
      level: ``,
      membership: ``,
      transcript: ``,
      transcript_furigana: ``
  },
  {
      title: ``,
      url: ``,
      level: ``,
      membership: ``,
      transcript: ``,
      transcript_furigana: ``
  }
]





/* core2000 array assembled by transposing anki file to csv via https://fasiha.github.io/fuzzy-anki/uploading. Then uploading csv to https://jsbin.com/qicoyahufa/edit?js,console,output.  Then copy/paste into the js
file */
let core2000 = [ //begining of core2000 array
  
  {

  alt_spelling: {},
  core_index: "1",
  frequency: "37",
  furigana: "それ",
  kana: "それ",
  kanji: "それ",
  optimized_sent_index: "56",
  optimized_voc_index: "1",
  partOfSpeech: "Pronoun"
}, {

  alt_spelling: {},
  core_index: "53",
  frequency: "247",
  furigana: "一[ひと]つ",
  kana: "ひとつ",
  kanji: "一つ",
  optimized_sent_index: "1",
  optimized_voc_index: "2",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "114",
  frequency: "35",
  furigana: "一[いち]",
  kana: "いち",
  kanji: "一",
  optimized_sent_index: "158",
  optimized_voc_index: "3",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "276",
  frequency: "42",
  furigana: "二[に]",
  kana: "に",
  kanji: "二",
  optimized_sent_index: "130",
  optimized_voc_index: "4",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "294",
  frequency: "589",
  furigana: "二[ふた]つ",
  kana: "ふたつ",
  kanji: "二つ",
  optimized_sent_index: "2",
  optimized_voc_index: "5",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "292",
  frequency: "59",
  furigana: "三[さん]",
  kana: "さん",
  kanji: "三",
  optimized_sent_index: "239",
  optimized_voc_index: "6",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "317",
  frequency: "1401",
  furigana: "三[みっ]つ",
  kana: "みっつ",
  kanji: "三つ",
  optimized_sent_index: "53",
  optimized_voc_index: "7",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "326",
  frequency: "3088",
  furigana: "四[よっ]つ",
  kana: "よっつ",
  kanji: "四つ",
  optimized_sent_index: "371",
  optimized_voc_index: "8",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "353",
  frequency: "122",
  furigana: "四[し]",
  kana: "し",
  kanji: "四",
  optimized_sent_index: "118",
  optimized_voc_index: "9",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "6",
  frequency: "57",
  furigana: "これ",
  kana: "これ",
  kanji: "これ",
  optimized_sent_index: "5",
  optimized_voc_index: "10",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "387",
  frequency: "122",
  furigana: "四[よん]",
  kana: "よん",
  kanji: "四",
  optimized_sent_index: "131",
  optimized_voc_index: "11",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "330",
  frequency: "4742",
  furigana: "五[いつ]つ",
  kana: "いつつ",
  kanji: "五つ",
  optimized_sent_index: "390",
  optimized_voc_index: "12",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "347",
  frequency: "105",
  furigana: "五[ご]",
  kana: "ご",
  kanji: "五",
  optimized_sent_index: "181",
  optimized_voc_index: "13",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "297",
  frequency: "8020",
  furigana: "六[むっ]つ",
  kana: "むっつ",
  kanji: "六つ",
  optimized_sent_index: "207",
  optimized_voc_index: "14",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "389",
  frequency: "149",
  furigana: "六[ろく]",
  kana: "ろく",
  kanji: "六",
  optimized_sent_index: "244",
  optimized_voc_index: "15",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "322",
  frequency: "169",
  furigana: "七[なな]",
  kana: "なな",
  kanji: "七",
  optimized_sent_index: "16",
  optimized_voc_index: "16",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "367",
  frequency: "7460",
  furigana: "七[なな]つ",
  kana: "ななつ",
  kanji: "七つ",
  optimized_sent_index: "22",
  optimized_voc_index: "17",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "306",
  frequency: "160",
  furigana: "八[はち]",
  kana: "はち",
  kanji: "八",
  optimized_sent_index: "132",
  optimized_voc_index: "18",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "383",
  frequency: "10055",
  furigana: "八[やっ]つ",
  kana: "やっつ",
  kanji: "八つ",
  optimized_sent_index: "138",
  optimized_voc_index: "19",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "11",
  frequency: "19",
  furigana: "なる",
  kana: "なる",
  kanji: "なる",
  optimized_sent_index: "256",
  optimized_voc_index: "20",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "313",
  frequency: "184",
  furigana: "九[きゅう]",
  kana: "きゅう",
  kanji: "九",
  optimized_sent_index: "283",
  optimized_voc_index: "21",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "349",
  frequency: "17641",
  furigana: "九[ここの]つ",
  kana: "ここのつ",
  kanji: "九つ",
  optimized_sent_index: "205",
  optimized_voc_index: "22",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "234",
  frequency: "52",
  furigana: "十[じゅう]",
  kana: "じゅう",
  kanji: "十",
  optimized_sent_index: "143",
  optimized_voc_index: "23",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "373",
  frequency: "213",
  furigana: "百[ひゃく]",
  kana: "ひゃく",
  kanji: "百",
  optimized_sent_index: "388",
  optimized_voc_index: "24",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "296",
  frequency: "336",
  furigana: "千[せん]",
  kana: "せん",
  kanji: "千",
  optimized_sent_index: "140",
  optimized_voc_index: "25",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "378",
  frequency: "300",
  furigana: "万[まん]",
  kana: "まん",
  kanji: "万",
  optimized_sent_index: "395",
  optimized_voc_index: "26",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "3",
  frequency: "503",
  furigana: "円[えん]",
  kana: "えん",
  kanji: "円",
  optimized_sent_index: "343",
  optimized_voc_index: "27",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "397",
  frequency: "503",
  furigana: "円[えん]",
  kana: "えん",
  kanji: "円",
  optimized_sent_index: "3",
  optimized_voc_index: "28",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "202",
  frequency: "87",
  furigana: "時[とき]",
  kana: "とき",
  kanji: "時",
  optimized_sent_index: "154",
  optimized_voc_index: "29",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "12",
  frequency: "10",
  furigana: "する",
  kana: "する",
  kanji: "する",
  optimized_sent_index: "294",
  optimized_voc_index: "30",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "365",
  frequency: "2199",
  furigana: "時々[ときどき]",
  kana: "ときどき",
  kanji: "時々",
  optimized_sent_index: "312",
  optimized_voc_index: "31",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "266",
  frequency: "94",
  furigana: "日[にち]",
  kana: "にち",
  kanji: "日",
  optimized_sent_index: "247",
  optimized_voc_index: "32",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "298",
  frequency: "111256",
  furigana: "六日[むいか]",
  kana: "むいか",
  kanji: "六日",
  optimized_sent_index: "40",
  optimized_voc_index: "33",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "307",
  frequency: "182214",
  furigana: "三日[みっか]",
  kana: "みっか",
  kanji: "三日",
  optimized_sent_index: "165",
  optimized_voc_index: "34",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "311",
  frequency: "149693",
  furigana: "五日[いつか]",
  kana: "いつか",
  kanji: "五日",
  optimized_sent_index: "328",
  optimized_voc_index: "35",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "318",
  frequency: "161821",
  furigana: "八日[ようか]",
  kana: "ようか",
  kanji: "八日",
  optimized_sent_index: "9",
  optimized_voc_index: "36",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "323",
  frequency: "32654",
  furigana: "二十日[はつか]",
  kana: "はつか",
  kanji: "二十日",
  optimized_sent_index: "326",
  optimized_voc_index: "37",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "325",
  frequency: "131093",
  furigana: "二日[ふつか]",
  kana: "ふつか",
  kanji: "二日",
  optimized_sent_index: "113",
  optimized_voc_index: "38",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "348",
  frequency: ``,
  furigana: "九日[ここのか]",
  kana: "ここのか",
  kanji: "九日",
  optimized_sent_index: "111",
  optimized_voc_index: "39",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "15",
  frequency: "92",
  furigana: "ところ",
  kana: "ところ",
  kanji: "ところ",
  optimized_sent_index: "185",
  optimized_voc_index: "40",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "359",
  frequency: "182214",
  furigana: "一日[ついたち]",
  kana: "ついたち",
  kanji: "一日",
  optimized_sent_index: "20",
  optimized_voc_index: "41",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "364",
  frequency: "79296",
  furigana: "十日[とおか]",
  kana: "とおか",
  kanji: "十日",
  optimized_sent_index: "42",
  optimized_voc_index: "42",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "369",
  frequency: "161821",
  furigana: "七日[なのか]",
  kana: "なのか",
  kanji: "七日",
  optimized_sent_index: "363",
  optimized_voc_index: "43",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "385",
  frequency: ``,
  furigana: "四日[よっか]",
  kana: "よっか",
  kanji: "四日",
  optimized_sent_index: "141",
  optimized_voc_index: "44",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "360",
  frequency: "535",
  furigana: "月[つき]",
  kana: "つき",
  kanji: "月",
  optimized_sent_index: "47",
  optimized_voc_index: "45",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "274",
  frequency: "309",
  furigana: "水[みず]",
  kana: "みず",
  kanji: "水",
  optimized_sent_index: "267",
  optimized_voc_index: "46",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "342",
  frequency: "269",
  furigana: "金[かね]",
  kana: "かね",
  kanji: "金",
  optimized_sent_index: "4",
  optimized_voc_index: "47",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "212",
  frequency: "3720",
  furigana: "日曜日[にちようび]",
  kana: "にちようび",
  kanji: "日曜日",
  optimized_sent_index: "21",
  optimized_voc_index: "48",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "239",
  frequency: "5196",
  furigana: "土曜日[どようび]",
  kana: "どようび",
  kanji: "土曜日",
  optimized_sent_index: "45",
  optimized_voc_index: "49",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "27",
  frequency: "78",
  furigana: "やる",
  kana: "やる",
  kanji: "やる",
  optimized_sent_index: "295",
  optimized_voc_index: "50",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "253",
  frequency: "7625",
  furigana: "金曜日[きんようび]",
  kana: "きんようび",
  kanji: "金曜日",
  optimized_sent_index: "46",
  optimized_voc_index: "51",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "269",
  frequency: "7822",
  furigana: "月曜日[げつようび]",
  kana: "げつようび",
  kanji: "月曜日",
  optimized_sent_index: "61",
  optimized_voc_index: "52",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "286",
  frequency: "13245",
  furigana: "木曜日[もくようび]",
  kana: "もくようび",
  kanji: "木曜日",
  optimized_sent_index: "65",
  optimized_voc_index: "53",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "287",
  frequency: "29940",
  furigana: "曜日[ようび]",
  kana: "ようび",
  kanji: "曜日",
  optimized_sent_index: "179",
  optimized_voc_index: "54",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "290",
  frequency: "12773",
  furigana: "火曜日[かようび]",
  kana: "かようび",
  kanji: "火曜日",
  optimized_sent_index: "252",
  optimized_voc_index: "55",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "293",
  frequency: "12590",
  furigana: "水曜日[すいようび]",
  kana: "すいようび",
  kanji: "水曜日",
  optimized_sent_index: "6",
  optimized_voc_index: "56",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "167",
  frequency: "4817",
  furigana: "週[しゅう]",
  kana: "しゅう",
  kanji: "週",
  optimized_sent_index: "150",
  optimized_voc_index: "57",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "143",
  frequency: "99",
  furigana: "年[とし]",
  kana: "とし",
  kanji: "年",
  optimized_sent_index: "159",
  optimized_voc_index: "58",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "82",
  frequency: "433",
  furigana: "分[わ]かる",
  kana: "わかる",
  kanji: "分かる",
  optimized_sent_index: "270",
  optimized_voc_index: "59",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "36",
  frequency: "30",
  furigana: "そう",
  kana: "そう",
  kanji: "そう",
  optimized_sent_index: "103",
  optimized_voc_index: "60",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "368",
  frequency: "53",
  furigana: "何[なに]",
  kana: "なに",
  kanji: "何",
  optimized_sent_index: "50",
  optimized_voc_index: "61",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "351",
  frequency: "259",
  furigana: "先[さき]",
  kana: "さき",
  kanji: "先",
  optimized_sent_index: "8",
  optimized_voc_index: "62",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "19",
  frequency: "2139",
  furigana: "今年[ことし]",
  kana: "ことし",
  kanji: "今年",
  optimized_sent_index: "180",
  optimized_voc_index: "63",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "23",
  frequency: "147",
  furigana: "今[いま]",
  kana: "いま",
  kanji: "今",
  optimized_sent_index: "210",
  optimized_voc_index: "64",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "162",
  frequency: "278",
  furigana: "今日[きょう]",
  kana: "きょう",
  kanji: "今日",
  optimized_sent_index: "64",
  optimized_voc_index: "65",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "179",
  frequency: "12272",
  furigana: "今月[こんげつ]",
  kana: "こんげつ",
  kanji: "今月",
  optimized_sent_index: "262",
  optimized_voc_index: "66",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "272",
  frequency: "16739",
  furigana: "今週[こんしゅう]",
  kana: "こんしゅう",
  kanji: "今週",
  optimized_sent_index: "58",
  optimized_voc_index: "67",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "309",
  frequency: "63",
  furigana: "来[く]る",
  kana: "くる",
  kanji: "来る",
  optimized_sent_index: "240",
  optimized_voc_index: "68",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "388",
  frequency: "6153",
  furigana: "来年[らいねん]",
  kana: "らいねん",
  kanji: "来年",
  optimized_sent_index: "297",
  optimized_voc_index: "69",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "38",
  frequency: "103",
  furigana: "もう",
  kana: "もう",
  kanji: "もう",
  optimized_sent_index: "211",
  optimized_voc_index: "70",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "30",
  frequency: "67",
  furigana: "行[い]く",
  kana: "いく",
  kanji: "行く",
  optimized_sent_index: "182",
  optimized_voc_index: "71",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "76",
  frequency: "175",
  furigana: "帰[かえ]る",
  kana: "かえる",
  kanji: "帰る",
  optimized_sent_index: "29",
  optimized_voc_index: "72",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "336",
  frequency: "905",
  furigana: "大[おお]きい",
  kana: "おおきい",
  kanji: "大きい",
  optimized_sent_index: "287",
  optimized_voc_index: "73",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "357",
  frequency: "550",
  furigana: "小[ちい]さい",
  kana: "ちいさい",
  kanji: "小さい",
  optimized_sent_index: "333",
  optimized_voc_index: "74",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "29",
  frequency: "1081",
  furigana: "少[すく]ない",
  kana: "すくない",
  kanji: "少ない",
  optimized_sent_index: "32",
  optimized_voc_index: "75",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "125",
  frequency: "204",
  furigana: "少[すこ]し",
  kana: "すこし",
  kanji: "少し",
  optimized_sent_index: "263",
  optimized_voc_index: "76",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "4",
  frequency: "334",
  furigana: "多[おお]い",
  kana: "おおい",
  kanji: "多い",
  optimized_sent_index: "108",
  optimized_voc_index: "77",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "243",
  frequency: "1977",
  furigana: "多分[たぶん]",
  kana: "たぶん",
  kanji: "多分",
  optimized_sent_index: "307",
  optimized_voc_index: "78",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "197",
  frequency: "358",
  furigana: "上[あ]げる",
  kana: "あげる",
  kanji: "上げる",
  optimized_sent_index: "236",
  optimized_voc_index: "79",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "45",
  frequency: "154",
  furigana: "よく",
  kana: "よく",
  kanji: "よく",
  optimized_sent_index: "213",
  optimized_voc_index: "80",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "264",
  frequency: "856",
  furigana: "上[のぼ]る",
  kana: "のぼる",
  kanji: "上る",
  optimized_sent_index: "383",
  optimized_voc_index: "81",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "332",
  frequency: "120",
  furigana: "上[うえ]",
  kana: "うえ",
  kanji: "上",
  optimized_sent_index: "34",
  optimized_voc_index: "82",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "354",
  frequency: "219",
  furigana: "下[した]",
  kana: "した",
  kanji: "下",
  optimized_sent_index: "375",
  optimized_voc_index: "83",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "185",
  frequency: "564",
  furigana: "右[みぎ]",
  kana: "みぎ",
  kanji: "右",
  optimized_sent_index: "12",
  optimized_voc_index: "84",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "324",
  frequency: "715",
  furigana: "左[ひだり]",
  kana: "ひだり",
  kanji: "左",
  optimized_sent_index: "178",
  optimized_voc_index: "85",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "374",
  frequency: "121",
  furigana: "方[ほう]",
  kana: "ほう",
  kanji: "方",
  optimized_sent_index: "242",
  optimized_voc_index: "86",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "339",
  frequency: "1516",
  furigana: "大人[おとな]",
  kana: "おとな",
  kanji: "大人",
  optimized_sent_index: "266",
  optimized_voc_index: "87",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "371",
  frequency: "31",
  furigana: "人[ひと]",
  kana: "ひと",
  kanji: "人",
  optimized_sent_index: "319",
  optimized_voc_index: "88",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "372",
  frequency: "97423",
  furigana: "一人[ひとり]",
  kana: "ひとり",
  kanji: "一人",
  optimized_sent_index: "27",
  optimized_voc_index: "89",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "48",
  frequency: "112",
  furigana: "どう",
  kana: "どう",
  kanji: "どう",
  optimized_sent_index: "104",
  optimized_voc_index: "90",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "40",
  frequency: "234",
  furigana: "入[い]れる",
  kana: "いれる",
  kanji: "入れる",
  optimized_sent_index: "376",
  optimized_voc_index: "91",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "270",
  frequency: "126",
  furigana: "入[はい]る",
  kana: "はいる",
  kanji: "入る",
  optimized_sent_index: "94",
  optimized_voc_index: "92",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "13",
  frequency: "76",
  furigana: "出[で]る",
  kana: "でる",
  kanji: "出る",
  optimized_sent_index: "152",
  optimized_voc_index: "93",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "132",
  frequency: "72",
  furigana: "できる",
  kana: "できる",
  kanji: "できる",
  optimized_sent_index: "229",
  optimized_voc_index: "94",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "356",
  frequency: "130",
  furigana: "出[だ]す",
  kana: "だす",
  kanji: "出す",
  optimized_sent_index: "260",
  optimized_voc_index: "95",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "44",
  frequency: "208",
  furigana: "本[ほん]",
  kana: "ほん",
  kanji: "本",
  optimized_sent_index: "309",
  optimized_voc_index: "96",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "399",
  frequency: "1706",
  furigana: "休[やす]む",
  kana: "やすむ",
  kanji: "休む",
  optimized_sent_index: "63",
  optimized_voc_index: "97",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "104",
  frequency: "242",
  furigana: "体[からだ]",
  kana: "からだ",
  kanji: "体",
  optimized_sent_index: "385",
  optimized_voc_index: "98",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "382",
  frequency: "84",
  furigana: "目[め]",
  kana: "め",
  kanji: "目",
  optimized_sent_index: "243",
  optimized_voc_index: "99",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "52",
  frequency: "133",
  furigana: "どこ",
  kana: "どこ",
  kanji: "どこ",
  optimized_sent_index: "289",
  optimized_voc_index: "100",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "346",
  frequency: "145",
  furigana: "口[くち]",
  kana: "くち",
  kanji: "口",
  optimized_sent_index: "37",
  optimized_voc_index: "101",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "183",
  frequency: "328",
  furigana: "耳[みみ]",
  kana: "みみ",
  kanji: "耳",
  optimized_sent_index: "235",
  optimized_voc_index: "102",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "320",
  frequency: "3003",
  furigana: "上手[じょうず]",
  kana: "じょうず",
  kanji: "上手",
  optimized_sent_index: "199",
  optimized_voc_index: "103",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "363",
  frequency: "81",
  furigana: "手[て]",
  kana: "て",
  kanji: "手",
  optimized_sent_index: "17",
  optimized_voc_index: "104",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "119",
  frequency: "261",
  furigana: "足[あし]",
  kana: "あし",
  kanji: "足",
  optimized_sent_index: "228",
  optimized_voc_index: "105",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "263",
  frequency: "3139",
  furigana: "空[す]く",
  kana: "すく",
  kanji: "空く",
  optimized_sent_index: "19",
  optimized_voc_index: "106",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "338",
  frequency: "68",
  furigana: "男[おとこ]",
  kana: "おとこ",
  kanji: "男",
  optimized_sent_index: "57",
  optimized_voc_index: "107",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "341",
  frequency: "97",
  furigana: "女[おんな]",
  kana: "おんな",
  kanji: "女",
  optimized_sent_index: "208",
  optimized_voc_index: "108",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "35",
  frequency: "268",
  furigana: "子供[こども]",
  kana: "こども",
  kanji: "子供",
  optimized_sent_index: "359",
  optimized_voc_index: "109",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "54",
  frequency: "181",
  furigana: "あげる",
  kana: "あげる",
  kanji: "あげる",
  optimized_sent_index: "13",
  optimized_voc_index: "110",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "158",
  frequency: "368",
  furigana: "好[す]き",
  kana: "すき",
  kanji: "好き",
  optimized_sent_index: "25",
  optimized_voc_index: "111",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "260",
  frequency: "3717",
  furigana: "大好[だいす]き",
  kana: "だいすき",
  kanji: "大好き",
  optimized_sent_index: "358",
  optimized_voc_index: "112",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "8",
  frequency: "41",
  furigana: "私[わたし]",
  kana: "わたし",
  kanji: "私",
  optimized_sent_index: "24",
  optimized_voc_index: "113",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "151",
  frequency: "1384",
  furigana: "友達[ともだち]",
  kana: "ともだち",
  kanji: "友達",
  optimized_sent_index: "28",
  optimized_voc_index: "114",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "5",
  frequency: "114",
  furigana: "家[うち]",
  kana: "うち",
  kanji: "家",
  optimized_sent_index: "187",
  optimized_voc_index: "115",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "73",
  frequency: "106",
  furigana: "気[き]",
  kana: "き",
  kanji: "気",
  optimized_sent_index: "269",
  optimized_voc_index: "116",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "191",
  frequency: "1055",
  furigana: "元気[げんき]",
  kana: "げんき",
  kanji: "元気",
  optimized_sent_index: "30",
  optimized_voc_index: "117",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "235",
  frequency: "5509",
  furigana: "天気[てんき]",
  kana: "てんき",
  kanji: "天気",
  optimized_sent_index: "31",
  optimized_voc_index: "118",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "259",
  frequency: "3331",
  furigana: "晴[は]れる",
  kana: "はれる",
  kanji: "晴れる",
  optimized_sent_index: "33",
  optimized_voc_index: "119",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "55",
  frequency: "253",
  furigana: "こう",
  kana: "こう",
  kanji: "こう",
  optimized_sent_index: "59",
  optimized_voc_index: "120",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "344",
  frequency: "878",
  furigana: "昨日[きのう]",
  kana: "きのう",
  kanji: "昨日",
  optimized_sent_index: "62",
  optimized_voc_index: "121",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "213",
  frequency: "478",
  furigana: "開[あ]ける",
  kana: "あける",
  kanji: "開ける",
  optimized_sent_index: "190",
  optimized_voc_index: "122",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "273",
  frequency: "280",
  furigana: "開[ひら]く",
  kana: "ひらく",
  kanji: "開く",
  optimized_sent_index: "36",
  optimized_voc_index: "123",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "201",
  frequency: "1059",
  furigana: "閉[と]じる",
  kana: "とじる",
  kanji: "閉じる",
  optimized_sent_index: "259",
  optimized_voc_index: "124",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "251",
  frequency: "2053",
  furigana: "閉[し]める",
  kana: "しめる",
  kanji: "閉める",
  optimized_sent_index: "38",
  optimized_voc_index: "125",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "277",
  frequency: "5612",
  furigana: "閉[し]まる",
  kana: "しまる",
  kanji: "閉まる",
  optimized_sent_index: "86",
  optimized_voc_index: "126",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "47",
  frequency: "117",
  furigana: "聞[き]く",
  kana: "きく",
  kanji: "聞く",
  optimized_sent_index: "215",
  optimized_voc_index: "127",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "18",
  frequency: "188",
  furigana: "時間[じかん]",
  kana: "じかん",
  kanji: "時間",
  optimized_sent_index: "39",
  optimized_voc_index: "128",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "32",
  frequency: "294",
  furigana: "高[たか]い",
  kana: "たかい",
  kanji: "高い",
  optimized_sent_index: "107",
  optimized_voc_index: "129",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "57",
  frequency: "80",
  furigana: "くれる",
  kana: "くれる",
  kanji: "くれる",
  optimized_sent_index: "325",
  optimized_voc_index: "130",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "100",
  frequency: "2485",
  furigana: "安[やす]い",
  kana: "やすい",
  kanji: "安い",
  optimized_sent_index: "188",
  optimized_voc_index: "131",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "107",
  frequency: "675",
  furigana: "低[ひく]い",
  kana: "ひくい",
  kanji: "低い",
  optimized_sent_index: "340",
  optimized_voc_index: "132",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "310",
  frequency: "88",
  furigana: "前[まえ]",
  kana: "まえ",
  kanji: "前",
  optimized_sent_index: "87",
  optimized_voc_index: "133",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "70",
  frequency: "194",
  furigana: "後[あと]",
  kana: "あと",
  kanji: "後",
  optimized_sent_index: "169",
  optimized_voc_index: "134",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "209",
  frequency: "826",
  furigana: "後[うし]ろ",
  kana: "うしろ",
  kanji: "後ろ",
  optimized_sent_index: "41",
  optimized_voc_index: "135",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "42",
  frequency: "792",
  furigana: "午後[ごご]",
  kana: "ごご",
  kanji: "午後",
  optimized_sent_index: "109",
  optimized_voc_index: "136",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "60",
  frequency: "1918",
  furigana: "午前[ごぜん]",
  kana: "ごぜん",
  kanji: "午前",
  optimized_sent_index: "43",
  optimized_voc_index: "137",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "88",
  frequency: "431",
  furigana: "朝[あさ]",
  kana: "あさ",
  kanji: "朝",
  optimized_sent_index: "115",
  optimized_voc_index: "138",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "214",
  frequency: "2069",
  furigana: "昼[ひる]",
  kana: "ひる",
  kanji: "昼",
  optimized_sent_index: "54",
  optimized_voc_index: "139",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "65",
  frequency: "516",
  furigana: "かなり",
  kana: "かなり",
  kanji: "かなり",
  optimized_sent_index: "217",
  optimized_voc_index: "140",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "238",
  frequency: "901",
  furigana: "晩[ばん]",
  kana: "ばん",
  kanji: "晩",
  optimized_sent_index: "51",
  optimized_voc_index: "141",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "295",
  frequency: "4532",
  furigana: "今晩[こんばん]",
  kana: "こんばん",
  kanji: "今晩",
  optimized_sent_index: "44",
  optimized_voc_index: "142",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "386",
  frequency: "211",
  furigana: "夜[よる]",
  kana: "よる",
  kanji: "夜",
  optimized_sent_index: "48",
  optimized_voc_index: "143",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "109",
  frequency: "393",
  furigana: "食[た]べる",
  kana: "たべる",
  kanji: "食べる",
  optimized_sent_index: "49",
  optimized_voc_index: "144",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "188",
  frequency: "335",
  furigana: "飲[の]む",
  kana: "のむ",
  kanji: "飲む",
  optimized_sent_index: "265",
  optimized_voc_index: "145",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "265",
  frequency: "6578",
  furigana: "ご 飯[はん]",
  kana: "ごはん",
  kanji: "ご飯",
  optimized_sent_index: "52",
  optimized_voc_index: "146",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "61",
  frequency: "437",
  furigana: "買[か]う",
  kana: "かう",
  kanji: "買う",
  optimized_sent_index: "142",
  optimized_voc_index: "147",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "2",
  frequency: "45",
  furigana: "見[み]る",
  kana: "みる",
  kanji: "見る",
  optimized_sent_index: "166",
  optimized_voc_index: "148",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "122",
  frequency: "288",
  furigana: "見[み]せる",
  kana: "みせる",
  kanji: "見せる",
  optimized_sent_index: "170",
  optimized_voc_index: "149",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "75",
  frequency: "367",
  furigana: "もっと",
  kana: "もっと",
  kanji: "もっと",
  optimized_sent_index: "72",
  optimized_voc_index: "150",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "149",
  frequency: "728",
  furigana: "見[み]つける",
  kana: "みつける",
  kanji: "見つける",
  optimized_sent_index: "98",
  optimized_voc_index: "151",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "379",
  frequency: "132",
  furigana: "見[み]える",
  kana: "みえる",
  kanji: "見える",
  optimized_sent_index: "330",
  optimized_voc_index: "152",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "400",
  frequency: "1183",
  furigana: "見[み]つかる",
  kana: "みつかる",
  kanji: "見つかる",
  optimized_sent_index: "55",
  optimized_voc_index: "153",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "28",
  frequency: "32",
  furigana: "言[い]う",
  kana: "いう",
  kanji: "言う",
  optimized_sent_index: "350",
  optimized_voc_index: "154",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "102",
  frequency: "240",
  furigana: "話[はな]す",
  kana: "はなす",
  kanji: "話す",
  optimized_sent_index: "193",
  optimized_voc_index: "155",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "146",
  frequency: "344",
  furigana: "読[よ]む",
  kana: "よむ",
  kanji: "読む",
  optimized_sent_index: "232",
  optimized_voc_index: "156",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "168",
  frequency: "7172",
  furigana: "漢字[かんじ]",
  kana: "かんじ",
  kanji: "漢字",
  optimized_sent_index: "77",
  optimized_voc_index: "157",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "101",
  frequency: "193",
  furigana: "書[か]く",
  kana: "かく",
  kanji: "書く",
  optimized_sent_index: "226",
  optimized_voc_index: "158",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "156",
  frequency: "555",
  furigana: "覚[おぼ]える",
  kana: "おぼえる",
  kanji: "覚える",
  optimized_sent_index: "344",
  optimized_voc_index: "159",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "85",
  frequency: "135",
  furigana: "そこ",
  kana: "そこ",
  kanji: "そこ",
  optimized_sent_index: "148",
  optimized_voc_index: "160",
  partOfSpeech: "Pronoun"
}, {

  alt_spelling: {},
  core_index: "92",
  frequency: "264",
  furigana: "会[あ]う",
  kana: "あう",
  kanji: "会う",
  optimized_sent_index: "60",
  optimized_voc_index: "161",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "9",
  frequency: "236",
  furigana: "仕事[しごと]",
  kana: "しごと",
  kanji: "仕事",
  optimized_sent_index: "261",
  optimized_voc_index: "162",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "398",
  frequency: "375",
  furigana: "場合[ばあい]",
  kana: "ばあい",
  kanji: "場合",
  optimized_sent_index: "66",
  optimized_voc_index: "163",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "79",
  frequency: "305",
  furigana: "車[くるま]",
  kana: "くるま",
  kanji: "車",
  optimized_sent_index: "202",
  optimized_voc_index: "164",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "170",
  frequency: "1809",
  furigana: "電車[でんしゃ]",
  kana: "でんしゃ",
  kanji: "電車",
  optimized_sent_index: "117",
  optimized_voc_index: "165",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "334",
  frequency: "817",
  furigana: "駅[えき]",
  kana: "えき",
  kanji: "駅",
  optimized_sent_index: "68",
  optimized_voc_index: "166",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "381",
  frequency: "277",
  furigana: "道[みち]",
  kana: "みち",
  kanji: "道",
  optimized_sent_index: "175",
  optimized_voc_index: "167",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "375",
  frequency: "274",
  furigana: "他[ほか]",
  kana: "ほか",
  kanji: "他",
  optimized_sent_index: "136",
  optimized_voc_index: "168",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "384",
  frequency: "652",
  furigana: "止[や]める",
  kana: "やめる",
  kanji: "止める",
  optimized_sent_index: "69",
  optimized_voc_index: "169",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "105",
  frequency: "116",
  furigana: "ここ",
  kana: "ここ",
  kanji: "ここ",
  optimized_sent_index: "14",
  optimized_voc_index: "170",
  partOfSpeech: "Pronoun"
}, {

  alt_spelling: {},
  core_index: "90",
  frequency: "198",
  furigana: "歩[ある]く",
  kana: "あるく",
  kanji: "歩く",
  optimized_sent_index: "70",
  optimized_voc_index: "171",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "86",
  frequency: "320",
  furigana: "走[はし]る",
  kana: "はしる",
  kanji: "走る",
  optimized_sent_index: "222",
  optimized_voc_index: "172",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "39",
  frequency: "453",
  furigana: "近[ちか]く",
  kana: "ちかく",
  kanji: "近く",
  optimized_sent_index: "71",
  optimized_voc_index: "173",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "84",
  frequency: "645",
  furigana: "近[ちか]い",
  kana: "ちかい",
  kanji: "近い",
  optimized_sent_index: "73",
  optimized_voc_index: "174",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "228",
  frequency: "453",
  furigana: "近[ちか]く",
  kana: "ちかく",
  kanji: "近く",
  optimized_sent_index: "74",
  optimized_voc_index: "175",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "181",
  frequency: "653",
  furigana: "遠[とお]い",
  kana: "とおい",
  kanji: "遠い",
  optimized_sent_index: "119",
  optimized_voc_index: "176",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "43",
  frequency: "316",
  furigana: "長[なが]い",
  kana: "ながい",
  kanji: "長い",
  optimized_sent_index: "367",
  optimized_voc_index: "177",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "133",
  frequency: "1071",
  furigana: "短[みじか]い",
  kana: "みじかい",
  kanji: "短い",
  optimized_sent_index: "230",
  optimized_voc_index: "178",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "81",
  frequency: "830",
  furigana: "広[ひろ]い",
  kana: "ひろい",
  kanji: "広い",
  optimized_sent_index: "221",
  optimized_voc_index: "179",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "108",
  frequency: "224",
  furigana: "もらう",
  kana: "もらう",
  kanji: "もらう",
  optimized_sent_index: "227",
  optimized_voc_index: "180",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "193",
  frequency: "777",
  furigana: "全部[ぜんぶ]",
  kana: "ぜんぶ",
  kanji: "全部",
  optimized_sent_index: "75",
  optimized_voc_index: "181",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "25",
  frequency: "373",
  furigana: "国[くに]",
  kana: "くに",
  kanji: "国",
  optimized_sent_index: "76",
  optimized_voc_index: "182",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "136",
  frequency: "337",
  furigana: "白[しろ]い",
  kana: "しろい",
  kanji: "白い",
  optimized_sent_index: "258",
  optimized_voc_index: "183",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "161",
  frequency: "586",
  furigana: "赤[あか]い",
  kana: "あかい",
  kanji: "赤い",
  optimized_sent_index: "78",
  optimized_voc_index: "184",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "93",
  frequency: "153",
  furigana: "部屋[へや]",
  kana: "へや",
  kanji: "部屋",
  optimized_sent_index: "89",
  optimized_voc_index: "185",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "203",
  frequency: "1104",
  furigana: "米[こめ]",
  kana: "こめ",
  kanji: "米",
  optimized_sent_index: "80",
  optimized_voc_index: "186",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "26",
  frequency: "134",
  furigana: "まだ",
  kana: "まだ",
  kanji: "まだ",
  optimized_sent_index: "184",
  optimized_voc_index: "187",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "328",
  frequency: "15",
  furigana: "ある",
  kana: "ある",
  kanji: "ある",
  optimized_sent_index: "364",
  optimized_voc_index: "188",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "255",
  frequency: "1082",
  furigana: "無[な]い",
  kana: "ない",
  kanji: "無い",
  optimized_sent_index: "82",
  optimized_voc_index: "189",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "124",
  frequency: "426",
  furigana: "とても",
  kana: "とても",
  kanji: "とても",
  optimized_sent_index: "15",
  optimized_voc_index: "190",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "21",
  frequency: "388",
  furigana: "作[つく]る",
  kana: "つくる",
  kanji: "作る",
  optimized_sent_index: "83",
  optimized_voc_index: "191",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "14",
  frequency: "248",
  furigana: "使[つか]う",
  kana: "つかう",
  kanji: "使う",
  optimized_sent_index: "84",
  optimized_voc_index: "192",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "190",
  frequency: "1001",
  furigana: "消[け]す",
  kana: "けす",
  kanji: "消す",
  optimized_sent_index: "85",
  optimized_voc_index: "193",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "87",
  frequency: "973",
  furigana: "売[う]る",
  kana: "うる",
  kanji: "売る",
  optimized_sent_index: "223",
  optimized_voc_index: "194",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "380",
  frequency: "354",
  furigana: "店[みせ]",
  kana: "みせ",
  kanji: "店",
  optimized_sent_index: "88",
  optimized_voc_index: "195",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "59",
  frequency: "963",
  furigana: "春[はる]",
  kana: "はる",
  kanji: "春",
  optimized_sent_index: "96",
  optimized_voc_index: "196",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "366",
  frequency: "794",
  furigana: "夏[なつ]",
  kana: "なつ",
  kanji: "夏",
  optimized_sent_index: "90",
  optimized_voc_index: "197",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "95",
  frequency: "1260",
  furigana: "秋[あき]",
  kana: "あき",
  kanji: "秋",
  optimized_sent_index: "245",
  optimized_voc_index: "198",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "142",
  frequency: "1235",
  furigana: "冬[ふゆ]",
  kana: "ふゆ",
  kanji: "冬",
  optimized_sent_index: "93",
  optimized_voc_index: "199",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "129",
  frequency: "257",
  furigana: "みんな",
  kana: "みんな",
  kanji: "みんな",
  optimized_sent_index: "372",
  optimized_voc_index: "200",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "236",
  frequency: "2161",
  furigana: "暑[あつ]い",
  kana: "あつい",
  kanji: "暑い",
  optimized_sent_index: "91",
  optimized_voc_index: "201",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "223",
  frequency: "1315",
  furigana: "熱[あつ]い",
  kana: "あつい",
  kanji: "熱い",
  optimized_sent_index: "92",
  optimized_voc_index: "202",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "352",
  frequency: "1282",
  furigana: "寒[さむ]い",
  kana: "さむい",
  kanji: "寒い",
  optimized_sent_index: "95",
  optimized_voc_index: "203",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "327",
  frequency: "4365",
  furigana: "暖[あたた]かい",
  kana: "あたたかい",
  kanji: "暖かい",
  optimized_sent_index: "97",
  optimized_voc_index: "204",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "7",
  frequency: "591",
  furigana: "新[あたら]しい",
  kana: "あたらしい",
  kanji: "新しい",
  optimized_sent_index: "209",
  optimized_voc_index: "205",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "117",
  frequency: "909",
  furigana: "古[ふる]い",
  kana: "ふるい",
  kanji: "古い",
  optimized_sent_index: "100",
  optimized_voc_index: "206",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "329",
  frequency: "584",
  furigana: "良[い]い",
  kana: "いい",
  kanji: "良い",
  optimized_sent_index: "241",
  optimized_voc_index: "207",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "390",
  frequency: "217",
  furigana: "悪[わる]い",
  kana: "わるい",
  kanji: "悪い",
  optimized_sent_index: "101",
  optimized_voc_index: "208",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "16",
  frequency: "43",
  furigana: "思[おも]う",
  kana: "おもう",
  kanji: "思う",
  optimized_sent_index: "102",
  optimized_voc_index: "209",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "138",
  frequency: "241",
  furigana: "いつも",
  kana: "いつも",
  kanji: "いつも",
  optimized_sent_index: "231",
  optimized_voc_index: "210",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "152",
  frequency: "349",
  furigana: "忘[わす]れる",
  kana: "わすれる",
  kanji: "忘れる",
  optimized_sent_index: "145",
  optimized_voc_index: "211",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "33",
  frequency: "109",
  furigana: "考[かんが]える",
  kana: "かんがえる",
  kanji: "考える",
  optimized_sent_index: "105",
  optimized_voc_index: "212",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "31",
  frequency: "910",
  furigana: "決[き]める",
  kana: "きめる",
  kanji: "決める",
  optimized_sent_index: "106",
  optimized_voc_index: "213",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "206",
  frequency: "1287",
  furigana: "決[き]まる",
  kana: "きまる",
  kanji: "決まる",
  optimized_sent_index: "317",
  optimized_voc_index: "214",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "20",
  frequency: "85",
  furigana: "知[し]る",
  kana: "しる",
  kanji: "知る",
  optimized_sent_index: "321",
  optimized_voc_index: "215",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "165",
  frequency: "620",
  furigana: "一番[いちばん]",
  kana: "いちばん",
  kanji: "一番",
  optimized_sent_index: "341",
  optimized_voc_index: "216",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "67",
  frequency: "597",
  furigana: "住[す]む",
  kana: "すむ",
  kanji: "住む",
  optimized_sent_index: "218",
  optimized_voc_index: "217",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "112",
  frequency: "378",
  furigana: "名前[なまえ]",
  kana: "なまえ",
  kanji: "名前",
  optimized_sent_index: "120",
  optimized_voc_index: "218",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "231",
  frequency: "5010",
  furigana: "食[た]べ 物[もの]",
  kana: "たべもの",
  kanji: "食べ物",
  optimized_sent_index: "349",
  optimized_voc_index: "219",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "150",
  frequency: "443",
  furigana: "いつ",
  kana: "いつ",
  kanji: "いつ",
  optimized_sent_index: "233",
  optimized_voc_index: "220",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "285",
  frequency: "8782",
  furigana: "飲[の]み 物[もの]",
  kana: "のみもの",
  kanji: "飲み物",
  optimized_sent_index: "168",
  optimized_voc_index: "221",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "144",
  frequency: "825",
  furigana: "重[おも]い",
  kana: "おもい",
  kanji: "重い",
  optimized_sent_index: "110",
  optimized_voc_index: "222",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "148",
  frequency: "643",
  furigana: "軽[かる]い",
  kana: "かるい",
  kanji: "軽い",
  optimized_sent_index: "392",
  optimized_voc_index: "223",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "97",
  frequency: "562",
  furigana: "送[おく]る",
  kana: "おくる",
  kanji: "送る",
  optimized_sent_index: "225",
  optimized_voc_index: "224",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "130",
  frequency: "289",
  furigana: "取[と]る",
  kana: "とる",
  kanji: "取る",
  optimized_sent_index: "128",
  optimized_voc_index: "225",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "106",
  frequency: "203",
  furigana: "待[ま]つ",
  kana: "まつ",
  kanji: "待つ",
  optimized_sent_index: "112",
  optimized_voc_index: "226",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "17",
  frequency: "127",
  furigana: "持[も]つ",
  kana: "もつ",
  kanji: "持つ",
  optimized_sent_index: "114",
  optimized_voc_index: "227",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "77",
  frequency: "571",
  furigana: "気持[きも]ち",
  kana: "きもち",
  kanji: "気持ち",
  optimized_sent_index: "220",
  optimized_voc_index: "228",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "49",
  frequency: "331",
  furigana: "生[い]きる",
  kana: "いきる",
  kanji: "生きる",
  optimized_sent_index: "366",
  optimized_voc_index: "229",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "154",
  frequency: "1204",
  furigana: "どちら",
  kana: "どちら",
  kanji: "どちら",
  optimized_sent_index: "79",
  optimized_voc_index: "230",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "71",
  frequency: "205",
  furigana: "先生[せんせい]",
  kana: "せんせい",
  kanji: "先生",
  optimized_sent_index: "116",
  optimized_voc_index: "231",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "37",
  frequency: "999",
  furigana: "大学[だいがく]",
  kana: "だいがく",
  kanji: "大学",
  optimized_sent_index: "121",
  optimized_voc_index: "232",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "41",
  frequency: "1481",
  furigana: "学生[がくせい]",
  kana: "がくせい",
  kanji: "学生",
  optimized_sent_index: "212",
  optimized_voc_index: "233",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "217",
  frequency: "6609",
  furigana: "大学生[だいがくせい]",
  kana: "だいがくせい",
  kanji: "大学生",
  optimized_sent_index: "197",
  optimized_voc_index: "234",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "56",
  frequency: "596",
  furigana: "学校[がっこう]",
  kana: "がっこう",
  kanji: "学校",
  optimized_sent_index: "157",
  optimized_voc_index: "235",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "319",
  frequency: "4215",
  furigana: "高校生[こうこうせい]",
  kana: "こうこうせい",
  kanji: "高校生",
  optimized_sent_index: "203",
  optimized_voc_index: "236",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "89",
  frequency: "470",
  furigana: "教[おし]える",
  kana: "おしえる",
  kanji: "教える",
  optimized_sent_index: "224",
  optimized_voc_index: "237",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "131",
  frequency: "1605",
  furigana: "勉強[べんきょう]",
  kana: "べんきょう",
  kanji: "勉強",
  optimized_sent_index: "122",
  optimized_voc_index: "238",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "321",
  frequency: "304",
  furigana: "強[つよ]い",
  kana: "つよい",
  kanji: "強い",
  optimized_sent_index: "123",
  optimized_voc_index: "239",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "160",
  frequency: "870",
  furigana: "どれ",
  kana: "どれ",
  kanji: "どれ",
  optimized_sent_index: "23",
  optimized_voc_index: "240",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "182",
  frequency: "1561",
  furigana: "弱[よわ]い",
  kana: "よわい",
  kanji: "弱い",
  optimized_sent_index: "124",
  optimized_voc_index: "241",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "195",
  frequency: "497",
  furigana: "引[ひ]く",
  kana: "ひく",
  kanji: "引く",
  optimized_sent_index: "125",
  optimized_voc_index: "242",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "126",
  frequency: "843",
  furigana: "質問[しつもん]",
  kana: "しつもん",
  kanji: "質問",
  optimized_sent_index: "126",
  optimized_voc_index: "243",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "96",
  frequency: "1764",
  furigana: "難[むずか]しい",
  kana: "むずかしい",
  kanji: "難しい",
  optimized_sent_index: "127",
  optimized_voc_index: "244",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "83",
  frequency: "254",
  furigana: "数[かず]",
  kana: "かず",
  kanji: "数",
  optimized_sent_index: "129",
  optimized_voc_index: "245",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "140",
  frequency: "1543",
  furigana: "勝[か]つ",
  kana: "かつ",
  kanji: "勝つ",
  optimized_sent_index: "133",
  optimized_voc_index: "246",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "192",
  frequency: "1397",
  furigana: "負[ま]ける",
  kana: "まける",
  kanji: "負ける",
  optimized_sent_index: "134",
  optimized_voc_index: "247",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "393",
  frequency: "442",
  furigana: "本当[ほんとう]に",
  kana: "ほんとうに",
  kanji: "本当に",
  optimized_sent_index: "135",
  optimized_voc_index: "248",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "254",
  frequency: "4358",
  furigana: "要[い]る",
  kana: "いる",
  kanji: "要る",
  optimized_sent_index: "144",
  optimized_voc_index: "249",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "200",
  frequency: "341",
  furigana: "ドア",
  kana: "ドア",
  kanji: "ドア",
  optimized_sent_index: "35",
  optimized_voc_index: "250",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "244",
  frequency: "1619",
  furigana: "時計[とけい]",
  kana: "とけい",
  kanji: "時計",
  optimized_sent_index: "137",
  optimized_voc_index: "251",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "147",
  frequency: "1068",
  furigana: "払[はら]う",
  kana: "はらう",
  kanji: "払う",
  optimized_sent_index: "139",
  optimized_voc_index: "252",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "204",
  frequency: "428",
  furigana: "切[き]る",
  kana: "きる",
  kanji: "切る",
  optimized_sent_index: "164",
  optimized_voc_index: "253",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "80",
  frequency: "718",
  furigana: "変[か]える",
  kana: "かえる",
  kanji: "変える",
  optimized_sent_index: "316",
  optimized_voc_index: "254",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "99",
  frequency: "397",
  furigana: "乗[の]る",
  kana: "のる",
  kanji: "乗る",
  optimized_sent_index: "146",
  optimized_voc_index: "255",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "163",
  frequency: "510",
  furigana: "着[き]る",
  kana: "きる",
  kanji: "着る",
  optimized_sent_index: "147",
  optimized_voc_index: "256",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "72",
  frequency: "166",
  furigana: "立[た]つ",
  kana: "たつ",
  kanji: "立つ",
  optimized_sent_index: "219",
  optimized_voc_index: "257",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "184",
  frequency: "853",
  furigana: "座[すわ]る",
  kana: "すわる",
  kanji: "座る",
  optimized_sent_index: "308",
  optimized_voc_index: "258",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "120",
  frequency: "323",
  furigana: "次[つぎ]",
  kana: "つぎ",
  kanji: "次",
  optimized_sent_index: "149",
  optimized_voc_index: "259",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "227",
  frequency: "1299",
  furigana: "喋る[しゃべる]",
  kana: "しゃべる",
  kanji: "喋る",
  optimized_sent_index: "238",
  optimized_voc_index: "260",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "333",
  frequency: "391",
  furigana: "動[うご]く",
  kana: "うごく",
  kanji: "動く",
  optimized_sent_index: "151",
  optimized_voc_index: "261",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "69",
  frequency: "801",
  furigana: "働[はたら]く",
  kana: "はたらく",
  kanji: "働く",
  optimized_sent_index: "195",
  optimized_voc_index: "262",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "110",
  frequency: "311",
  furigana: "早[はや]い",
  kana: "はやい",
  kanji: "早い",
  optimized_sent_index: "153",
  optimized_voc_index: "263",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "176",
  frequency: "2183",
  furigana: "速[はや]い",
  kana: "はやい",
  kanji: "速い",
  optimized_sent_index: "234",
  optimized_voc_index: "264",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "174",
  frequency: "1252",
  furigana: "遅[おそ]い",
  kana: "おそい",
  kanji: "遅い",
  optimized_sent_index: "155",
  optimized_voc_index: "265",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "10",
  frequency: "400",
  furigana: "始[はじ]める",
  kana: "はじめる",
  kanji: "始める",
  optimized_sent_index: "156",
  optimized_voc_index: "266",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "232",
  frequency: "1066",
  furigana: "始[はじ]まる",
  kana: "はじまる",
  kanji: "始まる",
  optimized_sent_index: "160",
  optimized_voc_index: "267",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "63",
  frequency: "611",
  furigana: "終[お]わる",
  kana: "おわる",
  kanji: "終わる",
  optimized_sent_index: "251",
  optimized_voc_index: "268",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "218",
  frequency: "2031",
  furigana: "終[お]わり",
  kana: "おわり",
  kanji: "終わり",
  optimized_sent_index: "162",
  optimized_voc_index: "269",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "230",
  frequency: "656",
  furigana: "テーブル",
  kana: "テーブル",
  kanji: "テーブル",
  optimized_sent_index: "99",
  optimized_voc_index: "270",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "194",
  frequency: "2474",
  furigana: "去年[きょねん]",
  kana: "きょねん",
  kanji: "去年",
  optimized_sent_index: "163",
  optimized_voc_index: "271",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "172",
  frequency: "1236",
  furigana: "紙[かみ]",
  kana: "かみ",
  kanji: "紙",
  optimized_sent_index: "374",
  optimized_voc_index: "272",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "127",
  frequency: "1799",
  furigana: "楽[たの]しむ",
  kana: "たのしむ",
  kanji: "楽しむ",
  optimized_sent_index: "167",
  optimized_voc_index: "273",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "207",
  frequency: "926",
  furigana: "楽[たの]しい",
  kana: "たのしい",
  kanji: "楽しい",
  optimized_sent_index: "237",
  optimized_voc_index: "274",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "173",
  frequency: "1695",
  furigana: "歌[うた]う",
  kana: "うたう",
  kanji: "歌う",
  optimized_sent_index: "356",
  optimized_voc_index: "275",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "377",
  frequency: "976",
  furigana: "欲[ほ]しい",
  kana: "ほしい",
  kanji: "欲しい",
  optimized_sent_index: "394",
  optimized_voc_index: "276",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "128",
  frequency: "407",
  furigana: "色[いろ]",
  kana: "いろ",
  kanji: "色",
  optimized_sent_index: "171",
  optimized_voc_index: "277",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "261",
  frequency: "5141",
  furigana: "茶色[ちゃいろ]",
  kana: "ちゃいろ",
  kanji: "茶色",
  optimized_sent_index: "393",
  optimized_voc_index: "278",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "91",
  frequency: "162",
  furigana: "すぐ",
  kana: "すぐ",
  kanji: "すぐ",
  optimized_sent_index: "172",
  optimized_voc_index: "279",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "233",
  frequency: "2307",
  furigana: "ゲーム",
  kana: "ゲーム",
  kanji: "ゲーム",
  optimized_sent_index: "26",
  optimized_voc_index: "280",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "284",
  frequency: "25047",
  furigana: "書[か]き 直[なお]す",
  kana: "かきなおす",
  kanji: "書き直す",
  optimized_sent_index: "173",
  optimized_voc_index: "281",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "300",
  frequency: "9929",
  furigana: "直[なお]る",
  kana: "なおる",
  kanji: "直る",
  optimized_sent_index: "174",
  optimized_voc_index: "282",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "205",
  frequency: "1289",
  furigana: "線[せん]",
  kana: "せん",
  kanji: "線",
  optimized_sent_index: "176",
  optimized_voc_index: "283",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "248",
  frequency: "3456",
  furigana: "曲[ま]がる",
  kana: "まがる",
  kanji: "曲がる",
  optimized_sent_index: "177",
  optimized_voc_index: "284",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "22",
  frequency: "157",
  furigana: "同[おな]じ",
  kana: "おなじ",
  kanji: "同じ",
  optimized_sent_index: "288",
  optimized_voc_index: "285",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "315",
  frequency: "298",
  furigana: "違[ちが]う",
  kana: "ちがう",
  kanji: "違う",
  optimized_sent_index: "253",
  optimized_voc_index: "286",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "196",
  frequency: "5144",
  furigana: "図書館[としょかん]",
  kana: "としょかん",
  kanji: "図書館",
  optimized_sent_index: "183",
  optimized_voc_index: "287",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "245",
  frequency: "3281",
  furigana: "泊[と]まる",
  kana: "とまる",
  kanji: "泊まる",
  optimized_sent_index: "186",
  optimized_voc_index: "288",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "180",
  frequency: "1496",
  furigana: "遊[あそ]ぶ",
  kana: "あそぶ",
  kanji: "遊ぶ",
  optimized_sent_index: "271",
  optimized_voc_index: "289",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "246",
  frequency: "276",
  furigana: "どうして",
  kana: "どうして",
  kanji: "どうして",
  optimized_sent_index: "329",
  optimized_voc_index: "290",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "208",
  frequency: "871",
  furigana: "服[ふく]",
  kana: "ふく",
  kanji: "服",
  optimized_sent_index: "189",
  optimized_voc_index: "291",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "242",
  frequency: "1267",
  furigana: "お 父[とう]さん",
  kana: "おとうさん",
  kanji: "お父さん",
  optimized_sent_index: "191",
  optimized_voc_index: "292",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "358",
  frequency: "296",
  furigana: "父[ちち]",
  kana: "ちち",
  kanji: "父",
  optimized_sent_index: "192",
  optimized_voc_index: "293",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "215",
  frequency: "1238",
  furigana: "お 母[かあ]さん",
  kana: "おかあさん",
  kanji: "お母さん",
  optimized_sent_index: "353",
  optimized_voc_index: "294",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "370",
  frequency: "356",
  furigana: "母[はは]",
  kana: "はは",
  kanji: "母",
  optimized_sent_index: "194",
  optimized_voc_index: "295",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "116",
  frequency: "959",
  furigana: "親[おや]",
  kana: "おや",
  kanji: "親",
  optimized_sent_index: "323",
  optimized_voc_index: "296",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "155",
  frequency: "1057",
  furigana: "姉[あね]",
  kana: "あね",
  kanji: "姉",
  optimized_sent_index: "196",
  optimized_voc_index: "297",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "299",
  frequency: "6069",
  furigana: "お 姉[ねえ]さん",
  kana: "おねえさん",
  kanji: "お姉さん",
  optimized_sent_index: "198",
  optimized_voc_index: "298",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "331",
  frequency: "849",
  furigana: "妹[いもうと]",
  kana: "いもうと",
  kanji: "妹",
  optimized_sent_index: "200",
  optimized_voc_index: "299",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "249",
  frequency: "7611",
  furigana: "おなか",
  kana: "おなか",
  kanji: "おなか",
  optimized_sent_index: "18",
  optimized_voc_index: "300",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "111",
  frequency: "731",
  furigana: "兄[あに]",
  kana: "あに",
  kanji: "兄",
  optimized_sent_index: "331",
  optimized_voc_index: "301",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "304",
  frequency: "6697",
  furigana: "お 兄[にい]さん",
  kana: "おにいさん",
  kanji: "お兄さん",
  optimized_sent_index: "201",
  optimized_voc_index: "302",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "337",
  frequency: "998",
  furigana: "弟[おとうと]",
  kana: "おとうと",
  kanji: "弟",
  optimized_sent_index: "284",
  optimized_voc_index: "303",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "123",
  frequency: "223",
  furigana: "娘[むすめ]",
  kana: "むすめ",
  kanji: "娘",
  optimized_sent_index: "204",
  optimized_voc_index: "304",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "135",
  frequency: "796",
  furigana: "息子[むすこ]",
  kana: "むすこ",
  kanji: "息子",
  optimized_sent_index: "206",
  optimized_voc_index: "305",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "64",
  frequency: "282",
  furigana: "若[わか]い",
  kana: "わかい",
  kanji: "若い",
  optimized_sent_index: "216",
  optimized_voc_index: "306",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "46",
  frequency: "82",
  furigana: "彼女[かのじょ]",
  kana: "かのじょ",
  kanji: "彼女",
  optimized_sent_index: "214",
  optimized_voc_index: "307",
  partOfSpeech: "Pronoun"
}, {

  alt_spelling: {},
  core_index: "343",
  frequency: "49",
  furigana: "彼[かれ]",
  kana: "かれ",
  kanji: "彼",
  optimized_sent_index: "351",
  optimized_voc_index: "308",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "115",
  frequency: "521",
  furigana: "結婚[けっこん]",
  kana: "けっこん",
  kanji: "結婚",
  optimized_sent_index: "246",
  optimized_voc_index: "309",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "250",
  frequency: "23773",
  furigana: "ミーティング",
  kana: "ミーティング",
  kanji: "ミーティング",
  optimized_sent_index: "161",
  optimized_voc_index: "310",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "169",
  frequency: "2691",
  furigana: "自転車[じてんしゃ]",
  kana: "じてんしゃ",
  kanji: "自転車",
  optimized_sent_index: "248",
  optimized_voc_index: "311",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "394",
  frequency: "56",
  furigana: "自分[じぶん]",
  kana: "じぶん",
  kanji: "自分",
  optimized_sent_index: "249",
  optimized_voc_index: "312",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "392",
  frequency: "3584",
  furigana: "ご 主人[しゅじん]",
  kana: "ごしゅじん",
  kanji: "ご主人",
  optimized_sent_index: "250",
  optimized_voc_index: "313",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "350",
  frequency: "227",
  furigana: "答[こた]える",
  kana: "こたえる",
  kanji: "答える",
  optimized_sent_index: "254",
  optimized_voc_index: "314",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "62",
  frequency: "369",
  furigana: "別[べつ]",
  kana: "べつ",
  kanji: "別",
  optimized_sent_index: "255",
  optimized_voc_index: "315",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "141",
  frequency: "1173",
  furigana: "病気[びょうき]",
  kana: "びょうき",
  kanji: "病気",
  optimized_sent_index: "387",
  optimized_voc_index: "316",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "98",
  frequency: "183",
  furigana: "死[し]ぬ",
  kana: "しぬ",
  kanji: "死ぬ",
  optimized_sent_index: "357",
  optimized_voc_index: "317",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "241",
  frequency: "1184",
  furigana: "痛[いた]い",
  kana: "いたい",
  kanji: "痛い",
  optimized_sent_index: "277",
  optimized_voc_index: "318",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "153",
  frequency: "463",
  furigana: "酒[さけ]",
  kana: "さけ",
  kanji: "酒",
  optimized_sent_index: "264",
  optimized_voc_index: "319",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "268",
  frequency: "168",
  furigana: "つける",
  kana: "つける",
  kanji: "つける",
  optimized_sent_index: "67",
  optimized_voc_index: "320",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "312",
  frequency: "5902",
  furigana: "一杯[いっぱい]",
  kana: "いっぱい",
  kanji: "一杯",
  optimized_sent_index: "268",
  optimized_voc_index: "321",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "78",
  frequency: "580",
  furigana: "飛[と]ぶ",
  kana: "とぶ",
  kanji: "飛ぶ",
  optimized_sent_index: "355",
  optimized_voc_index: "322",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "139",
  frequency: "2223",
  furigana: "飛行機[ひこうき]",
  kana: "ひこうき",
  kanji: "飛行機",
  optimized_sent_index: "272",
  optimized_voc_index: "323",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "340",
  frequency: "1014",
  furigana: "お 願[ねが]い",
  kana: "おねがい",
  kanji: "お願い",
  optimized_sent_index: "273",
  optimized_voc_index: "324",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "24",
  frequency: "677",
  furigana: "続[つづ]く",
  kana: "つづく",
  kanji: "続く",
  optimized_sent_index: "274",
  optimized_voc_index: "325",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "178",
  frequency: "2992",
  furigana: "日記[にっき]",
  kana: "にっき",
  kanji: "日記",
  optimized_sent_index: "311",
  optimized_voc_index: "326",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "175",
  frequency: "237",
  furigana: "首[くび]",
  kana: "くび",
  kanji: "首",
  optimized_sent_index: "275",
  optimized_voc_index: "327",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "103",
  frequency: "146",
  furigana: "頭[あたま]",
  kana: "あたま",
  kanji: "頭",
  optimized_sent_index: "276",
  optimized_voc_index: "328",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "51",
  frequency: "69",
  furigana: "顔[かお]",
  kana: "かお",
  kanji: "顔",
  optimized_sent_index: "391",
  optimized_voc_index: "329",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "275",
  frequency: "255",
  furigana: "あれ",
  kana: "あれ",
  kanji: "あれ",
  optimized_sent_index: "7",
  optimized_voc_index: "330",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "34",
  frequency: "206",
  furigana: "感[かん]じる",
  kana: "かんじる",
  kanji: "感じる",
  optimized_sent_index: "399",
  optimized_voc_index: "331",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "171",
  frequency: "781",
  furigana: "探[さが]す",
  kana: "さがす",
  kanji: "探す",
  optimized_sent_index: "278",
  optimized_voc_index: "332",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "134",
  frequency: "408",
  furigana: "落[お]ちる",
  kana: "おちる",
  kanji: "落ちる",
  optimized_sent_index: "384",
  optimized_voc_index: "333",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "391",
  frequency: "37293",
  furigana: "お 手洗[てあら]い",
  kana: "おてあらい",
  kanji: "お手洗い",
  optimized_sent_index: "279",
  optimized_voc_index: "334",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "362",
  frequency: "841",
  furigana: "冷[つめ]たい",
  kana: "つめたい",
  kanji: "冷たい",
  optimized_sent_index: "280",
  optimized_voc_index: "335",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "262",
  frequency: "3759",
  furigana: "汚[きたな]い",
  kana: "きたない",
  kanji: "汚い",
  optimized_sent_index: "281",
  optimized_voc_index: "336",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "237",
  frequency: "1691",
  furigana: "太[ふと]い",
  kana: "ふとい",
  kanji: "太い",
  optimized_sent_index: "282",
  optimized_voc_index: "337",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "281",
  frequency: "4850",
  furigana: "曇[くも]る",
  kana: "くもる",
  kanji: "曇る",
  optimized_sent_index: "381",
  optimized_voc_index: "338",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "240",
  frequency: "265",
  furigana: "神[かみ]",
  kana: "かみ",
  kanji: "神",
  optimized_sent_index: "285",
  optimized_voc_index: "339",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "279",
  frequency: "2137",
  furigana: "まずい",
  kana: "まずい",
  kanji: "まずい",
  optimized_sent_index: "81",
  optimized_voc_index: "340",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "159",
  frequency: "2445",
  furigana: "建[た]てる",
  kana: "たてる",
  kanji: "建てる",
  optimized_sent_index: "286",
  optimized_voc_index: "341",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "66",
  frequency: "348",
  furigana: "置[お]く",
  kana: "おく",
  kanji: "置く",
  optimized_sent_index: "290",
  optimized_voc_index: "342",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "302",
  frequency: "4715",
  furigana: "辺[へん]",
  kana: "へん",
  kanji: "辺",
  optimized_sent_index: "292",
  optimized_voc_index: "343",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "256",
  frequency: "3156",
  furigana: "黄色[きいろ]い",
  kana: "きいろい",
  kanji: "黄色い",
  optimized_sent_index: "293",
  optimized_voc_index: "344",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "177",
  frequency: "1265",
  furigana: "一緒[いっしょ]に",
  kana: "いっしょに",
  kanji: "一緒に",
  optimized_sent_index: "296",
  optimized_voc_index: "345",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "198",
  frequency: "1814",
  furigana: "緑[みどり]",
  kana: "みどり",
  kanji: "緑",
  optimized_sent_index: "298",
  optimized_voc_index: "346",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "301",
  frequency: "30266",
  furigana: "易[やさ]しい",
  kana: "やさしい",
  kanji: "易しい",
  optimized_sent_index: "299",
  optimized_voc_index: "347",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "216",
  frequency: "18155",
  furigana: "留学生[りゅうがくせい]",
  kana: "りゅうがくせい",
  kanji: "留学生",
  optimized_sent_index: "300",
  optimized_voc_index: "348",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "68",
  frequency: "249",
  furigana: "戻[もど]る",
  kana: "もどる",
  kanji: "戻る",
  optimized_sent_index: "301",
  optimized_voc_index: "349",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "288",
  frequency: "540",
  furigana: "そば",
  kana: "そば",
  kanji: "そば",
  optimized_sent_index: "10",
  optimized_voc_index: "350",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "58",
  frequency: "634",
  furigana: "起[お]きる",
  kana: "おきる",
  kanji: "起きる",
  optimized_sent_index: "302",
  optimized_voc_index: "351",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "94",
  frequency: "770",
  furigana: "起[お]こる",
  kana: "おこる",
  kanji: "起こる",
  optimized_sent_index: "303",
  optimized_voc_index: "352",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "121",
  frequency: "960",
  furigana: "起[お]こす",
  kana: "おこす",
  kanji: "起こす",
  optimized_sent_index: "304",
  optimized_voc_index: "353",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "222",
  frequency: "634",
  furigana: "起[お]きる",
  kana: "おきる",
  kanji: "起きる",
  optimized_sent_index: "305",
  optimized_voc_index: "354",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "189",
  frequency: "543",
  furigana: "寝[ね]る",
  kana: "ねる",
  kanji: "寝る",
  optimized_sent_index: "306",
  optimized_voc_index: "355",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "316",
  frequency: "1124",
  furigana: "細[ほそ]い",
  kana: "ほそい",
  kanji: "細い",
  optimized_sent_index: "310",
  optimized_voc_index: "356",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "224",
  frequency: "3547",
  furigana: "載[の]せる",
  kana: "のせる",
  kanji: "載せる",
  optimized_sent_index: "339",
  optimized_voc_index: "357",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "278",
  frequency: "5311",
  furigana: "締[し]める",
  kana: "しめる",
  kanji: "締める",
  optimized_sent_index: "313",
  optimized_voc_index: "358",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "229",
  frequency: "1544",
  furigana: "甘[あま]い",
  kana: "あまい",
  kanji: "甘い",
  optimized_sent_index: "314",
  optimized_voc_index: "359",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "289",
  frequency: "506",
  furigana: "こっち",
  kana: "こっち",
  kanji: "こっち",
  optimized_sent_index: "11",
  optimized_voc_index: "360",
  partOfSpeech: "Pronoun"
}, {

  alt_spelling: {},
  core_index: "305",
  frequency: "2085",
  furigana: "辛[から]い",
  kana: "からい",
  kanji: "辛い",
  optimized_sent_index: "315",
  optimized_voc_index: "361",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "258",
  frequency: "1326",
  furigana: "優[やさ]しい",
  kana: "やさしい",
  kanji: "優しい",
  optimized_sent_index: "318",
  optimized_voc_index: "362",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "113",
  frequency: "487",
  furigana: "夫[おっと]",
  kana: "おっと",
  kanji: "夫",
  optimized_sent_index: "320",
  optimized_voc_index: "363",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "361",
  frequency: "420",
  furigana: "妻[つま]",
  kana: "つま",
  kanji: "妻",
  optimized_sent_index: "327",
  optimized_voc_index: "364",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "137",
  frequency: "174",
  furigana: "誰[だれ]",
  kana: "だれ",
  kanji: "誰",
  optimized_sent_index: "322",
  optimized_voc_index: "365",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "226",
  frequency: "2817",
  furigana: "愛[あい]する",
  kana: "あいする",
  kanji: "愛する",
  optimized_sent_index: "324",
  optimized_voc_index: "366",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "164",
  frequency: "185",
  furigana: "笑[わら]う",
  kana: "わらう",
  kanji: "笑う",
  optimized_sent_index: "373",
  optimized_voc_index: "367",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "314",
  frequency: "20802",
  furigana: "酸[す]っぱい",
  kana: "すっぱい",
  kanji: "酸っぱい",
  optimized_sent_index: "332",
  optimized_voc_index: "368",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "50",
  frequency: "143",
  furigana: "言葉[ことば]",
  kana: "ことば",
  kanji: "言葉",
  optimized_sent_index: "334",
  optimized_voc_index: "369",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "303",
  frequency: "25",
  furigana: "よう",
  kana: "よう",
  kanji: "よう",
  optimized_sent_index: "377",
  optimized_voc_index: "370",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "74",
  frequency: "231",
  furigana: "呼[よ]ぶ",
  kana: "よぶ",
  kanji: "呼ぶ",
  optimized_sent_index: "336",
  optimized_voc_index: "371",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "145",
  frequency: "272",
  furigana: "胸[むね]",
  kana: "むね",
  kanji: "胸",
  optimized_sent_index: "337",
  optimized_voc_index: "372",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "211",
  frequency: "395",
  furigana: "腰[こし]",
  kana: "こし",
  kanji: "腰",
  optimized_sent_index: "338",
  optimized_voc_index: "373",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "219",
  frequency: "623",
  furigana: "背[せ]",
  kana: "せ",
  kanji: "背",
  optimized_sent_index: "342",
  optimized_voc_index: "374",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "271",
  frequency: "34512",
  furigana: "片仮名[かたかな]",
  kana: "かたかな",
  kanji: "片仮名",
  optimized_sent_index: "345",
  optimized_voc_index: "375",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "280",
  frequency: "41512",
  furigana: "平仮名[ひらがな]",
  kana: "ひらがな",
  kanji: "平仮名",
  optimized_sent_index: "346",
  optimized_voc_index: "376",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "225",
  frequency: "1677",
  furigana: "悲[かな]しい",
  kana: "かなしい",
  kanji: "悲しい",
  optimized_sent_index: "347",
  optimized_voc_index: "377",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "118",
  frequency: "526",
  furigana: "美[うつく]しい",
  kana: "うつくしい",
  kanji: "美しい",
  optimized_sent_index: "348",
  optimized_voc_index: "378",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "166",
  frequency: "3138",
  furigana: "授業[じゅぎょう]",
  kana: "じゅぎょう",
  kanji: "授業",
  optimized_sent_index: "352",
  optimized_voc_index: "379",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "308",
  frequency: "1268",
  furigana: "あそこ",
  kana: "あそこ",
  kanji: "あそこ",
  optimized_sent_index: "291",
  optimized_voc_index: "380",
  partOfSpeech: "Pronoun"
}, {

  alt_spelling: {},
  core_index: "220",
  frequency: "2370",
  furigana: "手伝[てつだ]う",
  kana: "てつだう",
  kanji: "手伝う",
  optimized_sent_index: "354",
  optimized_voc_index: "381",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "157",
  frequency: "1475",
  furigana: "狭[せま]い",
  kana: "せまい",
  kanji: "狭い",
  optimized_sent_index: "360",
  optimized_voc_index: "382",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "282",
  frequency: "3510",
  furigana: "触[さわ]る",
  kana: "さわる",
  kanji: "触る",
  optimized_sent_index: "361",
  optimized_voc_index: "383",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "252",
  frequency: "2018",
  furigana: "嫌[きら]い",
  kana: "きらい",
  kanji: "嫌い",
  optimized_sent_index: "362",
  optimized_voc_index: "384",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "186",
  frequency: "2346",
  furigana: "浴[あ]びる",
  kana: "あびる",
  kanji: "浴びる",
  optimized_sent_index: "365",
  optimized_voc_index: "385",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "291",
  frequency: "10341",
  furigana: "渇[かわ]く",
  kana: "かわく",
  kanji: "渇く",
  optimized_sent_index: "397",
  optimized_voc_index: "386",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "267",
  frequency: "3024",
  furigana: "髪[かみ]の 毛[け]",
  kana: "かみのけ",
  kanji: "髪の毛",
  optimized_sent_index: "368",
  optimized_voc_index: "387",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "187",
  frequency: "346",
  furigana: "肩[かた]",
  kana: "かた",
  kanji: "肩",
  optimized_sent_index: "379",
  optimized_voc_index: "388",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "221",
  frequency: "811",
  furigana: "鼻[はな]",
  kana: "はな",
  kanji: "鼻",
  optimized_sent_index: "369",
  optimized_voc_index: "389",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "335",
  frequency: "2716",
  furigana: "おいしい",
  kana: "おいしい",
  kanji: "おいしい",
  optimized_sent_index: "335",
  optimized_voc_index: "390",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "199",
  frequency: "343",
  furigana: "腕[うで]",
  kana: "うで",
  kanji: "腕",
  optimized_sent_index: "370",
  optimized_voc_index: "391",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "247",
  frequency: "1704",
  furigana: "掛[か]ける",
  kana: "かける",
  kanji: "掛ける",
  optimized_sent_index: "378",
  optimized_voc_index: "392",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "376",
  frequency: "139",
  furigana: "僕[ぼく]",
  kana: "ぼく",
  kanji: "僕",
  optimized_sent_index: "380",
  optimized_voc_index: "393",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "283",
  frequency: "1021",
  furigana: "だめ",
  kana: "だめ",
  kanji: "だめ",
  optimized_sent_index: "382",
  optimized_voc_index: "394",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "355",
  frequency: "657",
  furigana: "大丈夫[だいじょうぶ]",
  kana: "だいじょうぶ",
  kanji: "大丈夫",
  optimized_sent_index: "386",
  optimized_voc_index: "395",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "257",
  frequency: "3785",
  furigana: "風邪[かぜ]",
  kana: "かぜ",
  kanji: "風邪",
  optimized_sent_index: "389",
  optimized_voc_index: "396",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "345",
  frequency: "1138",
  furigana: "きれい",
  kana: "きれい",
  kanji: "きれい",
  optimized_sent_index: "396",
  optimized_voc_index: "397",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "210",
  frequency: "1298",
  furigana: "嬉[うれ]しい",
  kana: "うれしい",
  kanji: "嬉しい",
  optimized_sent_index: "398",
  optimized_voc_index: "398",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "395",
  frequency: ``,
  furigana: "なる",
  kana: "なる",
  kanji: "なる (生る)",
  optimized_sent_index: "400",
  optimized_voc_index: "399",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "396",
  frequency: "98",
  furigana: "ため",
  kana: "ため",
  kanji: "ため",
  optimized_sent_index: "257",
  optimized_voc_index: "400",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "415",
  frequency: "119",
  furigana: "より",
  kana: "より",
  kanji: "より",
  optimized_sent_index: "1777",
  optimized_voc_index: "401",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1796",
  frequency: "169",
  furigana: "七[しち]",
  kana: "しち",
  kanji: "七",
  optimized_sent_index: "548",
  optimized_voc_index: "402",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1774",
  frequency: "184",
  furigana: "九[く]",
  kana: "く",
  kanji: "九",
  optimized_sent_index: "747",
  optimized_voc_index: "403",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1537",
  frequency: "2153",
  furigana: "億[おく]",
  kana: "おく",
  kanji: "億",
  optimized_sent_index: "550",
  optimized_voc_index: "404",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1902",
  frequency: "1261",
  furigana: "寺[てら]",
  kana: "てら",
  kanji: "寺",
  optimized_sent_index: "612",
  optimized_voc_index: "405",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "425",
  frequency: "2778",
  furigana: "ドル",
  kana: "ドル",
  kanji: "ドル",
  optimized_sent_index: "882",
  optimized_voc_index: "406",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1386",
  frequency: "94",
  furigana: "日[ひ]",
  kana: "ひ",
  kanji: "日",
  optimized_sent_index: "593",
  optimized_voc_index: "407",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1935",
  frequency: "461",
  furigana: "火[ひ]",
  kana: "ひ",
  kanji: "火",
  optimized_sent_index: "576",
  optimized_voc_index: "408",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "790",
  frequency: "605",
  furigana: "木[き]",
  kana: "き",
  kanji: "木",
  optimized_sent_index: "1682",
  optimized_voc_index: "409",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1847",
  frequency: "269",
  furigana: "金[きん]",
  kana: "きん",
  kanji: "金",
  optimized_sent_index: "1027",
  optimized_voc_index: "410",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "426",
  frequency: "3228",
  furigana: "システム",
  kana: "システム",
  kanji: "システム",
  optimized_sent_index: "1346",
  optimized_voc_index: "411",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "565",
  frequency: "1098",
  furigana: "十分[じゅうぶん]",
  kana: "じゅうぶん",
  kanji: "十分",
  optimized_sent_index: "403",
  optimized_voc_index: "412",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "678",
  frequency: "273",
  furigana: "分[ぶん]",
  kana: "ぶん",
  kanji: "分",
  optimized_sent_index: "404",
  optimized_voc_index: "413",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "760",
  frequency: "2489",
  furigana: "分[わ]ける",
  kana: "わける",
  kanji: "分ける",
  optimized_sent_index: "1787",
  optimized_voc_index: "414",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "863",
  frequency: "6030",
  furigana: "分[わ]かれる",
  kana: "わかれる",
  kanji: "分かれる",
  optimized_sent_index: "1104",
  optimized_voc_index: "415",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "436",
  frequency: "7035",
  furigana: "コンピュータ",
  kana: "コンピュータ",
  kanji: "コンピュータ",
  optimized_sent_index: "609",
  optimized_voc_index: "416",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "917",
  frequency: ``,
  furigana: "何[なに]か",
  kana: "なにか",
  kanji: "何か",
  optimized_sent_index: "1274",
  optimized_voc_index: "417",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1909",
  frequency: "53",
  furigana: "何[なん]",
  kana: "なん",
  kanji: "何",
  optimized_sent_index: "691",
  optimized_voc_index: "418",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "484",
  frequency: "438",
  furigana: "まず",
  kana: "まず",
  kanji: "まず",
  optimized_sent_index: "1279",
  optimized_voc_index: "419",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1096",
  frequency: "10311",
  furigana: "先月[せんげつ]",
  kana: "せんげつ",
  kanji: "先月",
  optimized_sent_index: "1033",
  optimized_voc_index: "420",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "438",
  frequency: "78",
  furigana: "やる",
  kana: "やる",
  kanji: "やる",
  optimized_sent_index: "1667",
  optimized_voc_index: "421",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1205",
  frequency: "9452",
  furigana: "先週[せんしゅう]",
  kana: "せんしゅう",
  kanji: "先週",
  optimized_sent_index: "426",
  optimized_voc_index: "422",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1280",
  frequency: "919",
  furigana: "今[いま]まで",
  kana: "いままで",
  kanji: "今まで",
  optimized_sent_index: "406",
  optimized_voc_index: "423",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "985",
  frequency: "16035",
  furigana: "来月[らいげつ]",
  kana: "らいげつ",
  kanji: "来月",
  optimized_sent_index: "669",
  optimized_voc_index: "424",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1440",
  frequency: "11305",
  furigana: "来週[らいしゅう]",
  kana: "らいしゅう",
  kanji: "来週",
  optimized_sent_index: "1166",
  optimized_voc_index: "425",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "450",
  frequency: "5782",
  furigana: "ロボット",
  kana: "ロボット",
  kanji: "ロボット",
  optimized_sent_index: "944",
  optimized_voc_index: "426",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "406",
  frequency: "523",
  furigana: "行[おこな]う",
  kana: "おこなう",
  kanji: "行う",
  optimized_sent_index: "509",
  optimized_voc_index: "427",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1820",
  frequency: "3764",
  furigana: "行[い]き",
  kana: "いき",
  kanji: "行き",
  optimized_sent_index: "1573",
  optimized_voc_index: "428",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1976",
  frequency: "3764",
  furigana: "行[ゆ]き",
  kana: "ゆき",
  kanji: "行き",
  optimized_sent_index: "1444",
  optimized_voc_index: "429",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1162",
  frequency: "2064",
  furigana: "帰[かえ]り",
  kana: "かえり",
  kanji: "帰り",
  optimized_sent_index: "514",
  optimized_voc_index: "430",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "451",
  frequency: "362",
  furigana: "ほとんど",
  kana: "ほとんど",
  kanji: "ほとんど",
  optimized_sent_index: "402",
  optimized_voc_index: "431",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "853",
  frequency: "2304",
  furigana: "大[おお]きさ",
  kana: "おおきさ",
  kanji: "大きさ",
  optimized_sent_index: "1827",
  optimized_voc_index: "432",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1475",
  frequency: "4402",
  furigana: "大分[だいぶ]",
  kana: "だいぶ",
  kanji: "大分",
  optimized_sent_index: "424",
  optimized_voc_index: "433",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1699",
  frequency: "71",
  furigana: "中[なか]",
  kana: "なか",
  kanji: "中",
  optimized_sent_index: "1811",
  optimized_voc_index: "434",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "725",
  frequency: "500",
  furigana: "少年[しょうねん]",
  kana: "しょうねん",
  kanji: "少年",
  optimized_sent_index: "413",
  optimized_voc_index: "435",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "462",
  frequency: "6138",
  furigana: "パソコン",
  kana: "パソコン",
  kanji: "パソコン",
  optimized_sent_index: "945",
  optimized_voc_index: "436",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1228",
  frequency: "3081",
  furigana: "少[すこ]しも",
  kana: "すこしも",
  kanji: "少しも",
  optimized_sent_index: "615",
  optimized_voc_index: "437",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1284",
  frequency: "2187",
  furigana: "少々[しょうしょう]",
  kana: "しょうしょう",
  kanji: "少々",
  optimized_sent_index: "1465",
  optimized_voc_index: "438",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "465",
  frequency: "840",
  furigana: "多[おお]く",
  kana: "おおく",
  kanji: "多く",
  optimized_sent_index: "869",
  optimized_voc_index: "439",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "469",
  frequency: "793",
  furigana: "上[あ]がる",
  kana: "あがる",
  kanji: "上がる",
  optimized_sent_index: "581",
  optimized_voc_index: "440",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "470",
  frequency: "103",
  furigana: "もう",
  kana: "もう",
  kanji: "もう",
  optimized_sent_index: "1093",
  optimized_voc_index: "441",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1840",
  frequency: "793",
  furigana: "上[あ]がる",
  kana: "あがる",
  kanji: "上がる",
  optimized_sent_index: "1025",
  optimized_voc_index: "442",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1904",
  frequency: "4584",
  furigana: "年上[としうえ]",
  kana: "としうえ",
  kanji: "年上",
  optimized_sent_index: "1028",
  optimized_voc_index: "443",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1922",
  frequency: "6274",
  furigana: "上[のぼ]り",
  kana: "のぼり",
  kanji: "上り",
  optimized_sent_index: "523",
  optimized_voc_index: "444",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "919",
  frequency: "1089",
  furigana: "下[さ]げる",
  kana: "さげる",
  kanji: "下げる",
  optimized_sent_index: "816",
  optimized_voc_index: "445",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "487",
  frequency: "6594",
  furigana: "プログラム",
  kana: "プログラム",
  kanji: "プログラム",
  optimized_sent_index: "1431",
  optimized_voc_index: "446",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1003",
  frequency: "2842",
  furigana: "下[さ]がる",
  kana: "さがる",
  kanji: "下がる",
  optimized_sent_index: "600",
  optimized_voc_index: "447",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1208",
  frequency: "1798",
  furigana: "下[お]りる",
  kana: "おりる",
  kanji: "下りる",
  optimized_sent_index: "585",
  optimized_voc_index: "448",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1405",
  frequency: "1863",
  furigana: "下[お]ろす",
  kana: "おろす",
  kanji: "下ろす",
  optimized_sent_index: "1798",
  optimized_voc_index: "449",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1566",
  frequency: "7946",
  furigana: "下[くだ]り",
  kana: "くだり",
  kanji: "下り",
  optimized_sent_index: "805",
  optimized_voc_index: "450",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "498",
  frequency: "154",
  furigana: "よく",
  kana: "よく",
  kanji: "よく",
  optimized_sent_index: "1065",
  optimized_voc_index: "451",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1580",
  frequency: "7203",
  furigana: "年下[としした]",
  kana: "としした",
  kanji: "年下",
  optimized_sent_index: "1508",
  optimized_voc_index: "452",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1634",
  frequency: "2145",
  furigana: "下[くだ]る",
  kana: "くだる",
  kanji: "下る",
  optimized_sent_index: "1129",
  optimized_voc_index: "453",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "424",
  frequency: "763",
  furigana: "一方[いっぽう]",
  kana: "いっぽう",
  kanji: "一方",
  optimized_sent_index: "525",
  optimized_voc_index: "454",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1835",
  frequency: "121",
  furigana: "方[かた]",
  kana: "かた",
  kanji: "方",
  optimized_sent_index: "779",
  optimized_voc_index: "455",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "502",
  frequency: "151",
  furigana: "まま",
  kana: "まま",
  kanji: "まま",
  optimized_sent_index: "517",
  optimized_voc_index: "456",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1758",
  frequency: ``,
  furigana: "二人[ふたり]",
  kana: "ふたり",
  kanji: "二人",
  optimized_sent_index: "1506",
  optimized_voc_index: "457",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1826",
  frequency: "22423",
  furigana: "大人[おとな]しい",
  kana: "おとなしい",
  kanji: "大人しい",
  optimized_sent_index: "1024",
  optimized_voc_index: "458",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1939",
  frequency: "492",
  furigana: "人々[ひとびと]",
  kana: "ひとびと",
  kanji: "人々",
  optimized_sent_index: "911",
  optimized_voc_index: "459",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1997",
  frequency: ``,
  furigana: "一人[ひとり]で",
  kana: "ひとりで",
  kanji: "一人で",
  optimized_sent_index: "831",
  optimized_voc_index: "460",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "507",
  frequency: "1094",
  furigana: "テレビ",
  kana: "テレビ",
  kanji: "テレビ",
  optimized_sent_index: "488",
  optimized_voc_index: "461",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1183",
  frequency: "7325",
  furigana: "外人[がいじん]",
  kana: "がいじん",
  kanji: "外人",
  optimized_sent_index: "638",
  optimized_voc_index: "462",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1878",
  frequency: "262",
  furigana: "外[そと]",
  kana: "そと",
  kanji: "外",
  optimized_sent_index: "598",
  optimized_voc_index: "463",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1052",
  frequency: "8581",
  furigana: "休日[きゅうじつ]",
  kana: "きゅうじつ",
  kanji: "休日",
  optimized_sent_index: "492",
  optimized_voc_index: "464",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1159",
  frequency: "4526",
  furigana: "休[やす]み",
  kana: "やすみ",
  kanji: "休み",
  optimized_sent_index: "513",
  optimized_voc_index: "465",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "534",
  frequency: "11204",
  furigana: "ソフト",
  kana: "ソフト",
  kanji: "ソフト",
  optimized_sent_index: "682",
  optimized_voc_index: "466",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "489",
  frequency: "235",
  furigana: "力[ちから]",
  kana: "ちから",
  kanji: "力",
  optimized_sent_index: "1847",
  optimized_voc_index: "467",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "646",
  frequency: "2064",
  furigana: "協力[きょうりょく]",
  kana: "きょうりょく",
  kanji: "協力",
  optimized_sent_index: "715",
  optimized_voc_index: "468",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "736",
  frequency: "6109",
  furigana: "人口[じんこう]",
  kana: "じんこう",
  kanji: "人口",
  optimized_sent_index: "549",
  optimized_voc_index: "469",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1401",
  frequency: "3680",
  furigana: "出口[でぐち]",
  kana: "でぐち",
  kanji: "出口",
  optimized_sent_index: "423",
  optimized_voc_index: "470",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "536",
  frequency: "158",
  furigana: "ただ",
  kana: "ただ",
  kanji: "ただ",
  optimized_sent_index: "1743",
  optimized_voc_index: "471",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1622",
  frequency: "3549",
  furigana: "入[い]り 口[ぐち]",
  kana: "いりぐち",
  kanji: "入り口",
  optimized_sent_index: "455",
  optimized_voc_index: "472",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1107",
  frequency: "1045",
  furigana: "右手[みぎて]",
  kana: "みぎて",
  kanji: "右手",
  optimized_sent_index: "502",
  optimized_voc_index: "473",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1194",
  frequency: "1427",
  furigana: "左手[ひだりて]",
  kana: "ひだりて",
  kanji: "左手",
  optimized_sent_index: "990",
  optimized_voc_index: "474",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1952",
  frequency: "3085",
  furigana: "下手[へた]",
  kana: "へた",
  kanji: "下手",
  optimized_sent_index: "827",
  optimized_voc_index: "475",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "537",
  frequency: "1380",
  furigana: "これら",
  kana: "これら",
  kanji: "これら",
  optimized_sent_index: "696",
  optimized_voc_index: "476",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1165",
  frequency: "2084",
  furigana: "足[た]りる",
  kana: "たりる",
  kanji: "足りる",
  optimized_sent_index: "485",
  optimized_voc_index: "477",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1508",
  frequency: "6806",
  furigana: "足[た]す",
  kana: "たす",
  kanji: "足す",
  optimized_sent_index: "1984",
  optimized_voc_index: "478",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1972",
  frequency: "380",
  furigana: "山[やま]",
  kana: "やま",
  kanji: "山",
  optimized_sent_index: "445",
  optimized_voc_index: "479",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "811",
  frequency: "744",
  furigana: "川[かわ]",
  kana: "かわ",
  kanji: "川",
  optimized_sent_index: "540",
  optimized_voc_index: "480",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "545",
  frequency: "707",
  furigana: "いずれ",
  kana: "いずれ",
  kanji: "いずれ",
  optimized_sent_index: "506",
  optimized_voc_index: "481",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1364",
  frequency: "3139",
  furigana: "空[あ]く",
  kana: "あく",
  kanji: "空く",
  optimized_sent_index: "773",
  optimized_voc_index: "482",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1841",
  frequency: "19205",
  furigana: "空手[からて]",
  kana: "からて",
  kanji: "空手",
  optimized_sent_index: "1026",
  optimized_voc_index: "483",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1882",
  frequency: "425",
  furigana: "空[そら]",
  kana: "そら",
  kanji: "空",
  optimized_sent_index: "843",
  optimized_voc_index: "484",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "732",
  frequency: "5834",
  furigana: "海外[かいがい]",
  kana: "かいがい",
  kanji: "海外",
  optimized_sent_index: "959",
  optimized_voc_index: "485",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "566",
  frequency: "361",
  furigana: "あまり",
  kana: "あまり",
  kanji: "あまり",
  optimized_sent_index: "1633",
  optimized_voc_index: "486",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "737",
  frequency: "493",
  furigana: "海[うみ]",
  kana: "うみ",
  kanji: "海",
  optimized_sent_index: "546",
  optimized_voc_index: "487",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "766",
  frequency: "1034",
  furigana: "毎日[まいにち]",
  kana: "まいにち",
  kanji: "毎日",
  optimized_sent_index: "1580",
  optimized_voc_index: "488",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "961",
  frequency: "4659",
  furigana: "毎年[まいとし]",
  kana: "まいとし",
  kanji: "毎年",
  optimized_sent_index: "870",
  optimized_voc_index: "489",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1022",
  frequency: "4659",
  furigana: "毎年[まいねん]",
  kana: "まいねん",
  kanji: "毎年",
  optimized_sent_index: "1231",
  optimized_voc_index: "490",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "574",
  frequency: "1007",
  furigana: "なお",
  kana: "なお",
  kanji: "なお",
  optimized_sent_index: "533",
  optimized_voc_index: "491",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1197",
  frequency: "12405",
  furigana: "毎週[まいしゅう]",
  kana: "まいしゅう",
  kanji: "毎週",
  optimized_sent_index: "900",
  optimized_voc_index: "492",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1957",
  frequency: "9249",
  furigana: "毎月[まいつき]",
  kana: "まいつき",
  kanji: "毎月",
  optimized_sent_index: "1556",
  optimized_voc_index: "493",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1020",
  frequency: "566",
  furigana: "石[いし]",
  kana: "いし",
  kanji: "石",
  optimized_sent_index: "431",
  optimized_voc_index: "494",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1436",
  frequency: "17942",
  furigana: "田[た]んぼ",
  kana: "たんぼ",
  kanji: "田んぼ",
  optimized_sent_index: "1350",
  optimized_voc_index: "495",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "589",
  frequency: "1835",
  furigana: "ほぼ",
  kana: "ほぼ",
  kanji: "ほぼ",
  optimized_sent_index: "794",
  optimized_voc_index: "496",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "770",
  frequency: "494",
  furigana: "花[はな]",
  kana: "はな",
  kanji: "花",
  optimized_sent_index: "1576",
  optimized_voc_index: "497",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1223",
  frequency: "1498",
  furigana: "林[はやし]",
  kana: "はやし",
  kanji: "林",
  optimized_sent_index: "432",
  optimized_voc_index: "498",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "997",
  frequency: "667",
  furigana: "森[もり]",
  kana: "もり",
  kanji: "森",
  optimized_sent_index: "538",
  optimized_voc_index: "499",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "690",
  frequency: "220",
  furigana: "子[こ]",
  kana: "こ",
  kanji: "子",
  optimized_sent_index: "500",
  optimized_voc_index: "500",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "609",
  frequency: "5175",
  furigana: "サービス",
  kana: "サービス",
  kanji: "サービス",
  optimized_sent_index: "578",
  optimized_voc_index: "501",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "965",
  frequency: "754",
  furigana: "女[おんな]の 子[こ]",
  kana: "おんなのこ",
  kanji: "女の子",
  optimized_sent_index: "622",
  optimized_voc_index: "502",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1111",
  frequency: "1937",
  furigana: "男[おとこ]の 子[こ]",
  kana: "おとこのこ",
  kanji: "男の子",
  optimized_sent_index: "427",
  optimized_voc_index: "503",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "842",
  frequency: "537",
  furigana: "私[わたし]たち",
  kana: "わたしたち",
  kanji: "私たち",
  optimized_sent_index: "1031",
  optimized_voc_index: "504",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "615",
  frequency: "4776",
  furigana: "達[たっ]する",
  kana: "たっする",
  kanji: "達する",
  optimized_sent_index: "604",
  optimized_voc_index: "505",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "640",
  frequency: "2641",
  furigana: "グループ",
  kana: "グループ",
  kanji: "グループ",
  optimized_sent_index: "668",
  optimized_voc_index: "506",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "461",
  frequency: "114",
  furigana: "家[いえ]",
  kana: "いえ",
  kanji: "家",
  optimized_sent_index: "442",
  optimized_voc_index: "507",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1564",
  frequency: "5331",
  furigana: "家内[かない]",
  kana: "かない",
  kanji: "家内",
  optimized_sent_index: "1497",
  optimized_voc_index: "508",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1846",
  frequency: "553",
  furigana: "客[きゃく]",
  kana: "きゃく",
  kanji: "客",
  optimized_sent_index: "939",
  optimized_voc_index: "509",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "715",
  frequency: "891",
  furigana: "空気[くうき]",
  kana: "くうき",
  kanji: "空気",
  optimized_sent_index: "443",
  optimized_voc_index: "510",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "651",
  frequency: "693",
  furigana: "ホテル",
  kana: "ホテル",
  kanji: "ホテル",
  optimized_sent_index: "763",
  optimized_voc_index: "511",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1269",
  frequency: "1852",
  furigana: "気[き]に 入[い]る",
  kana: "きにいる",
  kanji: "気に入る",
  optimized_sent_index: "1959",
  optimized_voc_index: "512",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1914",
  frequency: "2264",
  furigana: "人気[にんき]",
  kana: "にんき",
  kanji: "人気",
  optimized_sent_index: "444",
  optimized_voc_index: "513",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "768",
  frequency: "654",
  furigana: "雨[あめ]",
  kana: "あめ",
  kanji: "雨",
  optimized_sent_index: "757",
  optimized_voc_index: "514",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "792",
  frequency: "730",
  furigana: "雪[ゆき]",
  kana: "ゆき",
  kanji: "雪",
  optimized_sent_index: "758",
  optimized_voc_index: "515",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "668",
  frequency: "2578",
  furigana: "まとめる",
  kana: "まとめる",
  kanji: "まとめる",
  optimized_sent_index: "953",
  optimized_voc_index: "516",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1074",
  frequency: "1130",
  furigana: "青[あお]い",
  kana: "あおい",
  kanji: "青い",
  optimized_sent_index: "446",
  optimized_voc_index: "517",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1169",
  frequency: "1456",
  furigana: "青[あお]",
  kana: "あお",
  kanji: "青",
  optimized_sent_index: "845",
  optimized_voc_index: "518",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1617",
  frequency: "14389",
  furigana: "晴[は]れ",
  kana: "はれ",
  kanji: "晴れ",
  optimized_sent_index: "447",
  optimized_voc_index: "519",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "474",
  frequency: "948",
  furigana: "明[あき]らか",
  kana: "あきらか",
  kanji: "明らか",
  optimized_sent_index: "946",
  optimized_voc_index: "520",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "697",
  frequency: "410",
  furigana: "やはり",
  kana: "やはり",
  kanji: "やはり",
  optimized_sent_index: "1452",
  optimized_voc_index: "521",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "846",
  frequency: "938",
  furigana: "明[あか]るい",
  kana: "あかるい",
  kanji: "明るい",
  optimized_sent_index: "967",
  optimized_voc_index: "522",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1691",
  frequency: "706",
  furigana: "明日[あした]",
  kana: "あした",
  kanji: "明日",
  optimized_sent_index: "511",
  optimized_voc_index: "523",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "967",
  frequency: "556",
  furigana: "暗[くら]い",
  kana: "くらい",
  kanji: "暗い",
  optimized_sent_index: "450",
  optimized_voc_index: "524",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "416",
  frequency: "5504",
  furigana: "昨年[さくねん]",
  kana: "さくねん",
  kanji: "昨年",
  optimized_sent_index: "1316",
  optimized_voc_index: "525",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "702",
  frequency: "456",
  furigana: "はっきり",
  kana: "はっきり",
  kanji: "はっきり",
  optimized_sent_index: "490",
  optimized_voc_index: "526",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1051",
  frequency: "13709",
  furigana: "一昨年[おととし]",
  kana: "おととし",
  kanji: "一昨年",
  optimized_sent_index: "873",
  optimized_voc_index: "527",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1768",
  frequency: "6991",
  furigana: "一昨日[おととい]",
  kana: "おととい",
  kanji: "一昨日",
  optimized_sent_index: "1020",
  optimized_voc_index: "528",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1720",
  frequency: "696",
  furigana: "東[ひがし]",
  kana: "ひがし",
  kanji: "東",
  optimized_sent_index: "451",
  optimized_voc_index: "529",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1753",
  frequency: "1330",
  furigana: "西[にし]",
  kana: "にし",
  kanji: "西",
  optimized_sent_index: "1303",
  optimized_voc_index: "530",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "703",
  frequency: "342",
  furigana: "つまり",
  kana: "つまり",
  kanji: "つまり",
  optimized_sent_index: "621",
  optimized_voc_index: "531",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1965",
  frequency: "1199",
  furigana: "南[みなみ]",
  kana: "みなみ",
  kanji: "南",
  optimized_sent_index: "639",
  optimized_voc_index: "532",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "923",
  frequency: "1155",
  furigana: "北[きた]",
  kana: "きた",
  kanji: "北",
  optimized_sent_index: "452",
  optimized_voc_index: "533",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "555",
  frequency: "1375",
  furigana: "方向[ほうこう]",
  kana: "ほうこう",
  kanji: "方向",
  optimized_sent_index: "1510",
  optimized_voc_index: "534",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "636",
  frequency: "353",
  furigana: "向[む]かう",
  kana: "むかう",
  kanji: "向かう",
  optimized_sent_index: "510",
  optimized_voc_index: "535",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "723",
  frequency: "1403",
  furigana: "ビル",
  kana: "ビル",
  kanji: "ビル",
  optimized_sent_index: "582",
  optimized_voc_index: "536",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "969",
  frequency: "892",
  furigana: "向[む]こう",
  kana: "むこう",
  kanji: "向こう",
  optimized_sent_index: "453",
  optimized_voc_index: "537",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1033",
  frequency: "935",
  furigana: "向[む]く",
  kana: "むく",
  kanji: "向く",
  optimized_sent_index: "454",
  optimized_voc_index: "538",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "413",
  frequency: "280",
  furigana: "開[あ]く",
  kana: "あく",
  kanji: "開く",
  optimized_sent_index: "521",
  optimized_voc_index: "539",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "860",
  frequency: "418",
  furigana: "聞[き]こえる",
  kana: "きこえる",
  kanji: "聞こえる",
  optimized_sent_index: "1351",
  optimized_voc_index: "540",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "727",
  frequency: "376",
  furigana: "もちろん",
  kana: "もちろん",
  kanji: "もちろん",
  optimized_sent_index: "1370",
  optimized_voc_index: "541",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "665",
  frequency: "1621",
  furigana: "年間[ねんかん]",
  kana: "ねんかん",
  kanji: "年間",
  optimized_sent_index: "1361",
  optimized_voc_index: "542",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1392",
  frequency: "3418",
  furigana: "この 間[あいだ]",
  kana: "このあいだ",
  kanji: "この間",
  optimized_sent_index: "1003",
  optimized_voc_index: "543",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1814",
  frequency: "197",
  furigana: "間[あいだ]",
  kana: "あいだ",
  kanji: "間",
  optimized_sent_index: "1313",
  optimized_voc_index: "544",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1915",
  frequency: "140",
  furigana: "人間[にんげん]",
  kana: "にんげん",
  kanji: "人間",
  optimized_sent_index: "699",
  optimized_voc_index: "545",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "730",
  frequency: "980",
  furigana: "かつて",
  kana: "かつて",
  kanji: "かつて",
  optimized_sent_index: "1868",
  optimized_voc_index: "546",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "849",
  frequency: "182214",
  furigana: "高[たか]さ",
  kana: "たかさ",
  kanji: "高さ",
  optimized_sent_index: "1538",
  optimized_voc_index: "547",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "516",
  frequency: "2294",
  furigana: "最大[さいだい]",
  kana: "さいだい",
  kanji: "最大",
  optimized_sent_index: "1126",
  optimized_voc_index: "548",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "473",
  frequency: "607",
  furigana: "初[はじ]めて",
  kana: "はじめて",
  kanji: "初めて",
  optimized_sent_index: "640",
  optimized_voc_index: "549",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "603",
  frequency: "364",
  furigana: "最初[さいしょ]",
  kana: "さいしょ",
  kanji: "最初",
  optimized_sent_index: "489",
  optimized_voc_index: "550",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "752",
  frequency: "5514",
  furigana: "スポーツ",
  kana: "スポーツ",
  kanji: "スポーツ",
  optimized_sent_index: "405",
  optimized_voc_index: "551",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1928",
  frequency: "1640",
  furigana: "初[はじ]め",
  kana: "はじめ",
  kanji: "初め",
  optimized_sent_index: "461",
  optimized_voc_index: "552",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "432",
  frequency: "2683",
  furigana: "今後[こんご]",
  kana: "こんご",
  kanji: "今後",
  optimized_sent_index: "1142",
  optimized_voc_index: "553",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "563",
  frequency: ``,
  furigana: "後[のち]",
  kana: "のち",
  kanji: "後[のち]",
  optimized_sent_index: "1852",
  optimized_voc_index: "554",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "649",
  frequency: "347",
  furigana: "最後[さいご]",
  kana: "さいご",
  kanji: "最後",
  optimized_sent_index: "589",
  optimized_voc_index: "555",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "754",
  frequency: "293",
  furigana: "なぜ",
  kana: "なぜ",
  kanji: "なぜ",
  optimized_sent_index: "408",
  optimized_voc_index: "556",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1764",
  frequency: "9900",
  furigana: "明後日[あさって]",
  kana: "あさって",
  kanji: "明後日",
  optimized_sent_index: "462",
  optimized_voc_index: "557",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1077",
  frequency: "2134",
  furigana: "牛[うし]",
  kana: "うし",
  kanji: "牛",
  optimized_sent_index: "1591",
  optimized_voc_index: "558",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "779",
  frequency: "952",
  furigana: "半分[はんぶん]",
  kana: "はんぶん",
  kanji: "半分",
  optimized_sent_index: "1788",
  optimized_voc_index: "559",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1400",
  frequency: "3053",
  furigana: "半年[はんとし]",
  kana: "はんとし",
  kanji: "半年",
  optimized_sent_index: "463",
  optimized_voc_index: "560",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "758",
  frequency: "445",
  furigana: "そのまま",
  kana: "そのまま",
  kanji: "そのまま",
  optimized_sent_index: "655",
  optimized_voc_index: "561",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1933",
  frequency: "7891",
  furigana: "半月[はんつき]",
  kana: "はんつき",
  kanji: "半月",
  optimized_sent_index: "464",
  optimized_voc_index: "562",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1934",
  frequency: "8672",
  furigana: "半日[はんにち]",
  kana: "はんにち",
  kanji: "半日",
  optimized_sent_index: "516",
  optimized_voc_index: "563",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1354",
  frequency: "6784",
  furigana: "毎朝[まいあさ]",
  kana: "まいあさ",
  kanji: "毎朝",
  optimized_sent_index: "466",
  optimized_voc_index: "564",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1473",
  frequency: "2125",
  furigana: "今朝[けさ]",
  kana: "けさ",
  kanji: "今朝",
  optimized_sent_index: "1194",
  optimized_voc_index: "565",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "798",
  frequency: "319",
  furigana: "もし",
  kana: "もし",
  kanji: "もし",
  optimized_sent_index: "759",
  optimized_voc_index: "566",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1548",
  frequency: "7948",
  furigana: "昼休[ひるやす]み",
  kana: "ひるやすみ",
  kanji: "昼休み",
  optimized_sent_index: "1119",
  optimized_voc_index: "567",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1735",
  frequency: "18725",
  furigana: "昼前[ひるまえ]",
  kana: "ひるまえ",
  kanji: "昼前",
  optimized_sent_index: "1059",
  optimized_voc_index: "568",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1782",
  frequency: "2646",
  furigana: "昼間[ひるま]",
  kana: "ひるま",
  kanji: "昼間",
  optimized_sent_index: "1087",
  optimized_voc_index: "569",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1368",
  frequency: "5367",
  furigana: "毎晩[まいばん]",
  kana: "まいばん",
  kanji: "毎晩",
  optimized_sent_index: "1171",
  optimized_voc_index: "570",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "805",
  frequency: "297",
  furigana: "つもり",
  kana: "つもり",
  kanji: "つもり",
  optimized_sent_index: "534",
  optimized_voc_index: "571",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1414",
  frequency: "958",
  furigana: "今夜[こんや]",
  kana: "こんや",
  kanji: "今夜",
  optimized_sent_index: "468",
  optimized_voc_index: "572",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1975",
  frequency: "1349",
  furigana: "昨夜[ゆうべ]",
  kana: "ゆうべ",
  kanji: "昨夜",
  optimized_sent_index: "1309",
  optimized_voc_index: "573",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1983",
  frequency: "3254",
  furigana: "夜中[よなか]",
  kana: "よなか",
  kanji: "夜中",
  optimized_sent_index: "520",
  optimized_voc_index: "574",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "906",
  frequency: "1631",
  furigana: "夕方[ゆうがた]",
  kana: "ゆうがた",
  kanji: "夕方",
  optimized_sent_index: "765",
  optimized_voc_index: "575",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "808",
  frequency: "822",
  furigana: "やっと",
  kana: "やっと",
  kanji: "やっと",
  optimized_sent_index: "795",
  optimized_voc_index: "576",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1893",
  frequency: "4158",
  furigana: "昼食[ちゅうしょく]",
  kana: "ちゅうしょく",
  kanji: "昼食",
  optimized_sent_index: "1741",
  optimized_voc_index: "577",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1895",
  frequency: "3306",
  furigana: "朝食[ちょうしょく]",
  kana: "ちょうしょく",
  kanji: "朝食",
  optimized_sent_index: "1757",
  optimized_voc_index: "578",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1974",
  frequency: "2261",
  furigana: "夕食[ゆうしょく]",
  kana: "ゆうしょく",
  kanji: "夕食",
  optimized_sent_index: "479",
  optimized_voc_index: "579",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1662",
  frequency: "8536",
  furigana: "夕飯[ゆうはん]",
  kana: "ゆうはん",
  kanji: "夕飯",
  optimized_sent_index: "1740",
  optimized_voc_index: "580",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "823",
  frequency: "2862",
  furigana: "ニュース",
  kana: "ニュース",
  kanji: "ニュース",
  optimized_sent_index: "491",
  optimized_voc_index: "581",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "644",
  frequency: "6304",
  furigana: "見方[みかた]",
  kana: "みかた",
  kanji: "見方",
  optimized_sent_index: "1062",
  optimized_voc_index: "582",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1583",
  frequency: "15129",
  furigana: "花見[はなみ]",
  kana: "はなみ",
  kanji: "花見",
  optimized_sent_index: "495",
  optimized_voc_index: "583",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1161",
  frequency: "2333",
  furigana: "言[い]い 方[かた]",
  kana: "いいかた",
  kanji: "言い方",
  optimized_sent_index: "496",
  optimized_voc_index: "584",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "467",
  frequency: "123",
  furigana: "話[はなし]",
  kana: "はなし",
  kanji: "話",
  optimized_sent_index: "832",
  optimized_voc_index: "585",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "827",
  frequency: "404",
  furigana: "ずっと",
  kana: "ずっと",
  kanji: "ずっと",
  optimized_sent_index: "890",
  optimized_voc_index: "586",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1232",
  frequency: "10226",
  furigana: "読[よ]み",
  kana: "よみ",
  kanji: "読み",
  optimized_sent_index: "901",
  optimized_voc_index: "587",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1620",
  frequency: "23580",
  furigana: "読[よ]み 方[かた]",
  kana: "よみかた",
  kanji: "読み方",
  optimized_sent_index: "680",
  optimized_voc_index: "588",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "435",
  frequency: "680",
  furigana: "語[かた]る",
  kana: "かたる",
  kanji: "語る",
  optimized_sent_index: "499",
  optimized_voc_index: "589",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "671",
  frequency: "4325",
  furigana: "言語[げんご]",
  kana: "げんご",
  kanji: "言語",
  optimized_sent_index: "955",
  optimized_voc_index: "590",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "832",
  frequency: "4413",
  furigana: "ビデオ",
  kana: "ビデオ",
  kanji: "ビデオ",
  optimized_sent_index: "1621",
  optimized_voc_index: "591",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "775",
  frequency: "2013",
  furigana: "英語[えいご]",
  kana: "えいご",
  kanji: "英語",
  optimized_sent_index: "501",
  optimized_voc_index: "592",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "689",
  frequency: "1331",
  furigana: "文字[もじ]",
  kana: "もじ",
  kanji: "文字",
  optimized_sent_index: "1696",
  optimized_voc_index: "593",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1647",
  frequency: "30787",
  furigana: "ローマ 字[じ]",
  kana: "ろーまじ",
  kanji: "ローマ字",
  optimized_sent_index: "636",
  optimized_voc_index: "594",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1794",
  frequency: "1378",
  furigana: "字[じ]",
  kana: "じ",
  kanji: "字",
  optimized_sent_index: "503",
  optimized_voc_index: "595",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "833",
  frequency: "1532",
  furigana: "マンション",
  kana: "マンション",
  kanji: "マンション",
  optimized_sent_index: "965",
  optimized_voc_index: "596",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1483",
  frequency: "18290",
  furigana: "書[か]き 方[かた]",
  kana: "かきかた",
  kanji: "書き方",
  optimized_sent_index: "1007",
  optimized_voc_index: "597",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1547",
  frequency: "3805",
  furigana: "覚[さ]める",
  kana: "さめる",
  kanji: "覚める",
  optimized_sent_index: "504",
  optimized_voc_index: "598",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1608",
  frequency: "3996",
  furigana: "覚[さ]ます",
  kana: "さます",
  kanji: "覚ます",
  optimized_sent_index: "505",
  optimized_voc_index: "599",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "709",
  frequency: "5158",
  furigana: "大会[たいかい]",
  kana: "たいかい",
  kanji: "大会",
  optimized_sent_index: "1348",
  optimized_voc_index: "600",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "848",
  frequency: "390",
  furigana: "しばらく",
  kana: "しばらく",
  kanji: "しばらく",
  optimized_sent_index: "422",
  optimized_voc_index: "601",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1290",
  frequency: "1319",
  furigana: "会話[かいわ]",
  kana: "かいわ",
  kanji: "会話",
  optimized_sent_index: "909",
  optimized_voc_index: "602",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "789",
  frequency: "3978",
  furigana: "話[はな]し 合[あ]う",
  kana: "はなしあう",
  kanji: "話し合う",
  optimized_sent_index: "508",
  optimized_voc_index: "603",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "794",
  frequency: "601",
  furigana: "合[あ]う",
  kana: "あう",
  kanji: "合う",
  optimized_sent_index: "1954",
  optimized_voc_index: "604",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1147",
  frequency: "3366",
  furigana: "間[ま]に 合[あ]う",
  kana: "まにあう",
  kanji: "間に合う",
  optimized_sent_index: "1656",
  optimized_voc_index: "605",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "856",
  frequency: "4236",
  furigana: "ガス",
  kana: "ガス",
  kanji: "ガス",
  optimized_sent_index: "1319",
  optimized_voc_index: "606",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "454",
  frequency: "705",
  furigana: "会社[かいしゃ]",
  kana: "かいしゃ",
  kanji: "会社",
  optimized_sent_index: "1211",
  optimized_voc_index: "607",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "486",
  frequency: "1263",
  furigana: "社会[しゃかい]",
  kana: "しゃかい",
  kanji: "社会",
  optimized_sent_index: "694",
  optimized_voc_index: "608",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "749",
  frequency: "3211",
  furigana: "社員[しゃいん]",
  kana: "しゃいん",
  kanji: "社員",
  optimized_sent_index: "1490",
  optimized_voc_index: "609",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1059",
  frequency: "918",
  furigana: "仕方[しかた]",
  kana: "しかた",
  kanji: "仕方",
  optimized_sent_index: "512",
  optimized_voc_index: "610",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "866",
  frequency: "508",
  furigana: "うまい",
  kana: "うまい",
  kanji: "うまい",
  optimized_sent_index: "1311",
  optimized_voc_index: "611",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "843",
  frequency: "852",
  furigana: "食事[しょくじ]",
  kana: "しょくじ",
  kanji: "食事",
  optimized_sent_index: "1647",
  optimized_voc_index: "612",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1312",
  frequency: "4297",
  furigana: "火事[かじ]",
  kana: "かじ",
  kanji: "火事",
  optimized_sent_index: "627",
  optimized_voc_index: "613",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1885",
  frequency: "1121",
  furigana: "大事[だいじ]",
  kana: "だいじ",
  kanji: "大事",
  optimized_sent_index: "515",
  optimized_voc_index: "614",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "546",
  frequency: "1886",
  furigana: "事故[じこ]",
  kana: "じこ",
  kanji: "事故",
  optimized_sent_index: "1854",
  optimized_voc_index: "615",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "869",
  frequency: "4468",
  furigana: "サラリーマン",
  kana: "サラリーマン",
  kanji: "サラリーマン",
  optimized_sent_index: "892",
  optimized_voc_index: "616",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "765",
  frequency: "4630",
  furigana: "工事[こうじ]",
  kana: "こうじ",
  kanji: "工事",
  optimized_sent_index: "815",
  optimized_voc_index: "617",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "497",
  frequency: "2001",
  furigana: "工場[こうじょう]",
  kana: "こうじょう",
  kanji: "工場",
  optimized_sent_index: "947",
  optimized_voc_index: "618",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "547",
  frequency: "286",
  furigana: "電話[でんわ]",
  kana: "でんわ",
  kanji: "電話",
  optimized_sent_index: "518",
  optimized_voc_index: "619",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "987",
  frequency: "3376",
  furigana: "電気[でんき]",
  kana: "でんき",
  kanji: "電気",
  optimized_sent_index: "519",
  optimized_voc_index: "620",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "878",
  frequency: "1800",
  furigana: "バス",
  kana: "バス",
  kanji: "バス",
  optimized_sent_index: "410",
  optimized_voc_index: "621",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "612",
  frequency: "305",
  furigana: "車[くるま]",
  kana: "くるま",
  kanji: "車",
  optimized_sent_index: "529",
  optimized_voc_index: "622",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1350",
  frequency: "13050",
  furigana: "駅員[えきいん]",
  kana: "えきいん",
  kanji: "駅員",
  optimized_sent_index: "524",
  optimized_voc_index: "623",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "835",
  frequency: "372",
  furigana: "通[とお]り",
  kana: "とおり",
  kanji: "通り",
  optimized_sent_index: "526",
  optimized_voc_index: "624",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "855",
  frequency: "685",
  furigana: "通[とお]る",
  kana: "とおる",
  kanji: "通る",
  optimized_sent_index: "530",
  optimized_voc_index: "625",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "893",
  frequency: "1923",
  furigana: "クラス",
  kana: "クラス",
  kanji: "クラス",
  optimized_sent_index: "675",
  optimized_voc_index: "626",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "912",
  frequency: "1820",
  furigana: "通[かよ]う",
  kana: "かよう",
  kanji: "通う",
  optimized_sent_index: "527",
  optimized_voc_index: "627",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1140",
  frequency: "10411",
  furigana: "交通事故[こうつうじこ]",
  kana: "こうつうじこ",
  kanji: "交通事故",
  optimized_sent_index: "1400",
  optimized_voc_index: "628",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1247",
  frequency: "11452",
  furigana: "水道[すいどう]",
  kana: "すいどう",
  kanji: "水道",
  optimized_sent_index: "641",
  optimized_voc_index: "629",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1869",
  frequency: "14580",
  furigana: "車道[しゃどう]",
  kana: "しゃどう",
  kanji: "車道",
  optimized_sent_index: "792",
  optimized_voc_index: "630",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "895",
  frequency: "2762",
  furigana: "トラック",
  kana: "トラック",
  kanji: "トラック",
  optimized_sent_index: "783",
  optimized_voc_index: "631",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "773",
  frequency: "1944",
  furigana: "道路[どうろ]",
  kana: "どうろ",
  kanji: "道路",
  optimized_sent_index: "531",
  optimized_voc_index: "632",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "508",
  frequency: "1028",
  furigana: "土地[とち]",
  kana: "とち",
  kanji: "土地",
  optimized_sent_index: "888",
  optimized_voc_index: "633",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "962",
  frequency: "2539",
  furigana: "地図[ちず]",
  kana: "ちず",
  kanji: "地図",
  optimized_sent_index: "532",
  optimized_voc_index: "634",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "673",
  frequency: "274",
  furigana: "他[た]",
  kana: "た",
  kanji: "他",
  optimized_sent_index: "1386",
  optimized_voc_index: "635",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "898",
  frequency: "6557",
  furigana: "パーティー",
  kana: "パーティー",
  kanji: "パーティー",
  optimized_sent_index: "456",
  optimized_voc_index: "636",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1578",
  frequency: "652",
  furigana: "止[と]める",
  kana: "とめる",
  kanji: "止める",
  optimized_sent_index: "535",
  optimized_voc_index: "637",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1751",
  frequency: "1321",
  furigana: "止[と]まる",
  kana: "とまる",
  kanji: "止まる",
  optimized_sent_index: "536",
  optimized_voc_index: "638",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1761",
  frequency: "5131",
  furigana: "止[や]む",
  kana: "やむ",
  kanji: "止む",
  optimized_sent_index: "537",
  optimized_voc_index: "639",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1388",
  frequency: "5912",
  furigana: "歩道[ほどう]",
  kana: "ほどう",
  kanji: "歩道",
  optimized_sent_index: "539",
  optimized_voc_index: "640",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "900",
  frequency: "508",
  furigana: "うまい",
  kana: "うまい",
  kanji: "うまい",
  optimized_sent_index: "1737",
  optimized_voc_index: "641",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "951",
  frequency: "921",
  furigana: "渡[わた]す",
  kana: "わたす",
  kanji: "渡す",
  optimized_sent_index: "974",
  optimized_voc_index: "642",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1076",
  frequency: "1078",
  furigana: "渡[わた]る",
  kana: "わたる",
  kanji: "渡る",
  optimized_sent_index: "1338",
  optimized_voc_index: "643",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "620",
  frequency: "16954",
  furigana: "年度[ねんど]",
  kana: "ねんど",
  kanji: "年度",
  optimized_sent_index: "864",
  optimized_voc_index: "644",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "759",
  frequency: "427",
  furigana: "今度[こんど]",
  kana: "こんど",
  kanji: "今度",
  optimized_sent_index: "541",
  optimized_voc_index: "645",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "903",
  frequency: "1591",
  furigana: "ガラス",
  kana: "ガラス",
  kanji: "ガラス",
  optimized_sent_index: "1968",
  optimized_voc_index: "646",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1123",
  frequency: "161821",
  furigana: "何度[なんど]",
  kana: "なんど",
  kanji: "何度",
  optimized_sent_index: "579",
  optimized_voc_index: "647",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "431",
  frequency: "1086",
  furigana: "最近[さいきん]",
  kana: "さいきん",
  kanji: "最近",
  optimized_sent_index: "693",
  optimized_voc_index: "648",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "979",
  frequency: "1295",
  furigana: "遠[とお]く",
  kana: "とおく",
  kanji: "遠く",
  optimized_sent_index: "1128",
  optimized_voc_index: "649",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "479",
  frequency: "1181",
  furigana: "社長[しゃちょう]",
  kana: "しゃちょう",
  kanji: "社長",
  optimized_sent_index: "544",
  optimized_voc_index: "650",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "907",
  frequency: "3945",
  furigana: "コース",
  kana: "コース",
  kanji: "コース",
  optimized_sent_index: "647",
  optimized_voc_index: "651",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "533",
  frequency: "2939",
  furigana: "会長[かいちょう]",
  kana: "かいちょう",
  kanji: "会長",
  optimized_sent_index: "1946",
  optimized_voc_index: "652",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "892",
  frequency: "4968",
  furigana: "長[なが]さ",
  kana: "ながさ",
  kanji: "長さ",
  optimized_sent_index: "545",
  optimized_voc_index: "653",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "927",
  frequency: "4137",
  furigana: "長男[ちょうなん]",
  kana: "ちょうなん",
  kanji: "長男",
  optimized_sent_index: "971",
  optimized_voc_index: "654",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1894",
  frequency: "9579",
  furigana: "長女[ちょうじょ]",
  kana: "ちょうじょ",
  kanji: "長女",
  optimized_sent_index: "914",
  optimized_voc_index: "655",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "908",
  frequency: "1450",
  furigana: "アパート",
  kana: "アパート",
  kanji: "アパート",
  optimized_sent_index: "970",
  optimized_voc_index: "656",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "538",
  frequency: "1652",
  furigana: "広[ひろ]がる",
  kana: "ひろがる",
  kanji: "広がる",
  optimized_sent_index: "1385",
  optimized_voc_index: "657",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1231",
  frequency: "161821",
  furigana: "広[ひろ]さ",
  kana: "ひろさ",
  kanji: "広さ",
  optimized_sent_index: "1342",
  optimized_voc_index: "658",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "562",
  frequency: "1372",
  furigana: "全体[ぜんたい]",
  kana: "ぜんたい",
  kanji: "全体",
  optimized_sent_index: "1136",
  optimized_voc_index: "659",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "643",
  frequency: "850",
  furigana: "全[まった]く",
  kana: "まったく",
  kanji: "全く",
  optimized_sent_index: "547",
  optimized_voc_index: "660",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "910",
  frequency: "5552",
  furigana: "レコード",
  kana: "レコード",
  kanji: "レコード",
  optimized_sent_index: "904",
  optimized_voc_index: "661",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "781",
  frequency: "2059",
  furigana: "安全[あんぜん]",
  kana: "あんぜん",
  kanji: "安全",
  optimized_sent_index: "929",
  optimized_voc_index: "662",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "475",
  frequency: "1249",
  furigana: "一部[いちぶ]",
  kana: "いちぶ",
  kanji: "一部",
  optimized_sent_index: "829",
  optimized_voc_index: "663",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "518",
  frequency: "851",
  furigana: "部分[ぶぶん]",
  kana: "ぶぶん",
  kanji: "部分",
  optimized_sent_index: "695",
  optimized_voc_index: "664",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "452",
  frequency: "5114",
  furigana: "国内[こくない]",
  kana: "こくない",
  kanji: "国内",
  optimized_sent_index: "1384",
  optimized_voc_index: "665",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "911",
  frequency: "2119",
  furigana: "どんどん",
  kana: "どんどん",
  kanji: "どんどん",
  optimized_sent_index: "906",
  optimized_voc_index: "666",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "480",
  frequency: "5049",
  furigana: "全国[ぜんこく]",
  kana: "ぜんこく",
  kanji: "全国",
  optimized_sent_index: "775",
  optimized_voc_index: "667",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "548",
  frequency: "2610",
  furigana: "外国[がいこく]",
  kana: "がいこく",
  kanji: "外国",
  optimized_sent_index: "897",
  optimized_voc_index: "668",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "588",
  frequency: "14767",
  furigana: "国会[こっかい]",
  kana: "こっかい",
  kanji: "国会",
  optimized_sent_index: "1623",
  optimized_voc_index: "669",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "767",
  frequency: "3480",
  furigana: "帰国[きこく]",
  kana: "きこく",
  kanji: "帰国",
  optimized_sent_index: "961",
  optimized_voc_index: "670",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "918",
  frequency: "2193",
  furigana: "カメラ",
  kana: "カメラ",
  kanji: "カメラ",
  optimized_sent_index: "1259",
  optimized_voc_index: "671",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "772",
  frequency: "4495",
  furigana: "外国人[がいこくじん]",
  kana: "がいこくじん",
  kanji: "外国人",
  optimized_sent_index: "754",
  optimized_voc_index: "672",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1201",
  frequency: "17985",
  furigana: "外国語[がいこくご]",
  kana: "がいこくご",
  kanji: "外国語",
  optimized_sent_index: "700",
  optimized_voc_index: "673",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "433",
  frequency: "301",
  furigana: "世界[せかい]",
  kana: "せかい",
  kanji: "世界",
  optimized_sent_index: "868",
  optimized_voc_index: "674",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1872",
  frequency: "1216",
  furigana: "白[しろ]",
  kana: "しろ",
  kanji: "白",
  optimized_sent_index: "847",
  optimized_voc_index: "675",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "925",
  frequency: "4503",
  furigana: "テープ",
  kana: "テープ",
  kanji: "テープ",
  optimized_sent_index: "1173",
  optimized_voc_index: "676",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "931",
  frequency: "504",
  furigana: "黒[くろ]い",
  kana: "くろい",
  kanji: "黒い",
  optimized_sent_index: "972",
  optimized_voc_index: "677",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1100",
  frequency: "1117",
  furigana: "黒[くろ]",
  kana: "くろ",
  kanji: "黒",
  optimized_sent_index: "551",
  optimized_voc_index: "678",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1012",
  frequency: "7148",
  furigana: "赤[あか]ちゃん",
  kana: "あかちゃん",
  kanji: "赤ちゃん",
  optimized_sent_index: "1824",
  optimized_voc_index: "679",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1108",
  frequency: "1154",
  furigana: "赤[あか]",
  kana: "あか",
  kanji: "赤",
  optimized_sent_index: "1048",
  optimized_voc_index: "680",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "945",
  frequency: "1892",
  furigana: "ビール",
  kana: "ビール",
  kanji: "ビール",
  optimized_sent_index: "1635",
  optimized_voc_index: "681",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "552",
  frequency: "1966",
  furigana: "銀行[ぎんこう]",
  kana: "ぎんこう",
  kanji: "銀行",
  optimized_sent_index: "553",
  optimized_voc_index: "682",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1137",
  frequency: "1450",
  furigana: "銀[ぎん]",
  kana: "ぎん",
  kanji: "銀",
  optimized_sent_index: "984",
  optimized_voc_index: "683",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1011",
  frequency: "7042",
  furigana: "地下鉄[ちかてつ]",
  kana: "ちかてつ",
  kanji: "地下鉄",
  optimized_sent_index: "1213",
  optimized_voc_index: "684",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "991",
  frequency: "13401",
  furigana: "牛肉[ぎゅうにく]",
  kana: "ぎゅうにく",
  kanji: "牛肉",
  optimized_sent_index: "554",
  optimized_voc_index: "685",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "948",
  frequency: "2464",
  furigana: "ページ",
  kana: "ページ",
  kanji: "ページ",
  optimized_sent_index: "457",
  optimized_voc_index: "686",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1912",
  frequency: "1100",
  furigana: "肉[にく]",
  kana: "にく",
  kanji: "肉",
  optimized_sent_index: "1567",
  optimized_voc_index: "687",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1653",
  frequency: "1271",
  furigana: "魚[さかな]",
  kana: "さかな",
  kanji: "魚",
  optimized_sent_index: "556",
  optimized_voc_index: "688",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "453",
  frequency: "7291",
  furigana: "分野[ぶんや]",
  kana: "ぶんや",
  kanji: "分野",
  optimized_sent_index: "1558",
  optimized_voc_index: "689",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "950",
  frequency: "4812",
  furigana: "野菜[やさい]",
  kana: "やさい",
  kanji: "野菜",
  optimized_sent_index: "557",
  optimized_voc_index: "690",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "954",
  frequency: "24771",
  furigana: "グラフ",
  kana: "グラフ",
  kanji: "グラフ",
  optimized_sent_index: "975",
  optimized_voc_index: "691",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1430",
  frequency: "10368",
  furigana: "本屋[ほんや]",
  kana: "ほんや",
  kanji: "本屋",
  optimized_sent_index: "558",
  optimized_voc_index: "692",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1541",
  frequency: "14531",
  furigana: "八百屋[やおや]",
  kana: "やおや",
  kanji: "八百屋",
  optimized_sent_index: "559",
  optimized_voc_index: "693",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1800",
  frequency: "26827",
  furigana: "そば 屋[や]",
  kana: "そばや",
  kanji: "そば屋",
  optimized_sent_index: "561",
  optimized_voc_index: "694",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1801",
  frequency: ``,
  furigana: "たばこ 屋[や]",
  kana: "たばこや",
  kanji: "たばこ屋",
  optimized_sent_index: "562",
  optimized_voc_index: "695",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "966",
  frequency: "9559",
  furigana: "ポスト",
  kana: "ポスト",
  kanji: "ポスト",
  optimized_sent_index: "809",
  optimized_voc_index: "696",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1292",
  frequency: "2244",
  furigana: "茶[ちゃ]",
  kana: "ちゃ",
  kanji: "茶",
  optimized_sent_index: "564",
  optimized_voc_index: "697",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1296",
  frequency: "1663",
  furigana: "お 茶[ちゃ]",
  kana: "おちゃ",
  kanji: "お茶",
  optimized_sent_index: "565",
  optimized_voc_index: "698",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1892",
  frequency: "20997",
  furigana: "茶[ちゃ]わん",
  kana: "ちゃわん",
  kanji: "茶わん",
  optimized_sent_index: "566",
  optimized_voc_index: "699",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "937",
  frequency: "1304",
  furigana: "味[あじ]",
  kana: "あじ",
  kanji: "味",
  optimized_sent_index: "1474",
  optimized_voc_index: "700",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "972",
  frequency: "4846",
  furigana: "テスト",
  kana: "テスト",
  kanji: "テスト",
  optimized_sent_index: "790",
  optimized_voc_index: "701",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1029",
  frequency: "2002",
  furigana: "未来[みらい]",
  kana: "みらい",
  kanji: "未来",
  optimized_sent_index: "1518",
  optimized_voc_index: "702",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1163",
  frequency: "10666",
  furigana: "週末[しゅうまつ]",
  kana: "しゅうまつ",
  kanji: "週末",
  optimized_sent_index: "567",
  optimized_voc_index: "703",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "914",
  frequency: "1345",
  furigana: "料理[りょうり]",
  kana: "りょうり",
  kanji: "料理",
  optimized_sent_index: "1559",
  optimized_voc_index: "704",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "921",
  frequency: "699",
  furigana: "無理[むり]",
  kana: "むり",
  kanji: "無理",
  optimized_sent_index: "569",
  optimized_voc_index: "705",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "973",
  frequency: "1737",
  furigana: "あちこち",
  kana: "あちこち",
  kanji: "あちこち",
  optimized_sent_index: "1582",
  optimized_voc_index: "706",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1717",
  frequency: "3659",
  furigana: "なくす",
  kana: "なくす",
  kanji: "なくす",
  optimized_sent_index: "1735",
  optimized_voc_index: "707",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1752",
  frequency: "10746",
  furigana: "無[な]くなる",
  kana: "なくなる",
  kanji: "無くなる",
  optimized_sent_index: "570",
  optimized_voc_index: "708",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1264",
  frequency: "16994",
  furigana: "作文[さくぶん]",
  kana: "さくぶん",
  kanji: "作文",
  optimized_sent_index: "571",
  optimized_voc_index: "709",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "434",
  frequency: "2259",
  furigana: "用[もち]いる",
  kana: "もちいる",
  kanji: "用いる",
  optimized_sent_index: "1728",
  optimized_voc_index: "710",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "980",
  frequency: "6116",
  furigana: "ゴルフ",
  kana: "ゴルフ",
  kanji: "ゴルフ",
  optimized_sent_index: "922",
  optimized_voc_index: "711",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1457",
  frequency: "3034",
  furigana: "用事[ようじ]",
  kana: "ようじ",
  kanji: "用事",
  optimized_sent_index: "1832",
  optimized_voc_index: "712",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1590",
  frequency: "42065",
  furigana: "交通費[こうつうひ]",
  kana: "こうつうひ",
  kanji: "交通費",
  optimized_sent_index: "575",
  optimized_voc_index: "713",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "519",
  frequency: "435",
  furigana: "消[き]える",
  kana: "きえる",
  kanji: "消える",
  optimized_sent_index: "1693",
  optimized_voc_index: "714",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1695",
  frequency: "27534",
  furigana: "消[け]しゴム",
  kana: "けしごむ",
  kanji: "消しゴム",
  optimized_sent_index: "722",
  optimized_voc_index: "715",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "982",
  frequency: "3858",
  furigana: "ラジオ",
  kana: "ラジオ",
  kanji: "ラジオ",
  optimized_sent_index: "976",
  optimized_voc_index: "716",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "874",
  frequency: "3773",
  furigana: "売[う]れる",
  kana: "うれる",
  kanji: "売れる",
  optimized_sent_index: "590",
  optimized_voc_index: "717",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1170",
  frequency: "16415",
  furigana: "売[う]り 場[ば]",
  kana: "うりば",
  kanji: "売り場",
  optimized_sent_index: "577",
  optimized_voc_index: "718",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1248",
  frequency: "4998",
  furigana: "店員[てんいん]",
  kana: "てんいん",
  kanji: "店員",
  optimized_sent_index: "908",
  optimized_voc_index: "719",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1427",
  frequency: "13766",
  furigana: "売店[ばいてん]",
  kana: "ばいてん",
  kanji: "売店",
  optimized_sent_index: "813",
  optimized_voc_index: "720",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "984",
  frequency: "1683",
  furigana: "タクシー",
  kana: "タクシー",
  kanji: "タクシー",
  optimized_sent_index: "1598",
  optimized_voc_index: "721",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "596",
  frequency: "4373",
  furigana: "商品[しょうひん]",
  kana: "しょうひん",
  kanji: "商品",
  optimized_sent_index: "580",
  optimized_voc_index: "722",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "657",
  frequency: "956",
  furigana: "作品[さくひん]",
  kana: "さくひん",
  kanji: "作品",
  optimized_sent_index: "811",
  optimized_voc_index: "723",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "420",
  frequency: "7762",
  furigana: "販売[はんばい]",
  kana: "はんばい",
  kanji: "販売",
  optimized_sent_index: "886",
  optimized_voc_index: "724",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1702",
  frequency: ``,
  furigana: "二階[にかい]",
  kana: "にかい",
  kanji: "二階",
  optimized_sent_index: "926",
  optimized_voc_index: "725",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "989",
  frequency: "471",
  furigana: "ゆっくり",
  kana: "ゆっくり",
  kanji: "ゆっくり",
  optimized_sent_index: "497",
  optimized_voc_index: "726",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "594",
  frequency: "2734",
  furigana: "段階[だんかい]",
  kana: "だんかい",
  kanji: "段階",
  optimized_sent_index: "1355",
  optimized_voc_index: "727",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1042",
  frequency: "737",
  furigana: "階段[かいだん]",
  kana: "かいだん",
  kanji: "階段",
  optimized_sent_index: "584",
  optimized_voc_index: "728",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1747",
  frequency: "10271",
  furigana: "段々[だんだん]",
  kana: "だんだん",
  kanji: "段々",
  optimized_sent_index: "823",
  optimized_voc_index: "729",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "891",
  frequency: "4154",
  furigana: "値段[ねだん]",
  kana: "ねだん",
  kanji: "値段",
  optimized_sent_index: "586",
  optimized_voc_index: "730",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1004",
  frequency: "3446",
  furigana: "レストラン",
  kana: "レストラン",
  kanji: "レストラン",
  optimized_sent_index: "568",
  optimized_voc_index: "731",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "468",
  frequency: "10514",
  furigana: "価格[かかく]",
  kana: "かかく",
  kanji: "価格",
  optimized_sent_index: "588",
  optimized_voc_index: "732",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "953",
  frequency: "8469",
  furigana: "合格[ごうかく]",
  kana: "ごうかく",
  kanji: "合格",
  optimized_sent_index: "930",
  optimized_voc_index: "733",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "960",
  frequency: "5532",
  furigana: "夏休[なつやす]み",
  kana: "なつやすみ",
  kanji: "夏休み",
  optimized_sent_index: "591",
  optimized_voc_index: "734",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1660",
  frequency: "27247",
  furigana: "冬休[ふゆやす]み",
  kana: "ふゆやすみ",
  kanji: "冬休み",
  optimized_sent_index: "1913",
  optimized_voc_index: "735",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1006",
  frequency: "2524",
  furigana: "カード",
  kana: "カード",
  kanji: "カード",
  optimized_sent_index: "1145",
  optimized_voc_index: "736",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1435",
  frequency: "9233",
  furigana: "四季[しき]",
  kana: "しき",
  kanji: "四季",
  optimized_sent_index: "595",
  optimized_voc_index: "737",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1293",
  frequency: "145003",
  furigana: "暑[あつ]さ",
  kana: "あつさ",
  kanji: "暑さ",
  optimized_sent_index: "1327",
  optimized_voc_index: "738",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "890",
  frequency: "1712",
  furigana: "熱[ねつ]",
  kana: "ねつ",
  kanji: "熱",
  optimized_sent_index: "599",
  optimized_voc_index: "739",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1776",
  frequency: "85019",
  furigana: "寒[さむ]さ",
  kana: "さむさ",
  kanji: "寒さ",
  optimized_sent_index: "1328",
  optimized_voc_index: "740",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1018",
  frequency: "5560",
  furigana: "アルバイト",
  kana: "アルバイト",
  kanji: "アルバイト",
  optimized_sent_index: "923",
  optimized_voc_index: "741",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1767",
  frequency: "17301",
  furigana: "暖[あたた]める",
  kana: "あたためる",
  kanji: "暖める",
  optimized_sent_index: "602",
  optimized_voc_index: "742",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1817",
  frequency: "26108",
  furigana: "暖[あたた]まる",
  kana: "あたたまる",
  kanji: "暖まる",
  optimized_sent_index: "603",
  optimized_voc_index: "743",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "840",
  frequency: "7835",
  furigana: "温度[おんど]",
  kana: "おんど",
  kanji: "温度",
  optimized_sent_index: "605",
  optimized_voc_index: "744",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1198",
  frequency: "9372",
  furigana: "気温[きおん]",
  kana: "きおん",
  kanji: "気温",
  optimized_sent_index: "606",
  optimized_voc_index: "745",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1024",
  frequency: "5757",
  furigana: "コピー",
  kana: "コピー",
  kanji: "コピー",
  optimized_sent_index: "1057",
  optimized_voc_index: "746",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1884",
  frequency: "932",
  furigana: "台[だい]",
  kana: "だい",
  kanji: "台",
  optimized_sent_index: "614",
  optimized_voc_index: "747",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "844",
  frequency: "287",
  furigana: "風[かぜ]",
  kana: "かぜ",
  kanji: "風",
  optimized_sent_index: "683",
  optimized_voc_index: "748",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "977",
  frequency: "7948",
  furigana: "台風[たいふう]",
  kana: "たいふう",
  kanji: "台風",
  optimized_sent_index: "607",
  optimized_voc_index: "749",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "685",
  frequency: "1000",
  furigana: "事情[じじょう]",
  kana: "じじょう",
  kanji: "事情",
  optimized_sent_index: "608",
  optimized_voc_index: "750",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1025",
  frequency: "1758",
  furigana: "ぶつかる",
  kana: "ぶつかる",
  kanji: "ぶつかる",
  optimized_sent_index: "1340",
  optimized_voc_index: "751",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "417",
  frequency: "930",
  furigana: "情報[じょうほう]",
  kana: "じょうほう",
  kanji: "情報",
  optimized_sent_index: "1224",
  optimized_voc_index: "752",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "595",
  frequency: "955",
  furigana: "報告[ほうこく]",
  kana: "ほうこく",
  kanji: "報告",
  optimized_sent_index: "1052",
  optimized_voc_index: "753",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "583",
  frequency: "907",
  furigana: "新聞[しんぶん]",
  kana: "しんぶん",
  kanji: "新聞",
  optimized_sent_index: "1343",
  optimized_voc_index: "754",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1327",
  frequency: "14359",
  furigana: "新年[しんねん]",
  kana: "しんねん",
  kanji: "新年",
  optimized_sent_index: "611",
  optimized_voc_index: "755",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1028",
  frequency: "6156",
  furigana: "フィルム",
  kana: "フィルム",
  kanji: "フィルム",
  optimized_sent_index: "871",
  optimized_voc_index: "756",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1979",
  frequency: "584",
  furigana: "良[よ]い",
  kana: "よい",
  kanji: "良い",
  optimized_sent_index: "1156",
  optimized_voc_index: "757",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "437",
  frequency: "1386",
  furigana: "中心[ちゅうしん]",
  kana: "ちゅうしん",
  kanji: "中心",
  optimized_sent_index: "1332",
  optimized_voc_index: "758",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1132",
  frequency: "1139",
  furigana: "安心[あんしん]",
  kana: "あんしん",
  kanji: "安心",
  optimized_sent_index: "616",
  optimized_voc_index: "759",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "938",
  frequency: "483",
  furigana: "思[おも]い 出[だ]す",
  kana: "おもいだす",
  kanji: "思い出す",
  optimized_sent_index: "731",
  optimized_voc_index: "760",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1031",
  frequency: "5134",
  furigana: "デパート",
  kana: "デパート",
  kanji: "デパート",
  optimized_sent_index: "1956",
  optimized_voc_index: "761",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1037",
  frequency: "2684",
  furigana: "思[おも]い 出[で]",
  kana: "おもいで",
  kanji: "思い出",
  optimized_sent_index: "872",
  optimized_voc_index: "762",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "831",
  frequency: "615",
  furigana: "考[かんが]え",
  kana: "かんがえ",
  kanji: "考え",
  optimized_sent_index: "619",
  optimized_voc_index: "763",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "463",
  frequency: "2032",
  furigana: "解決[かいけつ]",
  kana: "かいけつ",
  kanji: "解決",
  optimized_sent_index: "620",
  optimized_voc_index: "764",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1258",
  frequency: "1868",
  furigana: "知[し]らせる",
  kana: "しらせる",
  kanji: "知らせる",
  optimized_sent_index: "1512",
  optimized_voc_index: "765",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1038",
  frequency: "681",
  furigana: "ベッド",
  kana: "ベッド",
  kanji: "ベッド",
  optimized_sent_index: "1401",
  optimized_voc_index: "766",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "602",
  frequency: "1395",
  furigana: "能力[のうりょく]",
  kana: "のうりょく",
  kanji: "能力",
  optimized_sent_index: "949",
  optimized_voc_index: "767",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "577",
  frequency: "1845",
  furigana: "可能[かのう]",
  kana: "かのう",
  kanji: "可能",
  optimized_sent_index: "623",
  optimized_voc_index: "768",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "2000",
  frequency: "3980",
  furigana: "可[か]",
  kana: "か",
  kanji: "可",
  optimized_sent_index: "673",
  optimized_voc_index: "769",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1348",
  frequency: "14706",
  furigana: "郵便[ゆうびん]",
  kana: "ゆうびん",
  kanji: "郵便",
  optimized_sent_index: "654",
  optimized_voc_index: "770",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1044",
  frequency: "2811",
  furigana: "コート",
  kana: "コート",
  kanji: "コート",
  optimized_sent_index: "766",
  optimized_voc_index: "771",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1534",
  frequency: "9805",
  furigana: "不便[ふべん]",
  kana: "ふべん",
  kanji: "不便",
  optimized_sent_index: "624",
  optimized_voc_index: "772",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1999",
  frequency: ``,
  furigana: "郵便屋[ゆうびんや]さん",
  kana: "ゆうびんやさん",
  kanji: "郵便屋さん",
  optimized_sent_index: "625",
  optimized_voc_index: "773",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1084",
  frequency: "11321",
  furigana: "郵便局[ゆうびんきょく]",
  kana: "ゆうびんきょく",
  kanji: "郵便局",
  optimized_sent_index: "733",
  optimized_voc_index: "774",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1474",
  frequency: "12590",
  furigana: "交番[こうばん]",
  kana: "こうばん",
  kanji: "交番",
  optimized_sent_index: "628",
  optimized_voc_index: "775",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1057",
  frequency: "3433",
  furigana: "ノート",
  kana: "ノート",
  kanji: "ノート",
  optimized_sent_index: "458",
  optimized_voc_index: "776",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1682",
  frequency: "9352",
  furigana: "番地[ばんち]",
  kana: "ばんち",
  kanji: "番地",
  optimized_sent_index: "1335",
  optimized_voc_index: "777",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1071",
  frequency: "3910",
  furigana: "番号[ばんごう]",
  kana: "ばんごう",
  kanji: "番号",
  optimized_sent_index: "629",
  optimized_voc_index: "778",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "607",
  frequency: "325",
  furigana: "場所[ばしょ]",
  kana: "ばしょ",
  kanji: "場所",
  optimized_sent_index: "679",
  optimized_voc_index: "779",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "928",
  frequency: "1907",
  furigana: "近所[きんじょ]",
  kana: "きんじょ",
  kanji: "近所",
  optimized_sent_index: "630",
  optimized_voc_index: "780",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1072",
  frequency: "4320",
  furigana: "ワイン",
  kana: "ワイン",
  kanji: "ワイン",
  optimized_sent_index: "480",
  optimized_voc_index: "781",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1060",
  frequency: "1748",
  furigana: "台所[だいどころ]",
  kana: "だいどころ",
  kanji: "台所",
  optimized_sent_index: "899",
  optimized_voc_index: "782",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1204",
  frequency: "3291",
  furigana: "住所[じゅうしょ]",
  kana: "じゅうしょ",
  kanji: "住所",
  optimized_sent_index: "631",
  optimized_voc_index: "783",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1954",
  frequency: "6177",
  furigana: "便所[べんじょ]",
  kana: "べんじょ",
  kanji: "便所",
  optimized_sent_index: "633",
  optimized_voc_index: "784",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "870",
  frequency: "1459",
  furigana: "有名[ゆうめい]",
  kana: "ゆうめい",
  kanji: "有名",
  optimized_sent_index: "666",
  optimized_voc_index: "785",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1075",
  frequency: "772",
  furigana: "おかしい",
  kana: "おかしい",
  kanji: "おかしい",
  optimized_sent_index: "980",
  optimized_voc_index: "786",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1633",
  frequency: "20172",
  furigana: "名字[みょうじ]",
  kana: "みょうじ",
  kanji: "名字",
  optimized_sent_index: "635",
  optimized_voc_index: "787",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1867",
  frequency: "16015",
  furigana: "氏名[しめい]",
  kana: "しめい",
  kanji: "氏名",
  optimized_sent_index: "637",
  optimized_voc_index: "788",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "718",
  frequency: "10697",
  furigana: "各国[かっこく]",
  kana: "かっこく",
  kanji: "各国",
  optimized_sent_index: "1227",
  optimized_voc_index: "789",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1962",
  frequency: "313",
  furigana: "町[まち]",
  kana: "まち",
  kanji: "町",
  optimized_sent_index: "1375",
  optimized_voc_index: "790",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1087",
  frequency: "3005",
  furigana: "トイレ",
  kana: "トイレ",
  kanji: "トイレ",
  optimized_sent_index: "1836",
  optimized_voc_index: "791",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "597",
  frequency: "1964",
  furigana: "都市[とし]",
  kana: "とし",
  kanji: "都市",
  optimized_sent_index: "642",
  optimized_voc_index: "792",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1494",
  frequency: "2058",
  furigana: "都合[つごう]",
  kana: "つごう",
  kanji: "都合",
  optimized_sent_index: "643",
  optimized_voc_index: "793",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1816",
  frequency: "31094",
  furigana: "朝[あさ]ご 飯[はん]",
  kana: "あさごはん",
  kanji: "朝ご飯",
  optimized_sent_index: "644",
  optimized_voc_index: "794",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1019",
  frequency: "5846",
  furigana: "買[か]い 物[もの]",
  kana: "かいもの",
  kanji: "買い物",
  optimized_sent_index: "898",
  optimized_voc_index: "795",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1093",
  frequency: "7554",
  furigana: "キャンプ",
  kana: "キャンプ",
  kanji: "キャンプ",
  optimized_sent_index: "441",
  optimized_voc_index: "796",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1094",
  frequency: "1789",
  furigana: "荷物[にもつ]",
  kana: "にもつ",
  kanji: "荷物",
  optimized_sent_index: "981",
  optimized_voc_index: "797",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1102",
  frequency: "4218",
  furigana: "品物[しなもの]",
  kana: "しなもの",
  kanji: "品物",
  optimized_sent_index: "844",
  optimized_voc_index: "798",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1257",
  frequency: "2836",
  furigana: "見物[けんぶつ]",
  kana: "けんぶつ",
  kanji: "見物",
  optimized_sent_index: "1511",
  optimized_voc_index: "799",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1346",
  frequency: "531",
  furigana: "物[もの]",
  kana: "もの",
  kanji: "物",
  optimized_sent_index: "1002",
  optimized_voc_index: "800",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1103",
  frequency: "11058",
  furigana: "プラスチック",
  kana: "プラスチック",
  kanji: "プラスチック",
  optimized_sent_index: "1096",
  optimized_voc_index: "801",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1710",
  frequency: "17535",
  furigana: "忘[わす]れ 物[もの]",
  kana: "わすれもの",
  kanji: "忘れ物",
  optimized_sent_index: "678",
  optimized_voc_index: "802",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1128",
  frequency: "182214",
  furigana: "重[おも]さ",
  kana: "おもさ",
  kanji: "重さ",
  optimized_sent_index: "717",
  optimized_voc_index: "803",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1063",
  frequency: "4186",
  furigana: "配[くば]る",
  kana: "くばる",
  kanji: "配る",
  optimized_sent_index: "1058",
  optimized_voc_index: "804",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1328",
  frequency: "11799",
  furigana: "配達[はいたつ]",
  kana: "はいたつ",
  kanji: "配達",
  optimized_sent_index: "999",
  optimized_voc_index: "805",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1116",
  frequency: "9098",
  furigana: "カラー",
  kana: "カラー",
  kanji: "カラー",
  optimized_sent_index: "1843",
  optimized_voc_index: "806",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1873",
  frequency: "436",
  furigana: "心配[しんぱい]",
  kana: "しんぱい",
  kanji: "心配",
  optimized_sent_index: "645",
  optimized_voc_index: "807",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1032",
  frequency: "2124",
  furigana: "見送[みおく]る",
  kana: "みおくる",
  kanji: "見送る",
  optimized_sent_index: "979",
  optimized_voc_index: "808",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1390",
  frequency: "10109",
  furigana: "見送[みおく]り",
  kana: "みおくり",
  kanji: "見送り",
  optimized_sent_index: "646",
  optimized_voc_index: "809",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "414",
  frequency: "302",
  furigana: "受[う]ける",
  kana: "うける",
  kanji: "受ける",
  optimized_sent_index: "1234",
  optimized_voc_index: "810",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1120",
  frequency: "3723",
  furigana: "ピアノ",
  kana: "ピアノ",
  kanji: "ピアノ",
  optimized_sent_index: "688",
  optimized_voc_index: "811",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "934",
  frequency: "1542",
  furigana: "受[う]け 取[と]る",
  kana: "うけとる",
  kanji: "受け取る",
  optimized_sent_index: "973",
  optimized_voc_index: "812",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1344",
  frequency: "3521",
  furigana: "取[と]れる",
  kana: "とれる",
  kanji: "取れる",
  optimized_sent_index: "649",
  optimized_voc_index: "813",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1831",
  frequency: "42439",
  furigana: "書[か]き 取[と]る",
  kana: "かきとる",
  kanji: "書き取る",
  optimized_sent_index: "652",
  optimized_voc_index: "814",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "696",
  frequency: "1294",
  furigana: "届[とど]く",
  kana: "とどく",
  kanji: "届く",
  optimized_sent_index: "889",
  optimized_voc_index: "815",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1130",
  frequency: "8224",
  furigana: "スキー",
  kana: "スキー",
  kanji: "スキー",
  optimized_sent_index: "594",
  optimized_voc_index: "816",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1148",
  frequency: "3335",
  furigana: "届[とど]ける",
  kana: "とどける",
  kanji: "届ける",
  optimized_sent_index: "985",
  optimized_voc_index: "817",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "410",
  frequency: "127",
  furigana: "持[も]つ",
  kana: "もつ",
  kanji: "持つ",
  optimized_sent_index: "656",
  optimized_voc_index: "818",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1172",
  frequency: "6266",
  furigana: "金持[かねも]ち",
  kana: "かねもち",
  kanji: "金持ち",
  optimized_sent_index: "986",
  optimized_voc_index: "819",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1661",
  frequency: ``,
  furigana: "持[も]って 行[い]く",
  kana: "もっていく",
  kanji: "持って行く",
  optimized_sent_index: "660",
  optimized_voc_index: "820",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1134",
  frequency: "740",
  furigana: "なかなか",
  kana: "なかなか",
  kanji: "なかなか",
  optimized_sent_index: "653",
  optimized_voc_index: "821",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1742",
  frequency: ``,
  furigana: "持[も]って 来[く]る",
  kana: "もってくる",
  kanji: "持って来る",
  optimized_sent_index: "661",
  optimized_voc_index: "822",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "867",
  frequency: "552",
  furigana: "打[う]つ",
  kana: "うつ",
  kanji: "打つ",
  optimized_sent_index: "782",
  optimized_voc_index: "823",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1115",
  frequency: "1175",
  furigana: "投[な]げる",
  kana: "なげる",
  kanji: "投げる",
  optimized_sent_index: "663",
  optimized_voc_index: "824",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "523",
  frequency: "727",
  furigana: "生[う]まれる",
  kana: "うまれる",
  kanji: "生まれる",
  optimized_sent_index: "1503",
  optimized_voc_index: "825",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1136",
  frequency: "5342",
  furigana: "プール",
  kana: "プール",
  kanji: "プール",
  optimized_sent_index: "592",
  optimized_voc_index: "826",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1040",
  frequency: "2660",
  furigana: "生[う]む",
  kana: "うむ",
  kanji: "生む",
  optimized_sent_index: "1902",
  optimized_voc_index: "827",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "460",
  frequency: "399",
  furigana: "女性[じょせい]",
  kana: "じょせい",
  kanji: "女性",
  optimized_sent_index: "664",
  optimized_voc_index: "828",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "499",
  frequency: "5976",
  furigana: "生産[せいさん]",
  kana: "せいさん",
  kanji: "生産",
  optimized_sent_index: "665",
  optimized_voc_index: "829",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1829",
  frequency: "14977",
  furigana: "お 土産[みやげ]",
  kana: "おみやげ",
  kanji: "お土産",
  optimized_sent_index: "1790",
  optimized_voc_index: "830",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1139",
  frequency: "4075",
  furigana: "ホーム",
  kana: "ホーム",
  kanji: "ホーム",
  optimized_sent_index: "522",
  optimized_voc_index: "831",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "446",
  frequency: "490",
  furigana: "生活[せいかつ]",
  kana: "せいかつ",
  kanji: "生活",
  optimized_sent_index: "821",
  optimized_voc_index: "832",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "757",
  frequency: "1247",
  furigana: "生徒[せいと]",
  kana: "せいと",
  kanji: "生徒",
  optimized_sent_index: "667",
  optimized_voc_index: "833",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "879",
  frequency: "2869",
  furigana: "中学[ちゅうがく]",
  kana: "ちゅうがく",
  kanji: "中学",
  optimized_sent_index: "935",
  optimized_voc_index: "834",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "930",
  frequency: "6150",
  furigana: "入学[にゅうがく]",
  kana: "にゅうがく",
  kanji: "入学",
  optimized_sent_index: "917",
  optimized_voc_index: "835",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1150",
  frequency: "2666",
  furigana: "エレベーター",
  kana: "エレベーター",
  kanji: "エレベーター",
  optimized_sent_index: "760",
  optimized_voc_index: "836",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "957",
  frequency: "4906",
  furigana: "中学生[ちゅうがくせい]",
  kana: "ちゅうがくせい",
  kanji: "中学生",
  optimized_sent_index: "936",
  optimized_voc_index: "837",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1015",
  frequency: "4979",
  furigana: "小学生[しょうがくせい]",
  kana: "しょうがくせい",
  kanji: "小学生",
  optimized_sent_index: "938",
  optimized_voc_index: "838",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1144",
  frequency: "9058",
  furigana: "見学[けんがく]",
  kana: "けんがく",
  kanji: "見学",
  optimized_sent_index: "670",
  optimized_voc_index: "839",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1188",
  frequency: "17566",
  furigana: "通学[つうがく]",
  kana: "つうがく",
  kanji: "通学",
  optimized_sent_index: "671",
  optimized_voc_index: "840",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1151",
  frequency: "3038",
  furigana: "メモ",
  kana: "メモ",
  kanji: "メモ",
  optimized_sent_index: "648",
  optimized_voc_index: "841",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "764",
  frequency: "2023",
  furigana: "高校[こうこう]",
  kana: "こうこう",
  kanji: "高校",
  optimized_sent_index: "916",
  optimized_voc_index: "842",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "813",
  frequency: "2630",
  furigana: "小学校[しょうがっこう]",
  kana: "しょうがっこう",
  kanji: "小学校",
  optimized_sent_index: "674",
  optimized_voc_index: "843",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "996",
  frequency: "8357",
  furigana: "中学校[ちゅうがっこう]",
  kana: "ちゅうがっこう",
  kanji: "中学校",
  optimized_sent_index: "937",
  optimized_voc_index: "844",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1030",
  frequency: "5552",
  furigana: "校長[こうちょう]",
  kana: "こうちょう",
  kanji: "校長",
  optimized_sent_index: "676",
  optimized_voc_index: "845",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1155",
  frequency: "2140",
  furigana: "パン",
  kana: "パン",
  kanji: "パン",
  optimized_sent_index: "482",
  optimized_voc_index: "846",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1673",
  frequency: "69165",
  furigana: "休校[きゅうこう]",
  kana: "きゅうこう",
  kanji: "休校",
  optimized_sent_index: "677",
  optimized_voc_index: "847",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1027",
  frequency: "1777",
  furigana: "教会[きょうかい]",
  kana: "きょうかい",
  kanji: "教会",
  optimized_sent_index: "1032",
  optimized_voc_index: "848",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "672",
  frequency: "2316",
  furigana: "教育[きょういく]",
  kana: "きょういく",
  kanji: "教育",
  optimized_sent_index: "956",
  optimized_voc_index: "849",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "839",
  frequency: "2615",
  furigana: "育[そだ]てる",
  kana: "そだてる",
  kanji: "育てる",
  optimized_sent_index: "966",
  optimized_voc_index: "850",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1156",
  frequency: ``,
  furigana: "びっくりする",
  kana: "びっくりする",
  kanji: "びっくりする",
  optimized_sent_index: "817",
  optimized_voc_index: "851",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1016",
  frequency: "2362",
  furigana: "育[そだ]つ",
  kana: "そだつ",
  kanji: "育つ",
  optimized_sent_index: "681",
  optimized_voc_index: "852",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "542",
  frequency: "4944",
  furigana: "制度[せいど]",
  kana: "せいど",
  kanji: "制度",
  optimized_sent_index: "788",
  optimized_voc_index: "853",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1066",
  frequency: "137227",
  furigana: "強[つよ]さ",
  kana: "つよさ",
  kanji: "強さ",
  optimized_sent_index: "1680",
  optimized_voc_index: "854",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "674",
  frequency: "6077",
  furigana: "取引[とりひき]",
  kana: "とりひき",
  kanji: "取引",
  optimized_sent_index: "685",
  optimized_voc_index: "855",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1164",
  frequency: "2842",
  furigana: "ズボン",
  kana: "ズボン",
  kanji: "ズボン",
  optimized_sent_index: "1295",
  optimized_voc_index: "856",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1584",
  frequency: "8516",
  furigana: "引[ひ]き 出[だ]し",
  kana: "ひきだし",
  kanji: "引き出し",
  optimized_sent_index: "1810",
  optimized_voc_index: "857",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1256",
  frequency: "2269",
  furigana: "押[お]さえる",
  kana: "おさえる",
  kanji: "押さえる",
  optimized_sent_index: "687",
  optimized_voc_index: "858",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1501",
  frequency: "16739",
  furigana: "押[お]し 入[い]れ",
  kana: "おしいれ",
  kanji: "押し入れ",
  optimized_sent_index: "1809",
  optimized_voc_index: "859",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1065",
  frequency: "2943",
  furigana: "練習[れんしゅう]",
  kana: "れんしゅう",
  kanji: "練習",
  optimized_sent_index: "931",
  optimized_voc_index: "860",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1171",
  frequency: "9827",
  furigana: "おもちゃ",
  kana: "おもちゃ",
  kanji: "おもちゃ",
  optimized_sent_index: "1040",
  optimized_voc_index: "861",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1191",
  frequency: "4760",
  furigana: "習[なら]う",
  kana: "ならう",
  kanji: "習う",
  optimized_sent_index: "989",
  optimized_voc_index: "862",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "993",
  frequency: "1694",
  furigana: "慣[な]れる",
  kana: "なれる",
  kanji: "慣れる",
  optimized_sent_index: "689",
  optimized_voc_index: "863",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1114",
  frequency: "2807",
  furigana: "習慣[しゅうかん]",
  kana: "しゅうかん",
  kanji: "習慣",
  optimized_sent_index: "690",
  optimized_voc_index: "864",
  partOfSpeech: "None"
}, {

  alt_spelling: {},
  core_index: "423",
  frequency: "1054",
  furigana: "研究[けんきゅう]",
  kana: "けんきゅう",
  kanji: "研究",
  optimized_sent_index: "1317",
  optimized_voc_index: "865",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1174",
  frequency: "11670",
  furigana: "グラム",
  kana: "グラム",
  kanji: "グラム",
  optimized_sent_index: "555",
  optimized_voc_index: "866",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "976",
  frequency: "3940",
  furigana: "試験[しけん]",
  kana: "しけん",
  kanji: "試験",
  optimized_sent_index: "1865",
  optimized_voc_index: "867",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "401",
  frequency: "314",
  furigana: "問題[もんだい]",
  kana: "もんだい",
  kanji: "問題",
  optimized_sent_index: "692",
  optimized_voc_index: "868",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "666",
  frequency: "815",
  furigana: "簡単[かんたん]",
  kana: "かんたん",
  kanji: "簡単",
  optimized_sent_index: "697",
  optimized_voc_index: "869",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "762",
  frequency: "2303",
  furigana: "複雑[ふくざつ]",
  kana: "ふくざつ",
  kanji: "複雑",
  optimized_sent_index: "698",
  optimized_voc_index: "870",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1175",
  frequency: "1564",
  furigana: "コーヒー",
  kana: "コーヒー",
  kanji: "コーヒー",
  optimized_sent_index: "481",
  optimized_voc_index: "871",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "807",
  frequency: "3255",
  furigana: "数字[すうじ]",
  kana: "すうじ",
  kanji: "数字",
  optimized_sent_index: "1455",
  optimized_voc_index: "872",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "929",
  frequency: "7234",
  furigana: "数学[すうがく]",
  kana: "すうがく",
  kanji: "数学",
  optimized_sent_index: "921",
  optimized_voc_index: "873",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1017",
  frequency: "2881",
  furigana: "数[かぞ]える",
  kana: "かぞえる",
  kanji: "数える",
  optimized_sent_index: "701",
  optimized_voc_index: "874",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "492",
  frequency: "1493",
  furigana: "今回[こんかい]",
  kana: "こんかい",
  kanji: "今回",
  optimized_sent_index: "1643",
  optimized_voc_index: "875",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1178",
  frequency: "4453",
  furigana: "テント",
  kana: "テント",
  kanji: "テント",
  optimized_sent_index: "1691",
  optimized_voc_index: "876",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "763",
  frequency: "1168",
  furigana: "回[まわ]る",
  kana: "まわる",
  kanji: "回る",
  optimized_sent_index: "1310",
  optimized_voc_index: "877",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1023",
  frequency: "1951",
  furigana: "回[まわ]す",
  kana: "まわす",
  kanji: "回す",
  optimized_sent_index: "702",
  optimized_voc_index: "878",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "641",
  frequency: "2009",
  furigana: "個人[こじん]",
  kana: "こじん",
  kanji: "個人",
  optimized_sent_index: "1101",
  optimized_voc_index: "879",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "647",
  frequency: "2423",
  furigana: "担当[たんとう]",
  kana: "たんとう",
  kanji: "担当",
  optimized_sent_index: "703",
  optimized_voc_index: "880",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1179",
  frequency: "3106",
  furigana: "ボート",
  kana: "ボート",
  kanji: "ボート",
  optimized_sent_index: "1269",
  optimized_voc_index: "881",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "683",
  frequency: "1596",
  furigana: "当[あ]たる",
  kana: "あたる",
  kanji: "当たる",
  optimized_sent_index: "1193",
  optimized_voc_index: "882",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "713",
  frequency: "666",
  furigana: "当時[とうじ]",
  kana: "とうじ",
  kanji: "当時",
  optimized_sent_index: "958",
  optimized_voc_index: "883",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1956",
  frequency: "816",
  furigana: "本当[ほんとう]",
  kana: "ほんとう",
  kanji: "本当",
  optimized_sent_index: "704",
  optimized_voc_index: "884",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "664",
  frequency: "575",
  furigana: "当然[とうぜん]",
  kana: "とうぜん",
  kanji: "当然",
  optimized_sent_index: "1494",
  optimized_voc_index: "885",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1181",
  frequency: "3363",
  furigana: "ボール",
  kana: "ボール",
  kanji: "ボール",
  optimized_sent_index: "987",
  optimized_voc_index: "886",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1305",
  frequency: "1352",
  furigana: "全然[ぜんぜん]",
  kana: "ぜんぜん",
  kanji: "全然",
  optimized_sent_index: "834",
  optimized_voc_index: "887",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "429",
  frequency: "839",
  furigana: "方法[ほうほう]",
  kana: "ほうほう",
  kanji: "方法",
  optimized_sent_index: "705",
  optimized_voc_index: "888",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "824",
  frequency: "4409",
  furigana: "法律[ほうりつ]",
  kana: "ほうりつ",
  kanji: "法律",
  optimized_sent_index: "706",
  optimized_voc_index: "889",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "978",
  frequency: "6828",
  furigana: "規則[きそく]",
  kana: "きそく",
  kanji: "規則",
  optimized_sent_index: "1326",
  optimized_voc_index: "890",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1182",
  frequency: "12098",
  furigana: "オートバイ",
  kana: "オートバイ",
  kanji: "オートバイ",
  optimized_sent_index: "988",
  optimized_voc_index: "891",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "601",
  frequency: "1144",
  furigana: "経験[けいけん]",
  kana: "けいけん",
  kanji: "経験",
  optimized_sent_index: "707",
  optimized_voc_index: "892",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "769",
  frequency: "1779",
  furigana: "経[た]つ",
  kana: "たつ",
  kanji: "経つ",
  optimized_sent_index: "708",
  optimized_voc_index: "893",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "444",
  frequency: "3852",
  furigana: "経済[けいざい]",
  kana: "けいざい",
  kanji: "経済",
  optimized_sent_index: "709",
  optimized_voc_index: "894",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "567",
  frequency: "3235",
  furigana: "経営[けいえい]",
  kana: "けいえい",
  kanji: "経営",
  optimized_sent_index: "1515",
  optimized_voc_index: "895",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1195",
  frequency: "430",
  furigana: "ひどい",
  kana: "ひどい",
  kanji: "ひどい",
  optimized_sent_index: "1979",
  optimized_voc_index: "896",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "559",
  frequency: "5970",
  furigana: "株[かぶ]",
  kana: "かぶ",
  kanji: "株",
  optimized_sent_index: "789",
  optimized_voc_index: "897",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "405",
  frequency: "4239",
  furigana: "企業[きぎょう]",
  kana: "きぎょう",
  kanji: "企業",
  optimized_sent_index: "942",
  optimized_voc_index: "898",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "495",
  frequency: "1575",
  furigana: "作業[さぎょう]",
  kana: "さぎょう",
  kanji: "作業",
  optimized_sent_index: "714",
  optimized_voc_index: "899",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "621",
  frequency: "6813",
  furigana: "産業[さんぎょう]",
  kana: "さんぎょう",
  kanji: "産業",
  optimized_sent_index: "1075",
  optimized_voc_index: "900",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1211",
  frequency: "118",
  furigana: "あなた",
  kana: "あなた",
  kanji: "あなた",
  optimized_sent_index: "420",
  optimized_voc_index: "901",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "868",
  frequency: "10336",
  furigana: "工業[こうぎょう]",
  kana: "こうぎょう",
  kanji: "工業",
  optimized_sent_index: "710",
  optimized_voc_index: "902",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1129",
  frequency: "13385",
  furigana: "商業[しょうぎょう]",
  kana: "しょうぎょう",
  kanji: "商業",
  optimized_sent_index: "1729",
  optimized_voc_index: "903",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "408",
  frequency: "1441",
  furigana: "利用[りよう]",
  kana: "りよう",
  kanji: "利用",
  optimized_sent_index: "875",
  optimized_voc_index: "904",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1157",
  frequency: "5306",
  furigana: "便利[べんり]",
  kana: "べんり",
  kanji: "便利",
  optimized_sent_index: "711",
  optimized_voc_index: "905",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1219",
  frequency: "3204",
  furigana: "スイッチ",
  kana: "スイッチ",
  kanji: "スイッチ",
  optimized_sent_index: "993",
  optimized_voc_index: "906",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "501",
  frequency: "1885",
  furigana: "技術[ぎじゅつ]",
  kana: "ぎじゅつ",
  kanji: "技術",
  optimized_sent_index: "1153",
  optimized_voc_index: "907",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "784",
  frequency: "3449",
  furigana: "手術[しゅじゅつ]",
  kana: "しゅじゅつ",
  kanji: "手術",
  optimized_sent_index: "1605",
  optimized_voc_index: "908",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "742",
  frequency: "7057",
  furigana: "製造[せいぞう]",
  kana: "せいぞう",
  kanji: "製造",
  optimized_sent_index: "712",
  optimized_voc_index: "909",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "806",
  frequency: "996",
  furigana: "必[かなら]ず",
  kana: "かならず",
  kanji: "必ず",
  optimized_sent_index: "764",
  optimized_voc_index: "910",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1224",
  frequency: "5492",
  furigana: "プレゼント",
  kana: "プレゼント",
  kanji: "プレゼント",
  optimized_sent_index: "1526",
  optimized_voc_index: "911",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "404",
  frequency: "279",
  furigana: "必要[ひつよう]",
  kana: "ひつよう",
  kanji: "必要",
  optimized_sent_index: "713",
  optimized_voc_index: "912",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "482",
  frequency: "1582",
  furigana: "重要[じゅうよう]",
  kana: "じゅうよう",
  kanji: "重要",
  optimized_sent_index: "849",
  optimized_voc_index: "913",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "624",
  frequency: "1746",
  furigana: "要求[ようきゅう]",
  kana: "ようきゅう",
  kanji: "要求",
  optimized_sent_index: "951",
  optimized_voc_index: "914",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1737",
  frequency: "30129",
  furigana: "目覚[めざ]まし 時計[どけい]",
  kana: "めざましどけい",
  kanji: "目覚まし時計",
  optimized_sent_index: "1663",
  optimized_voc_index: "915",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1226",
  frequency: ``,
  furigana: "いつでも",
  kana: "いつでも",
  kanji: "いつでも",
  optimized_sent_index: "409",
  optimized_voc_index: "916",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "575",
  frequency: "2399",
  furigana: "計算[けいさん]",
  kana: "けいさん",
  kanji: "計算",
  optimized_sent_index: "863",
  optimized_voc_index: "917",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1734",
  frequency: "55415",
  furigana: "引[ひ]き 算[ざん]",
  kana: "ひきざん",
  kanji: "引き算",
  optimized_sent_index: "933",
  optimized_voc_index: "918",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1746",
  frequency: "51834",
  furigana: "足[た]し 算[ざん]",
  kana: "たしざん",
  kanji: "足し算",
  optimized_sent_index: "934",
  optimized_voc_index: "919",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1545",
  frequency: "9611",
  furigana: "交差点[こうさてん]",
  kana: "こうさてん",
  kanji: "交差点",
  optimized_sent_index: "859",
  optimized_voc_index: "920",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1230",
  frequency: "13046",
  furigana: "テニス",
  kana: "テニス",
  kanji: "テニス",
  optimized_sent_index: "994",
  optimized_voc_index: "921",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1085",
  frequency: "2520",
  furigana: "割[わ]る",
  kana: "わる",
  kanji: "割る",
  optimized_sent_index: "1608",
  optimized_voc_index: "922",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1349",
  frequency: "3400",
  furigana: "割[わ]れる",
  kana: "われる",
  kanji: "割れる",
  optimized_sent_index: "1275",
  optimized_voc_index: "923",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1812",
  frequency: "84451",
  furigana: "割[わ]り 算[ざん]",
  kana: "わりざん",
  kanji: "割り算",
  optimized_sent_index: "718",
  optimized_voc_index: "924",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "593",
  frequency: "394",
  furigana: "残[のこ]る",
  kana: "のこる",
  kanji: "残る",
  optimized_sent_index: "719",
  optimized_voc_index: "925",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1236",
  frequency: "338",
  furigana: "こちら",
  kana: "こちら",
  kanji: "こちら",
  optimized_sent_index: "1434",
  optimized_voc_index: "926",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "670",
  frequency: "629",
  furigana: "残[のこ]す",
  kana: "のこす",
  kanji: "残す",
  optimized_sent_index: "954",
  optimized_voc_index: "927",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "995",
  frequency: "659",
  furigana: "返[かえ]す",
  kana: "かえす",
  kanji: "返す",
  optimized_sent_index: "876",
  optimized_voc_index: "928",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1953",
  frequency: "741",
  furigana: "返事[へんじ]",
  kana: "へんじ",
  kanji: "返事",
  optimized_sent_index: "810",
  optimized_voc_index: "929",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "850",
  frequency: "1195",
  furigana: "借[か]りる",
  kana: "かりる",
  kanji: "借りる",
  optimized_sent_index: "968",
  optimized_voc_index: "930",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1238",
  frequency: "2770",
  furigana: "ボタン",
  kana: "ボタン",
  kanji: "ボタン",
  optimized_sent_index: "686",
  optimized_voc_index: "931",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1104",
  frequency: "1689",
  furigana: "貸[か]す",
  kana: "かす",
  kanji: "貸す",
  optimized_sent_index: "982",
  optimized_voc_index: "932",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1406",
  frequency: "46186",
  furigana: "貸[か]し 出[だ]す",
  kana: "かしだす",
  kanji: "貸し出す",
  optimized_sent_index: "721",
  optimized_voc_index: "933",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1267",
  frequency: "11078",
  furigana: "申[もう]し 込[こ]む",
  kana: "もうしこむ",
  kanji: "申し込む",
  optimized_sent_index: "997",
  optimized_voc_index: "934",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "488",
  frequency: "1188",
  furigana: "期待[きたい]",
  kana: "きたい",
  kanji: "期待",
  optimized_sent_index: "724",
  optimized_voc_index: "935",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1241",
  frequency: "772",
  furigana: "おかしい",
  kana: "おかしい",
  kanji: "おかしい",
  optimized_sent_index: "995",
  optimized_voc_index: "936",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "693",
  frequency: "4667",
  furigana: "期間[きかん]",
  kana: "きかん",
  kanji: "期間",
  optimized_sent_index: "725",
  optimized_voc_index: "937",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "741",
  frequency: "1651",
  furigana: "時期[じき]",
  kana: "じき",
  kanji: "時期",
  optimized_sent_index: "726",
  optimized_voc_index: "938",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "731",
  frequency: "1594",
  furigana: "限[かぎ]る",
  kana: "かぎる",
  kanji: "限る",
  optimized_sent_index: "727",
  optimized_voc_index: "939",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "804",
  frequency: "857",
  furigana: "急[いそ]ぐ",
  kana: "いそぐ",
  kanji: "急ぐ",
  optimized_sent_index: "728",
  optimized_voc_index: "940",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1243",
  frequency: "2811",
  furigana: "コート",
  kana: "コート",
  kanji: "コート",
  optimized_sent_index: "610",
  optimized_voc_index: "941",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "964",
  frequency: "59483",
  furigana: "急[きゅう]に",
  kana: "きゅうに",
  kanji: "急に",
  optimized_sent_index: "729",
  optimized_voc_index: "942",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "988",
  frequency: "525",
  furigana: "急[きゅう]",
  kana: "きゅう",
  kanji: "急",
  optimized_sent_index: "1686",
  optimized_voc_index: "943",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1544",
  frequency: "8803",
  furigana: "急行[きゅうこう]",
  kana: "きゅうこう",
  kanji: "急行",
  optimized_sent_index: "730",
  optimized_voc_index: "944",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "974",
  frequency: "1211",
  furigana: "切[き]れる",
  kana: "きれる",
  kanji: "切れる",
  optimized_sent_index: "732",
  optimized_voc_index: "945",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1245",
  frequency: "6153",
  furigana: "ドラマ",
  kana: "ドラマ",
  kanji: "ドラマ",
  optimized_sent_index: "493",
  optimized_voc_index: "946",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1352",
  frequency: "15403",
  furigana: "切手[きって]",
  kana: "きって",
  kanji: "切手",
  optimized_sent_index: "735",
  optimized_voc_index: "947",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1500",
  frequency: "39733",
  furigana: "売[う]り 切[き]れる",
  kana: "うりきれる",
  kanji: "売り切れる",
  optimized_sent_index: "853",
  optimized_voc_index: "948",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1727",
  frequency: "59086",
  furigana: "売[う]り 切[き]れ",
  kana: "うりきれ",
  kanji: "売り切れ",
  optimized_sent_index: "737",
  optimized_voc_index: "949",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1886",
  frequency: "1813",
  furigana: "大切[たいせつ]",
  kana: "たいせつ",
  kanji: "大切",
  optimized_sent_index: "1380",
  optimized_voc_index: "950",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1246",
  frequency: "30430",
  furigana: "ビザ",
  kana: "ビザ",
  kanji: "ビザ",
  optimized_sent_index: "672",
  optimized_voc_index: "951",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1281",
  frequency: "6392",
  furigana: "切符[きっぷ]",
  kana: "きっぷ",
  kanji: "切符",
  optimized_sent_index: "738",
  optimized_voc_index: "952",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1602",
  frequency: "36062",
  furigana: "入場券[にゅうじょうけん]",
  kana: "にゅうじょうけん",
  kanji: "入場券",
  optimized_sent_index: "739",
  optimized_voc_index: "953",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1054",
  frequency: "10267",
  furigana: "家賃[やちん]",
  kana: "やちん",
  kanji: "家賃",
  optimized_sent_index: "740",
  optimized_voc_index: "954",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "740",
  frequency: "511",
  furigana: "時代[じだい]",
  kana: "じだい",
  kanji: "時代",
  optimized_sent_index: "741",
  optimized_voc_index: "955",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1250",
  frequency: "1126",
  furigana: "ポケット",
  kana: "ポケット",
  kanji: "ポケット",
  optimized_sent_index: "1805",
  optimized_voc_index: "956",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "876",
  frequency: "4884",
  furigana: "代[か]わる",
  kana: "かわる",
  kanji: "代わる",
  optimized_sent_index: "1648",
  optimized_voc_index: "957",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1543",
  frequency: "12705",
  furigana: "代[か]える",
  kana: "かえる",
  kanji: "代える",
  optimized_sent_index: "774",
  optimized_voc_index: "958",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1977",
  frequency: "578",
  furigana: "指[ゆび]",
  kana: "ゆび",
  kanji: "指",
  optimized_sent_index: "1302",
  optimized_voc_index: "959",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "554",
  frequency: "2533",
  furigana: "決定[けってい]",
  kana: "けってい",
  kanji: "決定",
  optimized_sent_index: "1051",
  optimized_voc_index: "960",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1253",
  frequency: "1478",
  furigana: "そろそろ",
  kana: "そろそろ",
  kanji: "そろそろ",
  optimized_sent_index: "791",
  optimized_voc_index: "961",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "694",
  frequency: "5562",
  furigana: "一定[いってい]",
  kana: "いってい",
  kanji: "一定",
  optimized_sent_index: "1141",
  optimized_voc_index: "962",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1630",
  frequency: "40273",
  furigana: "定期券[ていきけん]",
  kana: "ていきけん",
  kanji: "定期券",
  optimized_sent_index: "742",
  optimized_voc_index: "963",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "496",
  frequency: "1755",
  furigana: "予定[よてい]",
  kana: "よてい",
  kanji: "予定",
  optimized_sent_index: "743",
  optimized_voc_index: "964",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1437",
  frequency: "21544",
  furigana: "天気予報[てんきよほう]",
  kana: "てんきよほう",
  kanji: "天気予報",
  optimized_sent_index: "744",
  optimized_voc_index: "965",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1254",
  frequency: "18026",
  furigana: "ぶどう",
  kana: "ぶどう",
  kanji: "ぶどう",
  optimized_sent_index: "433",
  optimized_voc_index: "966",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1738",
  frequency: "38466",
  furigana: "予習[よしゅう]",
  kana: "よしゅう",
  kanji: "予習",
  optimized_sent_index: "746",
  optimized_voc_index: "967",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1050",
  frequency: "7011",
  furigana: "予約[よやく]",
  kana: "よやく",
  kanji: "予約",
  optimized_sent_index: "748",
  optimized_voc_index: "968",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "884",
  frequency: "773",
  furigana: "約束[やくそく]",
  kana: "やくそく",
  kanji: "約束",
  optimized_sent_index: "1394",
  optimized_voc_index: "969",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "478",
  frequency: "501",
  furigana: "変[か]わる",
  kana: "かわる",
  kanji: "変わる",
  optimized_sent_index: "1045",
  optimized_voc_index: "970",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1261",
  frequency: "4581",
  furigana: "めったに",
  kana: "めったに",
  kanji: "めったに",
  optimized_sent_index: "1495",
  optimized_voc_index: "971",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "825",
  frequency: "874",
  furigana: "大変[たいへん]",
  kana: "たいへん",
  kanji: "大変",
  optimized_sent_index: "1399",
  optimized_voc_index: "972",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1439",
  frequency: "947",
  furigana: "変[へん]",
  kana: "へん",
  kanji: "変",
  optimized_sent_index: "819",
  optimized_voc_index: "973",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "504",
  frequency: "1225",
  furigana: "変化[へんか]",
  kana: "へんか",
  kanji: "変化",
  optimized_sent_index: "750",
  optimized_voc_index: "974",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "580",
  frequency: "6294",
  furigana: "強化[きょうか]",
  kana: "きょうか",
  kanji: "強化",
  optimized_sent_index: "751",
  optimized_voc_index: "975",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1270",
  frequency: "4731",
  furigana: "クリスマス",
  kana: "クリスマス",
  kanji: "クリスマス",
  optimized_sent_index: "470",
  optimized_voc_index: "976",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "660",
  frequency: "1900",
  furigana: "文化[ぶんか]",
  kana: "ぶんか",
  kanji: "文化",
  optimized_sent_index: "752",
  optimized_voc_index: "977",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "442",
  frequency: "2527",
  furigana: "増[ふ]える",
  kana: "ふえる",
  kanji: "増える",
  optimized_sent_index: "753",
  optimized_voc_index: "978",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "838",
  frequency: "9722",
  furigana: "増[ふ]やす",
  kana: "ふやす",
  kanji: "増やす",
  optimized_sent_index: "1373",
  optimized_voc_index: "979",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "509",
  frequency: "3009",
  furigana: "減[へ]る",
  kana: "へる",
  kanji: "減る",
  optimized_sent_index: "755",
  optimized_voc_index: "980",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1271",
  frequency: "4862",
  furigana: "ネクタイ",
  kana: "ネクタイ",
  kanji: "ネクタイ",
  optimized_sent_index: "893",
  optimized_voc_index: "981",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "882",
  frequency: "10589",
  furigana: "減[へ]らす",
  kana: "へらす",
  kanji: "減らす",
  optimized_sent_index: "756",
  optimized_voc_index: "982",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1453",
  frequency: "17056",
  furigana: "乗[の]り 物[もの]",
  kana: "のりもの",
  kanji: "乗り物",
  optimized_sent_index: "1041",
  optimized_voc_index: "983",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "998",
  frequency: "684",
  furigana: "降[お]りる",
  kana: "おりる",
  kanji: "降りる",
  optimized_sent_index: "776",
  optimized_voc_index: "984",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1624",
  frequency: "5955",
  furigana: "降[お]ろす",
  kana: "おろす",
  kanji: "降ろす",
  optimized_sent_index: "1014",
  optimized_voc_index: "985",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1277",
  frequency: "23019",
  furigana: "バイオリン",
  kana: "バイオリン",
  kanji: "バイオリン",
  optimized_sent_index: "998",
  optimized_voc_index: "986",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1949",
  frequency: "1417",
  furigana: "降[ふ]る",
  kana: "ふる",
  kanji: "降る",
  optimized_sent_index: "1676",
  optimized_voc_index: "987",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "877",
  frequency: "775",
  furigana: "着[つ]く",
  kana: "つく",
  kanji: "着く",
  optimized_sent_index: "1950",
  optimized_voc_index: "988",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1202",
  frequency: "1986",
  furigana: "着物[きもの]",
  kana: "きもの",
  kanji: "着物",
  optimized_sent_index: "991",
  optimized_voc_index: "989",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1359",
  frequency: "3959",
  furigana: "下着[したぎ]",
  kana: "したぎ",
  kanji: "下着",
  optimized_sent_index: "1281",
  optimized_voc_index: "990",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1278",
  frequency: "12345",
  furigana: "パスポート",
  kana: "パスポート",
  kanji: "パスポート",
  optimized_sent_index: "494",
  optimized_voc_index: "991",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1481",
  frequency: "3819",
  furigana: "上着[うわぎ]",
  kana: "うわぎ",
  kanji: "上着",
  optimized_sent_index: "770",
  optimized_voc_index: "992",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1539",
  frequency: "4907",
  furigana: "着[き]せる",
  kana: "きせる",
  kanji: "着せる",
  optimized_sent_index: "1524",
  optimized_voc_index: "993",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1451",
  frequency: "1729",
  furigana: "脱[ぬ]ぐ",
  kana: "ぬぐ",
  kanji: "脱ぐ",
  optimized_sent_index: "1960",
  optimized_voc_index: "994",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "570",
  frequency: "1221",
  furigana: "立場[たちば]",
  kana: "たちば",
  kanji: "立場",
  optimized_sent_index: "1039",
  optimized_voc_index: "995",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1279",
  frequency: "3208",
  furigana: "バッグ",
  kana: "バッグ",
  kanji: "バッグ",
  optimized_sent_index: "657",
  optimized_voc_index: "996",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "585",
  frequency: "2282",
  furigana: "目立[めだ]つ",
  kana: "めだつ",
  kanji: "目立つ",
  optimized_sent_index: "1886",
  optimized_voc_index: "997",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "858",
  frequency: "507",
  furigana: "立[た]てる",
  kana: "たてる",
  kanji: "立てる",
  optimized_sent_index: "969",
  optimized_voc_index: "998",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1455",
  frequency: "2642",
  furigana: "役[やく]に 立[た]つ",
  kana: "やくにたつ",
  kanji: "役に立つ",
  optimized_sent_index: "771",
  optimized_voc_index: "999",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "771",
  frequency: "4382",
  furigana: "出席[しゅっせき]",
  kana: "しゅっせき",
  kanji: "出席",
  optimized_sent_index: "1056",
  optimized_voc_index: "1000",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1282",
  frequency: "6578",
  furigana: "ゴム",
  kana: "ゴム",
  kanji: "ゴム",
  optimized_sent_index: "1477",
  optimized_voc_index: "1001",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "889",
  frequency: "734",
  furigana: "席[せき]",
  kana: "せき",
  kanji: "席",
  optimized_sent_index: "772",
  optimized_voc_index: "1002",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1218",
  frequency: "16576",
  furigana: "欠席[けっせき]",
  kana: "けっせき",
  kanji: "欠席",
  optimized_sent_index: "1918",
  optimized_voc_index: "1003",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1299",
  frequency: "7913",
  furigana: "次男[じなん]",
  kana: "じなん",
  kanji: "次男",
  optimized_sent_index: "777",
  optimized_voc_index: "1004",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1316",
  frequency: "19481",
  furigana: "次女[じじょ]",
  kana: "じじょ",
  kanji: "次女",
  optimized_sent_index: "778",
  optimized_voc_index: "1005",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1291",
  frequency: "9606",
  furigana: "ギター",
  kana: "ギター",
  kanji: "ギター",
  optimized_sent_index: "1561",
  optimized_voc_index: "1006",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "761",
  frequency: "628",
  furigana: "運[はこ]ぶ",
  kana: "はこぶ",
  kanji: "運ぶ",
  optimized_sent_index: "780",
  optimized_voc_index: "1007",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "847",
  frequency: "2801",
  furigana: "運転[うんてん]",
  kana: "うんてん",
  kanji: "運転",
  optimized_sent_index: "891",
  optimized_voc_index: "1008",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1026",
  frequency: "2184",
  furigana: "運転手[うんてんしゅ]",
  kana: "うんてんしゅ",
  kanji: "運転手",
  optimized_sent_index: "978",
  optimized_voc_index: "1009",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1555",
  frequency: "5733",
  furigana: "転[ころ]ぶ",
  kana: "ころぶ",
  kanji: "転ぶ",
  optimized_sent_index: "1923",
  optimized_voc_index: "1010",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1300",
  frequency: "6879",
  furigana: "セーター",
  kana: "セーター",
  kanji: "セーター",
  optimized_sent_index: "1292",
  optimized_voc_index: "1011",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "800",
  frequency: "1667",
  furigana: "移[うつ]る",
  kana: "うつる",
  kanji: "移る",
  optimized_sent_index: "963",
  optimized_voc_index: "1012",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "872",
  frequency: "2081",
  furigana: "移[うつ]す",
  kana: "うつす",
  kanji: "移す",
  optimized_sent_index: "1845",
  optimized_voc_index: "1013",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "466",
  frequency: "876",
  furigana: "動[うご]き",
  kana: "うごき",
  kanji: "動き",
  optimized_sent_index: "1167",
  optimized_voc_index: "1014",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "608",
  frequency: "2340",
  furigana: "運動[うんどう]",
  kana: "うんどう",
  kanji: "運動",
  optimized_sent_index: "950",
  optimized_voc_index: "1015",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1306",
  frequency: "582",
  furigana: "やっぱり",
  kana: "やっぱり",
  kanji: "やっぱり",
  optimized_sent_index: "874",
  optimized_voc_index: "1016",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "692",
  frequency: "2105",
  furigana: "活動[かつどう]",
  kana: "かつどう",
  kanji: "活動",
  optimized_sent_index: "1547",
  optimized_voc_index: "1017",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "793",
  frequency: "1609",
  furigana: "動物[どうぶつ]",
  kana: "どうぶつ",
  kanji: "動物",
  optimized_sent_index: "784",
  optimized_voc_index: "1018",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "886",
  frequency: "866",
  furigana: "動[うご]かす",
  kana: "うごかす",
  kanji: "動かす",
  optimized_sent_index: "1108",
  optimized_voc_index: "1019",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1998",
  frequency: "15511",
  furigana: "不動産屋[ふどうさんや]",
  kana: "ふどうさんや",
  kanji: "不動産屋",
  optimized_sent_index: "896",
  optimized_voc_index: "1020",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1311",
  frequency: "2528",
  furigana: "カーテン",
  kana: "カーテン",
  kanji: "カーテン",
  optimized_sent_index: "465",
  optimized_voc_index: "1021",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "845",
  frequency: "32424",
  furigana: "早[はや]く",
  kana: "はやく",
  kanji: "早く",
  optimized_sent_index: "785",
  optimized_voc_index: "1022",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1593",
  frequency: "5779",
  furigana: "早口[はやくち]",
  kana: "はやくち",
  kanji: "早口",
  optimized_sent_index: "1012",
  optimized_voc_index: "1023",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1222",
  frequency: "117780",
  furigana: "速[はや]さ",
  kana: "はやさ",
  kanji: "速さ",
  optimized_sent_index: "1572",
  optimized_voc_index: "1024",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1732",
  frequency: "27275",
  furigana: "速達[そくたつ]",
  kana: "そくたつ",
  kanji: "速達",
  optimized_sent_index: "786",
  optimized_voc_index: "1025",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1313",
  frequency: "2826",
  furigana: "シャツ",
  kana: "シャツ",
  kanji: "シャツ",
  optimized_sent_index: "716",
  optimized_voc_index: "1026",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "797",
  frequency: "2114",
  furigana: "遅[おく]れる",
  kana: "おくれる",
  kanji: "遅れる",
  optimized_sent_index: "962",
  optimized_voc_index: "1027",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "513",
  frequency: "2235",
  furigana: "開始[かいし]",
  kana: "かいし",
  kanji: "開始",
  optimized_sent_index: "787",
  optimized_voc_index: "1028",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1996",
  frequency: ``,
  furigana: "始[はじ]めに",
  kana: "はじめに",
  kanji: "始めに",
  optimized_sent_index: "793",
  optimized_voc_index: "1029",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "407",
  frequency: "820",
  furigana: "現在[げんざい]",
  kana: "げんざい",
  kanji: "現在",
  optimized_sent_index: "796",
  optimized_voc_index: "1030",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1314",
  frequency: "1646",
  furigana: "ナイフ",
  kana: "ナイフ",
  kanji: "ナイフ",
  optimized_sent_index: "734",
  optimized_voc_index: "1031",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "464",
  frequency: "3495",
  furigana: "実現[じつげん]",
  kana: "じつげん",
  kanji: "実現",
  optimized_sent_index: "1531",
  optimized_voc_index: "1032",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "512",
  frequency: "9793",
  furigana: "実施[じっし]",
  kana: "じっし",
  kanji: "実施",
  optimized_sent_index: "797",
  optimized_voc_index: "1033",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "553",
  frequency: "498",
  furigana: "事実[じじつ]",
  kana: "じじつ",
  kanji: "事実",
  optimized_sent_index: "798",
  optimized_voc_index: "1034",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "629",
  frequency: "2682",
  furigana: "実行[じっこう]",
  kana: "じっこう",
  kanji: "実行",
  optimized_sent_index: "952",
  optimized_voc_index: "1035",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1318",
  frequency: "6262",
  furigana: "バイク",
  kana: "バイク",
  kanji: "バイク",
  optimized_sent_index: "924",
  optimized_voc_index: "1036",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "720",
  frequency: "3041",
  furigana: "実験[じっけん]",
  kana: "じっけん",
  kanji: "実験",
  optimized_sent_index: "1654",
  optimized_voc_index: "1037",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "704",
  frequency: "3666",
  furigana: "通過[つうか]",
  kana: "つうか",
  kanji: "通過",
  optimized_sent_index: "799",
  optimized_voc_index: "1038",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "818",
  frequency: "583",
  furigana: "過[す]ぎる",
  kana: "すぎる",
  kanji: "過ぎる",
  optimized_sent_index: "800",
  optimized_voc_index: "1039",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1942",
  frequency: "14591",
  furigana: "昼過[ひるす]ぎ",
  kana: "ひるすぎ",
  kanji: "昼過ぎ",
  optimized_sent_index: "1029",
  optimized_voc_index: "1040",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1320",
  frequency: "1230",
  furigana: "いつか",
  kana: "いつか",
  kanji: "いつか",
  optimized_sent_index: "1846",
  optimized_voc_index: "1041",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "656",
  frequency: "1307",
  furigana: "過去[かこ]",
  kana: "かこ",
  kanji: "過去",
  optimized_sent_index: "801",
  optimized_voc_index: "1042",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "402",
  frequency: "2798",
  furigana: "開発[かいはつ]",
  kana: "かいはつ",
  kanji: "開発",
  optimized_sent_index: "1060",
  optimized_voc_index: "1043",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "591",
  frequency: "2318",
  furigana: "発生[はっせい]",
  kana: "はっせい",
  kanji: "発生",
  optimized_sent_index: "802",
  optimized_voc_index: "1044",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "686",
  frequency: "3129",
  furigana: "発言[はつげん]",
  kana: "はつげん",
  kanji: "発言",
  optimized_sent_index: "1055",
  optimized_voc_index: "1045",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1321",
  frequency: "9985",
  furigana: "オレンジ",
  kana: "オレンジ",
  kanji: "オレンジ",
  optimized_sent_index: "434",
  optimized_voc_index: "1046",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "712",
  frequency: "751",
  furigana: "発見[はっけん]",
  kana: "はっけん",
  kanji: "発見",
  optimized_sent_index: "1306",
  optimized_voc_index: "1047",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "885",
  frequency: "1476",
  furigana: "出発[しゅっぱつ]",
  kana: "しゅっぱつ",
  kanji: "出発",
  optimized_sent_index: "803",
  optimized_voc_index: "1048",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1512",
  frequency: "11086",
  furigana: "発車[はっしゃ]",
  kana: "はっしゃ",
  kanji: "発車",
  optimized_sent_index: "804",
  optimized_voc_index: "1049",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "412",
  frequency: "1893",
  furigana: "発表[はっぴょう]",
  kana: "はっぴょう",
  kanji: "発表",
  optimized_sent_index: "940",
  optimized_voc_index: "1050",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1323",
  frequency: "2923",
  furigana: "きつい",
  kana: "きつい",
  kanji: "きつい",
  optimized_sent_index: "414",
  optimized_voc_index: "1051",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "494",
  frequency: "1537",
  furigana: "表現[ひょうげん]",
  kana: "ひょうげん",
  kanji: "表現",
  optimized_sent_index: "1038",
  optimized_voc_index: "1052",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "557",
  frequency: "2635",
  furigana: "代表[だいひょう]",
  kana: "だいひょう",
  kanji: "代表",
  optimized_sent_index: "948",
  optimized_voc_index: "1053",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1830",
  frequency: "1410",
  furigana: "表[おもて]",
  kana: "おもて",
  kanji: "表",
  optimized_sent_index: "806",
  optimized_voc_index: "1054",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1941",
  frequency: "1410",
  furigana: "表[ひょう]",
  kana: "ひょう",
  kanji: "表",
  optimized_sent_index: "807",
  optimized_voc_index: "1055",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1333",
  frequency: "495",
  furigana: "さっき",
  kana: "さっき",
  kanji: "さっき",
  optimized_sent_index: "1165",
  optimized_voc_index: "1056",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "782",
  frequency: "509",
  furigana: "手紙[てがみ]",
  kana: "てがみ",
  kanji: "手紙",
  optimized_sent_index: "808",
  optimized_voc_index: "1057",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1009",
  frequency: "778",
  furigana: "絵[え]",
  kana: "え",
  kanji: "絵",
  optimized_sent_index: "830",
  optimized_voc_index: "1058",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "841",
  frequency: "1688",
  furigana: "雑誌[ざっし]",
  kana: "ざっし",
  kanji: "雑誌",
  optimized_sent_index: "812",
  optimized_voc_index: "1059",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "708",
  frequency: "186",
  furigana: "音[おと]",
  kana: "おと",
  kanji: "音",
  optimized_sent_index: "814",
  optimized_voc_index: "1060",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1335",
  frequency: "14868",
  furigana: "テキスト",
  kana: "テキスト",
  kanji: "テキスト",
  optimized_sent_index: "498",
  optimized_voc_index: "1061",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1995",
  frequency: "186",
  furigana: "音[おと]",
  kana: "おと",
  kanji: "音",
  optimized_sent_index: "820",
  optimized_voc_index: "1062",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "810",
  frequency: "1568",
  furigana: "音楽[おんがく]",
  kana: "おんがく",
  kanji: "音楽",
  optimized_sent_index: "822",
  optimized_voc_index: "1063",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1021",
  frequency: "1435",
  furigana: "薬[くすり]",
  kana: "くすり",
  kanji: "薬",
  optimized_sent_index: "824",
  optimized_voc_index: "1064",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "880",
  frequency: "805",
  furigana: "歌[うた]",
  kana: "うた",
  kanji: "歌",
  optimized_sent_index: "825",
  optimized_voc_index: "1065",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1336",
  frequency: "12519",
  furigana: "ビニール 袋[ぶくろ]",
  kana: "ビニールぶくろ",
  kanji: "ビニール袋",
  optimized_sent_index: "1800",
  optimized_voc_index: "1066",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1833",
  frequency: "7818",
  furigana: "歌手[かしゅ]",
  kana: "かしゅ",
  kanji: "歌手",
  optimized_sent_index: "826",
  optimized_voc_index: "1067",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1618",
  frequency: ``,
  furigana: "欲[ほ]しがる",
  kana: "ほしがる",
  kanji: "欲しがる",
  optimized_sent_index: "828",
  optimized_voc_index: "1068",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "440",
  frequency: "1033",
  furigana: "計画[けいかく]",
  kana: "けいかく",
  kanji: "計画",
  optimized_sent_index: "943",
  optimized_voc_index: "1069",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "755",
  frequency: "1190",
  furigana: "映画[えいが]",
  kana: "えいが",
  kanji: "映画",
  optimized_sent_index: "960",
  optimized_voc_index: "1070",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1337",
  frequency: "16818",
  furigana: "りんご",
  kana: "りんご",
  kanji: "りんご",
  optimized_sent_index: "401",
  optimized_voc_index: "1071",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1013",
  frequency: "893",
  furigana: "面白[おもしろ]い",
  kana: "おもしろい",
  kanji: "面白い",
  optimized_sent_index: "833",
  optimized_voc_index: "1072",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1303",
  frequency: "6756",
  furigana: "写[うつ]る",
  kana: "うつる",
  kanji: "写る",
  optimized_sent_index: "836",
  optimized_voc_index: "1073",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1458",
  frequency: "7101",
  furigana: "写[うつ]す",
  kana: "うつす",
  kanji: "写す",
  optimized_sent_index: "1066",
  optimized_voc_index: "1074",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "569",
  frequency: "661",
  furigana: "写真[しゃしん]",
  kana: "しゃしん",
  kanji: "写真",
  optimized_sent_index: "837",
  optimized_voc_index: "1075",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1338",
  frequency: "10074",
  furigana: "アルバム",
  kana: "アルバム",
  kanji: "アルバム",
  optimized_sent_index: "1000",
  optimized_voc_index: "1076",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1200",
  frequency: "2982",
  furigana: "真[ま]っ 赤[か]",
  kana: "まっか",
  kanji: "真っ赤",
  optimized_sent_index: "1195",
  optimized_voc_index: "1077",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1266",
  frequency: "2957",
  furigana: "真面目[まじめ]",
  kana: "まじめ",
  kanji: "真面目",
  optimized_sent_index: "996",
  optimized_voc_index: "1078",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1369",
  frequency: "3705",
  furigana: "真[ま]ん 中[なか]",
  kana: "まんなか",
  kanji: "真ん中",
  optimized_sent_index: "838",
  optimized_voc_index: "1079",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1403",
  frequency: "5829",
  furigana: "真[ま]っ 白[しろ]",
  kana: "まっしろ",
  kanji: "真っ白",
  optimized_sent_index: "839",
  optimized_voc_index: "1080",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1343",
  frequency: "3343",
  furigana: "スカート",
  kana: "スカート",
  kanji: "スカート",
  optimized_sent_index: "1001",
  optimized_voc_index: "1081",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1498",
  frequency: "6567",
  furigana: "真[ま]っ 暗[くら]",
  kana: "まっくら",
  kanji: "真っ暗",
  optimized_sent_index: "840",
  optimized_voc_index: "1082",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1550",
  frequency: "8388",
  furigana: "真[ま]っ 黒[くろ]",
  kana: "まっくろ",
  kanji: "真っ黒",
  optimized_sent_index: "841",
  optimized_voc_index: "1083",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1707",
  frequency: "10542",
  furigana: "真[ま]っ 青[さお]",
  kana: "まっさお",
  kanji: "真っ青",
  optimized_sent_index: "842",
  optimized_voc_index: "1084",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1623",
  frequency: "2864",
  furigana: "色々[いろいろ]",
  kana: "いろいろ",
  kanji: "色々",
  optimized_sent_index: "1013",
  optimized_voc_index: "1085",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1345",
  frequency: "5393",
  furigana: "ペン",
  kana: "ペン",
  kanji: "ペン",
  optimized_sent_index: "720",
  optimized_voc_index: "1086",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1135",
  frequency: "1645",
  furigana: "人形[にんぎょう]",
  kana: "にんぎょう",
  kanji: "人形",
  optimized_sent_index: "983",
  optimized_voc_index: "1087",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1836",
  frequency: "519",
  furigana: "形[かたち]",
  kana: "かたち",
  kanji: "形",
  optimized_sent_index: "1991",
  optimized_voc_index: "1088",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "743",
  frequency: "4392",
  furigana: "大型[おおがた]",
  kana: "おおがた",
  kanji: "大型",
  optimized_sent_index: "848",
  optimized_voc_index: "1089",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "579",
  frequency: "2226",
  furigana: "種類[しゅるい]",
  kana: "しゅるい",
  kanji: "種類",
  optimized_sent_index: "850",
  optimized_voc_index: "1090",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1351",
  frequency: "4842",
  furigana: "おしゃべり",
  kana: "おしゃべり",
  kanji: "おしゃべり",
  optimized_sent_index: "918",
  optimized_voc_index: "1091",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "637",
  frequency: "1455",
  furigana: "直[なお]す",
  kana: "なおす",
  kanji: "直す",
  optimized_sent_index: "851",
  optimized_voc_index: "1092",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1479",
  frequency: "8147",
  furigana: "真[ま]っ 直[す]ぐ",
  kana: "まっすぐ",
  kanji: "真っ直ぐ",
  optimized_sent_index: "852",
  optimized_voc_index: "1093",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "658",
  frequency: "1491",
  furigana: "直接[ちょくせつ]",
  kana: "ちょくせつ",
  kanji: "直接",
  optimized_sent_index: "1144",
  optimized_voc_index: "1094",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1597",
  frequency: "1358",
  furigana: "角[かど]",
  kana: "かど",
  kanji: "角",
  optimized_sent_index: "860",
  optimized_voc_index: "1095",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1357",
  frequency: "450",
  furigana: "きっと",
  kana: "きっと",
  kanji: "きっと",
  optimized_sent_index: "761",
  optimized_voc_index: "1096",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1599",
  frequency: "10769",
  furigana: "三角[さんかく]",
  kana: "さんかく",
  kanji: "三角",
  optimized_sent_index: "854",
  optimized_voc_index: "1097",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1627",
  frequency: "12324",
  furigana: "四角[しかく]",
  kana: "しかく",
  kanji: "四角",
  optimized_sent_index: "855",
  optimized_voc_index: "1098",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1628",
  frequency: "6802",
  furigana: "四角[しかく]い",
  kana: "しかくい",
  kanji: "四角い",
  optimized_sent_index: "856",
  optimized_voc_index: "1099",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1982",
  frequency: "40997",
  furigana: "四[よ]つ 角[かど]",
  kana: "よつかど",
  kanji: "四つ角",
  optimized_sent_index: "861",
  optimized_voc_index: "1100",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1375",
  frequency: "7660",
  furigana: "メニュー",
  kana: "メニュー",
  kanji: "メニュー",
  optimized_sent_index: "1367",
  optimized_voc_index: "1101",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "999",
  frequency: "1557",
  furigana: "曲[きょく]",
  kana: "きょく",
  kanji: "曲",
  optimized_sent_index: "857",
  optimized_voc_index: "1102",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1355",
  frequency: "4689",
  furigana: "曲[ま]げる",
  kana: "まげる",
  kanji: "曲げる",
  optimized_sent_index: "858",
  optimized_voc_index: "1103",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1986",
  frequency: "18547",
  furigana: "曲[ま]がり 角[かど]",
  kana: "まがりかど",
  kanji: "曲がり角",
  optimized_sent_index: "862",
  optimized_voc_index: "1104",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "681",
  frequency: "1311",
  furigana: "同様[どうよう]",
  kana: "どうよう",
  kanji: "同様",
  optimized_sent_index: "957",
  optimized_voc_index: "1105",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1376",
  frequency: "12533",
  furigana: "アイスクリーム",
  kana: "アイスクリーム",
  kanji: "アイスクリーム",
  optimized_sent_index: "928",
  optimized_voc_index: "1106",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1210",
  frequency: "1209",
  furigana: "間違[まちが]い",
  kana: "まちがい",
  kanji: "間違い",
  optimized_sent_index: "865",
  optimized_voc_index: "1107",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1374",
  frequency: "4641",
  furigana: "間違[まちが]える",
  kana: "まちがえる",
  kanji: "間違える",
  optimized_sent_index: "866",
  optimized_voc_index: "1108",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1444",
  frequency: "2749",
  furigana: "間違[まちが]う",
  kana: "まちがう",
  kanji: "間違う",
  optimized_sent_index: "867",
  optimized_voc_index: "1109",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1994",
  frequency: ``,
  furigana: "似[に]ている",
  kana: "にている",
  kanji: "似ている",
  optimized_sent_index: "905",
  optimized_voc_index: "1110",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1377",
  frequency: "14089",
  furigana: "おしゃれ",
  kana: "おしゃれ",
  kanji: "おしゃれ",
  optimized_sent_index: "428",
  optimized_voc_index: "1111",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "430",
  frequency: "251",
  furigana: "以上[いじょう]",
  kana: "いじょう",
  kanji: "以上",
  optimized_sent_index: "1122",
  optimized_voc_index: "1112",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "809",
  frequency: "1589",
  furigana: "旅行[りょこう]",
  kana: "りょこう",
  kanji: "旅行",
  optimized_sent_index: "964",
  optimized_voc_index: "1113",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "896",
  frequency: "9270",
  furigana: "大使館[たいしかん]",
  kana: "たいしかん",
  kanji: "大使館",
  optimized_sent_index: "1212",
  optimized_voc_index: "1114",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1153",
  frequency: "3321",
  furigana: "旅館[りょかん]",
  kana: "りょかん",
  kanji: "旅館",
  optimized_sent_index: "878",
  optimized_voc_index: "1115",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1380",
  frequency: "8151",
  furigana: "ジュース",
  kana: "ジュース",
  kanji: "ジュース",
  optimized_sent_index: "1461",
  optimized_voc_index: "1116",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1212",
  frequency: "8950",
  furigana: "映画館[えいがかん]",
  kana: "えいがかん",
  kanji: "映画館",
  optimized_sent_index: "992",
  optimized_voc_index: "1117",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1334",
  frequency: "10531",
  furigana: "宿題[しゅくだい]",
  kana: "しゅくだい",
  kanji: "宿題",
  optimized_sent_index: "1371",
  optimized_voc_index: "1118",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1832",
  frequency: "8536",
  furigana: "泊[と]める",
  kana: "とめる",
  kanji: "泊める",
  optimized_sent_index: "879",
  optimized_voc_index: "1119",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1000",
  frequency: "1465",
  furigana: "遊[あそ]び",
  kana: "あそび",
  kanji: "遊び",
  optimized_sent_index: "1149",
  optimized_voc_index: "1120",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1382",
  frequency: "5177",
  furigana: "ゼロ",
  kana: "ゼロ",
  kanji: "ゼロ",
  optimized_sent_index: "528",
  optimized_voc_index: "1121",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1239",
  frequency: "5191",
  furigana: "洋服[ようふく]",
  kana: "ようふく",
  kanji: "洋服",
  optimized_sent_index: "883",
  optimized_voc_index: "1122",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "902",
  frequency: "1753",
  furigana: "教室[きょうしつ]",
  kana: "きょうしつ",
  kanji: "教室",
  optimized_sent_index: "884",
  optimized_voc_index: "1123",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1601",
  frequency: "12187",
  furigana: "図書室[としょしつ]",
  kana: "としょしつ",
  kanji: "図書室",
  optimized_sent_index: "885",
  optimized_voc_index: "1124",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "830",
  frequency: "402",
  furigana: "窓[まど]",
  kana: "まど",
  kanji: "窓",
  optimized_sent_index: "887",
  optimized_voc_index: "1125",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1394",
  frequency: "5643",
  furigana: "ピンク",
  kana: "ピンク",
  kanji: "ピンク",
  optimized_sent_index: "932",
  optimized_voc_index: "1126",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1070",
  frequency: "1979",
  furigana: "親[した]しい",
  kana: "したしい",
  kanji: "親しい",
  optimized_sent_index: "1599",
  optimized_voc_index: "1127",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1186",
  frequency: "2274",
  furigana: "親切[しんせつ]",
  kana: "しんせつ",
  kanji: "親切",
  optimized_sent_index: "907",
  optimized_voc_index: "1128",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1785",
  frequency: "36704",
  furigana: "不親切[ふしんせつ]",
  kana: "ふしんせつ",
  kanji: "不親切",
  optimized_sent_index: "910",
  optimized_voc_index: "1129",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "520",
  frequency: "950",
  furigana: "家族[かぞく]",
  kana: "かぞく",
  kanji: "家族",
  optimized_sent_index: "912",
  optimized_voc_index: "1130",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1395",
  frequency: "1817",
  furigana: "グラス",
  kana: "グラス",
  kanji: "グラス",
  optimized_sent_index: "1387",
  optimized_voc_index: "1131",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1681",
  frequency: "15524",
  furigana: "万歳[ばんざい]",
  kana: "ばんざい",
  kanji: "万歳",
  optimized_sent_index: "913",
  optimized_voc_index: "1132",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1719",
  frequency: "7804",
  furigana: "二十歳[はたち]",
  kana: "はたち",
  kanji: "二十歳",
  optimized_sent_index: "920",
  optimized_voc_index: "1133",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1919",
  frequency: "3156",
  furigana: "姉[ねえ]さん",
  kana: "ねえさん",
  kanji: "姉さん",
  optimized_sent_index: "915",
  optimized_voc_index: "1134",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1910",
  frequency: "2047",
  furigana: "兄[にい]さん",
  kana: "にいさん",
  kanji: "兄さん",
  optimized_sent_index: "927",
  optimized_voc_index: "1135",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1398",
  frequency: "5272",
  furigana: "ダンス",
  kana: "ダンス",
  kanji: "ダンス",
  optimized_sent_index: "1004",
  optimized_voc_index: "1136",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "990",
  frequency: "1987",
  furigana: "兄弟[きょうだい]",
  kana: "きょうだい",
  kanji: "兄弟",
  optimized_sent_index: "977",
  optimized_voc_index: "1137",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "600",
  frequency: "6661",
  furigana: "業者[ぎょうしゃ]",
  kana: "ぎょうしゃ",
  kanji: "業者",
  optimized_sent_index: "1478",
  optimized_voc_index: "1138",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "677",
  frequency: "1129",
  furigana: "若者[わかもの]",
  kana: "わかもの",
  kanji: "若者",
  optimized_sent_index: "941",
  optimized_voc_index: "1139",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "724",
  frequency: "252",
  furigana: "彼[かれ]ら",
  kana: "かれら",
  kanji: "彼ら",
  optimized_sent_index: "1185",
  optimized_voc_index: "1140",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1404",
  frequency: "7426",
  furigana: "おじ",
  kana: "おじ",
  kanji: "おじ",
  optimized_sent_index: "1215",
  optimized_voc_index: "1141",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "750",
  frequency: "10918",
  furigana: "結合[けつごう]",
  kana: "けつごう",
  kanji: "結合",
  optimized_sent_index: "1030",
  optimized_voc_index: "1142",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "561",
  frequency: "676",
  furigana: "結果[けっか]",
  kana: "けっか",
  kanji: "結果",
  optimized_sent_index: "1034",
  optimized_voc_index: "1143",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1209",
  frequency: "6752",
  furigana: "果物[くだもの]",
  kana: "くだもの",
  kanji: "果物",
  optimized_sent_index: "1035",
  optimized_voc_index: "1144",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "679",
  frequency: "9029",
  furigana: "課題[かだい]",
  kana: "かだい",
  kanji: "課題",
  optimized_sent_index: "1036",
  optimized_voc_index: "1145",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1407",
  frequency: "9770",
  furigana: "サッカー",
  kana: "サッカー",
  kanji: "サッカー",
  optimized_sent_index: "1186",
  optimized_voc_index: "1146",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1048",
  frequency: "3703",
  furigana: "課[か]",
  kana: "か",
  kanji: "課",
  optimized_sent_index: "1037",
  optimized_voc_index: "1147",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "698",
  frequency: "2160",
  furigana: "効果[こうか]",
  kana: "こうか",
  kanji: "効果",
  optimized_sent_index: "1606",
  optimized_voc_index: "1148",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "675",
  frequency: "2290",
  furigana: "自動車[じどうしゃ]",
  kana: "じどうしゃ",
  kanji: "自動車",
  optimized_sent_index: "1235",
  optimized_voc_index: "1149",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "751",
  frequency: "900",
  furigana: "自然[しぜん]",
  kana: "しぜん",
  kanji: "自然",
  optimized_sent_index: "1391",
  optimized_voc_index: "1150",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1415",
  frequency: "6052",
  furigana: "スープ",
  kana: "スープ",
  kanji: "スープ",
  optimized_sent_index: "902",
  optimized_voc_index: "1151",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "828",
  frequency: "900",
  furigana: "自然[しぜん]",
  kana: "しぜん",
  kanji: "自然",
  optimized_sent_index: "1393",
  optimized_voc_index: "1152",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1714",
  frequency: "37115",
  furigana: "自習[じしゅう]",
  kana: "じしゅう",
  kanji: "自習",
  optimized_sent_index: "1042",
  optimized_voc_index: "1153",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "527",
  frequency: "449",
  furigana: "理由[りゆう]",
  kana: "りゆう",
  kanji: "理由",
  optimized_sent_index: "1043",
  optimized_voc_index: "1154",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "550",
  frequency: "1106",
  furigana: "自由[じゆう]",
  kana: "じゆう",
  kanji: "自由",
  optimized_sent_index: "1044",
  optimized_voc_index: "1155",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1416",
  frequency: "11957",
  furigana: "バナナ",
  kana: "バナナ",
  kanji: "バナナ",
  optimized_sent_index: "471",
  optimized_voc_index: "1156",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "916",
  frequency: "382",
  furigana: "信[しん]じる",
  kana: "しんじる",
  kanji: "信じる",
  optimized_sent_index: "1046",
  optimized_voc_index: "1157",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1008",
  frequency: "5322",
  furigana: "信号[しんごう]",
  kana: "しんごう",
  kanji: "信号",
  optimized_sent_index: "1047",
  optimized_voc_index: "1158",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "932",
  frequency: "622",
  furigana: "頼[たの]む",
  kana: "たのむ",
  kanji: "頼む",
  optimized_sent_index: "1049",
  optimized_voc_index: "1159",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "625",
  frequency: "2941",
  furigana: "市民[しみん]",
  kana: "しみん",
  kanji: "市民",
  optimized_sent_index: "1050",
  optimized_voc_index: "1160",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1417",
  frequency: "2360",
  furigana: "うるさい",
  kana: "うるさい",
  kanji: "うるさい",
  optimized_sent_index: "818",
  optimized_voc_index: "1161",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "695",
  frequency: "4085",
  furigana: "住民[じゅうみん]",
  kana: "じゅうみん",
  kanji: "住民",
  optimized_sent_index: "1548",
  optimized_voc_index: "1162",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1696",
  frequency: "765",
  furigana: "主人[しゅじん]",
  kana: "しゅじん",
  kanji: "主人",
  optimized_sent_index: "1396",
  optimized_voc_index: "1163",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "605",
  frequency: "6208",
  furigana: "議員[ぎいん]",
  kana: "ぎいん",
  kanji: "議員",
  optimized_sent_index: "1053",
  optimized_voc_index: "1164",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "616",
  frequency: "2093",
  furigana: "会議[かいぎ]",
  kana: "かいぎ",
  kanji: "会議",
  optimized_sent_index: "1054",
  optimized_voc_index: "1165",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1419",
  frequency: "6540",
  furigana: "パトカー",
  kana: "パトカー",
  kanji: "パトカー",
  optimized_sent_index: "1412",
  optimized_voc_index: "1166",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "428",
  frequency: "20459",
  furigana: "対[たい]する",
  kana: "たいする",
  kanji: "対する",
  optimized_sent_index: "1064",
  optimized_voc_index: "1167",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "526",
  frequency: "4889",
  furigana: "対立[たいりつ]",
  kana: "たいりつ",
  kanji: "対立",
  optimized_sent_index: "1061",
  optimized_voc_index: "1168",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "676",
  frequency: "1316",
  furigana: "反対[はんたい]",
  kana: "はんたい",
  kanji: "反対",
  optimized_sent_index: "1063",
  optimized_voc_index: "1169",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1853",
  frequency: "1495",
  furigana: "答[こた]え",
  kana: "こたえ",
  kanji: "答え",
  optimized_sent_index: "1067",
  optimized_voc_index: "1170",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1420",
  frequency: "17475",
  furigana: "ハンバーガー",
  kana: "ハンバーガー",
  kanji: "ハンバーガー",
  optimized_sent_index: "483",
  optimized_voc_index: "1171",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "719",
  frequency: "1079",
  furigana: "特[とく]に",
  kana: "とくに",
  kanji: "特に",
  optimized_sent_index: "1068",
  optimized_voc_index: "1172",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1613",
  frequency: "13359",
  furigana: "特急[とっきゅう]",
  kana: "とっきゅう",
  kanji: "特急",
  optimized_sent_index: "1069",
  optimized_voc_index: "1173",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "901",
  frequency: "1369",
  furigana: "特別[とくべつ]",
  kana: "とくべつ",
  kanji: "特別",
  optimized_sent_index: "1070",
  optimized_voc_index: "1174",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1196",
  frequency: "10218",
  furigana: "別々[べつべつ]",
  kana: "べつべつ",
  kanji: "別々",
  optimized_sent_index: "1071",
  optimized_voc_index: "1175",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1422",
  frequency: "23097",
  furigana: "エスカレーター",
  kana: "エスカレーター",
  kanji: "エスカレーター",
  optimized_sent_index: "583",
  optimized_voc_index: "1176",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1363",
  frequency: "1296",
  furigana: "別[わか]れる",
  kana: "わかれる",
  kanji: "別れる",
  optimized_sent_index: "1072",
  optimized_voc_index: "1177",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "491",
  frequency: "2154",
  furigana: "一般[いっぱん]",
  kana: "いっぱん",
  kanji: "一般",
  optimized_sent_index: "1073",
  optimized_voc_index: "1178",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "549",
  frequency: "912",
  furigana: "目的[もくてき]",
  kana: "もくてき",
  kanji: "目的",
  optimized_sent_index: "1074",
  optimized_voc_index: "1179",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "777",
  frequency: "782",
  furigana: "普通[ふつう]",
  kana: "ふつう",
  kanji: "普通",
  optimized_sent_index: "1076",
  optimized_voc_index: "1180",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1424",
  frequency: "4354",
  furigana: "タオル",
  kana: "タオル",
  kanji: "タオル",
  optimized_sent_index: "1196",
  optimized_voc_index: "1181",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "756",
  frequency: "1110",
  furigana: "並[なら]ぶ",
  kana: "ならぶ",
  kanji: "並ぶ",
  optimized_sent_index: "1077",
  optimized_voc_index: "1182",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "933",
  frequency: "2062",
  furigana: "並[なら]べる",
  kana: "ならべる",
  kanji: "並べる",
  optimized_sent_index: "1078",
  optimized_voc_index: "1183",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "795",
  frequency: "2478",
  furigana: "平和[へいわ]",
  kana: "へいわ",
  kanji: "平和",
  optimized_sent_index: "1080",
  optimized_voc_index: "1184",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1546",
  frequency: "17589",
  furigana: "高等学校[こうとうがっこう]",
  kana: "こうとうがっこう",
  kanji: "高等学校",
  optimized_sent_index: "1233",
  optimized_voc_index: "1185",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1428",
  frequency: "10482",
  furigana: "パチンコ",
  kana: "パチンコ",
  kanji: "パチンコ",
  optimized_sent_index: "1005",
  optimized_voc_index: "1186",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "598",
  frequency: "803",
  furigana: "病院[びょういん]",
  kana: "びょういん",
  kanji: "病院",
  optimized_sent_index: "1081",
  optimized_voc_index: "1187",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "837",
  frequency: "3596",
  furigana: "入院[にゅういん]",
  kana: "にゅういん",
  kanji: "入院",
  optimized_sent_index: "1082",
  optimized_voc_index: "1188",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1122",
  frequency: "20286",
  furigana: "大学院[だいがくいん]",
  kana: "だいがくいん",
  kanji: "大学院",
  optimized_sent_index: "1205",
  optimized_voc_index: "1189",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1005",
  frequency: "1191",
  furigana: "医者[いしゃ]",
  kana: "いしゃ",
  kanji: "医者",
  optimized_sent_index: "1169",
  optimized_voc_index: "1190",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1431",
  frequency: "15681",
  furigana: "みかん",
  kana: "みかん",
  kanji: "みかん",
  optimized_sent_index: "1425",
  optimized_voc_index: "1191",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1988",
  frequency: "11768",
  furigana: "お 医者[いしゃ]さん",
  kana: "おいしゃさん",
  kanji: "お医者さん",
  optimized_sent_index: "1083",
  optimized_voc_index: "1192",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1657",
  frequency: "22351",
  furigana: "歯医者[はいしゃ]",
  kana: "はいしゃ",
  kanji: "歯医者",
  optimized_sent_index: "1706",
  optimized_voc_index: "1193",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1733",
  frequency: "1244",
  furigana: "歯[は]",
  kana: "は",
  kanji: "歯",
  optimized_sent_index: "1907",
  optimized_voc_index: "1194",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1755",
  frequency: "27452",
  furigana: "歯[は]ブラシ",
  kana: "はぶらし",
  kanji: "歯ブラシ",
  optimized_sent_index: "1084",
  optimized_voc_index: "1195",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1433",
  frequency: "6636",
  furigana: "ケーキ",
  kana: "ケーキ",
  kanji: "ケーキ",
  optimized_sent_index: "1528",
  optimized_voc_index: "1196",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "883",
  frequency: "3270",
  furigana: "科学[かがく]",
  kana: "かがく",
  kanji: "科学",
  optimized_sent_index: "1203",
  optimized_voc_index: "1197",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "986",
  frequency: "6846",
  furigana: "教科書[きょうかしょ]",
  kana: "きょうかしょ",
  kanji: "教科書",
  optimized_sent_index: "1085",
  optimized_voc_index: "1198",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1358",
  frequency: "23303",
  furigana: "理科[りか]",
  kana: "りか",
  kanji: "理科",
  optimized_sent_index: "1562",
  optimized_voc_index: "1199",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "897",
  frequency: "1903",
  furigana: "亡[な]くなる",
  kana: "なくなる",
  kanji: "亡くなる",
  optimized_sent_index: "1086",
  optimized_voc_index: "1200",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1434",
  frequency: "3624",
  furigana: "コップ",
  kana: "コップ",
  kanji: "コップ",
  optimized_sent_index: "1094",
  optimized_voc_index: "1201",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "970",
  frequency: "1833",
  furigana: "忙[いそが]しい",
  kana: "いそがしい",
  kanji: "忙しい",
  optimized_sent_index: "1658",
  optimized_voc_index: "1202",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1110",
  frequency: "1158",
  furigana: "疲[つか]れる",
  kana: "つかれる",
  kanji: "疲れる",
  optimized_sent_index: "1088",
  optimized_voc_index: "1203",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1298",
  frequency: "25704",
  furigana: "禁煙[きんえん]",
  kana: "きんえん",
  kanji: "禁煙",
  optimized_sent_index: "1090",
  optimized_voc_index: "1204",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1663",
  frequency: "18185",
  furigana: "酔[よ]っ 払[ぱら]い",
  kana: "よっぱらい",
  kanji: "酔っ払い",
  optimized_sent_index: "1091",
  optimized_voc_index: "1205",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1438",
  frequency: "26108",
  furigana: "ナイロン",
  kana: "ナイロン",
  kanji: "ナイロン",
  optimized_sent_index: "1433",
  optimized_voc_index: "1206",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1709",
  frequency: "14272",
  furigana: "酔[よ]っ 払[ぱら]う",
  kana: "よっぱらう",
  kanji: "酔っ払う",
  optimized_sent_index: "1092",
  optimized_voc_index: "1207",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1331",
  frequency: "3246",
  furigana: "危[あぶ]ない",
  kana: "あぶない",
  kanji: "危ない",
  optimized_sent_index: "1095",
  optimized_voc_index: "1208",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "776",
  frequency: "749",
  furigana: "危険[きけん]",
  kana: "きけん",
  kanji: "危険",
  optimized_sent_index: "1549",
  optimized_voc_index: "1209",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "505",
  frequency: "401",
  furigana: "存在[そんざい]",
  kana: "そんざい",
  kanji: "存在",
  optimized_sent_index: "1305",
  optimized_voc_index: "1210",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1447",
  frequency: "2779",
  furigana: "スーツ",
  kana: "スーツ",
  kanji: "スーツ",
  optimized_sent_index: "460",
  optimized_voc_index: "1211",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "655",
  frequency: "3870",
  furigana: "注目[ちゅうもく]",
  kana: "ちゅうもく",
  kanji: "注目",
  optimized_sent_index: "1097",
  optimized_voc_index: "1212",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1053",
  frequency: "2436",
  furigana: "注文[ちゅうもん]",
  kana: "ちゅうもん",
  kanji: "注文",
  optimized_sent_index: "1098",
  optimized_voc_index: "1213",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "439",
  frequency: "270",
  furigana: "意味[いみ]",
  kana: "いみ",
  kanji: "意味",
  optimized_sent_index: "1099",
  optimized_voc_index: "1214",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "581",
  frequency: "1128",
  furigana: "意見[いけん]",
  kana: "いけん",
  kanji: "意見",
  optimized_sent_index: "1100",
  optimized_voc_index: "1215",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1448",
  frequency: "12104",
  furigana: "チケット",
  kana: "チケット",
  kanji: "チケット",
  optimized_sent_index: "1117",
  optimized_voc_index: "1216",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "780",
  frequency: "1111",
  furigana: "注意[ちゅうい]",
  kana: "ちゅうい",
  kanji: "注意",
  optimized_sent_index: "1102",
  optimized_voc_index: "1217",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "822",
  frequency: "972",
  furigana: "用意[ようい]",
  kana: "ようい",
  kanji: "用意",
  optimized_sent_index: "1103",
  optimized_voc_index: "1218",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "992",
  frequency: "1044",
  furigana: "確[たし]か",
  kana: "たしか",
  kanji: "確か",
  optimized_sent_index: "1483",
  optimized_voc_index: "1219",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "700",
  frequency: "1067",
  furigana: "確認[かくにん]",
  kana: "かくにん",
  kanji: "確認",
  optimized_sent_index: "1105",
  optimized_voc_index: "1220",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1449",
  frequency: "7838",
  furigana: "チョコレート",
  kana: "チョコレート",
  kanji: "チョコレート",
  optimized_sent_index: "919",
  optimized_voc_index: "1221",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "422",
  frequency: "3024",
  furigana: "機能[きのう]",
  kana: "きのう",
  kanji: "機能",
  optimized_sent_index: "1106",
  optimized_voc_index: "1222",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1283",
  frequency: "24907",
  furigana: "ジェット 機[き]",
  kana: "ジェットき",
  kanji: "ジェット機",
  optimized_sent_index: "1124",
  optimized_voc_index: "1223",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "654",
  frequency: "1876",
  furigana: "機械[きかい]",
  kana: "きかい",
  kanji: "機械",
  optimized_sent_index: "1258",
  optimized_voc_index: "1224",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "623",
  frequency: "3487",
  furigana: "材料[ざいりょう]",
  kana: "ざいりょう",
  kanji: "材料",
  optimized_sent_index: "1107",
  optimized_voc_index: "1225",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1461",
  frequency: "12830",
  furigana: "チャンネル",
  kana: "チャンネル",
  kanji: "チャンネル",
  optimized_sent_index: "749",
  optimized_voc_index: "1226",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "638",
  frequency: "3130",
  furigana: "具体的[ぐたいてき]",
  kana: "ぐたいてき",
  kanji: "具体的",
  optimized_sent_index: "1445",
  optimized_voc_index: "1227",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "642",
  frequency: "8649",
  furigana: "基[もと]づく",
  kana: "もとづく",
  kanji: "基づく",
  optimized_sent_index: "1109",
  optimized_voc_index: "1228",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "710",
  frequency: "4597",
  furigana: "基本[きほん]",
  kana: "きほん",
  kanji: "基本",
  optimized_sent_index: "1110",
  optimized_voc_index: "1229",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "738",
  frequency: "8750",
  furigana: "基準[きじゅん]",
  kana: "きじゅん",
  kanji: "基準",
  optimized_sent_index: "1357",
  optimized_voc_index: "1230",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1462",
  frequency: "2913",
  furigana: "つまらない",
  kana: "つまらない",
  kanji: "つまらない",
  optimized_sent_index: "1006",
  optimized_voc_index: "1231",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "514",
  frequency: "3331",
  furigana: "備[そな]える",
  kana: "そなえる",
  kanji: "備える",
  optimized_sent_index: "1255",
  optimized_voc_index: "1232",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "785",
  frequency: "1409",
  furigana: "準備[じゅんび]",
  kana: "じゅんび",
  kanji: "準備",
  optimized_sent_index: "1111",
  optimized_voc_index: "1233",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "586",
  frequency: "5842",
  furigana: "設計[せっけい]",
  kana: "せっけい",
  kanji: "設計",
  optimized_sent_index: "1127",
  optimized_voc_index: "1234",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "661",
  frequency: "4241",
  furigana: "施設[しせつ]",
  kana: "しせつ",
  kanji: "施設",
  optimized_sent_index: "1112",
  optimized_voc_index: "1235",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1463",
  frequency: "5926",
  furigana: "マッチ",
  kana: "マッチ",
  kanji: "マッチ",
  optimized_sent_index: "658",
  optimized_voc_index: "1236",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "716",
  frequency: "4379",
  furigana: "設[もう]ける",
  kana: "もうける",
  kanji: "設ける",
  optimized_sent_index: "1653",
  optimized_voc_index: "1237",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "778",
  frequency: "512",
  furigana: "説明[せつめい]",
  kana: "せつめい",
  kanji: "説明",
  optimized_sent_index: "1113",
  optimized_voc_index: "1238",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "909",
  frequency: "953",
  furigana: "小説[しょうせつ]",
  kana: "しょうせつ",
  kanji: "小説",
  optimized_sent_index: "1422",
  optimized_voc_index: "1239",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "635",
  frequency: "9352",
  furigana: "公開[こうかい]",
  kana: "こうかい",
  kanji: "公開",
  optimized_sent_index: "1114",
  optimized_voc_index: "1240",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1464",
  frequency: "9586",
  furigana: "いとこ",
  kana: "いとこ",
  kanji: "いとこ",
  optimized_sent_index: "1221",
  optimized_voc_index: "1241",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "955",
  frequency: "2049",
  furigana: "公園[こうえん]",
  kana: "こうえん",
  kanji: "公園",
  optimized_sent_index: "1115",
  optimized_voc_index: "1242",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1329",
  frequency: "11561",
  furigana: "動物園[どうぶつえん]",
  kana: "どうぶつえん",
  kanji: "動物園",
  optimized_sent_index: "1116",
  optimized_voc_index: "1243",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1167",
  frequency: "5023",
  furigana: "祭[まつ]り",
  kana: "まつり",
  kanji: "祭り",
  optimized_sent_index: "1120",
  optimized_voc_index: "1244",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "604",
  frequency: "5605",
  furigana: "国際[こくさい]",
  kana: "こくさい",
  kanji: "国際",
  optimized_sent_index: "1121",
  optimized_voc_index: "1245",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1468",
  frequency: "8425",
  furigana: "ストーブ",
  kana: "ストーブ",
  kanji: "ストーブ",
  optimized_sent_index: "574",
  optimized_voc_index: "1246",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "663",
  frequency: "785",
  furigana: "実際[じっさい]",
  kana: "じっさい",
  kanji: "実際",
  optimized_sent_index: "1614",
  optimized_voc_index: "1247",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1206",
  frequency: "8743",
  furigana: "飛行場[ひこうじょう]",
  kana: "ひこうじょう",
  kanji: "飛行場",
  optimized_sent_index: "1123",
  optimized_voc_index: "1248",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1675",
  frequency: "53169",
  furigana: "航空便[こうくうびん]",
  kana: "こうくうびん",
  kanji: "航空便",
  optimized_sent_index: "1125",
  optimized_voc_index: "1249",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1947",
  frequency: "58274",
  furigana: "船便[ふなびん]",
  kana: "ふなびん",
  kanji: "船便",
  optimized_sent_index: "1130",
  optimized_voc_index: "1250",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1471",
  frequency: "32520",
  furigana: "ガソリンスタンド",
  kana: "ガソリンスタンド",
  kanji: "ガソリンスタンド",
  optimized_sent_index: "543",
  optimized_voc_index: "1251",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1948",
  frequency: "486",
  furigana: "船[ふね]",
  kana: "ふね",
  kanji: "船",
  optimized_sent_index: "1131",
  optimized_voc_index: "1252",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "802",
  frequency: "3536",
  furigana: "空港[くうこう]",
  kana: "くうこう",
  kanji: "空港",
  optimized_sent_index: "1132",
  optimized_voc_index: "1253",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1964",
  frequency: "2381",
  furigana: "港[みなと]",
  kana: "みなと",
  kanji: "港",
  optimized_sent_index: "1133",
  optimized_voc_index: "1254",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "829",
  frequency: "647",
  furigana: "島[しま]",
  kana: "しま",
  kanji: "島",
  optimized_sent_index: "1134",
  optimized_voc_index: "1255",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1477",
  frequency: "4865",
  furigana: "デート",
  kana: "デート",
  kanji: "デート",
  optimized_sent_index: "1118",
  optimized_voc_index: "1256",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "503",
  frequency: "2541",
  furigana: "完成[かんせい]",
  kana: "かんせい",
  kanji: "完成",
  optimized_sent_index: "1135",
  optimized_voc_index: "1257",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1951",
  frequency: "5643",
  furigana: "平成[へいせい]",
  kana: "へいせい",
  kanji: "平成",
  optimized_sent_index: "1137",
  optimized_voc_index: "1258",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "662",
  frequency: "1347",
  furigana: "成功[せいこう]",
  kana: "せいこう",
  kanji: "成功",
  optimized_sent_index: "1138",
  optimized_voc_index: "1259",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "568",
  frequency: "1393",
  furigana: "原因[げんいん]",
  kana: "げんいん",
  kanji: "原因",
  optimized_sent_index: "1139",
  optimized_voc_index: "1260",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1478",
  frequency: ``,
  furigana: "ふすま",
  kana: "ふすま",
  kanji: "ふすま",
  optimized_sent_index: "459",
  optimized_voc_index: "1261",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "551",
  frequency: "5918",
  furigana: "資金[しきん]",
  kana: "しきん",
  kanji: "資金",
  optimized_sent_index: "1554",
  optimized_voc_index: "1262",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "576",
  frequency: "12673",
  furigana: "投資[とうし]",
  kana: "とうし",
  kanji: "投資",
  optimized_sent_index: "1140",
  optimized_voc_index: "1263",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "639",
  frequency: "1635",
  furigana: "願[ねが]う",
  kana: "ねがう",
  kanji: "願う",
  optimized_sent_index: "1143",
  optimized_voc_index: "1264",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "865",
  frequency: "1534",
  furigana: "正確[せいかく]",
  kana: "せいかく",
  kanji: "正確",
  optimized_sent_index: "1147",
  optimized_voc_index: "1265",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1480",
  frequency: "9813",
  furigana: "レモン",
  kana: "レモン",
  kanji: "レモン",
  optimized_sent_index: "1930",
  optimized_voc_index: "1266",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "873",
  frequency: "1212",
  furigana: "正[ただ]しい",
  kana: "ただしい",
  kanji: "正しい",
  optimized_sent_index: "1148",
  optimized_voc_index: "1267",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1117",
  frequency: "3875",
  furigana: "正月[しょうがつ]",
  kana: "しょうがつ",
  kanji: "正月",
  optimized_sent_index: "1228",
  optimized_voc_index: "1268",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1244",
  frequency: "1492",
  furigana: "正直[しょうじき]",
  kana: "しょうじき",
  kanji: "正直",
  optimized_sent_index: "1150",
  optimized_voc_index: "1269",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "745",
  frequency: "2699",
  furigana: "異[こと]なる",
  kana: "ことなる",
  kanji: "異なる",
  optimized_sent_index: "1151",
  optimized_voc_index: "1270",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1485",
  frequency: "9900",
  furigana: "チーズ",
  kana: "チーズ",
  kanji: "チーズ",
  optimized_sent_index: "736",
  optimized_voc_index: "1271",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "680",
  frequency: "4544",
  furigana: "通常[つうじょう]",
  kana: "つうじょう",
  kanji: "通常",
  optimized_sent_index: "1152",
  optimized_voc_index: "1272",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "796",
  frequency: "1348",
  furigana: "非常[ひじょう]に",
  kana: "ひじょうに",
  kanji: "非常に",
  optimized_sent_index: "1154",
  optimized_voc_index: "1273",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "540",
  frequency: "665",
  furigana: "調[しら]べる",
  kana: "しらべる",
  kanji: "調べる",
  optimized_sent_index: "1207",
  optimized_voc_index: "1274",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "541",
  frequency: "5629",
  furigana: "強調[きょうちょう]",
  kana: "きょうちょう",
  kanji: "強調",
  optimized_sent_index: "1155",
  optimized_voc_index: "1275",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1486",
  frequency: "9406",
  furigana: "ドライブ",
  kana: "ドライブ",
  kanji: "ドライブ",
  optimized_sent_index: "1781",
  optimized_voc_index: "1276",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "944",
  frequency: "3101",
  furigana: "季節[きせつ]",
  kana: "きせつ",
  kanji: "季節",
  optimized_sent_index: "1157",
  optimized_voc_index: "1277",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "476",
  frequency: "1721",
  furigana: "調査[ちょうさ]",
  kana: "ちょうさ",
  kanji: "調査",
  optimized_sent_index: "1158",
  optimized_voc_index: "1278",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "535",
  frequency: "4393",
  furigana: "提供[ていきょう]",
  kana: "ていきょう",
  kanji: "提供",
  optimized_sent_index: "1159",
  optimized_voc_index: "1279",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "648",
  frequency: "3098",
  furigana: "提案[ていあん]",
  kana: "ていあん",
  kanji: "提案",
  optimized_sent_index: "1160",
  optimized_voc_index: "1280",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1488",
  frequency: "32520",
  furigana: "ラケット",
  kana: "ラケット",
  kanji: "ラケット",
  optimized_sent_index: "486",
  optimized_voc_index: "1281",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1092",
  frequency: "1322",
  furigana: "案内[あんない]",
  kana: "あんない",
  kanji: "案内",
  optimized_sent_index: "1161",
  optimized_voc_index: "1282",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "418",
  frequency: "660",
  furigana: "示[しめ]す",
  kana: "しめす",
  kanji: "示す",
  optimized_sent_index: "1677",
  optimized_voc_index: "1283",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1992",
  frequency: ``,
  furigana: "連[つ]れて 行[い]く",
  kana: "つれていく",
  kanji: "連れて行く",
  optimized_sent_index: "1162",
  optimized_voc_index: "1284",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1993",
  frequency: ``,
  furigana: "連[つ]れて 来[く]る",
  kana: "つれてくる",
  kanji: "連れて来る",
  optimized_sent_index: "1163",
  optimized_voc_index: "1285",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1493",
  frequency: "17023",
  furigana: "スチュワーデス",
  kana: "スチュワーデス",
  kanji: "スチュワーデス",
  optimized_sent_index: "1008",
  optimized_voc_index: "1286",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "449",
  frequency: "381",
  furigana: "続[つづ]ける",
  kana: "つづける",
  kanji: "続ける",
  optimized_sent_index: "1164",
  optimized_voc_index: "1287",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "590",
  frequency: "212",
  furigana: "相手[あいて]",
  kana: "あいて",
  kanji: "相手",
  optimized_sent_index: "1517",
  optimized_voc_index: "1288",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "532",
  frequency: "9412",
  furigana: "会談[かいだん]",
  kana: "かいだん",
  kanji: "会談",
  optimized_sent_index: "1612",
  optimized_voc_index: "1289",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "821",
  frequency: "1210",
  furigana: "相談[そうだん]",
  kana: "そうだん",
  kanji: "相談",
  optimized_sent_index: "1168",
  optimized_voc_index: "1290",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1495",
  frequency: "24615",
  furigana: "テープレコーダー",
  kana: "テープレコーダー",
  kanji: "テープレコーダー",
  optimized_sent_index: "1665",
  optimized_voc_index: "1291",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "606",
  frequency: "3073",
  furigana: "記者[きしゃ]",
  kana: "きしゃ",
  kanji: "記者",
  optimized_sent_index: "1170",
  optimized_voc_index: "1292",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "619",
  frequency: "1791",
  furigana: "記録[きろく]",
  kana: "きろく",
  kanji: "記録",
  optimized_sent_index: "1172",
  optimized_voc_index: "1293",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1160",
  frequency: "9032",
  furigana: "録音[ろくおん]",
  kana: "ろくおん",
  kanji: "録音",
  optimized_sent_index: "1200",
  optimized_voc_index: "1294",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1402",
  frequency: "1526",
  furigana: "登[のぼ]る",
  kana: "のぼる",
  kanji: "登る",
  optimized_sent_index: "1539",
  optimized_voc_index: "1295",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1496",
  frequency: ``,
  furigana: "ひげ",
  kana: "ひげ",
  kanji: "ひげ",
  optimized_sent_index: "894",
  optimized_voc_index: "1296",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "455",
  frequency: "72261",
  furigana: "関[かん]する",
  kana: "かんする",
  kanji: "関する",
  optimized_sent_index: "1174",
  optimized_voc_index: "1297",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "747",
  frequency: "5186",
  furigana: "関連[かんれん]",
  kana: "かんれん",
  kanji: "関連",
  optimized_sent_index: "1175",
  optimized_voc_index: "1298",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "448",
  frequency: "366",
  furigana: "関係[かんけい]",
  kana: "かんけい",
  kanji: "関係",
  optimized_sent_index: "1240",
  optimized_voc_index: "1299",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "699",
  frequency: "922",
  furigana: "状況[じょうきょう]",
  kana: "じょうきょう",
  kanji: "状況",
  optimized_sent_index: "1176",
  optimized_voc_index: "1300",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1503",
  frequency: "8612",
  furigana: "ぐっすり",
  kana: "ぐっすり",
  kanji: "ぐっすり",
  optimized_sent_index: "1402",
  optimized_voc_index: "1301",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "456",
  frequency: "668",
  furigana: "状態[じょうたい]",
  kana: "じょうたい",
  kanji: "状態",
  optimized_sent_index: "1177",
  optimized_voc_index: "1302",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "421",
  frequency: "5043",
  furigana: "治[なお]る",
  kana: "なおる",
  kanji: "治る",
  optimized_sent_index: "1178",
  optimized_voc_index: "1303",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "511",
  frequency: "2044",
  furigana: "政治[せいじ]",
  kana: "せいじ",
  kanji: "政治",
  optimized_sent_index: "1179",
  optimized_voc_index: "1304",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1581",
  frequency: "9611",
  furigana: "治[なお]す",
  kana: "なおす",
  kanji: "治す",
  optimized_sent_index: "1920",
  optimized_voc_index: "1305",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1506",
  frequency: "13525",
  furigana: "ソース",
  kana: "ソース",
  kanji: "ソース",
  optimized_sent_index: "1501",
  optimized_voc_index: "1306",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "411",
  frequency: "1855",
  furigana: "政府[せいふ]",
  kana: "せいふ",
  kanji: "政府",
  optimized_sent_index: "1180",
  optimized_voc_index: "1307",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "477",
  frequency: "3997",
  furigana: "党[とう]",
  kana: "とう",
  kanji: "党",
  optimized_sent_index: "1181",
  optimized_voc_index: "1308",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "571",
  frequency: "6606",
  furigana: "対策[たいさく]",
  kana: "たいさく",
  kanji: "対策",
  optimized_sent_index: "1369",
  optimized_voc_index: "1309",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "611",
  frequency: "6699",
  furigana: "政策[せいさく]",
  kana: "せいさく",
  kanji: "政策",
  optimized_sent_index: "1182",
  optimized_voc_index: "1310",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1507",
  frequency: "21480",
  furigana: "タイプライター",
  kana: "タイプライター",
  kanji: "タイプライター",
  optimized_sent_index: "903",
  optimized_voc_index: "1311",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "443",
  frequency: "872",
  furigana: "選[えら]ぶ",
  kana: "えらぶ",
  kanji: "選ぶ",
  optimized_sent_index: "1183",
  optimized_voc_index: "1312",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "707",
  frequency: "2949",
  furigana: "選手[せんしゅ]",
  kana: "せんしゅ",
  kanji: "選手",
  optimized_sent_index: "1184",
  optimized_voc_index: "1313",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "525",
  frequency: "7927",
  furigana: "選挙[せんきょ]",
  kana: "せんきょ",
  kanji: "選挙",
  optimized_sent_index: "1188",
  optimized_voc_index: "1314",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "706",
  frequency: "9479",
  furigana: "候補[こうほ]",
  kana: "こうほ",
  kanji: "候補",
  optimized_sent_index: "1189",
  optimized_voc_index: "1315",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1509",
  frequency: "13359",
  furigana: "トマト",
  kana: "トマト",
  kanji: "トマト",
  optimized_sent_index: "435",
  optimized_voc_index: "1316",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "409",
  frequency: "4091",
  furigana: "首相[しゅしょう]",
  kana: "しゅしょう",
  kanji: "首相",
  optimized_sent_index: "1190",
  optimized_voc_index: "1317",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "819",
  frequency: "5953",
  furigana: "首都[しゅと]",
  kana: "しゅと",
  kanji: "首都",
  optimized_sent_index: "1191",
  optimized_voc_index: "1318",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "531",
  frequency: "9846",
  furigana: "改革[かいかく]",
  kana: "かいかく",
  kanji: "改革",
  optimized_sent_index: "1197",
  optimized_voc_index: "1319",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1502",
  frequency: "4874",
  furigana: "革[かわ]",
  kana: "かわ",
  kanji: "革",
  optimized_sent_index: "1198",
  optimized_voc_index: "1320",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1511",
  frequency: "9981",
  furigana: "バター",
  kana: "バター",
  kanji: "バター",
  optimized_sent_index: "472",
  optimized_voc_index: "1321",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "564",
  frequency: "964",
  furigana: "命令[めいれい]",
  kana: "めいれい",
  kanji: "命令",
  optimized_sent_index: "1220",
  optimized_voc_index: "1322",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "875",
  frequency: "4771",
  furigana: "番組[ばんぐみ]",
  kana: "ばんぐみ",
  kanji: "番組",
  optimized_sent_index: "1199",
  optimized_voc_index: "1323",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1192",
  frequency: "12874",
  furigana: "組[く]み 立[た]てる",
  kana: "くみたてる",
  kanji: "組み立てる",
  optimized_sent_index: "1724",
  optimized_voc_index: "1324",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "631",
  frequency: "1904",
  furigana: "組織[そしき]",
  kana: "そしき",
  kanji: "組織",
  optimized_sent_index: "1201",
  optimized_voc_index: "1325",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1513",
  frequency: "35660",
  furigana: "バレーボール",
  kana: "バレーボール",
  kanji: "バレーボール",
  optimized_sent_index: "1563",
  optimized_voc_index: "1326",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "447",
  frequency: "1965",
  furigana: "進[すす]める",
  kana: "すすめる",
  kanji: "進める",
  optimized_sent_index: "1652",
  optimized_voc_index: "1327",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "614",
  frequency: "536",
  furigana: "進[すす]む",
  kana: "すすむ",
  kanji: "進む",
  optimized_sent_index: "1202",
  optimized_voc_index: "1328",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1086",
  frequency: "12583",
  furigana: "進学[しんがく]",
  kana: "しんがく",
  kanji: "進学",
  optimized_sent_index: "1204",
  optimized_voc_index: "1329",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "613",
  frequency: "5067",
  furigana: "拡大[かくだい]",
  kana: "かくだい",
  kanji: "拡大",
  optimized_sent_index: "1206",
  optimized_voc_index: "1330",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1514",
  frequency: "11459",
  furigana: "おかず",
  kana: "おかず",
  kanji: "おかず",
  optimized_sent_index: "484",
  optimized_voc_index: "1331",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "729",
  frequency: "1494",
  furigana: "責任[せきにん]",
  kana: "せきにん",
  kanji: "責任",
  optimized_sent_index: "1208",
  optimized_voc_index: "1332",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1058",
  frequency: "3991",
  furigana: "辞[や]める",
  kana: "やめる",
  kanji: "辞める",
  optimized_sent_index: "1209",
  optimized_voc_index: "1333",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1576",
  frequency: "10858",
  furigana: "辞書[じしょ]",
  kana: "じしょ",
  kanji: "辞書",
  optimized_sent_index: "1210",
  optimized_voc_index: "1334",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1056",
  frequency: "17206",
  furigana: "通勤[つうきん]",
  kana: "つうきん",
  kanji: "通勤",
  optimized_sent_index: "1214",
  optimized_voc_index: "1335",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1515",
  frequency: "16205",
  furigana: "カレンダー",
  kana: "カレンダー",
  kanji: "カレンダー",
  optimized_sent_index: "745",
  optimized_voc_index: "1336",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1900",
  frequency: "2675",
  furigana: "勤[つと]める",
  kana: "つとめる",
  kanji: "勤める",
  optimized_sent_index: "1216",
  optimized_voc_index: "1337",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "728",
  frequency: "1932",
  furigana: "事務所[じむしょ]",
  kana: "じむしょ",
  kanji: "事務所",
  optimized_sent_index: "1217",
  optimized_voc_index: "1338",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1445",
  frequency: "8950",
  furigana: "事務室[じむしつ]",
  kana: "じむしつ",
  kanji: "事務室",
  optimized_sent_index: "1218",
  optimized_voc_index: "1339",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "544",
  frequency: "7092",
  furigana: "従来[じゅうらい]",
  kana: "じゅうらい",
  kanji: "従来",
  optimized_sent_index: "1219",
  optimized_voc_index: "1340",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1520",
  frequency: "8142",
  furigana: "ハンドバッグ",
  kana: "ハンドバッグ",
  kanji: "ハンドバッグ",
  optimized_sent_index: "617",
  optimized_voc_index: "1341",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "940",
  frequency: "4645",
  furigana: "成績[せいせき]",
  kana: "せいせき",
  kanji: "成績",
  optimized_sent_index: "1222",
  optimized_voc_index: "1342",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "471",
  frequency: "1293",
  furigana: "集[あつ]める",
  kana: "あつめる",
  kanji: "集める",
  optimized_sent_index: "1225",
  optimized_voc_index: "1343",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "610",
  frequency: "1133",
  furigana: "集[あつ]まる",
  kana: "あつまる",
  kanji: "集まる",
  optimized_sent_index: "1226",
  optimized_voc_index: "1344",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "592",
  frequency: "5167",
  furigana: "採用[さいよう]",
  kana: "さいよう",
  kanji: "採用",
  optimized_sent_index: "1229",
  optimized_voc_index: "1345",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1521",
  frequency: "1842",
  furigana: "ベル",
  kana: "ベル",
  kanji: "ベル",
  optimized_sent_index: "1821",
  optimized_voc_index: "1346",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "971",
  frequency: "5506",
  furigana: "給料[きゅうりょう]",
  kana: "きゅうりょう",
  kanji: "給料",
  optimized_sent_index: "1230",
  optimized_voc_index: "1347",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "799",
  frequency: "2882",
  furigana: "卒業[そつぎょう]",
  kana: "そつぎょう",
  kanji: "卒業",
  optimized_sent_index: "1232",
  optimized_voc_index: "1348",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "852",
  frequency: "6877",
  furigana: "就職[しゅうしょく]",
  kana: "しゅうしょく",
  kanji: "就職",
  optimized_sent_index: "1236",
  optimized_voc_index: "1349",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1126",
  frequency: "7979",
  furigana: "退院[たいいん]",
  kana: "たいいん",
  kanji: "退院",
  optimized_sent_index: "1237",
  optimized_voc_index: "1350",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1523",
  frequency: "11699",
  furigana: "インク",
  kana: "インク",
  kanji: "インク",
  optimized_sent_index: "487",
  optimized_voc_index: "1351",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "711",
  frequency: "3248",
  furigana: "契約[けいやく]",
  kana: "けいやく",
  kanji: "契約",
  optimized_sent_index: "1238",
  optimized_voc_index: "1352",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "560",
  frequency: "2740",
  furigana: "交渉[こうしょう]",
  kana: "こうしょう",
  kanji: "交渉",
  optimized_sent_index: "1239",
  optimized_voc_index: "1353",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "403",
  frequency: "303",
  furigana: "事件[じけん]",
  kana: "じけん",
  kanji: "事件",
  optimized_sent_index: "1264",
  optimized_voc_index: "1354",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "733",
  frequency: "1788",
  furigana: "条件[じょうけん]",
  kana: "じょうけん",
  kanji: "条件",
  optimized_sent_index: "1325",
  optimized_voc_index: "1355",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1527",
  frequency: "17870",
  furigana: "クーラー",
  kana: "クーラー",
  kanji: "クーラー",
  optimized_sent_index: "596",
  optimized_voc_index: "1356",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "506",
  frequency: "2275",
  furigana: "参加[さんか]",
  kana: "さんか",
  kanji: "参加",
  optimized_sent_index: "1242",
  optimized_voc_index: "1357",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "530",
  frequency: "11377",
  furigana: "増加[ぞうか]",
  kana: "ぞうか",
  kanji: "増加",
  optimized_sent_index: "1243",
  optimized_voc_index: "1358",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "578",
  frequency: "1423",
  furigana: "加[くわ]える",
  kana: "くわえる",
  kanji: "加える",
  optimized_sent_index: "1464",
  optimized_voc_index: "1359",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "628",
  frequency: "15673",
  furigana: "加工[かこう]",
  kana: "かこう",
  kanji: "加工",
  optimized_sent_index: "1244",
  optimized_voc_index: "1360",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1535",
  frequency: "7435",
  furigana: "ミルク",
  kana: "ミルク",
  kanji: "ミルク",
  optimized_sent_index: "552",
  optimized_voc_index: "1361",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "522",
  frequency: "2143",
  furigana: "比[くら]べる",
  kana: "くらべる",
  kanji: "比べる",
  optimized_sent_index: "1246",
  optimized_voc_index: "1362",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "659",
  frequency: "3533",
  furigana: "批判[ひはん]",
  kana: "ひはん",
  kanji: "批判",
  optimized_sent_index: "1848",
  optimized_voc_index: "1363",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "573",
  frequency: "3283",
  furigana: "評価[ひょうか]",
  kana: "ひょうか",
  kanji: "評価",
  optimized_sent_index: "1247",
  optimized_voc_index: "1364",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "458",
  frequency: "2721",
  furigana: "対象[たいしょう]",
  kana: "たいしょう",
  kanji: "対象",
  optimized_sent_index: "1248",
  optimized_voc_index: "1365",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1540",
  frequency: "12194",
  furigana: "サラダ",
  kana: "サラダ",
  kanji: "サラダ",
  optimized_sent_index: "473",
  optimized_voc_index: "1366",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "946",
  frequency: "7629",
  furigana: "故障[こしょう]",
  kana: "こしょう",
  kanji: "故障",
  optimized_sent_index: "1291",
  optimized_voc_index: "1367",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1010",
  frequency: "5111",
  furigana: "修理[しゅうり]",
  kana: "しゅうり",
  kanji: "修理",
  optimized_sent_index: "1249",
  optimized_voc_index: "1368",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1426",
  frequency: "14808",
  furigana: "乗[の]り 換[か]える",
  kana: "のりかえる",
  kanji: "乗り換える",
  optimized_sent_index: "1250",
  optimized_voc_index: "1369",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1639",
  frequency: "36414",
  furigana: "乗[の]り 換[か]え",
  kana: "のりかえ",
  kanji: "乗り換え",
  optimized_sent_index: "1252",
  optimized_voc_index: "1370",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1542",
  frequency: "2206",
  furigana: "おじさん",
  kana: "おじさん",
  kanji: "おじさん",
  optimized_sent_index: "507",
  optimized_voc_index: "1371",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1769",
  frequency: "9334",
  furigana: "換[か]える",
  kana: "かえる",
  kanji: "換える",
  optimized_sent_index: "1253",
  optimized_voc_index: "1372",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1844",
  frequency: "4393",
  furigana: "着替[きが]える",
  kana: "きがえる",
  kanji: "着替える",
  optimized_sent_index: "1254",
  optimized_voc_index: "1373",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1838",
  frequency: "5353",
  furigana: "被[かぶ]る",
  kana: "かぶる",
  kanji: "被る",
  optimized_sent_index: "1888",
  optimized_voc_index: "1374",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1098",
  frequency: "1707",
  furigana: "破[やぶ]る",
  kana: "やぶる",
  kanji: "破る",
  optimized_sent_index: "1256",
  optimized_voc_index: "1375",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1549",
  frequency: "4496",
  furigana: "ベルト",
  kana: "ベルト",
  kanji: "ベルト",
  optimized_sent_index: "1544",
  optimized_voc_index: "1376",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1456",
  frequency: "4548",
  furigana: "破[やぶ]れる",
  kana: "やぶれる",
  kanji: "破れる",
  optimized_sent_index: "1257",
  optimized_voc_index: "1377",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1146",
  frequency: "4099",
  furigana: "壊[こわ]す",
  kana: "こわす",
  kanji: "壊す",
  optimized_sent_index: "1260",
  optimized_voc_index: "1378",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1858",
  frequency: "3654",
  furigana: "壊[こわ]れる",
  kana: "こわれる",
  kanji: "壊れる",
  optimized_sent_index: "1261",
  optimized_voc_index: "1379",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1207",
  frequency: "6543",
  furigana: "救急車[きゅうきゅうしゃ]",
  kana: "きゅうきゅうしゃ",
  kanji: "救急車",
  optimized_sent_index: "1600",
  optimized_voc_index: "1380",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1552",
  frequency: "10669",
  furigana: "ラーメン",
  kana: "ラーメン",
  kanji: "ラーメン",
  optimized_sent_index: "474",
  optimized_voc_index: "1381",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1888",
  frequency: "915",
  furigana: "助[たす]ける",
  kana: "たすける",
  kanji: "助ける",
  optimized_sent_index: "1670",
  optimized_voc_index: "1382",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1152",
  frequency: "1253",
  furigana: "立派[りっぱ]",
  kana: "りっぱ",
  kanji: "立派",
  optimized_sent_index: "1262",
  optimized_voc_index: "1383",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "633",
  frequency: "587",
  furigana: "警察[けいさつ]",
  kana: "けいさつ",
  kanji: "警察",
  optimized_sent_index: "1596",
  optimized_voc_index: "1384",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "529",
  frequency: "4124",
  furigana: "管理[かんり]",
  kana: "かんり",
  kanji: "管理",
  optimized_sent_index: "1263",
  optimized_voc_index: "1385",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1553",
  frequency: "5268",
  furigana: "ライター",
  kana: "ライター",
  kanji: "ライター",
  optimized_sent_index: "618",
  optimized_voc_index: "1386",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1119",
  frequency: "1933",
  furigana: "盗[ぬす]む",
  kana: "ぬすむ",
  kanji: "盗む",
  optimized_sent_index: "1519",
  optimized_voc_index: "1387",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "861",
  frequency: "214",
  furigana: "殺[ころ]す",
  kana: "ころす",
  kanji: "殺す",
  optimized_sent_index: "1704",
  optimized_voc_index: "1388",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "746",
  frequency: "2288",
  furigana: "逮捕[たいほ]",
  kana: "たいほ",
  kanji: "逮捕",
  optimized_sent_index: "1265",
  optimized_voc_index: "1389",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "817",
  frequency: "468",
  furigana: "逃[に]げる",
  kana: "にげる",
  kanji: "逃げる",
  optimized_sent_index: "1659",
  optimized_voc_index: "1390",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1554",
  frequency: "9749",
  furigana: "ワイシャツ",
  kana: "ワイシャツ",
  kanji: "ワイシャツ",
  optimized_sent_index: "1009",
  optimized_voc_index: "1391",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "826",
  frequency: "838",
  furigana: "戦争[せんそう]",
  kana: "せんそう",
  kanji: "戦争",
  optimized_sent_index: "1266",
  optimized_voc_index: "1392",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "517",
  frequency: "7732",
  furigana: "競争[きょうそう]",
  kana: "きょうそう",
  kanji: "競争",
  optimized_sent_index: "1509",
  optimized_voc_index: "1393",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1341",
  frequency: "8421",
  furigana: "混[こ]む",
  kana: "こむ",
  kanji: "混む",
  optimized_sent_index: "723",
  optimized_voc_index: "1394",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "457",
  frequency: "4685",
  furigana: "大統領[だいとうりょう]",
  kana: "だいとうりょう",
  kanji: "大統領",
  optimized_sent_index: "1516",
  optimized_voc_index: "1395",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1557",
  frequency: "4898",
  furigana: "シャワー",
  kana: "シャワー",
  kanji: "シャワー",
  optimized_sent_index: "1742",
  optimized_voc_index: "1396",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "871",
  frequency: "780",
  furigana: "捨[す]てる",
  kana: "すてる",
  kanji: "捨てる",
  optimized_sent_index: "1267",
  optimized_voc_index: "1397",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1166",
  frequency: "1728",
  furigana: "拾[ひろ]う",
  kana: "ひろう",
  kanji: "拾う",
  optimized_sent_index: "1804",
  optimized_voc_index: "1398",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1121",
  frequency: "1952",
  furigana: "池[いけ]",
  kana: "いけ",
  kanji: "池",
  optimized_sent_index: "1972",
  optimized_voc_index: "1399",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1249",
  frequency: "19497",
  furigana: "電池[でんち]",
  kana: "でんち",
  kanji: "電池",
  optimized_sent_index: "1270",
  optimized_voc_index: "1400",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1561",
  frequency: "11441",
  furigana: "うどん",
  kana: "うどん",
  kanji: "うどん",
  optimized_sent_index: "475",
  optimized_voc_index: "1401",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "705",
  frequency: "374",
  furigana: "深[ふか]い",
  kana: "ふかい",
  kanji: "深い",
  optimized_sent_index: "1271",
  optimized_voc_index: "1402",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1784",
  frequency: ``,
  furigana: "深[ふか]さ",
  kana: "ふかさ",
  kanji: "深さ",
  optimized_sent_index: "1272",
  optimized_voc_index: "1403",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1143",
  frequency: "3238",
  furigana: "浅[あさ]い",
  kana: "あさい",
  kanji: "浅い",
  optimized_sent_index: "1273",
  optimized_voc_index: "1404",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "905",
  frequency: "927",
  furigana: "落[お]とす",
  kana: "おとす",
  kanji: "落とす",
  optimized_sent_index: "1803",
  optimized_voc_index: "1405",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1569",
  frequency: "16217",
  furigana: "ごみ",
  kana: "ごみ",
  kanji: "ごみ",
  optimized_sent_index: "407",
  optimized_voc_index: "1406",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1112",
  frequency: "3165",
  furigana: "泳[およ]ぐ",
  kana: "およぐ",
  kanji: "泳ぐ",
  optimized_sent_index: "1276",
  optimized_voc_index: "1407",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1340",
  frequency: "16480",
  furigana: "水泳[すいえい]",
  kana: "すいえい",
  kanji: "水泳",
  optimized_sent_index: "1619",
  optimized_voc_index: "1408",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "815",
  frequency: "635",
  furigana: "流[なが]れる",
  kana: "ながれる",
  kanji: "流れる",
  optimized_sent_index: "1634",
  optimized_voc_index: "1409",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1803",
  frequency: "11033",
  furigana: "流行[はや]る",
  kana: "はやる",
  kanji: "流行る",
  optimized_sent_index: "1278",
  optimized_voc_index: "1410",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1571",
  frequency: "24313",
  furigana: "スーパーマーケット",
  kana: "スーパーマーケット",
  kanji: "スーパーマーケット",
  optimized_sent_index: "1241",
  optimized_voc_index: "1411",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1080",
  frequency: "1618",
  furigana: "洗[あら]う",
  kana: "あらう",
  kanji: "洗う",
  optimized_sent_index: "1280",
  optimized_voc_index: "1412",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1745",
  frequency: "10626",
  furigana: "洗面所[せんめんじょ]",
  kana: "せんめんじょ",
  kanji: "洗面所",
  optimized_sent_index: "1282",
  optimized_voc_index: "1413",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1240",
  frequency: "3114",
  furigana: "油[あぶら]",
  kana: "あぶら",
  kanji: "油",
  optimized_sent_index: "1283",
  optimized_voc_index: "1414",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1105",
  frequency: "1429",
  furigana: "沈[しず]む",
  kana: "しずむ",
  kanji: "沈む",
  optimized_sent_index: "1284",
  optimized_voc_index: "1415",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1572",
  frequency: "3554",
  furigana: "ハンカチ",
  kana: "ハンカチ",
  kanji: "ハンカチ",
  optimized_sent_index: "425",
  optimized_voc_index: "1416",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1067",
  frequency: "4446",
  furigana: "久[ひさ]しぶり",
  kana: "ひさしぶり",
  kanji: "久しぶり",
  optimized_sent_index: "1285",
  optimized_voc_index: "1417",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1078",
  frequency: "2091",
  furigana: "氷[こおり]",
  kana: "こおり",
  kanji: "氷",
  optimized_sent_index: "1286",
  optimized_voc_index: "1418",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1393",
  frequency: "3895",
  furigana: "冷[ひ]える",
  kana: "ひえる",
  kanji: "冷える",
  optimized_sent_index: "1287",
  optimized_voc_index: "1419",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1465",
  frequency: "9406",
  furigana: "冷[ひ]やす",
  kana: "ひやす",
  kanji: "冷やす",
  optimized_sent_index: "1288",
  optimized_voc_index: "1420",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1573",
  frequency: "22073",
  furigana: "ビデオテープ",
  kana: "ビデオテープ",
  kanji: "ビデオテープ",
  optimized_sent_index: "659",
  optimized_voc_index: "1421",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1556",
  frequency: "7423",
  furigana: "冷[さ]める",
  kana: "さめる",
  kanji: "冷める",
  optimized_sent_index: "1289",
  optimized_voc_index: "1422",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1568",
  frequency: "5582",
  furigana: "凍[こお]る",
  kana: "こおる",
  kanji: "凍る",
  optimized_sent_index: "1290",
  optimized_voc_index: "1423",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1268",
  frequency: "4984",
  furigana: "冷蔵庫[れいぞうこ]",
  kana: "れいぞうこ",
  kanji: "冷蔵庫",
  optimized_sent_index: "1293",
  optimized_voc_index: "1424",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1360",
  frequency: "6086",
  furigana: "涼[すず]しい",
  kana: "すずしい",
  kanji: "涼しい",
  optimized_sent_index: "1294",
  optimized_voc_index: "1425",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1574",
  frequency: "5672",
  furigana: "ぶらぶら",
  kana: "ぶらぶら",
  kanji: "ぶらぶら",
  optimized_sent_index: "632",
  optimized_voc_index: "1426",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1708",
  frequency: "6306",
  furigana: "汚[よご]す",
  kana: "よごす",
  kanji: "汚す",
  optimized_sent_index: "1296",
  optimized_voc_index: "1427",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1811",
  frequency: "7665",
  furigana: "汚[よご]れ",
  kana: "よごれ",
  kanji: "汚れ",
  optimized_sent_index: "1963",
  optimized_voc_index: "1428",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1981",
  frequency: "2827",
  furigana: "汚[よご]れる",
  kana: "よごれる",
  kanji: "汚れる",
  optimized_sent_index: "1297",
  optimized_voc_index: "1429",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1851",
  frequency: "3646",
  furigana: "景色[けしき]",
  kana: "けしき",
  kanji: "景色",
  optimized_sent_index: "1298",
  optimized_voc_index: "1430",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1575",
  frequency: "12295",
  furigana: "アナウンサー",
  kana: "アナウンサー",
  kanji: "アナウンサー",
  optimized_sent_index: "436",
  optimized_voc_index: "1431",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "441",
  frequency: "1924",
  furigana: "影響[えいきょう]",
  kana: "えいきょう",
  kanji: "影響",
  optimized_sent_index: "1299",
  optimized_voc_index: "1432",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1106",
  frequency: "1097",
  furigana: "光[ひか]る",
  kana: "ひかる",
  kanji: "光る",
  optimized_sent_index: "1300",
  optimized_voc_index: "1433",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1361",
  frequency: "4036",
  furigana: "太[ふと]る",
  kana: "ふとる",
  kanji: "太る",
  optimized_sent_index: "1301",
  optimized_voc_index: "1434",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "935",
  frequency: "1400",
  furigana: "太陽[たいよう]",
  kana: "たいよう",
  kanji: "太陽",
  optimized_sent_index: "1860",
  optimized_voc_index: "1435",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1579",
  frequency: "8357",
  furigana: "スプーン",
  kana: "スプーン",
  kanji: "スプーン",
  optimized_sent_index: "476",
  optimized_voc_index: "1436",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1955",
  frequency: "983",
  furigana: "星[ほし]",
  kana: "ほし",
  kanji: "星",
  optimized_sent_index: "1308",
  optimized_voc_index: "1437",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "774",
  frequency: "1443",
  furigana: "地球[ちきゅう]",
  kana: "ちきゅう",
  kanji: "地球",
  optimized_sent_index: "1699",
  optimized_voc_index: "1438",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "975",
  frequency: "3118",
  furigana: "野球[やきゅう]",
  kana: "やきゅう",
  kanji: "野球",
  optimized_sent_index: "1312",
  optimized_voc_index: "1439",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1849",
  frequency: "1022",
  furigana: "雲[くも]",
  kana: "くも",
  kanji: "雲",
  optimized_sent_index: "1314",
  optimized_voc_index: "1440",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1585",
  frequency: "8418",
  furigana: "ブラウス",
  kana: "ブラウス",
  kanji: "ブラウス",
  optimized_sent_index: "1010",
  optimized_voc_index: "1441",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1652",
  frequency: "20113",
  furigana: "曇[くも]り",
  kana: "くもり",
  kanji: "曇り",
  optimized_sent_index: "1315",
  optimized_voc_index: "1442",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "788",
  frequency: "5960",
  furigana: "地震[じしん]",
  kana: "じしん",
  kanji: "地震",
  optimized_sent_index: "1318",
  optimized_voc_index: "1443",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1309",
  frequency: "1232",
  furigana: "震[ふる]える",
  kana: "ふるえる",
  kanji: "震える",
  optimized_sent_index: "1320",
  optimized_voc_index: "1444",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "904",
  frequency: "429",
  furigana: "振[ふ]る",
  kana: "ふる",
  kanji: "振る",
  optimized_sent_index: "1669",
  optimized_voc_index: "1445",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1587",
  frequency: "6209",
  furigana: "リボン",
  kana: "リボン",
  kanji: "リボン",
  optimized_sent_index: "1439",
  optimized_voc_index: "1446",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1034",
  frequency: "1653",
  furigana: "揺[ゆ]れる",
  kana: "ゆれる",
  kanji: "揺れる",
  optimized_sent_index: "1321",
  optimized_voc_index: "1447",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1259",
  frequency: "1989",
  furigana: "神社[じんじゃ]",
  kana: "じんじゃ",
  kanji: "神社",
  optimized_sent_index: "1323",
  optimized_voc_index: "1448",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "913",
  frequency: "1041",
  furigana: "秘密[ひみつ]",
  kana: "ひみつ",
  kanji: "秘密",
  optimized_sent_index: "1324",
  optimized_voc_index: "1449",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1845",
  frequency: "2177",
  furigana: "厳[きび]しい",
  kana: "きびしい",
  kanji: "厳しい",
  optimized_sent_index: "1650",
  optimized_voc_index: "1450",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1588",
  frequency: "3176",
  furigana: "いかが",
  kana: "いかが",
  kanji: "いかが",
  optimized_sent_index: "1245",
  optimized_voc_index: "1451",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "936",
  frequency: "4465",
  furigana: "年寄[としよ]り",
  kana: "としより",
  kanji: "年寄り",
  optimized_sent_index: "1329",
  optimized_voc_index: "1452",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "717",
  frequency: "1323",
  furigana: "歴史[れきし]",
  kana: "れきし",
  kanji: "歴史",
  optimized_sent_index: "1678",
  optimized_voc_index: "1453",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "626",
  frequency: "2218",
  furigana: "世紀[せいき]",
  kana: "せいき",
  kanji: "世紀",
  optimized_sent_index: "1330",
  optimized_voc_index: "1454",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "419",
  frequency: "3801",
  furigana: "建設[けんせつ]",
  kana: "けんせつ",
  kanji: "建設",
  optimized_sent_index: "1331",
  optimized_voc_index: "1455",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1591",
  frequency: "19205",
  furigana: "ステレオ",
  kana: "ステレオ",
  kanji: "ステレオ",
  optimized_sent_index: "1011",
  optimized_voc_index: "1456",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "722",
  frequency: "1040",
  furigana: "建物[たてもの]",
  kana: "たてもの",
  kanji: "建物",
  optimized_sent_index: "1333",
  optimized_voc_index: "1457",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1061",
  frequency: "4363",
  furigana: "建[た]つ",
  kana: "たつ",
  kanji: "建つ",
  optimized_sent_index: "1334",
  optimized_voc_index: "1458",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "528",
  frequency: "3967",
  furigana: "構成[こうせい]",
  kana: "こうせい",
  kanji: "構成",
  optimized_sent_index: "1336",
  optimized_voc_index: "1459",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "587",
  frequency: "3441",
  furigana: "構造[こうぞう]",
  kana: "こうぞう",
  kanji: "構造",
  optimized_sent_index: "1337",
  optimized_voc_index: "1460",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1594",
  frequency: "8317",
  furigana: "フォーク",
  kana: "フォーク",
  kanji: "フォーク",
  optimized_sent_index: "1590",
  optimized_voc_index: "1461",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1927",
  frequency: "1201",
  furigana: "橋[はし]",
  kana: "はし",
  kanji: "橋",
  optimized_sent_index: "1339",
  optimized_voc_index: "1462",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1929",
  frequency: "1975",
  furigana: "柱[はしら]",
  kana: "はしら",
  kanji: "柱",
  optimized_sent_index: "1341",
  optimized_voc_index: "1463",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "701",
  frequency: "1166",
  furigana: "位置[いち]",
  kana: "いち",
  kanji: "位置",
  optimized_sent_index: "1344",
  optimized_voc_index: "1464",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1014",
  frequency: "3577",
  furigana: "離婚[りこん]",
  kana: "りこん",
  kanji: "離婚",
  optimized_sent_index: "1345",
  optimized_voc_index: "1465",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1596",
  frequency: "8631",
  furigana: "おば",
  kana: "おば",
  kanji: "おば",
  optimized_sent_index: "1952",
  optimized_voc_index: "1466",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1469",
  frequency: "8452",
  furigana: "停車[ていしゃ]",
  kana: "ていしゃ",
  kanji: "停車",
  optimized_sent_index: "1681",
  optimized_voc_index: "1467",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1642",
  frequency: "15461",
  furigana: "バス 停[てい]",
  kana: "ばすてい",
  kanji: "バス停",
  optimized_sent_index: "1347",
  optimized_voc_index: "1468",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "744",
  frequency: "2889",
  furigana: "周辺[しゅうへん]",
  kana: "しゅうへん",
  kanji: "周辺",
  optimized_sent_index: "1349",
  optimized_voc_index: "1469",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "894",
  frequency: "1039",
  furigana: "隣[となり]",
  kana: "となり",
  kanji: "隣",
  optimized_sent_index: "1668",
  optimized_voc_index: "1470",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1598",
  frequency: "6371",
  furigana: "きらきら",
  kana: "きらきら",
  kanji: "きらきら",
  optimized_sent_index: "1307",
  optimized_voc_index: "1471",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1730",
  frequency: "5118",
  furigana: "黄色[きいろ]",
  kana: "きいろ",
  kanji: "黄色",
  optimized_sent_index: "1352",
  optimized_voc_index: "1472",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "942",
  frequency: "462",
  furigana: "横[よこ]",
  kana: "よこ",
  kanji: "横",
  optimized_sent_index: "1353",
  optimized_voc_index: "1473",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1788",
  frequency: "39517",
  furigana: "横書[よこが]き",
  kana: "よこがき",
  kanji: "横書き",
  optimized_sent_index: "1354",
  optimized_voc_index: "1474",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "630",
  frequency: "1146",
  furigana: "判断[はんだん]",
  kana: "はんだん",
  kanji: "判断",
  optimized_sent_index: "1356",
  optimized_voc_index: "1475",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1600",
  frequency: "1153",
  furigana: "どうぞ",
  kana: "どうぞ",
  kanji: "どうぞ",
  optimized_sent_index: "1597",
  optimized_voc_index: "1476",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1101",
  frequency: "2368",
  furigana: "断[ことわ]る",
  kana: "ことわる",
  kanji: "断る",
  optimized_sent_index: "1358",
  optimized_voc_index: "1477",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1666",
  frequency: "22721",
  furigana: "横断歩道[おうだんほどう]",
  kana: "おうだんほどう",
  kanji: "横断歩道",
  optimized_sent_index: "1359",
  optimized_voc_index: "1478",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "627",
  frequency: "12210",
  furigana: "大幅[おおはば]",
  kana: "おおはば",
  kanji: "大幅",
  optimized_sent_index: "1360",
  optimized_voc_index: "1479",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "721",
  frequency: "1461",
  furigana: "訪[おとず]れる",
  kana: "おとずれる",
  kanji: "訪れる",
  optimized_sent_index: "1362",
  optimized_voc_index: "1480",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1603",
  frequency: "14344",
  furigana: "ネックレス",
  kana: "ネックレス",
  kanji: "ネックレス",
  optimized_sent_index: "1505",
  optimized_voc_index: "1481",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "924",
  frequency: "1401",
  furigana: "訪[たず]ねる",
  kana: "たずねる",
  kanji: "訪ねる",
  optimized_sent_index: "1363",
  optimized_voc_index: "1482",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1362",
  frequency: "19741",
  furigana: "冷房[れいぼう]",
  kana: "れいぼう",
  kanji: "冷房",
  optimized_sent_index: "1364",
  optimized_voc_index: "1483",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1408",
  frequency: "17381",
  furigana: "暖房[だんぼう]",
  kana: "だんぼう",
  kanji: "暖房",
  optimized_sent_index: "1365",
  optimized_voc_index: "1484",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1685",
  frequency: "31563",
  furigana: "文房具[ぶんぼうぐ]",
  kana: "ぶんぼうぐ",
  kanji: "文房具",
  optimized_sent_index: "1366",
  optimized_voc_index: "1485",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1604",
  frequency: "7955",
  furigana: "パジャマ",
  kana: "パジャマ",
  kanji: "パジャマ",
  optimized_sent_index: "767",
  optimized_voc_index: "1486",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "726",
  frequency: "6784",
  furigana: "諸国[しょこく]",
  kana: "しょこく",
  kanji: "諸国",
  optimized_sent_index: "1368",
  optimized_voc_index: "1487",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1353",
  frequency: "3928",
  furigana: "緑色[みどりいろ]",
  kana: "みどりいろ",
  kanji: "緑色",
  optimized_sent_index: "1374",
  optimized_voc_index: "1488",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "748",
  frequency: "8624",
  furigana: "貿易[ぼうえき]",
  kana: "ぼうえき",
  kanji: "貿易",
  optimized_sent_index: "1376",
  optimized_voc_index: "1489",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "515",
  frequency: "8824",
  furigana: "輸入[ゆにゅう]",
  kana: "ゆにゅう",
  kanji: "輸入",
  optimized_sent_index: "1377",
  optimized_voc_index: "1490",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1605",
  frequency: "13010",
  furigana: "ボールペン",
  kana: "ボールペン",
  kanji: "ボールペン",
  optimized_sent_index: "634",
  optimized_voc_index: "1491",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "632",
  frequency: "12681",
  furigana: "輸出[ゆしゅつ]",
  kana: "ゆしゅつ",
  kanji: "輸出",
  optimized_sent_index: "1378",
  optimized_voc_index: "1492",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1370",
  frequency: "3928",
  furigana: "指輪[ゆびわ]",
  kana: "ゆびわ",
  kanji: "指輪",
  optimized_sent_index: "1379",
  optimized_voc_index: "1493",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1068",
  frequency: "5955",
  furigana: "往復[おうふく]",
  kana: "おうふく",
  kanji: "往復",
  optimized_sent_index: "1381",
  optimized_voc_index: "1494",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1945",
  frequency: "30022",
  furigana: "復習[ふくしゅう]",
  kana: "ふくしゅう",
  kanji: "復習",
  optimized_sent_index: "1382",
  optimized_voc_index: "1495",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1609",
  frequency: "73328",
  furigana: "すいか",
  kana: "すいか",
  kanji: "すいか",
  optimized_sent_index: "1638",
  optimized_voc_index: "1496",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "572",
  frequency: "1535",
  furigana: "繰[く]り 返[かえ]す",
  kana: "くりかえす",
  kanji: "繰り返す",
  optimized_sent_index: "1383",
  optimized_voc_index: "1497",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "920",
  frequency: "8365",
  furigana: "留学[りゅうがく]",
  kana: "りゅうがく",
  kanji: "留学",
  optimized_sent_index: "1388",
  optimized_voc_index: "1498",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1655",
  frequency: "18743",
  furigana: "停留所[ていりゅうじょ]",
  kana: "ていりゅうじょ",
  kanji: "停留所",
  optimized_sent_index: "1389",
  optimized_voc_index: "1499",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1770",
  frequency: "54727",
  furigana: "書留[かきとめ]",
  kana: "かきとめ",
  kanji: "書留",
  optimized_sent_index: "1390",
  optimized_voc_index: "1500",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1610",
  frequency: "2271",
  furigana: "そちら",
  kana: "そちら",
  kanji: "そちら",
  optimized_sent_index: "768",
  optimized_voc_index: "1501",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "786",
  frequency: "726",
  furigana: "守[まも]る",
  kana: "まもる",
  kanji: "守る",
  optimized_sent_index: "1392",
  optimized_voc_index: "1502",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1410",
  frequency: "3149",
  furigana: "留守[るす]",
  kana: "るす",
  kanji: "留守",
  optimized_sent_index: "1395",
  optimized_voc_index: "1503",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "556",
  frequency: "7859",
  furigana: "住宅[じゅうたく]",
  kana: "じゅうたく",
  kanji: "住宅",
  optimized_sent_index: "1404",
  optimized_voc_index: "1504",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "714",
  frequency: "2420",
  furigana: "自宅[じたく]",
  kana: "じたく",
  kanji: "自宅",
  optimized_sent_index: "1397",
  optimized_voc_index: "1505",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1611",
  frequency: "540",
  furigana: "そば",
  kana: "そば",
  kanji: "そば",
  optimized_sent_index: "477",
  optimized_voc_index: "1506",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1668",
  frequency: "16576",
  furigana: "お 宅[たく]",
  kana: "おたく",
  kanji: "お宅",
  optimized_sent_index: "1398",
  optimized_voc_index: "1507",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1659",
  frequency: "15286",
  furigana: "早起[はやお]き",
  kana: "はやおき",
  kanji: "早起き",
  optimized_sent_index: "1912",
  optimized_voc_index: "1508",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1533",
  frequency: "10469",
  furigana: "昼寝[ひるね]",
  kana: "ひるね",
  kanji: "昼寝",
  optimized_sent_index: "1403",
  optimized_voc_index: "1509",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "862",
  frequency: "1048",
  furigana: "静[しず]か",
  kana: "しずか",
  kanji: "静か",
  optimized_sent_index: "1405",
  optimized_voc_index: "1510",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1614",
  frequency: "1968",
  furigana: "どっち",
  kana: "どっち",
  kanji: "どっち",
  optimized_sent_index: "846",
  optimized_voc_index: "1511",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1756",
  frequency: "1815",
  furigana: "暇[ひま]",
  kana: "ひま",
  kanji: "暇",
  optimized_sent_index: "1406",
  optimized_voc_index: "1512",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1118",
  frequency: "2176",
  furigana: "趣味[しゅみ]",
  kana: "しゅみ",
  kanji: "趣味",
  optimized_sent_index: "1407",
  optimized_voc_index: "1513",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "968",
  frequency: "3567",
  furigana: "両方[りょうほう]",
  kana: "りょうほう",
  kanji: "両方",
  optimized_sent_index: "1408",
  optimized_voc_index: "1514",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1690",
  frequency: "35894",
  furigana: "両替[りょうがえ]",
  kana: "りょうがえ",
  kanji: "両替",
  optimized_sent_index: "1409",
  optimized_voc_index: "1515",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1616",
  frequency: "44363",
  furigana: "バスケットボール",
  kana: "バスケットボール",
  kanji: "バスケットボール",
  optimized_sent_index: "1187",
  optimized_voc_index: "1516",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1984",
  frequency: "1604",
  furigana: "両親[りょうしん]",
  kana: "りょうしん",
  kanji: "両親",
  optimized_sent_index: "1953",
  optimized_voc_index: "1517",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1472",
  frequency: "29912",
  furigana: "片道[かたみち]",
  kana: "かたみち",
  kanji: "片道",
  optimized_sent_index: "1410",
  optimized_voc_index: "1518",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1113",
  frequency: "2407",
  furigana: "内側[うちがわ]",
  kana: "うちがわ",
  kanji: "内側",
  optimized_sent_index: "1411",
  optimized_voc_index: "1519",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1536",
  frequency: "5595",
  furigana: "向[む]こう 側[がわ]",
  kana: "むこうがわ",
  kanji: "向こう側",
  optimized_sent_index: "1413",
  optimized_voc_index: "1520",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1626",
  frequency: "11553",
  furigana: "サンドイッチ",
  kana: "サンドイッチ",
  kanji: "サンドイッチ",
  optimized_sent_index: "467",
  optimized_voc_index: "1521",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1799",
  frequency: "5479",
  furigana: "外側[そとがわ]",
  kana: "そとがわ",
  kanji: "外側",
  optimized_sent_index: "1414",
  optimized_voc_index: "1522",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1804",
  frequency: "5067",
  furigana: "左側[ひだりがわ]",
  kana: "ひだりがわ",
  kanji: "左側",
  optimized_sent_index: "1415",
  optimized_voc_index: "1523",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1808",
  frequency: "4819",
  furigana: "右側[みぎがわ]",
  kana: "みぎがわ",
  kanji: "右側",
  optimized_sent_index: "1416",
  optimized_voc_index: "1524",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "947",
  frequency: "1157",
  furigana: "裏[うら]",
  kana: "うら",
  kanji: "裏",
  optimized_sent_index: "1417",
  optimized_voc_index: "1525",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1631",
  frequency: "5970",
  furigana: "にこにこ",
  kana: "にこにこ",
  kanji: "にこにこ",
  optimized_sent_index: "1015",
  optimized_voc_index: "1526",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1595",
  frequency: "15664",
  furigana: "裏返[うらがえ]す",
  kana: "うらがえす",
  kanji: "裏返す",
  optimized_sent_index: "1418",
  optimized_voc_index: "1527",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1307",
  frequency: "5458",
  furigana: "週刊誌[しゅうかんし]",
  kana: "しゅうかんし",
  kanji: "週刊誌",
  optimized_sent_index: "1419",
  optimized_voc_index: "1528",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1383",
  frequency: "12785",
  furigana: "朝刊[ちょうかん]",
  kana: "ちょうかん",
  kanji: "朝刊",
  optimized_sent_index: "1420",
  optimized_voc_index: "1529",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1391",
  frequency: "9729",
  furigana: "夕刊[ゆうかん]",
  kana: "ゆうかん",
  kanji: "夕刊",
  optimized_sent_index: "1421",
  optimized_voc_index: "1530",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1635",
  frequency: "31927",
  furigana: "ウール",
  kana: "ウール",
  kanji: "ウール",
  optimized_sent_index: "601",
  optimized_voc_index: "1531",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "864",
  frequency: "3290",
  furigana: "詳[くわ]しい",
  kana: "くわしい",
  kanji: "詳しい",
  optimized_sent_index: "1423",
  optimized_voc_index: "1532",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "939",
  frequency: "4234",
  furigana: "細[こま]かい",
  kana: "こまかい",
  kanji: "細かい",
  optimized_sent_index: "1424",
  optimized_voc_index: "1533",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1989",
  frequency: "10146",
  furigana: "細[こま]か",
  kana: "こまか",
  kanji: "細か",
  optimized_sent_index: "1426",
  optimized_voc_index: "1534",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1399",
  frequency: "11312",
  furigana: "積[つ]もる",
  kana: "つもる",
  kanji: "積もる",
  optimized_sent_index: "1427",
  optimized_voc_index: "1535",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1636",
  frequency: "10705",
  furigana: "コーラ",
  kana: "コーラ",
  kanji: "コーラ",
  optimized_sent_index: "925",
  optimized_voc_index: "1536",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1586",
  frequency: "1350",
  furigana: "訳[やく]",
  kana: "やく",
  kanji: "訳",
  optimized_sent_index: "1428",
  optimized_voc_index: "1537",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1687",
  frequency: "9183",
  furigana: "訳[やく]す",
  kana: "やくす",
  kanji: "訳す",
  optimized_sent_index: "1429",
  optimized_voc_index: "1538",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "510",
  frequency: "5022",
  furigana: "検討[けんとう]",
  kana: "けんとう",
  kanji: "検討",
  optimized_sent_index: "1430",
  optimized_voc_index: "1539",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1193",
  frequency: "2933",
  furigana: "塗[ぬ]る",
  kana: "ぬる",
  kanji: "塗る",
  optimized_sent_index: "1697",
  optimized_voc_index: "1540",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1637",
  frequency: "40199",
  furigana: "トイレットペーパー",
  kana: "トイレットペーパー",
  kanji: "トイレットペーパー",
  optimized_sent_index: "1251",
  optimized_voc_index: "1541",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1127",
  frequency: "1834",
  furigana: "付[つ]く",
  kana: "つく",
  kanji: "付く",
  optimized_sent_index: "1958",
  optimized_voc_index: "1542",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1190",
  frequency: "2488",
  furigana: "付[つ]ける",
  kana: "つける",
  kanji: "付ける",
  optimized_sent_index: "1432",
  optimized_voc_index: "1543",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1273",
  frequency: "28372",
  furigana: "受[う]け 付[つ]ける",
  kana: "うけつける",
  kanji: "受け付ける",
  optimized_sent_index: "1435",
  optimized_voc_index: "1544",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1466",
  frequency: "6216",
  furigana: "片付[かたづ]ける",
  kana: "かたづける",
  kanji: "片付ける",
  optimized_sent_index: "1436",
  optimized_voc_index: "1545",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1638",
  frequency: "4953",
  furigana: "どなた",
  kana: "どなた",
  kanji: "どなた",
  optimized_sent_index: "1487",
  optimized_voc_index: "1546",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1489",
  frequency: "5864",
  furigana: "受付[うけつけ]",
  kana: "うけつけ",
  kanji: "受付",
  optimized_sent_index: "1437",
  optimized_voc_index: "1547",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1518",
  frequency: "6335",
  furigana: "近付[ちかづ]く",
  kana: "ちかづく",
  kanji: "近付く",
  optimized_sent_index: "1438",
  optimized_voc_index: "1548",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1693",
  frequency: "17312",
  furigana: "片付[かたづ]く",
  kana: "かたづく",
  kanji: "片付く",
  optimized_sent_index: "1440",
  optimized_voc_index: "1549",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1743",
  frequency: ``,
  furigana: "気[き]を 付[つ]ける",
  kana: "きをつける",
  kanji: "気を付ける",
  optimized_sent_index: "1441",
  optimized_voc_index: "1550",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1640",
  frequency: "34408",
  furigana: "ハイキング",
  kana: "ハイキング",
  kanji: "ハイキング",
  optimized_sent_index: "449",
  optimized_voc_index: "1551",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1931",
  frequency: "2781",
  furigana: "貼[は]る",
  kana: "はる",
  kanji: "貼る",
  optimized_sent_index: "1723",
  optimized_voc_index: "1552",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1565",
  frequency: "24988",
  furigana: "記念日[きねんび]",
  kana: "きねんび",
  kanji: "記念日",
  optimized_sent_index: "1442",
  optimized_voc_index: "1553",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1864",
  frequency: "1447",
  furigana: "残念[ざんねん]",
  kana: "ざんねん",
  kanji: "残念",
  optimized_sent_index: "1443",
  optimized_voc_index: "1554",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "812",
  frequency: "3444",
  furigana: "例[たと]えば",
  kana: "たとえば",
  kanji: "例えば",
  optimized_sent_index: "1446",
  optimized_voc_index: "1555",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1643",
  frequency: "11761",
  furigana: "ハム",
  kana: "ハム",
  kanji: "ハム",
  optimized_sent_index: "1640",
  optimized_voc_index: "1556",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1646",
  frequency: "63509",
  furigana: "例文[れいぶん]",
  kana: "れいぶん",
  kanji: "例文",
  optimized_sent_index: "1447",
  optimized_voc_index: "1557",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1664",
  frequency: "599",
  furigana: "例[れい]",
  kana: "れい",
  kanji: "例",
  optimized_sent_index: "1448",
  optimized_voc_index: "1558",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1242",
  frequency: "7039",
  furigana: "余[あま]る",
  kana: "あまる",
  kanji: "余る",
  optimized_sent_index: "1449",
  optimized_voc_index: "1559",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "490",
  frequency: "3394",
  furigana: "除[のぞ]く",
  kana: "のぞく",
  kanji: "除く",
  optimized_sent_index: "1450",
  optimized_voc_index: "1560",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1644",
  frequency: "17641",
  furigana: "ボーイフレンド",
  kana: "ボーイフレンド",
  kanji: "ボーイフレンド",
  optimized_sent_index: "437",
  optimized_voc_index: "1561",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1324",
  frequency: "5297",
  furigana: "削[けず]る",
  kana: "けずる",
  kanji: "削る",
  optimized_sent_index: "1451",
  optimized_voc_index: "1562",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1559",
  frequency: "9214",
  furigana: "遅刻[ちこく]",
  kana: "ちこく",
  kanji: "遅刻",
  optimized_sent_index: "1453",
  optimized_voc_index: "1563",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1978",
  frequency: "18468",
  furigana: "緩[ゆる]い",
  kana: "ゆるい",
  kanji: "緩い",
  optimized_sent_index: "1454",
  optimized_voc_index: "1564",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "915",
  frequency: "1473",
  furigana: "苦[くる]しい",
  kana: "くるしい",
  kanji: "苦しい",
  optimized_sent_index: "1456",
  optimized_voc_index: "1565",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1648",
  frequency: "20172",
  furigana: "アイロン",
  kana: "アイロン",
  kanji: "アイロン",
  optimized_sent_index: "1016",
  optimized_voc_index: "1566",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1276",
  frequency: "4985",
  furigana: "苦[にが]い",
  kana: "にがい",
  kanji: "苦い",
  optimized_sent_index: "1457",
  optimized_voc_index: "1567",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1385",
  frequency: "4436",
  furigana: "苦手[にがて]",
  kana: "にがて",
  kanji: "苦手",
  optimized_sent_index: "1458",
  optimized_voc_index: "1568",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "854",
  frequency: "567",
  furigana: "困[こま]る",
  kana: "こまる",
  kanji: "困る",
  optimized_sent_index: "1459",
  optimized_voc_index: "1569",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1373",
  frequency: "4081",
  furigana: "貧乏[びんぼう]",
  kana: "びんぼう",
  kanji: "貧乏",
  optimized_sent_index: "1460",
  optimized_voc_index: "1570",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1650",
  frequency: "26983",
  furigana: "カレーライス",
  kana: "カレーライス",
  kanji: "カレーライス",
  optimized_sent_index: "429",
  optimized_voc_index: "1571",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1124",
  frequency: "1464",
  furigana: "不幸[ふこう]",
  kana: "ふこう",
  kanji: "不幸",
  optimized_sent_index: "1462",
  optimized_voc_index: "1572",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1141",
  frequency: "1869",
  furigana: "幸[しあわ]せ",
  kana: "しあわせ",
  kanji: "幸せ",
  optimized_sent_index: "1463",
  optimized_voc_index: "1573",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1654",
  frequency: "3972",
  furigana: "塩[しお]",
  kana: "しお",
  kanji: "塩",
  optimized_sent_index: "1466",
  optimized_voc_index: "1574",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1795",
  frequency: "42616",
  furigana: "塩辛[しおから]い",
  kana: "しおからい",
  kanji: "塩辛い",
  optimized_sent_index: "1467",
  optimized_voc_index: "1575",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1651",
  frequency: "38927",
  furigana: "キャッシュカード",
  kana: "キャッシュカード",
  kanji: "キャッシュカード",
  optimized_sent_index: "415",
  optimized_voc_index: "1576",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1158",
  frequency: "6254",
  furigana: "砂糖[さとう]",
  kana: "さとう",
  kanji: "砂糖",
  optimized_sent_index: "1469",
  optimized_voc_index: "1577",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "599",
  frequency: "5974",
  furigana: "規模[きぼ]",
  kana: "きぼ",
  kanji: "規模",
  optimized_sent_index: "1470",
  optimized_voc_index: "1578",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "801",
  frequency: "9770",
  furigana: "農業[のうぎょう]",
  kana: "のうぎょう",
  kanji: "農業",
  optimized_sent_index: "1471",
  optimized_voc_index: "1579",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1145",
  frequency: "1884",
  furigana: "濃[こ]い",
  kana: "こい",
  kanji: "濃い",
  optimized_sent_index: "1472",
  optimized_voc_index: "1580",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1665",
  frequency: "25154",
  furigana: "イヤリング",
  kana: "イヤリング",
  kanji: "イヤリング",
  optimized_sent_index: "1017",
  optimized_voc_index: "1581",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "881",
  frequency: "1457",
  furigana: "薄[うす]い",
  kana: "うすい",
  kanji: "薄い",
  optimized_sent_index: "1473",
  optimized_voc_index: "1582",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "994",
  frequency: "2309",
  furigana: "厚[あつ]い",
  kana: "あつい",
  kanji: "厚い",
  optimized_sent_index: "1475",
  optimized_voc_index: "1583",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1272",
  frequency: ``,
  furigana: "厚[あつ]さ",
  kana: "あつさ",
  kanji: "厚さ",
  optimized_sent_index: "1586",
  optimized_voc_index: "1584",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "667",
  frequency: "1370",
  furigana: "迫[せま]る",
  kana: "せまる",
  kanji: "迫る",
  optimized_sent_index: "1476",
  optimized_voc_index: "1585",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1669",
  frequency: "23427",
  furigana: "ガールフレンド",
  kana: "ガールフレンド",
  kanji: "ガールフレンド",
  optimized_sent_index: "1018",
  optimized_voc_index: "1586",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "859",
  frequency: "2017",
  furigana: "伸[の]びる",
  kana: "のびる",
  kanji: "伸びる",
  optimized_sent_index: "1767",
  optimized_voc_index: "1587",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1301",
  frequency: "8111",
  furigana: "引[ひ]っ 越[こ]す",
  kana: "ひっこす",
  kanji: "引っ越す",
  optimized_sent_index: "1951",
  optimized_voc_index: "1588",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1325",
  frequency: "1500",
  furigana: "越[こ]える",
  kana: "こえる",
  kanji: "越える",
  optimized_sent_index: "1479",
  optimized_voc_index: "1589",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1387",
  frequency: "12254",
  furigana: "引[ひ]っ 越[こ]し",
  kana: "ひっこし",
  kanji: "引っ越し",
  optimized_sent_index: "1480",
  optimized_voc_index: "1590",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1670",
  frequency: "39314",
  furigana: "カセットテープ",
  kana: "カセットテープ",
  kanji: "カセットテープ",
  optimized_sent_index: "613",
  optimized_voc_index: "1591",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1562",
  frequency: "15814",
  furigana: "追[お]い 越[こ]す",
  kana: "おいこす",
  kanji: "追い越す",
  optimized_sent_index: "1481",
  optimized_voc_index: "1592",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "653",
  frequency: "5649",
  furigana: "上昇[じょうしょう]",
  kana: "じょうしょう",
  kanji: "上昇",
  optimized_sent_index: "1482",
  optimized_voc_index: "1593",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1525",
  frequency: "13004",
  furigana: "改札口[かいさつぐち]",
  kana: "かいさつぐち",
  kanji: "改札口",
  optimized_sent_index: "1484",
  optimized_voc_index: "1594",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1529",
  frequency: "1690",
  furigana: "失礼[しつれい]",
  kana: "しつれい",
  kanji: "失礼",
  optimized_sent_index: "1485",
  optimized_voc_index: "1595",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1671",
  frequency: "21544",
  furigana: "かゆい",
  kana: "かゆい",
  kanji: "かゆい",
  optimized_sent_index: "1615",
  optimized_voc_index: "1596",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1538",
  frequency: "3127",
  furigana: "お 礼[れい]",
  kana: "おれい",
  kanji: "お礼",
  optimized_sent_index: "1486",
  optimized_voc_index: "1597",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1432",
  frequency: "3109",
  furigana: "謝[あやま]る",
  kana: "あやまる",
  kanji: "謝る",
  optimized_sent_index: "1488",
  optimized_voc_index: "1598",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1260",
  frequency: "8100",
  furigana: "注射[ちゅうしゃ]",
  kana: "ちゅうしゃ",
  kanji: "注射",
  optimized_sent_index: "1489",
  optimized_voc_index: "1599",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "682",
  frequency: "1091",
  furigana: "程度[ていど]",
  kana: "ていど",
  kanji: "程度",
  optimized_sent_index: "1906",
  optimized_voc_index: "1600",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1674",
  frequency: "16042",
  furigana: "ぐらぐら",
  kana: "ぐらぐら",
  kanji: "ぐらぐら",
  optimized_sent_index: "1322",
  optimized_voc_index: "1601",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1731",
  frequency: "1608",
  furigana: "誘[さそ]う",
  kana: "さそう",
  kanji: "誘う",
  optimized_sent_index: "1491",
  optimized_voc_index: "1602",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "445",
  frequency: "12447",
  furigana: "導入[どうにゅう]",
  kana: "どうにゅう",
  kanji: "導入",
  optimized_sent_index: "1492",
  optimized_voc_index: "1603",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "783",
  frequency: "1551",
  furigana: "努力[どりょく]",
  kana: "どりょく",
  kanji: "努力",
  optimized_sent_index: "1493",
  optimized_voc_index: "1604",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1490",
  frequency: "791",
  furigana: "怒[おこ]る",
  kana: "おこる",
  kanji: "怒る",
  optimized_sent_index: "1937",
  optimized_voc_index: "1605",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1676",
  frequency: "12763",
  furigana: "ジャム",
  kana: "ジャム",
  kanji: "ジャム",
  optimized_sent_index: "572",
  optimized_voc_index: "1606",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1275",
  frequency: "5347",
  furigana: "独身[どくしん]",
  kana: "どくしん",
  kanji: "独身",
  optimized_sent_index: "1496",
  optimized_voc_index: "1607",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "669",
  frequency: "3900",
  furigana: "占[し]める",
  kana: "しめる",
  kanji: "占める",
  optimized_sent_index: "1543",
  optimized_voc_index: "1608",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "459",
  frequency: "3252",
  furigana: "処理[しょり]",
  kana: "しょり",
  kanji: "処理",
  optimized_sent_index: "1498",
  optimized_voc_index: "1609",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "887",
  frequency: "1488",
  furigana: "紹介[しょうかい]",
  kana: "しょうかい",
  kanji: "紹介",
  optimized_sent_index: "1499",
  optimized_voc_index: "1610",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1677",
  frequency: "10327",
  furigana: "スリッパ",
  kana: "スリッパ",
  kanji: "スリッパ",
  optimized_sent_index: "1675",
  optimized_voc_index: "1611",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "650",
  frequency: "2462",
  furigana: "招[まね]く",
  kana: "まねく",
  kanji: "招く",
  optimized_sent_index: "1500",
  optimized_voc_index: "1612",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1043",
  frequency: "4981",
  furigana: "招待[しょうたい]",
  kana: "しょうたい",
  kanji: "招待",
  optimized_sent_index: "1502",
  optimized_voc_index: "1613",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "857",
  frequency: "1140",
  furigana: "夫婦[ふうふ]",
  kana: "ふうふ",
  kanji: "夫婦",
  optimized_sent_index: "1504",
  optimized_voc_index: "1614",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1001",
  frequency: "515",
  furigana: "奥[おく]",
  kana: "おく",
  kanji: "奥",
  optimized_sent_index: "1721",
  optimized_voc_index: "1615",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1680",
  frequency: "10550",
  furigana: "トランプ",
  kana: "トランプ",
  kanji: "トランプ",
  optimized_sent_index: "880",
  optimized_voc_index: "1616",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1041",
  frequency: "994",
  furigana: "奥[おく]さん",
  kana: "おくさん",
  kanji: "奥さん",
  optimized_sent_index: "1507",
  optimized_voc_index: "1617",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1315",
  frequency: "3415",
  furigana: "皆[みな]さん",
  kana: "みなさん",
  kanji: "皆さん",
  optimized_sent_index: "1513",
  optimized_voc_index: "1618",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1551",
  frequency: "9950",
  furigana: "皆様[みなさま]",
  kana: "みなさま",
  kanji: "皆様",
  optimized_sent_index: "1514",
  optimized_voc_index: "1619",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1890",
  frequency: "1419",
  furigana: "誰[だれ]か",
  kana: "だれか",
  kanji: "誰か",
  optimized_sent_index: "1520",
  optimized_voc_index: "1620",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1688",
  frequency: "1141",
  furigana: "よろしい",
  kana: "よろしい",
  kanji: "よろしい",
  optimized_sent_index: "1687",
  optimized_voc_index: "1621",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1235",
  frequency: "16638",
  furigana: "国籍[こくせき]",
  kana: "こくせき",
  kanji: "国籍",
  optimized_sent_index: "1521",
  optimized_voc_index: "1622",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1099",
  frequency: "985",
  furigana: "愛[あい]",
  kana: "あい",
  kanji: "愛",
  optimized_sent_index: "1522",
  optimized_voc_index: "1623",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1332",
  frequency: "1824",
  furigana: "可愛[かわい]い",
  kana: "かわいい",
  kanji: "可愛い",
  optimized_sent_index: "1523",
  optimized_voc_index: "1624",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1262",
  frequency: "1521",
  furigana: "恋人[こいびと]",
  kana: "こいびと",
  kanji: "恋人",
  optimized_sent_index: "1525",
  optimized_voc_index: "1625",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1689",
  frequency: "53169",
  furigana: "ラッシュアワー",
  kana: "ラッシュアワー",
  kanji: "ラッシュアワー",
  optimized_sent_index: "1708",
  optimized_voc_index: "1626",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1274",
  frequency: "5554",
  furigana: "誕生日[たんじょうび]",
  kana: "たんじょうび",
  kanji: "誕生日",
  optimized_sent_index: "1527",
  optimized_voc_index: "1627",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1777",
  frequency: "32157",
  furigana: "祝日[しゅくじつ]",
  kana: "しゅくじつ",
  kanji: "祝日",
  optimized_sent_index: "1529",
  optimized_voc_index: "1628",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1823",
  frequency: "9961",
  furigana: "お 祝[いわ]い",
  kana: "おいわい",
  kanji: "お祝い",
  optimized_sent_index: "1530",
  optimized_voc_index: "1629",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "816",
  frequency: "440",
  furigana: "夢[ゆめ]",
  kana: "ゆめ",
  kanji: "夢",
  optimized_sent_index: "1714",
  optimized_voc_index: "1630",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1694",
  frequency: "4279",
  furigana: "カップ",
  kana: "カップ",
  kanji: "カップ",
  optimized_sent_index: "417",
  optimized_voc_index: "1631",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1090",
  frequency: "544",
  furigana: "泣[な]く",
  kana: "なく",
  kanji: "泣く",
  optimized_sent_index: "1532",
  optimized_voc_index: "1632",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "941",
  frequency: "641",
  furigana: "涙[なみだ]",
  kana: "なみだ",
  kanji: "涙",
  optimized_sent_index: "1533",
  optimized_voc_index: "1633",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "836",
  frequency: "1275",
  furigana: "喜[よろこ]ぶ",
  kana: "よろこぶ",
  kanji: "喜ぶ",
  optimized_sent_index: "1535",
  optimized_voc_index: "1634",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1237",
  frequency: "1715",
  furigana: "恥[は]ずかしい",
  kana: "はずかしい",
  kanji: "恥ずかしい",
  optimized_sent_index: "1536",
  optimized_voc_index: "1635",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1697",
  frequency: "33845",
  furigana: "スケート",
  kana: "スケート",
  kanji: "スケート",
  optimized_sent_index: "1268",
  optimized_voc_index: "1636",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1225",
  frequency: "4787",
  furigana: "弁当[べんとう]",
  kana: "べんとう",
  kanji: "弁当",
  optimized_sent_index: "1537",
  optimized_voc_index: "1637",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "981",
  frequency: "22256",
  furigana: "看護師[かんごし]",
  kana: "かんごし",
  kanji: "看護師",
  optimized_sent_index: "1540",
  optimized_voc_index: "1638",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "753",
  frequency: "1854",
  furigana: "患者[かんじゃ]",
  kana: "かんじゃ",
  kanji: "患者",
  optimized_sent_index: "1823",
  optimized_voc_index: "1639",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "691",
  frequency: "1329",
  furigana: "述[の]べる",
  kana: "のべる",
  kanji: "述べる",
  optimized_sent_index: "1646",
  optimized_voc_index: "1640",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1698",
  frequency: "896",
  furigana: "たくさん",
  kana: "たくさん",
  kanji: "たくさん",
  optimized_sent_index: "1277",
  optimized_voc_index: "1641",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "684",
  frequency: "2045",
  furigana: "訴[うった]える",
  kana: "うったえる",
  kanji: "訴える",
  optimized_sent_index: "1541",
  optimized_voc_index: "1642",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1255",
  frequency: "1660",
  furigana: "迷[まよ]う",
  kana: "まよう",
  kanji: "迷う",
  optimized_sent_index: "1542",
  optimized_voc_index: "1643",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1095",
  frequency: "2260",
  furigana: "迷惑[めいわく]",
  kana: "めいわく",
  kanji: "迷惑",
  optimized_sent_index: "1545",
  optimized_voc_index: "1644",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "481",
  frequency: "3623",
  furigana: "地域[ちいき]",
  kana: "ちいき",
  kanji: "地域",
  optimized_sent_index: "1546",
  optimized_voc_index: "1645",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1706",
  frequency: "21518",
  furigana: "ピクニック",
  kana: "ピクニック",
  kanji: "ピクニック",
  optimized_sent_index: "411",
  optimized_voc_index: "1646",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "500",
  frequency: "7715",
  furigana: "政権[せいけん]",
  kana: "せいけん",
  kanji: "政権",
  optimized_sent_index: "1550",
  optimized_voc_index: "1647",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "952",
  frequency: "4288",
  furigana: "贈[おく]る",
  kana: "おくる",
  kanji: "贈る",
  optimized_sent_index: "1551",
  optimized_voc_index: "1648",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1460",
  frequency: "8249",
  furigana: "贈[おく]り 物[もの]",
  kana: "おくりもの",
  kanji: "贈り物",
  optimized_sent_index: "1552",
  optimized_voc_index: "1649",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "524",
  frequency: "524",
  furigana: "与[あた]える",
  kana: "あたえる",
  kanji: "与える",
  optimized_sent_index: "1553",
  optimized_voc_index: "1650",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1711",
  frequency: "3248",
  furigana: "あちら",
  kana: "あちら",
  kanji: "あちら",
  optimized_sent_index: "412",
  optimized_voc_index: "1651",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1317",
  frequency: "12026",
  furigana: "貯金[ちょきん]",
  kana: "ちょきん",
  kanji: "貯金",
  optimized_sent_index: "1555",
  optimized_voc_index: "1652",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1189",
  frequency: "3462",
  furigana: "預[あず]ける",
  kana: "あずける",
  kanji: "預ける",
  optimized_sent_index: "1734",
  optimized_voc_index: "1653",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1319",
  frequency: "6323",
  furigana: "預[あず]かる",
  kana: "あずかる",
  kanji: "預かる",
  optimized_sent_index: "1557",
  optimized_voc_index: "1654",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1002",
  frequency: "2554",
  furigana: "得意[とくい]",
  kana: "とくい",
  kanji: "得意",
  optimized_sent_index: "1560",
  optimized_voc_index: "1655",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1716",
  frequency: "12681",
  furigana: "どきどき",
  kana: "どきどき",
  kanji: "どきどき",
  optimized_sent_index: "1019",
  optimized_voc_index: "1656",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1045",
  frequency: "1359",
  furigana: "燃[も]える",
  kana: "もえる",
  kanji: "燃える",
  optimized_sent_index: "1564",
  optimized_voc_index: "1657",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1288",
  frequency: "2861",
  furigana: "焼[や]ける",
  kana: "やける",
  kanji: "焼ける",
  optimized_sent_index: "1565",
  optimized_voc_index: "1658",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1778",
  frequency: "47902",
  furigana: "すき 焼[や]き",
  kana: "すきやき",
  kanji: "すき焼き",
  optimized_sent_index: "1566",
  optimized_voc_index: "1659",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1970",
  frequency: "1518",
  furigana: "焼[や]く",
  kana: "やく",
  kanji: "焼く",
  optimized_sent_index: "1568",
  optimized_voc_index: "1660",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1721",
  frequency: "7410",
  furigana: "まあまあ",
  kana: "まあまあ",
  kanji: "まあまあ",
  optimized_sent_index: "1223",
  optimized_voc_index: "1661",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1442",
  frequency: "2562",
  furigana: "乾[かわ]く",
  kana: "かわく",
  kanji: "乾く",
  optimized_sent_index: "1747",
  optimized_voc_index: "1662",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1467",
  frequency: "8361",
  furigana: "乾杯[かんぱい]",
  kana: "かんぱい",
  kanji: "乾杯",
  optimized_sent_index: "1569",
  optimized_voc_index: "1663",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1672",
  frequency: "17126",
  furigana: "乾[かわ]かす",
  kana: "かわかす",
  kanji: "乾かす",
  optimized_sent_index: "1570",
  optimized_voc_index: "1664",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1039",
  frequency: "8042",
  furigana: "新幹線[しんかんせん]",
  kana: "しんかんせん",
  kanji: "新幹線",
  optimized_sent_index: "1571",
  optimized_voc_index: "1665",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1722",
  frequency: "13264",
  furigana: "マフラー",
  kana: "マフラー",
  kanji: "マフラー",
  optimized_sent_index: "1192",
  optimized_voc_index: "1666",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1381",
  frequency: "3879",
  furigana: "素晴[すば]らしい",
  kana: "すばらしい",
  kanji: "素晴らしい",
  optimized_sent_index: "1574",
  optimized_voc_index: "1667",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "963",
  frequency: "3056",
  furigana: "海岸[かいがん]",
  kana: "かいがん",
  kanji: "海岸",
  optimized_sent_index: "1581",
  optimized_voc_index: "1668",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "734",
  frequency: "2040",
  furigana: "家庭[かてい]",
  kana: "かてい",
  kanji: "家庭",
  optimized_sent_index: "1575",
  optimized_voc_index: "1669",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1802",
  frequency: "833",
  furigana: "庭[にわ]",
  kana: "にわ",
  kanji: "庭",
  optimized_sent_index: "1584",
  optimized_voc_index: "1670",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1724",
  frequency: "18443",
  furigana: "アクセサリー",
  kana: "アクセサリー",
  kanji: "アクセサリー",
  optimized_sent_index: "1710",
  optimized_voc_index: "1671",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1176",
  frequency: "968",
  furigana: "桜[さくら]",
  kana: "さくら",
  kanji: "桜",
  optimized_sent_index: "1578",
  optimized_voc_index: "1672",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1088",
  frequency: "3119",
  furigana: "咲[さ]く",
  kana: "さく",
  kanji: "咲く",
  optimized_sent_index: "1577",
  optimized_voc_index: "1673",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1007",
  frequency: "899",
  furigana: "吹[ふ]く",
  kana: "ふく",
  kanji: "吹く",
  optimized_sent_index: "1579",
  optimized_voc_index: "1674",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1055",
  frequency: "2670",
  furigana: "散歩[さんぽ]",
  kana: "さんぽ",
  kanji: "散歩",
  optimized_sent_index: "1908",
  optimized_voc_index: "1675",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1725",
  frequency: "9843",
  furigana: "あくび",
  kana: "あくび",
  kanji: "あくび",
  optimized_sent_index: "895",
  optimized_voc_index: "1676",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1233",
  frequency: "5166",
  furigana: "植[う]える",
  kana: "うえる",
  kanji: "植える",
  optimized_sent_index: "1583",
  optimized_voc_index: "1677",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1091",
  frequency: "1709",
  furigana: "屋根[やね]",
  kana: "やね",
  kanji: "屋根",
  optimized_sent_index: "1585",
  optimized_voc_index: "1678",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1397",
  frequency: "12513",
  furigana: "黒板[こくばん]",
  kana: "こくばん",
  kanji: "黒板",
  optimized_sent_index: "1587",
  optimized_voc_index: "1679",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1567",
  frequency: "16599",
  furigana: "掲示板[けいじばん]",
  kana: "けいじばん",
  kanji: "掲示板",
  optimized_sent_index: "1588",
  optimized_voc_index: "1680",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1729",
  frequency: "14439",
  furigana: "からから",
  kana: "からから",
  kanji: "からから",
  optimized_sent_index: "1981",
  optimized_voc_index: "1681",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1216",
  frequency: "1376",
  furigana: "草[くさ]",
  kana: "くさ",
  kanji: "草",
  optimized_sent_index: "1592",
  optimized_voc_index: "1682",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1149",
  frequency: "1248",
  furigana: "葉[は]",
  kana: "は",
  kanji: "葉",
  optimized_sent_index: "1593",
  optimized_voc_index: "1683",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1766",
  frequency: "25594",
  furigana: "絵葉書[えはがき]",
  kana: "えはがき",
  kanji: "絵葉書",
  optimized_sent_index: "1594",
  optimized_voc_index: "1684",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1780",
  frequency: "32555",
  furigana: "はがき",
  kana: "はがき",
  kanji: "はがき",
  optimized_sent_index: "1595",
  optimized_voc_index: "1685",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1736",
  frequency: "5805",
  furigana: "ふらふら",
  kana: "ふらふら",
  kanji: "ふらふら",
  optimized_sent_index: "1089",
  optimized_voc_index: "1686",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1142",
  frequency: "1408",
  furigana: "吸[す]う",
  kana: "すう",
  kanji: "吸う",
  optimized_sent_index: "1602",
  optimized_voc_index: "1687",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "493",
  frequency: "11966",
  furigana: "普及[ふきゅう]",
  kana: "ふきゅう",
  kanji: "普及",
  optimized_sent_index: "1604",
  optimized_voc_index: "1688",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1294",
  frequency: "4557",
  furigana: "胃[い]",
  kana: "い",
  kanji: "胃",
  optimized_sent_index: "1607",
  optimized_voc_index: "1689",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1443",
  frequency: "2200",
  furigana: "皿[さら]",
  kana: "さら",
  kanji: "皿",
  optimized_sent_index: "1609",
  optimized_voc_index: "1690",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1739",
  frequency: "4035",
  furigana: "こぼす",
  kana: "こぼす",
  kanji: "こぼす",
  optimized_sent_index: "1738",
  optimized_voc_index: "1691",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1891",
  frequency: "414",
  furigana: "血[ち]",
  kana: "ち",
  kanji: "血",
  optimized_sent_index: "1610",
  optimized_voc_index: "1692",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "521",
  frequency: "1288",
  furigana: "内容[ないよう]",
  kana: "ないよう",
  kanji: "内容",
  optimized_sent_index: "1611",
  optimized_voc_index: "1693",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "622",
  frequency: "3784",
  furigana: "背景[はいけい]",
  kana: "はいけい",
  kanji: "背景",
  optimized_sent_index: "1613",
  optimized_voc_index: "1694",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1807",
  frequency: "1346",
  furigana: "骨[ほね]",
  kana: "ほね",
  kanji: "骨",
  optimized_sent_index: "1617",
  optimized_voc_index: "1695",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1740",
  frequency: "9690",
  furigana: "ランチ",
  kana: "ランチ",
  kanji: "ランチ",
  optimized_sent_index: "1372",
  optimized_voc_index: "1696",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1592",
  frequency: "3524",
  furigana: "滑[すべ]る",
  kana: "すべる",
  kanji: "滑る",
  optimized_sent_index: "1616",
  optimized_voc_index: "1697",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1389",
  frequency: "2194",
  furigana: "折[お]れる",
  kana: "おれる",
  kanji: "折れる",
  optimized_sent_index: "1727",
  optimized_voc_index: "1698",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1413",
  frequency: "2596",
  furigana: "折[お]る",
  kana: "おる",
  kanji: "折る",
  optimized_sent_index: "1911",
  optimized_voc_index: "1699",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "834",
  frequency: "2798",
  furigana: "健康[けんこう]",
  kana: "けんこう",
  kanji: "健康",
  optimized_sent_index: "1618",
  optimized_voc_index: "1700",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1741",
  frequency: "37876",
  furigana: "レシート",
  kana: "レシート",
  kanji: "レシート",
  optimized_sent_index: "1812",
  optimized_voc_index: "1701",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "803",
  frequency: "1309",
  furigana: "珍[めずら]しい",
  kana: "めずらしい",
  kanji: "珍しい",
  optimized_sent_index: "1620",
  optimized_voc_index: "1702",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "959",
  frequency: "2607",
  furigana: "撮[と]る",
  kana: "とる",
  kanji: "撮る",
  optimized_sent_index: "1622",
  optimized_voc_index: "1703",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "652",
  frequency: "742",
  furigana: "再[ふたた]び",
  kana: "ふたたび",
  kanji: "再び",
  optimized_sent_index: "1624",
  optimized_voc_index: "1704",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1516",
  frequency: "60517",
  furigana: "再来年[さらいねん]",
  kana: "さらいねん",
  kanji: "再来年",
  optimized_sent_index: "1625",
  optimized_voc_index: "1705",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1748",
  frequency: "22554",
  furigana: "チョーク",
  kana: "チョーク",
  kanji: "チョーク",
  optimized_sent_index: "1589",
  optimized_voc_index: "1706",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1861",
  frequency: "98300",
  furigana: "再来月[さらいげつ]",
  kana: "さらいげつ",
  kanji: "再来月",
  optimized_sent_index: "1626",
  optimized_voc_index: "1707",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1862",
  frequency: "74946",
  furigana: "再来週[さらいしゅう]",
  kana: "さらいしゅう",
  kanji: "再来週",
  optimized_sent_index: "1627",
  optimized_voc_index: "1708",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "851",
  frequency: "3870",
  furigana: "放送[ほうそう]",
  kana: "ほうそう",
  kanji: "放送",
  optimized_sent_index: "1628",
  optimized_voc_index: "1709",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "617",
  frequency: "2550",
  furigana: "装置[そうち]",
  kana: "そうち",
  kanji: "装置",
  optimized_sent_index: "1629",
  optimized_voc_index: "1710",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1750",
  frequency: "17475",
  furigana: "ティッシュ",
  kana: "ティッシュ",
  kanji: "ティッシュ",
  optimized_sent_index: "650",
  optimized_voc_index: "1711",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1563",
  frequency: "13946",
  furigana: "仮名[かな]",
  kana: "かな",
  kanji: "仮名",
  optimized_sent_index: "1630",
  optimized_voc_index: "1712",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1692",
  frequency: "117780",
  furigana: "送[おく]り 仮名[がな]",
  kana: "おくりがな",
  kanji: "送り仮名",
  optimized_sent_index: "1631",
  optimized_voc_index: "1713",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1215",
  frequency: "1297",
  furigana: "鏡[かがみ]",
  kana: "かがみ",
  kanji: "鏡",
  optimized_sent_index: "1769",
  optimized_voc_index: "1714",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1526",
  frequency: "4819",
  furigana: "悲[かな]しむ",
  kana: "かなしむ",
  kanji: "悲しむ",
  optimized_sent_index: "1632",
  optimized_voc_index: "1715",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1754",
  frequency: "3683",
  furigana: "ノック",
  kana: "ノック",
  kanji: "ノック",
  optimized_sent_index: "418",
  optimized_voc_index: "1716",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1252",
  frequency: "1735",
  furigana: "固[かた]い",
  kana: "かたい",
  kanji: "固い",
  optimized_sent_index: "1649",
  optimized_voc_index: "1717",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1097",
  frequency: "11305",
  furigana: "美術館[びじゅつかん]",
  kana: "びじゅつかん",
  kanji: "美術館",
  optimized_sent_index: "1636",
  optimized_voc_index: "1718",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1429",
  frequency: "2011",
  furigana: "美人[びじん]",
  kana: "びじん",
  kanji: "美人",
  optimized_sent_index: "1637",
  optimized_voc_index: "1719",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1684",
  frequency: "17641",
  furigana: "美容院[びよういん]",
  kana: "びよういん",
  kanji: "美容院",
  optimized_sent_index: "1770",
  optimized_voc_index: "1720",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1762",
  frequency: "2414",
  furigana: "よろしく",
  kana: "よろしく",
  kanji: "よろしく",
  optimized_sent_index: "1146",
  optimized_voc_index: "1721",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1168",
  frequency: "8524",
  furigana: "博物館[はくぶつかん]",
  kana: "はくぶつかん",
  kanji: "博物館",
  optimized_sent_index: "1639",
  optimized_voc_index: "1722",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "688",
  frequency: "11636",
  furigana: "開催[かいさい]",
  kana: "かいさい",
  kanji: "開催",
  optimized_sent_index: "1641",
  optimized_voc_index: "1723",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "539",
  frequency: "2991",
  furigana: "特徴[とくちょう]",
  kana: "とくちょう",
  kanji: "特徴",
  optimized_sent_index: "1642",
  optimized_voc_index: "1724",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "791",
  frequency: "745",
  furigana: "許[ゆる]す",
  kana: "ゆるす",
  kanji: "許す",
  optimized_sent_index: "1644",
  optimized_voc_index: "1725",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1771",
  frequency: "20976",
  furigana: "がらがら",
  kana: "がらがら",
  kanji: "がらがら",
  optimized_sent_index: "877",
  optimized_voc_index: "1726",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1686",
  frequency: "24294",
  furigana: "免許証[めんきょしょう]",
  kana: "めんきょしょう",
  kanji: "免許証",
  optimized_sent_index: "1645",
  optimized_voc_index: "1727",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "820",
  frequency: "2026",
  furigana: "教師[きょうし]",
  kana: "きょうし",
  kanji: "教師",
  optimized_sent_index: "1651",
  optimized_voc_index: "1728",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "735",
  frequency: "1585",
  furigana: "教授[きょうじゅ]",
  kana: "きょうじゅ",
  kanji: "教授",
  optimized_sent_index: "1655",
  optimized_voc_index: "1729",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "634",
  frequency: "873",
  furigana: "伝[つた]える",
  kana: "つたえる",
  kanji: "伝える",
  optimized_sent_index: "1657",
  optimized_voc_index: "1730",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1773",
  frequency: "12897",
  furigana: "ぎらぎら",
  kana: "ぎらぎら",
  kanji: "ぎらぎら",
  optimized_sent_index: "1304",
  optimized_voc_index: "1731",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1905",
  frequency: "1292",
  furigana: "鳥[とり]",
  kana: "とり",
  kanji: "鳥",
  optimized_sent_index: "1660",
  optimized_voc_index: "1732",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1265",
  frequency: "971",
  furigana: "鳴[な]る",
  kana: "なる",
  kanji: "鳴る",
  optimized_sent_index: "1661",
  optimized_voc_index: "1733",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1470",
  frequency: "3841",
  furigana: "鳴[な]く",
  kana: "なく",
  kanji: "鳴く",
  optimized_sent_index: "1662",
  optimized_voc_index: "1734",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "472",
  frequency: "86",
  furigana: "声[こえ]",
  kana: "こえ",
  kanji: "声",
  optimized_sent_index: "1664",
  optimized_voc_index: "1735",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1779",
  frequency: "2240",
  furigana: "そっち",
  kana: "そっち",
  kanji: "そっち",
  optimized_sent_index: "560",
  optimized_voc_index: "1736",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1109",
  frequency: "2940",
  furigana: "卵[たまご]",
  kana: "たまご",
  kanji: "卵",
  optimized_sent_index: "1666",
  optimized_voc_index: "1737",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "899",
  frequency: "672",
  furigana: "犬[いぬ]",
  kana: "いぬ",
  kanji: "犬",
  optimized_sent_index: "1864",
  optimized_voc_index: "1738",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "926",
  frequency: "387",
  furigana: "馬[うま]",
  kana: "うま",
  kanji: "馬",
  optimized_sent_index: "1892",
  optimized_voc_index: "1739",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1089",
  frequency: "4351",
  furigana: "駐車場[ちゅうしゃじょう]",
  kana: "ちゅうしゃじょう",
  kanji: "駐車場",
  optimized_sent_index: "1671",
  optimized_voc_index: "1740",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1783",
  frequency: "37293",
  furigana: "ピンポン",
  kana: "ピンポン",
  kanji: "ピンポン",
  optimized_sent_index: "469",
  optimized_voc_index: "1741",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1863",
  frequency: "2738",
  furigana: "騒[さわ]ぐ",
  kana: "さわぐ",
  kanji: "騒ぐ",
  optimized_sent_index: "1672",
  optimized_voc_index: "1742",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1177",
  frequency: "1981",
  furigana: "刺[さ]す",
  kana: "さす",
  kanji: "刺す",
  optimized_sent_index: "1785",
  optimized_voc_index: "1743",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1744",
  frequency: "13010",
  furigana: "刺身[さしみ]",
  kana: "さしみ",
  kanji: "刺身",
  optimized_sent_index: "1673",
  optimized_voc_index: "1744",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "558",
  frequency: "855",
  furigana: "激[はげ]しい",
  kana: "はげしい",
  kanji: "激しい",
  optimized_sent_index: "1674",
  optimized_voc_index: "1745",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1786",
  frequency: "25484",
  furigana: "ぺこぺこ",
  kana: "ぺこぺこ",
  kanji: "ぺこぺこ",
  optimized_sent_index: "438",
  optimized_voc_index: "1746",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "787",
  frequency: "454",
  furigana: "驚[おどろ]く",
  kana: "おどろく",
  kanji: "驚く",
  optimized_sent_index: "1679",
  optimized_voc_index: "1747",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "888",
  frequency: "786",
  furigana: "倒[たお]れる",
  kana: "たおれる",
  kanji: "倒れる",
  optimized_sent_index: "1683",
  optimized_voc_index: "1748",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1887",
  frequency: "2071",
  furigana: "倒[たお]す",
  kana: "たおす",
  kanji: "倒す",
  optimized_sent_index: "1684",
  optimized_voc_index: "1749",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "687",
  frequency: "4110",
  furigana: "傾向[けいこう]",
  kana: "けいこう",
  kanji: "傾向",
  optimized_sent_index: "1685",
  optimized_voc_index: "1750",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1787",
  frequency: "26860",
  furigana: "ぺらぺら",
  kana: "ぺらぺら",
  kanji: "ぺらぺら",
  optimized_sent_index: "1021",
  optimized_voc_index: "1751",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1342",
  frequency: "11464",
  furigana: "柔道[じゅうどう]",
  kana: "じゅうどう",
  kanji: "柔道",
  optimized_sent_index: "1688",
  optimized_voc_index: "1752",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1347",
  frequency: "3790",
  furigana: "柔[やわ]らかい",
  kana: "やわらかい",
  kanji: "柔らかい",
  optimized_sent_index: "1807",
  optimized_voc_index: "1753",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1607",
  frequency: "7625",
  furigana: "柔[やわ]らか",
  kana: "やわらか",
  kanji: "柔らか",
  optimized_sent_index: "1689",
  optimized_voc_index: "1754",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "618",
  frequency: "1887",
  furigana: "主張[しゅちょう]",
  kana: "しゅちょう",
  kanji: "主張",
  optimized_sent_index: "1690",
  optimized_voc_index: "1755",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1789",
  frequency: "16883",
  furigana: "レインコート",
  kana: "レインコート",
  kanji: "レインコート",
  optimized_sent_index: "769",
  optimized_voc_index: "1756",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1286",
  frequency: "3023",
  furigana: "引[ひ]っ 張[ぱ]る",
  kana: "ひっぱる",
  kanji: "引っ張る",
  optimized_sent_index: "1692",
  optimized_voc_index: "1757",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1629",
  frequency: "27996",
  furigana: "突[つ]き 当[あ]たる",
  kana: "つきあたる",
  kanji: "突き当たる",
  optimized_sent_index: "1694",
  optimized_voc_index: "1758",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1715",
  frequency: "15681",
  furigana: "突[つ]き 当[あ]たり",
  kana: "つきあたり",
  kanji: "突き当たり",
  optimized_sent_index: "1695",
  optimized_voc_index: "1759",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "814",
  frequency: "467",
  furigana: "壁[かべ]",
  kana: "かべ",
  kanji: "壁",
  optimized_sent_index: "1829",
  optimized_voc_index: "1760",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1790",
  frequency: "17692",
  furigana: "アイス",
  kana: "アイス",
  kanji: "アイス",
  optimized_sent_index: "597",
  optimized_voc_index: "1761",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1936",
  frequency: "2702",
  furigana: "弾[ひ]く",
  kana: "ひく",
  kanji: "弾く",
  optimized_sent_index: "1698",
  optimized_voc_index: "1762",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1302",
  frequency: "1958",
  furigana: "丸[まる]い",
  kana: "まるい",
  kanji: "丸い",
  optimized_sent_index: "1700",
  optimized_voc_index: "1763",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1963",
  frequency: "1426",
  furigana: "丸[まる]",
  kana: "まる",
  kanji: "丸",
  optimized_sent_index: "1701",
  optimized_voc_index: "1764",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "739",
  frequency: "1018",
  furigana: "攻撃[こうげき]",
  kana: "こうげき",
  kanji: "攻撃",
  optimized_sent_index: "1702",
  optimized_voc_index: "1765",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1791",
  frequency: ``,
  furigana: "いつごろ",
  kana: "いつごろ",
  kanji: "いつごろ",
  optimized_sent_index: "651",
  optimized_voc_index: "1766",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1990",
  frequency: "10851",
  furigana: "絶対[ぜったい]に",
  kana: "ぜったいに",
  kanji: "絶対に",
  optimized_sent_index: "1874",
  optimized_voc_index: "1767",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1446",
  frequency: "26827",
  furigana: "消防車[しょうぼうしゃ]",
  kana: "しょうぼうしゃ",
  kanji: "消防車",
  optimized_sent_index: "1703",
  optimized_voc_index: "1768",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1621",
  frequency: "1215",
  furigana: "嫌[いや]",
  kana: "いや",
  kanji: "嫌",
  optimized_sent_index: "1705",
  optimized_voc_index: "1769",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1678",
  frequency: "10474",
  furigana: "大嫌[だいきら]い",
  kana: "だいきらい",
  kanji: "大嫌い",
  optimized_sent_index: "1707",
  optimized_voc_index: "1770",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1792",
  frequency: "9567",
  furigana: "ウィスキー",
  kana: "ウィスキー",
  kanji: "ウィスキー",
  optimized_sent_index: "684",
  optimized_voc_index: "1771",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1612",
  frequency: "6667",
  furigana: "大抵[たいてい]",
  kana: "たいてい",
  kanji: "大抵",
  optimized_sent_index: "1869",
  optimized_voc_index: "1772",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1069",
  frequency: "2109",
  furigana: "大勢[おおぜい]",
  kana: "おおぜい",
  kanji: "大勢",
  optimized_sent_index: "1711",
  optimized_voc_index: "1773",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "483",
  frequency: "170",
  furigana: "姿[すがた]",
  kana: "すがた",
  kanji: "姿",
  optimized_sent_index: "1712",
  optimized_voc_index: "1774",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "645",
  frequency: "1754",
  furigana: "姿勢[しせい]",
  kana: "しせい",
  kanji: "姿勢",
  optimized_sent_index: "1713",
  optimized_voc_index: "1775",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1793",
  frequency: "90120",
  furigana: "エアメール",
  kana: "エアメール",
  kanji: "エアメール",
  optimized_sent_index: "1022",
  optimized_voc_index: "1776",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1125",
  frequency: "845",
  furigana: "恐[おそ]ろしい",
  kana: "おそろしい",
  kanji: "恐ろしい",
  optimized_sent_index: "1715",
  optimized_voc_index: "1777",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1214",
  frequency: "995",
  furigana: "怖[こわ]い",
  kana: "こわい",
  kanji: "怖い",
  optimized_sent_index: "1716",
  optimized_voc_index: "1778",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1133",
  frequency: "1867",
  furigana: "糸[いと]",
  kana: "いと",
  kanji: "糸",
  optimized_sent_index: "1731",
  optimized_voc_index: "1779",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1960",
  frequency: "1741",
  furigana: "孫[まご]",
  kana: "まご",
  kanji: "孫",
  optimized_sent_index: "1717",
  optimized_voc_index: "1780",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1797",
  frequency: "59483",
  furigana: "シャープペンシル",
  kana: "シャープペンシル",
  kanji: "シャープペンシル",
  optimized_sent_index: "439",
  optimized_voc_index: "1781",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1968",
  frequency: "11397",
  furigana: "木綿[もめん]",
  kana: "もめん",
  kanji: "木綿",
  optimized_sent_index: "1718",
  optimized_voc_index: "1782",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1482",
  frequency: "3907",
  furigana: "偉[えら]い",
  kana: "えらい",
  kanji: "偉い",
  optimized_sent_index: "1719",
  optimized_voc_index: "1783",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1901",
  frequency: "2623",
  furigana: "爪[つめ]",
  kana: "つめ",
  kanji: "爪",
  optimized_sent_index: "1720",
  optimized_voc_index: "1784",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1899",
  frequency: "1107",
  furigana: "机[つくえ]",
  kana: "つくえ",
  kanji: "机",
  optimized_sent_index: "1722",
  optimized_voc_index: "1785",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1798",
  frequency: "56799",
  furigana: "セロテープ",
  kana: "セロテープ",
  kanji: "セロテープ",
  optimized_sent_index: "1797",
  optimized_voc_index: "1786",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1308",
  frequency: "2825",
  furigana: "棚[たな]",
  kana: "たな",
  kanji: "棚",
  optimized_sent_index: "1725",
  optimized_voc_index: "1787",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1497",
  frequency: "8683",
  furigana: "本棚[ほんだな]",
  kana: "ほんだな",
  kanji: "本棚",
  optimized_sent_index: "1726",
  optimized_voc_index: "1788",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "543",
  frequency: "4255",
  furigana: "方針[ほうしん]",
  kana: "ほうしん",
  kanji: "方針",
  optimized_sent_index: "1730",
  optimized_voc_index: "1789",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1560",
  frequency: "8289",
  furigana: "釣[つ]る",
  kana: "つる",
  kanji: "釣る",
  optimized_sent_index: "1732",
  optimized_voc_index: "1790",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1810",
  frequency: "23826",
  furigana: "やけど",
  kana: "やけど",
  kanji: "やけど",
  optimized_sent_index: "1023",
  optimized_voc_index: "1791",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1825",
  frequency: "35598",
  furigana: "お 釣[つ]り",
  kana: "おつり",
  kanji: "お釣り",
  optimized_sent_index: "1733",
  optimized_voc_index: "1792",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1365",
  frequency: "1047",
  furigana: "鍵[かぎ]",
  kana: "かぎ",
  kanji: "鍵",
  optimized_sent_index: "1830",
  optimized_voc_index: "1793",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1700",
  frequency: "3443",
  furigana: "鍋[なべ]",
  kana: "なべ",
  kanji: "鍋",
  optimized_sent_index: "1736",
  optimized_voc_index: "1794",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1492",
  frequency: "14073",
  furigana: "寿司[すし]",
  kana: "すし",
  kanji: "寿司",
  optimized_sent_index: "1739",
  optimized_voc_index: "1795",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1813",
  frequency: "31355",
  furigana: "アイスコーヒー",
  kana: "アイスコーヒー",
  kanji: "アイスコーヒー",
  optimized_sent_index: "1813",
  optimized_voc_index: "1796",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1450",
  frequency: "3315",
  furigana: "泥棒[どろぼう]",
  kana: "どろぼう",
  kanji: "泥棒",
  optimized_sent_index: "1744",
  optimized_voc_index: "1797",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1973",
  frequency: "2343",
  furigana: "湯[ゆ]",
  kana: "ゆ",
  kanji: "湯",
  optimized_sent_index: "1927",
  optimized_voc_index: "1798",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1499",
  frequency: "12094",
  furigana: "沸[わ]く",
  kana: "わく",
  kanji: "沸く",
  optimized_sent_index: "1922",
  optimized_voc_index: "1799",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1763",
  frequency: "16883",
  furigana: "沸[わ]かす",
  kana: "わかす",
  kanji: "沸かす",
  optimized_sent_index: "1745",
  optimized_voc_index: "1800",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1818",
  frequency: "2937",
  furigana: "あっち",
  kana: "あっち",
  kanji: "あっち",
  optimized_sent_index: "626",
  optimized_voc_index: "1801",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1531",
  frequency: "20445",
  furigana: "洗濯機[せんたくき]",
  kana: "せんたくき",
  kanji: "洗濯機",
  optimized_sent_index: "1748",
  optimized_voc_index: "1802",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1875",
  frequency: "6333",
  furigana: "洗濯[せんたく]",
  kana: "せんたく",
  kanji: "洗濯",
  optimized_sent_index: "1749",
  optimized_voc_index: "1803",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1918",
  frequency: "2015",
  furigana: "濡[ぬ]れる",
  kana: "ぬれる",
  kanji: "濡れる",
  optimized_sent_index: "1750",
  optimized_voc_index: "1804",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1304",
  frequency: "3169",
  furigana: "喫茶店[きっさてん]",
  kana: "きっさてん",
  kanji: "喫茶店",
  optimized_sent_index: "1751",
  optimized_voc_index: "1805",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1819",
  frequency: "2252",
  furigana: "あんなに",
  kana: "あんなに",
  kanji: "あんなに",
  optimized_sent_index: "416",
  optimized_voc_index: "1806",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1701",
  frequency: "20056",
  furigana: "怠[なま]ける",
  kana: "なまける",
  kanji: "怠ける",
  optimized_sent_index: "1752",
  optimized_voc_index: "1807",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1441",
  frequency: "4296",
  furigana: "一生懸命[いっしょうけんめい]",
  kana: "いっしょうけんめい",
  kanji: "一生懸命",
  optimized_sent_index: "1753",
  optimized_voc_index: "1808",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1378",
  frequency: "8667",
  furigana: "休憩[きゅうけい]",
  kana: "きゅうけい",
  kanji: "休憩",
  optimized_sent_index: "1754",
  optimized_voc_index: "1809",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1047",
  frequency: "1367",
  furigana: "天井[てんじょう]",
  kana: "てんじょう",
  kanji: "天井",
  optimized_sent_index: "1755",
  optimized_voc_index: "1810",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1821",
  frequency: "4483",
  furigana: "いたずら",
  kana: "いたずら",
  kanji: "いたずら",
  optimized_sent_index: "430",
  optimized_voc_index: "1811",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1718",
  frequency: "19439",
  furigana: "納豆[なっとう]",
  kana: "なっとう",
  kanji: "納豆",
  optimized_sent_index: "1756",
  optimized_voc_index: "1812",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1491",
  frequency: "3546",
  furigana: "化粧[けしょう]",
  kana: "けしょう",
  kanji: "化粧",
  optimized_sent_index: "1759",
  optimized_voc_index: "1813",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1705",
  frequency: "2427",
  furigana: "畑[はたけ]",
  kana: "はたけ",
  kanji: "畑",
  optimized_sent_index: "1760",
  optimized_voc_index: "1814",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1484",
  frequency: "14367",
  furigana: "炊[た]く",
  kana: "たく",
  kanji: "炊く",
  optimized_sent_index: "1761",
  optimized_voc_index: "1815",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1822",
  frequency: "103602",
  furigana: "ウェートレス",
  kana: "ウェートレス",
  kanji: "ウェートレス",
  optimized_sent_index: "1601",
  optimized_voc_index: "1816",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1577",
  frequency: "35407",
  furigana: "自炊[じすい]",
  kana: "じすい",
  kanji: "自炊",
  optimized_sent_index: "1762",
  optimized_voc_index: "1817",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1641",
  frequency: "7006",
  furigana: "灰皿[はいざら]",
  kana: "はいざら",
  kanji: "灰皿",
  optimized_sent_index: "1763",
  optimized_voc_index: "1818",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1924",
  frequency: "3775",
  furigana: "灰[はい]",
  kana: "はい",
  kanji: "灰",
  optimized_sent_index: "1764",
  optimized_voc_index: "1819",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1925",
  frequency: "2116",
  furigana: "灰色[はいいろ]",
  kana: "はいいろ",
  kanji: "灰色",
  optimized_sent_index: "1765",
  optimized_voc_index: "1820",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1828",
  frequency: "2258",
  furigana: "おばさん",
  kana: "おばさん",
  kanji: "おばさん",
  optimized_sent_index: "881",
  optimized_voc_index: "1821",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1530",
  frequency: "20916",
  furigana: "西暦[せいれき]",
  kana: "せいれき",
  kanji: "西暦",
  optimized_sent_index: "1766",
  optimized_voc_index: "1822",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1396",
  frequency: "2197",
  furigana: "毛[け]",
  kana: "け",
  kanji: "毛",
  optimized_sent_index: "1904",
  optimized_voc_index: "1823",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1035",
  frequency: "560",
  furigana: "髪[かみ]",
  kana: "かみ",
  kanji: "髪",
  optimized_sent_index: "1768",
  optimized_voc_index: "1824",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1379",
  frequency: "1412",
  furigana: "舌[した]",
  kana: "した",
  kanji: "舌",
  optimized_sent_index: "1773",
  optimized_voc_index: "1825",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1848",
  frequency: "9755",
  furigana: "くし",
  kana: "くし",
  kanji: "くし",
  optimized_sent_index: "1771",
  optimized_voc_index: "1826",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1713",
  frequency: "2095",
  furigana: "臭[くさ]い",
  kana: "くさい",
  kanji: "臭い",
  optimized_sent_index: "1774",
  optimized_voc_index: "1827",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1138",
  frequency: "1101",
  furigana: "匂[にお]い",
  kana: "におい",
  kanji: "匂い",
  optimized_sent_index: "1775",
  optimized_voc_index: "1828",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1589",
  frequency: "561",
  furigana: "居[い]る",
  kana: "いる",
  kanji: "居る",
  optimized_sent_index: "1776",
  optimized_voc_index: "1829",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1510",
  frequency: "5687",
  furigana: "履[は]く",
  kana: "はく",
  kanji: "履く",
  optimized_sent_index: "1778",
  optimized_voc_index: "1830",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1850",
  frequency: "29580",
  furigana: "クリーニング",
  kana: "クリーニング",
  kanji: "クリーニング",
  optimized_sent_index: "419",
  optimized_voc_index: "1831",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "956",
  frequency: "1452",
  furigana: "戸[と]",
  kana: "と",
  kanji: "戸",
  optimized_sent_index: "1779",
  optimized_voc_index: "1832",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1558",
  frequency: "26163",
  furigana: "扇風機[せんぷうき]",
  kana: "せんぷうき",
  kanji: "扇風機",
  optimized_sent_index: "1780",
  optimized_voc_index: "1833",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1757",
  frequency: "4629",
  furigana: "豚[ぶた]",
  kana: "ぶた",
  kanji: "豚",
  optimized_sent_index: "1782",
  optimized_voc_index: "1834",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1946",
  frequency: "22292",
  furigana: "豚肉[ぶたにく]",
  kana: "ぶたにく",
  kanji: "豚肉",
  optimized_sent_index: "1783",
  optimized_voc_index: "1835",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1854",
  frequency: "10179",
  furigana: "ごちそう",
  kana: "ごちそう",
  kanji: "ごちそう",
  optimized_sent_index: "1079",
  optimized_voc_index: "1836",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1913",
  frequency: "5293",
  furigana: "鶏[にわとり]",
  kana: "にわとり",
  kanji: "鶏",
  optimized_sent_index: "1784",
  optimized_voc_index: "1837",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1459",
  frequency: "4434",
  furigana: "腕時計[うでどけい]",
  kana: "うでどけい",
  kanji: "腕時計",
  optimized_sent_index: "1786",
  optimized_voc_index: "1838",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1824",
  frequency: "8055",
  furigana: "お 菓子[かし]",
  kana: "おかし",
  kanji: "お菓子",
  optimized_sent_index: "1789",
  optimized_voc_index: "1839",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1667",
  frequency: "6324",
  furigana: "お 辞儀[じぎ]",
  kana: "おじぎ",
  kanji: "お辞儀",
  optimized_sent_index: "1791",
  optimized_voc_index: "1840",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1855",
  frequency: ``,
  furigana: "ごちそうする",
  kana: "ごちそうする",
  kanji: "ごちそうする",
  optimized_sent_index: "478",
  optimized_voc_index: "1841",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1703",
  frequency: "24565",
  furigana: "寝坊[ねぼう]",
  kana: "ねぼう",
  kanji: "寝坊",
  optimized_sent_index: "1792",
  optimized_voc_index: "1842",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1930",
  frequency: "2915",
  furigana: "旗[はた]",
  kana: "はた",
  kanji: "旗",
  optimized_sent_index: "1793",
  optimized_voc_index: "1843",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1289",
  frequency: "6948",
  furigana: "鉛筆[えんぴつ]",
  kana: "えんぴつ",
  kanji: "鉛筆",
  optimized_sent_index: "1794",
  optimized_voc_index: "1844",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1606",
  frequency: "14100",
  furigana: "万年筆[まんねんひつ]",
  kana: "まんねんひつ",
  kanji: "万年筆",
  optimized_sent_index: "1795",
  optimized_voc_index: "1845",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1857",
  frequency: "4279",
  furigana: "こぼれる",
  kana: "こぼれる",
  kanji: "こぼれる",
  optimized_sent_index: "1534",
  optimized_voc_index: "1846",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1036",
  frequency: "1162",
  furigana: "箱[はこ]",
  kana: "はこ",
  kanji: "箱",
  optimized_sent_index: "1796",
  optimized_voc_index: "1847",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1760",
  frequency: "31509",
  furigana: "本箱[ほんばこ]",
  kana: "ほんばこ",
  kanji: "本箱",
  optimized_sent_index: "1799",
  optimized_voc_index: "1848",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1409",
  frequency: "4866",
  furigana: "手袋[てぶくろ]",
  kana: "てぶくろ",
  kanji: "手袋",
  optimized_sent_index: "1801",
  optimized_voc_index: "1849",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1805",
  frequency: "1832",
  furigana: "袋[ふくろ]",
  kana: "ふくろ",
  kanji: "袋",
  optimized_sent_index: "1802",
  optimized_voc_index: "1850",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1859",
  frequency: "1240",
  furigana: "こんなに",
  kana: "こんなに",
  kanji: "こんなに",
  optimized_sent_index: "835",
  optimized_voc_index: "1851",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1263",
  frequency: "3757",
  furigana: "財布[さいふ]",
  kana: "さいふ",
  kanji: "財布",
  optimized_sent_index: "1806",
  optimized_voc_index: "1852",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1421",
  frequency: "3860",
  furigana: "毛布[もうふ]",
  kana: "もうふ",
  kanji: "毛布",
  optimized_sent_index: "1808",
  optimized_voc_index: "1853",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1454",
  frequency: "2884",
  furigana: "布団[ふとん]",
  kana: "ふとん",
  kanji: "布団",
  optimized_sent_index: "1884",
  optimized_voc_index: "1854",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1326",
  frequency: "24241",
  furigana: "小包[こづつみ]",
  kana: "こづつみ",
  kanji: "小包",
  optimized_sent_index: "1814",
  optimized_voc_index: "1855",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1860",
  frequency: "57176",
  furigana: "ざあざあ",
  kana: "ざあざあ",
  kanji: "ざあざあ",
  optimized_sent_index: "762",
  optimized_voc_index: "1856",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1749",
  frequency: "1096",
  furigana: "包[つつ]む",
  kana: "つつむ",
  kanji: "包む",
  optimized_sent_index: "1815",
  optimized_voc_index: "1857",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "922",
  frequency: "2726",
  furigana: "飾[かざ]る",
  kana: "かざる",
  kanji: "飾る",
  optimized_sent_index: "1816",
  optimized_voc_index: "1858",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1425",
  frequency: "4921",
  furigana: "手帳[てちょう]",
  kana: "てちょう",
  kanji: "手帳",
  optimized_sent_index: "1817",
  optimized_voc_index: "1859",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1519",
  frequency: "19163",
  furigana: "電話帳[でんわちょう]",
  kana: "でんわちょう",
  kanji: "電話帳",
  optimized_sent_index: "1818",
  optimized_voc_index: "1860",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1868",
  frequency: "20397",
  furigana: "ジャガイモ",
  kana: "ジャガイモ",
  kanji: "ジャガイモ",
  optimized_sent_index: "573",
  optimized_voc_index: "1861",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1203",
  frequency: "7433",
  furigana: "牛乳[ぎゅうにゅう]",
  kana: "ぎゅうにゅう",
  kanji: "牛乳",
  optimized_sent_index: "1819",
  optimized_voc_index: "1862",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "958",
  frequency: "977",
  furigana: "玄関[げんかん]",
  kana: "げんかん",
  kanji: "玄関",
  optimized_sent_index: "1820",
  optimized_voc_index: "1863",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1809",
  frequency: "2458",
  furigana: "眼鏡[めがね]",
  kana: "めがね",
  kanji: "眼鏡",
  optimized_sent_index: "1822",
  optimized_voc_index: "1864",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1920",
  frequency: "4792",
  furigana: "眠[ねむ]い",
  kana: "ねむい",
  kanji: "眠い",
  optimized_sent_index: "1825",
  optimized_voc_index: "1865",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1880",
  frequency: "2351",
  furigana: "ソファ",
  kana: "ソファ",
  kanji: "ソファ",
  optimized_sent_index: "662",
  optimized_voc_index: "1866",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1921",
  frequency: "758",
  furigana: "眠[ねむ]る",
  kana: "ねむる",
  kanji: "眠る",
  optimized_sent_index: "1826",
  optimized_voc_index: "1867",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1330",
  frequency: "3619",
  furigana: "封筒[ふうとう]",
  kana: "ふうとう",
  kanji: "封筒",
  optimized_sent_index: "1828",
  optimized_voc_index: "1868",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1367",
  frequency: "807",
  furigana: "出[で]かける",
  kana: "でかける",
  kanji: "出かける",
  optimized_sent_index: "1831",
  optimized_voc_index: "1869",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1625",
  frequency: "222",
  furigana: "かかる",
  kana: "かかる",
  kanji: "かかる",
  optimized_sent_index: "1833",
  optimized_voc_index: "1870",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1889",
  frequency: "1317",
  furigana: "煙草[たばこ]",
  kana: "たばこ",
  kanji: "煙草",
  optimized_sent_index: "1603",
  optimized_voc_index: "1871",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1712",
  frequency: "68263",
  furigana: "掛[か]け 算[ざん]",
  kana: "かけざん",
  kanji: "掛け算",
  optimized_sent_index: "1834",
  optimized_voc_index: "1872",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1926",
  frequency: "4477",
  furigana: "拍手[はくしゅ]",
  kana: "はくしゅ",
  kanji: "拍手",
  optimized_sent_index: "1835",
  optimized_voc_index: "1873",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1220",
  frequency: "2926",
  furigana: "掃除[そうじ]",
  kana: "そうじ",
  kanji: "掃除",
  optimized_sent_index: "1837",
  optimized_voc_index: "1874",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1781",
  frequency: "11833",
  furigana: "掃[は]く",
  kana: "はく",
  kanji: "掃く",
  optimized_sent_index: "1881",
  optimized_voc_index: "1875",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1896",
  frequency: "688",
  furigana: "ちょうど",
  kana: "ちょうど",
  kanji: "ちょうど",
  optimized_sent_index: "587",
  optimized_voc_index: "1876",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1876",
  frequency: "29809",
  furigana: "掃除機[そうじき]",
  kana: "そうじき",
  kanji: "掃除機",
  optimized_sent_index: "1838",
  optimized_voc_index: "1877",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1064",
  frequency: "868",
  furigana: "握[にぎ]る",
  kana: "にぎる",
  kanji: "握る",
  optimized_sent_index: "1839",
  optimized_voc_index: "1878",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1251",
  frequency: "5336",
  furigana: "握手[あくしゅ]",
  kana: "あくしゅ",
  kanji: "握手",
  optimized_sent_index: "1840",
  optimized_voc_index: "1879",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "949",
  frequency: "920",
  furigana: "迎[むか]える",
  kana: "むかえる",
  kanji: "迎える",
  optimized_sent_index: "1841",
  optimized_voc_index: "1880",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1897",
  frequency: "196",
  furigana: "ちょっと",
  kana: "ちょっと",
  kanji: "ちょっと",
  optimized_sent_index: "1468",
  optimized_voc_index: "1881",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1728",
  frequency: "24009",
  furigana: "お 巡[まわ]りさん",
  kana: "おまわりさん",
  kanji: "お巡りさん",
  optimized_sent_index: "1842",
  optimized_voc_index: "1882",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1371",
  frequency: "965",
  furigana: "いくつ",
  kana: "いくつ",
  kanji: "いくつ",
  optimized_sent_index: "1844",
  optimized_voc_index: "1883",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1765",
  frequency: "16541",
  furigana: "幾[いく]ら",
  kana: "いくら",
  kanji: "幾ら",
  optimized_sent_index: "1962",
  optimized_voc_index: "1884",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1517",
  frequency: "1217",
  furigana: "冗談[じょうだん]",
  kana: "じょうだん",
  kanji: "冗談",
  optimized_sent_index: "1849",
  optimized_voc_index: "1885",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1898",
  frequency: "124",
  furigana: "つく",
  kana: "つく",
  kanji: "つく",
  optimized_sent_index: "563",
  optimized_voc_index: "1886",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "943",
  frequency: "906",
  furigana: "穴[あな]",
  kana: "あな",
  kanji: "穴",
  optimized_sent_index: "1955",
  optimized_voc_index: "1887",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1227",
  frequency: "2953",
  furigana: "寂[さび]しい",
  kana: "さびしい",
  kanji: "寂しい",
  optimized_sent_index: "1850",
  optimized_voc_index: "1888",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1384",
  frequency: "3276",
  furigana: "丁寧[ていねい]",
  kana: "ていねい",
  kanji: "丁寧",
  optimized_sent_index: "1851",
  optimized_voc_index: "1889",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1418",
  frequency: "3142",
  furigana: "可哀相[かわいそう]",
  kana: "かわいそう",
  kanji: "かわいそう",
  optimized_sent_index: "1853",
  optimized_voc_index: "1890",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1903",
  frequency: "42439",
  furigana: "てんぷら",
  kana: "てんぷら",
  kanji: "てんぷら",
  optimized_sent_index: "440",
  optimized_voc_index: "1891",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1775",
  frequency: "2883",
  furigana: "怪我[けが]",
  kana: "けが",
  kanji: "怪我",
  optimized_sent_index: "1855",
  optimized_voc_index: "1892",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1234",
  frequency: "1902",
  furigana: "我慢[がまん]",
  kana: "がまん",
  kanji: "我慢",
  optimized_sent_index: "1858",
  optimized_voc_index: "1893",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1356",
  frequency: "9630",
  furigana: "幼稚園[ようちえん]",
  kana: "ようちえん",
  kanji: "幼稚園",
  optimized_sent_index: "1859",
  optimized_voc_index: "1894",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1185",
  frequency: "1739",
  furigana: "隠[かく]れる",
  kana: "かくれる",
  kanji: "隠れる",
  optimized_sent_index: "1861",
  optimized_voc_index: "1895",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1906",
  frequency: "21871",
  furigana: "とんとん",
  kana: "とんとん",
  kanji: "とんとん",
  optimized_sent_index: "1772",
  optimized_voc_index: "1896",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1683",
  frequency: "21596",
  furigana: "日陰[ひかげ]",
  kana: "ひかげ",
  kanji: "日陰",
  optimized_sent_index: "1862",
  optimized_voc_index: "1897",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1285",
  frequency: "1062",
  furigana: "随分[ずいぶん]",
  kana: "ずいぶん",
  kanji: "随分",
  optimized_sent_index: "1863",
  optimized_voc_index: "1898",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1173",
  frequency: "2969",
  furigana: "頑張[がんば]る",
  kana: "がんばる",
  kanji: "頑張る",
  optimized_sent_index: "1866",
  optimized_voc_index: "1899",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "427",
  frequency: "466",
  furigana: "頃[ころ]",
  kana: "ころ",
  kanji: "頃",
  optimized_sent_index: "1867",
  optimized_voc_index: "1900",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1916",
  frequency: "20113",
  furigana: "人参[にんじん]",
  kana: "にんじん",
  kanji: "人参",
  optimized_sent_index: "1709",
  optimized_voc_index: "1901",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1856",
  frequency: "3602",
  furigana: "この 頃[ごろ]",
  kana: "このごろ",
  kanji: "この頃",
  optimized_sent_index: "1870",
  optimized_voc_index: "1902",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1570",
  frequency: "34937",
  furigana: "消防署[しょうぼうしょ]",
  kana: "しょうぼうしょ",
  kanji: "消防署",
  optimized_sent_index: "1871",
  optimized_voc_index: "1903",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1081",
  frequency: "863",
  furigana: "尋[たず]ねる",
  kana: "たずねる",
  kanji: "尋ねる",
  optimized_sent_index: "1872",
  optimized_voc_index: "1904",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1772",
  frequency: "15043",
  furigana: "缶詰[かんづめ]",
  kana: "かんづめ",
  kanji: "缶詰",
  optimized_sent_index: "1875",
  optimized_voc_index: "1905",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1917",
  frequency: "18693",
  furigana: "ぬるい",
  kana: "ぬるい",
  kanji: "ぬるい",
  optimized_sent_index: "1925",
  optimized_voc_index: "1906",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1842",
  frequency: "6560",
  furigana: "缶[かん]",
  kana: "かん",
  kanji: "缶",
  optimized_sent_index: "1876",
  optimized_voc_index: "1907",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1372",
  frequency: "4116",
  furigana: "腐[くさ]る",
  kana: "くさる",
  kanji: "腐る",
  optimized_sent_index: "1877",
  optimized_voc_index: "1908",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1532",
  frequency: "9391",
  furigana: "豆腐[とうふ]",
  kana: "とうふ",
  kanji: "豆腐",
  optimized_sent_index: "1878",
  optimized_voc_index: "1909",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1645",
  frequency: "572",
  furigana: "床[ゆか]",
  kana: "ゆか",
  kanji: "床",
  optimized_sent_index: "1879",
  optimized_voc_index: "1910",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1923",
  frequency: "3297",
  furigana: "パーセント",
  kana: "パーセント",
  kanji: "パーセント",
  optimized_sent_index: "1873",
  optimized_voc_index: "1911",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1656",
  frequency: "11517",
  furigana: "床屋[とこや]",
  kana: "とこや",
  kanji: "床屋",
  optimized_sent_index: "1880",
  optimized_voc_index: "1912",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1221",
  frequency: "1637",
  furigana: "畳[たたみ]",
  kana: "たたみ",
  kanji: "畳",
  optimized_sent_index: "1882",
  optimized_voc_index: "1913",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1679",
  frequency: "10794",
  furigana: "畳[たた]む",
  kana: "たたむ",
  kanji: "畳む",
  optimized_sent_index: "1883",
  optimized_voc_index: "1914",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1522",
  frequency: "8285",
  furigana: "干[ほ]す",
  kana: "ほす",
  kanji: "干す",
  optimized_sent_index: "1885",
  optimized_voc_index: "1915",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1937",
  frequency: "5371",
  furigana: "ひざ",
  kana: "ひざ",
  kanji: "ひざ",
  optimized_sent_index: "1856",
  optimized_voc_index: "1916",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1287",
  frequency: "1773",
  furigana: "帽子[ぼうし]",
  kana: "ぼうし",
  kanji: "帽子",
  optimized_sent_index: "1887",
  optimized_voc_index: "1917",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1187",
  frequency: "6233",
  furigana: "ぜひ",
  kana: "ぜひ",
  kanji: "ぜひ",
  optimized_sent_index: "1889",
  optimized_voc_index: "1918",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1217",
  frequency: "16982",
  furigana: "敬語[けいご]",
  kana: "けいご",
  kanji: "敬語",
  optimized_sent_index: "1890",
  optimized_voc_index: "1919",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1229",
  frequency: "2972",
  furigana: "尊敬[そんけい]",
  kana: "そんけい",
  kanji: "尊敬",
  optimized_sent_index: "1909",
  optimized_voc_index: "1920",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1938",
  frequency: "14514",
  furigana: "ひじ",
  kana: "ひじ",
  kanji: "ひじ",
  optimized_sent_index: "1857",
  optimized_voc_index: "1921",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1131",
  frequency: "3199",
  furigana: "敷[し]く",
  kana: "しく",
  kanji: "敷く",
  optimized_sent_index: "1891",
  optimized_voc_index: "1922",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1839",
  frequency: "1956",
  furigana: "雷[かみなり]",
  kana: "かみなり",
  kanji: "雷",
  optimized_sent_index: "1893",
  optimized_voc_index: "1923",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1985",
  frequency: "5460",
  furigana: "零[れい]",
  kana: "れい",
  kanji: "零",
  optimized_sent_index: "1894",
  optimized_voc_index: "1924",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1866",
  frequency: "14119",
  furigana: "仕舞[しま]う",
  kana: "しまう",
  kanji: "仕舞う",
  optimized_sent_index: "1895",
  optimized_voc_index: "1925",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1940",
  frequency: "9153",
  furigana: "ひも",
  kana: "ひも",
  kanji: "ひも",
  optimized_sent_index: "1964",
  optimized_voc_index: "1926",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1213",
  frequency: "2233",
  furigana: "踊[おど]る",
  kana: "おどる",
  kanji: "踊る",
  optimized_sent_index: "1896",
  optimized_voc_index: "1927",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1297",
  frequency: "4535",
  furigana: "踊[おど]り",
  kana: "おどり",
  kanji: "踊り",
  optimized_sent_index: "1897",
  optimized_voc_index: "1928",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1062",
  frequency: "1484",
  furigana: "踏[ふ]む",
  kana: "ふむ",
  kanji: "踏む",
  optimized_sent_index: "1898",
  optimized_voc_index: "1929",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1487",
  frequency: "28754",
  furigana: "踏切[ふみきり]",
  kana: "ふみきり",
  kanji: "踏切",
  optimized_sent_index: "1899",
  optimized_voc_index: "1930",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1958",
  frequency: "3937",
  furigana: "まく",
  kana: "まく",
  kanji: "まく",
  optimized_sent_index: "1758",
  optimized_voc_index: "1931",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1199",
  frequency: "1790",
  furigana: "蹴[け]る",
  kana: "ける",
  kanji: "蹴る",
  optimized_sent_index: "1900",
  optimized_voc_index: "1932",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1046",
  frequency: "2660",
  furigana: "食堂[しょくどう]",
  kana: "しょくどう",
  kanji: "食堂",
  optimized_sent_index: "1901",
  optimized_voc_index: "1933",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1184",
  frequency: "1012",
  furigana: "猫[ねこ]",
  kana: "ねこ",
  kanji: "猫",
  optimized_sent_index: "1903",
  optimized_voc_index: "1934",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "584",
  frequency: "2141",
  furigana: "文章[ぶんしょう]",
  kana: "ぶんしょう",
  kanji: "文章",
  optimized_sent_index: "1905",
  optimized_voc_index: "1935",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1969",
  frequency: "27510",
  furigana: "やかん",
  kana: "やかん",
  kanji: "やかん",
  optimized_sent_index: "1746",
  optimized_voc_index: "1936",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1870",
  frequency: "6643",
  furigana: "丈夫[じょうぶ]",
  kana: "じょうぶ",
  kanji: "丈夫",
  optimized_sent_index: "1915",
  optimized_voc_index: "1937",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1961",
  frequency: "100",
  furigana: "また",
  kana: "また",
  kanji: "また",
  optimized_sent_index: "448",
  optimized_voc_index: "1938",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1339",
  frequency: "5167",
  furigana: "お 祖父[じい]さん",
  kana: "おじいさん",
  kanji: "お祖父さん",
  optimized_sent_index: "1910",
  optimized_voc_index: "1939",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1827",
  frequency: "6866",
  furigana: "お 祖母[ばあ]さん",
  kana: "おばあさん",
  kanji: "お祖母さん",
  optimized_sent_index: "1914",
  optimized_voc_index: "1940",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1980",
  frequency: "13192",
  furigana: "ようこそ",
  kana: "ようこそ",
  kanji: "ようこそ",
  optimized_sent_index: "421",
  optimized_voc_index: "1941",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1879",
  frequency: "2542",
  furigana: "祖父[そふ]",
  kana: "そふ",
  kanji: "祖父",
  optimized_sent_index: "1916",
  optimized_voc_index: "1942",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1881",
  frequency: "3293",
  furigana: "祖母[そぼ]",
  kana: "そぼ",
  kanji: "祖母",
  optimized_sent_index: "1917",
  optimized_voc_index: "1943",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1505",
  frequency: "1949",
  furigana: "邪魔[じゃま]",
  kana: "じゃま",
  kanji: "邪魔",
  optimized_sent_index: "1919",
  optimized_voc_index: "1944",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1834",
  frequency: "42249",
  furigana: "風邪薬[かぜぐすり]",
  kana: "かぜぐすり",
  kanji: "風邪薬",
  optimized_sent_index: "1921",
  optimized_voc_index: "1945",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1987",
  frequency: "137227",
  furigana: "ウェーター",
  kana: "ウェーター",
  kanji: "ウェーター",
  optimized_sent_index: "781",
  optimized_voc_index: "1946",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1806",
  frequency: "33230",
  furigana: "風呂屋[ふろや]",
  kana: "ふろや",
  kanji: "風呂屋",
  optimized_sent_index: "1924",
  optimized_voc_index: "1947",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1950",
  frequency: "3087",
  furigana: "風呂[ふろ]",
  kana: "ふろ",
  kanji: "風呂",
  optimized_sent_index: "1926",
  optimized_voc_index: "1948",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "485",
  frequency: "881",
  furigana: "昭和[しょうわ]",
  kana: "しょうわ",
  kanji: "昭和",
  optimized_sent_index: "1928",
  optimized_voc_index: "1949",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1966",
  frequency: "2579",
  furigana: "紫[むらさき]",
  kana: "むらさき",
  kanji: "紫",
  optimized_sent_index: "1929",
  optimized_voc_index: "1950",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1991",
  frequency: "877",
  furigana: "そんなに",
  kana: "そんなに",
  kanji: "そんなに",
  optimized_sent_index: "542",
  optimized_voc_index: "1951",
  partOfSpeech: "Adverb"
}, {

  alt_spelling: {},
  core_index: "1504",
  frequency: "4892",
  furigana: "紅茶[こうちゃ]",
  kana: "こうちゃ",
  kanji: "紅茶",
  optimized_sent_index: "1931",
  optimized_voc_index: "1952",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1476",
  frequency: "12324",
  furigana: "梅雨[つゆ]",
  kana: "つゆ",
  kanji: "梅雨",
  optimized_sent_index: "1932",
  optimized_voc_index: "1953",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1723",
  frequency: "6384",
  furigana: "桃[もも]",
  kana: "もも",
  kanji: "桃",
  optimized_sent_index: "1933",
  optimized_voc_index: "1954",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1180",
  frequency: "3917",
  furigana: "遭[あ]う",
  kana: "あう",
  kanji: "遭う",
  optimized_sent_index: "1934",
  optimized_voc_index: "1955",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1959",
  frequency: "3803",
  furigana: "枕[まくら]",
  kana: "まくら",
  kanji: "枕",
  optimized_sent_index: "1935",
  optimized_voc_index: "1956",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1411",
  frequency: "823",
  furigana: "嘘[うそ]",
  kana: "うそ",
  kanji: "嘘",
  optimized_sent_index: "1936",
  optimized_voc_index: "1957",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1412",
  frequency: "2693",
  furigana: "遠慮[えんりょ]",
  kana: "えんりょ",
  kanji: "遠慮",
  optimized_sent_index: "1938",
  optimized_voc_index: "1958",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1865",
  frequency: "2798",
  furigana: "叱[しか]る",
  kana: "しかる",
  kanji: "叱る",
  optimized_sent_index: "1939",
  optimized_voc_index: "1959",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1366",
  frequency: "3603",
  furigana: "傘[かさ]",
  kana: "かさ",
  kanji: "傘",
  optimized_sent_index: "1940",
  optimized_voc_index: "1960",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1423",
  frequency: "41087",
  furigana: "おじょうさん",
  kana: "おじょうさん",
  kanji: "おじょうさん",
  optimized_sent_index: "1941",
  optimized_voc_index: "1961",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1452",
  frequency: "22640",
  furigana: "年賀状[ねんがじょう]",
  kana: "ねんがじょう",
  kanji: "年賀状",
  optimized_sent_index: "1942",
  optimized_voc_index: "1962",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1911",
  frequency: "7659",
  furigana: "賑[にぎ]やか",
  kana: "にぎやか",
  kanji: "賑やか",
  optimized_sent_index: "1943",
  optimized_voc_index: "1963",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1524",
  frequency: "7128",
  furigana: "蚊[か]",
  kana: "か",
  kanji: "蚊",
  optimized_sent_index: "1944",
  optimized_voc_index: "1964",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1944",
  frequency: "3213",
  furigana: "拭[ふ]く",
  kana: "ふく",
  kanji: "拭く",
  optimized_sent_index: "1945",
  optimized_voc_index: "1965",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1079",
  frequency: "1257",
  furigana: "挨拶[あいさつ]",
  kana: "あいさつ",
  kanji: "挨拶",
  optimized_sent_index: "1947",
  optimized_voc_index: "1966",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "582",
  frequency: "3441",
  furigana: "伴[ともな]う",
  kana: "ともなう",
  kanji: "伴う",
  optimized_sent_index: "1948",
  optimized_voc_index: "1967",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1073",
  frequency: "1314",
  furigana: "巻[ま]く",
  kana: "まく",
  kanji: "巻く",
  optimized_sent_index: "1949",
  optimized_voc_index: "1968",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1049",
  frequency: "1503",
  furigana: "靴[くつ]",
  kana: "くつ",
  kanji: "靴",
  optimized_sent_index: "1957",
  optimized_voc_index: "1969",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1528",
  frequency: "7356",
  furigana: "靴下[くつした]",
  kana: "くつした",
  kanji: "靴下",
  optimized_sent_index: "1961",
  optimized_voc_index: "1970",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1310",
  frequency: "5011",
  furigana: "磨[みが]く",
  kana: "みがく",
  kanji: "磨く",
  optimized_sent_index: "1965",
  optimized_voc_index: "1971",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1658",
  frequency: "50154",
  furigana: "歯磨[はみが]き",
  kana: "はみがき",
  kanji: "歯磨き",
  optimized_sent_index: "1966",
  optimized_voc_index: "1972",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1083",
  frequency: "717",
  furigana: "廊下[ろうか]",
  kana: "ろうか",
  kanji: "廊下",
  optimized_sent_index: "1967",
  optimized_voc_index: "1973",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1943",
  frequency: "3651",
  furigana: "瓶[びん]",
  kana: "びん",
  kanji: "瓶",
  optimized_sent_index: "1969",
  optimized_voc_index: "1974",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1759",
  frequency: "5818",
  furigana: "褒[ほ]める",
  kana: "ほめる",
  kanji: "褒める",
  optimized_sent_index: "1970",
  optimized_voc_index: "1975",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1843",
  frequency: "19294",
  furigana: "元旦[がんたん]",
  kana: "がんたん",
  kanji: "元旦",
  optimized_sent_index: "1971",
  optimized_voc_index: "1976",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1877",
  frequency: "2312",
  furigana: "袖[そで]",
  kana: "そで",
  kanji: "袖",
  optimized_sent_index: "1973",
  optimized_voc_index: "1977",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1907",
  frequency: "26761",
  furigana: "長袖[ながそで]",
  kana: "ながそで",
  kanji: "長袖",
  optimized_sent_index: "1974",
  optimized_voc_index: "1978",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1932",
  frequency: "21888",
  furigana: "半袖[はんそで]",
  kana: "はんそで",
  kanji: "半袖",
  optimized_sent_index: "1975",
  optimized_voc_index: "1979",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1632",
  frequency: "1636",
  furigana: "馬鹿[ばか]",
  kana: "ばか",
  kanji: "馬鹿",
  optimized_sent_index: "1976",
  optimized_voc_index: "1980",
  partOfSpeech: "Adjectival Noun"
}, {

  alt_spelling: {},
  core_index: "1154",
  frequency: "2446",
  furigana: "凄[すご]い",
  kana: "すごい",
  kanji: "凄い",
  optimized_sent_index: "1977",
  optimized_voc_index: "1981",
  partOfSpeech: "Adjective"
}, {

  alt_spelling: {},
  core_index: "1883",
  frequency: "7642",
  furigana: "剃[そ]る",
  kana: "そる",
  kanji: "剃る",
  optimized_sent_index: "1978",
  optimized_voc_index: "1982",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1852",
  frequency: "2243",
  furigana: "喧嘩[けんか]",
  kana: "けんか",
  kanji: "喧嘩",
  optimized_sent_index: "1980",
  optimized_voc_index: "1983",
  partOfSpeech: "Verbal Noun"
}, {

  alt_spelling: {},
  core_index: "1082",
  frequency: "783",
  furigana: "叩[たた]く",
  kana: "たたく",
  kanji: "叩く",
  optimized_sent_index: "1982",
  optimized_voc_index: "1984",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1322",
  frequency: "2219",
  furigana: "噛[か]む",
  kana: "かむ",
  kanji: "噛む",
  optimized_sent_index: "1983",
  optimized_voc_index: "1985",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1619",
  frequency: "10776",
  furigana: "味噌汁[みそしる]",
  kana: "みそしる",
  kanji: "味噌汁",
  optimized_sent_index: "1985",
  optimized_voc_index: "1986",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1967",
  frequency: "8903",
  furigana: "姪[めい]",
  kana: "めい",
  kanji: "姪",
  optimized_sent_index: "1986",
  optimized_voc_index: "1987",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1649",
  frequency: "23551",
  furigana: "苺[いちご]",
  kana: "いちご",
  kanji: "苺",
  optimized_sent_index: "1987",
  optimized_voc_index: "1988",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1908",
  frequency: "18956",
  furigana: "茄子[なす]",
  kana: "なす",
  kanji: "茄子",
  optimized_sent_index: "1988",
  optimized_voc_index: "1989",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "983",
  frequency: "2647",
  furigana: "逢[あ]う",
  kana: "あう",
  kanji: "逢う",
  optimized_sent_index: "1989",
  optimized_voc_index: "1990",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1295",
  frequency: "725",
  furigana: "椅子[いす]",
  kana: "いす",
  kanji: "椅子",
  optimized_sent_index: "1990",
  optimized_voc_index: "1991",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1971",
  frequency: "3220",
  furigana: "痩[や]せる",
  kana: "やせる",
  kanji: "痩せる",
  optimized_sent_index: "1992",
  optimized_voc_index: "1992",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "1582",
  frequency: "4149",
  furigana: "箸[はし]",
  kana: "はし",
  kanji: "箸",
  optimized_sent_index: "1993",
  optimized_voc_index: "1993",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1615",
  frequency: "16994",
  furigana: "糊[のり]",
  kana: "のり",
  kanji: "糊",
  optimized_sent_index: "1994",
  optimized_voc_index: "1994",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1871",
  frequency: "9391",
  furigana: "醤油[しょうゆ]",
  kana: "しょうゆ",
  kanji: "醤油",
  optimized_sent_index: "1995",
  optimized_voc_index: "1995",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1704",
  frequency: "12068",
  furigana: "鋏[はさみ]",
  kana: "はさみ",
  kanji: "鋏",
  optimized_sent_index: "1996",
  optimized_voc_index: "1996",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1837",
  frequency: "3619",
  furigana: "鞄[かばん]",
  kana: "かばん",
  kanji: "鞄",
  optimized_sent_index: "1997",
  optimized_voc_index: "1997",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1815",
  frequency: "1822",
  furigana: "顎[あご]",
  kana: "あご",
  kanji: "顎",
  optimized_sent_index: "1998",
  optimized_voc_index: "1998",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1726",
  frequency: "16027",
  furigana: "飴[あめ]",
  kana: "あめ",
  kanji: "飴",
  optimized_sent_index: "1999",
  optimized_voc_index: "1999",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "1874",
  frequency: "11972",
  furigana: "石鹸[せっけん]",
  kana: "せっけん",
  kanji: "石鹸",
  optimized_sent_index: "2000",
  optimized_voc_index: "2000",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "2054",
  frequency: "2354",
  furigana: "差[さ]",
  kana: "さ",
  kanji: "差",
  optimized_sent_index: "2393",
  optimized_voc_index: "2459",
  partOfSpeech: "Noun"
}, {

  alt_spelling: {},
  core_index: "2041",
  frequency: "546",
  furigana: "失[うしな]う",
  kana: "うしなう",
  kanji: "失う",
  optimized_sent_index: "3801",
  optimized_voc_index: "2870",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "5017",
  frequency: "3998",
  furigana: "外[はず]れる",
  kana: "はずれる",
  kanji: "外れる",
  optimized_sent_index: "2024",
  optimized_voc_index: "4066",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "4503",
  frequency: "6848",
  furigana: "測[はか]る",
  kana: "はかる",
  kanji: "測る",
  optimized_sent_index: "3780",
  optimized_voc_index: "5182",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "5422",
  frequency: "3198",
  furigana: "含[ふく]める",
  kana: "ふくめる",
  kanji: "含める",
  optimized_sent_index: "4087",
  optimized_voc_index: "5314",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "5864",
  frequency: "1674",
  furigana: "含[ふく]む",
  kana: "ふくむ",
  kanji: "含む",
  optimized_sent_index: "4088",
  optimized_voc_index: "5315",
  partOfSpeech: "Verb"
}, {

  alt_spelling: {},
  core_index: "5742",
  frequency: "5616",
  furigana: "頂戴[ちょうだい]",
  kana: "ちょうだい",
  kanji: "頂戴",
  optimized_sent_index: "5979",
  optimized_voc_index: "5994",
  partOfSpeech: "Verbal Noun"
}

] //end of core2000 array




/* Might come back to this later 09/19/2021 */

function core2000Check(arrayToSearch, searchTerm){
  let kanaCheck = [`ぁ	あ	ぃ	い	ぅ	う	ぇ	え	ぉ	お	か	が	き	ぎ	く
                  ぐ	け	げ	こ	ご	さ	ざ	し	じ	す	ず	せ	ぜ	そ	ぞ	た
                  だ	ち	ぢ	っ	つ	づ	て	で	と	ど	な	に	ぬ	ね	の	は
                  ば	ぱ	ひ	び	ぴ	ふ	ぶ	ぷ	へ	べ	ぺ	ほ	ぼ	ぽ	ま	み
                  む	め	も	ゃ	や	ゅ	ゆ	ょ	よ	ら	り	る	れ	ろ	ゎ	わ
                  ゐ	ゑ	を	ん	ゔ	ゕ	ゖ	ァ	ア	ィ	イ	ゥ	ウ	ェ	エ	ォ	
                  オ	カ	ガ	キ	ギ	ク
                  グ	ケ	ゲ	コ	ゴ	サ	ザ	シ	ジ	ス	ズ	セ	ゼ	ソ	ゾ	タ
                  ダ	チ	ヂ	ッ	ツ	ヅ	テ	デ	ト	ド	ナ	ニ	ヌ	ネ	ノ	ハ
                  バ	パ	ヒ	ビ	ピ	フ	ブ	プ	ヘ	ベ	ペ	ホ	ボ	ポ	マ	ミ
                  ム	メ	モ	ャ	ヤ	ュ	ユ	ョ	ヨ	ラ	リ	ル	レ	ロ	ヮ	ワ
                  ヰ	ヱ	ヲ	ン	ヴ	ヵ	ヶ	ヷ	ヸ	ヹ	ヺ	`]
  
  for (const [key, value] of Object.entries(arrayToSearch)) 
  {
    if(searchTerm == value.kanji)
    {
      // console.log('Found the term')
      return searchTerm;
    }else
    {
      // console.log(`didn't find the term`)
      let newTerm = '';
      for(i=0 ; i<searchTerm.length; i++)
      {
        let stringSearchCount = stringSearch(kanaCheck, searchTerm[i]);

        if(stringSearchCount == 0)
        {
          // console.log(`Are we in the searchcount = 0?`)
          newTerm += searchTerm[i];
        }else
        {
          continue;
        }
      }

      arrayToSearch.forEach(e=>{
        if(stringSearch(e['kanji'], newTerm) != 0)
        {
          let kanjiWithFurigana = '';
          for(i=0; i>e['furigana'].length; i++)
          {
            if(e['furigana'][i] != ']')
            {
              if(e['furigana'][i] != '[')
              {
                kanjiWithFurigana += e['furigana'][i];
              }
            }else if(e['furigana'][i] == ']')
            {
              return kanjiWithFurigana;
            }
          }
        }
      }) //forEach
    }

  }
}
