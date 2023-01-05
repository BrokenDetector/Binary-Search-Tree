import Tree from "./binarySearchTrees.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function RandomArray(count) {
    const rands = [];
    for (let i = 0; i < count; i++) {
        rands[i] = Math.floor(Math.random() * 101);
    };
    return rands;
};

function addNumbers(num) {
    const array = RandomArray(num);
    for (let i = 0; i < num; i++) {
        arr.insert(array[i]);
    };
};


//const arr = new Tree([1, 2, 3, 4, 5, 6, 7]); // Create a BST form an array 
const arr = new Tree(RandomArray(7)); // Create a BST form an array of random numbers

// Tests

//console.log(arr.find(2));
//console.log(arr.levelOrder());
console.log(arr.isBalanced()); // Check if tree is balanced
console.log(arr.inorder()); // Display array of inorder depth-first order
console.log(arr.preorder()); // Display array of preorder depth-first order
console.log(arr.postorder()); // Display array of postorder depth-first order
console.log(arr.levelOrder()); // Display array of breadth-first level order
addNumbers(101);
console.log(arr.isBalanced()); // Check if tree is balanced

arr.rebalance() // Rebalance tree
console.log(arr.isBalanced()); // Check if tree is balanced
console.log(arr.inorder()); // Display array of inorder depth-first order
console.log(arr.preorder()); // Display array of preorder depth-first order
console.log(arr.postorder()); // Display array of postorder depth-first order
console.log(arr.levelOrder()); // Display array of breadth-first level order

//prettyPrint(arr.root); // Print tree