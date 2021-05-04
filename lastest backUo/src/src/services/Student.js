const KEYS = {
    students: 'students',
    studentId: 'studentId'
}

export function insertstudent(data) {
    let students = getAllstudents();
    data['id'] = generatestudentId()
    students.push(data)
    localStorage.setItem(KEYS.students, JSON.stringify(students))
}

export function updatestudent(data) {
    let students = getAllstudents();
    let recordIndex = students.findIndex(x => x.id == data.id);
    students[recordIndex] = { ...data }
    localStorage.setItem(KEYS.students, JSON.stringify(students));
}

export function generatestudentId() {
    if (localStorage.getItem(KEYS.studentId) == null)
        localStorage.setItem(KEYS.studentId, '0')
    var id = parseInt(localStorage.getItem(KEYS.studentId))
    localStorage.setItem(KEYS.studentId, (++id).toString())
    return id;
}

export function getAllstudents() {
    if (localStorage.getItem(KEYS.students) == null)
        localStorage.setItem(KEYS.students, JSON.stringify([]))
    let students = JSON.parse(localStorage.getItem(KEYS.students));
    //map departmentID to department title
    let departments = getDepartmentCollection();
    return students.map(x => ({
        ...x,
        department: departments[x.departmentId - 1].title
    }))
}