class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    setValue(value){
        this.value = value;
    }

    setLeft(node){
        this.left = node;
    }

    setRight(node){
        this.right = node;
    }

    getValue(){
        return this.value;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }
}

class Tree{
    constructor(array){
        if(array == null){
            throw new Error("Empty array provided.")
        }
        this.treeArray = array;

        this.treeRoot = null;
        
        this.initTree();
    }

    initTree(){
        //this.sortArray();
        this.treeArray = this.mergeSort(this.treeArray);
        this.treeRoot = this.populateTree(this.treeArray);
    }

    setArray(array){
        this.treeArray = this.mergeSort(array);
    }

    clearRoot(){
        this.treeRoot = null;
    }

    // duplicateCheck(array){

    // }

    getRoot(){
        return this.treeRoot;
    }

    add(value){
        let navNode = this.getRoot();
        let newNode = new Node(value);
        while(true){
            if(value == navNode.getValue()){
                throw new Error("Value already exists");
            }else if(value < navNode.getValue()){
                if(navNode.getLeft()){
                    navNode = navNode.getLeft();
                }else{
                    navNode.setLeft(newNode);
                    break;
                }
            }else{
                if(navNode.getRight()){
                    navNode = navNode.getRight();
                }else{
                    navNode.setRight(newNode);
                    break;
                }
            }
        }
    }

    find(value){
        let navNode = this.getRoot();
        while(true){
            if(value == navNode.getValue()){
                return navNode;
            }else if (value < navNode.getValue()){
                navNode = navNode.getLeft();
            }else if (value > navNode.getValue()){
                navNode = navNode.getRight();
            }else{
                throw new Error("Not here");
            }
        }
    }

    remove(value){
        let navNode = this.getRoot();
        let parentNode;
        while(true){
            if(value == navNode.getValue()){
                if(navNode.getLeft() == null && navNode.getRight() == null){
                    navNode = null;
                    break;
                }
                else if (navNode.getLeft() == null && navNode.getRight() != null){
                    parentNode.setRight(navNode.getRight());
                    navNode = null;
                    break;
                }
                else if (navNode.getRight() == null && navNode.getLeft() != null){
                    parentNode.setLeft(navNode.getLeft());
                    navNode = null;
                    break;
                }else{
                    let minNodeParent = navNode;
                    let minNode = navNode.getRight();
                    while (minNode.getLeft() !== null) {
                        minNodeParent = minNode;
                        minNode = minNode.getLeft();
                    }
                    navNode.setValue(minNode.getValue());
                    if (minNodeParent.getLeft() === minNode) minNodeParent.setLeft(minNode.getRight());
                    else minNodeParent.setRight(minNode.getRight());
                    break;
                }
            }else if (value < navNode.getValue()){
                parentNode = navNode;
                navNode = navNode.getLeft();
            }else if (value > navNode.getValue()){
                parentNode = navNode;
                navNode = navNode.getRight();
            }else{
                throw new Error("Not here");
            }
        }
    }

    merge(leftArray, rightArray){
        let newArray = []
        let leftIndex = 0;
        let rightIndex = 0;

        while(leftIndex < leftArray.length && rightIndex < rightArray.length){
            if(leftArray[leftIndex] < rightArray[rightIndex]){
                newArray.push(leftArray[leftIndex]);
                leftIndex++;
            }else{
                newArray.push(rightArray[rightIndex]);
                rightIndex++;
            }
        }

        return newArray.concat(leftArray.slice(leftIndex), rightArray.slice(rightIndex));
    }

    mergeSort(array){
        if(array.length <= 1){
            return array;
        }

        let middle = Math.floor(array.length / 2);
        let leftArray = array.slice(0, middle);
        let rightArray = array.slice(middle);

        return this.merge(this.mergeSort(leftArray), this.mergeSort(rightArray));
    }

    populateTree(array){
        if(array.length == 0){
            return null;
        }

        let middle = Math.floor(array.length / 2);
        let workingNode = new Node(array[middle]);

        let left = array.slice(0, middle);
        let right = array.slice(middle + 1);

        workingNode.setLeft(this.populateTree(left));
        workingNode.setRight(this.populateTree(right));

        return workingNode;
    }

