$(document).ready(function(){


	for(i = 1; i < 11; i++) {
		// Afficher le nom des taches
		$('thead tr:nth-child(1) th:nth-child(' + (i+1) + ')').text(localStorage["tache" + i + "name"]);

		// Afficher la priorite de la classe
		$('thead tr:nth-child(1) th:nth-child(' + (i+1) + ')').addClass(localStorage["tache" + i + "prio"]);
	}

	for(i = 1; i < 27; i++) {
		// Afficher le noms des eleves
		$('tbody tr:nth-child(' + i + ') td:nth-child(1)').text(localStorage["eleve" + i + "name"]);
	}

	// Sauvegarder le nom des eleves automatiquement
	$('tbody tr td').blur(function() {
		console.log($(this).text() + "   " + $(this).parent().index() + "   " + localStorage["eleve" + ($(this).parent().index() + 1) + "name"]);

		if (localStorage["eleve" + ($(this).parent().index() + 1) + "name"]!=$(this).text()) {

			localStorage["eleve" + ($(this).parent().index() + 1) + "name"] = $(this).text();
		}
	});

	// Sauvegarder le nom des taches automatiquement
	$('thead tr th').blur(function() {
		console.log($(this).text() + "   " + $(this).index() + "   " + localStorage["tache" + ($(this).index() + 1) + "name"]);

		if (localStorage["tache" + ($(this).index() ) + "name"]!=$(this).text()) {

			localStorage["tache" + ($(this).index() ) + "name"] = $(this).text();
		}
	});

	$("button.tache").on('click', function(){

		$(this).toggleClass("green");
		$(this).toggleClass("red");

		if($(this).hasClass("green")) {
			$(this).text("Fait");
		}
		else
		{
			$(this).text("À faire");
		}
	});

	$("div.prio-rouge").on('click', function() {

		for(i = 1; i < 3; i++) {

			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-rouge-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-jaune-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-vert-highlight");
		}

		for(i = 1; i < 27; i++) {

			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-rouge-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-jaune-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-vert-highlight");

		}


		localStorage["tache" + ($(this).parent().index()) + "prio"] = "prio-rouge-highlight";

	});

	$("div.prio-jaune").on('click', function() {
		for(i = 1; i < 3; i++) {
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-jaune-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-rouge-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-vert-highlight");
		}

		for(i = 1; i < 27; i++) {

			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-jaune-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-rouge-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-vert-highlight");

		}

		localStorage["tache" + ($(this).parent().index()) + "prio"] = "prio-jaune-highlight";
		console.log($(this).parent().index());
	});

	$("div.prio-vert").on('click', function() {

		for(i = 1; i < 3; i++) {
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-vert-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-rouge-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-jaune-highlight");
		}

		for(i = 1; i < 27; i++) {

			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-vert-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-rouge-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-jaune-highlight");

		}
		localStorage["tache" + ($(this).parent().index()) + "prio"] = "prio-vert-highlight";
		console.log($(this).parent().index());
	});


	// Reinitialiser une colonne
	$("button.reset-col").on('click', function(){
		var col = $(this).parent().index() + 1;

		$('table').find('tr:nth-child(1) th:nth-child(' + col + ')').text("Tâche " + (col-1));

		localStorage["tache" + (col -1) + "name"] = "Tâche " + (col-1);

		$('table').find('tr td:nth-child(' + col + ') button.tache').text("À faire");
		$('table').find('tr td:nth-child(' + col + ') button.tache').removeClass("green").addClass("red");	

		for(i = 1; i < 3; i++) {
			$('thead tr:nth-child(' + i + ') th:nth-child(' + (col) + ')').removeClass("prio-vert-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + (col) + ')').removeClass("prio-rouge-highlight");
			$('thead tr:nth-child(' + i + ') th:nth-child(' + (col) + ')').removeClass("prio-jaune-highlight");
		}

		for(i = 1; i < 27; i++) {

			$('tbody tr:nth-child(' + i + ') td:nth-child(' + (col) + ')').removeClass("prio-vert-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + (col) + ')').removeClass("prio-rouge-highlight");
			$('tbody tr:nth-child(' + i + ') td:nth-child(' + (col) + ')').removeClass("prio-jaune-highlight");

		}

		localStorage["tache" + (col-1)  + "prio"] = "";
	});


	// Reinitialiser tous sauf le nom des eleves
	$("button#reset-button").on('click', function(){
		$("td").find("button").removeClass("green");
		$("td").find("button").addClass("red");
		$("td").find("button").text("À faire");

		for(i = 2 ; i < 12; i++) {
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').text("Tâche " + (i-1));
			localStorage["tache" + (i -1) + "name"] = "Tâche " + (i-1);
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').removeClass("prio-vert-highlight");
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').removeClass("prio-rouge-highlight");
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').removeClass("prio-jaune-highlight");
			localStorage["tache" + (i -1) + "prio"] = "";
		}
	});

	// Verifier si le fureteur supporte la sauvegarde des donnees
	if(typeof(Storage) !== "undefined") {
	} else {
		alert("Le fureteur ne supporte pas la sauvegarde.");
		$('button#save-button').attr("disabled", true);
	}
});