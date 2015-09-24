$(document).ready(function(){

	$('#draggable-table').dragtable({dragaccept:'.accept-drag', dragHandle:'.anchor-drag', persistState: function(table) { 
		for(i = 1; i < 11; i++) {
			// Sauvegarder tous les taches
			localStorage["tache" + i + "name"] = $('thead tr:nth-child(1) th:nth-child(' + (i+1) + ')').text();
			localStorage["tache" + i + "prio"] = $('thead tr:nth-child(1) th:nth-child(' + (i+1) + ')').attr('class');
		}

		for(r = 1; r < 27; r++) {
			for(c = 1; c < 11; c++) {
				if($('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').hasClass("fait")) {
					localStorage["eleve" + (r) + "tache" + (c)] = "fait";
				}
				else if($('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').hasClass("corrige"))
				{
					localStorage["eleve" + (r) + "tache" + (c)] = "corrige";
				}
				else
				{
					localStorage["eleve" + (r) + "tache" + (c)] = "a-faire";
				}
			}
		}
	}

	});

	var mois = ["janvier", "février", "mars", "avril", "mai", "juin",
  	"juillet", "août", "septembre", "octobre", "novembre", "décembre"
	];

	var d = new Date();
	var dayOfWeek = d.getDay();

	var lundi;
	var vendredi;
	if(dayOfWeek == 0) {
		lundi = d.getDate() + 1;
		vendredi = d.getDate() + 5;
	}
	else if(dayOfWeek == 1) {
		lundi = d.getDate();
		vendredi = d.getDate() + 4;
	}
	else if(dayOfWeek > 1) {
		lundi = d.getDate() - dayOfWeek + 1;
		vendredi = d.getDate() - dayOfWeek + 5;
	}

	$('#semaine').text("Semaine du lundi " + lundi + " au vendredi " + vendredi + " " + mois[d.getMonth()] + " " + d.getFullYear());


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


	for(r = 1; r < 27; r++) {
		for(c = 1; c < 11; c++) {

			if(localStorage["eleve" + (r) + "tache" + (c)] == null || localStorage["eleve" + (r) + "tache" + (c)] == "undefined") {
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').addClass("a-faire");
			}
			else {
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').addClass(localStorage["eleve" + (r) + "tache" + (c)]);
			}
			
			if($('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').hasClass("fait")) {
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').text("Fait");
			}
			else if($('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').hasClass("corrige"))
			{
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').text("Corrigé");
			}
			else
			{
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').text("À faire");	
			}
		}
	}
	// Sauvegarder le nom des eleves automatiquement
	$('tbody tr td').blur(function() {
		if (localStorage["eleve" + ($(this).parent().index() + 1) + "name"]!=$(this).text()) {

			localStorage["eleve" + ($(this).parent().index() + 1) + "name"] = $(this).text();
		}
	});

	// Sauvegarder le nom des taches automatiquement
	$('thead tr th').blur(function() {
		if (localStorage["tache" + ($(this).index() ) + "name"]!=$(this).text()) {

			localStorage["tache" + ($(this).index() ) + "name"] = $(this).text();
		}
	});

	$("button.tache").on('click', function(){

		var eleve = $(this).parent().parent().index() + 1;
		var tache = $(this).parent().index();

		if($(this).hasClass("a-faire")) {
			$(this).removeClass("a-faire");
			$(this).addClass("fait");
			$(this).text("Fait");
			localStorage["eleve" + (eleve) + "tache" + (tache)] = "fait";
		} else if($(this).hasClass("fait")) {
			$(this).removeClass("fait");
			$(this).addClass("corrige");
			$(this).text("Corrigé");
			localStorage["eleve" + (eleve) + "tache" + (tache)] = "corrige";
		} else if($(this).hasClass("corrige")){
			$(this).removeClass("corrige");
			$(this).addClass("a-faire");
			$(this).text("À faire");
			localStorage["eleve" + (eleve) + "tache" + (tache)] = "a-faire";
		}
	});

	$("div.prio-rouge").on('click', function() {
		i = 1;
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-rouge-highlight");
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-jaune-highlight");
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-vert-highlight");

		localStorage["tache" + ($(this).parent().index()) + "prio"] = "prio-rouge-highlight";

	});

	$("div.prio-jaune").on('click', function() {
		i = 1;
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-jaune-highlight");
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-rouge-highlight");
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-vert-highlight");

		localStorage["tache" + ($(this).parent().index()) + "prio"] = "prio-jaune-highlight";
	});

	$("div.prio-vert").on('click', function() {

		i = 1;
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').addClass("prio-vert-highlight");
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-rouge-highlight");
		$('thead tr:nth-child(' + i + ') th:nth-child(' + ($(this).parent().index() + 1) + ')').removeClass("prio-jaune-highlight");
		localStorage["tache" + ($(this).parent().index()) + "prio"] = "prio-vert-highlight";
	});


	// Reinitialiser une colonne
	$("button.reset-col").on('click', function(){
		var col = $(this).parent().index() + 1;

		$('table').find('tr:nth-child(1) th:nth-child(' + col + ')').text("Tâche " + (col-1));

		localStorage["tache" + (col -1) + "name"] = "Tâche " + (col-1);

		$('table').find('tr td:nth-child(' + col + ') button.tache').text("À faire");
		$('table').find('tr td:nth-child(' + col + ') button.tache').removeClass("fait").removeClass("corrige").addClass("a-faire");	

		$('thead tr:nth-child(1) th:nth-child(' + (col) + ')').removeClass("prio-vert-highlight");
		$('thead tr:nth-child(1) th:nth-child(' + (col) + ')').removeClass("prio-rouge-highlight");
		$('thead tr:nth-child(1) th:nth-child(' + (col) + ')').removeClass("prio-jaune-highlight");

		localStorage["tache" + (col-1)  + "prio"] = "";
		for(r = 1; r < 27; r++) {
			localStorage["eleve" + (r) + "tache" + (col-1)] = "a-faire";
		}
	});


	// Reinitialiser tous sauf le nom des eleves
	$("button#reset-button").on('click', function(){
		$("td").find("button").removeClass("fait");
		$("td").find("button").addClass("a-faire");
		$("td").find("button").text("À faire");

		for(i = 2 ; i < 12; i++) {
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').text("Tâche " + (i-1));
			localStorage["tache" + (i -1) + "name"] = "Tâche " + (i-1);
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').removeClass("prio-vert-highlight");
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').removeClass("prio-rouge-highlight");
			$('table').find('tr:nth-child(1) th:nth-child(' + i + ')').removeClass("prio-jaune-highlight");
			localStorage["tache" + (i -1) + "prio"] = "";
		}

		for(r = 1; r < 27; r++) {
			for(c = 1; c < 11; c++) {
				localStorage["eleve" + (r) + "tache" + (c)] = "a-faire";
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').removeClass("fait");
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').removeClass("corrige");
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').addClass("a-faire");
				$('tbody tr:nth-child(' + r + ') td:nth-child(' + (c+1) + ') button.tache').text("À faire");
			}
		}
	});

	// Verifier si le fureteur supporte la sauvegarde des donnees
	if(typeof(Storage) !== "undefined") {
	} else {
		alert("Le fureteur ne supporte pas la sauvegarde.");
		$('button#save-button').attr("disabled", true);
	}
});