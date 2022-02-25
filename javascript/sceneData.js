// CONTAINS THE BLOCKS IN THE GAME... USED WHEN LEVEL IS LOADED



// {x: , y: , startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true}, // floor
// {x: 1, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true}, // wall (inside)

const blocks = [
    // up left wall
    {x: 0, y: 0, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 0, y: 1, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 0, y: 2, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},

    // row 3 (main top row)
    {x: 0, y: 3, startRow: 0, startCol: 3, row: 1, col: 3, isCollidable: true},
    {x: 1, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 2, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 3, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 4, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 5, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    {x: 6, y: 3, startRow: 0, startCol: 3, row: 0, col: 2, isCollidable: true},

    // row 2
    {x: 0, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 1, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 4, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 4, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},

    // row 3
    {x: 0, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 1, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 7, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 8, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 9, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 10, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    // {x: 11, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    // {x: 12, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 13, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 14, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    {x: 15, y: 5, startRow: 0, startCol: 3, row: 1, col: 2, isCollidable: true},
    

    // row 4
    {x: 0, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 1, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 2, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 3, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 4, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 5, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 6, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 7, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 8, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 9, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},
    {x: 10, y: 5, startRow: 0, startCol: 3, row: 1, col: 1, isCollidable: true},

    // {x: 5, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    // {x: 6, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    // {x: 7, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    // {x: 8, y: 3, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    // {x: 9, y: 3, startRow: 0, startCol: 3, row: 0, col: 2, isCollidable: true},
    
    

    
    
    // {x: 7, y: 4, startRow: 0, startCol: 3, row: 0, col: 0, isCollidable: true},
    // {x: 8, y: 4, startRow: 0, startCol: 3, row: 0, col: 1, isCollidable: true},
    // {x: 9, y: 4, startRow: 0, startCol: 3, row: 0, col: 2, isCollidable: true},

    



];