describe('SQL Database Testing in Cypress', () => {
  it('Create a Table Users', function () {
    cy.task('queryDb', "CREATE TABLE Users (UsersID int, NameThai varchar(255), department int, Position varchar(255))")
  })

  it('Input Entries into the table', function () {
    cy.task('queryDb', `INSERT INTO Users (UsersID, NameThai, department, Position) VALUES
    (001, 'นายพะโล้ แซ่ห่าน', 001, 'บุคลากรสายปฏิบัติงาน'),
    (002, 'นางสาวกัญญาเขียวล้วน', 003, 'บุคลากรสายวิชาการ'),
    (003, 'นายอเนก บุญนันทพงศ์', 002, 'บุคลากรสายปฏิบัติงาน'),
    (004, 'นายพิพัฒน์ เศรษฐี', 001, 'บุคลากรสายวิชาการ'),
    (005, 'นางสมศรี สิริกุล', 003, 'บุคลากรสายวิชาการ')`).then((result) => {
            expect(result.affectedRows).to.equal(5) 
        })
  })

  it('Create a Table Departments', function () {
    cy.task('queryDb', "CREATE TABLE Deparments (IDDeparment int, code int, Name varchar(255))")
  })

  it('Input Entries into the table', function () {
    cy.task('queryDb', `INSERT INTO Deparments (IDDeparment, code, Name) VALUES
    (001, 1001, "หลักสูตรการจัดการทางวิศวกรรม" ),
    (002, 1002, "ภารกิจบริหารงานวิจัยและบริการวิชาการ"),
    (003, 1003, "บริการวิศวกรรม (CES)")`).then((result) => {
      expect(result.affectedRows).to.equal(3)
    })
  })

  it('Select Table User row where the Position is บุคลากรสายวิชาการ', function () {
    cy.task('queryDb', `SELECT * FROM Users WHERE Position="บุคลากรสายวิชาการ"`).then((result) => {
      expect(result[0].Position)
    })
  })

  it('Find agency information of each user', function () {
    cy.task('queryDb', `SELECT UsersID, NameThai Position, code, Name FROM Users INNER JOIN Deparments ON Users.department = Deparments.IDDeparment`).then((result) => {
      expect(result[0].Position)
    })
  })

  it('Find information about each users agency. at the agency name', function () {
    cy.task('queryDb', `SELECT code, Name, NameThai, Position FROM Users INNER JOIN Deparments ON Users.department = Deparments.IDDeparment WHERE code IN('1003',1002) ORDER BY code DESC`).then((result) => {
      expect(result[0].code)
    })
  })

})