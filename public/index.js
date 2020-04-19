const timeStampList = document.querySelector('.timeStampList');
const checkInTableList = document.querySelector('.checkInTable');

const getTimestampList = (data) => {
    let html = ''
    if(data){
        Object.entries(data).forEach(doc => {
            if(doc[1]["check-out"]){
                var myTable =   `<tr>
                                    <th scope="row">${doc[0]}</th>
                                    <td>${doc[1]['check-in']}</td>
                                    <td>${doc[1]['check-out']}</td>
                                    <td></td>
                                </tr>`
            }
            else {
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