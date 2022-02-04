var moreChargedDaysList = ['Sat','Sun'];
var bunchOfButtons = document.getElementsByClassName('days-button')
for (const i of bunchOfButtons) {
    i.addEventListener('mousedown',()=>{
        moreChargedDaysList.push(i.innerText[0]+i.innerText[1]+i.innerText[2]);
        alert(`${i.innerHTML} added as weekends or more extra charged days.`);
    });
};
var mainrecord=new Array();
var monthdata={
    'Jan':'01',
    'Feb':'02',
    'Mar':'03',
    'Apr':'04',
    'May':'05',
    'Jun':'06',
    'Jul':'07',
    'Aug':'08',
    'Sep':'09',
    'Oct':'10',
    'Nov':'11',
    'Dec':'12'
};

// document.getElementById("calculateAmount").addEventListener('mousedown',()=>{
function calcAmt(){
    //document.getElementById("calculateAmount").style.boxShadow='5px 5px black';
    
    var fromdatevalue=document.getElementById('fromdate').value;
    var todatevalue=document.getElementById('todate').value;

    fromdatevalue=fromdatevalue.split('-').reverse();
    todatevalue=todatevalue.split('-').reverse();

    const hugedate_dataset={1:31,2:28,3:31,4:30,5:31,6:30,7:31,8:31,9:30,10:31,11:30,12:31}

    var fromdatevalueyear=fromdatevalue[2];
    var todatevalueyear=todatevalue[2];
    
    var fromdatevaluemonth=fromdatevalue[1];
    var todatevaluemonth=todatevalue[1];
    
    var fromdatevalueday=fromdatevalue[0];
    var todatevalueday=todatevalue[0];

    var fromdatems=new Date(`${fromdatevaluemonth}-${fromdatevalueday}-${fromdatevalueyear}`);
    fromdatems=parseInt(fromdatems.getTime());

    var todatems=new Date(`${todatevaluemonth}-${todatevalueday}-${todatevalueyear}`);
    todatems=parseInt(todatems.getTime());

    if(fromdatems<todatems){

        var instance_date='';

        var i=0;
        while(instance_date!=`${todatevalueday}-${todatevaluemonth}-${todatevalueyear}`){
            var currms=new Date(fromdatems+i*24*3600*1000);
            k=currms.toDateString().split(' ')[2]+'-'+currms.toDateString().split(' ')[1]+'-'+currms.toDateString().split(' ')[3].split('-')
            k=k.split('-')
            k[1]=monthdata[k[1]]
            mainrecord.push(k.join('-'));
            instance_date=k.join('-');
            i+=1;
        };

        for (let tareekh = 0; tareekh < mainrecord.length; tareekh++) {
            var instancedate = mainrecord[tareekh];
            var instancedateis = mainrecord[tareekh].split('-').reverse().join('-');
            instancedateis=new Date(instancedateis);
            mainrecord[tareekh]=`${instancedate},${instancedateis.toDateString().split(' ')[0]}`;
        };

        var weekends=[];
        var nonweekends=[];

        var moreChargedDaysSets = new Set(moreChargedDaysList);

        mainrecord.forEach(x => {
            moreChargedDaysSets.forEach(instance => {
                if(x.split(',')[1]==instance){
                    weekends.push(x.split(',')[0]);
                }
                else
                {
                    nonweekends.push(x.split(',')[0]);
                };
            });
        });

        // console.table(weekends);

        var nonweekendsSets = new Set(nonweekends);

        nonweekends=[];

        nonweekendsSets.forEach(element => {
            nonweekends.push(element);
        });

        
        weekends.forEach(element => {
            var removeableindex = nonweekends.indexOf(element);
            nonweekends.pop(removeableindex);
        });

        // var normalrate=parseFloat(document.getElementById('normalrateEntry').value);
        // var weekendrate=parseFloat(document.getElementById('weekendrateEntry').value);

        var normalrate=document.getElementById('normalrateEntry').value;
        var weekendrate=document.getElementById('weekendrateEntry').value;

        var money=weekends.length*weekendrate+nonweekends.length*normalrate;
        
        function moneyCalculation(){
            var message=`Pay ₹${money} to the Newspaper Boy.`;
            document.getElementById('messageScreen').innerText=message;
        };
        moneyCalculation()

        var alldatesString='';
        var list_alldatesString = new Array();
        var nfri=0;
        var nsat=0;
        var nsun=0;
        var nregular=0;

        mainrecord.forEach(z => {
            var element=z.split(',');
            alldatesString+=element[0]+' '+element[1]+'\n';
            list_alldatesString.push(element[0]+' '+element[1]);
        });

        document.getElementById('datesWithPrice').style.height='auto';
        document.getElementById('paperNotGiven').style.height='auto';

        document.getElementById('alldates').style.display='block';
        document.getElementById('printPage').style.display='block';

        list_alldatesString.forEach(i => {
            if(i.endsWith('Sat')){
                nsat+=1;
                document.getElementById('datesWithPrice').innerHTML+=`<div class="dateWithPriceCheck"><input style="display: inline;" class="chkbtn" type="checkbox" name="${i}  ||  Price: Rs. ${weekendrate}" value=${weekendrate} checked><label style="display: inline;" for="${i}  ||  Price: Rs. ${weekendrate}" class="checkLabes">${i}  ||  Price: Rs. ${weekendrate}</label></div>`;
            };
            if(i.endsWith('Sun')){
                nsun+=1;
                document.getElementById('datesWithPrice').innerHTML+=`<div class="dateWithPriceCheck"><input style="display: inline;" class="chkbtn" type="checkbox" name="${i}  ||  Price: Rs. ${weekendrate}" value=${weekendrate} checked><label style="display: inline;" for="${i}  ||  Price: Rs. ${weekendrate}" class="checkLabes">${i}  ||  Price: Rs. ${weekendrate}</label></div>`;
            };
            if(i.endsWith('Fri')){
                nfri+=1;
                document.getElementById('datesWithPrice').innerHTML+=`<div class="dateWithPriceCheck"><input style="display: inline;" class="chkbtn" type="checkbox" name="${i}  ||  Price: Rs. ${weekendrate}" value=${weekendrate} checked><label style="display: inline;" for="${i}  ||  Price: Rs. ${weekendrate}" class="checkLabes">${i}  ||  Price: Rs. ${weekendrate}</label></div>`;
            };
            if(i.endsWith('Mon') | i.endsWith('Tue') | i.endsWith('Wed') | i.endsWith('Thu')){
                nregular+=1;
                document.getElementById('datesWithPrice').innerHTML+=`<div class="dateWithPriceCheck"><input style="display: inline;" class="chkbtn" type="checkbox" name="${i}  ||  Price: Rs. ${normalrate}" value=${normalrate} checked><label style="display: inline;" for="${i}  ||  Price: Rs. ${normalrate}" class="checkLabes">${i}  ||  Price: Rs. ${normalrate}</label></div>`;
            };
        });

        // <input type="checkbox" value="" name="" class="chkbtn" checked>

        // k=`<input type="checkbox" value="${i}+  ||  Price: Rs. ${weekendrate}\n" name="" class="chkbtn" checked>`

        // document.getElementById('datesWithPrice').innerHTML=`<input type="checkbox" value="" name="" class="chkbtn" checked>`;

        function showRecepit(){
            var recepitData = `Total No. of regular days:- ${nregular} | Rs. ${nregular*normalrate}\nTotal No. of Friday(s):- ${nfri} | Rs. ${nfri*weekendrate}\nTotal No. of Saturday(s):- ${nsat} | Rs. ${nsat*weekendrate}\nTotal No. of Sunday(s):- ${nsun} | Rs. ${nsun*weekendrate}\n\nTotal: Rs. ${money}`;
    
            // document.getElementById('alldates').innerText=alldatesString;
            document.getElementById('alldates').innerText=recepitData;
        }
        showRecepit();

        var listCheckBox = document.getElementsByClassName('chkbtn');

        var paperNotGivenList = new Array();
        for (let e = 0; e < listCheckBox.length; e++) {
            const element = listCheckBox[e];
            element.onchange=function(){
                if(element.checked){
                    money+=parseInt(element.value);
                    moneyCalculation();
                    
                    var nameDay = dayName(element.name);
                    if(nameDay=='Fri'){
                        nfri+=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        var paritalNamePos = paperNotGivenList.indexOf(paritalName);
                        paperNotGivenList.splice(paritalNamePos,1);
                        reWrite(paperNotGivenList);
                    };
                    if(nameDay=='Sat'){
                        nsat+=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        var paritalNamePos = paperNotGivenList.indexOf(paritalName);
                        paperNotGivenList.splice(paritalNamePos,1);
                        reWrite(paperNotGivenList);
                    };
                    if(nameDay=='Sun'){
                        nsun+=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        var paritalNamePos = paperNotGivenList.indexOf(paritalName);
                        paperNotGivenList.splice(paritalNamePos,1);
                        reWrite(paperNotGivenList);
                    };
                    if(nameDay=='Mon' | nameDay=='Tue' | nameDay=='Wed' | nameDay=='Thu'){
                        nregular+=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        var paritalNamePos = paperNotGivenList.indexOf(paritalName);
                        paperNotGivenList.splice(paritalNamePos,1);
                        reWrite(paperNotGivenList);
                    };
                    showRecepit();
                }
                else{
                    money-=parseInt(element.value);
                    moneyCalculation();
                    
                    var nameDay = dayName(element.name);
                    if(nameDay=='Fri'){
                        nfri-=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        paperNotGivenList.push(paritalName);
                        reWrite(paperNotGivenList);
                    };
                    if(nameDay=='Sat'){
                        nsat-=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        paperNotGivenList.push(paritalName);
                        reWrite(paperNotGivenList);
                    };
                    if(nameDay=='Sun'){
                        nsun-=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        paperNotGivenList.push(paritalName);
                        reWrite(paperNotGivenList);
                    };
                    if(nameDay=='Mon' | nameDay=='Tue' | nameDay=='Wed' | nameDay=='Thu'){
                        nregular-=1;
                        var paritalName = element.name.split('  ||  ')[0];
                        paperNotGivenList.push(paritalName);
                        reWrite(paperNotGivenList);
                    };
                    showRecepit();
                };
            };
        };

        function dayName(day){
            var dayNameIs = day.split(' ',2)[1];
            return dayNameIs;
        };
        
    };
    document.getElementById("calculateAmount").disabled=true;
    document.getElementById('calculateAmount').innerText='Already Calculated';
};

function onPrint(){

    document.getElementById('frame-7').style.display='none';
    document.getElementById('datesWithPrice').style.display='none';
    document.getElementById('frame-8').style.display='none';

    document.getElementById('calculateAmount').innerText='THANK YOU !';
    document.getElementById('calculateAmount').style.cursor='none';
    
    setTimeout(() => {
        print();
    }, 2000);
};

function reWrite(list){
    // list=list.join('\n');
    // document.getElementById('paperNotGiven').innerHTML=list;

    for (const element of list) {
        document.getElementById('paperNotGiven').innerHTML+=`<span style="display: block;color: red;margin: 2%;">${element}</span>`;
    }
}