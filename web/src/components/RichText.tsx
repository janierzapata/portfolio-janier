import { Fragment } from 'react';

interface RichTextProps {
  text: string;
}

// Solo `[texto](https://…)`. No se usa un parser de Markdown ni
// dangerouslySetInnerHTML: el texto se parte y React escapa cada pedazo, así
// que un JSON editado a mano nunca puede inyectar HTML. Y solo https, para
// que un `javascript:` o un `http:` no entren por accidente.
const LINK = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;

export function RichText({ text }: RichTextProps) {
  const nodes = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, url] = match;
    const start = match.index;
    if (start > last) nodes.push(text.slice(last, start));
    nodes.push(
      <a key={start} className="inline-link" href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>,
    );
    last = start + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
    </>
  );
}
