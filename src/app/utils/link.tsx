import {default as NextLink} from 'next/link';

export default function Link({className = null, children, ...props}) {
  const linkCss = className ? className : "";

  return (
    <NextLink className={linkCss} {...props} href={props.href}>{children}</NextLink>
  );
};