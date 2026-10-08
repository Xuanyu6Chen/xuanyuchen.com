// Touch-ups applied to every note as it is turned into a page:
// links to other sites open in a new tab, and images load only when they are about to be seen.

export function tidyLinksAndImages({ home = '' } = {}) {
  const visit = (node) => {
    if (node.type === 'element') {
      const props = node.properties ?? (node.properties = {});
      if (node.tagName === 'a') {
        const href = String(props.href ?? '');
        if (/^https?:\/\//.test(href) && !(home && href.startsWith(home))) {
          props.target = '_blank';
          props.rel = 'noopener noreferrer';
        }
      }
      if (node.tagName === 'img') {
        props.loading = 'lazy';
        props.decoding = 'async';
      }
    }
    (node.children ?? []).forEach(visit);
  };
  return (tree) => visit(tree);
}
