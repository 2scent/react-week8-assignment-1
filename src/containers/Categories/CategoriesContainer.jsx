import { useDispatch, useSelector } from 'react-redux';

import MenuList from '../../pages/common/MenuList/MenuList';
import MenuItem from '../../pages/common/MenuItem/MenuItem';

import { selectCategory, loadRestaurants } from '../../redux/slice';

import { get } from '../../utils/utils';

export default function CategoriesContainer() {
  const dispatch = useDispatch();

  const categories = useSelector(get('categories'));
  const selectedCategory = useSelector(get('selectedCategory'));

  function handleClick(categoryId) {
    dispatch(selectCategory(categoryId));
    dispatch(loadRestaurants());
  }

  return (
    <MenuList>
      {categories.map((category) => (
        <MenuItem
          key={category.id}
          active={selectedCategory && category.id === selectedCategory.id}
        >
          <button type="button" onClick={() => handleClick(category.id)}>
            {category.name}
            {selectedCategory ? (
              <>{category.id === selectedCategory.id ? '(V)' : null}</>
            ) : null}
          </button>
        </MenuItem>
      ))}
    </MenuList>
  );
}
