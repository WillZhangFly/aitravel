import {default as NextLink} from 'next/link';

export default function Link({className = null, children, ...props}) {
  const linkCss = className ? className : "text-blue-500 hover:text-blue-900 dark:text-gray-400 dark:hover:text-gray-900";

  return (
    <NextLink className={linkCss} {...props} href={props.href}>{children}</NextLink>
  );
};