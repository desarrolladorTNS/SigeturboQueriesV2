function PendingsByMonth($year){
    return "SELECT payments.idyear,groups.name AS groups, <br/>"+
           "CONCAT_WS(CONVERT(' ' USING latin1),users.lastname,users.firstname) AS 'Student', <br/>"+
           "packages.name AS package, paymenttypes.name As paymenttype, <br/>"+
           "idbank, idfamily, payments.iduser,  concept1, value1,<br/>"+
           "date1, ispayment, approved, realdate,<br/>"+
           "statusschooltypes.name AS 'Status' <br/>FROM payments <br/>" +
           "INNER JOIN paymenttypes ON payments.idpaymenttype = paymenttypes.idpaymenttype <br/>"+
           "INNER JOIN packages ON payments.idpackage = packages.idpackage <br/>"+
           "LEFT JOIN enrollments ON enrollments.iduser = payments.iduser AND enrollments.idyear = payments.idyear <br/>"+
           "INNER JOIN groups ON groups.idgroup = enrollments.idgroup <br/>"+
           "INNER JOIN statusschooltypes On statusschooltypes.idstatusschooltype=enrollments.idstatusschooltype <br/>"+
           "LEFT JOIN users ON users.iduser = payments.iduser <br/>"+
           "WHERE payments.idyear = <label class='valueidyear'>"+$year +"</label> AND <br/>"+
           "payments.ispayment = 'N' AND <br/>"+
           "enrollments.idstatusschooltype IN (1,6,11,13,16) AND <br/>"+
           "payments.realdate < '<label class='valueidyear'>"+$year +"</label>-09-01' AND payments.idyear = <label class='valueidyear'>"+$year +"</label> <br/>"+
		   "ORDER BY enrollments.idgroup,Student,realdate;"
}