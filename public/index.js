const timeStampList = document.querySelector('.timeStampList');

const getTimestampList = (data) => {
    let html = ''
    if(data){
        Object.entries(data).forEach(doc => {
            if(doc[1]["check-out"]){
                var li = `<li>Check-in: ${doc[1]['check-in']} - Check-out: ${doc[1]['check-out']}</li>`
            }
            else {
                var li = `<li>Check-in: ${doc[1]['check-in']} - Check-out: ${doc[1]['check-out']}<button id=${doc[0]} onclick=\"checkOut()\">check-me-out</button></li>`
            }
            
            html += li;
        })
    }
    timeStampList.innerHTML = html;
}