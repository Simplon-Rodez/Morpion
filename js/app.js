(function main(){

    var getTable = $('.morpion--table');
    var checkTable = [
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"],
    ];

    var player1 = {
        render: "<span class='render--player'>x</span>",
        sign: "x",
    }

    var player2 = {
        render: "<span class='render--player'>o</span>",
        sign: "o",
    }

    var round = false; 
    var column = 3;
    var row = 3;

    function play(player, self){
        var id = $(self).attr('id');
        console.log(id);
        var x = id.charAt(1);
        var y = id.charAt(3);
        if(checkTable[x][y] === "0"){
            checkTable[x][y] = player.sign;
            $('#'+id).html(player.render);
            return round = !round;
        }
    }

    function choisePlayer(){ 
        if(!round){
            play(player1, this);        
        }
        play(player2, this);
    }

    function start(){
        choisePlayer.call(this);
        getScored();
    }

    function getScored(){
        for(var i=0; i < checkTable.length; i++){
           checked(checkTable[i][0], checkTable[i][1], checkTable[i][2]);
           checked(checkTable[0][i], checkTable[1][i], checkTable[2][i]);
        }
        checked(checkTable[0][0], checkTable[1][1], checkTable[2][2]);    
        checked(checkTable[0][2], checkTable[1][1], checkTable[2][0]);      
    }

    function checked(a, b, c){
        if(a !== "0" && a === b &&  c === b && b === a){
            var response = round ? "Player1" : "Player2";
            $('.result').append("<li>"+response+"</li>");
            //generateTable();
            return checkTable = [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"],       
            ]

        }
       
    }

    function generateTable(column, row){
        for(var i = 0; i < column; i++){
            var line;
            for(var j = 0; j < row; j++){
                position = "x"+i+"y"+j;
                line += "<td id='"+position+"'></td>"
            }
            getTable.append('<tr>'+line+'</tr>');
            line = "";
        }
    }

    if(getTable.length > 0){
        // Récuperer les id des td lors du click sur ceux ci
        // Récuperer l'axe x le stocker dans une variable x        
        // Récuperer l'axe y le stocker dans une variable y
        // Remplacer dans le tableau 'checkTable' le 0 correspondant à la coordonnée récupéré precedemment
        generateTable(column, row);
        $('.morpion--table td').on('click', start);
    }

})();
