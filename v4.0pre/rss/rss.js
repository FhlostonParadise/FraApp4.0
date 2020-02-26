var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://www.commafeed.com/rest/category/entriesAsFeed?id=31595555&apiKey=2439ba8271efeb9919c0319bd95931ced2d9e0cb", requestOptions).then((res) => {
    res.text().then((xmlTxt) => {
            var domParser = new DOMParser()
            let doc = domParser.parseFromString(xmlTxt, 'text/xml')
            doc.querySelectorAll('item').forEach((item) => {
                let h3 = document.createElement('h3')
                h3.textContent = item.querySelector('title').textContent
                document.querySelector('output').appendChild(h3) 
    })
    })
})