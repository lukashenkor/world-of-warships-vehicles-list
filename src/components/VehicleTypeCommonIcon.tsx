import { VehicleTypeCommonIconsType } from '../types/IconsType';
import { mediaUrl } from '../api';

type VehicleTypeCommonIconProps = {
  tags: string[];
  commonTypeIcons: VehicleTypeCommonIconsType;
  alt: string
};

function getIconUrlByTags(tags: string[], commonTypeIcons: VehicleTypeCommonIconsType) {
  const type = tags[1] as keyof VehicleTypeCommonIconsType;
  return commonTypeIcons[type] || commonTypeIcons.default;
}

function VehicleTypeCommonIcon({
  commonTypeIcons,
  tags,
  alt
}: VehicleTypeCommonIconProps) {
  const iconUrl = getIconUrlByTags(tags, commonTypeIcons);

  return <img className='vehicle-type-icon' src={`${mediaUrl}${iconUrl}`} alt={alt} />;
}

export default VehicleTypeCommonIcon