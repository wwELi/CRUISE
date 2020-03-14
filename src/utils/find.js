
export default function findInTree(list, fn) {

  const _list = [...list];

  while (_list.length) {
    const node = _list.pop();

    if (fn(node)) {
      return node;
    } else if(Array.isArray(node.children)) {
      return findInTree(node.children, fn);
    }
  }
}
