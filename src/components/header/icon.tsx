import { icons } from 'lucide-react';

interface IPROPSHEADERICON {
  iconName: 'Menu' | 'Search';
  color?: string;
  size?: number;
}

export const HeaderIcon = ({
  iconName,
  color = '#1267FC',
  size = 24,
}: IPROPSHEADERICON) => {
  const Icon = icons[iconName];

  return <Icon color={color} size={size} />;
};
