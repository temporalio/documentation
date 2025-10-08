import clsx from 'clsx';
import Tile, { TileProps } from './Tile';

export type TileGridProps = {
  items: (TileProps & { key?: string })[];
  className?: string;
};

export default function TileGrid({ items, className }: TileGridProps) {
  return (
    <div className={clsx('row', className)}>
      {items.map((it) => (
        <div key={it.key ?? it.title} className="col col--12 col--6@md col--4@lg margin-bottom--lg">
          <Tile {...it} />
        </div>
      ))}
    </div>
  );
}
