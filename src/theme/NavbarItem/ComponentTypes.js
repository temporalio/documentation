import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import AskAiNavbarItem from '@site/src/components/AskAiNavbarItem';
import TemporalNavbarLink from '@site/src/components/TemporalNavbarLink';

export default {
  ...ComponentTypes,
  default: TemporalNavbarLink,
  'custom-askAI': AskAiNavbarItem,
};