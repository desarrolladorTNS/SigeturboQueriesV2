function listadoestudiantes($year){
    return "SELECT users.iduser AS 'User', groups.name AS 'Groups', <br/>"+
           "CONCAT_WS(CONVERT(' ' USING latin1),users.lastname,users.firstname) AS 'Student', <br/>"+
           "users.birth,(YEAR(CURRENT_DATE) - YEAR(users.birth))-(RIGHT(CURRENT_DATE,5) < RIGHT(users.birth,5)) AS 'Age',<br/>"+
           "users.phone AS 'Phone',users.address AS 'Address',<br/>"+
           "statusschooltypes.name AS 'Status' <br/>FROM users <br/>" +
           "INNER JOIN enrollments ON enrollments.iduser = users.iduser <br/>"+
           "INNER JOIN groups ON groups.idgroup = enrollments.idgroup <br/>"+
           " INNER JOIN statusschooltypes On statusschooltypes.idstatusschooltype=enrollments.idstatusschooltype <br/>"+
           "WHERE enrollments.idyear = <label class='valueidyear'>"+$year +"</label> AND <br/>"+
		   "users.iduser NOT IN (SELECT iduser FROM responsibleparents) <br/> ORDER BY groups.idgroup,Student;"
}