export function getChildren(tree, id) {
    let children = tree.filter(node => node.requires[0] == id);

    return children ? children : [];
}

export function deleteNode(tree, id) {
    tree = structuredClone(tree)

    let children = getChildren(tree, id);
    if(children.length > 0) {
        tree = deleteChildren(tree, id)
    }

    tree.splice(findNodeIndex(tree, id), 1);

    return tree;
}

export function deleteChildren(tree, id) {
    tree = structuredClone(tree)
    let children = getChildren(tree, id);
    if (children) {
        children.forEach(child => {
            deleteChildren(tree, child._id);
            let nodeIndex = findNodeIndex(tree, child._id);
            tree.splice(nodeIndex, 1);
        });
    }
    return tree
}

function findNodeIndex(tree, id) {
    let index = tree.findIndex(item => item._id == id);
    if (index > -1) {
        return index;
    }
    return null;
}
