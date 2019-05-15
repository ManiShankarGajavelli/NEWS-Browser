 function SearchedResults(){
    var SearchedResult = $('#SearchedNews').val();
    document.getElementById("loader").style.display = "none";
    var Searched_url = 'https://newsapi.org/v2/everything?q=='+SearchedResult+'&apiKey=4864ff7fb0874732aa6652f5342a8aef';
        fetch(Searched_url, {mode: 'cors'}).then(function(response) {
        return response.text();
        }).then(function(text) {
            var ParsedArticles = JSON.parse(text);
            var TotalArticles = ParsedArticles.articles;
            var result = ShowArticlesConent("SearchedNews", TotalArticles);
             
    }).catch(function(error) {
        console.log('Working on Offline version of search.');
        $('.navbar-inverse').css('background-color','#f90b0b');
        $('#TopArticles').html('Top Articles (Offline)');
        
  });
    
}
function randomIntFromInterval()
{
    return Math.floor(Math.random()*(100-1+1)+1);
}

function loadDashboard(){
    if(CheckIndexedDBSupport()){
    openDb('NBDB',1,"NBObjectStore");
    }
    var url='https://newsapi.org/v2/top-headlines?country=in&apiKey=4864ff7fb0874732aa6652f5342a8aef';
    fetch(url, {mode: 'cors'}).then(function(response) {
    return response.text();
    }).then(function(text) {
        var ParsedArticles = JSON.parse(text);
        var TotalArticles = ParsedArticles.articles;
        var result = ShowArticlesConent("Dashboard", TotalArticles);
        if(CheckIndexedDBSupport()){
            clearObjectStore('NBObjectStore');
            addNews("NBObjectStore",TotalArticles);
        }
      }).catch(function(error) {
        console.log('Working on Offline version of Dashboard.');
        $('.navbar-inverse').css('background-color','#f90b0b');
        $('#TopArticles').html('Top Articles (Offline)');
        var TotalOfflineArticles = readAll('NBObjectStore');
        
      });
}

function ShowArticlesConent(type,TotalArticles){
    if(TotalArticles.length>0){
        for(var i=0;i<TotalArticles.length;i++){
            var SingleArticle = TotalArticles[i];
            if(i==0){
                var imgsrc = $('#Article').find('img')[0];
                $(imgsrc).attr('src',SingleArticle.urlToImage);
                var NewsTitle = SingleArticle.title.length<80?SingleArticle.title:SingleArticle.title.substr(0,80);
                $($('#Article').find('h3 a')[0]).attr('title',SingleArticle.title);
                $('#Article').find('h3 a')[0].innerHTML= NewsTitle ;
                $('#Article').find('h3 a')[0].href=SingleArticle.url;
                var Source = SingleArticle.source.name!=null?SingleArticle.source.name:SingleArticle.source.id;
                $('#Article').find('.user-full-details h3')[0].innerHTML = Source;
                $('#Article').find('.Source')[0].innerHTML = Source; 
                // $('#Article').find('.content-title')[0].innerHTML= SingleArticle.source.name!=null?SingleArticle.source.name:SingleArticle.source.id;
                $('#Article').find('.fa-comments')[0].innerHTML=randomIntFromInterval();
                $('#Article').find('.fa-heart')[0].innerHTML=randomIntFromInterval();
            }else{
            var Cloned_Article=document.getElementById("Article").cloneNode(true);
            
            Cloned_Article.id = "Article_"+i
            document.getElementById("Articles_list").appendChild(Cloned_Article);
            var imgsrc = $('#Article_'+i).find('img')[0];
            $('#Article'+i).addClass('TempClass');
                $(imgsrc).attr('src',SingleArticle.urlToImage);
                var NewsTitle = SingleArticle.title.length<80?SingleArticle.title:SingleArticle.title.substr(0,80);
                $('#Article_'+i).find('h3 a')[0].innerHTML = NewsTitle;
                $($('#Article').find('h3 a')[0]).attr('title',SingleArticle.title);
                $('#Article_'+i).find('h3 a')[0].href=SingleArticle.url;
                var Source = SingleArticle.source.name!=null?SingleArticle.source.name:SingleArticle.source.id;
                $('#Article').find('.user-full-details h3')[0].innerHTML = Source;
                $('#Article').find('.Source')[0].innerHTML = Source; 
                // $('#Article').find('.content-title')[0].innerHTML= SingleArticle.source.name!=null?SingleArticle.source.name:SingleArticle.source.id;
                $('#Article').find('.fa-comments')[0].innerHTML=randomIntFromInterval();
                $('#Article').find('.fa-heart')[0].innerHTML=randomIntFromInterval();
            }
            if((TotalArticles.length -i) < 6 ){
                $('.Post'+(TotalArticles.length -(i+1))).find('img')[0].src = SingleArticle.urlToImage;
                var NewsTitle = SingleArticle.title.length<80?SingleArticle.title:SingleArticle.title.substr(0,80);
                $('.Post'+(TotalArticles.length -(i+1))).find('h5')[0].innerHTML = NewsTitle;
                $('.Post'+(TotalArticles.length -(i+1))).find('a')[0].href=SingleArticle.url;
            }    
        }
        document.getElementById("loader").style.display = "none";
    }else{
        $('#TopArticles').innerHTML = 'No Search Results found..!';
    }
  }