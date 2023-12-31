export function dummy_fetch_nn(query, node) {
    if (node === null || node.content === 'a') {
      // Return 15 new nodes when node is null
      return [
        { id: 1, content: 'a' }, { id: 2, content: 'b' }, { id: 3, content: 'c' },
        { id: 4, content: 'd' }, { id: 5, content: 'e' }, { id: 6, content: 'f' },
        { id: 7, content: 'g' }, { id: 8, content: 'h' }, { id: 9, content: 'i' },
        { id: 10, content: 'j' }, { id: 11, content: 'k' }, { id: 12, content: 'l' },
        { id: 13, content: 'm' }, { id: 14, content: 'n' }, { id: 15, content: 'o' }
      ];
    } else {
      // Return 15 new nodes with different ids when node is not null
      return [
        { id: 101, content: 'A' }, { id: 102, content: 'B' }, { id: 103, content: 'C' },
        { id: 104, content: 'D' }, { id: 105, content: 'E' }, { id: 106, content: 'F' },
        { id: 107, content: 'G' }, { id: 108, content: 'H' }, { id: 109, content: 'I' },
        { id: 110, content: 'J' }, { id: 111, content: 'K' }, { id: 112, content: 'L' },
        { id: 113, content: 'M' }, { id: 114, content: 'N' }, { id: 115, content: 'O' }
      ];
    }
  }

export async function fetch_nn(query, node, dataset) {
  // WORDS
  if (dataset === "words") {
    if (node !== null) {
      query = node.word;
    }
    let url = `http://localhost:5002/get_similar_words?query=${query}`;
    let data = await fetch(url).then(res => res.json())
    // add id=_row_id to each node
    data = data.map((node, index) => {
      node.id = node._row_id;
      return node;
    });
    return data;
  // VIDEOS
  } else if (dataset === "videos") {
    if (node !== null) {
      query = node.transcript;
    }
    let url = `http://localhost:5001/get_similar_videos?query=${query}`;
    let data = await fetch(url).then(res => res.json())
    // add id=_row_id to each node
    data = data.map((node, index) => {
      node.id = node._row_id;
      return node;
    });
    return data;
  // WIKIPEDIA
  } else if (dataset === "wikipedia") {
    if (node !== null) {
      query = node.content;
    }
    let url = `http://34.31.68.141:5001/query_question?query=${query}`;
    let data = await fetch(url).then(res => res.json())
    // TODO: ADD ID
    return data;
  // GAMES
  } else {
      // http://localhost:5000/get_similar_games?query=competitive%20battle%20royale
      if (node !== null) {
        query = node.full_desc;
      };

      let data = await fetch(`http://localhost:5000/get_similar_games?query=${query}`).then(res => res.json())
      // add id=_row_id to each node
      data = data.map((node, index) => {
        node.id = node._row_id;
        return node;
      });
      return data;
  }
}
  

export function polarToCartesian(position) {
    // Convert angle from degrees to radians
    let angleRadians = position.theta * (Math.PI / 180);

    // Calculate Cartesian coordinates
    let rel_x = position.ux_dist * Math.cos(angleRadians);
    let rel_y = position.ux_dist * Math.sin(angleRadians);

    // Return the coordinates
    return { rel_x, rel_y };
}

export let positions = [
    { pos_id: 0, ux_dist: 0, theta: 0 },
    { pos_id: 1, ux_dist: 400, theta: 295 },
    { pos_id: 2, ux_dist: 425, theta: 250 },
    { pos_id: 3, ux_dist: 500, theta: 210 },
    { pos_id: 4, ux_dist: 500, theta: 170 },
    { pos_id: 5, ux_dist: 525, theta: 130 },
    { pos_id: 6, ux_dist: 500, theta: 90 },
    { pos_id: 7, ux_dist: 600, theta:  50 },
    { pos_id: 8, ux_dist: 650, theta: 10 },
    { pos_id: 9, ux_dist: 650, theta: 330 }
];

positions.map(position => {
    let { rel_x, rel_y } = polarToCartesian(position);
    position.rel_x = rel_x;
    position.rel_y = rel_y;
    return position;
});

export async function init_position_nodes(query, dataset) {
    const fetchedNodes = await fetch_nn(query, null, dataset);
    const nodePositionTable = fetchedNodes.slice(0, 10).map((node, index) => {  // assuming we get the fetchedNodes in sorted order, 
      return { node_id: node.id, pos_id: positions[index].pos_id };
    });
    return {
        nodes: fetchedNodes.slice(0, 10),
        node_positions: nodePositionTable,
        selected_node_id: fetchedNodes[0].id
    }
  }

