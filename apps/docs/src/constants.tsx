import { baseFooterLinks, baseNavLinks, type SocialLink } from '@tuwaio/docs-ui';

// The pixel GitHub mark of docs-ui, as in its footer, on the link to this repository
const github = baseFooterLinks.find((link) => link.title === 'GitHub') as SocialLink;

export const navLinks: SocialLink[] = [...baseNavLinks, { ...github, href: 'https://github.com/TuwaIO/orbit' }];
