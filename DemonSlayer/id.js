//先取得網址字串，假設此頁網址為「index.aspx?id=U001&name=GQSM」
var url = location.href;

//再來用去尋找網址列中是否有資料傳遞(QueryString)
if(url.indexOf('?')!=-1)
{
    //之後去分割字串把分割後的字串放進陣列中
    var ary1 = url.split('?');
    //此時ary1裡的內容為：
    //ary1[0] = 'index.aspx'，ary1[1] = 'id=U001&name=GQSM'
//---------------------------------------------------------------------------------------------
    //下一步把後方傳遞的每組資料各自分割
    var ary2 = ary1[1].split('&');
    //此時ary2裡的內容為：
    //ary2[0] = 'id=U001'，ary2[1] = 'name=GQSM'
//---------------------------------------------------------------------------------------------
    //最後如果我們要找id的資料就直接取ary[0]下手，name的話就是ary[1]
    var ary3 = ary2[0].split('=');
    //此時ary3裡的內容為：
    //ary3[0] = 'id'，ary3[1] = 'U001'

    //取得id值
    var id = ary3[1];

}
var el = document.querySelector(".list"); //選取到 class="list"
el.innerHTML = '<a href="https://www.tsailun.tk/man.html#' + id + '"><span class="tpye2">回上一頁</span></a>';
