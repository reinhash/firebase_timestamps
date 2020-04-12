const timeStampList = document.querySelector('.timeStampList');
const checkInTableList = document.querySelector('.checkInTable');

const getTimestampList = (data) => {
    let html = ''
    if(data){
        Object.entries(data).forEach(doc => {
            if(doc[1]["check-out"]){
                // var li = `<li>Check-in: ${doc[1]['check-in']} - Check-out: ${doc[1]['check-out']}</li>`
                var myTable =   `<tr>
                                    <th scope="row">${doc[0]}</th>
                                    <td>${doc[1]['check-in']}</td>
                                    <td>${doc[1]['check-out']}</td>
                                    <td></td>
                                </tr>`
            }
            else {
                // var li = `<li>Check-in: ${doc[1]['check-in']} - Check-out: ${doc[1]['check-out']}<button id=${doc[0]} onclick=\"checkOut()\">check-me-out</button></li>`
                var myTable =   `<tr>
                                    <th scope="row">${doc[0]}</th>
                                    <td>${doc[1]['check-in']}</td>
                                    <td>${doc[1]['check-out']}</td>
                                    <td><button class=\"btn btn-success\" id=${doc[0]} onclick=\"checkOut()\">check-me-out</button></td>
                                </tr>`
            }
            
            

            html += myTable;
        })
    }
    checkInTableList.innerHTML = html;
}