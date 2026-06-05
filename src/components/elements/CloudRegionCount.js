import { usePluginData } from '@docusaurus/useGlobalData';

export default function CloudRegionCount({ provider }) {
  const data = usePluginData('cloud-region-counts');
  const count = data?.counts?.[provider];

  return count ?? 0;
}
