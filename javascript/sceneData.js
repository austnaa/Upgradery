// CONTAINS THE BLOCKS IN THE GAME... USED WHEN LEVEL IS LOADED



// {x: , y: , startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true}, // floor
// {x: 1, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true}, // wall (inside)

const blocks = [
    // up left wall
    {x: 0, y: 0, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 0, y: 1, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 0, y: 2, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},

    // ceiling on right
    {x: 19, y: 0, startRow: 0, startCol: 3, row: 2, col: 0, isCollidable: true},
    {x: 20, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 21, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 22, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 23, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 24, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 25, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 26, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 27, y: 0, startRow: 0, startCol: 3, row: 2, col: 1, isCollidable: true},
    {x: 28, y: 0, startRow: 0, startCol: 3, row: 2, col: 2, isCollidable: true},

    // row 3 (main top row)
    {x: 0, y: 3, startRow: 0, startCol: 3, row: 1, col: 3, isCollidable: true},
    {x: 1, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 2, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 3, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 4, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 5, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 6, y: 3, startRow: 0, startCol: 3, row: 0, col: 2, isCollidable: true},

    // row 4
    {x: 0, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 1, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 4, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},

    // row 5
    {x: 0, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 1, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 5, startRow: 0, startCol: 3, row: 1, col: 3, isCollidable: true},
    {x: 7, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 8, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 9, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 10, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 11, y: 5, startRow: 0, startCol: 3, row: 0, col: 2, isCollidable: true},

    {x: 18, y: 5, startRow: 0, startCol: 3, row: 0, col: 0, isCollidable: true},
    {x: 19, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 20, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 21, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 22, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 23, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 24, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 25, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 26, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 27, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 28, y: 5, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},

    // row 6
    {x: 1, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 7, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 8, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 9, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 10, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 11, y: 6, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},

    {x: 18, y: 6, startRow: 0, startCol: 3, row: 1, col: 0, isCollidable: true},
    {x: 19, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 20, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 21, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 22, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 23, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 24, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 25, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 26, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 27, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 28, y: 6, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    

    // row 7
    {x: 1, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 7, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 8, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 9, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 10, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 11, y: 7, startRow: 0, startCol: 3, row: 1, col: 3, isCollidable: true},
    {x: 12, y: 7, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 13, y: 7, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 14, y: 7, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 15, y: 7, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 16, y: 7, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 17, y: 7, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},

    {x: 18, y: 7, startRow: 0, startCol: 3, row: 1, col: 4, isCollidable: true},
    {x: 19, y: 7, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},

    // {x: , y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    // {x: , y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    // {x: , y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    

   

];


const hammers = [
    // {x: 12, y: 1},
    {x: 20, y: 1},
    {x: 24, y: 1},
    {x: 26, y: 1},
];

const transporters = [
    // {x: 17, y: 6, w: 2, movingRight: true},
    {x: 13.5, y: 5, w: 2, movingRight: true},
];





const cashLocals = [
    {x: 2.25, y: 2.25},
    {x: 2.75, y: 2.25},
    {x: 3.75, y: 2.25},
    {x: 3.75, y: 2.25},
    {x: 2.5, y: 1.75},
    {x: 3, y: 1.75},
    {x: 3.5, y: 1.75},

    {x: 7.25, y: 3},
    {x: 7.25, y: 3.5},
    {x: 7.25, y: 4},
    

    {x: 7.25, y: 4.5},
    {x: 7.75, y: 4.5},
    
    
    {x: 11.5, y: 4.25},


    {x: 13.5, y: 6.25},
    {x: 14, y: 6.25},
    {x: 14.5, y: 6.25},
    {x: 15, y: 6.25},
    {x: 15.5, y: 6.25},
    {x: 16, y: 6.25},
    
    {x: 22.25, y: 4.25},
    {x: 23.25, y: 4.25},
    // {x: , y: },
    // {x: , y: },
    // {x: , y: },
    // {x: , y: },

];