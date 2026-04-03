import { useMemo } from 'react';

export const useRouting = () => {
  const slug = useMemo(() => {
    return window.location.pathname.split('/')[2] || 'pepitas';
  }, []);

  const initialName = useMemo(() => {
    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [slug]);

  return { slug, initialName };
};
