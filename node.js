function calcAmt(){

    var fromdate = document.getElementById('fromdate').value;
    var todate = document.getElementById('todate').value;

    var fd = fromdate.split('-').reverse().join('-');
    var td = todate.split('-').reverse().join('-');

    var nfri = 0;
    var nsat = 0;
    var nsun = 0;
    var nnonweekend = 0;

    var normalrate = document.getElementById('normalrateEntry').value;
    var weekendrate = document.getElementById('weekendrateEntry').value;

    // console.log(fromdate, todate);
    
    var dayslist = [];

    var from_date = fromdate.split('-');
    var to_date = todate.split('-');

    var fromdate_inms = new Date(`${from_date[1]}-${from_date[2]}-${from_date[0]}`).getTime();
    var todate_inms = new Date(`${to_date[1]}-${to_date[2]}-${to_date[0]}`).getTime();

    // console.log(fromdate_inms, todate_inms)

    var currentdate_inms = 0;
    var i = 0;

    while (currentdate_inms<todate_inms) {
        currentdate_inms = new Date(fromdate_inms+(24*3600000*i));
        if(currentdate_inms.toString().split(' ')[0]=='Fri'){
            pushthis = ['Fri',`${currentdate_inms.getDate()}-${currentdate_inms.getMonth()+1}-${currentdate_inms.getFullYear()}`,parseInt(weekendrate)];
            dayslist.push(pushthis);
            nfri++;
        }
        else if(currentdate_inms.toString().split(' ')[0]=='Sat'){
            pushthis = ['Sat',`${currentdate_inms.getDate()}-${currentdate_inms.getMonth()+1}-${currentdate_inms.getFullYear()}`,parseInt(weekendrate)];
            dayslist.push(pushthis);
            nsat++;
        }
        else if(currentdate_inms.toString().split(' ')[0]=='Sun'){
            pushthis = ['Sun',`${currentdate_inms.getDate()}-${currentdate_inms.getMonth()+1}-${currentdate_inms.getFullYear()}`,parseInt(weekendrate)];
            dayslist.push(pushthis);
            nsun++;
        }
        else{
            pushthis = [currentdate_inms.toString().split(' ')[0],`${currentdate_inms.getDate()}-${currentdate_inms.getMonth()+1}-${currentdate_inms.getFullYear()}`,parseInt(normalrate)];
            dayslist.push(pushthis);
            nnonweekend++;
        };
        currentdate_inms = currentdate_inms.getTime();
        i++;
    };

    var valueinnerHTML = '';
    dayslist.forEach(i => {
        valueinnerHTML+=`<div class="dateWithPriceCheck"><input style="display: inline;" class="chkbtn" type="checkbox" name="${i[1]} ${i[0]}" value=${i[2]} checked><label style="display: inline;" for="${i[1]}" class="checkLabes">${i[0]} ${i[1]} - Rs.${i[2]}</label></div>`;
    });

    document.getElementById('datesWithPrice').innerHTML=valueinnerHTML;
    // console.log(valueinnerHTML);

    document.getElementById('span_1').style.display='block';
    document.getElementById('span_1').innerText=normalrate;
    document.getElementById('span_2').style.display='block';
    document.getElementById('span_2').innerText=weekendrate;
    document.getElementById('normalrateEntry').style.display='none';
    document.getElementById('weekendrateEntry').style.display='none';

    document.querySelector("#fromdate").style.display='none';
    document.querySelector("#todate").style.display='none';

    document.getElementById('FROMDATE').innerText+=fd;
    document.getElementById('TODATE').innerText+=td;
    document.getElementById('FROMDATE').style.display='block';
    document.getElementById('TODATE').style.display='block';

    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));

    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate))

    var checkboxes = document.getElementsByClassName('chkbtn');

    for (box of checkboxes) {
        box.addEventListener('click',(e)=>{
            console.log(e.target.checked);
            if(e.target.checked==false){
                if(e.target.name.split(' ')[1]=='Fri'){
                    nfri--;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                }
                else if(e.target.name.split(' ')[1]=='Sat'){
                    nsat--;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                }
                else if(e.target.name.split(' ')[1]=='Sun'){
                    nsun--;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                }
                else{
                    nnonweekend--;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                };
            }
            else{
                if(e.target.name.split(' ')[1]=='Fri'){
                    nfri++;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                }
                else if(e.target.name.split(' ')[1]=='Sat'){
                    nsat++;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                }
                else if(e.target.name.split(' ')[1]=='Sun'){
                    nsun++;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                }
                else{
                    nnonweekend++;
                    document.getElementById('messageScreen').innerText=billGeneration(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                    updateGeneratedBill(nfri, nsat, nsun, nnonweekend, parseInt(normalrate), parseInt(weekendrate));
                };
            };
        });
    };

    document.getElementById('calculateAmount').style.background='yellowgreen';
    document.getElementById('calculateAmount').style.color='seagreen';
    document.getElementById('calculateAmount').style.boxShadow='none';
    document.getElementById('calculateAmount').innerText='Already Calculated';
    document.getElementById('calculateAmount').setAttribute('onclick',"nofunction()");
    document.getElementById('span_1').classList.toggle('showRATE');
    document.getElementById('span_2').classList.toggle('showRATE');
};

function billGeneration(countFri, countSat, countSun, countNonWeekends, normal_rate, weekend_rate){
    var statement = `Pay Rs.${((countFri+countSat+countSun)*weekend_rate)+(countNonWeekends*normal_rate)} to the Newspaper Boy.`
    return statement;
};

function updateGeneratedBill(countFri, countSat, countSun, countNonWeekends, normal_rate, weekend_rate){
    var updatedStatement = `Total No. of regular days:- ${countNonWeekends}\nTotal No. of Friday(s):- ${countFri}\nTotal No. of Saturdays(s):- ${countSat}\nTotal No. of Sunday(s):- ${countSun}\n\nTotal: Rs.${((countFri+countSat+countSun)*weekend_rate)+(countNonWeekends*normal_rate)}`;

    document.getElementById('alldates').innerText=updatedStatement;
};

function nofunction(){};

function print(){
    document.getElementById('datesWithPrice').style.display='none';
    document.getElementById('calculateAmount').style.display='none';
    document.getElementById('printPage').innerText='THANK YOU !';
    document.getElementById('printPage').setAttribute('onclick',"nofunction()");
    document.getElementById('reloadIcon').classList.toggle('hideRefresh');

    setTimeout(() => {
        html2canvas(document.getElementById('container'),{dpi:300}).then(canvas=>{
            document.getElementById('frame-9').setAttribute('href',`${canvas.toDataURL('image/jpg')}`);
            document.getElementById('frame-9').click();
            document.getElementById('reloadIcon').classList.toggle('hideRefresh');
        })
    }, 800);
};