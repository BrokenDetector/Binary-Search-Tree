import Node from "./node.js";

export default class Tree {
    constructor(data) {
        this.root = this.buildTree(data);
    };

    buildTree(arr) {
        const sortedArray = this.sortArray(arr);
        const uniqueValueArray = this.deleteDuplicates(sortedArray);
        const n = uniqueValueArray.length;
        const root = this.sortedArrayToBST(arr, 0, n - 1);
        return root;
    };

    sortArray(arr) {
        const sorted = arr.sort((a, b) => a - b);
        return sorted;
    };

    deleteDuplicates(arr) {
        const uniques = [...new Set(arr)];
        return uniques;
    };

    sortedArrayToBST(arr, start, end) {
        if (start > end) return null;

        const mid = parseInt((start + end) / 2, 10);
        const node = new Node(arr[mid]);

        node.left = this.sortedArrayToBST(arr, start, mid - 1);
        node.right = this.sortedArrayToBST(arr, mid + 1, end);
        return node;
    };

    insert(value, node = this.root) {
        if (node == null) {
            node = new Node(value);
            return node;
        }

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        }
        else if (value > node.data) {
            node.right = this.insert(value, node.right);
        };

        return node;
    };

    delete(node, value) {
        if (node == null) return node;
        if (value < node.data) {
            node.left = this.delete(node.left, value)
        }
        else if (value > node.data) {
            node.right = this.delete(node.right, value);
        }
        else {
            // node with only one child or no child
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            // node with two children
            node.data = this.minValue(node.right);
            node.right = this.delete(node.right, node.data);
        };
        return node;
    };

    minValue(node) {
        let minv = node.data;
        while (node.left != null) {
            minv = node.left.data;
            node = node.left;
        };

        return minv;
    };

    find(value, node = this.root) {
        if (node == null || node.data == value) return node;
        if (node.data < value) {
            return this.find(value, node.right);
        };
        if (node.data > value) {
            return this.find(value, node.left);
        };
    };

    levelOrder(func = this.toArray) {
        const queue = [this.root];
        const levelOrdeList = [];
        while (queue.length > 0) {
            const node = queue[0];
            func(levelOrdeList, node.data);
            if (node.left != null) queue.push(node.left);
            if (node.right != null) queue.push(node.right);
            queue.shift();
        };
        return levelOrdeList;
    };

    inorder(node = this.root, func = this.toArray, inorderList = []) {
        if (node === null) return;
        if (node) {
            this.inorder(node.left, func, inorderList);
            func(inorderList, node.data);
            this.inorder(node.right, func, inorderList);
        };
        return inorderList;
    };

    preorder(node = this.root, func = this.toArray, preorderList = []) {
        if (node === null) return;
        if (node) {
            func(preorderList, node.data);
            this.preorder(node.left, func, preorderList);
            this.preorder(node.right, func, preorderList);
        };
        return preorderList;
    };

    postorder(node = this.root, func = this.toArray, postorderList = []) {
        if (node === null) return;
        if (node) {
            this.postorder(node.left, func, postorderList);
            this.postorder(node.right, func, postorderList);
            func(postorderList, node.data);
        }
        return postorderList;
    };

    toArray(arr, value) {
        arr.push(value);
    };

    height(node) {
        if (node === null) return 0;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    };

    depth(data, node = this.root) {
        if (data.data == node.data) return 0;
        if (data.data < node.data) {
            return this.depth(data, node.left) + 1
        };
        if (data.data > node.data) {
            return this.depth(data, node.right) + 1
        };
    };

    isBalanced() {
        const AllNodes = this.inorder();
        for (let i = 0; i < AllNodes.length; i++) {
            const node = this.find(AllNodes[i]);
            const leftSubtree = this.height(node.left);
            const rightSubtree = this.height(node.right);
            if (Math.abs(leftSubtree - rightSubtree) > 1) return false;
        };
        return true;
    };

    rebalance() {
        this.root = this.buildTree(this.inorder());
    };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};