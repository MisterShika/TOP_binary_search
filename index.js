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
        this.treeRoot = new Node(this.treeArray[0]);
        
        this.populateTree();
    }

    placeNode(node){
        let checkedNode = this.treeRoot;
        let placedNode = new Node(node);
        let placed = false;
        while(placed == false){
            if(placedNode.getValue() <= checkedNode.getValue()){
                if(checkedNode.getLeft() != null){
                    checkedNode = checkedNode.getLeft();
                }else{
                    checkedNode.setLeft(placedNode);
                    placed = true;
                }
            }else{
                if(checkedNode.getRight() != null){
                    checkedNode = checkedNode.getRight();
                }else{
                    checkedNode.setRight(placedNode);
                    placed = true;
                }
            }
        }
    }

    populateTree(){
        for(let i = 1; i < this.treeArray.length; i++){
            this.placeNode(this.treeArray[i]);
        }
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