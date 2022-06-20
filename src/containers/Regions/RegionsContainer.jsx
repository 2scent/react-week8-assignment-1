import { useDispatch, useSelector } from 'react-redux';

import MenuList from '../../pages/common/MenuList/MenuList';
import MenuItem from '../../pages/common/MenuItem/MenuItem';

import { selectRegion, loadRestaurants } from '../../redux/slice';

import { get } from '../../utils/utils';

export default function RegionsContainer() {
  const dispatch = useDispatch();

  const regions = useSelector(get('regions'));
  const selectedRegion = useSelector(get('selectedRegion'));

  function handleClick(regionId) {
    dispatch(selectRegion(regionId));
    dispatch(loadRestaurants());
  }

  return (
    <MenuList>
      {regions.map((region) => (
        <MenuItem
          key={region.id}
          active={selectedRegion && region.id === selectedRegion.id}
        >
          <button type="button" onClick={() => handleClick(region.id)}>
            {region.name}
            {selectedRegion ? (
              <>{region.id === selectedRegion.id ? '(V)' : null}</>
            ) : null}
          </button>
        </MenuItem>
      ))}
    </MenuList>
  );
}
