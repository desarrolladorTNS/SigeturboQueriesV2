    var DateObject = new Date();
	var DateNow = DateObject.toISOString().slice(0,10);
	var DateTimeNow = DateObject.toISOString().slice(0,10)+' 00:00:00';
	function ejecutar(index)
    {
    	document.getElementById("querydescription").innerHTML ="";
    	var query="";
    	var parametersquery = {};
    	document.getElementById("titlequery").innerHTML = document.getElementById(index).innerHTML;
        switch (index) {
		    case '1':
		    	parametersquery['idyear'] = 2016;
		    	parametersquery['idstatusschooltype'] = '1,5,6,11';
				document.getElementById("paramsquery").innerHTML = '<label style="font-size: 1.5em;">Parámetros</label> </br>'+mostrarparametros(parametersquery);
		        query = "SELECT users.iduser AS 'User', groups.name AS 'Groups',CONCAT_WS(CONVERT(' ' USING latin1),users.lastname,users.firstname) AS 'Student', <br/>"+
						"users.birth,(YEAR(CURRENT_DATE) - YEAR(users.birth))-(RIGHT(CURRENT_DATE,5) < RIGHT(users.birth,5)) AS 'Age',users.phone AS 'Phone',users.address AS 'Address',<br/>"+
						"statusschooltypes.name AS 'Status' <br/>FROM users <br/> INNER JOIN enrollments ON enrollments.iduser = users.iduser <br/>INNER JOIN groups ON groups.idgroup = enrollments.idgroup "+
						" INNER JOIN statusschooltypes On statusschooltypes.idstatusschooltype=enrollments.idstatusschooltype <br/>WHERE enrollments.idyear = <label class='valueidyear'>"+parametersquery['idyear'] +"</label> AND <br/>"+
						"enrollments.idstatusschooltype IN (<label class='valueidstatusschooltype'>"+parametersquery['idstatusschooltype']+"</label>) <br/>ORDER BY groups.idgroup,Student;";
					parametersquery = {};	
				document.getElementById("querydescription").innerHTML = '<label style="font-size: 1.5em;">Esta consulta muestra el Listado de todos los estudiantes que se encuetran en el Colegio</label>';
		        break;
		    case '9':
		    	parametersquery['idyear'] = 2016;
				document.getElementById("paramsquery").innerHTML = '<label style="font-size: 1.5em;">Parámetros</label> </br>'+mostrarparametros(parametersquery);
		        query =listadoestudiantes(parametersquery['idyear']);
					parametersquery = {};	
				document.getElementById("querydescription").innerHTML = '<label style="font-size: 1.5em;">Esta consulta muestra el Listado de todos los estudiantes que no tienen Responsables Ecónomicos</label>';
		        break;
			case '30':
		    	parametersquery['idyear'] = 2019;
				document.getElementById("paramsquery").innerHTML = '<label style="font-size: 1.5em;">Parámetros</label> </br>'+mostrarparametros(parametersquery);
		        query = PendingsByMonth(parametersquery['idyear']);
					parametersquery = {};	
				document.getElementById("querydescription").innerHTML = '<label style="font-size: 1.5em;">Esta consulta muestra el Listado de todos los estudiantes que no tienen Responsables Ecónomicos</label>';
		        break;
			case '7':
		       	parametersquery['idyear'] = 2016;
		       	parametersquery['idgroup'] = "NULL";
		       	parametersquery['idsubject'] = "NULL";
		       	parametersquery['iduser'] = "NULL";
				document.getElementById("paramsquery").innerHTML = '<label style="font-size: 1.5em;">Parámetros</label> </br>'+mostrarparametros(parametersquery);
		        query = "CALL sigeturbo.`globalPerformanceByPeriodInCols`(<label class='valueidyear'>"+parametersquery['idyear'] +"</label>, <label class='valueidgroup'>"+parametersquery['idgroup'] +"</label>/*Grupo*/, <label class='valueidsubject'>"+parametersquery['idsubject'] +"</label>  /*Asignatura*/, <label class='valueiduser'>"+parametersquery['iduser'] +"</label> /*Código Estudiante*/, NULL /*NOT IN Código Estudiante*/);";
		       	document.getElementById("querydescription").innerHTML = '<label style="font-size: 1.5em;">Esta consulta muestra las Notas Finales de Cada Periodo y la nota Final del Año</label>';
				parametersquery = {};
			    break; 
		}
		document.getElementById("descriptionquery").innerHTML = query;
    }

    function setparaminquery($valor,$id){
    	//alert($id);
    	document.getElementById($id).innerText = ($valor==="" || $valor===null || $valor===undefined ) ? changeparams($id,'Poner Parámetro') : changeparams($id,$valor) ;
    }

    function changeparams($id,$value){
    	x=document.getElementsByClassName($id);  // Find the elements
		for(var i = 0; i < x.length; i++){
		    x[i].innerText=$value;    // Change the content
	    }
    }

    function mostrarparametros(objectsparametersquery){
    	var string="<ul>";
		total = Object.keys(objectsparametersquery).length;
		count = 0;
		var string = "";
		for(var $propertyName in objectsparametersquery) {
	    	switch ($propertyName) {
			    case 'idyear':
					string +=  "<li><label id='param"+$propertyName+"'>Año : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='2016' placeholder='Año Academico' title='Año Académico' required='true'></li>";
					break;
			    case 'idarea':
					string +=  "<li><label id='param"+$propertyName+"'>Area Académica: </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NULL' placeholder='Area Academica' title='Area Académica' required='true'></li>";
					break;
			    case 'idperiod':
					string +=  "<li><label id='param"+$propertyName+"'>Periodo Académico: </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='1' placeholder='Periodo Academico' title='Periodo Académico' required='true'></li>";
			        break;
			    case 'iduser':
					string +=  "<li><label id='param"+$propertyName+"'>Código de Usuario : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NULL' placeholder='Código de Usuario' title='Código de Usuario' required='true'></li>";
			        break;
			    case 'idgroup':
					string +=  "<li><label id='param"+$propertyName+"'>Código de Grupo : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NULL' placeholder='Código de Grupo' title='Código de Grupo' required='true'></li>";
			        break;
			    case 'idsubject':
					string +=  "<li><label id='param"+$propertyName+"'>Código de Asignatura : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NULL' placeholder='Código de Asignatura' title='Código de Asignatura' required='true'></li>";
			        break;
			    case 'idsubjectnotin':
					string +=  "<li><label id='param"+$propertyName+"'>Código de Asignaturas a no tener  en cuenta : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text'  style='width: 30%;'  value='NULL' placeholder='Códigos de Asignaturas para no tener en cuenta' title='Códigos de Asignaturas para no tener en cuenta' required='true'></li>";
			        break;
			    case 'amount':
					string +=  "<li><label id='param"+$propertyName+"'>Cantidad: </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='1' placeholder='Cantidad' title='Cantidad' required='true'></li>";
			        break;
			    case 'register':
					string +=  "<li><label id='param"+$propertyName+"'>Fecha de Registro : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NOW()' placeholder='Fecha de Registro' title='Fecha de Registro' required='true'></li>";
			        break;
			    case 'rating':
					string +=  "<li><label id='param"+$propertyName+"'>Fecha de Calificación : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NOW()' placeholder='Fecha de Calificación' title='Fecha de Calificación' required='true'></li>";
			        break;
			    case 'end':
					string +=  "<li><label id='param"+$propertyName+"'>Fecha de Finalización : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='NOW()' placeholder='Fecha de Finalización' title='Fecha de Finalización' required='true'></li>";
			        break;
			    case 'idcategory':
					string +=  "<li><label id='param"+$propertyName+"'>Categorías : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='1,5,6,11' placeholder='Categorías' title='Categorías' required='true'></li>";
					break;
			    case 'idstatusschooltype':
					string +=  "<li><label id='param"+$propertyName+"'>Estados Académicos : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='1,5,6,11' placeholder='Estados Académicos' title='Estados Académicos' required='true'></li>";
					break;
				case 'created_at':
					string +=  "<li><label id='param"+$propertyName+"'>Fecha de Creación de Registro : </label><input onkeyup='setparaminquery(this.value,this.id)' name='value"+$propertyName+"' id='value"+$propertyName+"' type='text' value='"+DateTimeNow+"' placeholder='YYYY-MM-DD' title='Fecha de Creación de Registro' required='true'></li>";
					break;
			}
			//document.getElementById("value"+$propertyName).innerHTML = objectsparametersquery[$propertyName];
			count++;
			if(count == total ){
				string+="</ul>"
			}
		}
		return string;
    }