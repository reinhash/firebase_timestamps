const timeStampList = document.querySelector('.timeStampList');
const checkInTableList = document.querySelector('.checkInTable');


const setDefaultTableItem = (relevant_row, row_id, data) => {
    if(data['check-out']){
        relevant_row.innerHTML = `
                                    <td>${row_id}</td>
                                    <td>${data['check-in']}</td>
                                    <td>${data['check-out']}</td>
                                    <td>
                                        <button id=\"edit_${row_id}\" class=\"uk-button uk-button-default\" onclick=\"edit()\">edit</button>
                                        <button id=\"delete_${row_id}\" class=\"uk-button uk-button-default\" onclick=\"deleteEntry()\">delete</button>
                                    </td>
                                `
    }
    else {
        relevant_row.innerHTML = `
                                    <td>${row_id}</td>
                                    <td>${data['check-in']}</td>
                                    <td><button class=\"uk-button uk-button-default\" id=${row_id} onclick=\"checkOut()\">check-me-out</button></td>
                                    <td>
                                        <button id=\"edit_${row_id}\" class=\"uk-button uk-button-default\" onclick=\"edit()\">edit</button>
                                        <button id=\"delete_${row_id}\" class=\"uk-button uk-button-default\" onclick=\"deleteEntry()\">delete</button>
                                    </td>
                                `
    }
    
}


const getTimestampList = (data) => {
    let html = ''
    if(data){
        Object.entries(data).forEach((doc, index) => {
            if(doc[1]["check-out"]){
                var myTable =   `<tr id=row-${doc[0]}>
                                    <td>${doc[0]}</td>
                                    <td>${doc[1]['check-in']}</td>
                                    <td>${doc[1]['check-out']}</td>
                                    <td>
                                        <button id=\"edit_${doc[0]}\" class=\"uk-button uk-button-default\" onclick=\"edit()\">edit</button>
                                        <button id=\"delete_${doc[0]}\" class=\"uk-button uk-button-default\" onclick=\"deleteEntry()\">delete</button>
                                    </td>
                                </tr>`
            }
            else {
                var myTable =   `<tr id=row-${doc[0]}>
                                    <td>${doc[0]}</td>
                                    <td>${doc[1]['check-in']}</td>
                                    <td><button class=\"uk-button uk-button-default\" id=${doc[0]} onclick=\"checkOut()\">check-me-out</button></td>
                                    <td>
                                        <button id=\"edit_${doc[0]}\" class=\"uk-button uk-button-default\" onclick=\"edit()\">edit</button>
                                        <button id=\"delete_${doc[0]}\" class=\"uk-button uk-button-default\" onclick=\"deleteEntry()\">delete</button>
                                    </td>
                                </tr>`
            }
            
            

            html += myTable;
        })
    }
    checkInTableList.innerHTML = html;
}

const editTimestampList = (row, row_id, row_values) => {
    if(row_values['check-out']){
        row.innerHTML = `  
                        <td>${row_id}</td>
                        <td><input class=\"uk-input\" type=\"text\" value=\"${row_values['check-in']}\"></input></td>
                        <td><input class=\"uk-input\" type=\"text\" value=\"${row_values['check-out']}\"></input></td>
                        <td>
                            <button id=\"submit_${row_id}\" class=\"uk-button uk-button-primary\" onclick=\"submitEdit()\">Submit</button>
                            <button id=\"reset_${row_id}\" class=\"uk-button uk-button-default\" onclick=\"resetEdit()\">Discard</button>
                        </td>
                        `
    }
    else {
        row.innerHTML = `  
                        <td>${row_id}</td>
                        <td><input class=\"uk-input\" type=\"text\" value=\"${row_values['check-in']}\"></input></td>
                        <td>
                            <button id=\"submit_${row_id}\" class=\"uk-button uk-button-primary\" onclick=\"submitEdit()\">Submit</button>
                            <button id=\"reset_${row_id}\" class=\"uk-button uk-button-default\" onclick=\"resetEdit()\">Discard</button>
                        </td>
                        `
    }
    
}