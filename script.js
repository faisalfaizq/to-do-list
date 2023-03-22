const addUserBtn = document.getElementById('adduser');
const btnText = addUserBtn.innerText;
const userNameText = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let edit_id = null;
let userArray = [];
let objtStr = localStorage.getItem('users');
if (objtStr != null) {

    userArray = JSON.parse(objtStr);
}
DisplayInfo();
addUserBtn.onclick = () => {

    const name = userNameText.value;
    if (edit_id != null) {
        userArray.splice(edit_id, 1, { 'name': name });
        edit_id = null;
    } else {
        userArray.push({ 'name': name });
    }
    SaveInfo(userArray);
    userNameText.value = '';
    DisplayInfo();
    addUserBtn.innerText = btnText;
}


function SaveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
}

function DisplayInfo() {
    let statement = '';
    userArray.forEach((users, i) => {
        statement += ` <tr>
    <th scope="row">${i+1}</th>
    <td>${users.name}</td>
    <td><i class=" btn text-white fa-solid fa-pen-to-square btn-warning mx-2" onclick='EditInfo(${i})'></i> 
    <i class="btn btn-danger  text white fa-solid fa-trash" onclick='DeleteInfo(${i})'></i</td>

</tr>`;

    });
    recordsDisplay.innerHTML = statement;


}

function EditInfo(id) {
    edit_id = id;
    userNameText.value = userArray[id].name;
    addUserBtn.innerHTML = 'Badal Le Bhai';
}

function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
    DisplayInfo();

}
const allTr = document.querySelectorAll('#records tr');
const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input', function(e) {
    const searchStr = e.target.value.toLowerCase();
    recordsDisplay.innerHTML = '';
    allTr.forEach(tr => {
        const td_in_tr = tr.querySelectorAll('td');
        if (td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1) {
            recordsDisplay.appendChild(tr);
        }
    });
    if (recordsDisplay.innerHTML == '') {
        recordsDisplay.innerHTML = ' No Records Found';
    }
});