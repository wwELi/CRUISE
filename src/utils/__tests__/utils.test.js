
import count from '../count';
import findInTree from '../find';

describe("utils", () => {

  it("test count function", () => {

    const list1 = [{ type: 'a', id: 2 }, { type: 'c', id:44 }, { type: 'a' }, { type: 'c' }, { type: 'c' }];
    const result1 = count(list1, ['type']);

    expect(result1.type.a).toBe(2);
    expect(result1.type.c).toBe(3);
  });

  it("test findInTree function", () => {

    const a = { name: 'xxx'};

    const tree = [{ name: 'cc', children: [ { name: 'dd', children: [a] } ] }, { name: 'ee' }];

    const node = findInTree(tree, ({ name }) => name === a.name);

    expect(node).toBe(a);
  });

});
