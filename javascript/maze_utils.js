function lock_choice(){
	let grid = document.getElementsByClassName("grids");
	//grid[0].style.setProperty('grid-gap', '0');
	let Gr = new Grid(30, 40);
	Gr.find_path_dfs();
	Gr.color_path();
	//console.log("Final path");
	//for(let i = 0; i < Gr.final_path.length; i++){
	//	console.log(Gr.final_path[i]);
	//}

}

//let end_color = "rgb(235, 52, 52)";
//let start_color = "rgb(52, 235, 183)";

class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}

class Grid{
	constructor(xdim, ydim){
		let end_color = "rgb(235, 52, 52)";
		let start_color = "rgb(52, 235, 183)";
		
		this.grid = [...Array(xdim)].map(e => Array(ydim));
		this.explored = [...Array(xdim)].map(e => Array(ydim));
		this.xdim = xdim;
		this.ydim = ydim;
		this.final_path = [];
		//this.xstart = 0;
		//this.ystart = 0;
		//this.xend = xdim - 1;
		//this.xend = ydim - 1;
		
		let id_count = 1;
		/*** Initialize grid ***/
		//(-1) for start cell
		//(0) for wall
		//(1) for empty cell
		//(2) for target cell
		for(let i = 0; i < xdim; i++){
			for(let j = 0; j < ydim; j++){
				this.explored[i][j] = false;
				let cell_color = document.getElementById(String(id_count)).style.backgroundColor;
				if(cell_color == "black") this.grid[i][j] = 0;
				else if(cell_color == start_color){
					this.x_start = i;
					this.y_start = j;
					this.grid[i][j] = -1;
				}
				else if(cell_color == end_color){
					this.x_end = i;
					this.y_end = j;
					this.grid[i][j] = 2;
				}
				else this.grid[i][j] = 1;
				id_count++;
			}
		}
	}
	
	print_dims(){
		console.log(this.xdim);
		console.log(this.ydim);
	}
	print_grid(){
		for(let i = 0; i < this.xdim; i++){
			for(let j = 0; j < this.ydim; j++){
				console.log(this.grid[i][j]);
			}
		}
	}
	
	color_path(){
		for(let i = 0; i < this.final_path.length; i++){
			let id = String(this.final_path[i].x * this.ydim + this.final_path[i].y + 1);
			let delay = String((this.final_path.length - i) / 16);
			
			if(delay >= 100) delay = delay.substring(0,5);
			else if( delay >= 10 ) delay = delay.substring(0,4);
			else delay = delay.substring(0,3);

			document.getElementById(id).style.animationName = "cell";
			document.getElementById(id).style.animationDuration = "5s";
			document.getElementById(id).style.animationDelay = delay+"s";
			document.getElementById(id).style.animationFillMode = "forwards";
		}
	}
	
	find_path_dfs(){
		let starting_point = new Point(this.x_start, this.y_start);
		this.explored[starting_point.x][starting_point.y] = true;
		let neighbours = this.expand_neighbours(starting_point, null);
		
		for(let i = 0; i < neighbours.length; i++){
			this.dfs_search(neighbours[i], starting_point);
		}
		//this.final_path.push(starting_point);
	}
	
	expand_neighbours(current_point, parent_point){
		let left;
		let right;
		let up;
		let down;
		
		if(current_point.y-1 < 0) left = null;                                                             // out of grid
		else if(this.grid[current_point.x][current_point.y-1] == 0) left = null;                         // it's a wall
		else if(parent_point != null && current_point.x == parent_point.x && current_point.y-1 == parent_point.y) left = null;   // it is the parent point
		else left = new Point(current_point.x, current_point.y-1);		                                 // valid neighbour
		
		if(current_point.y+1 >= this.ydim) right = null;
		else if(this.grid[current_point.x][current_point.y+1] == 0) right = null;
		else if(parent_point != null && current_point.x == parent_point.x && current_point.y+1 == parent_point.y) right = null;
		else right = new Point(current_point.x, current_point.y+1);
		
		if(current_point.x-1 < 0) up = null;
		else if(this.grid[current_point.x-1][current_point.y] == 0) up = null;
		else if(parent_point != null && current_point.x-1 == parent_point.x && current_point.y == parent_point.y) up = null;
		else up = new Point(current_point.x-1, current_point.y);		
		
		if(current_point.x+1 >= this.xdim) down = null;
		else if(this.grid[current_point.x+1][current_point.y] == 0) down = null;
		else if(parent_point != null && current_point.x+1 == parent_point.x && current_point.y == parent_point.y) down = null;
		else down = new Point(current_point.x+1, current_point.y);
		
		let neighbours = new Array();
		if(left != null && this.explored[left.x][left.y] == false) neighbours.push(left);
		if(right != null && this.explored[right.x][right.y] == false) neighbours.push(right);
		if(up != null && this.explored[up.x][up.y] == false) neighbours.push(up);
		if(down != null && this.explored[down.x][down.y] == false) neighbours.push(down);
		
		return neighbours;
	}
	
	dfs_search(current_point, parent_point){
		if(current_point.x == this.x_end && current_point.y == this.y_end){  //target found
			//this.final_path.push(current_point);
			return true;
		}
		this.explored.push(current_point);
		this.explored[current_point.x][current_point.y] = true;
		
		let neighbours = this.expand_neighbours(current_point, parent_point);
		//console.log(current_point.x+" "+current_point.y);
		//iterate through neighbours
		for(let i = 0; i < neighbours.length; i++){
			if( this.dfs_search(neighbours[i], current_point) ){
				//add current point to set
				this.final_path.push(current_point);
				return true;
			}
		}
		return false;
	}
}