    levelOrder(passedArray, callBack){
        if(callBack === null){
            throw new Error("No callback provided");
        }

        if (!passedArray || passedArray.length === 0) {
            return;
        }

        let newArray = [];

        for (let item of passedArray) {
            if (item) {
                callBack(item);
                if (item.getLeft()) newArray.push(item.getLeft());
                if (item.getRight()) newArray.push(item.getRight());
            }
        }

        this.levelOrder(newArray, callBack);
        
    }

    inOrder(passedNode, callBack){
        if(callBack === null){
            throw new Error("No callback provided");
        }

        if (passedNode === null) {
            return;
        }

        this.inOrder(passedNode.getLeft(), callBack);
        callBack(passedNode);
        this.inOrder(passedNode.getRight(), callBack);
    }

    preOrder(passedNode, callBack){
        if(callBack === null){
            throw new Error("No callback provided");
        }

        if (passedNode === null) {
            return;
        }

        callBack(passedNode);
        this.preOrder(passedNode.getLeft(), callBack);
        this.preOrder(passedNode.getRight(), callBack);
    }

    postOrder(passedNode, callBack){
        if(callBack === null){
            throw new Error("No callback provided");
        }

        if (passedNode === null) {
            return;
        }

        this.postOrder(passedNode.getLeft(), callBack);
        this.postOrder(passedNode.getRight(), callBack);
        callBack(passedNode);
    }
    
    
    height(value){
        let mainNode = this.find(value);
        return this.heightSearch(mainNode);
    }

    heightSearch(node){
        if(node === null){
            return 0;
        } 

        let leftHeight = this.heightSearch(node.getLeft());
        let rightHeight = this.heightSearch(node.getRight());

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value){
        return this.depthSearch(value, this.getRoot());
    }

    depthSearch(value, node){
        if (node === null) {
            return -1;
        }

        if(value === node.getValue()){
            return 0;
        }

        let leftDepth = this.depthSearch(value, node.getLeft());
        let rightDepth = this.depthSearch(value, node.getRight());

        if (leftDepth >= 0) {
            return leftDepth + 1;
        }
        if (rightDepth >= 0) {
            return rightDepth + 1;
        }
    }

    isBalanced(){
        let theRoot = this.getRoot();
        this.isBalancedFunction(theRoot);
    }

    isBalancedFunction(node){
        if(node === null){
            console.log("True");
            return true;
        }

        let leftHeight = this.heightSearch(node.getLeft());
        let rightHeight = this.heightSearch(node.getRight());

        let heightDiff = Math.abs(leftHeight - rightHeight);

        if(heightDiff > 1){
            console.log("False");
            return false;
        }

        return this.isBalancedFunction(node.getLeft()) && this.isBalancedFunction(node.getRight());
    }

    rebalance(){
        let treeArray = this.rebalanceHelper(this.getRoot());
        this.clearRoot();
        this.setArray(treeArray);
        this.initTree();
    }

    rebalanceHelper(node){

        if(node === null){
            return [];
        }

        const arrayLeft = this.rebalanceHelper(node.getLeft());
        const arrayRight = this.rebalanceHelper(node.getRight());

        return arrayLeft.concat([node.getValue()], arrayRight);
    }
    
    prettyPrint(node = this.treeRoot, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "+-- " : "+-- "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
        }
    }
}

let theTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// theTree.add(15);
// theTree.remove(4);
// theTree.add(6346);
// theTree.add(6347);
// theTree.add(6348);
// theTree.add(6349);
// theTree.add(6350);

theTree.prettyPrint();
// theTree.levelOrder([theTree.getRoot()], (node) => console.log(node.value));
//theTree.inOrder(theTree.getRoot(), (node) => console.log(node.value));
//theTree.preOrder(theTree.getRoot(), (node) => console.log(node.value));
//theTree.postOrder(theTree.getRoot(), (node) => console.log(node.value));
// console.log(theTree.height(theTree.getRoot().getValue()));
// console.log(theTree.depth(324))
theTree.isBalanced();