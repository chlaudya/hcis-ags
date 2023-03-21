export const customChunkRenderer = (nodeName, node) => {
  const allowedNodes = ['table', 'tbody', 'tr', 'th', 'td', 'thead'];

  if (allowedNodes.includes(nodeName)) {
    return {
      type: nodeName.toString().toUpperCase(),
      mutability: 'MUTABLE',
      data: {
        innerText: node.innerText,
        innerHTML: node.innerHTML,
      },
    };
  }
  return null;
};

export const entityMapper = entity => {
  switch (entity.type) {
    case 'TABLE':
      return `<table>${entity.data.innerHTML}</table>`;
    case 'TBODY':
      return `<tbody>${entity.data.innerHTML}</tbody>`;
    case 'TR':
      return `<tr>${entity.data.innerHTML}</tr>`;
    case 'TH':
      return `<th>${entity.data.innerHTML}</th>`;
    case 'TD':
      return `<td>${entity.data.innerHTML}</td>`;
    default:
      return '';
  }
};

const setEntityInnerHTML = ({ tag: Tag }, entity) => {
  return <Tag dangerouslySetInnerHTML={{ __html: entity.data.innerHTML }} />;
};

export const entityMapperToComponent = entity => {
  switch (entity.type) {
    case 'TABLE':
      return () => setEntityInnerHTML({ tag: 'table' }, entity);
    case 'TBODY':
      return () => setEntityInnerHTML({ tag: 'tbody' }, entity);
    case 'TR':
      return () => setEntityInnerHTML({ tag: 'tr' }, entity);
    case 'TH':
      return () => setEntityInnerHTML({ tag: 'th' }, entity);
    case 'TD':
      return () => setEntityInnerHTML({ tag: 'td' }, entity);
    default:
      return () => '';
  }
};

export const customBlockRenderer = (block, config) => {
  if (block.getType() === 'atomic') {
    const contentState = config.getEditorState().getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    return {
      component: entityMapperToComponent(entity),
      editable: false,
      props: {
        children: () => entity.innerHTML,
      },
    };
  }
  return undefined;
};