export function calculatePolarAngle(node, center) {
    return Math.atan2(node.y - center.y, node.x - center.x) * (180 / Math.PI);
}
export async function new_neighbors(query, old_neighbors, old_node_positions, old_center_node_id, new_center_node_id, dataset) {
    // Fetch new neighbors
    let node = old_neighbors.find(neighbor => neighbor.id === new_center_node_id);
    console.log("node: ", node);
    let fetchedNewNeighbors = await fetch_nn(query, node, dataset);
    console.log("fetchedNewNeighbors: ", fetchedNewNeighbors);
    // remove node from fetchedNewNeighbors and old_neighbors ( use filter )
    fetchedNewNeighbors = fetchedNewNeighbors.filter(newNode => newNode.id !== node.id);
    old_neighbors = old_neighbors.filter(oldNeighbor => oldNeighbor.id !== node.id);
    console.log("fetchedNewNeighbors: ", fetchedNewNeighbors);
    console.log("old_neighbors: ", old_neighbors);

  
    // Intersect old_neighbors with fetchedNewNeighbors by node id to get preservedNeighbors
    let preservedNeighbors = [];
    preservedNeighbors.push(old_neighbors.find(neighbor => neighbor.id === old_center_node_id));
    // iterate thru the fetchedNewNeighbors and add it if it is not already in the preservedNeighbors and it is in old_neighbors
    for (let i = 0; i < fetchedNewNeighbors.length; i++) {
      if (preservedNeighbors.length >= 3) {
        break;
      }
      if (!preservedNeighbors.includes(fetchedNewNeighbors[i]) && old_neighbors.includes(fetchedNewNeighbors[i])) {
        preservedNeighbors.push(fetchedNewNeighbors[i]);
      }
    }
    // top off with old_neighbors if less than 3 preservedNeighbors
    for (let i = 0; i < old_neighbors.length; i++) {
      if (preservedNeighbors.length >= 3) {
        break;
      }
      if (!preservedNeighbors.includes(old_neighbors[i])) {
        preservedNeighbors.push(old_neighbors[i]);
      }
    }
    console.log("preservedNeighbors: ", preservedNeighbors);

    // Get the top six nodes from new_neighbors which are not in the preserved_neighbors
    let newExclusiveNeighbors = fetchedNewNeighbors.filter(newNode =>
      !preservedNeighbors.some(preservedNode => preservedNode.id === newNode.id)
    ).slice(0, 6);
    console.log("newExclusiveNeighbors: ", newExclusiveNeighbors);
 

    let availablePositions = [...positions];
    let positionsTable = [];

    // Set queried node to the center
    positionsTable.push({ node_id: node.id, pos_id: 0 });
    availablePositions = availablePositions.filter(position => position.pos_id !== 0);

    // move the preserved_neighbors to have a similar theta
    for (let i = 0; i < preservedNeighbors.length; i++) {
        let new_ctr_pos_id = old_node_positions.find(assigned => assigned.node_id === new_center_node_id).pos_id;
        let new_ctr_pos = positions.find(position => position.pos_id === new_ctr_pos_id);
        let curr_pos_id = old_node_positions.find(assigned => assigned.node_id === preservedNeighbors[i].id).pos_id;
        let curr_pos = positions.find(position => position.pos_id === curr_pos_id);
        let rel_x_to_new_ctr = curr_pos.rel_x - new_ctr_pos.rel_x;
        let rel_y_to_new_ctr = curr_pos.rel_y - new_ctr_pos.rel_y;
        let new_theta = Math.atan2(rel_y_to_new_ctr, rel_x_to_new_ctr) * (180 / Math.PI);
        // find the position with the closest theta
        let closestPosition = availablePositions.reduce((closest, current) => {
            // mod 360
            let currentDifference = Math.abs((current.theta - new_theta + 360) % 360);
            let closestDifference = Math.abs((closest.theta - new_theta + 360) % 360);
            return currentDifference < closestDifference ? current : closest;
        });
        // add the preserved_neighbor to the positionsTable and remove the position from availablePositions
        positionsTable.push({ node_id: preservedNeighbors[i].id, pos_id: closestPosition.pos_id });
        availablePositions = availablePositions.filter(position => position.pos_id !== closestPosition.pos_id);
    }
  
    // Associate the six new nodes to the remaining six positions
    for (let i = 0; i < newExclusiveNeighbors.length; i++) {
      positionsTable.push({ node_id: newExclusiveNeighbors[i].id, pos_id: availablePositions[i].pos_id });
    }
    // this works because both newExclusiveNeighbors and availablePositions are in priority order
  
    // Return the new list of nine nodes and its position table
    console.log("nodes: ", [node, ...preservedNeighbors, ...newExclusiveNeighbors]);
    console.log("positionsTable: ", positionsTable);
    return {
      nodes: [node, ...preservedNeighbors, ...newExclusiveNeighbors],
      node_positions: positionsTable,
    };
  }
  