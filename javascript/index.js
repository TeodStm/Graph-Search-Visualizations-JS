let color = "black";
function load_grid(parent_id, x_dim, y_dim){
	let parent_el = document.getElementById(parent_id);
	parent_el.style.setProperty('grid-template-rows', 'repeat('+String(x_dim)+', 1fr)');
	parent_el.style.setProperty('grid-template-columns','repeat('+String(y_dim)+', 1fr)');
	
	
	
	let id = 1;
	for(i = 0; i < x_dim; i++){
		for(j = 0; j < y_dim; j++){
			let btn = document.createElement('button');
			btn.setAttribute('id', String(id));
			btn.setAttribute('class', String('grid-items wall_mode'));
			
			//btn.setAttribute('onclick', 'make_wall(this.id)');
			btn.setAttribute('onmousedown', 'prepare_mouse_movement(this.id,"'+parent_id+'")');
			btn.setAttribute('onmouseup', 'clear_mouse_movement(this.id, "'+parent_id+'")');
			id += 1;
			
			parent_el.appendChild(btn);
		}
	}
}


function prepare_mouse_movement(btn_id, parent_id){
	//document.getElementById(btn_id).style.backgroundColor = "black";
	document.getElementById(btn_id).style.backgroundColor = color;
	
	let children = document.getElementById(parent_id).children;
	for(i = 0; i < children.length; i++){
		children[i].setAttribute('onmouseover', 'make_wall(this.id)')
	}
}

function clear_mouse_movement(btn_id, parent_id){
	let children = document.getElementById(parent_id).children;
	for(i = 0; i < children.length; i++){
		children[i].removeAttribute('onmouseover');
	}
}

function make_wall(btn_id){
	let start_color = "rgb(52, 235, 183)";
	let end_color = "rgb(235, 52, 52)";
	
	if(document.getElementById(btn_id).style.backgroundColor != start_color && document.getElementById(btn_id).style.backgroundColor != end_color) document.getElementById(btn_id).style.backgroundColor = color;
}


//// settings buttons utilities ///////
function erase(btn_id){
	let btn_color = document.getElementById(btn_id).style.backgroundColor;
	//change button color
	if(btn_color == "rgb(45, 45, 45)" || btn_color == ""){  // the first time background color has value of empty string
		document.getElementById(btn_id).style.backgroundColor = "rgb(100,100,100)";
		document.getElementById(btn_id).style.borderBottom = "2px solid rgb(51, 204, 255)";
		color = "rgb(200, 200, 200)";
		
		// change hover on grid buttons
		let grid = document.getElementById("game_grid");
		children = grid.children;
		for(i = 0; i < children.length; i++){
			children[i].classList.remove("wall_mode");			
			children[i].setAttribute("class", "grid-items eraser_mode");
		}
	}
	else if(btn_color == "rgb(100, 100, 100)"){
		document.getElementById(btn_id).style.borderBottom = "";
		document.getElementById(btn_id).style.backgroundColor = "";
		document.getElementById(btn_id).style.color = "none";
		
		color = "black";
		
		// change hover on grid buttons
		let grid = document.getElementById("game_grid");
		children = grid.children;
		for(i = 0; i < children.length; i++){
			children[i].classList.remove("eraser_mode");
			children[i].setAttribute("class", "grid-items wall_mode");
		}
	}	
}

function all_grid_black(){
	let grid = document.getElementById("game_grid");
	let children = grid.children;
	let start_color = "rgb(52, 235, 183)";
	let end_color = "rgb(235, 52, 52)";
	for(i = 0; i < children.length; i++){
	if(children[i].style.backgroundColor == start_color || children[i].style.backgroundColor == end_color) continue;
		children[i].style.backgroundColor = "black";
	}
}

function reset_grid(){
	//let grid = document.getElementById("game_grid");
	let grid = document.getElementsByClassName("grids")[0];
	grid.style.setProperty('grid-gap', '1px');
	let children = grid.children;
	for(i = 0; i < children.length; i++){
		children[i].style.animationName = "";
		children[i].style.backgroundColor = "rgb(200,200,200)";
	}
}

function set_point(btn_id){
	let btn_color = document.getElementById(btn_id).style.backgroundColor;
	let start_point_flag = false;
	let opposite_btn = "";
	if(btn_id == "start-point-btn"){
		start_point_flag = true;
		opposite_btn = "end-point-btn";
	}
	else opposite_btn = "start-point-btn";
	inactivate_button(opposite_btn);
	
	
	if(btn_color == "rgb(45, 45, 45)" || btn_color == ""){  //Activate Start point button -- the first time background color has value of empty string
		document.getElementById(btn_id).style.backgroundColor = "rgb(100,100,100)";
		document.getElementById(btn_id).style.borderBottom = "2px solid rgb(51, 204, 255)";
		//color = "rgb(200, 200, 200)";	
		
		//Set up grid buttons
		let children = document.getElementById("game_grid").children;
		for(i=0; i < children.length; i++){
			children[i].removeAttribute("onmouseup");
			children[i].removeAttribute("onmousedown");
			if(start_point_flag) children[i].setAttribute("onclick", "apply_start(this.id)");
			else children[i].setAttribute("onclick", "apply_end(this.id)");
		}
	}
	else{
		document.getElementById(btn_id).style.borderBottom = "";
		document.getElementById(btn_id).style.backgroundColor = "";
		document.getElementById(btn_id).style.color = "none";
		
		//Set up grid buttons
		let children = document.getElementById("game_grid").children;
		for(i=0; i < children.length; i++){
			children[i].setAttribute("onmouseup", 'clear_mouse_movement(this.id, "game_grid")');
			children[i].setAttribute("onmousedown", 'prepare_mouse_movement(this.id,"game_grid")');
			children[i].removeAttribute("onclick");
		}
	}
}

function inactivate_button(btn_id){
	document.getElementById(btn_id).style.borderBottom = "";
	document.getElementById(btn_id).style.backgroundColor = "";
	document.getElementById(btn_id).style.color = "none";
}

function apply_start(id){
	let start_color = "rgb(52, 235, 183)";
	let children = document.getElementById("game_grid").children;
	for(i=0; i < children.length; i++){
		if(children[i].style.backgroundColor == start_color) children[i].style.backgroundColor = "";		
		//children[i].removeAttribute("onclick");
		//children[i].setAttribute("onmousedown", 'prepare_mouse_movement(this.id,"game_grid")');
		//children[i].setAttribute("onmouseup", 'clear_mouse_movement(this.id, "game_grid")');
	}
	if(document.getElementById(id).style.backgroundColor != "black") document.getElementById(id).style.backgroundColor = start_color;  //if this cell is not a wall make it green
}

function apply_end(id){
	let end_color = "rgb(235, 52, 52)";
	let children = document.getElementById("game_grid").children;
	for(i=0; i < children.length; i++){
		if(children[i].style.backgroundColor == end_color) children[i].style.backgroundColor = "";		
		//children[i].removeAttribute("onclick");
		//children[i].setAttribute("onmousedown", 'prepare_mouse_movement(this.id,"game_grid")');
		//children[i].setAttribute("onmouseup", 'clear_mouse_movement(this.id, "game_grid")');
	}
	if(document.getElementById(id).style.backgroundColor != "black") document.getElementById(id).style.backgroundColor = end_color;  //if this cell is not a wall make it green
}

/*function lock_choice(){
	let grid = document.getElementsByClassName("grids");
	grid[0].style.setProperty('grid-gap', '0');
}*/
