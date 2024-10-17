function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Application-Key': 'TU57aa25d8eb1289797ababc529f161fcf39471b49ad47c67a19ebf933030ba269581278fb2bb901288c41d589c1ca9e8e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "UserName": username, 
            "PassWord": password 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) { // ถ้าสถานะเป็น true
            const welcomeMessage = `Success! Welcome ${data.displayname_th || data.displayname_en}`;
            document.getElementById('message').innerText = welcomeMessage;

            // แสดงข้อมูลเพิ่มเติม
            const userType = data.type === 'student' ? 'นักศึกษา' : 'เจ้าหน้าที่';
            let userInfo = `Type: ${userType}\nUsername: ${data.username}\nEmail: ${data.email}\nDepartment: ${data.department || data.organization}`;

            if (data.type === 'student') {
                userInfo += `\nStatus: ${data.tu_status}\nFaculty: ${data.faculty}`;
            } else if (data.type === 'employee') {
                userInfo += `\nStatus: ${data.StatusEmp}\nWork Status: ${data.StatusWork}`;
            }

            // แสดงข้อมูลใน modal
            document.getElementById('modalMessage').innerText = userInfo;
            document.getElementById('myModal').style.display = 'block'; // เปิด modal
        } else {
            document.getElementById('message').innerText = data.message || 'การยืนยันไม่สำเร็จ กรุณาลองใหม่'; // แสดงข้อความผิดพลาด
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    });
}

// ปิด modal เมื่อกดปุ่มปิด
document.querySelector('.close').onclick = function() {
    document.getElementById('myModal').style.display = 'none';
}

// ปิด modal เมื่อคลิกที่พื้นหลัง
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
    }
}
