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

    // duplicateCheck(array){

    // }

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

    getRoot(){
        return this.treeRoot;
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

console.log(theTree.prettyPrint());