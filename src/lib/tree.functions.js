export function getChildren(tree, id) {
    let children = tree.filter(node => node.requires[0] == id);

    return children ? children : [];
}

function findNodeIndex(tree, id) {
    let index = tree.findIndex(item => item._id == id);
    if (index > -1) {
        return index;
    }
    return null;
}
