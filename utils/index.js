const getLinks = () => {
  // 获取可用链接
  let links = Array.from(document.querySelectorAll('h3'));
  const startIndex = links.findIndex((link) => link.id.includes('attributes'));
  links = links.slice(startIndex);

  // 如果没有指明组件名，需要添加
  let name = '';
  if (links[0].id === 'attributes') {
    [, name] = document.querySelector('h2').innerText.split(/\s/);
  }

  window.copy(
    links
      .map((link) => {
        const {
          href,
          nextSibling: { textContent: text },
        } = link.querySelector('a');
        return `##${text}

同[Element UI${name}${text}](${href})`;
      })
      .join('\n\n')
  );
};
