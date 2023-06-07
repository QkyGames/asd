var imported = document.createElement('script');
var apiLoaded = false;
var loadCompleted = false;
var loadData;
var saveData;

function createAkedoScript()
{
    imported.src = "https://d1gexlcc9fpq0t.cloudfront.net/sdk/akedo_sdk_js.js";
    document.head.appendChild(imported);
	
	imported.onload = function() {
		  initAkedo();
		};
}
createAkedoScript();

function createDiv(){
	var div = document.createElement("div")
	div.setAttribute("id", "akedo-loader")

	div.style.id = "akedo-loader";
	div.style.position = "fixed";
	div.style.width = "100%";
	div.style.height = "100%";
	div.style.background = "black";
	div.style.display = "flex";
	

	var elem = document.createElement("img");
	elem.setAttribute("src", "https://d1gexlcc9fpq0t.cloudfront.net/sdk/logo.png");
	elem.setAttribute("width", "150pt");
	elem.style.margin = "auto";
	
	div.appendChild(elem);
	
	document.body.insertBefore(div, document.body.firstChild);

}
createDiv();


function initAkedo()
{
   akedo_init("com.gemu.cut.and.dunk", function(res) {
	if (res) {
			document.getElementById("akedo-loader").style.display = "none";
			apiLoaded = true;
			LoadGameFromAkedo();
		}
	});
}

function LoadGameFromAkedo(){
	akedo_load_game_state(function(state) {
		loadData = state.value;
		loadCompleted = true;
	});	
}

function SaveGameToAkedo(){
	akedo_save_game_state(saveData, function(state) {
		console.log("Saved Game Akedo")
	});
}





const scriptsInEvents = {

	async Esplashqky_Event2_Act1(runtime, localVars)
	{
		runtime.globalVars["initApi"] = apiLoaded;
	},

	async Esplashqky_Event2_Act2(runtime, localVars)
	{
		runtime.globalVars["loadCompleted"] = loadCompleted;
	},

	async Esavegame_Event1_Act3(runtime, localVars)
	{
		saveData = runtime.globalVars["DataAkedo"];
	},

	async Esavegame_Event1_Act5(runtime, localVars)
	{
		SaveGameToAkedo();
	},

	async Esavegame_Event2_Act1(runtime, localVars)
	{
		runtime.globalVars["DataAkedo"] = loadData;
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

