/**
 * Created by asus on 2017/3/22.
 */

window.onload = function () {

    textChange();
    dispayMenu();
    picTab();

    function textChange( ) {
        var oSearch = getByClass(document,'search');

        for(var i=0; i<oSearch.length; i++) {

            var oText = oSearch[i].getElementsByTagName('input')[0];
            var str = oText.value;

            oText.onfocus = function () {
                if (this.value == str)
                    this.value = '';
            };

            oText.onblur = function () {
                if (this.value == '')
                    this.value = str;
            };
        }
    }

    function dispayMenu() {
        var oList = document.getElementById('sort_bar');
        var aH2 = oList.getElementsByTagName('h2');
        var aA = oList.getElementsByTagName('a');
        var aUl = oList.getElementsByTagName('ul');

        for(var i=0; i<aA.length; i++ ){
            aA[i].index = i;

            aA[i].onclick = function (ev) {
                var ev = ev || event;
                var _this = this;

                for( var j=0; j<aUl.length; j++)
                    aUl[j].style.display = 'none';

                aUl[this.index].style.display = 'block';

                document.onclick = function () {
                    aUl[_this.index].style.display = 'none';
                };
                ev.cancelBubble = true;
            }
        }

        for(var i=0; i<aUl.length; i++){
            aUl[i].index = i;
            var aLi = aUl[i].getElementsByTagName('li');

            for(var j=0; j<aLi.length; j++){
                aLi[j].onmouseover = function () {
                  this.className = 'active';
                };

                aLi[j].onmouseout = function () {
                    this.className = '';
                };

                aLi[j].onclick = function () {
                  aH2[this.parentNode.index].innerHTML = this.innerHTML;
                };
            }
        }

    }

    function picTab() {
        var oScroll = document.getElementById('scroll_wrap_r');
        var oNext = getByClass(oScroll, 'next')[0];
        var oPre = getByClass(oScroll, 'pre')[0];
        var oUl = oScroll.getElementsByTagName('ul')[0];
        var aLi = oUl.getElementsByTagName('li');

        var iNow = 0;
        oUl.innerHTML += oUl.innerHTML;
        oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

        oNext.onclick = function () {
            moveToRight(oUl, -iNow*aLi[0].offsetWidth, -(iNow+1)*aLi[0].offsetWidth);
            iNow++;
            if(iNow == aLi.length/2){
                iNow = 0;
                oUl.style.left = 0;
            }
        };

        oPre.onclick = function () {
            moveToRight(oUl, -iNow*aLi[0].offsetWidth, -(iNow-1)*aLi[0].offsetWidth);
            iNow--;
            if(iNow == 0){
                iNow = aLi.length/2;
                oUl.style.left = -oUl.offsetWidth/2;
            }
        };

    }

    function getByClass(parent, className) {
        var aEle = parent.getElementsByTagName('*');    //获取parent里的所有的元素
        var arr = [];

        for( var i=0; i<aEle.length; i++){
            //获取每个元素的每一个类的名称
            var aClassNanme = aEle[i].className.split(' ');
            //遍历每一个类名，若找到className则终止循环
            for( var j=0; j<aClassNanme.length; j++){
                if(aClassNanme[j] == className) {
                    arr.push(aEle[i]);
                    break;
                }
            }
        }
        return arr; //返回找到的元素
    }

    function  moveToRight(obj, now, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var iSpeed = (target - now)/10;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if(now == target)
                clearInterval(obj.timer);
            else{
                now += iSpeed;
                obj.style.left = now + 'px';
            }
        },30)
    }


};
