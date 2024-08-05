import * as React from 'react';
import NextJSLink from 'next/link';

function Link(props: React.ComponentProps<typeof NextJSLink>) {
  return <NextJSLink {...props}>{props.children}</NextJSLink>;
}

export default Link;
